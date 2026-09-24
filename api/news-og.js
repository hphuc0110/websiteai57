import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const SITE_URL = process.env.OG_SITE_URL || 'https://ai57tuyensinh.honglinheducation.vn'

let articles = []
try {
  articles = JSON.parse(readFileSync(join(__dirname, 'news-meta.json'), 'utf8'))
} catch {
  articles = []
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function imageType(url) {
  const lower = String(url).toLowerCase()
  if (lower.includes('.jpg') || lower.includes('.jpeg') || lower.includes('image/jpeg')) {
    return 'image/jpeg'
  }
  if (lower.includes('.webp')) return 'image/webp'
  if (lower.includes('.gif')) return 'image/gif'
  return 'image/png'
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
  const type = imageType(image)

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
  <meta property="og:image:type" content="${type}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
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

export default async function handler(req, res) {
  const slug = typeof req.query?.slug === 'string' ? req.query.slug : ''
  const article = articles.find((item) => item.slug === slug) || null

  if (!article) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<!doctype html><title>Not found</title><h1>Không tìm thấy bài viết</h1>')
    return
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=600')
  res.end(renderHtml(article))
}
