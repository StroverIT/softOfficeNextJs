import React from "react";
// Icons
import { HiOutlineMail, HiOutlineUserCircle } from "react-icons/hi";
import { AiOutlineLock } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { MdOutlineSubtitles } from "react-icons/md";

const iconDictionary = {
  password: <AiOutlineLock />,
  email: <HiOutlineMail />,
  fullName: <HiOutlineUserCircle />,
  phoneNumber: <BiPhoneCall />,
  title: <MdOutlineSubtitles />,
};
export default function InputIcons({ iconType }) {
  return iconDictionary[iconType];
}
