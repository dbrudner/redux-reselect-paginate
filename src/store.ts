import { createSelector } from "reselect";

export const FETCHED_POSTS = "FETCHED_POSTS";
export const IS_LOADING = "IS_LOADING";
export const SELECTED_POST = "SELECTED_POST";
export const MORE_LOADED = "MORE_LOADED";
export const PAGE_CHANGED = "PAGE_CHANGED";

const initialState = {
  loading: null,
  posts: [],
  page: 1
};

type stateType = {
  loading: null | true | false;
  posts: any;
  displayPosts: number;
};

export const reducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  if (action.type === IS_LOADING) {
    return { ...state, loading: true };
  }

  if (action.type === FETCHED_POSTS) {
    return {
      ...state,
      posts: action.payload,
      loading: false,
      totalPosts: action.payload.length
    };
  }

  if (action.type === MORE_LOADED) {
    return { ...state, displayPosts: state.displayPosts + 5 };
  }

  if (action.type === PAGE_CHANGED) {
    return { ...state, page: action.payload };
  }

  return state;
};

const getPosts = (state: stateType) => state.posts;
const getPage = (state: stateType) => state.page;

export const getVisiblePosts = createSelector(
  [getPage, getPosts],
  (page, posts) => {
    return posts.slice(5 * (page - 1), 5 * page);
  }
);
