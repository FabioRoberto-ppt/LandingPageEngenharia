"use client";

import { useState, useRef, useCallback } from "react";

const projects = [
  {
    title: "Reforma Residencial Premium",
    before:
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop",
    after:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  },
  {
    title: "Construção Comercial",
    before:
      "https://images.unsplash.com/photo-1590496793907-4fde2380ac44?w=800&h=600&fit=crop",
    after:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  },
  {
    title: "Modernização de Fachada",
    before:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    after:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
  },
];

export default function Gallery() {
  const [percents, setPercents] = useState([50, 50, 50]);
  const sliderRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isDragging = useRef<number | null>(null);

  const updatePercent = useCallback((index: number, clientX: number) => {
    const el = sliderRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pos = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPercents((prev) => {
      const next = [...prev];
      next[index] = (pos / rect.width) * 100;
      return next;
    });
  }, []);

  const onMouseDown = useCallback((index: number) => {
    isDragging.current = index;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent, index: number) => {
    if (isDragging.current === index) updatePercent(index, e.clientX);
  }, [updatePercent]);

  const onMouseUp = useCallback(() => {
    isDragging.current = null;
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent, index: number) => {
    isDragging.current = index;
    e.preventDefault();
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent, index: number) => {
    if (isDragging.current === index) {
      updatePercent(index, e.touches[0].clientX);
      e.preventDefault();
    }
  }, [updatePercent]);

  const onTouchEnd = useCallback(() => {
    isDragging.current = null;
  }, []);

  return (
    <section className="gallery-section" id="galeria">
      <h2 className="section-title">Antes &amp; Depois</h2>
      <p className="section-subtitle">Projetos que Transformam Espaços</p>

      <div className="gallery-container">
        {projects.map((project, i) => (
          <div className="project-card" key={i}>
            <div className="project-title">{project.title}</div>

            <div
              className="comparison-slider"
              ref={(el) => { sliderRefs.current[i] = el; }}
              onMouseMove={(e) => onMouseMove(e, i)}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              <img src={project.before} alt="Antes" className="comparison-image before-image" />

              <img
                src={project.after}
                alt="Depois"
                className="comparison-image after-image"
                style={{ clipPath: `inset(0 ${100 - percents[i]}% 0 0)` }}
              />

              <div
                className="slider-line"
                style={{ left: `${percents[i]}%` }}
                onMouseDown={() => onMouseDown(i)}
                onTouchStart={(e) => onTouchStart(e, i)}
                onTouchMove={(e) => onTouchMove(e, i)}
                onTouchEnd={onTouchEnd}
              >
                <div className="slider-handle">⟷</div>
              </div>

              <span className="slider-label label-before">Antes</span>
              <span className="slider-label label-after">Depois</span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .gallery-section {
          padding: 6rem 2rem;
          background: #1a1a1a;
          position: relative;
        }
        .gallery-section::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
        }

        .section-title {
          text-align: center;
          font-family: "Playfair Display", serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          margin-bottom: 1rem;
          color: #d4af37;
        }
        .section-subtitle {
          text-align: center;
          font-family: "Cormorant Garamond", serif;
          font-size: 1.2rem;
          color: #f4e4b0;
          margin-bottom: 4rem;
          opacity: 0.8;
        }

        .gallery-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
        }

        .project-card {
          background: #2a2a2a;
          border: 1px solid rgba(212,175,55,0.2);
          overflow: hidden;
          position: relative;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .project-card:hover {
          transform: translateY(-10px);
          border-color: #d4af37;
          box-shadow: 0 20px 60px rgba(212,175,55,0.2);
        }
        .project-title {
          padding: 1.5rem;
          font-family: "Playfair Display", serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #d4af37;
          text-align: center;
          border-bottom: 1px solid rgba(212,175,55,0.2);
        }

        .comparison-slider {
          position: relative;
          width: 100%;
          height: 400px;
          overflow: hidden;
          user-select: none;
          -webkit-user-select: none;
        }

        .comparison-image {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .before-image { z-index: 1; }
        .after-image  { z-index: 2; }

        .slider-line {
          position: absolute;
          top: 0;
          width: 3px;
          height: 100%;
          background: #d4af37;
          z-index: 3;
          cursor: ew-resize;
          box-shadow: 0 0 20px rgba(212,175,55,0.5);
          transform: translateX(-50%);
        }

        .slider-handle {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          width: 50px; height: 50px;
          background: linear-gradient(135deg, #d4af37, #b8941e);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0a0a0a;
          font-weight: bold;
          font-size: 1.2rem;
          box-shadow: 0 4px 20px rgba(212,175,55,0.6);
          cursor: ew-resize;
        }

        .slider-label {
          position: absolute;
          top: 20px;
          font-family: "Cormorant Garamond", serif;
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          background: rgba(10,10,10,0.8);
          color: #d4af37;
          z-index: 4;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border: 1px solid rgba(212,175,55,0.3);
        }
        .label-before { left: 20px; }
        .label-after  { right: 20px; }

        @media (max-width: 768px) {
          .gallery-container { grid-template-columns: 1fr; }
          .comparison-slider { height: 300px; }
        }
      `}</style>
    </section>
  );
}