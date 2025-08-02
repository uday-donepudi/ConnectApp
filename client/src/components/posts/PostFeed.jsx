import React from "react";
import PostItem from "./PostItem.jsx";
import Spinner from "../common/Spinner.jsx";

const PostFeed = ({ posts, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center">
        {error}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-textSecondary text-lg mb-2">No posts yet</div>
        <div className="text-textSecondary">
          Be the first to share something!
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostFeed;
