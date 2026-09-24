/** Canonical production site — used for OG / Facebook share previews. */
export const SITE_URL = 'https://ai57tuyensinh.honglinheducation.vn'

export function getAbsoluteUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/** Always share the production URL so Facebook/Zalo can scrape OG tags. */
export function getArticleShareUrl(slug: string): string {
  return `${SITE_URL}/tin-tuc/${slug}`
}

/** Absolute cover URL for og:image (never localhost). */
export function getArticleImageUrl(coverImage: string): string {
  if (coverImage.startsWith('http')) return coverImage
  return `${SITE_URL}${coverImage.startsWith('/') ? coverImage : `/${coverImage}`}`
}
