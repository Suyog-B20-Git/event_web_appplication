// /Footer/Blog.jsx

import React from 'react';

function Blog() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#ff2459] mb-6">Our Event Blog</h1>

      {/* Blog Post 1 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Top 5 Wedding Trends in 2025</h2>
        <p className="text-gray-700">
          From sustainable decorations to drone photography, explore what's hot in wedding events this year.
        </p>
      </div>

      {/* Blog Post 2 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">How to Plan a Corporate Event that Stands Out</h2>
        <p className="text-gray-700">
          Tips on making your corporate events memorable with interactive activities and modern tech setups.
        </p>
      </div>

      {/* Blog Post 3 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Behind the Scenes: Managing a Music Festival</h2>
        <p className="text-gray-700">
          A day in the life of our event managers organizing a 5,000+ audience concert experience.
        </p>
      </div>
    </div>
  );
}

export default Blog;
