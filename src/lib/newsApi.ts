import type { NewsItem, NewsSection } from '../data/news'
import { newsItems } from '../data/news'
import { isSupabaseConfigured, supabase } from './supabase'

export type NewsPostInput = {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  coverImage: string
  sections: NewsSection[]
  published?: boolean
}

type NewsPostRow = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  cover_image: string
  sections: NewsSection[]
  published: boolean
  created_at: string
  updated_at: string
}

function rowToNewsItem(row: NewsPostRow): NewsItem {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: row.date,
    category: row.category,
    coverImage: row.cover_image,
    sections: Array.isArray(row.sections) ? row.sections : [],
    source: 'db',
    id: row.id,
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export async function fetchRemoteNews(): Promise<NewsItem[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('news_posts')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false })

  if (error) {
    console.error('fetchRemoteNews:', error.message)
    return []
  }

  return ((data ?? []) as NewsPostRow[]).map(rowToNewsItem)
}

export async function fetchAllNewsForAdmin(): Promise<NewsItem[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('news_posts')
    .select('*')
    .order('date', { ascending: false })

  if (error) throw new Error(error.message)
  return ((data ?? []) as NewsPostRow[]).map(rowToNewsItem)
}

export async function fetchNewsBySlug(slug: string): Promise<NewsItem | null> {
  const staticItem = newsItems.find((item) => item.slug === slug)
  if (staticItem) return { ...staticItem, source: 'static' }

  if (!supabase) return null

  const { data, error } = await supabase
    .from('news_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (error) {
    console.error('fetchNewsBySlug:', error.message)
    return null
  }

  return data ? rowToNewsItem(data as NewsPostRow) : null
}

export async function mergeNewsList(): Promise<NewsItem[]> {
  const remote = await fetchRemoteNews()
  const remoteSlugs = new Set(remote.map((item) => item.slug))
  const staticOnly = newsItems
    .filter((item) => !remoteSlugs.has(item.slug))
    .map((item) => ({ ...item, source: 'static' as const }))

  return [...remote, ...staticOnly].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export async function createNewsPost(input: NewsPostInput): Promise<NewsItem> {
  if (!supabase) throw new Error('Chưa cấu hình Supabase.')

  const { data, error } = await supabase
    .from('news_posts')
    .insert({
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt,
      date: input.date,
      category: input.category,
      cover_image: input.coverImage,
      sections: input.sections,
      published: input.published ?? true,
    })
    .select('*')
    .single()

  if (error) throw new Error(error.message)
  return rowToNewsItem(data as NewsPostRow)
}

export async function updateNewsPost(id: string, input: NewsPostInput): Promise<NewsItem> {
  if (!supabase) throw new Error('Chưa cấu hình Supabase.')

  const { data, error } = await supabase
    .from('news_posts')
    .update({
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt,
      date: input.date,
      category: input.category,
      cover_image: input.coverImage,
      sections: input.sections,
      published: input.published ?? true,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw new Error(error.message)
  return rowToNewsItem(data as NewsPostRow)
}

export async function deleteNewsPost(id: string): Promise<void> {
  if (!supabase) throw new Error('Chưa cấu hình Supabase.')
  const { error } = await supabase.from('news_posts').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function uploadNewsImage(file: File, folder = 'covers'): Promise<string> {
  if (!supabase) throw new Error('Chưa cấu hình Supabase.')

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext) ? ext : 'jpg'
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`

  const { error } = await supabase.storage.from('news').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || `image/${safeExt}`,
  })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from('news').getPublicUrl(path)
  return data.publicUrl
}

export { isSupabaseConfigured }
