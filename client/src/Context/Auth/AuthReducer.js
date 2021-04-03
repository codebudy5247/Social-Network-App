import { AUTH, LOGOUT } from "../Constants/userConstants";

export default (state, action) => {
  switch (action.type) {
    case AUTH:

      //console.log(action.payload.result.name);
      localStorage.setItem("token", action.payload.token);
      // localStorage.setItem("id", action.payload.result._id);
      // localStorage.setItem("name", action.payload.result.name);

      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        user: action.payload.result,
      };
    case LOGOUT:
      localStorage.clear();
      console.log(localStorage);
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: true,
        user: null,
      };
    default:
      return {
        ...state,
      };
  }
};
