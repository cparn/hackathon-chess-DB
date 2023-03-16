import React, { useState } from 'react'
import { Game } from './GamesList'

type EditGameFormProps = {
    game: Game
}

type FormState = {
    opponent: string,
    date: string,
    location: string,
    comments: string
}
export const EditGameForm: React.FC<EditGameFormProps> = ({ game }) => {
    const [formState, setFormState] = useState<FormState>({
        opponent: game.opponent,
        date: game.date,
        location: game.location,
        comments: game.comments
    });

    return (
        <form>

        </form>
    )
}
