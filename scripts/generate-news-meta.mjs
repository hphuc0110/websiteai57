import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const src = fs.readFileSync(path.join(root, 'src/data/news.ts'), 'utf8')

const articles = []
const blockRe =
  /\{\s*slug: '([^']+)',\s*title: '([^']*)',\s*excerpt:\s*'([^']*)',\s*date: '([^']+)',\s*category: '([^']+)',\s*coverImage: '([^']+)',/g

let match
while ((match = blockRe.exec(src)) !== null) {
  articles.push({
    slug: match[1],
    title: match[2],
    excerpt: match[3],
    date: match[4],
    category: match[5],
    coverImage: match[6],
  })
}

if (articles.length === 0) {
  console.error('No articles parsed from src/data/news.ts')
  process.exit(1)
}

const outDir = path.join(root, 'api')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(
  path.join(outDir, 'news-meta.json'),
  JSON.stringify(articles, null, 2) + '\n',
)
console.log(`Wrote api/news-meta.json (${articles.length} articles)`)
