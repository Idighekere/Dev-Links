import { Icon } from "@iconify/react";
import { IconifyIcon } from "@iconify/types";

export interface Platform {
  // platform: any;
  name: string;
  icon: IconifyIcon | string;
  url: string;
  color: string;
  // key:string
}

export const platforms: Platform[] = [
  {
    name: "GitHub",
    icon: "icon-park-outline:github",
    url: "https://github.com/",
    color: "bg-[#181717]",
  },
  {
    name: "Frontend Mentor",
    icon: "simple-icons:frontendmentor",
    url: "https://www.frontendmentor.io/",
    color: "bg-[#3F54A3]",
  },
  {
    name: "Twitter",
    icon: "formkit:twitter",
    url: "https://twitter.com/",
    color: "bg-[#1DA1F2]",
  },
  {
    name: "LinkedIn",
    icon: "basil:linkedin-solid",
    url: "https://www.linkedin.com/",
    color: "bg-[#0A66C2]",
  },
  {
    name: "YouTube",
    icon: "basil:youtube-solid",
    url: "https://www.youtube.com/",
    color: "bg-[#FF0000]",
  },
  {
    name: "Facebook",
    icon: "mdi:facebook",
    url: "https://www.facebook.com/",
    color: "bg-[#1877F2]",
  },
  {
    name: "Twitch",
    icon: "ant-design:twitch-outlined",
    url: "https://www.twitch.tv/",
    color: "bg-[#9146FF]",
  },
  {
    name: "Dev.to",
    icon: "ph:dev-to-logo-fill",
    url: "https://dev.to/",
    color: "bg-[#0A0A0A]",
  },
  {
    name: "Codewars",
    icon: "cib:codewars",
    url: "https://www.codewars.com/",
    color: "bg-[#AD2C27]",
  },
  {
    name: "freeCodeCamp",
    icon: "simple-icons:freecodecamp",
    url: "https://www.freecodecamp.org/",
    color: "bg-[#006400]",
  },
  {
    name: "GitLab",
    icon: "teenyicons:gitlab-solid",
    url: "https://gitlab.com/",
    color: "bg-[#FC6D26]",
  },
  {
    name: "Hashnode",
    icon: "simple-icons:hashnode",
    url: "https://hashnode.com/",
    color: "bg-[#2962FF]",
  },
  {
    name: "Stack Overflow",
    icon: "simple-icons:stackoverflow",
    url: "https://hashnode.com/",
    color: "bg-[#F58025]",
  },
];
