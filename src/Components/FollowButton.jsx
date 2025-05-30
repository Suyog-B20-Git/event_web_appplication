import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiCircleCheck, CiCirclePlus } from "react-icons/ci";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_URL;

const FollowButton = ({ targetId, modelName, variant = "desktop" }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const authToken = localStorage.getItem("authToken");
  const isLogin = localStorage.getItem("isLogin");

  useEffect(() => {
    const fetchFollowings = async () => {
      if (!authToken) return;

      try {
        const res = await axios.get(`${baseUrl}/api/following`, {
          headers: {
            Authorization: authToken,
          },
        });

        const followings = res.data.data || [];
        const followedOrganizers = followings.filter(
          (f) => f.modelName === modelName
        );

        const isFollowed = followedOrganizers.some((f) => f._id === targetId);

        console.log("isFollowed:", isFollowed);
        setIsFollowing(isFollowed);
      } catch (err) {
        console.error("Error fetching followings:", err);
      }
    };

    fetchFollowings();
  }, [authToken, targetId]);

  const handleFollowToggle = async () => {
    if (!authToken) {
      toast.error("Please log in first to follow");
      return;
    }
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: authToken,
        },
      };
      const endpoint = isFollowing ? "unfollow" : "follow";
      const res = await axios.post(
        `${baseUrl}/api/${endpoint}`,
        { modelName, targetId },
        config
      );
      setIsFollowing(!isFollowing);
      isFollowing ? toast.error("Unfollowed") : toast.success("Following");
    } catch (err) {
      toast.error("Unable to follow/unfollow. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isMobile = variant === "mobile";
  const buttonClass = `
    ${isMobile ? "mb-2 mt-2" : ""}
    flex items-center gap-1 bg-gray-200 rounded-full px-3 py-1
    text-sm lg:text-base w-max
     ${isFollowing ? "bg-green-200" : "bg-gray-200"}
  `;

  const iconColor = isFollowing ? "text-brown-600" : "text-gray-600";
  const textColor = isFollowing ? "text-brown-600" : "text-gray-600";

  return (
    <button
      onClick={handleFollowToggle}
      className={buttonClass}
      disabled={loading}
    >
      {isFollowing ? (
        <>
          <CiCircleCheck className={`text-lg ${iconColor}`} />
          <span className={textColor}>Following</span>
        </>
      ) : (
        <>
          <CiCirclePlus className={`text-lg ${iconColor}`} />
          <span className={textColor}>Follow</span>
        </>
      )}
    </button>
  );
};

export default FollowButton;
