const SoundCloudEmbed = ({ username }) => {
    return (
      <iframe 
        width="100%" 
        height="300" 
        scrolling="no" 
        frameBorder="no" 
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/${username}`}
      >
      </iframe>
    );
  };

  export default SoundCloudEmbed;