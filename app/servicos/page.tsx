"use client";

export default function Servicos() {
  const servicos = [
    {
      icon: "🏗️",
      title: "Construção Civil",
      description: "Obras residenciais, comerciais e industriais com qualidade e segurança",
      items: ["Casas", "Edifícios", "Galpões", "Reformas"]
    },
    {
      icon: "📐",
      title: "Projetos Arquitetônicos",
      description: "Desenvolvimento de projetos personalizados e funcionais",
      items: ["Arquitetura", "Design de interiores", "Paisagismo", "3D e renders"]
    },
    {
      icon: "⚙️",
      title: "Engenharia Estrutural",
      description: "Cálculos e projetos estruturais precisos e seguros",
      items: ["Estruturas metálicas", "Concreto armado", "Fundações", "Laudos técnicos"]
    },
    {
      icon: "🔧",
      title: "Instalações",
      description: "Sistemas elétricos, hidráulicos e de climatização",
      items: ["Elétrica", "Hidráulica", "Ar condicionado", "Automação"]
    },
    {
      icon: "🎨",
      title: "Acabamento",
      description: "Serviços de acabamento fino e personalizado",
      items: ["Pintura", "Revestimentos", "Marcenaria", "Gesso"]
    },
    {
      icon: "📋",
      title: "Consultoria",
      description: "Assessoria técnica e gerenciamento de obras",
      items: ["Orçamentos", "Cronogramas", "Fiscalização", "Regularização"]
    }
  ];

  return (
    <main className="page-wrapper">
      <section className="servicos-hero">
        <div className="container">
          <h1 className="title">Nossos Serviços</h1>
          <p className="subtitle">Soluções completas em engenharia e construção</p>
        </div>
      </section>

      <section className="servicos-content">
        <div className="container">
          <div className="servicos-grid">
            {servicos.map((servico, index) => (
              <div key={index} className="servico-card">
                <div className="card-icon">{servico.icon}</div>
                <h3>{servico.title}</h3>
                <p className="description">{servico.description}</p>
                <ul className="items-list">
                  {servico.items.map((item, i) => (
                    <li key={i}>
                      <span className="check">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="cta-section">
            <h2>Precisa de um orçamento?</h2>
            <p>Entre em contato conosco e receba uma proposta personalizada para seu projeto</p>
            <a href="#contato" className="cta-button">
              Solicitar Orçamento
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          background: #0A0A0A;
          padding-top: 80px;
        }

        .servicos-hero {
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

        .servicos-content {
          padding: 5rem 2rem;
        }

        .servicos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2.5rem;
          margin-bottom: 5rem;
        }

        .servico-card {
          background: rgba(20, 20, 20, 0.6);
          padding: 3rem 2.5rem;
          border-radius: 16px;
          border: 1px solid rgba(212, 175, 55, 0.2);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .servico-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #D4AF37, #F4E4A6);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .servico-card:hover {
          transform: translateY(-10px);
          border-color: #D4AF37;
          background: rgba(212, 175, 55, 0.05);
          box-shadow: 0 20px 40px rgba(212, 175, 55, 0.2);
        }

        .servico-card:hover::before {
          transform: scaleX(1);
        }

        .card-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
        }

        .servico-card h3 {
          font-size: 1.8rem;
          color: #D4AF37;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .description {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .items-list {
          list-style: none;
          padding: 0;
        }

        .items-list li {
          color: rgba(255, 255, 255, 0.9);
          padding: 0.6rem 0;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .check {
          color: #D4AF37;
          font-weight: bold;
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

          .servicos-grid {
            grid-template-columns: 1fr;
          }

          .cta-section {
            padding: 3rem 2rem;
          }

          .cta-section h2 {
            font-size: 2rem;
          }
        }

        @media (max-width: 640px) {
          .title {
            font-size: 2.5rem;
          }

          .servicos-hero {
            padding: 5rem 1.5rem 3rem;
          }

          .servicos-content {
            padding: 3rem 1.5rem;
          }

          .servico-card {
            padding: 2rem 1.5rem;
          }

          .servico-card h3 {
            font-size: 1.5rem;
          }

          .cta-section h2 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </main>
  );
}