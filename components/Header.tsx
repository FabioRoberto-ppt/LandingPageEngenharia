"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { MouseEvent } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollToSection(href);
    } else {
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname === path;
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-bg"></div>
      
      <div className="header-container">
        <div className="logo">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <img src="/images/Logo2.svg" alt="Herbert Soares" className="logo-image" />
          </Link>
        </div>

        <nav className={`nav ${mobileMenuOpen ? "open" : ""}`}>
          <Link 
            href="/" 
            className={isActive("/") ? "active" : ""}
            onClick={(e) => handleNavClick(e, "/")}
          >
            Home
          </Link>
          
          <Link 
            href="/quem-somos" 
            className={isActive("/quem-somos") ? "active" : ""}
            onClick={(e) => handleNavClick(e, "/quem-somos")}
          >
            Quem Somos
          </Link>
          
          <Link 
            href="/servicos" 
            className={isActive("/servicos") ? "active" : ""}
            onClick={(e) => handleNavClick(e, "/servicos")}
          >
            Serviços
          </Link>
          
          <Link 
            href="#contato" 
            className="nav-cta"
            onClick={(e) => handleNavClick(e, "#contato")}
          >
            Contato
          </Link>

          <div className="social-links">
            <a 
              href="https://wa.me/5511981705658" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon whatsapp"
              aria-label="WhatsApp"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor"/>
              </svg>
            </a>
            
            <a 
              href="https://instagram.com/seuusuario" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon instagram"
              aria-label="Instagram"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </nav>

        <button 
          className={`mobile-toggle ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.2rem 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .header-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, 
            rgba(10, 10, 10, 0.95) 0%,
            rgba(10, 10, 10, 0.85) 100%
          );
          backdrop-filter: blur(12px);
          opacity: 0;
          transition: opacity 0.4s ease;
          border-bottom: 1px solid transparent;
        }

        .header.scrolled .header-bg {
          opacity: 1;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .logo-image {
          height: 55px;
          width: auto;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          filter: brightness(1);
        }

        .header.scrolled .logo-image {
          height: 48px;
        }

        .logo-image:hover {
          filter: brightness(1.2) drop-shadow(0 0 20px rgba(212, 175, 55, 0.4));
          transform: translateY(-2px);
        }

        .nav {
          display: flex;
          gap: 3rem;
          align-items: center;
        }

        .nav :global(a) {
          font-family: "Inter", -apple-system, sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: #fff;
          text-decoration: none;
          letter-spacing: 0.02em;
          position: relative;
          padding: 0.6rem 0;
          transition: all 0.3s ease;
        }

        .nav :global(a)::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #D4AF37, #F4E4A6);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav :global(a:hover),
        .nav :global(a.active) {
          color: #D4AF37;
        }

        .nav :global(a:hover)::after,
        .nav :global(a.active)::after {
          width: 100%;
        }

        .nav :global(.nav-cta) {
          background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
          color: #0A0A0A !important;
          padding: 0.75rem 1.8rem !important;
          border-radius: 4px;
          font-weight: 600;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
          transition: all 0.3s ease;
        }

        .nav :global(.nav-cta)::after {
          display: none;
        }

        .nav :global(.nav-cta:hover) {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(212, 175, 55, 0.5);
          background: linear-gradient(135deg, #F4E4A6 0%, #D4AF37 100%);
          color: #0A0A0A !important;
        }

        .mobile-toggle {
          display: none;
          flex-direction: column;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          position: relative;
          z-index: 10;
        }

        .mobile-toggle span {
          width: 26px;
          height: 2px;
          background: #D4AF37;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 2px;
        }

        .mobile-toggle:hover span {
          background: #F4E4A6;
        }

        .mobile-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(8px, 8px);
        }

        .mobile-toggle.active span:nth-child(2) {
          opacity: 0;
          transform: translateX(20px);
        }

        .mobile-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(8px, -8px);
        }

        .social-links {
          display: none;
        }

        @media (max-width: 968px) {
          .header-container {
            padding: 0 2rem;
          }

          .nav {
            gap: 2rem;
          }

          .nav :global(a) {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 768px) {
          .mobile-toggle {
            display: flex;
          }

          .nav {
            position: fixed;
            top: 0;
            right: -100%;
            height: 100vh;
            width: 280px;
            background: linear-gradient(135deg, 
              rgba(10, 10, 10, 0.98) 0%,
              rgba(20, 20, 20, 0.98) 100%
            );
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 2rem;
            padding: 3rem 2.5rem;
            border-left: 2px solid rgba(212, 175, 55, 0.3);
            box-shadow: -10px 0 50px rgba(0, 0, 0, 0.9);
            transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .nav.open {
            right: 0;
          }

          .nav :global(a) {
            font-size: 1.1rem;
            width: 100%;
            padding: 0.8rem 0;
          }

          .nav :global(a)::after {
            bottom: 5px;
          }

          .nav :global(.nav-cta) {
            margin-top: 1rem;
            text-align: center;
          }

          .social-links {
            display: flex;
            gap: 2rem;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(212, 175, 55, 0.2);
            justify-content: center;
            width: 100%;
          }

          .social-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #D4AF37;
            transition: all 0.3s ease;
            filter: brightness(1.1);
          }

          .social-icon:hover {
            transform: translateY(-3px);
            filter: brightness(1.4) drop-shadow(0 4px 15px rgba(212, 175, 55, 0.5));
          }

          .social-icon svg {
            width: 32px;
            height: 32px;
          }

          .logo-image {
            height: 48px;
          }

          .header.scrolled .logo-image {
            height: 42px;
          }
        }

        @media (max-width: 480px) {
          .header-container {
            padding: 0 1.5rem;
          }

          .nav {
            width: 85%;
            padding: 3rem 2rem;
          }

          .logo-image {
            height: 44px;
          }

          .header.scrolled .logo-image {
            height: 38px;
          }
        }
      `}</style>
    </header>
  );
}