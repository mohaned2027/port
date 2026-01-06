interface NavbarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const pages = ['About', 'Resume', 'Portfolio', 'Blog', 'Contact'];

const Navbar = ({ activePage, onPageChange }: NavbarProps) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full lg:absolute lg:bottom-auto lg:top-0 lg:left-auto lg:right-0 lg:w-auto bg-onyx/75 backdrop-blur-[10px] border border-jet rounded-t-xl lg:rounded-none lg:rounded-tr-[20px] lg:rounded-bl-[20px] z-[5] shadow-portfolio-2 lg:shadow-none">
      <ul className="flex flex-wrap justify-center items-center px-2.5 lg:gap-[30px] lg:px-10">
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`text-[11px] sm:text-[14px] lg:text-[15px] py-5 px-2 sm:px-3 lg:font-medium transition-colors duration-[250ms]
                ${activePage === page 
                  ? 'text-orange-yellow' 
                  : 'text-light-gray hover:text-light-gray/70'
                }
              `}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
