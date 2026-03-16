import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ShareButtonProps {
  title: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: title,
      text: `Check out this blog post: ${title}`,
      url: url
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
      >
        {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
        <span className="font-medium">{copied ? 'Copied!' : 'Share'}</span>
      </button>
      
      <button
        onClick={handleCopyLink}
        className="absolute right-0 top-full mt-2 hidden group-hover:flex items-center gap-2 px-3 py-2 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-lg shadow-lg text-sm"
      >
        <Copy className="w-4 h-4" />
        Copy Link
      </button>
    </div>
  );
};

export default ShareButton;