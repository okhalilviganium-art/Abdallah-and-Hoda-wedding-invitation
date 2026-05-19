"use client";

import { useRef, useState, useEffect } from "react";

type Stage = "poster" | "envelopeVideo" | "content";

const WEDDING_DATE = new Date("2026-07-31T20:00:00");

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const diff = WEDDING_DATE.getTime() - Date.now();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        });
      }
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

function DepthSection({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transform: visible ? "scale(1)" : "scale(0.88)",
        filter: visible ? "blur(0px)" : "blur(10px)",
        opacity: visible ? 1 : 0,
        transition:
          "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out, filter 0.8s ease-out",
        transformOrigin: "center center",
        perspective: "1200px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CountdownSection() {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <DepthSection style={{ padding: "48px 24px", textAlign: "center" }}>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 11,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#9b7a32",
          marginBottom: 8,
        }}
      >
        Save the Date
      </p>

      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 28,
          fontWeight: 400,
          color: "#b47a28",
          marginBottom: 32,
        }}
      >
        31 July 2026
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
        }}
      >
        {[
          { value: days, label: "Days" },
          { value: hours, label: "Hours" },
          { value: minutes, label: "Minutes" },
          { value: seconds, label: "Seconds" },
        ].map(({ value, label }) => (
          <div
            key={label}
            style={{
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(212,175,55,0.15)",
              borderRadius: 16,
              padding: "16px 8px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 32,
                fontWeight: 500,
                color: "#b47a28",
                lineHeight: 1,
              }}
            >
              {String(value).padStart(2, "0")}
            </div>

            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 9,
                color: "#9b7a32",
                marginTop: 8,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </DepthSection>
  );
}

function EventDetails() {
  return (
    <DepthSection style={{ padding: "48px 24px", textAlign: "center" }}>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 11,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#9b7a32",
          marginBottom: 16,
        }}
      >
        Wedding Celebration
      </p>

      <div
        style={{
          width: 40,
          height: 40,
          margin: "0 auto 24px",
          borderRadius: "50%",
          border: "1px solid rgba(212,175,55,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          color: "#b47a28",
        }}
      >
        ❧
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {[
          { label: "Date", value: "Friday, 31 July 2026" },
          { label: "Time", value: "8:00 PM" },
          { label: "Venue", value: "Semiramis Intercontinental Cairo" },
        ].map(({ label, value }) => (
          <div key={label}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#9b7a32",
                marginBottom: 4,
              }}
            >
              {label}
            </p>

            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 20,
                color: "#4a3a1a",
              }}
            >
              {value}
            </p>

            <div
              style={{
                width: 60,
                height: 1,
                margin: "12px auto 0",
                background:
                  "linear-gradient(to right, transparent, #d4af37, transparent)",
              }}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          width: 40,
          height: 40,
          margin: "24px auto 0",
          borderRadius: "50%",
          border: "1px solid rgba(212,175,55,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          color: "#b47a28",
        }}
      >
        ❧
      </div>
    </DepthSection>
  );
}

function LocationSection() {
  return (
    <DepthSection
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.8!2d31.2!3d30.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsMDAnNDAuNCTiAzMcKwMTInMDAuMCJF!5e0!3m2!1sen!2seg!4v1234567890"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
          filter: "grayscale(30%) brightness(0.9)",
        }}
        allowFullScreen
        loading="lazy"
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(255,254,249,0.85) 0%, rgba(255,254,249,0.95) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "48px 24px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#9b7a32",
            marginBottom: 16,
          }}
        >
          Location
        </p>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 28,
            fontWeight: 400,
            color: "#b47a28",
            marginBottom: 8,
          }}
        >
          Semiramis Intercontinental Cairo
        </h2>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: "#9b7a32",
            marginBottom: 32,
          }}
        >
          35 El-Gaish Road, Heliopolis, Cairo
        </p>

        <a
          href="https://maps.google.com/?q=Semiramis+Intercontinental+Cairo"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            margin: "0 auto",
            padding: "14px 28px",
            border: "1px solid #b47a28",
            borderRadius: 999,
            color: "#9b6a22",
            textDecoration: "none",
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            letterSpacing: 2,
            textTransform: "uppercase",
            transition: "all 0.3s ease",
          }}
        >
          Open Location
        </a>
      </div>
    </DepthSection>
  );
}

function GallerySection() {
  return (
    <DepthSection style={{ padding: "48px 24px", textAlign: "center" }}>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 11,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#9b7a32",
          marginBottom: 24,
        }}
      >
        Our Moments
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        {[1, 2, 3, 4].map((num) => (
          <img
            key={num}
            src={`/images/photo-${num}.jpg`}
            alt={`Wedding photo ${num}`}
            style={{
              width: "100%",
              aspectRatio: "4/5",
              objectFit: "cover",
              borderRadius: 20,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            }}
          />
        ))}
      </div>
    </DepthSection>
  );
}

function ClosingSection() {
  return (
    <DepthSection style={{ padding: "48px 24px", textAlign: "center" }}>
      <div
        style={{
          width: 56,
          height: 56,
          margin: "0 auto 24px",
          borderRadius: "50%",
          border: "1px solid rgba(212,175,55,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 14,
            color: "#b47a28",
          }}
        >
          M & D
        </span>
      </div>

      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 32,
          fontWeight: 400,
          color: "#b47a28",
          marginBottom: 12,
        }}
      >
        Thank You
      </h2>

      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 18,
          fontStyle: "italic",
          color: "#9b7a32",
          marginBottom: 24,
        }}
      >
        We can't wait to celebrate with you
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <span style={{ color: "#d4af37", fontSize: 14 }}>♥</span>
        <span style={{ color: "#d4af37", fontSize: 14 }}>❧</span>
        <span style={{ color: "#d4af37", fontSize: 14 }}>♥</span>
      </div>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 10,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "#9b7a32",
          opacity: 0.6,
          paddingTop: 24,
          borderTop: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        With love
      </p>
    </DepthSection>
  );
}

function HeroVideoSection() {
  const [videoError, setVideoError] = useState(false);

  return (
    <section
      style={{
        width: "100%",
        aspectRatio: "9/16",
        position: "relative",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {videoError ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #fffef9, #ffffff)",
            color: "#b47a28",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 18,
          }}
        >
          Hero video missing
        </div>
      ) : (
        <video
          src="/videos/hero-invitation.mp4"
          autoPlay
          muted
          playsInline
          loop
          onError={() => setVideoError(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            background: "#fff",
          }}
        />
      )}
    </section>
  );
}

export default function WeddingInvitation() {
  const [stage, setStage] = useState<Stage>("poster");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [whiteTransition, setWhiteTransition] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingBeforeHidden = useRef(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;

      if (document.hidden) {
        wasPlayingBeforeHidden.current = !audioRef.current.paused;
        audioRef.current.pause();
      } else if (wasPlayingBeforeHidden.current) {
        audioRef.current.play().catch(() => {});
      }
    };

    const handlePageHide = () => {
      if (!audioRef.current) return;
      audioRef.current.pause();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  async function playMusic() {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setMusicPlaying(true);
    } catch {
      setMusicPlaying(false);
    }
  }

  async function handleOpen() {
    await playMusic();
    setStage("envelopeVideo");
  }

  function handleEnvelopeEnd() {
    setWhiteTransition(true);

    setTimeout(() => {
      setStage("content");
    }, 120);

    setTimeout(() => {
      setWhiteTransition(false);
    }, 900);
  }

  function toggleMusic() {
    if (!audioRef.current) return;

    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setMusicPlaying(true);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f2ee",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <audio ref={audioRef} src="/music/wedding-music.mp3" loop />

      <div
        style={{
          width: "100%",
          maxWidth: 430,
          minHeight: "100vh",
          position: "relative",
          background: "#ffffff",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        }}
      >
        {stage === "poster" && (
          <section
            style={{
              width: "100%",
              minHeight: "100vh",
              position: "relative",
              background: "#fff",
            }}
          >
            <img
              src="/images/envelope-closed.jpg"
              alt="Closed envelope"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <button
              onClick={handleOpen}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 10,
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
              aria-label="Open invitation"
            />

            <div
              style={{
                position: "absolute",
                bottom: 50,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 11,
                color: "#9b7a32",
                fontSize: 12,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
                animation: "pulse 3s ease-in-out infinite",
              }}
            >
              Tap to open
            </div>
          </section>
        )}

        {stage === "envelopeVideo" && (
          <section
            style={{
              width: "100%",
              minHeight: "100vh",
              position: "relative",
              background: "#fff",
            }}
          >
            <video
              src="/videos/envelope-open.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={handleEnvelopeEnd}
              onError={handleEnvelopeEnd}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                background: "#fff",
              }}
            />
          </section>
        )}

        {stage === "content" && (
          <div
            style={{
              background: "#ffffff",
              color: "#9b6a22",
            }}
          >
            <HeroVideoSection />
            <CountdownSection />
            <EventDetails />
            <LocationSection />
            <GallerySection />
            <ClosingSection />
          </div>
        )}

        {whiteTransition && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, #fffef9 0%, #ffffff 100%)",
              zIndex: 99998,
              pointerEvents: "none",
              opacity: 1,
              animation: "fadeInOut 0.9s ease-in-out forwards",
            }}
          />
        )}

        {stage !== "poster" && (
          <button
            onClick={toggleMusic}
            style={{
              position: "fixed",
              bottom: 22,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 99999,
              background: "#b47a28",
              color: "white",
              border: "none",
              borderRadius: 999,
              padding: "12px 20px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              letterSpacing: 1,
            }}
          >
            {musicPlaying ? "♫ Pause" : "♪ Play"}
          </button>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500&display=swap');

        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes fadeInOut {
          0% {
            opacity: 1;
          }
          65% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: #f7f2ee;
        }

        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: #fdf5f5;
        }

        ::-webkit-scrollbar-thumb {
          background: #d4af37;
          border-radius: 2px;
        }
      `}</style>
    </main>
  );
}