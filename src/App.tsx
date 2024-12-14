import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';


function App() {

    const regex = /<div class="rR">#(\d+)<\/div>(?:(?!<div class="rR">#).)*?<div class="playerLink"><a class="playerName" href="[^"]*">Cone<\/a><\/div>.*?<div class="score">([\d,]+)\s*<\/div>/s;
    const url = 'https://cors-proxy.fringe.zone/https://steamcommunity.com/stats/2217000/leaderboards/14800950?sr=45';


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [position, setPosition] = useState<string | null>(null);
    const [points, setPoints] = useState<string | null>(null);
    const [leaderboardData, setLeaderboardData] = useState(null);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await axios.get(url);
                const coneMatch = response.data.match(regex);
                if (coneMatch) {
                    setPosition(coneMatch[1])
                    setPoints(coneMatch[2])
                }
                setLeaderboardData(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError('Error fetching leaderboard data');
                setLoading(false);
            }
        };

        fetchLeaderboardData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="App">
            <header className="App-header">
                <h1>Cone Leaderboard Rivals Tracker</h1>
            </header>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                leaderboardData && (
                    <div className="leaderboard-info">
                        <div className="info-card">
                            <h2>Position</h2>
                            <p className="highlight">{position}</p>
                        </div>
                        <div className="info-card">
                            <h2>Points</h2>
                            <p className="highlight">{points}</p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default App;