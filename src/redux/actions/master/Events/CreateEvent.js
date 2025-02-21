import { Axios } from "axios";

import { axiosInstance } from "../../../../../utility/utils";

import { toast } from "react-toastify";
import { Zoom } from "react-toastify";
import { Event } from "../../../Urls";
export const createNewEvent = (
  data,
  thumbnailImage,
  posterImage,
  seatingChartImage
) => {
  console.log("data.:::", data);
  const isLogin = JSON.parse(localStorage.getItem("isLogin")); // Convert string back to boolean
  return () => {
    axiosInstance
      .post(
        Event.createEvent,
        {
          name: data.name.trim(),
          category: data.category, // Assuming it's an array
          description: data.description.trim(),
          eventUrl: data.eventUrl,
          shortUrl: data.shortUrl,
          excerpt: data.excerpt,
          disableEventAfterSoldOut: data.disableEventAfterSoldOut,
          eventTags: data.eventTags,

          offlinePaymentInstructions: data.offlinePaymentInstructions,
          isRepetitive: data.isRepetitive,
          repetitiveType: data.repetitiveType,
          isSeasonal: data.isSeasonal,
          repeatExcept: data.repeatExcept,
          repeatStartTime: data.repeatStartTime,
          repeatEndTime: data.repeatEndTime,
          isOnline: data.isOnline,
          venue: data.venue,
          performers: data.performers,
          performerLink: data.performerLink,
          // media: data.media,

          startDate: `${data.startDate}T${data.startTime}`,
          endDate: `${data.endDate}T${data.endTime}`,
          media: {
            thumbnailImage: thumbnailImage,
            posterImage: posterImage,
            seatingChartImage: seatingChartImage,
            images: data.media.images,
          },
          // thumbnailImage: data.thumbnailImage,
          // posterImage: data.posterImage,
          // seatingChartImage: data.seatingChartImage,

          seo: {
            metaTitle: data.seo.metaTitle,
            metaTags: data.seo.metaTags,
            metaDescription: data.seo.metaDescription,
          },
          // data,
        }
        // {
        //   headers: { "Content-Type": "multipart/form-data" },
        // }
      )
      .then((response) => {
        if (!response.data.status) {
          toast.error(response.data.message, {
            transition: Zoom,
            hideProgressBar: true,
            autoClose: 2000,
          });
        } else {
          toast.success(response.data.message, {
            transition: Zoom,
            hideProgressBar: true,
            autoClose: 2000,
          });
          if (isLogin) {
            dispatch({
              type: "CREATE_EVENT",
              event: response.data,
            });
          }
          console.log(response);
        }
      })

      .catch((error) => {
        toast.error(
          error.response && error.response.data
            ? error.response.data.message
            : "Something went wrong!",
          { transition: Zoom, hideProgressBar: false, autoClose: 2000 }
        );
      });
  };
};
