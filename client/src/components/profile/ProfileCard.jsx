import React from "react";
import { formatDistanceToNow } from "date-fns";
import Avatar from "../common/Avatar.jsx";

const ProfileCard = ({ user, isOwnProfile = false, onEdit }) => {
  // Safety check to ensure user exists
  if (!user) {
    return null;
  }

  // Safely format the member since date with fallback
  const getMemberSince = () => {
    if (!user?.createdAt) {
      return "Recently joined";
    }

    try {
      const date = new Date(user.createdAt);
      if (isNaN(date.getTime())) {
        return "Recently joined";
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Recently joined";
    }
  };

  const memberSince = getMemberSince();

  return (
    <div className="card p-6 mb-6">
      <div className="flex items-start space-x-4">
        <Avatar name={user.name} size="xl" />

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-textPrimary">
                {user.name}
              </h1>
              <p className="text-textSecondary text-sm">Member {memberSince}</p>
            </div>

            {isOwnProfile && onEdit && (
              <button onClick={onEdit} className="btn-secondary text-sm">
                Edit Profile
              </button>
            )}
          </div>

          <div className="mt-4">
            <p className="text-textPrimary">{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
