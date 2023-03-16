import React from "react";
import { Link } from "react-router-dom";

export const About: React.FC = () => {
    return (
        <section>
            <div className="splash-media">
                <h2>About</h2>
                <p>
                    {"This website was built for </salt> hackday, an event where we had 24 hours to build a fullstack web application."}
                    <br></br><br></br>
                    {"It uses SqlServer as its database, Entity Framework and .NET WebAPI for backend, and React for frontend. This provides a seamless and responsive user experience, and the ability to store games securely and reliably."}
                    <br></br><br></br>
                    {"Some of the things I wish I had time to finish include styling, improving the chess engine, and adding filter features for game listings."}
                    <br></br><br></br>
                    {"Thank you for visiting my website!"}</p>
            </div>
        </section>
    )
}