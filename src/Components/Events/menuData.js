// src/data/menuData.js
import { IoMdHome } from "react-icons/io";
import { MdEvent } from "react-icons/md";
import { GrGroup } from "react-icons/gr";

export const text_data = [
  { name: "Home", path: "/home" },
  {
    name: "Events",
    filterPath: "/filtered-events",
    path: "/events",

    popUpMenu: [
      { name: "Business", path: "/events/business" },
      { name: "Festivals", path: "/events/festivals" },
      { name: "Live Music", path: "/events/live-music" },
      { name: "Nightlife and club", path: "/events/nightlife-and-club" },
      { name: "Professional", path: "/events/professional" },
      { name: "Social", path: "/events/social" },
      { name: "Sport & Leisure", path: "/events/sport-and-leisure" },
      { name: "Theatre & Arts", path: "/events/theatre-and-arts" },
    ],
  },
  {
    name: "Organisers",
    filterPath: "/Organizers",
    path: "/organisers",

    popUpMenu: [
      { name: "Event Planner", path: "/organisers/event-planner" },
      { name: "Wedding Planner", path: "/organisers/wedding-planner" },
      { name: "Adventure", path: "/organisers/adventure" },
    ],
  },
  {
    name: "Performers",
    filterPath: "/Performers",
    path: "/performers",
    popUpMenu: [
      { name: "Band", path: "/performers/band" },
      { name: "Disc Jockey", path: "/performers/disc-jokey" },
      { name: "Sound Artist", path: "/performers/sound-artist" },
      { name: "Stand up Comedian", path: "/performers/stand-up-comedian" },
    ],
  },

  {
    name: "Services",
    path: "/services",
    filterPath: "/Services",
    popUpMenu: [
      { name: "Anchor", path: "/services/anchor" },
      { name: "Decor", path: "/services/decor" },
      { name: "Entertainer", path: "/services/entertainer" },
      { name: "Party Supplies", path: "/services/party-supplies" },
      {
        name: "Photography & Videography",
        path: "/services/photography-and-videography",
      },
      { name: "Promoters", path: "/services/promoters" },
      { name: "DanceStudio", path: "/services/dance-studio" },
    ],
  },
  {
    name: "Venues",
    path: "/venues",
    filterPath: "/Venues",
    popUpMenu: [
      { name: "Indoor", path: "/venues/indoor" },
      { name: "Outdoor", path: "/venues/outdoor" },
    ],
  },
  { name: "Contact Us", path: "/contact-us" },
];
