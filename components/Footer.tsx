"use client";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Hebert Soares - Engenharia de Excelência. Todos os direitos reservados.</p>

      <style jsx>{`
        .footer {
          padding: 2rem;
          text-align: center;
          background: #1A1A1A;
          border-top: 1px solid rgba(212, 175, 55, 0.2);
          color: #F4E4B0;
          font-family: "Cormorant Garamond", serif;
          opacity: 0.7;
        }
      `}</style>
    </footer>
  );
}
