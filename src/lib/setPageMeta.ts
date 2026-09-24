type PageMeta = {
  title: string
  description: string
  url: string
  image: string
  type?: 'website' | 'article'
}

function upsertMeta(
  attr: 'property' | 'name',
  key: string,
  content: string,
) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Best-effort client meta for browsers / in-app previews. Social crawlers use /api/news-og. */
export function setPageMeta({
  title,
  description,
  url,
  image,
  type = 'article',
}: PageMeta) {
  document.title = title
  upsertMeta('name', 'description', description)
  upsertLink('canonical', url)

  upsertMeta('property', 'og:type', type)
  upsertMeta('property', 'og:site_name', 'AI57')
  upsertMeta('property', 'og:locale', 'vi_VN')
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:image', image)
  upsertMeta('property', 'og:image:secure_url', image)
  upsertMeta('property', 'og:image:width', '1200')
  upsertMeta('property', 'og:image:height', '630')
  upsertMeta(
    'property',
    'og:image:type',
    image.toLowerCase().includes('.jpg') || image.toLowerCase().includes('.jpeg')
      ? 'image/jpeg'
      : image.toLowerCase().includes('.webp')
        ? 'image/webp'
        : 'image/png',
  )

  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', image)
}
