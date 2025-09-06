import React, { useRef, useState } from "react";

export default function CertificateGenerator() {
  const [name, setName] = useState("");
  const canvasRef = useRef(null);

  const certBg = "/f.png"; // certificate background
  const course = "IT EVENT"; // default course

  const generateCertificate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = certBg;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Name
      ctx.font = "bold 60px 'Times New Roman'";
      ctx.fillStyle = "#2d3748";
      ctx.textAlign = "center";
      ctx.fillText(name, img.width / 2, img.height / 2);

      // Course
      ctx.font = "bold 48px Arial";
      ctx.fillStyle = "#4a5568";
      ctx.textAlign = "center";
      ctx.fillText(course, img.width / 2, img.height / 2 + 120);
    };
  };

  const downloadCertificate = () => {
    const link = document.createElement("a");
    link.download = `${name || "certificate"}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          🎓 Create Your Certificate
        </h1>
        <p className="text-lg text-white/90 mt-3 max-w-2xl mx-auto">
          Instantly generate a personalized e-certificate with your name.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Enter Your Name
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full p-3 mb-6 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />

        <div className="flex space-x-4">
          <button
            onClick={generateCertificate}
            className="flex-1 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md hover:scale-105 transition-transform"
          >
            Generate
          </button>
          <button
            onClick={downloadCertificate}
            className="flex-1 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-md hover:scale-105 transition-transform"
          >
            Download
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-xl shadow-xl p-4 max-w-4xl w-full">
        <h3 className="text-xl font-semibold text-gray-700 mb-3 text-center">
          Certificate Preview
        </h3>
        <canvas ref={canvasRef} className="w-full rounded-lg shadow-lg" />
      </div>
    </div>
  );
}
