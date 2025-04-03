export class Piece {
    line: number;
    col: number;
    type: number;
    isKing: boolean;
    pieceImage: any;

    constructor(line: number, col: number, type: number, isKing: boolean, pieceImage: any) {
        this.line = line;
        this.col = col;
        this.type = type;
        this.isKing = isKing;
        this.pieceImage = pieceImage;
    }

}