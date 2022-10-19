import React from "react";
import { useNavigate } from "react-router-dom";
import { CLIENT_PATH } from "../service/ParkingService";

const Signout = () => {

  const history = useNavigate()

  function handleRemoveToken(){
    localStorage.removeItem("jwt")
    window.location.href = CLIENT_PATH
    history("/")
    return ""
  }

  return (
    <div>
      {handleRemoveToken()}
    </div>
  );
};

export default Signout;