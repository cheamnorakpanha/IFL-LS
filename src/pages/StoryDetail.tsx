import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, User, Calendar, Share2, Tag, Twitter, Send, Link as LinkIcon, Check, X } from 'lucide-react';
import type { Story } from '../types/types';
import { INITIAL_STORIES } from '../types/constants';

const StoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Scroll to top when the component mounts or the story ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Retrieve story from location state (if navigated from Home) or fallback to INITIAL_STORIES
  const storyFromState = location.state?.story as Story | undefined;
  const storyFromConstants = INITIAL_STORIES.find(s => s.id === id);
  const story = storyFromState || storyFromConstants;

  if (!story) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 mb-4">
            <BookOpen className="w-8 h-8 text-stone-400" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[var(--ink)] mb-2">Story not found</h2>
        <p className="text-gray-500 mb-8">The story you are looking for does not exist or has been removed.</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--accent)] hover:bg-yellow-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Return to Library
        </Link>
      </div>
    );
  }

  // Use content if available, otherwise fallback to description
  const hasContent = story.content && story.content.trim().length > 0;
  const displayContent = hasContent ? story.content! : story.description;
  
  // Split by double newlines to create paragraphs
  const paragraphs = displayContent.split(/\n\s*\n/).filter(p => p.trim().length > 0);

  // --- Sharing Logic ---
  const currentUrl = window.location.href;
  const shareText = `Read the summary of "${story.title}" by ${story.author}.`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: shareText,
          url: currentUrl,
        });
      } catch (error: any) {
        console.log('Error sharing:', error);
        // Fallback to custom menu if native share fails (unless user cancelled)
        // This fixes the "Invalid URL" error in preview environments by showing the fallback menu
        if (error.name !== 'AbortError') {
          setIsShareMenuOpen(true);
        }
      }
    } else {
      // Fallback for desktop/unsupported browsers
      setIsShareMenuOpen(!isShareMenuOpen);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);
      setShowToast(true);
      
      // Reset states after delay
      setTimeout(() => {
        setIsCopied(false);
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      {/* Header Navigation */}
      <div className="bg-white border-b border-stone-200 sticky top-0 md:top-16 z-40 shadow-sm md:shadow-none">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link to="/" className="flex items-center text-gray-500 hover:text-[var(--accent)] transition-colors group">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Library</span>
            </Link>
            
            {/* Share Button & Dropdown */}
            <div className="relative">
                <button 
                  onClick={handleNativeShare}
                  className={`p-2 transition-colors rounded-full ${isShareMenuOpen ? 'bg-stone-100 text-[var(--ink)]' : 'text-gray-400 hover:text-ink hover:bg-stone-50'}`}
                  title="Share"
                >
                    <Share2 className="w-5 h-5" />
                </button>

                {/* Desktop Fallback Menu */}
                {isShareMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-stone-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex justify-between items-center px-3 py-2 border-b border-stone-100 mb-1">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Share via</span>
                      <button onClick={() => setIsShareMenuOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <a 
                      href={socialLinks.telegram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-500 rounded-md transition-colors"
                    >
                      <Send className="w-4 h-4" /> Telegram
                    </a>

                    <a 
                      href={socialLinks.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-slate-50 hover:text-black rounded-md transition-colors"
                    >
                      <Twitter className="w-4 h-4" /> X (Twitter)
                    </a>

                    <button 
                      onClick={copyToClipboard}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-stone-50 rounded-md transition-colors text-left"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <LinkIcon className="w-4 h-4" />}
                      {isCopied ? <span className="text-green-600 font-medium">Copied!</span> : 'Copy Link'}
                    </button>
                  </div>
                )}
            </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        {/* Title Section */}
        <header className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                Literature Summary
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[var(--ink)] mb-6 leading-tight">
                {story.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[var(--accent)]" />
                    <span>{story.author}</span>
                </div>
                <div className="flex items-center gap-2 hidden sm:flex">
                    <Calendar className="w-4 h-4 text-[var(--accent)]" />
                    <span>Published Work</span>
                </div>
            </div>
        </header>

        {/* Divider */}
        <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-stone-200 w-24"></div>
            <div className="mx-4 text-[var(--accent)] text-xl">❦</div>
            <div className="h-px bg-stone-200 w-24"></div>
        </div>

        {/* Content Body */}
        <div className="prose prose-stone prose-lg md:prose-xl mx-auto font-serif text-[var(--ink)]/90 leading-loose selection:bg-[var(--accent)]/20">
            {paragraphs.map((paragraph, index) => (
              <p 
                key={index} 
                className={
                    index === 0 
                    ? "first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:text-[var(--accent)] first-letter:mr-3 first-letter:float-left first-letter:leading-none mb-6" 
                    : "mb-6"
                }
              >
                {paragraph}
              </p>
            ))}
            
            {/* Context / Themes Box - Shows description if reading full content */}
            {hasContent && (
                <div className="mt-12 p-8 bg-orange-50 rounded-lg border border-orange-100 text-base not-prose">
                    <h3 className="font-bold text-[var(--ink)] mb-3 flex items-center gap-2 text-lg">
                        <Tag className="w-5 h-5 text-[var(--accent)]" />
                        About this Story
                    </h3>
                    <p className="text-gray-700 leading-relaxed italic">
                        {story.description}
                    </p>
                </div>
            )}
        </div>

        {/* Footer of Article */}
        <div className="mt-16 pt-8 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p className="font-serif italic">Thank you for reading.</p>
            <div className="flex gap-2">
                <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-bold uppercase tracking-wider text-stone-500">Fiction</span>
                <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-bold uppercase tracking-wider text-stone-500">Summary</span>
            </div>
        </div>
      </article>

      {/* Copied Alert Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[var(--ink)] text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-green-500 rounded-full p-0.5">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="font-medium">Copied successfully</span>
        </div>
      )}
    </div>
  );
};

export default StoryDetail;