export default function WhatsAppButton({ profileId }) {

  const handleWhatsApp = () => {
    // Your website profile link
    const profileLink = `${window.location.origin}/profile/${profileId}`;

    const message = `
Hello Admin,
I am interested in this profile.
Profile Link: ${profileLink}
`;

    // Admin WhatsApp number (change this)
    const adminNumber = "+916385525210"; // add country code

    const url = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleWhatsApp}
      className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1"
    >
       WhatsApp
    </button>
  );
}