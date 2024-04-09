import React from "react";
import aeroplanImg from '../static/images/aeroplane.png'


export default function OfferCard(props) {

    const {id, price, date, origin, dist, adults } = props 

    return (
        <>
            <div className="offer-card mt-3">
                <img src={aeroplanImg} width={30} alt="" />
                <div className="card-text d-flex flex-column">
                    <span className="d-flex align-items-center">ID <h3 className="offer-id mx-2">{id}</h3></span>
                    <span className="people">
                        Adults <div className="value">{adults}</div>
                    </span>
                    <span className="price">
                        Price <span className="value">${price}</span>
                    </span>
                    <span className="date mt-1">
                        Date <div className="value">{date}</div>
                    </span>
                </div>
            </div>
        </>
    )
}