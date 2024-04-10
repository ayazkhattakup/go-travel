import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import Header from "../components/header";

export default function Home() {

    const auth = useContext(AuthContext);

    function getRandomIATACode() {
        const cityIATACodes = [
          'JFK', 'LAX', 'ORD', 'MIA', 'SFO', 'LAS', 'SEA', 'IAH', 'DFW', 'ATL',
          'DEN', 'MCO', 'BOS', 'PHX', 'PHL', 'DCA', 'SAN', 'MSP', 'DTW', 'TPA',
          'BWI', 'CLT', 'SLC', 'SJC', 'AUS', 'FLL', 'BNA', 'MSY', 'PDX', 'MCI',
          'CMH', 'IND', 'PIT', 'SAT', 'SMF', 'RDU', 'MKE', 'STL', 'CLE', 'BDL',
          'OAK', 'LAS', 'HNL', 'ANC', 'ABQ', 'BOI', 'ELP', 'FAT', 'ICT'
        ];
        
        const randomIndex = Math.floor(Math.random() * cityIATACodes.length);
        const randomCity = cityIATACodes[randomIndex];
        localStorage.setItem('randomCity', randomCity);
        return cityIATACodes[randomIndex];
      }

    useEffect(() => {
        auth.getToken();
        getRandomIATACode();        
    }, [])

    return (
        <>
            <Header />
        </>
    )
}