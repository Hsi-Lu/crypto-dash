import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

const API_URL = import.meta.env.VITE_API_COIN_URL;

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
);

const CoinChart = ({ coinId }) => {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`,
                );
                const data = await response.json();
                console.log(data);
                const prices = data.prices.map((price) => ({
                    x: price[0],
                    y: price[1],
                }));

                setChartData({
                    datasets: [
                        {
                            label: "Price (USD)",
                            data: prices,
                            fill: true,
                            borderColor: "#007bff",
                            backgroundColor: "rgba(0, 123, 255, 0.1)",
                            pointRadius: 0,
                            tension: 0.3,
                        },
                    ],
                });
            } catch (err) {
                setError(err.message);
                console.log(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPrices();
    }, [coinId]);

    return (
        <>
            {isLoading && <p>Chart is loading</p>}
            {error && <p>Fetch error occured</p>}
            {!error && !isLoading && (
                <div style={{ marginTop: "30px" }}>
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { display: false },
                                tooltip: { mode: "index", intersect: false },
                            },
                            scales: {
                                x: {
                                    type: "time",
                                    time: {
                                        unit: "day",
                                    },
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 7,
                                    },
                                },
                                y: {
                                    ticks: {
                                        callback: (value) =>
                                            `$${value.toLocaleString()}`,
                                    },
                                },
                            },
                        }}
                    ></Line>
                </div>
            )}
        </>
    );
};

export default CoinChart;
