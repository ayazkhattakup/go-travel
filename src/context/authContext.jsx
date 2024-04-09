import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const login_url = process.env.REACT_APP_LOGIN_URL;
export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : null);
    const [budget, setBuget] = useState();
    const [startCity, setStartCity] = useState(sessionStorage.getItem("startCity") ? sessionStorage.getItem("startCity") : null);
    const [distCity, setDistCity] = useState(sessionStorage.getItem("distCity") ? sessionStorage.getItem("distCity") : null);  

  const handleBudgetValueChange = e => {
    setBuget(e.target.value);
  }
  
  const handleStartCitytValueChange = e => {
    console.log(startCity);
    setStartCity(e.target.value);
    
    sessionStorage.setItem('startCity', e.target.value);
    }
  const handleDistCitytValueChange = e => {
    console.log(distCity)
    setDistCity(e.target.value);
    sessionStorage.setItem('distCity', e.target.value);
  }

  const getToken = async (e) => {
    console.log("helo")
    console.log(process.env.REACT_APP_AMADEUS_CLIENT_ID);
    try {
      const response = await axios.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        `grant_type=client_credentials&client_id=${process.env.REACT_APP_AMADEUS_CLIENT_ID}&client_secret=${process.env.REACT_APP_AMADEUS_CLIENT_SECRET}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
       console.log(response.data.access_token);
      if (response.status === 200) {
        console.log(response.data.access_token);
        localStorage.setItem("token", response.data.access_token);

        setToken(response.data.access_token);
      };

      console.log(response);
    } catch (err) {
      console.log(err);
    };
  };

  const authValues = {
    token:token,
    budget:budget,
    getToken:getToken,
    distCity:distCity,
    startCity:startCity,
    handleBudgetValueChange:handleBudgetValueChange,
    handleDistCitytValueChange:handleDistCitytValueChange,
    handleStartCitytValueChange:handleStartCitytValueChange,
  };

  return (
    <AuthContext.Provider value={authValues}>
        {children}
    </AuthContext.Provider>
  );
}
