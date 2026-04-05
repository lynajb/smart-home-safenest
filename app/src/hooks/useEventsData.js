import { useState, useEffect } from "react";
import axios from "axios";

//change it with your own pc ip address the second one is on the cloud
//const API_URI = "http://192.168.1.101:3000";
const API_URI = " https://smartnest-server.onrender.com";

export const useEventsData = () => {
  const [events, setEvents] = useState([]);
  const [changed, setChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function getAllEvents() {
    setIsLoading(true);
    await axios
      .get(`${API_URI}/api/v1/events/all`)
      .then((response) => response.data)
      .then((data) => setEvents(data))
      .catch((err) => console.error(err.message))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getAllEvents();
  }, [changed]);

  return {
    getAllEvents,
    events,
    isLoading,
  };
};

function formatResponse(details) {
  return details.flatMap((element) => element.message).join("\n");
}
