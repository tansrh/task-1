import React from "react";

interface SocialBtnProps {
  icon: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
}

const SocialBtn: React.FC<SocialBtnProps> = ({ icon, alt, children, className }) => (
  <button className={`social-btn ${className || ""}`.trim()}>
    <img src={icon} alt={alt} className="social-icon" />
    {children}
  </button>
);

export default SocialBtn;
