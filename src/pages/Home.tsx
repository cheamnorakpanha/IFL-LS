import React, { useState } from "react";
import { INITIAL_STORIES } from "../types/constants";
import StoryCard from "../components/StoryCard";
import type { Story } from "../types/types";
import { LoadingState } from "../types/types";
// import { generateStorySummary } from '../services/geminiService';
import { Search, Loader2, BookPlus, X } from "lucide-react";

const Home: React.FC = () => {
  const [stories] = useState<Story[]>(INITIAL_STORIES); // const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);

  // Helper to normalize text (remove accents, lowercase) for consistent searching
  const normalizeText = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  // Filter stories based on the active search query
  const displayedStories = stories.filter((story) =>
    normalizeText(story.title).includes(normalizeText(searchQuery))
  );

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // If input is empty, clear the search query (reset list)
    if (!searchInput.trim()) {
      setSearchQuery("");
      return;
    }

    setStatus(LoadingState.LOADING);
    setError(null);

    const term = normalizeText(searchInput.trim());

    // 1. Search locally first
    const hasLocalMatch = stories.some((story) =>
      normalizeText(story.title).includes(term)
    );

    if (hasLocalMatch) {
      setSearchQuery(searchInput.trim()); // Set query to trigger filter
      setStatus(LoadingState.SUCCESS);
      // Small delay to reset status to IDLE for UI feedback
      setTimeout(() => setStatus(LoadingState.IDLE), 500);
      return;
    }

    // 2. If no local match, try to generate it via AI
    try {
      // Simulate AI generation delay - we do not use this function currently
      // const newStory = await generateStorySummary(searchInput);
      // setStories(prev => [newStory, ...prev]);

      setSearchQuery(searchInput.trim()); // Filter to show the new story
      setStatus(LoadingState.SUCCESS);
    } catch (err) {
      setError(
        "Could not find that story locally, and AI generation failed. Please check the title or connection."
      );
      setStatus(LoadingState.ERROR);
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
    setError(null);
    setStatus(LoadingState.IDLE);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-4">
          Literary Summaries
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our curated collection of story summaries for IFL students.
          Search for a title, and if we don't have it, our AI assistant will
          summarize it for you.
        </p>
      </div>

      {/* Search & Generation Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 mb-12">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-ink">
          <BookPlus className="w-5 h-5 text-[var(--accent)]" />
          Expand the Library
        </h2>
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter a book title (e.g., 'The Great Gatsby')"
              className="block w-full pl-10 pr-10 py-3 border border-stone-300 rounded-md leading-5 bg-stone-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition duration-150 ease-in-out"
            />
            {searchInput && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={status === LoadingState.LOADING || !searchInput}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--accent)] hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm min-w-[120px]"
          >
            {status === LoadingState.LOADING ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </button>
        </form>
        {error && (
          <p className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded border border-red-100">
            {error}
          </p>
        )}
      </div>

      {/* Results Header */}
      {searchQuery && (
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-serif text-ink">
            Search results for "
            <span className="font-semibold">{searchQuery}</span>"
          </h3>
          <button
            onClick={clearSearch}
            className="text-sm text-[var(--accent)] hover:underline flex items-center gap-1"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* Stories Grid */}
      {displayedStories.length > 0 ? (
        <div className="space-y-8">
          {displayedStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 bg-stone-50 rounded-lg border border-dashed border-stone-300">
          <p>No stories found matching your search.</p>
          <button
            onClick={clearSearch}
            className="mt-2 text-[var(--accent)] font-medium hover:underline"
          >
            Show all stories
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
