import React, { useState } from "react";
import { usePosts } from "../../context/PostsContext.jsx";
import { postsAPI } from "../../api/endpoints";
import Modal from "../common/Modal.jsx";
import ConfirmationDialog from "../common/ConfirmationDialog.jsx";
import Spinner from "../common/Spinner.jsx";

const CreatePostModal = ({ isOpen, onClose }) => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const { addPost } = usePosts();

  const handleClose = () => {
    if (text.trim()) {
      setShowCancelDialog(true);
    } else {
      onClose();
      setText("");
      setError("");
    }
  };

  const handleCancelConfirm = () => {
    setShowCancelDialog(false);
    onClose();
    setText("");
    setError("");
  };

  const handleCancelDismiss = () => {
    setShowCancelDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Post cannot be empty");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const newPost = await postsAPI.createPost({ text: text.trim() });

      // Optimistic update
      addPost(newPost);

      // Close modal and reset
      onClose();
      setText("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-textPrimary">
              Create a New Post
            </h2>
            <button
              onClick={handleClose}
              className="text-textSecondary hover:text-textPrimary text-2xl leading-none"
              disabled={isLoading}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setError("");
                }}
                placeholder="What's on your mind?"
                rows={4}
                maxLength={500}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                disabled={isLoading}
                autoFocus
              />
              <div className="flex justify-between items-center mt-1">
                <span
                  className={`text-xs ${
                    text.length > 450 ? "text-red-500" : "text-textSecondary"
                  }`}
                >
                  {text.length}/500 characters
                </span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="btn-secondary"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !text.trim()}
                className="btn-primary flex items-center"
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Posting...
                  </>
                ) : (
                  "Post"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <ConfirmationDialog
        isOpen={showCancelDialog}
        onClose={handleCancelDismiss}
        onConfirm={handleCancelConfirm}
        title="Cancel Post?"
        message="Are you sure you want to cancel? Your draft will be lost."
        confirmText="Yes, Cancel"
        cancelText="No, Keep Editing"
        type="warning"
      />
    </>
  );
};

export default CreatePostModal;
