const SoundCloudEmbed = ({ soundCloudUrl }) => {
    const converted = convertToSoundCloudEmbedUrl(soundCloudUrl);

    if (!converted) {
        return <div>Invalid or missing SoundCloud URL.</div>;
    }

    return (
        <iframe
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={converted.embedUrl}
            title="SoundCloud Player"
        />
    );
};

export default SoundCloudEmbed;

const convertToSoundCloudEmbedUrl = (soundCloudUrl) => {
    try {
        // Handle null, undefined or empty string
        if (!soundCloudUrl || typeof soundCloudUrl !== "string" || soundCloudUrl.trim() === "") {
            return null;
        }

        let url;
        try {
            // Try to create a URL instance directly
            url = new URL(soundCloudUrl);
        } catch (e) {
            // If it fails (perhaps protocol is missing), try prepending 'https://'
            url = new URL(`https://${soundCloudUrl}`);
        }

        // Normalize hostname (remove www. if present)
        let hostname = url.hostname.toLowerCase();
        if (hostname.startsWith("www.")) {
            hostname = hostname.substring(4);
        }

        // Acceptable hostnames: soundcloud.com or api.soundcloud.com
        if (hostname !== "soundcloud.com" && hostname !== "api.soundcloud.com") {
            throw new Error("Invalid SoundCloud URL");
        }

        // For URLs from the API, convert hostname to standard soundcloud.com
        if (hostname === "api.soundcloud.com") {
            url.hostname = "soundcloud.com";
        }

        // Ensure that the URL has a valid path (e.g. not just '/')
        const path = url.pathname;
        if (!path || path === "/") {
            throw new Error("Path not found in the URL");
        }

        const embedUrl = `https://w.soundcloud.com/player/?url=https%3A//soundcloud.com${path}&show_user=true&show_reposts=false&visual=true`;
        return { embedUrl, path };
    } catch (error) {
        console.error(`SoundCloud conversion error: ${error.message}`);
        return null;
    }
};
