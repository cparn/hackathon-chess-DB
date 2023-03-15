import React from "react";
import './ChessTitle.css';

type TitleProps = {
    opp: string,
    date: string
}

export const ChessTitle: React.FC<TitleProps> = ({ opp, date }) => {
    return (
        <>
            <h2 className="chess__title">{opp}</h2>
            <p>Played at </p>
        </>
    )
}