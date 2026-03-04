import React, { createContext, useReducer, useEffect } from "react";

// Bước 1: Lấy user từ localStorage nếu có
const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isAuthenticated: storedUser ? true : false,
  user: storedUser || null,
  loading: false,
  error: null,
};

// Bước 2: Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

// Bước 3: Tạo Context
export const AuthContext = createContext();

// Bước 4: Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Lưu user vào localStorage khi login
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  // Hàm login
  const login = (user) => {
    dispatch({ type: "LOGIN_SUCCESS", payload: user });
  };

  // Hàm logout
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};