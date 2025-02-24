/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

const TwitterEmbed = ({ twitterId }) => {
  useEffect(() => {
    // Dynamically load Twitter widget script once the component mounts
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      {/* Replace 'elonmusk' with your Twitter username */}
      <a
        className="twitter-timeline"
        href={`https://twitter.com/${twitterId}`} // ✅ Use curly braces for dynamic value
      >
        {twitterId ? ` Tweets by ${twitterId}` : ""}
      </a>
    </div>
  );
};

export default TwitterEmbed;
