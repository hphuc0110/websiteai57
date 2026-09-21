import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { NEWS_CATEGORIES, type NewsSection } from '../../data/news'
import {
  createNewsPost,
  fetchAllNewsForAdmin,
  slugify,
  updateNewsPost,
  uploadNewsImage,
} from '../../lib/newsApi'

type SectionDraft = {
  heading: string
  body: string
  image: string
  imageAlt: string
  uploading?: boolean
}

const emptySection = (): SectionDraft => ({
  heading: '',
  body: '',
  image: '',
  imageAlt: '',
})

function sectionsToDraft(sections: NewsSection[]): SectionDraft[] {
  if (!sections.length) return [emptySection()]
  return sections.map((s) => ({
    heading: s.heading ?? '',
    body: s.paragraphs.join('\n\n'),
    image: s.image ?? '',
    imageAlt: s.imageAlt ?? '',
  }))
}

function draftToSections(drafts: SectionDraft[]): NewsSection[] {
  return drafts
    .map((d) => {
      const paragraphs = d.body
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
      if (!paragraphs.length && !d.heading.trim() && !d.image) return null
      const section: NewsSection = { paragraphs: paragraphs.length ? paragraphs : [''] }
      if (d.heading.trim()) section.heading = d.heading.trim()
      if (d.image) {
        section.image = d.image
        if (d.imageAlt.trim()) section.imageAlt = d.imageAlt.trim()
      }
      return section
    })
    .filter((s): s is NewsSection => s !== null)
}

export default function AdminNewsEditorPage() {
  const { id } = useParams()
  const isNew = !id || id === 'moi'
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [excerpt, setExcerpt] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [category, setCategory] = useState<string>(NEWS_CATEGORIES[0])
  const [coverImage, setCoverImage] = useState('')
  const [coverUploading, setCoverUploading] = useState(false)
  const [sections, setSections] = useState<SectionDraft[]>([emptySection()])
  const [published, setPublished] = useState(true)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [postId, setPostId] = useState<string | null>(isNew ? null : id)

  useEffect(() => {
    if (isNew) return
    let cancelled = false
    ;(async () => {
      try {
        const posts = await fetchAllNewsForAdmin()
        const post = posts.find((p) => p.id === id)
        if (!post) {
          if (!cancelled) setError('Không tìm thấy bài viết.')
          return
        }
        if (cancelled) return
        setPostId(post.id ?? id)
        setTitle(post.title)
        setSlug(post.slug)
        setSlugTouched(true)
        setExcerpt(post.excerpt)
        setDate(post.date)
        setCategory(post.category)
        setCoverImage(post.coverImage)
        setSections(sectionsToDraft(post.sections))
        setPublished(true)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Lỗi tải bài.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id, isNew])

  const previewSections = useMemo(() => draftToSections(sections), [sections])

  const onTitleChange = (value: string) => {
    setTitle(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  const handleCoverUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setCoverUploading(true)
    setError('')
    try {
      const url = await uploadNewsImage(file, 'covers')
      setCoverImage(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload ảnh bìa thất bại.')
    } finally {
      setCoverUploading(false)
    }
  }

  const handleSectionImageUpload = async (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, uploading: true } : s)))
    setError('')
    try {
      const url = await uploadNewsImage(file, 'inline')
      setSections((prev) =>
        prev.map((s, i) => (i === index ? { ...s, image: url, uploading: false } : s)),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload ảnh trong bài thất bại.')
      setSections((prev) => prev.map((s, i) => (i === index ? { ...s, uploading: false } : s)))
    }
  }

  const updateSection = (index: number, patch: Partial<SectionDraft>) => {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    const finalSlug = slug.trim() || slugify(title)
    if (!title.trim() || !excerpt.trim() || !finalSlug || !coverImage) {
      setError('Vui lòng nhập tiêu đề, tóm tắt, slug và ảnh bìa.')
      return
    }

    const parsedSections = draftToSections(sections)
    if (!parsedSections.length) {
      setError('Bài viết cần ít nhất một đoạn nội dung.')
      return
    }

    setSaving(true)
    try {
      const payload = {
        slug: finalSlug,
        title: title.trim(),
        excerpt: excerpt.trim(),
        date,
        category,
        coverImage,
        sections: parsedSections,
        published,
      }

      if (postId) {
        await updateNewsPost(postId, payload)
      } else {
        await createNewsPost(payload)
      }
      navigate('/admin/tin-tuc')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lưu bài thất bại.')
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border-0 bg-[#f9f8f3] px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-primary/25'

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
        Đang tải bài viết…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/40 via-white to-white">
      <header className="border-b border-primary/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <Link to="/admin/tin-tuc" className="text-xs font-bold text-primary hover:underline">
              ← Danh sách
            </Link>
            <h1 className="text-lg font-extrabold text-hero-navy">
              {isNew ? 'Đăng bài mới' : 'Sửa bài viết'}
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-800">
              Tiêu đề <span className="text-primary">*</span>
            </label>
            <input
              className={inputClass}
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-800">
              Đường dẫn (slug) <span className="text-primary">*</span>
            </label>
            <input
              className={inputClass}
              value={slug}
              onChange={(e) => {
                setSlugTouched(true)
                setSlug(slugify(e.target.value))
              }}
              required
            />
            <p className="mt-1 text-xs text-gray-500">URL: /tin-tuc/{slug || '…'}</p>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-800">
              Tóm tắt <span className="text-primary">*</span>
            </label>
            <textarea
              className={`${inputClass} min-h-[88px] resize-y`}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-800">
                Ngày đăng
              </label>
              <input
                type="date"
                className={inputClass}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-800">
                Chuyên mục
              </label>
              <select
                className={inputClass}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {NEWS_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-800">
              Ảnh bìa <span className="text-primary">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => void handleCoverUpload(e)}
              className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-primary-dark file:px-3 file:py-2 file:text-xs file:font-bold file:text-white"
            />
            {coverUploading && <p className="mt-2 text-xs text-gray-500">Đang tải ảnh bìa…</p>}
            {coverImage && (
              <img
                src={coverImage}
                alt="Ảnh bìa"
                className="mt-3 aspect-[16/9] w-full rounded-xl border border-primary/15 object-cover"
              />
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-hero-navy">Nội dung bài viết</h2>
              <button
                type="button"
                onClick={() => setSections((prev) => [...prev, emptySection()])}
                className="rounded-lg border border-primary/20 px-3 py-1.5 text-xs font-bold text-primary-dark hover:bg-primary-light/40"
              >
                + Thêm mục
              </button>
            </div>

            {sections.map((section, index) => (
              <div
                key={index}
                className="rounded-2xl border border-primary/15 bg-white p-4 sm:p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Mục {index + 1}
                  </p>
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setSections((prev) => prev.filter((_, i) => i !== index))}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Xóa mục
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-800">
                      Tiêu đề mục (tuỳ chọn)
                    </label>
                    <input
                      className={inputClass}
                      value={section.heading}
                      onChange={(e) => updateSection(index, { heading: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-800">
                      Nội dung (cách đoạn bằng dòng trống)
                    </label>
                    <textarea
                      className={`${inputClass} min-h-[140px] resize-y`}
                      value={section.body}
                      onChange={(e) => updateSection(index, { body: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-800">
                      Ảnh trong mục (tuỳ chọn)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => void handleSectionImageUpload(index, e)}
                      className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-2 file:text-xs file:font-bold file:text-white"
                    />
                    {section.uploading && (
                      <p className="mt-2 text-xs text-gray-500">Đang tải ảnh…</p>
                    )}
                    {section.image && (
                      <div className="mt-3">
                        <img
                          src={section.image}
                          alt={section.imageAlt || ''}
                          className="max-h-56 w-full rounded-xl object-cover"
                        />
                        <input
                          className={`${inputClass} mt-2`}
                          placeholder="Mô tả ảnh (alt)"
                          value={section.imageAlt}
                          onChange={(e) => updateSection(index, { imageAlt: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => updateSection(index, { image: '', imageAlt: '' })}
                          className="mt-2 text-xs font-bold text-red-600 hover:underline"
                        >
                          Gỡ ảnh
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded border-gray-300 text-primary-dark focus:ring-primary/30"
            />
            Xuất bản ngay (hiển thị trên trang tin tức)
          </label>

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving || coverUploading}
              className="rounded-lg bg-primary-dark px-5 py-3 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
            >
              {saving ? 'Đang lưu…' : isNew ? 'Đăng bài' : 'Lưu thay đổi'}
            </button>
            <Link
              to="/admin/tin-tuc"
              className="rounded-lg border border-primary/20 px-5 py-3 text-sm font-bold text-hero-navy hover:bg-primary-light/40"
            >
              Huỷ
            </Link>
          </div>

          {previewSections.length > 0 && title && (
            <div className="rounded-2xl border border-dashed border-primary/25 bg-white/70 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Xem trước nhanh</p>
              <h3 className="mt-2 text-lg font-extrabold text-hero-navy">{title}</h3>
              {coverImage && (
                <img src={coverImage} alt="" className="mt-3 aspect-[16/9] w-full rounded-xl object-cover" />
              )}
              <div className="mt-4 space-y-4">
                {previewSections.map((s, i) => (
                  <div key={i}>
                    {s.heading && <h4 className="mb-2 font-extrabold text-hero-navy">{s.heading}</h4>}
                    {s.paragraphs.map((p, pi) => (
                      <p key={pi} className="mb-2 text-sm leading-relaxed text-gray-700">
                        {p}
                      </p>
                    ))}
                    {s.image && (
                      <img
                        src={s.image}
                        alt={s.imageAlt || ''}
                        className="mt-2 rounded-xl object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  )
}
