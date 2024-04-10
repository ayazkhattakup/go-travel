import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import OfferCard from "../components/offer";

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [message, setMessage] = useState('No offers available within your budget');
  const [notInBudget, setNotInBudget] = useState(false);
  const { budget } = useParams();
  const auth = useContext(AuthContext);

  const filterResults = async (results) => {
    const filtered = await results.filter((result) => result.price.total <= parseInt(budget));
    if(filtered.length === 0) {
      setNotInBudget(true);
    }
    setFilteredResults(filtered);
  };

  const getResults = async () => {
    const response = await axios.get(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          originLocationCode: 'NYC',
          destinationLocationCode: localStorage.getItem('randomCity'),
          departureDate: "2024-05-01",
          adults: "1",
        },
      }
    );

    if (response.status === 401) {
      auth.getToken();
    }

    if (response.status === 200) {
      setResults(response.data["data"]);
      filterResults(response.data['data']);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <>
      <div className="offers-heading mt-4 container">
        <h1>
          Showing Results for Budget ${budget}
        </h1>
      </div>
      { notInBudget && <h3 className="mt-5 text-center" >{message}</h3>}
      <div className="offers-wrapper flex-wrap d-flex container">
        {filteredResults.length > 1 && filteredResults.map((offer) => {
          return (
            <React.Fragment key={offer.id}>
            <OfferCard 
              id={offer.id}
              price={offer.price.total}
              dist={offer.itineraries[0].segments[0].arrival.iataCode}
              origin={offer.itineraries[0].segments[0].departure.iataCode}
              date={offer.itineraries[0].segments[0].departure.at}
            />
            </React.Fragment>
          );
        })}
        {filteredResults.length < 1 && !notInBudget && <h1>Loading...</h1>}
      </div>
    </>
  );
}
