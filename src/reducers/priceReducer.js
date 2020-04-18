//initial state

const iState = {
  price: 0,
  editedItem: [],
};

const priceReducer = (state = iState, action) => {
  if (action.type === "UPD_PRICE") {
    return {
      ...state,
      price: action.payload,
    };
  }
  if (action.type === "EDIT") {
    return {
      ...state,
      editedItem: action.payload,
    };
  }

  return state;
};

export default priceReducer;
