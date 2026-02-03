"use client";

export default function ContactSection() {
  return (
    <section className="contact-section">
      <div className="contact-content">
        <h2 className="contact-title">Vamos Realizar Seu Projeto?</h2>
        <p className="contact-text">
          Entre em contato e descubra como podemos transformar seus sonhos em realidade com qualidade,
          precisão e excelência em engenharia.
        </p>
        <a href="https://wa.me/5511981705658" className="cta-button" target="_blank" rel="noopener noreferrer">
          Falar no WhatsApp
        </a>
      </div>

      <style jsx>{`
        .contact-section {
          padding: 6rem 2rem;
          background:
            radial-gradient(ellipse at center, rgba(212, 175, 55, 0.05) 0%, transparent 70%),
            #0A0A0A;
          text-align: center;
        }

        .contact-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .contact-title {
          font-family: "Playfair Display", serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #D4AF37;
        }

        .contact-text {
          font-family: "Cormorant Garamond", serif;
          font-size: 1.2rem;
          margin-bottom: 3rem;
          color: #F4E4B0;
          line-height: 1.8;
        }

        .cta-button {
          display: inline-block;
          padding: 1.2rem 3rem;
          background: linear-gradient(135deg, #D4AF37, #B8941E);
          color: #0A0A0A;
          text-decoration: none;
          font-family: "Cormorant Garamond", serif;
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .cta-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
        }
      `}</style>
    </section>
  );
}
