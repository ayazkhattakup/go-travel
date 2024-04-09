import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Header() {
  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    navigate(`/results/${document.getElementById('budget-input').value}`);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="header">
        <form onSubmit={handleSubmit} className="center">
          <h1>Come, Explore with Us</h1>`
          <h4>Find the best possible destinations as per your budget</h4>
          <div className="other-inputs d-flex gap-5 mt-4">
          </div>
          <div className="input mt-4">
            <input type="text" className="form-control" value="$" />
            <input
              required
              id="budget-input"
              value={auth.budget}
              onChange={auth.handleBudgetValueChange}
              className="form-control "
              placeholder="Enter your budget to get suggestions"
              type="number"
            />
          </div>
          <button type="submit"></button>
        </form>
      </div>
    </>
  );
}
