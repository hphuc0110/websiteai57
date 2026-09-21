import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import type { NewsItem } from '../../data/news'
import { formatNewsDate } from '../../data/news'
import { deleteNewsPost, fetchAllNewsForAdmin } from '../../lib/newsApi'

export default function AdminNewsListPage() {
  const { user, signOut } = useAuth()
  const [posts, setPosts] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchAllNewsForAdmin()
      setPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không tải được danh sách.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const handleDelete = async (post: NewsItem) => {
    if (!post.id) return
    if (!window.confirm(`Xóa bài "${post.title}"?`)) return
    setDeletingId(post.id)
    try {
      await deleteNewsPost(post.id)
      setPosts((prev) => prev.filter((p) => p.id !== post.id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Xóa thất bại.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/40 via-white to-white">
      <header className="border-b border-primary/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Quản trị tin tức</p>
            <h1 className="text-lg font-extrabold text-hero-navy">Bài viết đã đăng</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500">{user?.email}</span>
            <button
              type="button"
              onClick={() => void signOut()}
              className="rounded-lg border border-primary/20 px-3 py-1.5 text-xs font-bold text-hero-navy hover:bg-primary-light/50"
            >
              Đăng xuất
            </button>
            <Link
              to="/admin/tin-tuc/moi"
              className="rounded-lg bg-primary-dark px-3 py-1.5 text-xs font-bold text-white hover:opacity-90"
            >
              + Đăng bài mới
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap gap-3 text-sm">
          <Link to="/tin-tuc" className="font-semibold text-primary hover:underline">
            ← Xem trang tin tức công khai
          </Link>
        </div>

        {loading && <p className="text-sm text-gray-500">Đang tải…</p>}
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-primary/25 bg-white p-10 text-center">
            <p className="font-semibold text-hero-navy">Chưa có bài đăng từ admin</p>
            <p className="mt-2 text-sm text-gray-600">
              Các bài tĩnh hiện có vẫn hiển thị công khai. Hãy đăng bài mới kèm ảnh tại đây.
            </p>
            <Link
              to="/admin/tin-tuc/moi"
              className="mt-5 inline-block rounded-lg bg-primary-dark px-4 py-2.5 text-sm font-bold text-white"
            >
              Đăng bài đầu tiên
            </Link>
          </div>
        )}

        <ul className="space-y-3">
          {posts.map((post) => (
            <li
              key={post.id ?? post.slug}
              className="flex flex-col gap-3 rounded-2xl border border-primary/15 bg-white p-4 sm:flex-row sm:items-center"
            >
              <img
                src={post.coverImage}
                alt=""
                className="h-20 w-full rounded-xl object-cover sm:h-16 sm:w-24 sm:shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-primary-light px-2 py-0.5 text-xs font-bold text-primary-dark">
                    {post.category}
                  </span>
                  <time className="text-xs text-gray-500">{formatNewsDate(post.date)}</time>
                </div>
                <h2 className="mt-1 truncate text-sm font-extrabold text-hero-navy sm:text-base">
                  {post.title}
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">/{post.slug}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  to={`/tin-tuc/${post.slug}`}
                  target="_blank"
                  className="rounded-lg border border-primary/20 px-3 py-1.5 text-xs font-bold text-hero-navy hover:bg-primary-light/40"
                >
                  Xem
                </Link>
                <Link
                  to={`/admin/tin-tuc/${post.id}`}
                  className="rounded-lg border border-primary/20 px-3 py-1.5 text-xs font-bold text-primary-dark hover:bg-primary-light/40"
                >
                  Sửa
                </Link>
                <button
                  type="button"
                  disabled={deletingId === post.id}
                  onClick={() => void handleDelete(post)}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  {deletingId === post.id ? 'Đang xóa…' : 'Xóa'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
