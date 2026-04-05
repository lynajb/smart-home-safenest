import axios from "axios";

//change it with your own pc ip address the second one is on the cloud
//const API_URI = "http://192.168.1.101:3000";
const API_URI = "https://smartnest-server.onrender.com";

export default function useLedControl() {
  const controlLED = (state) => {
    axios
      .post(`${API_URI}/api/v1/commands/led`, { state: state }) // Send state in the body, not as a query parameter
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error controlling LED:", error);
      });
  };

  return {
    controlLED,
  };
}
