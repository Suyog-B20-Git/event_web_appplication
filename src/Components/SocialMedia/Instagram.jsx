/* eslint-disable react/prop-types */
const InstagramProfile = ({ username }) => {
    return (
      <a 
        href={`https://www.instagram.com/${username}/`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex justify-center items-center h-[200px]"
      >
        Visit {username} on Instagram
      </a>
    );
  };
  
  // ✅ Example Usage:
  export default InstagramProfile
  