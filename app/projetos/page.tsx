"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Projetos() {
  const [filter, setFilter] = useState("todos");

  const projetos = [
    {
      id: 1,
      title: "Residência Moderna",
      category: "residencial",
      image: "/images/projeto1.jpg",
      description: "Casa de alto padrão com 400m²"
    },
    {
      id: 2,
      title: "Edifício Comercial",
      category: "comercial",
      image: "/images/projeto2.jpg",
      description: "Prédio comercial de 8 andares"
    },
    {
      id: 3,
      title: "Reforma de Apartamento",
      category: "reforma",
      image: "/images/projeto3.jpg",
      description: "Apartamento de 120m² reformado"
    },
    {
      id: 4,
      title: "Galpão Industrial",
      category: "industrial",
      image: "/images/projeto4.jpg",
      description: "Galpão de 2000m²"
    },
    {
      id: 5,
      title: "Sobrado de Luxo",
      category: "residencial",
      image: "/images/projeto5.jpg",
      description: "Sobrado com 350m² e piscina"
    },
    {
      id: 6,
      title: "Loja Comercial",
      category: "comercial",
      image: "/images/projeto6.jpg",
      description: "Loja de 200m² em shopping"
    },
  ];

  const categorias = [
    { id: "todos", label: "Todos" },
    { id: "residencial", label: "Residencial" },
    { id: "comercial", label: "Comercial" },
    { id: "industrial", label: "Industrial" },
    { id: "reforma", label: "Reformas" },
  ];

  const projetosFiltrados = filter === "todos" 
    ? projetos 
    : projetos.filter(p => p.category === filter);

  return (
    <>
    <WhatsAppButton />
      <Header />
      <main className="page-wrapper">
        <section className="projetos-hero">
          <div className="container">
            <h1 className="title">Nossos Projetos</h1>
            <p className="subtitle">Conheça alguns dos trabalhos que já realizamos</p>
          </div>
        </section>

        <section className="projetos-content">
          <div className="container">
            <div className="filter-buttons">
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  className={`filter-btn ${filter === cat.id ? "active" : ""}`}
                  onClick={() => setFilter(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="projetos-grid">
              {projetosFiltrados.map((projeto) => (
                <div key={projeto.id} className="projeto-card">
                  <div className="projeto-image">
                    <img src={projeto.image} alt={projeto.title} />
                    <div className="overlay">
                      <h3>{projeto.title}</h3>
                      <p>{projeto.description}</p>
                      <span className="categoria">{projeto.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {projetosFiltrados.length === 0 && (
              <div className="empty-state">
                <p>Nenhum projeto encontrado nesta categoria.</p>
              </div>
            )}

            <div className="cta-section">
              <h2>Quer transformar seu projeto em realidade?</h2>
              <p>Entre em contato e vamos conversar sobre suas ideias</p>
              <a href="#contato" className="cta-button">
                Fale Conosco
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          background: #0A0A0A;
          padding-top: 80px;
        }

        .projetos-hero {
          background: linear-gradient(135deg, 
            rgba(212, 175, 55, 0.1) 0%,
            rgba(10, 10, 10, 0.95) 100%
          );
          padding: 6rem 2rem 4rem;
          text-align: center;
          border-bottom: 2px solid rgba(212, 175, 55, 0.2);
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .title {
          font-size: 4rem;
          font-weight: 700;
          background: linear-gradient(135deg, #D4AF37 0%, #F4E4A6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 300;
        }

        .projetos-content {
          padding: 5rem 2rem;
        }

        .filter-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 4rem;
        }

        .filter-btn {
          background: rgba(20, 20, 20, 0.8);
          color: #fff;
          border: 1px solid rgba(212, 175, 55, 0.3);
          padding: 0.8rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          border-color: #D4AF37;
          background: rgba(212, 175, 55, 0.1);
          transform: translateY(-2px);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
          color: #0A0A0A;
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
        }

        .projetos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 2.5rem;
          margin-bottom: 5rem;
        }

        .projeto-card {
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .projeto-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(212, 175, 55, 0.3);
        }

        .projeto-image {
          position: relative;
          width: 100%;
          height: 350px;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(212, 175, 55, 0.2);
        }

        .projeto-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .projeto-card:hover .projeto-image img {
          transform: scale(1.1);
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10, 10, 10, 0.95) 0%,
            rgba(10, 10, 10, 0.7) 50%,
            transparent 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .projeto-card:hover .overlay {
          opacity: 1;
        }

        .overlay h3 {
          font-size: 1.8rem;
          color: #D4AF37;
          margin-bottom: 0.5rem;
        }

        .overlay p {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1rem;
        }

        .categoria {
          display: inline-block;
          background: rgba(212, 175, 55, 0.2);
          color: #D4AF37;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          border: 1px solid rgba(212, 175, 55, 0.4);
          text-transform: capitalize;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.2rem;
        }

        .cta-section {
          background: linear-gradient(135deg, 
            rgba(212, 175, 55, 0.1) 0%,
            rgba(212, 175, 55, 0.05) 100%
          );
          padding: 4rem 3rem;
          border-radius: 20px;
          text-align: center;
          border: 2px solid rgba(212, 175, 55, 0.3);
          margin-top: 3rem;
        }

        .cta-section h2 {
          font-size: 2.5rem;
          color: #D4AF37;
          margin-bottom: 1rem;
        }

        .cta-section p {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
          color: #0A0A0A;
          padding: 1.2rem 3rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
          letter-spacing: 0.05em;
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(212, 175, 55, 0.6);
          background: linear-gradient(135deg, #F4E4A6 0%, #D4AF37 100%);
        }

        @media (max-width: 968px) {
          .title {
            font-size: 3rem;
          }

          .projetos-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
          }

          .filter-buttons {
            gap: 0.8rem;
          }

          .filter-btn {
            padding: 0.7rem 1.5rem;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 640px) {
          .title {
            font-size: 2.5rem;
          }

          .projetos-hero {
            padding: 5rem 1.5rem 3rem;
          }

          .projetos-content {
            padding: 3rem 1.5rem;
          }

          .projetos-grid {
            grid-template-columns: 1fr;
          }

          .projeto-image {
            height: 280px;
          }

          .overlay {
            opacity: 1;
            background: linear-gradient(
              to top,
              rgba(10, 10, 10, 0.9) 0%,
              rgba(10, 10, 10, 0.6) 60%,
              transparent 100%
            );
          }

          .cta-section {
            padding: 3rem 2rem;
          }

          .cta-section h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}