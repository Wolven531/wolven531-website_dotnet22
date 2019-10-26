// import { ADD_ITEM, DELETE_ITEM } from '../actionTypes'

const initialState = { }

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_ITEM:
    //   state = {
    //   };
    //   return state;
    // case DELETE_ITEM:
    //   state = {
    //   };
    //   return state;
    default:
      return state
  }
}

export { appReducer }
