"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function QuemSomos() {
  return (
    <>
      <Header />
      <main className="page-wrapper">
        <section className="quem-somos-hero">
          <div className="container">
            <h1 className="title">Quem Somos</h1>
            <p className="subtitle">Excelência em engenharia e construção civil</p>
          </div>
        </section>

        <section className="about-content">
          <div className="container">
            <div className="content-grid">
              <div className="text-content">
                <h2>Nossa História</h2>
                <p>
                  A Herbert Soares Engenharia é uma empresa especializada em soluções 
                  completas de engenharia civil e construção. Com anos de experiência 
                  no mercado, nos consolidamos como referência em qualidade e inovação.
                </p>
                <p>
                  Nossa equipe é formada por profissionais altamente qualificados, 
                  comprometidos em entregar projetos que superam as expectativas dos 
                  nossos clientes.
                </p>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <h3>15+</h3>
                  <p>Anos de Experiência</p>
                </div>
                <div className="stat-card">
                  <h3>200+</h3>
                  <p>Projetos Concluídos</p>
                </div>
                <div className="stat-card">
                  <h3>100%</h3>
                  <p>Satisfação dos Clientes</p>
                </div>
              </div>
            </div>

            <div className="values-section">
              <h2>Nossos Valores</h2>
              <div className="values-grid">
                <div className="value-card">
                  <div className="icon">🎯</div>
                  <h3>Qualidade</h3>
                  <p>Comprometimento com a excelência em cada projeto</p>
                </div>
                <div className="value-card">
                  <div className="icon">🤝</div>
                  <h3>Confiança</h3>
                  <p>Transparência e honestidade em todas as relações</p>
                </div>
                <div className="value-card">
                  <div className="icon">💡</div>
                  <h3>Inovação</h3>
                  <p>Tecnologia e métodos modernos de construção</p>
                </div>
                <div className="value-card">
                  <div className="icon">⚡</div>
                  <h3>Eficiência</h3>
                  <p>Prazos cumpridos e gestão otimizada de recursos</p>
                </div>
              </div>
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

        .quem-somos-hero {
          background: linear-gradient(135deg, 
            rgba(212, 175, 55, 0.1) 0%,
            rgba(10, 10, 10, 0.95) 100%
          );
          padding: 6rem 2rem 4rem;
          text-align: center;
          border-bottom: 2px solid rgba(212, 175, 55, 0.2);
        }

        .container {
          max-width: 1200px;
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

        .about-content {
          padding: 5rem 2rem;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-bottom: 5rem;
          align-items: center;
        }

        .text-content h2 {
          font-size: 2.5rem;
          color: #D4AF37;
          margin-bottom: 1.5rem;
        }

        .text-content p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1.5rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .stat-card {
          background: linear-gradient(135deg, 
            rgba(212, 175, 55, 0.1) 0%,
            rgba(212, 175, 55, 0.05) 100%
          );
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid rgba(212, 175, 55, 0.3);
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          border-color: #D4AF37;
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);
        }

        .stat-card h3 {
          font-size: 3rem;
          color: #D4AF37;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .stat-card p {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .values-section {
          margin-top: 5rem;
        }

        .values-section h2 {
          font-size: 2.5rem;
          color: #D4AF37;
          text-align: center;
          margin-bottom: 3rem;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .value-card {
          background: rgba(20, 20, 20, 0.8);
          padding: 2.5rem 2rem;
          border-radius: 12px;
          border: 1px solid rgba(212, 175, 55, 0.2);
          transition: all 0.3s ease;
          text-align: center;
        }

        .value-card:hover {
          transform: translateY(-5px);
          border-color: #D4AF37;
          background: rgba(212, 175, 55, 0.05);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.15);
        }

        .icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .value-card h3 {
          font-size: 1.5rem;
          color: #D4AF37;
          margin-bottom: 1rem;
        }

        .value-card p {
          font-size: 1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 968px) {
          .title {
            font-size: 3rem;
          }

          .content-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .values-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }

        @media (max-width: 640px) {
          .title {
            font-size: 2.5rem;
          }

          .quem-somos-hero {
            padding: 5rem 1.5rem 3rem;
          }

          .about-content {
            padding: 3rem 1.5rem;
          }

          .text-content h2,
          .values-section h2 {
            font-size: 2rem;
          }

          .values-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}