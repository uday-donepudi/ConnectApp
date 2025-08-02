import React from "react";

const Avatar = ({ name, size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-16 h-16 text-xl",
    xl: "w-20 h-20 text-2xl",
  };

  const getInitials = (fullName) => {
    if (!fullName) return "?";
    const names = fullName.trim().split(" ");
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <div className={`avatar ${sizeClasses[size]} ${className}`} title={name}>
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
