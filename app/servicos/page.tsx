"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Servicos() {
  const servicos = [
    {
      icon: "📋",
      title: "ART – Anotação de Responsabilidade Técnica",
      description: "Emissão de ART junto ao CREA para obras, serviços e laudos, garantindo respaldo legal, segurança técnica e conformidade com as normas vigentes.",
      items: []
    },
    {
      icon: "🎯",
      title: "Gerenciamento de Obras",
      description: "Planejamento, organização e controle de todas as etapas da obra. Atuação focada em organização, transparência e redução de riscos.",
      items: [
        "Elaboração e acompanhamento de cronograma físico",
        "Coordenação de equipes próprias e terceirizadas",
        "Controle de custos e medições",
        "Acompanhamento de prazos e etapas",
        "Interface com fornecedores e prestadores de serviço"
      ]
    },
    {
      icon: "🏗️",
      title: "Obras – Da Fundação à Chave",
      description: "Execução completa de obras residenciais e comerciais. Sempre com equipes especializadas e acompanhamento técnico contínuo.",
      items: [
        "Fundação e estrutura",
        "Alvenaria e vedações",
        "Instalações elétricas e hidráulicas",
        "Acabamentos",
        "Entrega final da obra"
      ]
    },
    {
      icon: "🔧",
      title: "Reformas e Adequações",
      description: "Reformas residenciais e comerciais, parciais ou completas. Serviços executados com planejamento técnico para evitar imprevistos, retrabalhos e desperdícios.",
      items: [
        "Demolições",
        "Adequações estruturais",
        "Atualização de instalações elétricas e hidráulicas",
        "Reorganização de layouts",
        "Acabamentos"
      ]
    },
    {
      icon: "👁️",
      title: "Acompanhamento Técnico",
      description: "Acompanhamento periódico ou integral da obra, garantindo qualidade e conformidade em cada etapa.",
      items: [
        "Conferência dos serviços executados",
        "Verificação de conformidade com projetos e normas técnicas",
        "Orientação técnica ao cliente",
        "Apoio na tomada de decisões ao longo da obra"
      ]
    },
    {
      icon: "🔍",
      title: "Vistorias Técnicas",
      description: "Realização de vistorias técnicas especializadas para diferentes finalidades.",
      items: [
        "Avaliação de imóveis",
        "Entrega e recebimento de obras",
        "Identificação de patologias construtivas",
        "Apoio técnico em negociações e regularizações"
      ]
    },
    {
      icon: "📄",
      title: "Laudos Técnicos",
      description: "Elaboração de laudos técnicos e pareceres de engenharia, conforme normas vigentes.",
      items: [
        "Laudos de vistoria",
        "Parecer técnico de engenharia"
      ]
    }
  ];

  return (
    <>
    <WhatsAppButton />
      <Header />
      <main className="page-wrapper">
        <section className="servicos-hero">
          <div className="container">
            <h1 className="title">Nossos Serviços</h1>
            <p className="subtitle">
              Soluções completas em engenharia civil com acompanhamento direto do engenheiro responsável
            </p>
          </div>
        </section>

        <section className="intro-section">
          <div className="container">
            <div className="intro-box">
              <p className="intro-text">
                A HBT Engenharia atua de forma completa na área da engenharia civil, 
                oferecendo soluções técnicas desde a concepção do projeto até a entrega 
                final da obra, sempre com <strong>acompanhamento direto do engenheiro responsável</strong>.
              </p>
            </div>
          </div>
        </section>

        <section className="servicos-content">
          <div className="container">
            <div className="servicos-grid">
              {servicos.map((servico, index) => (
                <div key={index} className="servico-card">
                  <div className="card-header">
                    <div className="card-icon">{servico.icon}</div>
                    <h3>{servico.title}</h3>
                  </div>
                  <p className="description">{servico.description}</p>
                  {servico.items.length > 0 && (
                    <ul className="items-list">
                      {servico.items.map((item, i) => (
                        <li key={i}>
                          <span className="bullet">●</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="cta-section">
              <div className="cta-content">
                <h2>Precisa de um orçamento?</h2>
                <p>Entre em contato e receba uma proposta personalizada para seu projeto</p>
                <a href="#contato" className="cta-button">
                  Solicitar Orçamento
                </a>
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

        .servicos-hero {
          background: linear-gradient(135deg, 
            rgba(212, 175, 55, 0.15) 0%,
            rgba(10, 10, 10, 0.95) 100%
          );
          padding: 6rem 2rem 4rem;
          text-align: center;
          border-bottom: 2px solid rgba(212, 175, 55, 0.3);
          position: relative;
          overflow: hidden;
        }

        .servicos-hero::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
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
          color: rgba(255, 255, 255, 0.85);
          font-weight: 300;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .intro-section {
          padding: 4rem 2rem;
          background: rgba(10, 10, 10, 0.8);
        }

        .intro-box {
          background: linear-gradient(135deg, 
            rgba(212, 175, 55, 0.08) 0%,
            rgba(212, 175, 55, 0.03) 100%
          );
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 12px;
          padding: 2.5rem;
          text-align: center;
        }

        .intro-text {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          max-width: 900px;
          margin: 0 auto;
        }

        .intro-text strong {
          color: #D4AF37;
          font-weight: 600;
        }

        .servicos-content {
          padding: 5rem 2rem 6rem;
        }

        .servicos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 2.5rem;
          margin-bottom: 5rem;
        }

        .servico-card {
          background: linear-gradient(135deg, 
            rgba(20, 20, 20, 0.9) 0%,
            rgba(15, 15, 15, 0.9) 100%
          );
          padding: 2.5rem;
          border-radius: 16px;
          border: 1px solid rgba(212, 175, 55, 0.25);
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
          height: 3px;
          background: linear-gradient(90deg, #D4AF37, #F4E4A6, #D4AF37);
          transform: scaleX(0);
          transition: transform 0.4s ease;
          transform-origin: left;
        }

        .servico-card:hover {
          transform: translateY(-8px);
          border-color: #D4AF37;
          background: linear-gradient(135deg, 
            rgba(212, 175, 55, 0.08) 0%,
            rgba(15, 15, 15, 0.95) 100%
          );
          box-shadow: 0 20px 40px rgba(212, 175, 55, 0.25);
        }

        .servico-card:hover::before {
          transform: scaleX(1);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .card-icon {
          font-size: 3.5rem;
          line-height: 1;
          flex-shrink: 0;
        }

        .servico-card h3 {
          font-size: 1.5rem;
          color: #D4AF37;
          margin: 0;
          font-weight: 600;
          line-height: 1.3;
        }

        .description {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .items-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .items-list li {
          color: rgba(255, 255, 255, 0.8);
          padding: 0.5rem 0;
          font-size: 0.95rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          line-height: 1.6;
        }

        .bullet {
          color: #D4AF37;
          font-size: 0.6rem;
          margin-top: 0.5rem;
          flex-shrink: 0;
        }

        .cta-section {
          margin-top: 4rem;
          padding: 0 1rem;
        }

        .cta-content {
          background: linear-gradient(135deg, 
            rgba(212, 175, 55, 0.12) 0%,
            rgba(212, 175, 55, 0.05) 100%
          );
          padding: 4rem 3rem;
          border-radius: 20px;
          text-align: center;
          border: 2px solid rgba(212, 175, 55, 0.4);
          position: relative;
          overflow: hidden;
        }

        .cta-content::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 60%);
          pointer-events: none;
        }

        .cta-section h2 {
          font-size: 2.5rem;
          color: #D4AF37;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }

        .cta-section p {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 2.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
        }

        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
          color: #0A0A0A;
          padding: 1.2rem 3.5rem;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(212, 175, 55, 0.6);
          background: linear-gradient(135deg, #F4E4A6 0%, #D4AF37 100%);
        }

        @media (max-width: 968px) {
          .title {
            font-size: 3rem;
          }

          .subtitle {
            font-size: 1.1rem;
          }

          .servicos-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .intro-text {
            font-size: 1.1rem;
          }

          .cta-content {
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

          .subtitle {
            font-size: 1rem;
          }

          .servicos-hero {
            padding: 5rem 1.5rem 3rem;
          }

          .intro-section {
            padding: 3rem 1.5rem;
          }

          .intro-box {
            padding: 2rem 1.5rem;
          }

          .intro-text {
            font-size: 1rem;
          }

          .servicos-content {
            padding: 3rem 1.5rem 4rem;
          }

          .servico-card {
            padding: 2rem 1.5rem;
          }

          .card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .card-icon {
            font-size: 3rem;
          }

          .servico-card h3 {
            font-size: 1.3rem;
          }

          .description {
            font-size: 1rem;
          }

          .items-list li {
            font-size: 0.9rem;
          }

          .cta-content {
            padding: 2.5rem 1.5rem;
          }

          .cta-section h2 {
            font-size: 1.8rem;
          }

          .cta-section p {
            font-size: 1rem;
          }

          .cta-button {
            padding: 1rem 2.5rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}