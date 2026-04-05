import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthContext = createContext();
//change it with your own pc ip address the second one is on the cloud
//const API_URI = "http://192.168.1.101:3000";
const API_URI = " https://smartnest-server.onrender.com";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(AsyncStorage.getItem("user"));
  const [isPending, setIsPending] = useState(false);

  const register = async (username, email, password) => {
    let result = { message: "", status: false };
    try {
      setIsPending(true);
      const response = await axios.post(`${API_URI}/api/v1/auth/register`, {
        username,
        email,
        password,
      });
      result.message = "Registration successful!";
      result.status = true;
      setIsPending(false);
      return result;
    } catch (error) {
      if (error.response) {
        const data = error?.response?.data;
        if (data?.details) result.message = formatResponse(data?.details);
        else result.message = data?.message;
      } else if (error.request) {
        result.message = error?.response?.data?.error;
      } else {
        result.message = `Oops, something went wrong \n${error.message}`;
      }
      setIsPending(false);
      result.status = false;
      return result;
    }
  };

  const login = async (email, password) => {
    let result = { message: "", status: false };
    try {
      setIsPending(true);
      const response = await axios.post(`${API_URI}/api/v1/auth/login`, {
        email,
        password,
      });
      const data = response.data;
      const token = data?.token;
      if (token) {
        AsyncStorage.setItem("user", JSON.stringify(data?.user));
        AsyncStorage.setItem("token", data?.token);
        setUser(data?.user);
        result.message = "Login successfull!";
        result.status = true;
        setIsPending(false);
        return result;
      }
    } catch (error) {
      if (error.response) {
        const data = error?.response?.data;
        if (data?.details) result.message = formatResponse(data?.details);
        else result.message = data?.message;
      } else if (error.request) {
        result.message = error?.response?.data?.error;
      } else {
        result.message = `Oops, something went wrong \n${error.message}`;
      }
      setIsPending(false);
      result.status = false;
      return result;
    }
  };

  const isAuthenticated = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) {
        setUser(null);
        return false;
      }
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);
      return true;
    } catch (error) {
      console.error("Failed to load user:", error);
      setUser(null);
      return false;
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isPending }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;

function formatResponse(details) {
  return details.flatMap((element) => element.message).join("\n");
}
