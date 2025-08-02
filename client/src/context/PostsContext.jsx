import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";

// Initial state
const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

// Action types
export const POSTS_ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_POSTS: "SET_POSTS",
  ADD_POST: "ADD_POST",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Reducer
const postsReducer = (state, action) => {
  switch (action.type) {
    case POSTS_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case POSTS_ACTIONS.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
        error: null,
      };
    case POSTS_ACTIONS.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case POSTS_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case POSTS_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create context
const PostsContext = createContext();

// Provider component
export const PostsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  // Set loading
  const setLoading = useCallback((loading) => {
    dispatch({ type: POSTS_ACTIONS.SET_LOADING, payload: loading });
  }, []);

  // Set posts
  const setPosts = useCallback((posts) => {
    dispatch({ type: POSTS_ACTIONS.SET_POSTS, payload: posts });
  }, []);

  // Add post (optimistic update)
  const addPost = useCallback((post) => {
    dispatch({ type: POSTS_ACTIONS.ADD_POST, payload: post });
  }, []);

  // Set error
  const setError = useCallback((error) => {
    dispatch({ type: POSTS_ACTIONS.SET_ERROR, payload: error });
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: POSTS_ACTIONS.CLEAR_ERROR });
  }, []);

  const value = {
    ...state,
    setLoading,
    setPosts,
    addPost,
    setError,
    clearError,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

// Custom hook to use posts context
export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
};
