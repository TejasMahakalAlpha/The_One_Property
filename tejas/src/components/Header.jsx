import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();

  const isTransparentPage =
    location.pathname === "/about" ||
    location.pathname === "/contact" ||
    location.pathname === "/properties";

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (isTransparentPage) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isTransparentPage]);

  const isTransparent = isTransparentPage && !isScrolled;

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about" },
    { name: "Contact Us", to: "/contact" },
    { name: "Properties", to: "/properties" },
    //     { name: 'Text', to: '/text' }, // { name: 'Emi-Calculator', to: '/emiCalculator' },
  ];

  const headerClasses = isTransparent
    ? "w-full absolute top-0 z-50 transition-colors duration-300"
    : "w-full bg-white shadow-sm sticky top-0 z-50 transition-colors duration-300";

  const getNavLinkClasses = ({ isActive }) => {
    const baseClasses = "font-medium transition-colors hover:text-blue-400";
    if (isTransparent) {
      return `${baseClasses} ${
        isActive ? "text-white underline" : "text-gray-300"
      }`;
    }
    return `${baseClasses} ${isActive ? "text-blue-600" : "text-gray-700"}`;
  };

  return (
    <header className={headerClasses}>
      {/* Responsive Padding: px-4 on mobile, py-2 vertically */}
      <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-2">
        {/* Logo and Text Group */}
        <Link to="/" className="flex items-center space-x-1 min-w-0">
          
          {/* LOGO SIZE FIX: h-10 for mobile, lg:h-12 for laptop/desktop */}
          <img
            src={logo}
            alt="The One Property Logo"
            className="h-10 lg:h-12 w-auto object-contain flex-shrink-0" // **<- lg:h-18 को lg:h-12 से बदल दिया**
          />
          
          {/* LOGO TEXT SIZE FIX: text-xs for mobile for better fit */}
          <span
            className={`text-xs font-light ${
              isTransparent ? "text-gray-300" : "text-gray-600"
            }`}
          >
            The One Property
          </span>
        </Link>
        
        {/* Desktop Nav Links */}
        <div className="hidden items-center space-x-10 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.to} className={getNavLinkClasses}>
              {link.name}
            </NavLink>
          ))}
        </div>
        
        {/* Desktop Enquiry Button */}
        <div className="hidden lg:block">
          <Link
            to="/enquire"
            className="rounded bg-[#623654] px-6 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105"
          >
            Enquiry Now
          </Link>
        </div>
        
        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${
              isTransparent ? "text-white" : "text-gray-700"
            } focus:outline-none`}
          >
            
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              ></path>
              
            </svg>
            
          </button>
        </div>
        
      </nav>
      
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="bg-white px-6 pb-4 lg:hidden">
          
          <div className="flex flex-col space-y-4">
            
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `font-medium hover:text-blue-600 ${
                    isActive ? "text-blue-600" : "text-gray-700"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            <Link
              to="/enquire"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 rounded bg-[#2264AC] px-6 py-2 text-center text-sm font-semibold text-white shadow-sm"
            >
              Register Now
            </Link>
            
          </div>
          
        </div>
      )}
      
    </header>
  );
};

export default Header;