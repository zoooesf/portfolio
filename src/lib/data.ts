export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: StaticImageData | string;
  filename: string;
  link: string;
};

export type Skill = {
  name: string;
  description: string;
};
import foe from "../assets/foe.png";
import intel from "../assets/intel.png";
import greenGrocer from "../assets/greenGrocer.png";
import holy from "../assets/holy.png";
import flick from "../assets/flick.png";
import carhub from "../assets/carhub.png";
import { StaticImageData } from "next/image";
export const projects: Project[] = [
  {
    title: "Intel City on the Cloud",
    description:
      "I worked as part of a team to create this interactive experience which doubles as a Progressive Web App (PWA). I created functionality that allowed external links to show up as a QR code in the PWA and an external link when viewed in a browser.",
    tags: ["Next.js", "React", "Contentful", "Theme UI"],
    image: intel,
    filename: "intel-city.png",
    link: "https://intel-city-on-the-cloud-2207.vercel.app/"
  },
  {
    title: "Car Hub",
    description:
      "Built as an experimental project to get more familiar with api calls and the new features of Next 14. This website utilized advanced search functionality as well as filtering capabilities.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    image: carhub,
    filename: "car-hub.png",
    link: "https://car-hub-seven-zeta.vercel.app/"
  },
  {
    title: "Green Grocer",
    description:
      "Green Grocer is a responsive dynamic e-commerce grocery store branded and built from scratch. This included creating the logo and choosing all colours, fonts and assets. I also designed the layout and functionality which pulled products from a database.",
    tags: ["JavaScript", "CSS", "jQuery", "HTML", "PHP", "Foundations"],
    image: greenGrocer,
    filename: "green-grocer.png",
    link: "https://zferguson.ca/grocer/"
  },
  {
    title: "Flick",
    description:
      "Flick is a responsive dynamic movie database branded and built from scratch. This included creating the logo and choosing all colours, fonts and assets. All movie data is pulled from a database using PHP. This project was built as a demo for a client and is meant to be a template for a movie database such as IMDB.",
    tags: ["JavaScript", "PHP", "jQuery", "HTML"],
    image: flick,
    filename: "flick.png",
    link: "https://zferguson.ca/flick/"
  },
  {
    title: "Holy Cupcakes",
    description:
      "Holy Cupcakes is a concept site that I built along with two others, together we created a WordPress theme from scratch with an e-commerce section. All designs, layouts and branding are original.",
    tags: ["JavaScript", "CSS", "PHP", "HTML", "WordPress", "Foundations"],
    image: holy,
    filename: "holy-cupcakes.png",
    link: "https://testing.zferguson.ca/holycupcake"
  },
  {
    title: "Family of Eateries",
    description:
      "Families of Eateries is a concept app that allows users to access the menus, specials, reservations and general information about three different restaurants. I created unique brand identities including logos for all three.",
    tags: ["JavaScript", "CSS", "HTML", "jQuery"],
    image: foe,
    filename: "eateries.png",
    link: "https://testing.zferguson.ca/family/"
  },
];

export const skills: Skill[] = [
  { name: "React", description: "Component architecture & hooks" },
  { name: "TypeScript", description: "Typed, maintainable codebases" },
  { name: "Next.js", description: "SSR, routing & performance" },
  { name: "Tailwind CSS", description: "Systemized, rapid styling" },
  { name: "JavaScript", description: "Core language & the DOM" },
  { name: "HTML & CSS", description: "Semantic, accessible markup" },
  { name: "Responsive UI", description: "Mobile-first layouts" },
  { name: "UI Design", description: "Type, layout & systems" },
  { name: "Shopify", description: "Designed and Managed Stores" },
  { name: "Contentful", description: "Content Management System" },
  { name: "Sitecore", description: "Sitecore AI CMS Certification for Developers" },
  { name: "Google AI", description: "Generative AI Leader Certification from Google" },
];
