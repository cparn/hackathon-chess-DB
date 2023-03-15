export const getClassNameForPiece = (num: number) => {
    switch (num) {
        case 1:
            return ' pawn';
        case 2:
            return ' knight';
        case 3:
            return ' bishop';
        case 4:
            return ' rook';
        case 5:
            return ' queen';
        case 6:
            return ' king';
        case -1:
            return ' darkpawn';
        case -2:
            return ' darkknight';
        case -3:
            return ' darkbishop';
        case -4:
            return ' darkrook';
        case -5:
            return ' darkqueen';
        case -6:
            return ' darkking';
        default:
            return '';
    }
}