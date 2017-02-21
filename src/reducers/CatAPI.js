import * as ActionTypes   from '../Types';

const INITIAL_STATE = {
  categories         : [],
  categories_loading : false,
  favorites          : [],
  favorites_loading  : false,
  cat                : null,
  getting_favorites  : false,
  cat_loading        : false,
  cat_voting         : false
};

export default function(state = INITIAL_STATE, action) {

  let
    categories, acat, favorites
  ;

  switch (action.type) {

    // Get the categories
    case ActionTypes.LIST_CATEGORIES:
      return { ...state,  categories_loading : true };

    case ActionTypes.LIST_CATEGORIES_SUCCESS:
      // Get the 0th element of each object list!!
      categories = action.payload.data.map((category) => {
        return { id: category.id[0], name: category.name[0] };
      });

      return { ...state, categories_loading : false, categories: categories };

    case ActionTypes.LIST_CATEGORIES_FAIL:
      return { ...state, categories_loading : false, categories: [] };

    // Get a single cat
    case ActionTypes.GET_CAT:
      return { ...state,  cat_loading : true };

    case ActionTypes.GET_CAT_SUCCESS:
      // Get the 0th element of each object list!!
      acat = action.payload.data.map((cat) => {
        return { id: cat.id[0], url: cat.url[0], source_url: cat.source_url[0] };
      });
      return { ...state, cat_loading : false, cat: acat[0] };

    case ActionTypes.GET_CAT_FAIL:
      return { ...state, cat_loading : false, cat: null };

    // Vote for a cat
    case ActionTypes.VOTE_CAT:
      return { ...state, cat_voting : true };

    case ActionTypes.VOTE_CAT_SUCCESS:
      return { ...state, cat_voting : false };

    case ActionTypes.VOTE_CAT_FAIL:
      return { ...state, cat_voting : false };

    // Get favorites
    case ActionTypes.GET_FAVORITES:
      return { ...state, getting_favorites : true };

    case ActionTypes.GET_FAVORITES_SUCCESS:
      favorites = action.payload.data.map((favorite) => {
        return { id: favorite.id[0], url: favorite.url[0], sub_id: favorite.sub_id[0], created: favorite.created[0] };
      });
      return { ...state, getting_favorites : false, favorites : favorites };

    case ActionTypes.GET_FAVORITES_FAIL:
      return { ...state, getting_favorites : false, favorites: [] };

    default:
      return state;
  }
}
