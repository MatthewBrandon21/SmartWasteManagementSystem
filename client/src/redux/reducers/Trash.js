export default (trash = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_TRASH":
      return action.payload;
    case "CREATE_TRASH":
      return [...trash, action.payload];
    case "UPDATE_TRASH":
      return trash.map((trashh) =>
        trashh.id === action.payload.id ? action.payload : trashh
      );
    case "DELETE_TRASH":
      return trash.filter((trashh) => trashh.id !== action.payload);
    default:
      return trash;
  }
};
