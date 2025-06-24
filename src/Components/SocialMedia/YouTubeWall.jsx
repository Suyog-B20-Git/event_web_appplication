import React, { useEffect, useState, useCallback } from "react";
import "./YouTubeWall.css";
import { FaYoutube } from "react-icons/fa";
const ytapikey = import.meta.env.VITE_YOUTUBE_API_KEY;

const YouTubeWall = ({ channelId }) => {
  const [videos, setVideos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [channelTitle, setChannelTitle] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [channelUrl, setChannelUrl] = useState("");
  const [channelThumbnail, setChannelThumbnail] = useState("");
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState("");
  const [hasMore, setHasMore] = useState(true);

  // Cache for API responses (in-memory cache)
  const [cache, setCache] = useState({});
  const apiKey = ytapikey;
  // Generate cache key
  const getCacheKey = (endpoint, params) => {
    return `${endpoint}_${JSON.stringify(params)}`;
  };

  // Check cache first, then make API call
  const cachedFetch = async (url, cacheKey) => {
    // Check if we have cached data (valid for 10 minutes)
    const cached = cache[cacheKey];
    const now = Date.now();
    if (cached && (now - cached.timestamp) < 10 * 60 * 1000) {
      return cached.data;
    }

    // Make API call
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    // Cache the result
    setCache(prev => ({
      ...prev,
      [cacheKey]: {
        data,
        timestamp: now
      }
    }));

    return data;
  };

  // Exponential backoff retry logic
  const retryWithBackoff = async (fn, maxRetries = 3) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (error.message.includes('quota') && i < maxRetries - 1) {
          const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        throw error;
      }
    }
  };

  const fetchInitialData = useCallback(async () => {
    if (!channelId || !apiKey) return;
    
    setLoading(true);
    setError("");

    try {
      await retryWithBackoff(async () => {
        // OPTIMIZATION 1: Single API call to get channel info AND upload playlist
        const channelCacheKey = getCacheKey('channel', { channelId });
        const channelData = await cachedFetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelId}&key=${apiKey}`,
          channelCacheKey
        );

        if (!channelData.items || channelData.items.length === 0) {
          throw new Error("Channel not found");
        }

        const channel = channelData.items[0];
        console.log("Channel data:", channel);
        const channelTitleFetched = channel.snippet?.title || "YouTube Channel";
        const channelDescFetched = channel.snippet?.description || channel.snippet?.localized?.description || "YouTube Channel Description";
        const channelThumbnail = channel.snippet?.thumbnails?.default?.url || "";
        const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;

        setChannelTitle(channelTitleFetched);
        setChannelDescription(channelDescFetched);
        setChannelThumbnail(channelThumbnail);
        setChannelUrl(`https://www.youtube.com/channel/${channelId}`);

        if (!uploadsPlaylistId) {
          throw new Error("Could not find uploads playlist");
        }

        // OPTIMIZATION 2: Use playlistItems instead of search (more efficient)
        const playlistCacheKey = getCacheKey('playlist', { uploadsPlaylistId, pageToken: '' });
        const playlistData = await cachedFetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=20&key=${apiKey}`,
          playlistCacheKey
        );

        const videoIds = playlistData.items
          .map(item => item.snippet.resourceId.videoId)
          .filter(Boolean)
          .join(",");

        if (videoIds) {
          // OPTIMIZATION 3: Batch request for video statistics
          const videosCacheKey = getCacheKey('videos', { videoIds });
          const videosData = await cachedFetch(
            `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=snippet,statistics`,
            videosCacheKey
          );

          setVideos(videosData.items || []);
          setNextPageToken(playlistData.nextPageToken || "");
          setHasMore(!!playlistData.nextPageToken);
        }
      });
    } catch (err) {
      console.error("API Error:", err);
      setError(`Error loading videos: ${err.message}`);
      
      // If quota exceeded, show helpful message
      if (err.message.includes('quota')) {
        setError("API quota exceeded. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }, [channelId, cache]);

  const loadMoreVideos = async () => {
    if (!hasMore || !nextPageToken || loading) return;

    setLoading(true);
    try {
      await retryWithBackoff(async () => {
        // Get uploads playlist ID from cache or fetch it
        const channelCacheKey = getCacheKey('channel', { channelId });
        const cachedChannel = cache[channelCacheKey];
        
        if (!cachedChannel) {
          throw new Error("Channel data not found in cache");
        }

        const uploadsPlaylistId = cachedChannel.data.items[0].contentDetails.relatedPlaylists.uploads;

        const playlistCacheKey = getCacheKey('playlist', { uploadsPlaylistId, pageToken: nextPageToken });
        const playlistData = await cachedFetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=20&pageToken=${nextPageToken}&key=${apiKey}`,
          playlistCacheKey
        );

        const videoIds = playlistData.items
          .map(item => item.snippet.resourceId.videoId)
          .filter(Boolean)
          .join(",");

        if (videoIds) {
          const videosCacheKey = getCacheKey('videos', { videoIds });
          const videosData = await cachedFetch(
            `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=snippet,statistics`,
            videosCacheKey
          );

          setVideos(prev => [...prev, ...(videosData.items || [])]);
          setNextPageToken(playlistData.nextPageToken || "");
          setHasMore(!!playlistData.nextPageToken);
        }
      });
    } catch (err) {
      console.error("Load more error:", err);
      setError(`Error loading more videos: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handlePlay = (videoId) => {
    setPlayingVideoId(videoId);
  };

  const handleLoadMore = () => {
    if (visibleCount >= videos.length && hasMore) {
      // Load more from API if we've shown all current videos
      loadMoreVideos();
    } else {
      // Just show more from existing videos
      setVisibleCount(prev => prev + 10);
    }
  };

  const visibleVideos = videos.slice(0, visibleCount);

  const formatViews = (viewCount) => {
    const count = Number(viewCount);
    if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + "M views";
    if (count >= 1_000) return (count / 1_000).toFixed(1) + "K views";
    return count + " views";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={fetchInitialData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Retrying..." : "Retry"}
        </button>
      </div>
    );
  }

  return (
    <div className="youtube-wall-container">
        
      <div className="flex flex-col items-center lg:flex-row lg:items-start gap-4 p-4">
  {/* Channel Icon */}
  <div className="flex-shrink-0 mt-5">
    <img
      src={channelThumbnail}
      alt="Channel Icon"
      className="w-24 h-24 rounded-full border"
    />
  </div>

  {/* Channel Info */}
  <div className="text-left lg:text-left w-full">
    <div className="flex items-center justify-center lg:justify-start gap-2">
      <FaYoutube className="text-red-600 text-3xl" />
      <a
        href={channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl lg:text-3xl font-bold underline"
      >
        {channelTitle}
      </a>
    </div>
    <p className="mt-2 text-gray-700 justify-start text:sm  ">
      {channelDescription || "No description available."}
    </p>
  </div>
</div>


      {loading && videos.length === 0 && (
        <div className="text-center p-4">
          <p>Loading videos...</p>
        </div>
      )}

      <div className="video-grid mt-5">
        {visibleVideos.map(video => (
          <div key={video.id} className="video-card">
            {playingVideoId === video.id ? (
              <iframe
                className="video-iframe"
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                title={video.snippet.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="thumbnail"
                />
                <div className="overlay">
                  <button className="play-button" onClick={() => handlePlay(video.id)}>
                    ▶
                  </button>
                </div>
              </>
            )}
            <div className="video-info">
              <p className="video-title">{video.snippet.title}</p>
              <p className="video-meta">
                {formatViews(video.statistics.viewCount)} • {formatDate(video.snippet.publishedAt)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {(visibleCount < videos.length || hasMore) && (
        <div className="load-more-container mb-7 mt-2">
          <button 
            className="load-more-button" 
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "View More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default YouTubeWall;