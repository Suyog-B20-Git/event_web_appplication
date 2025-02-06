import React from "react";

const RatingReview = () => {
  const reviews = [
    {
      name: "David Lane",
      rating: 5,
      comment:
        "And sir dare view but over man. So at within mr to simple assure. Mr disposing continued it offending arranging in we. Extremity as if breakfast agreement. AA",
    },
    {
      name: "David Lane",
      rating: 5,
      comment:
        "And sir dare view but over man. So at within mr to simple assure. Mr disposing continued it offending arranging in we. Extremity as if breakfast agreement. AA",
    },
  ];

  return (
    <div className=" mx-auto p-4 m-3 shadow-md rounded-lg">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Rating & Review</h1>

      {/* Overall Rating */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">4 Review</h2>
        <div className="flex items-center text-yellow-500 mb-4">
          {[...Array(5)].map((_, index) => (
            <span key={index} className="text-lg">
              &#9733;
            </span>
          ))}
          <span className="ml-2 text-gray-700">5 out of 5</span>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.map((review, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold mb-1">{review.name}</h3>
          <div className="flex items-center text-yellow-500">
            {[...Array(review.rating)].map((_, starIndex) => (
              <span key={starIndex} className="text-lg">
                &#9733;
              </span>
            ))}
            <span className="ml-2 text-gray-700">{review.rating} out of 5</span>
          </div>
          <p className="text-gray-700 mt-2">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default RatingReview;
