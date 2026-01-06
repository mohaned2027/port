import { useState } from 'react';
import Sidebar from '@/components/portfolio/Sidebar';
import Navbar from '@/components/portfolio/Navbar';
import AboutSection from '@/components/portfolio/AboutSection';
import ResumeSection from '@/components/portfolio/ResumeSection';
import PortfolioSection from '@/components/portfolio/PortfolioSection';
import BlogSection from '@/components/portfolio/BlogSection';
import ContactSection from '@/components/portfolio/ContactSection';

const Index = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activePage, setActivePage] = useState('About');

  const renderSection = () => {
    switch (activePage) {
      case 'About':
        return <AboutSection />;
      case 'Resume':
        return <ResumeSection />;
      case 'Portfolio':
        return <PortfolioSection />;
      case 'Blog':
        return <BlogSection />;
      case 'Contact':
        return <ContactSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <main className="mx-3 sm:mx-auto my-4 sm:mt-[60px] mb-[75px] lg:mb-[60px] min-w-[259px] max-w-[1200px] lg:flex lg:justify-center lg:items-stretch lg:gap-6">
      {/* Sidebar */}
      <Sidebar
        isExpanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded(!sidebarExpanded)}
      />

      {/* Main Content */}
      <div className="relative lg:min-w-[75%] lg:w-[75%]">
        {/* Navbar */}
        <Navbar activePage={activePage} onPageChange={setActivePage} />

        {/* Article Content */}
        <article
          className="card-gradient !p-4 sm:!p-[30px] shadow-portfolio-5"
          key={activePage}
        >
          {renderSection()}
        </article>
      </div>
    </main>
  );
};

export default Index;
