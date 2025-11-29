import React from "react";
import { Mail, Send } from "lucide-react";

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you shortly.");
    // In a real app, this would send data to a backend
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-4">
          Contact Us
        </h1>
        <div className="h-1 w-20 bg-[var(--accent)] mx-auto rounded-full"></div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden flex flex-col md:flex-row">
        {/* Contact Info Sidebar */}
        <div className="bg-stone-900 text-white p-8 md:w-1/3 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-4 font-serif text-[var(--accent)]">
              Get in Touch
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed mb-6">
              Hearing comments on how our content has been helpful to
              instructors and IFL students and how they have applied it to their
              work is an honor.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-stone-300">
              <Mail className="w-4 h-4 text-[var(--accent)]" />
              <span>contact@literaturestudies.ifl</span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8 md:w-2/3 bg-white">
          <p className="text-gray-600 mb-6 text-sm">
            Please inform us if you have found us to be helpful.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm bg-stone-50 focus:ring-[var(--accent)] focus:border-[var(--accent)] sm:text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm bg-stone-50 focus:ring-[var(--accent)] focus:border-[var(--accent)] sm:text-sm"
                placeholder="john@student.ifl.edu"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                required
                className="block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm bg-stone-50 focus:ring-[var(--accent)] focus:border-[var(--accent)] sm:text-sm resize-none"
                placeholder="How has this website helped you?"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 transition-colors"
              >
                Send Message
                <Send className="ml-2 w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
