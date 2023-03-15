import React from 'react'
import './History.css'

type HistoryProps = {
    iterator: number,
    game: string[]
}

export const History: React.FC<HistoryProps> = ({ iterator, game }) => {

    return (
        <div className='chess-interface__history'>
            {game.map(line => <p className='chess-interface__history__line'>{line}</p>)}
        </div>
    )
}
