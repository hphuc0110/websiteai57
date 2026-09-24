type ShareFacebookButtonProps = {
  url: string
  title: string
}

export default function ShareFacebookButton({ url, title }: ShareFacebookButtonProps) {
  const shareOnFacebook = () => {
    // Use the canonical production URL (not window.location) so crawlers
    // always hit the live domain with correct og:image tags.
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(shareUrl, 'facebook-share-dialog', 'width=600,height=480,noopener,noreferrer')
    window.fbq?.('trackCustom', 'Share', {
      content_name: title,
      content_category: 'news',
      share_destination: 'facebook',
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={shareOnFacebook}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-95 active:scale-[0.98]"
        aria-label="Chia sẻ lên Facebook"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M14 8.5h2.5V5.2C16.1 5.1 15 5 13.8 5 11.3 5 9.6 6.5 9.6 9.3V12H7v3.5h2.6V23h3.5v-7.5H16l.5-3.5h-3.4V9.5c0-1 .3-1.5 1.3-1.5z" />
        </svg>
        Chia sẻ Facebook
      </button>
    </div>
  )
}
