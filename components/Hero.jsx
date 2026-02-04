"use client";

import { useState, useRef, useCallback } from "react";

export default function Hero() {
  const W = 1440;
  const H = 900;
  const gap = 7;
  const groupSpacing = 220;

  const logoRef = useRef(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg) translateZ(0px)");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const el = logoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    // posição relativa do mouse dentro do elemento (0 a 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // centra em 0: de -1 a 1
    const nx = (x - 0.5) * 2;
    const ny = (y - 0.5) * 2;

    // ângulos máximos
    const maxRotate = 10;
    const maxTranslateZ = 40;

    // rotateY segue o eixo X do mouse, rotateX segue o eixo Y (invertido)
    const rotY =  nx * maxRotate;
    const rotX = -ny * maxRotate;
    const tz   = -maxTranslateZ + (1 - Math.abs(nx) * 0.5 - Math.abs(ny) * 0.5) * 10;

    setTransform(`rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${tz}px) scale(0.95)`);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransform("rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)");
  }, []);

  const linesDown = [];
  const linesUp   = [];

  for (let cx = -600; cx <= W + 600; cx += groupSpacing) {
    for (let d = -gap; d <= gap; d += gap) {
      const x = cx + d;
      linesDown.push(
        <line key={`d-${cx}-${d}`} x1={x} y1={0} x2={x + H} y2={H} />
      );
      linesUp.push(
        <line key={`u-${cx}-${d}`} x1={x} y1={0} x2={x - H} y2={H} />
      );
    }
  }

  const shines = [
    { cx: 200,  delay: "0s",     dur: "12s" },
    { cx: 500,  delay: "3.5s",   dur: "13s" },
    { cx: 800,  delay: "7s",     dur: "11.5s" },
    { cx: 1100, delay: "2s",     dur: "14s" },
    { cx: 350,  delay: "9s",     dur: "12.5s" },
    { cx: 650,  delay: "5s",     dur: "13.5s" },
    { cx: 950,  delay: "6.5s",   dur: "11s" },
    { cx: 1250, delay: "1s",     dur: "14.5s" },
  ];

  return (
    <section className="hero">
      <svg className="bg-lines" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="fadeH" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="black" stopOpacity="1" />
            <stop offset="16%"  stopColor="black" stopOpacity="0" />
            <stop offset="84%"  stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="fadeV" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="black" stopOpacity="1" />
            <stop offset="12%"  stopColor="black" stopOpacity="0" />
            <stop offset="88%"  stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="centerFade" cx="50%" cy="42%" r="30%">
            <stop offset="0%"   stopColor="black" stopOpacity="1" />
            <stop offset="65%"  stopColor="black" stopOpacity="0.5" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>
          <mask id="edgeMask">
            <rect width={W} height={H} fill="white" />
            <rect width={W} height={H} fill="url(#fadeH)" />
            <rect width={W} height={H} fill="url(#fadeV)" />
            <rect width={W} height={H} fill="url(#centerFade)" />
          </mask>

          <linearGradient id="shineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="40%"  stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="48%"  stopColor="#fff8d6" stopOpacity="0.9" />
            <stop offset="50%"  stopColor="#ffffffaa" stopOpacity="1" />
            <stop offset="52%"  stopColor="#fff8d6" stopOpacity="0.9" />
            <stop offset="60%"  stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g mask="url(#edgeMask)">
          <g stroke="rgba(188,171,137,0.35)" strokeWidth="1" fill="none">
            {linesDown}
          </g>
          <g stroke="rgba(188,171,137,0.35)" strokeWidth="1" fill="none">
            {linesUp}
          </g>
        </g>

        <g mask="url(#edgeMask)">
          {shines.map((s, i) => (
            <g key={`shine-${i}`}>
              <g stroke="url(#shineGrad)" strokeWidth="2.5" fill="none" opacity="0.7">
                <line x1={s.cx - gap} y1={0} x2={s.cx - gap + H} y2={H}>
                  <animateTransform attributeName="transform" type="translate" from={`0 ${-H}`} to={`0 ${H}`} dur={s.dur} begin={s.delay} repeatCount="indefinite" />
                </line>
                <line x1={s.cx} y1={0} x2={s.cx + H} y2={H}>
                  <animateTransform attributeName="transform" type="translate" from={`0 ${-H}`} to={`0 ${H}`} dur={s.dur} begin={s.delay} repeatCount="indefinite" />
                </line>
                <line x1={s.cx + gap} y1={0} x2={s.cx + gap + H} y2={H}>
                  <animateTransform attributeName="transform" type="translate" from={`0 ${-H}`} to={`0 ${H}`} dur={s.dur} begin={s.delay} repeatCount="indefinite" />
                </line>
              </g>
              <g stroke="url(#shineGrad)" strokeWidth="2.5" fill="none" opacity="0.7">
                <line x1={s.cx - gap} y1={0} x2={s.cx - gap - H} y2={H}>
                  <animateTransform attributeName="transform" type="translate" from={`0 ${-H}`} to={`0 ${H}`} dur={s.dur} begin={`${parseFloat(s.delay) + 0.6}s`} repeatCount="indefinite" />
                </line>
                <line x1={s.cx} y1={0} x2={s.cx - H} y2={H}>
                  <animateTransform attributeName="transform" type="translate" from={`0 ${-H}`} to={`0 ${H}`} dur={s.dur} begin={`${parseFloat(s.delay) + 0.6}s`} repeatCount="indefinite" />
                </line>
                <line x1={s.cx + gap} y1={0} x2={s.cx + gap - H} y2={H}>
                  <animateTransform attributeName="transform" type="translate" from={`0 ${-H}`} to={`0 ${H}`} dur={s.dur} begin={`${parseFloat(s.delay) + 0.6}s`} repeatCount="indefinite" />
                </line>
              </g>
            </g>
          ))}
        </g>

        <polygon points={`${W/2},55 ${W-75},${H/2} ${W/2},${H-55} 75,${H/2}`} stroke="rgba(188,171,137,0.45)" strokeWidth="1.5" fill="none" />
        <polygon points={`${W/2},175 ${W-235},${H/2} ${W/2},${H-175} 235,${H/2}`} stroke="rgba(188,171,137,0.28)" strokeWidth="1" fill="none" />
        <polygon points="75,450 108,417 141,450 108,483" stroke="rgba(188,171,137,0.40)" strokeWidth="1" fill="none" />
        <polygon points={`${W-141},450 ${W-108},417 ${W-75},450 ${W-108},483`} stroke="rgba(188,171,137,0.40)" strokeWidth="1" fill="none" />
        <polygon points={`${W/2-33},55 ${W/2},22 ${W/2+33},55 ${W/2},88`} stroke="rgba(188,171,137,0.40)" strokeWidth="1" fill="none" />
        <polygon points={`${W/2-33},${H-55} ${W/2},${H-88} ${W/2+33},${H-55} ${W/2},${H-22}`} stroke="rgba(188,171,137,0.40)" strokeWidth="1" fill="none" />
      </svg>

      <div className="hero-content">
        <div className="logo-wrapper">
          <img
            ref={logoRef}
            src="/images/Logo2.svg"
            alt="Herbert Soares - Engenharia e Construção"
            className="logo-img"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: transform,
              filter: isHovered
                ? "drop-shadow(0 0 12px rgba(212,175,55,0.7)) drop-shadow(0 0 30px rgba(212,175,55,0.4)) drop-shadow(0 0 60px rgba(212,175,55,0.2))"
                : "none",
            }}
          />
        </div>

        <p className="subtitle">Transformando Projetos em Realizações de Excelência</p>

        <a
          href="#galeria"
          className="cta-button"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#galeria")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          Conheça Nossos Projetos
        </a>
      </div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 2rem;
          background: #0A0A0A;
          overflow: hidden;
        }

        .bg-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .logo-wrapper {
          opacity: 0;
          animation: fadeInDown 1s ease forwards 0.2s;
          margin-bottom: 0.5rem;
          perspective: 1200px;
        }

        .logo-img {
          width: 100%;
          max-width: 1050px;
          height: auto;
          object-fit: contain;
          transform-style: preserve-3d;
          transition: transform 0.15s ease-out, filter 0.4s ease;
          cursor: pointer;
          will-change: transform;
        }

        .subtitle {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          font-weight: 300;
          color: #BCAB89;
          margin-bottom: 3rem;
          opacity: 0;
          animation: fadeInUp 1s ease forwards 0.6s;
        }

        .cta-button {
          display: inline-block;
          padding: 1.2rem 3rem;
          background: linear-gradient(135deg, #BCAB89, #a08f6e);
          color: #0A0A0A;
          text-decoration: none;
          font-family: "Cormorant Garamond", serif;
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          opacity: 0;
          animation: fadeInUp 1s ease forwards 0.8s;
        }

        .cta-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }
        .cta-button:hover::before { left: 100%; }
        .cta-button:hover {
          transform: translateY(-3px);
          background: linear-gradient(135deg, #D4AF37, #B8941E);
          box-shadow: 0 10px 30px rgba(212,175,55,0.5);
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .logo-img { max-width: 680px; }
        }
        @media (max-width: 480px) {
          .logo-img { max-width: 420px; }
        }
      `}</style>
    </section>
  );
}