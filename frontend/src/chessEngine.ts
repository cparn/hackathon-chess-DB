enum MoveType {
    pawnMove,
    pawnCapture,
    pawnCaptureEP,
    knightMove,
    bishopMove,
    rookMove,
    queenMove,
    kingMove,
    castleShort,
    castleLong
}

export const initialGame = [
    [4, 2, 3, 5, 6, 3, 2, 4],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-4, -2, -3, -5, -6, -3, -2, -4]];

export const makeMove = (board: number[][], game: string, turn: number, isBlack: boolean) => {
    const moveString = findMoveString(game, turn, isBlack);
    const moveType = findMoveType(moveString);
    if (moveType == MoveType.castleLong || moveType == MoveType.castleShort) {
        castle(board, moveType, isBlack);
        return board;
    }
    const destinationSquare = findDestinationSquare(moveString, moveType);
    const pieceToRemove = findPieceToRemove(moveString, moveType, board, isBlack, destinationSquare);
    movePiece(board, pieceToRemove, destinationSquare);
    return board;
}

export const findMoveString = (game: string, turn: number, isBlack: boolean) => {
    const moveString = game.split(' ');
    let move = moveString[turn];
    const slice = turn < 18 ? 2 : 3;
    return isBlack ? move : move.slice(slice);
}

const findMoveType = (move: string) => {

    switch (move[0]) {
        case 'N':
            return MoveType.knightMove;
        case 'B':
            return MoveType.bishopMove;
        case 'R':
            return MoveType.rookMove;
        case 'Q':
            return MoveType.queenMove;
        case 'K':
            return MoveType.kingMove;
        case 'O':
            if (move == 'O-O') return MoveType.castleShort;
            return MoveType.castleLong;
        default:
            break;
    }
    if (move.length == 2) return MoveType.pawnMove;
    if (move.length == 4) return MoveType.pawnCapture;
    return MoveType.pawnCaptureEP;
}

const findPieceToRemove = (move: string, mt: MoveType, board: number[][], isBlack: boolean, destinationSquare: number[]) => {
    const mod = isBlack ? -1 : 1;
    const row = destinationSquare[0];
    const col = destinationSquare[1];
    if (mt == MoveType.pawnMove) {
        const col = getColumn(move[0]);
        const dir = isBlack ? 1 : -1;
        let start: number = Number(move[1]);
        while (true) {
            if (board[start][col] == 1 * mod) {
                return [start, col];
            }
            start += dir;
        }
    }
    if (mt == MoveType.pawnCapture) {
        const col = getColumn(move[0]);
        const dir = isBlack ? 1 : -1;
        const row = Number(move[3]) + dir - 1;
        return [row, col];
    }
    if (mt == MoveType.knightMove) {
        for (let i = 0; i < 8; i++) {
            const potRow = row + knightMoves[i][0];
            const potCol = col + knightMoves[i][1];
            if (potRow > 7 || potCol > 7 || potRow < 0 || potCol < 0) continue;
            if (board[potRow][potCol] == 2 || board[potRow][potCol] == -2) {
                return [potRow, potCol];
            }
        }
    }
    if (mt == MoveType.bishopMove) {
        let tmpRow = row;
        let tmpCol = col;
        while (++tmpRow < 8 && ++tmpCol < 8) {
            if (board[tmpRow][tmpCol] == 3 * mod) {
                return [tmpRow, tmpCol];
            }
        }
        tmpRow = row;
        tmpCol = col;
        while (--tmpRow >= 0 && ++tmpCol < 8) {
            if (board[tmpRow][tmpCol] == 3 * mod) {
                return [tmpRow, tmpCol];
            }
        }
        tmpRow = row;
        tmpCol = col;
        while (--tmpRow >= 0 && --tmpCol >= 0) {
            if (board[tmpRow][tmpCol] == 3 * mod) {
                return [tmpRow, tmpCol];
            }
        }
        tmpRow = row;
        tmpCol = col;
        while (++tmpRow < 8 && --tmpCol >= 0) {
            if (board[tmpRow][tmpCol] == 3 * mod) {
                return [tmpRow, tmpCol];
            }
        }
    }
    if (mt == MoveType.rookMove) {
        let tmpRow = row;
        let tmpCol = col;
        while (++tmpRow < 8) {
            if (board[tmpRow][tmpCol] == 4 * mod) {
                return [tmpRow, tmpCol];
            }
            if (board[tmpRow][tmpCol] != 0) {
                break;
            }
        }
        tmpRow = row;
        while (--tmpRow >= 0) {
            if (board[tmpRow][tmpCol] == 4 * mod) {
                return [tmpRow, tmpCol];
            }
            if (board[tmpRow][tmpCol] != 0) {
                break;
            }
        }
        tmpRow = row;
        while (--tmpCol >= 0) {
            if (board[tmpRow][tmpCol] == 4 * mod) {
                return [tmpRow, tmpCol];
            }
            if (board[tmpRow][tmpCol] != 0) {
                break;
            }
        }
        tmpCol = col;
        while (++tmpCol < 8) {
            if (board[tmpRow][tmpCol] == 4 * mod) {
                return [tmpRow, tmpCol];
            }
            if (board[tmpRow][tmpCol] != 0) {
                break;
            }
        }
    }
    if (mt == MoveType.queenMove || mt == MoveType.kingMove) {
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (board[y][x] == 5 * mod) {
                    return [y, x];
                }
            }
        }
    }
    return [0];
}

const findDestinationSquare = (move: string, t: MoveType) => {
    const square = move.slice((move.length - 2), move.length);
    const col = getColumn(square[0]);
    const row = Number(square[1]) - 1;
    return [row, col];
}

const movePiece = (board: number[][], old: number[], news: number[]) => {
    const piece = board[old[0]][old[1]];
    board[old[0]][old[1]] = 0;
    board[news[0]][news[1]] = piece;
}

const getColumn = (c: string) => {
    switch (c) {
        case 'a': return 0;
        case 'b': return 1;
        case 'c': return 2;
        case 'd': return 3;
        case 'e': return 4;
        case 'f': return 5;
        case 'g': return 6;
        case 'h': return 7;
    }
    return -1;
}

const knightMoves = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1]];

const castle = (board: number[][], mt: MoveType, isBlack: boolean) => {
    if (mt == MoveType.castleShort && !isBlack) {
        board[0][4] = 0;
        board[0][7] = 0;
        board[0][5] = 4;
        board[0][6] = 6;
        return;
    }
    if (mt == MoveType.castleLong && !isBlack) {
        board[0][0] = 0;
        board[0][4] = 0;
        board[0][3] = 4;
        board[0][2] = 6;
        return;
    }
    if (mt == MoveType.castleShort && isBlack) {
        board[7][4] = 0;
        board[7][7] = 0;
        board[7][5] = -4;
        board[7][6] = -6;
        return;
    }
    if (mt == MoveType.castleLong && !isBlack) {
        board[7][0] = 0;
        board[7][4] = 0;
        board[7][3] = -4;
        board[7][2] = -6;
        return;
    }
}