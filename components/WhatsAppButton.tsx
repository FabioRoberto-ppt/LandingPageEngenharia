"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function WhatsAppButton() {
  const [showSpotlight, setShowSpotlight] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Mostrar spotlight apenas se estiver na home
    if (pathname === "/") {
      setShowSpotlight(true);
    }
  }, [pathname]);

  const closeSpotlight = () => {
    setShowSpotlight(false);
  };

  return (
    <>
      {/* Overlay escuro com spotlight */}
      {showSpotlight && (
        <div className="spotlight-overlay" onClick={closeSpotlight}>
          <div className="spotlight-content">
            <button className="close-spotlight" onClick={closeSpotlight}>
              ✕
            </button>
            <div className="spotlight-message">
              <h3>💬 Fale Conosco!</h3>
              <p>Estamos prontos para atender você pelo WhatsApp</p>
            </div>
          </div>
        </div>
      )}

      {/* Botão flutuante do WhatsApp */}
      <a
        href="https://wa.me/5511981705658"
        className={`whatsapp-float ${showSpotlight ? "spotlight-active" : ""}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Fale conosco no WhatsApp"
        onClick={() => setShowSpotlight(false)}
      >
        <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <style jsx>{`
        /* Overlay escuro com spotlight */
        .spotlight-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          z-index: 9998;
          animation: fadeIn 0.5s ease;
          cursor: pointer;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .spotlight-content {
          position: fixed;
          bottom: 100px;
          right: 110px;
          z-index: 9999;
          animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .close-spotlight {
          position: fixed;
          top: 30px;
          right: 30px;
          width: 45px;
          height: 45px;
          background: rgba(212, 175, 55, 0.2);
          border: 2px solid #D4AF37;
          border-radius: 50%;
          color: #D4AF37;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .close-spotlight:hover {
          background: rgba(212, 175, 55, 0.3);
          transform: rotate(90deg);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
        }

        .spotlight-message {
          background: linear-gradient(135deg, rgba(10, 10, 10, 0.95), rgba(20, 20, 20, 0.95));
          padding: 1.5rem 2rem;
          border-radius: 12px;
          border: 2px solid #D4AF37;
          box-shadow: 0 10px 40px rgba(212, 175, 55, 0.3);
          text-align: center;
          pointer-events: auto;
        }

        .spotlight-message h3 {
          color: #D4AF37;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          font-family: "Inter", sans-serif;
        }

        .spotlight-message p {
          color: #fff;
          font-size: 1rem;
          margin: 0;
          font-family: "Inter", sans-serif;
        }

        /* Botão flutuante do WhatsApp */
        .whatsapp-float {
          position: fixed;
          width: 60px;
          height: 60px;
          bottom: 30px;
          right: 30px;
          background: linear-gradient(135deg, #D4AF37, #B8941E);
          color: #0A0A0A;
          border-radius: 50%;
          box-shadow: 0 8px 30px rgba(212, 175, 55, 0.4);
          z-index: 10001;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          animation: pulse 2s infinite;
        }

        .whatsapp-float.spotlight-active {
          transform: scale(1.2);
          box-shadow: 
            0 0 0 0 rgba(212, 175, 55, 0.7),
            0 0 0 20px rgba(212, 175, 55, 0.3),
            0 0 0 40px rgba(212, 175, 55, 0.1),
            0 12px 40px rgba(212, 175, 55, 0.6);
          animation: spotlightPulse 1.5s infinite;
        }

        .whatsapp-float:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 12px 40px rgba(212, 175, 55, 0.6);
        }

        .whatsapp-float.spotlight-active:hover {
          transform: scale(1.25) rotate(5deg);
        }

        @keyframes pulse {
          0%,
          100% {
            box-shadow: 0 8px 30px rgba(212, 175, 55, 0.4);
          }
          50% {
            box-shadow:
              0 8px 30px rgba(212, 175, 55, 0.7),
              0 0 0 15px rgba(212, 175, 55, 0.1);
          }
        }

        @keyframes spotlightPulse {
          0%, 100% {
            box-shadow: 
              0 0 0 0 rgba(212, 175, 55, 0.7),
              0 0 0 20px rgba(212, 175, 55, 0.3),
              0 0 0 40px rgba(212, 175, 55, 0.1),
              0 12px 40px rgba(212, 175, 55, 0.6);
          }
          50% {
            box-shadow: 
              0 0 0 10px rgba(212, 175, 55, 0.5),
              0 0 0 30px rgba(212, 175, 55, 0.2),
              0 0 0 50px rgba(212, 175, 55, 0.05),
              0 15px 50px rgba(212, 175, 55, 0.8);
          }
        }

        @media (max-width: 768px) {
          .whatsapp-float {
            width: 50px;
            height: 50px;
            bottom: 20px;
            right: 20px;
          }

          .whatsapp-float svg {
            width: 24px;
            height: 24px;
          }

          .spotlight-content {
            bottom: 90px;
            right: 20px;
            left: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .spotlight-message {
            width: 100%;
            max-width: 320px;
          }

          .spotlight-message h3 {
            font-size: 1.3rem;
          }

          .spotlight-message p {
            font-size: 0.9rem;
          }

          .close-spotlight {
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
}