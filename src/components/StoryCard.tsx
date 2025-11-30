import React from "react";
import { Link } from "react-router-dom";
import type { Story } from "../types/types";
import { Feather, Sparkles, ArrowRight } from "lucide-react";

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-sm border border-stone-200 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {story.isAiGenerated && (
        <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
          <Sparkles className="w-4 h-4 text-[var(--accent)]" />
        </div>
      )}

      <div className="flex items-start gap-4 flex-grow">
        <div className="hidden sm:flex flex-col items-center justify-center w-12 h-12 bg-stone-100 rounded-full flex-shrink-0 text-stone-400">
          <Feather className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-serif font-bold text-[var(--ink)] mb-1 group-hover:text-[var(--accent)] transition-colors">
            {story.title}
          </h3>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4 flex items-center gap-2">
            By {story.author}
          </p>
          <p className="text-gray-700 leading-relaxed text-justify font-serif text-sm sm:text-base line-clamp-3">
            {story.description}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end">
        <Link
          to={`/story/${story.id}`}
          state={{ story }}
          className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-[var(--ink)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent)] transition-colors duration-300"
        >
          Read Story
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default StoryCard;
