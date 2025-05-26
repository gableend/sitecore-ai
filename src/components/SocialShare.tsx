interface SocialShareProps {
  className?: string;
}

export default function SocialShare({ className = '' }: SocialShareProps) {
  const shareUrl = window.location.href;
  const shareTitle = "Something BIG is coming! Check out this exciting countdown!";

  const handleShare = (platform: string) => {
    let url = '';

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        return;
    }

    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className={className}>
      <p className="mb-4 font-medium">Share the excitement</p>
      <div className="flex justify-center gap-4">
        <button
          className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => handleShare('twitter')}
          aria-label="Share on Twitter"
        >
          <svg className="w-6 h-6" style={{ color: 'var(--sitecore-red)' }} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </button>
        <button
          className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => handleShare('facebook')}
          aria-label="Share on Facebook"
        >
          <svg className="w-6 h-6" style={{ color: 'var(--sitecore-red)' }} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => handleShare('linkedin')}
          aria-label="Share on LinkedIn"
        >
          <svg className="w-6 h-6" style={{ color: 'var(--sitecore-red)' }} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </button>
        <button
          className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Something BIG is Coming',
                text: shareTitle,
                url: shareUrl,
              });
            }
          }}
          aria-label="Share via native share"
        >
          <svg className="w-6 h-6" style={{ color: 'var(--sitecore-red)' }} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
