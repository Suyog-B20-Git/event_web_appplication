const SpotifyEmbed = ({ artistId }) => {
  return (
    <iframe
      src={`https://open.spotify.com/embed/artist/${artistId}`}
    
      className=" w-full h-[380px]"
      frameBorder="0"
      allow="encrypted-media"
    ></iframe>
  );
};

export default SpotifyEmbed;
