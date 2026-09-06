import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaGithub, FaTwitter, FaTelegram, FaBluesky } from "react-icons/fa6";
import { SiTangled } from "@/icons/tangled";

export const socials = [
  {
    name: "Twitter",
    link: "https://twitter.com/frectonz",
    icon: FaTwitter,
  },
  {
    name: "Bluesky",
    link: "https://bsky.app/profile/frectonz.et",
    icon: FaBluesky,
  },
  {
    name: "Github",
    link: "https://github.com/frectonz",
    icon: FaGithub,
  },
  {
    name: "Tangled",
    link: "https://tangled.org/frectonz.et",
    icon: SiTangled,
  },
  {
    name: "Telegram",
    link: "https://t.me/frectonz",
    icon: FaTelegram,
  },
  {
    name: "Email",
    link: "mailto:contact@frectonz.et",
    icon: MdOutlineAlternateEmail,
  },
];
