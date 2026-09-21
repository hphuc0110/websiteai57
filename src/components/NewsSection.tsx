import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from './SectionTitle'
import { formatNewsDate, type NewsItem } from '../data/news'
import { mergeNewsList } from '../lib/newsApi'

export default function NewsSection() {
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const list = await mergeNewsList()
        if (!cancelled) setItems(list)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="bg-gradient-to-b from-primary-light/40 via-white to-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle
          title="Tin tức AI"
          subtitle="Cập nhật diễn biến mới nhất về trí tuệ nhân tạo, robotics và chính sách toàn cầu"
        />

        {loading && (
          <p className="mt-12 text-center text-sm text-gray-500">Đang tải tin tức…</p>
        )}

        {!loading && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Link
                key={item.slug}
                to={`/tin-tuc/${item.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <div className="aspect-[16/10] overflow-hidden bg-primary-light/40">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-primary-light px-2.5 py-1 text-xs font-bold text-primary-dark">
                      {item.category}
                    </span>
                    <time className="text-xs text-gray-500" dateTime={item.date}>
                      {formatNewsDate(item.date)}
                    </time>
                  </div>
                  <h3 className="mt-3 text-base font-extrabold leading-snug text-hero-navy transition group-hover:text-primary sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <span className="mt-4 text-sm font-bold text-primary">Đọc tiếp →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
