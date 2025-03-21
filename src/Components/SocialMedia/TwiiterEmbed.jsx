/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

const TwitterEmbed = ({ twitterUrl }) => {
    useEffect(() => {
        // Dynamically load Twitter widget script once the component mounts
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        document.body.appendChild(script);
    }, []);

    var twitterId=    convertToTwitterUrlAndUsername(twitterUrl);
    // twitterId ="elonmusk"
    console.log("twitterId:", twitterId);
    return (
        <div>
            {/* Replace 'elonmusk' with your Twitter username */}
            <a
                className="twitter-timeline"
                href={`https://twitter.com/${twitterId.toString()}`} // ✅ Use curly braces for dynamic value
            >
                {twitterId ? ` Tweets by ${twitterId}` : ""}
            </a>
        </div>
    );
};

export default TwitterEmbed;
const convertToTwitterUrlAndUsername = (xUrl) => {
    try {
        const url = new URL(xUrl);
        if (url.hostname !== 'x.com' && url.hostname !== 'www.x.com' && url.hostname !== 'twitter.com' && url.hostname !== 'www.twitter.com') {
            throw new Error('Invalid X or Twitter URL');
        }

        const path = url.pathname;
        if (!path || path === '/') {
            throw new Error('Path not found in the URL');
        }

        const pathParts = path.split('/');
        const twitterUsername = pathParts[1];

        return  twitterUsername ;
    } catch (error) {
        console.error('Error converting URL:', error.message);
        return null;
    }
};