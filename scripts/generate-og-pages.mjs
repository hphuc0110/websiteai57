import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const SITE_URL = process.env.OG_SITE_URL || 'https://ai57tuyensinh.honglinheducation.vn'

const distIndexPath = path.join(root, 'dist/index.html')
const metaPath = path.join(root, 'api/news-meta.json')

if (!fs.existsSync(distIndexPath)) {
  console.error('dist/index.html not found — run vite build first')
  process.exit(1)
}
if (!fs.existsSync(metaPath)) {
  console.error('api/news-meta.json not found — run generate-news-meta first')
  process.exit(1)
}

const baseHtml = fs.readFileSync(distIndexPath, 'utf8')
const articles = JSON.parse(fs.readFileSync(metaPath, 'utf8'))

function escapeAttr(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function injectOg(html, { title, description, url, image, type = 'article' }) {
  const safeTitle = escapeAttr(title)
  const safeDesc = escapeAttr(description)
  const metaBlock = `
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDesc}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="AI57" />
    <meta property="og:locale" content="vi_VN" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:secure_url" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${safeTitle}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${image}" />`

  let next = html
  next = next.replace(/<title>[^<]*<\/title>/i, '')
  next = next.replace(/<meta\s+name="description"[^>]*>\s*/gi, '')
  next = next.replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '')
  next = next.replace(/<meta\s+property="og:[^"]+"[^>]*>\s*/gi, '')
  next = next.replace(/<meta\s+name="twitter:[^"]+"[^>]*>\s*/gi, '')
  next = next.replace(
    /(<meta\s+name="viewport"[^>]*>)/i,
    `$1\n${metaBlock}`,
  )
  return next
}

const newsRoot = path.join(root, 'dist/tin-tuc')
fs.mkdirSync(newsRoot, { recursive: true })

const listHtml = injectOg(baseHtml, {
  title: 'Tin tức AI — AI57',
  description:
    'Cập nhật diễn biến mới nhất về trí tuệ nhân tạo, robotics và chính sách toàn cầu.',
  url: `${SITE_URL}/tin-tuc`,
  image: `${SITE_URL}/images/news/1.png`,
  type: 'website',
})
fs.writeFileSync(path.join(newsRoot, 'index.html'), listHtml)

// Per-article OG HTML is served dynamically by /api/news-og for social crawlers
// (see vercel.json bot rewrite). Avoid static files here so bots always hit the API
// and pick up both static + Supabase posts with correct og:image.
console.log(`Generated OG HTML for /tin-tuc list (${articles.length} articles in news-meta for API)`)
