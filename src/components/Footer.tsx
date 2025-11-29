import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-stone-200 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
        <p className="font-serif italic mb-2">
          "A classic is something that everybody wants to have read and nobody
          wants to read." — Mark Twain
        </p>
        <p>
          &copy; {new Date().getFullYear()} Literature Studies. IFL DOE Project.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
