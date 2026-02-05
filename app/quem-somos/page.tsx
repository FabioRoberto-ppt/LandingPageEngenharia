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
            <p className="subtitle">Da prática no canteiro à gestão técnica</p>
          </div>
        </section>

        <section className="about-content">
          <div className="container">
            <div className="content-grid">
              <div className="text-content">
                <h2>Nossa História</h2>
                <p>
                  A Herbert Soares Engenharia nasceu de uma trajetória construída 
                  desde cedo. Aos 15 anos, iniciei minha vida profissional em obras 
                  ao lado do meu pai, pedreiro, aprendendo a importância do detalhe, 
                  da responsabilidade e do compromisso com o cliente.
                </p>
                <p>
                  Essa vivência completa — da base à gestão — moldou minha formação 
                  profissional. Durante a graduação em Engenharia Civil pela Uninove, 
                  segui trabalhando em obras, passando por todas as etapas: ajudante, 
                  meio-oficial, estagiário, encarregado, até atuar como engenheiro civil.
                </p>
                <p>
                  Ao longo dos anos, gerenciei obras comerciais como Ragazzo e Habib's, 
                  residências de alto padrão no Tamboré 10 (com áreas de até 1.000 m²), 
                  e projetos desafiadores como a Paparazzi Gold Bar em Osasco e 
                  residências para investimento em Porangaba.
                </p>
                <p>
                  Em <strong>02 de março de 2023</strong>, fundei oficialmente a 
                  Herbert Soares Engenharia, consolidando anos de experiência prática 
                  e técnica em uma empresa dedicada à excelência em cada projeto.
                </p>
              </div>

              <div className="photo-container">
                <div className="photo-wrapper">
                  <img 
                    src="/images/Hebert.png" 
                    alt="Herbert Soares - Engenheiro Civil"
                    className="founder-photo"
                  />
                </div>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <h3>10+</h3>
                <p>Anos de Experiência</p>
              </div>
              <div className="stat-card">
                <h3>50+</h3>
                <p>Projetos Concluídos</p>
              </div>
              <div className="stat-card">
                <h3>100%</h3>
                <p>Compromisso com Qualidade</p>
              </div>
            </div>

            <div className="mission-section">
              <h2>Nossa Atuação</h2>
              <div className="mission-grid">
                <div className="mission-card">
                  <h3>Gerenciamento de Obras</h3>
                  <p>
                    Acompanhamento técnico rigoroso, com controle de cronograma, 
                    custos, equipes e etapas críticas, sempre em defesa dos 
                    interesses do cliente.
                  </p>
                </div>
                <div className="mission-card">
                  <h3>Execução Completa</h3>
                  <p>
                    Da fundação à finalização, com gestão direta da execução, 
                    coordenação de equipes e garantia de qualidade em todas 
                    as etapas.
                  </p>
                </div>
                <div className="mission-card">
                  <h3>Residências de Médio e Alto Padrão</h3>
                  <p>
                    Especialização em projetos residenciais sofisticados, 
                    com atenção aos detalhes e acabamento de excelência.
                  </p>
                </div>
              </div>
            </div>

            <div className="values-section">
              <h2>Nossos Valores</h2>
              <div className="values-grid">
                <div className="value-card">
                  <div className="icon">🎯</div>
                  <h3>Qualidade</h3>
                  <p>Compromisso com a excelência desde a base até os acabamentos</p>
                </div>
                <div className="value-card">
                  <div className="icon">🤝</div>
                  <h3>Transparência</h3>
                  <p>Organização, controle e comunicação clara em todas as etapas</p>
                </div>
                <div className="value-card">
                  <div className="icon">💡</div>
                  <h3>Experiência Prática</h3>
                  <p>Conhecimento técnico aliado à vivência real do canteiro de obras</p>
                </div>
                <div className="value-card">
                  <div className="icon">⚡</div>
                  <h3>Responsabilidade</h3>
                  <p>Gestão eficiente de recursos, prazos e equipes</p>
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
          margin-bottom: 3rem;
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

        .photo-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .photo-wrapper {
          position: relative;
          width: 100%;
          max-width: 400px;
          aspect-ratio: 4/5;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.4s ease;
        }

        .photo-wrapper:hover {
          transform: translateY(-5px);
        }

        .founder-photo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          position: relative;
          z-index: 2;
          transition: all 0.4s ease;
          filter: 
            drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))
            drop-shadow(0 0 15px rgba(212, 175, 55, 0.4))
            drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3));
        }

        .photo-wrapper:hover .founder-photo {
          filter: 
            drop-shadow(0 0 12px rgba(212, 175, 55, 0.9))
            drop-shadow(0 0 25px rgba(212, 175, 55, 0.6))
            drop-shadow(0 0 40px rgba(212, 175, 55, 0.4))
            drop-shadow(0 8px 30px rgba(0, 0, 0, 0.4));
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 5rem;
        }

        .stat-card {
          background: linear-gradient(135deg, 
            rgba(212, 175, 55, 0.1) 0%,
            rgba(212, 175, 55, 0.05) 100%
          );
          padding: 1.5rem 1rem;
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
          font-size: 2.5rem;
          color: #D4AF37;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .stat-card p {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .mission-section {
          margin-bottom: 5rem;
          padding: 3rem 0;
        }

        .mission-section h2 {
          font-size: 2.5rem;
          color: #D4AF37;
          text-align: center;
          margin-bottom: 3rem;
        }

        .mission-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .mission-card {
          background: rgba(212, 175, 55, 0.05);
          padding: 2.5rem;
          border-radius: 12px;
          border: 1px solid rgba(212, 175, 55, 0.3);
          transition: all 0.3s ease;
        }

        .mission-card:hover {
          transform: translateY(-5px);
          border-color: #D4AF37;
          background: rgba(212, 175, 55, 0.08);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);
        }

        .mission-card h3 {
          font-size: 1.5rem;
          color: #D4AF37;
          margin-bottom: 1rem;
        }

        .mission-card p {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.85);
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

          .photo-wrapper {
            max-width: 350px;
            margin: 0 auto;
          }

          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }

          .stat-card {
            padding: 1.2rem 0.8rem;
          }

          .stat-card h3 {
            font-size: 2rem;
          }

          .stat-card p {
            font-size: 0.85rem;
          }

          .mission-grid,
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

          .photo-wrapper {
            max-width: 280px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .stat-card {
            padding: 1.5rem 1rem;
          }

          .stat-card h3 {
            font-size: 2.2rem;
          }

          .stat-card p {
            font-size: 0.9rem;
          }

          .text-content h2,
          .mission-section h2,
          .values-section h2 {
            font-size: 2rem;
          }

          .mission-grid,
          .values-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}