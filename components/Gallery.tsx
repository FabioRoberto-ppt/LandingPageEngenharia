"use client";

import { useState, useEffect } from "react";

const projects = [
  {
    title: "Obra tabebuias, 40 condomínio Tamboré 10",
    before: "/images/Tambore1040.jpeg",
    after:  "/images/Tambore1040Final.jpeg",
  },
  {
    title: "Obra tabebuias, 54 condomínio tambore 10",
    before: "/images/Tambore10.jpeg",
    after:  "/images/Tambore10final.jpeg",
  },
  {
    title: "Obra cassias, 454 condomínio Tamboré 10",
    before: "/images/Tambore10454.jpeg",
    after: "/images/Tambore10454Final.jpeg",
  },
];

export default function Gallery() {
  const [activeImages, setActiveImages] = useState(projects.map(() => 'before'));

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImages(prev => 
        prev.map(state => state === 'before' ? 'after' : 'before')
      );
    }, 3000); // Alterna a cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="gallery-section" id="galeria">
      <h2 className="section-title">Antes &amp; Depois</h2>
      <p className="section-subtitle">Projetos que Transformam Espaços</p>

      <div className="gallery-container">
        {projects.map((project, i) => (
          <div className="project-card" key={i}>
            <div className="project-title">{project.title}</div>

            <div className="image-wrapper">
              <div 
                className={`image-layer ${activeImages[i] === 'before' ? 'active' : ''}`}
              >
                <img 
                  src={project.before} 
                  alt="Antes" 
                />
                <span className="image-label label-left">Antes</span>
              </div>

              <div 
                className={`image-layer ${activeImages[i] === 'after' ? 'active' : ''}`}
              >
                <img 
                  src={project.after} 
                  alt="Depois" 
                />
                <span className="image-label label-right">Depois</span>
              </div>
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
          top: 0; 
          left: 0; 
          right: 0;
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
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 3rem;
        }

        .project-card {
          background: #2a2a2a;
          border: 1px solid rgba(212,175,55,0.2);
          overflow: hidden;
          position: relative;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          border-radius: 12px;
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

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 400px;
          overflow: hidden;
        }

        .image-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }

        .image-layer.active {
          opacity: 1;
        }

        .image-layer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .image-label {
          position: absolute;
          top: 20px;
          font-family: "Cormorant Garamond", serif;
          font-size: 1rem;
          font-weight: 600;
          padding: 0.6rem 1.2rem;
          background: rgba(10,10,10,0.85);
          color: #d4af37;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border: 1px solid rgba(212,175,55,0.3);
          backdrop-filter: blur(4px);
          pointer-events: none;
          z-index: 2;
          border-radius: 4px;
        }

        .label-left {
          left: 20px;
        }

        .label-right {
          right: 20px;
        }

        @media (max-width: 768px) {
          .gallery-section {
            padding: 4rem 1rem;
          }
          
          .gallery-container { 
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .image-wrapper {
            height: 300px;
          }

          .image-label {
            font-size: 0.85rem;
            padding: 0.5rem 1rem;
            top: 15px;
          }

          .label-left {
            left: 15px;
          }

          .label-right {
            right: 15px;
          }
        }

        @media (max-width: 480px) {
          .image-wrapper { 
            height: 250px;
          }

          .project-title {
            font-size: 1.2rem;
            padding: 1rem;
          }

          .image-label {
            font-size: 0.75rem;
            padding: 0.4rem 0.8rem;
            top: 10px;
          }

          .label-left {
            left: 10px;
          }

          .label-right {
            right: 10px;
          }
        }
      `}</style>
    </section>
  );
}