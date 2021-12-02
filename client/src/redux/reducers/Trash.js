export default (trash = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_TRASH":
      return action.payload;
    case "CREATE_TRASH":
      return trash;
    default:
      return trash;
  }
};
