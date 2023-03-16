import React from "react";
import './Splash.css'

export const Splash: React.FC = () => {
    return (
        <section>
            <div className="splash-card">
                <h2>Welcome to MyChessDB</h2>
            </div>
            <div className="splash-media">
                <h3>How it works</h3>
                <p>Find and review your favorite chess games or share your own.</p>
            </div>
        </section>
    )
}