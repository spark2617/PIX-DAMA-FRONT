import Phaser from 'phaser';
import { Piece } from '../piece/piece';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    // POSICOES DAS PECAS NO TABULEIRO
    BOARD: any = [
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1]
    ];

    locationSize: number = 75;

    EMPTY_PIECE = -1;
    WHITE_PIECE = 0;
    BROWN_PIECE = 1;
    WHITE_PIECE_KING = 2;
    BROWN_PIECE_KING = 3;

    // IMAGEM DO TABULEIRO
    board;

    preload() {
        this.load.setBaseURL('/game');
        
        this.load.image('board', 'tabuleiro.png');
        this.load.image('piece_white', 'peca-branca.png');
        this.load.image('piece_brown', 'peca-marrom.png');
        this.load.image('piece_white_king', 'peca-branca-rei.png');
        this.load.image('piece_brown_king', 'peca-marrom-rei.png');
    }

    create() {
        this.board = this.add.image(300, 300, 'board');
        this.board.setDisplaySize(600, 600);
        
        for (var linha = 0; linha < 3; linha++) {
            for (var coluna = 0; coluna < 8; coluna++) {
                if ((linha + coluna) % 2 !== 0) {
                    let x = (coluna * this.locationSize + this.locationSize / 2);
                    let y = (linha * this.locationSize + this.locationSize / 2);
                    let piece = this.add.image((coluna * this.locationSize + this.locationSize / 2), (linha * this.locationSize + this.locationSize / 2), 'piece_white');
                    piece.setDisplaySize(this.locationSize, this.locationSize);
                    piece.setInteractive();
    
                    this.BOARD[linha][coluna] = new Piece(linha, coluna, this.WHITE_PIECE, false, piece);
    
                    let border = this.add.graphics();
                    border.lineStyle(2, 0xff0000);
                    border.strokeRect(x - this.locationSize / 2, y - this.locationSize / 2, this.locationSize, this.locationSize);
                    border.setVisible(false);
    
                    // piece.on('pointerdown', (pointer) => {
                    //     if (PLAYER_TURN != PLAYER_ONE) {
                    //         alert("Vez do jogador 2");
                    //         return;
                    //     }
    
                    //     if (selectedPiece != null) {
                    //         selectedPiece.pieceImage.clearTint();
                    //     }
                    //     piece.setTint(0xff0000);
    
                    //     let x = Math.floor(pointer.x / this.locationSize);
                    //     let y = Math.floor(pointer.y / this.locationSize);
    
                    //     selectedPiece = BOARD[y][x];
                    // });
    
                    // SQUARES.push(piece);
                }
            }
        }


        for (var linha = 5; linha < 8; linha++) {
            for (var coluna = 0; coluna < 8; coluna++) {
                if ((linha + coluna) % 2 !== 0) {
    
                    let x = (coluna * this.locationSize + this.locationSize / 2);
                    let y = (linha * this.locationSize + this.locationSize / 2);
    
                    let piece = this.add.image((coluna * this.locationSize + this.locationSize / 2), (linha * this.locationSize + this.locationSize / 2), 'piece_brown');
                    piece.setDisplaySize(this.locationSize, this.locationSize);
                    piece.setInteractive();
    
                    this.BOARD[linha][coluna] = new Piece(linha, coluna, this.BROWN_PIECE, false, piece);
    
                    let border = this.add.graphics();
                    border.lineStyle(2, 0xff0000);
                    border.strokeRect(x - this.locationSize / 2, y - this.locationSize / 2, this.locationSize, this.locationSize);
                    border.setVisible(false);
    
                    // piece.on('pointerdown', (pointer) => {
                    //     if (PLAYER_TURN != PLAYER_TWO) {
                    //         alert("Vez do jogador 1");
                    //         return;
                    //     }
    
                    //     if (selectedPiece != null) {
                    //         selectedPiece.pieceImage.clearTint();
                    //     }
                    //     piece.setTint(0xff0000);
    
                    //     let x = Math.floor(pointer.x / this.locationSize);
                    //     let y = Math.floor(pointer.y / this.locationSize);
    
                    //     selectedPiece = BOARD[y][x];
                    // })
    
                    // SQUARES.push(piece);
                }
            }
        }

    }

    update() {

    }
}