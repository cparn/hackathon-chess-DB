import React, { useState } from 'react'
import { Board } from './Board'
import { History } from './History';

export const ChessInterface = () => {

    const [game, setGame] = useState('1.e4 Nf6 2.e5 Nd5 3.d4 d6 4.Nf3 Bg4 5.Be2 e6 6.c4 Nb6 7.exd6 cxd6 8.Nc3 Nc6 9.d5 exd5 10.cxd5 Bxf3 11.Bxf3 Ne5 12.O-O Be7 13.Bf4 O-O 14.Re1 Bf6 15.Be4 Rc8 16.Qb3 Qd7 17.Nb5 a6 18.Na7 Rc7 19.Bxe5 dxe5 20.Qxb6 Be7 21.Rac1 Bd6 22.Rxc7 Qxc7 23.Qxc7 Bxc7 24.Nc8 Rxc8 25.Rc1');


    return (
        <main className="chess-interface">
            <Board game={game} />
            <History game={game} />
        </main>
    )
}
