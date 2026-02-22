export default function WhatsAppButton({ profileId }) {
  const phone = "6385525210"
  const message = `Hi, I am interested in Profile ID: ${profileId}`;

  return (
    <button
      onClick={() =>
        window.open(
          `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
          "_blank"
        )
      }
      className="bg-green-500 text-white text-xs px-3 py-1 rounded"
    >
      WhatsApp
    </button>
  );
}