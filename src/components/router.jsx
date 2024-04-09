import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import ResultsPage from "../pages/results";



export default function Router() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="results/:budget" element={<ResultsPage />} />
            </Routes>
        </>
    )
}