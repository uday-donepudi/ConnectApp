import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePosts } from "../context/PostsContext.jsx";
import { postsAPI } from "../api/endpoints";
import PostFeed from "../components/posts/PostFeed.jsx";
import CreatePostModal from "../components/posts/CreatePostModal.jsx";

const HomePage = () => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const location = useLocation();

  const { posts, isLoading, error, setPosts, setLoading, setError } =
    usePosts();

  // Load posts on component mount
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const postsData = await postsAPI.getAllPosts();
        setPosts(postsData);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load posts");
      }
    };

    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const handleCreatePost = () => {
    setIsCreatePostModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-textPrimary mb-2">
            Community Feed
          </h1>
          <p className="text-textSecondary">
            See what's happening in the ConnectSphere community
          </p>
        </div>

        {/* Posts Feed */}
        <PostFeed posts={posts} isLoading={isLoading} error={error} />

        {/* Floating Action Button - Only show on home page */}
        {location.pathname === "/" && (
          <button
            onClick={handleCreatePost}
            className="fab"
            title="Create a new post"
          >
            +
          </button>
        )}

        {/* Create Post Modal */}
        <CreatePostModal
          isOpen={isCreatePostModalOpen}
          onClose={() => setIsCreatePostModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default HomePage;
