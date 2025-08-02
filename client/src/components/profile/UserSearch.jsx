import React from "react";
import { Link } from "react-router-dom";
import { useUserSearch } from "../../hooks/useUserSearch";
import Avatar from "../common/Avatar.jsx";
import Spinner from "../common/Spinner.jsx";

const UserSearch = () => {
  const { query, setQuery, results, isLoading, error } = useUserSearch();

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-textPrimary mb-4">
        Find Other Users
      </h2>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for users by name..."
            className="input-field"
          />
        </div>

        {query.trim() && (
          <div className="border-t pt-4">
            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <Spinner size="sm" className="mr-2" />
                <span className="text-textSecondary text-sm">Searching...</span>
              </div>
            )}

            {error && <div className="text-red-600 text-sm py-2">{error}</div>}

            {!isLoading && !error && results.length === 0 && (
              <div className="text-textSecondary text-sm py-2">
                No users found matching "{query}"
              </div>
            )}

            {!isLoading && !error && results.length > 0 && (
              <div className="space-y-2">
                <div className="text-textSecondary text-sm mb-2">
                  Found {results.length} user{results.length !== 1 ? "s" : ""}:
                </div>
                {results.map((user) => (
                  <Link
                    key={user._id}
                    to={`/profile/${user._id}`}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Avatar name={user.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-textPrimary truncate">
                        {user.name}
                      </div>
                      {user.bio && (
                        <div className="text-textSecondary text-sm truncate">
                          {user.bio}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
