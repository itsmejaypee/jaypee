import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { personalInfo, navLinks } from "../data/portfolioData";

export default function Navbar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  // Close menu on route change
  if (pathname !== currentPath) {
    setCurrentPath(pathname);
    setIsOpen(false);
  }

  // Handle escape key and lock body scroll when mobile menu is open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    function onKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 h-11 border-b border-border transition-colors duration-base ease-out ${
        isOpen ? "bg-bg" : "bg-bg/80 backdrop-blur-md"
      }`}
    >
      <div className="w-full max-w-3xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <img
            src={personalInfo.avatarLight}
            alt={personalInfo.name}
            width={28}
            height={28}
            className="size-7 rounded-full object-cover shrink-0 dark:hidden"
          />
          <img
            src={personalInfo.avatarDark}
            alt={personalInfo.name}
            width={28}
            height={28}
            className="size-7 rounded-full object-cover shrink-0 hidden dark:block"
          />
          <span className="text-xs font-medium text-text truncate">
            {personalInfo.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-xs transition-colors duration-base ease-out ${
                  isActive ? "text-text" : "text-text-faint hover:text-text"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-panel"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="md:hidden relative size-11 -mr-3 shrink-0 flex items-center justify-center"
        >
          <span
            className={`absolute h-[0.8px] w-4 rounded-full bg-text transition-transform duration-base ease-out ${
              isOpen ? "translate-y-0 rotate-45" : "-translate-y-0.75 rotate-0"
            }`}
          />
          <span
            className={`absolute h-[0.8px] w-4 rounded-full bg-text transition-transform duration-base ease-out ${
              isOpen ? "translate-y-0 -rotate-45" : "translate-y-0.75 rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-nav-panel"
        className={`md:hidden fixed top-11 inset-x-0 h-[calc(100vh-2.75rem)] bg-bg transition-opacity duration-base ease-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-8 h-full">
          {navLinks.map((item, idx) => (
            <div
              key={item.to}
              style={{ transitionDelay: isOpen ? `${100 + idx * 60}ms` : "0ms" }}
              className={`transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `text-sm tracking-wider uppercase transition-colors duration-base ease-out ${
                    isActive ? "text-text" : "text-text-faint hover:text-text"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
