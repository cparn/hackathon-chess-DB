import React from 'react'

type HistoryProps = {
    game: string
}

export const History: React.FC<HistoryProps> = ({ game }) => {
    return (
        <div>{game}</div>
    )
}
