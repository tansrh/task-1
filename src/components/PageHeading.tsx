import React from "react";

interface PageHeadingProps {
  welcomeText?: string;
  brandText?: string;
  className?: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({
  welcomeText = "Welcome to",
  brandText = "Unstop",
  className = ""
}) => (
  <div className={`heading ${className}`.trim()}>
    <div className="welcome">{welcomeText}</div>
    <div className="unstop">{brandText}</div>
  </div>
);

export default PageHeading;
