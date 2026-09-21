const { readFileSync } = require('fs')
const { join } = require('path')

const SITE_URL = process.env.OG_SITE_URL || 'https://ai57tuyensinh.honglinheducation.vn'
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || ''
const SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

const articles = JSON.parse(readFileSync(join(__dirname, 'news-meta.json'), 'utf8'))

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function findRemoteArticle(slug) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null
  try {
    const url = `${SUPABASE_URL}/rest/v1/news_posts?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=slug,title,excerpt,date,category,cover_image`
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })
    if (!res.ok) return null
    const rows = await res.json()
    const row = rows?.[0]
    if (!row) return null
    return {
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      date: row.date,
      category: row.category,
      coverImage: row.cover_image,
    }
  } catch {
    return null
  }
}

function absoluteImage(coverImage) {
  if (String(coverImage).startsWith('http')) return coverImage
  return `${SITE_URL}${coverImage.startsWith('/') ? coverImage : `/${coverImage}`}`
}

function renderHtml(article) {
  const url = `${SITE_URL}/tin-tuc/${article.slug}`
  const image = absoluteImage(article.coverImage)
  const title = escapeHtml(`${article.title} — AI57`)
  const description = escapeHtml(article.excerpt)

  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="AI57" />
  <meta property="og:locale" content="vi_VN" />
  <meta property="og:url" content="${url}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:secure_url" content="${image}" />
  <meta property="og:image:alt" content="${escapeHtml(article.title)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
</head>
<body>
  <p><a href="${url}">${escapeHtml(article.title)}</a></p>
</body>
</html>`
}

module.exports = async function handler(req, res) {
  const slug = typeof req.query.slug === 'string' ? req.query.slug : ''
  let article = articles.find((item) => item.slug === slug) || null

  if (!article) {
    article = await findRemoteArticle(slug)
  }

  if (!article) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<!doctype html><title>Not found</title><h1>Không tìm thấy bài viết</h1>')
    return
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.end(renderHtml(article))
}
