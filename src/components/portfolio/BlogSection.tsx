import blogData from '@/data/blog.json';

const BlogSection = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <article className="animate-fade-in">
      <header>
        <h2 className="article-title mb-6 sm:mb-8">Blog</h2>
      </header>

      <section className="mb-3">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {blogData.posts.map((post) => (
            <li key={post.id}>
              <a href={post.link} className="blog-card block group">
                {/* Banner */}
                <figure className="w-full h-[200px] lg:h-[230px] rounded-t-xl sm:rounded-t-2xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-jet to-onyx flex items-center justify-center text-6xl text-orange-yellow/20 group-hover:scale-110 transition-transform duration-[250ms]">
                    {post.title.charAt(0)}
                  </div>
                </figure>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-light-gray/70 text-sm font-light">{post.category}</p>
                    <span className="w-1 h-1 rounded-full bg-light-gray/70" />
                    <time className="text-light-gray/70 text-sm font-light">
                      {formatDate(post.date)}
                    </time>
                  </div>

                  <h3 className="text-white-2 text-lg leading-tight mb-3 group-hover:text-orange-yellow transition-colors duration-[250ms]">
                    {post.title}
                  </h3>

                  <p className="text-light-gray text-sm font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default BlogSection;
