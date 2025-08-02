import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import Avatar from "../common/Avatar.jsx";

const PostItem = ({ post }) => {
  // Safety check to ensure post exists
  if (!post || !post.user) {
    return null;
  }

  // Safely format the time ago with fallback
  const getTimeAgo = () => {
    if (!post?.createdAt) {
      return "Just now";
    }

    try {
      const date = new Date(post.createdAt);
      if (isNaN(date.getTime())) {
        return "Just now";
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Just now";
    }
  };

  const timeAgo = getTimeAgo();

  // Safely format the full date for the title attribute
  const getFullDate = () => {
    if (!post?.createdAt) {
      return "Date not available";
    }

    try {
      const date = new Date(post.createdAt);
      if (isNaN(date.getTime())) {
        return "Date not available";
      }
      return date.toLocaleString();
    } catch (error) {
      return "Date not available";
    }
  };

  return (
    <div className="card p-4">
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <Link
          to={`/profile/${post.user._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <Avatar name={post.user.name} size="md" />
        </Link>

        {/* Post Content */}
        <div className="flex-1 min-w-0">
          {/* Author and Timestamp */}
          <div className="flex items-center space-x-2 mb-2">
            <Link
              to={`/profile/${post.user._id}`}
              className="font-semibold text-textPrimary hover:text-primary transition-colors"
            >
              {post.user.name}
            </Link>
            <span className="text-textSecondary text-sm">•</span>
            <span className="text-textSecondary text-sm" title={getFullDate()}>
              {timeAgo}
            </span>
          </div>

          {/* Post Text */}
          <div className="text-textPrimary whitespace-pre-wrap break-words">
            {post.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
