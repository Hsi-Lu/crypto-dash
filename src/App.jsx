import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";
import CoinDetainsPage from "./pages/CoinDetailsPage";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState("");
    const [sortedBy, setSortedBy] = useState("market_cap_desc");

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch(
                    `${API_URL}&per_page=${limit}&page=1&sparkline=false`,
                );
                if (!response.ok) throw new Error("Failed to fetch data");
                const data = await response.json();
                setCoins(data);
                setIsLoading(false);
                console.log(data);
            } catch (error) {
                setError(error.message);
                console.log(error.message);
            }
        };
        fetchCoins();
    }, [limit, sortedBy]);

    return (
        <>
            <Header></Header>

            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            coins={coins}
                            filter={filter}
                            setFilter={setFilter}
                            limit={limit}
                            setLimit={setLimit}
                            sortedBy={sortedBy}
                            setSortedBy={setSortedBy}
                            isLoading={isLoading}
                            error={error}
                        ></HomePage>
                    }
                ></Route>
                <Route path="/about" element={<AboutPage></AboutPage>}></Route>
                <Route
                    path="/coin/:id"
                    element={<CoinDetainsPage></CoinDetainsPage>}
                ></Route>
                <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
            </Routes>
        </>
    );
};

export default App;
