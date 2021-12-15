export default (token = { loginData: null }, action) => {
    switch (action.type) {
      case "LOGIN":
        // console.log(action?.payload)
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));

        return { ...token, authData: action?.payload };
      case "LOGOUT":
        localStorage.clear();

        return { ...token, authData: null };
      default:
        return token;
    }
  };
  