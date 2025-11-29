import React from "react";
import { ABOUT_CONTENT } from "../types/constants";

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
        <div className="bg-stone-100 px-6 py-12 text-center border-b border-stone-200">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-2">
            About Us
          </h1>
          <p className="text-stone-600 font-medium">
            The story behind Literature Studies
          </p>
        </div>

        <div className="p-8 md:p-12 space-y-10">
          {ABOUT_CONTENT.map((section, index) => (
            <section key={index} className="relative">
              <div className="flex items-start gap-4">
                <div className="hidden md:block w-1 h-1 mt-3 rounded-full bg-[var(--accent)] flex-shrink-0"></div>
                <div>
                  <h2 className="text-xl font-bold text-ink mb-3 font-serif">
                    {section.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-justify">
                    {section.content}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
