const YouTubeProfile = ({ channelId }) => {
    return (
      <a 
        href={`https://www.youtube.com/channel/${channelId}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex justify-center items-center h-[200px]"
      >
        Visit YouTube Channel
      </a>
    );
  };

  export default YouTubeProfile