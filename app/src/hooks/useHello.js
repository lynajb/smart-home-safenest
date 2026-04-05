import axios from "axios";

//change it with your own pc ip address the second one is on the cloud
//const API_URI = "http://192.168.1.101:3000";
const API_URI = " https://smartnest-server.onrender.com";

export default function useHello() {
  const sendHelloToServer = async () => {
    try {
      const response = await axios.post(`${API_URI}/api/v1/hello`, {
        message: "Hello, World!",
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    sendHelloToServer,
  };
}
