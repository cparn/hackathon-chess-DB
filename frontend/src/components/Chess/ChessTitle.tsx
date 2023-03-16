import React from "react";
import './ChessTitle.css';

type TitleProps = {
    opp: string,
    date: string,
    loc: string
}

export const ChessTitle: React.FC<TitleProps> = ({ opp, date , loc}) => {
    return (
        <div>
            <h2 className="chess__title">{opp}</h2>
            <p>{`Played at ${date} in ${loc}.`}</p>
        </div>
    )
}