import React from "react";
import { Link } from "react-router-dom";
import './Splash.css'

export const Splash: React.FC = () => {
    return (
        <section>
            <div className="splash-card">
                <h2>Welcome to MyChessDB</h2>
            </div>
            <div className="splash-media">
                <h3>What is this</h3>
                <p>Welcome to <span className="highlight">MyChessDB</span>, a platform designed for the storage and
                    accessibility of your chess games in a secure and user-friendly
                    database. This platform offers a convenient means of tracking your
                    progress, analyzing your performance, and sharing your games with
                    others, regardless of your level of experience with the game.
                    The intuitive interface and powerful search tools provide a seamless user experience
                    and allow you to easily find and review the games you desire. Our passion for chess
                    drives us to assist you in your goal of improving your skills.
                    We invite you to sign up today and start building your personal chess archive with MyChessDB.</p>
            </div>
            <Link to="/games">
                <button className="cta">Get started!</button>
            </Link>
        </section>
    )
}