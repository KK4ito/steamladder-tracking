import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const regex = /<div class="rR">#(\d+)<\/div>(?:(?!<div class="rR">#).)*?<div class="playerLink"><a class="playerName" href="[^"]*">Cone<\/a><\/div>.*?<div class="score">([\d,]+)\s*<\/div>/s;
    const url = 'https://cors-proxy.fringe.zone/https://steamcommunity.com/stats/2217000/leaderboards/14800950?sr=45';
    const [loading, setLoading] = useState(true);
    const [position, setPosition] = useState<string | null>(null);
    const [points, setPoints] = useState<string | null>(null);
    const [leaderboardData, setLeaderboardData] = useState(null);
    const [contentVisible, setContentVisible] = useState(false);

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
                setTimeout(() => {
                    setLoading(false);
                    setTimeout(() => setContentVisible(true), 500);
                }, 3000);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchLeaderboardData();
    });

    return (
        <>
            <div className={`loading ${!loading ? 'fade-out' : ''}`}>
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">LOADING</div>
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="particle"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className={`App ${contentVisible ? 'visible' : ''}`}>
                <div className={`content ${contentVisible ? 'content-fade-in' : ''}`}>
                    <header className="App-header">
                        <h1>Cone Leaderboard Rivals Tracker</h1>
                    </header>
                    {leaderboardData && (
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
                    )}
                </div>
            </div>
        </>
    );
}

export default App;