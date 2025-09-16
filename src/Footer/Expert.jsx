// src/Components/Footer/Expertevent.jsx

import React from 'react';

function Expertevent() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#ff2459] mb-6">Meet Our Expert Event Organisers</h1>

      <p className="text-gray-700 mb-4">
        Our team consists of passionate and experienced event professionals who bring your visions to life.
        With creativity, precision, and years of hands-on experience, we handle every event with care and style.
      </p>

      {/* Organiser 1 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Aarav Mehta – Wedding Specialist</h2>
        <p className="text-gray-600">
          Aarav crafts fairytale weddings with a modern twist. From décor to coordination, he ensures a flawless experience.
        </p>
      </div>

      {/* Organiser 2 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Simran Kaur – Corporate Events Lead</h2>
        <p className="text-gray-600">
          Simran handles corporate conferences, product launches, and networking events with professionalism and innovation.
        </p>
      </div>

      {/* Organiser 3 */}
      <div>
        <h2 className="text-xl font-semibold">Rohan Das – Concert & Festival Manager</h2>
        <p className="text-gray-600">
          Rohan ensures high-energy live events run smoothly, managing logistics, artists, and audience engagement.
        </p>
      </div>
    </div>
  );
}

export default Expertevent;
