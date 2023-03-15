import React, { useEffect } from 'react'
import './History.css'

type HistoryProps = {
    iterator: number,
    game: string[]
}

export const History: React.FC<HistoryProps> = ({ iterator, game }) => {
    let tmp = -1;
    for (let i = 0; i < iterator; i++) {
        if (i % 2 == 0) tmp++;
        tmp++;
    }
    let ct = 1;
    return (
        <div className='chess-interface__history'>
            {game.map(line => {
                if (tmp + 1 == ct++) {
                    return (<p className='chess-interface__history__line highlighted'>
                        {line}
                    </p>)
                } else {
                    return (<p className='chess-interface__history__line'>
                        {line}
                    </p>
                    )
                }
            })};
        </div >
    )
}
