export default (user = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_USER":
      return action.payload;
    case "CREATE_USER":
      return user;
    default:
      return user;
  }
};
