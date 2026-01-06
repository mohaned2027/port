import { useState } from 'react';
import { Eye, ChevronDown } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const filteredProjects = activeCategory === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(
        (project) => project.category.toLowerCase() === activeCategory.toLowerCase()
      );

  return (
    <article className="animate-fade-in">
      <header>
        <h2 className="article-title mb-6 sm:mb-8">Portfolio</h2>
      </header>

      {/* Filter - Desktop */}
      <ul className="hidden md:flex items-center gap-6 pl-1 mb-8">
        {portfolioData.categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => setActiveCategory(category)}
              className={`text-[15px] transition-colors duration-[250ms]
                ${activeCategory === category
                  ? 'text-orange-yellow'
                  : 'text-light-gray hover:text-light-gray/70'
                }
              `}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      {/* Filter - Mobile Select */}
      <div className="relative md:hidden mb-6">
        <button
          onClick={() => setIsSelectOpen(!isSelectOpen)}
          className="bg-eerie-black-2 text-light-gray flex justify-between items-center w-full px-4 py-3 border border-jet rounded-xl text-sm font-light"
        >
          <span>{activeCategory === 'All' ? 'Select category' : activeCategory}</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-150 ${isSelectOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isSelectOpen && (
          <ul className="absolute top-full left-0 right-0 mt-1.5 bg-eerie-black-2 border border-jet rounded-xl p-1.5 z-10">
            {portfolioData.categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => {
                    setActiveCategory(category);
                    setIsSelectOpen(false);
                  }}
                  className="w-full text-left text-light-gray text-sm font-light capitalize px-3 py-2 rounded-lg hover:bg-jet/50 transition-colors"
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Projects Grid */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-3">
        {filteredProjects.map((project) => (
          <li key={project.id} className="animate-scale-up">
            <a href={project.link} className="block group">
              <figure className="project-img-wrapper">
                <div className="absolute inset-0 bg-gradient-to-br from-jet to-onyx flex items-center justify-center text-6xl text-orange-yellow/30">
                  {project.title.charAt(0)}
                </div>
                <div className="project-icon-box">
                  <Eye size={20} />
                </div>
              </figure>

              <h3 className="text-white-2 text-[15px] font-normal capitalize leading-tight ml-2.5 mb-1 group-hover:text-orange-yellow transition-colors">
                {project.title}
              </h3>
              <p className="text-light-gray/70 text-sm font-light ml-2.5">
                {project.category}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default PortfolioSection;
