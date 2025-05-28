// /Footer/Terms.jsx

import React from 'react';

function Terms() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#ff2459] mb-4">Terms & Conditions</h1>
      <p className="text-gray-700 mb-4">
        By using our services, you agree to the following terms and conditions. Please read them carefully.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">1. Services</h2>
      <p className="text-gray-700 mb-2">
        We provide event planning, management, and coordination services as per the agreed scope. Any changes
        or additions must be approved in writing.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">2. Payments</h2>
      <p className="text-gray-700 mb-2">
        All payments must be made as per the agreed schedule. Delays may result in service interruptions or cancellations.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">3. Cancellation & Refund</h2>
      <p className="text-gray-700 mb-2">
        Cancellations made within 7 days of the event date are non-refundable. Other refunds will be handled on a case-by-case basis.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">4. Liability</h2>
      <p className="text-gray-700">
        We are not responsible for any damage or loss due to unforeseen circumstances such as weather,
        technical failures, or third-party services.
      </p>
    </div>
  );
}

export default Terms;
