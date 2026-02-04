"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const projects = [
  {
    title: "Reforma Residencial Premium",
    before: "/images/CasaFinal1.jpeg",
    after:  "/images/CasaComeco1.jpeg",
  },
  {
    title: "Construção Comercial",
    before: "/images/CasaFinal2.jpeg",
    after:  "/images/CasaComeco2.jpeg",
  },
  {
    title: "Modernização de Fachada",
    before: "/images/CasaFinal3.jpeg",
    after: "/images/CasaComeco3.jpeg",
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
    const x = clientX - rect.left;
    
    // Clampar entre 0 e largura total
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const newPercent = (clampedX / rect.width) * 100;
    
    setPercents((prev) => {
      const next = [...prev];
      next[index] = newPercent;
      return next;
    });
  }, []);

  const onPointerDown = useCallback((index: number, e: React.PointerEvent) => {
    isDragging.current = index;
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
    updatePercent(index, e.clientX);
  }, [updatePercent]);

  const onPointerMove = useCallback((e: React.PointerEvent, index: number) => {
    if (isDragging.current === index) {
      updatePercent(index, e.clientX);
    }
  }, [updatePercent]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (isDragging.current !== null) {
      const target = e.currentTarget as HTMLElement;
      target.releasePointerCapture(e.pointerId);
      isDragging.current = null;
    }
  }, []);

  // Cleanup em caso de unmount durante drag
  useEffect(() => {
    return () => {
      isDragging.current = null;
    };
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
              onPointerMove={(e) => onPointerMove(e, i)}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            >
              {/* Imagem "Antes" (fica atrás) */}
              <img 
                src={project.before} 
                alt="Antes" 
                className="comparison-image before-image"
                draggable={false}
              />

              {/* Imagem "Depois" (fica na frente com clip) */}
              <div 
                className="after-container"
                style={{ 
                  width: `${percents[i]}%`,
                }}
              >
                <img
                  src={project.after}
                  alt="Depois"
                  className="comparison-image after-image"
                  draggable={false}
                  style={{
                    width: `${sliderRefs.current[i]?.getBoundingClientRect().width || 1000}px`,
                  }}
                />
              </div>

              {/* Linha divisória com handle */}
              <div
                className="slider-line"
                style={{ left: `${percents[i]}%` }}
                onPointerDown={(e) => onPointerDown(i, e)}
              >
                <div className="slider-handle">⟷</div>
              </div>

              {/* Labels */}
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
          touch-action: none;
        }

        .comparison-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
        }

        .before-image { 
          z-index: 1; 
        }

        .after-container {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          z-index: 2;
          overflow: hidden;
          will-change: width;
        }

        .after-image {
          height: 100%;
          object-fit: cover;
        }

        .slider-line {
          position: absolute;
          top: 0;
          width: 4px;
          height: 100%;
          background: #d4af37;
          z-index: 3;
          cursor: ew-resize;
          box-shadow: 0 0 20px rgba(212,175,55,0.5);
          transform: translateX(-50%);
          will-change: left;
        }

        .slider-line::before,
        .slider-line::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 30px;
          background: #d4af37;
        }

        .slider-line::before {
          top: 0;
        }

        .slider-line::after {
          bottom: 0;
        }

        .slider-handle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #d4af37, #b8941e);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0a0a0a;
          font-weight: bold;
          font-size: 1.4rem;
          box-shadow: 
            0 4px 20px rgba(212,175,55,0.6),
            0 0 0 3px rgba(10, 10, 10, 0.3);
          cursor: ew-resize;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .slider-handle:hover {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 
            0 6px 25px rgba(212,175,55,0.8),
            0 0 0 3px rgba(10, 10, 10, 0.3);
        }

        .slider-handle:active {
          transform: translate(-50%, -50%) scale(0.95);
        }

        .slider-label {
          position: absolute;
          top: 20px;
          font-family: "Cormorant Garamond", serif;
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          background: rgba(10,10,10,0.85);
          color: #d4af37;
          z-index: 4;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border: 1px solid rgba(212,175,55,0.3);
          backdrop-filter: blur(4px);
          pointer-events: none;
        }
        .label-before { left: 20px; }
        .label-after  { right: 20px; }

        @media (max-width: 768px) {
          .gallery-section {
            padding: 4rem 1rem;
          }
          
          .gallery-container { 
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .comparison-slider { 
            height: 300px;
          }

          .slider-handle {
            width: 46px;
            height: 46px;
            font-size: 1.2rem;
          }

          .slider-label {
            font-size: 0.75rem;
            padding: 0.4rem 0.8rem;
          }

          .label-before { left: 10px; top: 10px; }
          .label-after  { right: 10px; top: 10px; }
        }

        @media (max-width: 480px) {
          .comparison-slider { 
            height: 250px;
          }

          .project-title {
            font-size: 1.2rem;
            padding: 1rem;
          }
        }
      `}</style>
    </section>
  );
}