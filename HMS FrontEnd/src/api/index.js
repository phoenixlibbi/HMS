import { useState } from "react";
import axios from "axios";

export const GetData = () => {
  const [empData, setEmpData] = useState([]);

  // Make a request for a user with a given ID
   axios
    .get("http://localhost:8080/employee")
    .then(function (response) {
      // handle success
      setEmpData(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
      console.log("Done")
    });

  return empData;
};
