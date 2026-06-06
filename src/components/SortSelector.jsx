const SortSelector = ({ sortedBy, setSortedBy }) => {
    return (
        <div className="controls">
            <label htmlFor="sort">Sorted by:</label>
            <select
                id="sort"
                value={sortedBy}
                onChange={(e) => setSortedBy(e.target.value)}
            >
                <option value="market_cap_desc">Market Cap (High to Low)</option>
                <option value="market_cap_asc">Market Cap (Low to High)</option>
                <option value="price_desc">Price (High to Low)</option>
                <option value="price_asc">Price (Low to High)</option>
                <option value="change_desc">24H Change (High to Low)</option>
                <option value="change_asc">24H Change (Low to High)</option>
            </select>
        </div>
    );
};

export default SortSelector;
