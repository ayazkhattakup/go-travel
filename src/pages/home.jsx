import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import Header from "../components/header";

export default function Home() {

    const auth = useContext(AuthContext);

    useEffect(() => {
        auth.getToken();
    }, [])

    return (
        <>
            <Header />
        </>
    )
}