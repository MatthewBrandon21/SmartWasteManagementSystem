export default (user = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_USER":
      return action.payload;
    case "CREATE_USER":
      return [...user, action.payload];
    case "UPDATE_USER":
      return user.map((userr) =>
        userr.id === action.payload.id ? action.payload : userr
      );
    case "DELETE_USER":
      return user.filter((userr) => userr.id !== action.payload);
    default:
      return user;
  }
};
