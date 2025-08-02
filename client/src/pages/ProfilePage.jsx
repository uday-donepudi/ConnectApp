import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { usersAPI, postsAPI } from "../api/endpoints";
import ProfileCard from "../components/profile/ProfileCard.jsx";
import ProfileEditForm from "../components/profile/ProfileEditForm.jsx";
import UserSearch from "../components/profile/UserSearch.jsx";
import PostFeed from "../components/posts/PostFeed.jsx";
import Spinner from "../components/common/Spinner.jsx";

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, isAuthenticated } = useAuth();

  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isOwnProfile = userId === "me" || userId === currentUser?._id;
  const targetUserId = isOwnProfile ? currentUser?._id : userId;

  // Load user profile
  useEffect(() => {
    const loadProfile = async () => {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        let userData;
        if (isOwnProfile) {
          userData = currentUser;
        } else {
          userData = await usersAPI.getUser(targetUserId);
        }
        setProfileUser(userData);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [targetUserId, isOwnProfile, currentUser, isAuthenticated, navigate]);

  // Load user posts
  useEffect(() => {
    const loadPosts = async () => {
      if (!targetUserId) return;

      setIsPostsLoading(true);

      try {
        const postsData = await postsAPI.getUserPosts(targetUserId);
        setPosts(postsData);
      } catch (err) {
        console.error("Failed to load posts:", err);
        setPosts([]);
      } finally {
        setIsPostsLoading(false);
      }
    };

    loadPosts();
  }, [targetUserId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="text-center py-12">
            <div className="text-textSecondary text-lg">User not found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Profile Card */}
        <ProfileCard
          user={profileUser}
          isOwnProfile={isOwnProfile}
          onEdit={() => setIsEditModalOpen(true)}
        />

        {/* User Search - Only show on own profile */}
        {isOwnProfile && <UserSearch />}

        {/* Posts Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-textPrimary mb-4">
            {isOwnProfile ? "Your Posts" : `${profileUser.name}'s Posts`}
          </h2>

          <PostFeed posts={posts} isLoading={isPostsLoading} error={null} />
        </div>

        {/* Edit Profile Modal */}
        {isOwnProfile && (
          <ProfileEditForm
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            user={profileUser}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
