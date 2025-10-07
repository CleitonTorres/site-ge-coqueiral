"use client";

import { useState } from "react";
import { FaShareAlt } from "react-icons/fa";

export default function ShareButton({ title, text, url }: { title: string; text: string; url: string }) {
  const [error, setError] = useState("");

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (err) {
        console.log("Compartilhamento cancelado", err);
      }
    } else {
      setError("O compartilhamento nativo não é suportado neste dispositivo.");
    }
  };

  return (
    <>
      <button
        onClick={handleShare}
        style={{
          background: "#0077ff",
          color: "#fff",
          border: "none",
          padding: "8px 14px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        <FaShareAlt size={18} fill="#fff" /> Compartilhar
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
