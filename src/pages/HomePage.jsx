import CoinCard from "../components/CoinCard";
import FilterInput from "../components/FilterInput";
import LimitSelector from "../components/LimitSelector";
import SortSelector from "../components/SortSelector";

const HomePage = ({
    coins,
    filter,
    setFilter,
    limit,
    setLimit,
    sortedBy,
    setSortedBy,
    isLoading,
    error,
}) => {
    const filteredCoins = coins
        .filter((coin) => {
            return (
                coin.name.toLowerCase().includes(filter.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(filter.toLowerCase())
            );
        })
        .slice()
        .sort((a, b) => {
            switch (sortedBy) {
                case "market_cap_desc":
                    return b.market_cap - a.market_cap;
                case "market_cap_asc":
                    return a.market_cap - b.market_cap;
                case "price_desc":
                    return b.current_price - a.current_price;
                case "price_asc":
                    return a.current_price - b.current_price;
                case "change_desc":
                    return (
                        b.price_change_percentage_24h -
                        a.price_change_percentage_24h
                    );
                case "change_asc":
                    return (
                        a.price_change_percentage_24h -
                        b.price_change_percentage_24h
                    );
                default:
                    break;
            }
        });

    return (
        <>
            <h1>🚀 Crypto Dash</h1>
            {isLoading && <p>Loading ...</p>}
            {error && <div className="error">{error}</div>}

            <div className="top-controls">
                <FilterInput
                    filter={filter}
                    setFilter={setFilter}
                ></FilterInput>
                <LimitSelector
                    limit={limit}
                    setLimit={setLimit}
                ></LimitSelector>
                <SortSelector
                    sortedBy={sortedBy}
                    setSortedBy={setSortedBy}
                ></SortSelector>
            </div>

            {!isLoading && !error && (
                <main className="grid">
                    {filteredCoins.length > 0 ? (
                        filteredCoins.map((coin) => (
                            <CoinCard coin={coin} key={coin.id}></CoinCard>
                        ))
                    ) : (
                        <p>No matching coins</p>
                    )}
                </main>
            )}
        </>
    );
};

export default HomePage;
