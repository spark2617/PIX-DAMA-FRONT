import Phaser, { Game } from "phaser";
import { GameScene } from "./GameScene";

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 600,
    height: 600,
    backgroundColor: '#2d2d2d',
    scene: GameScene,
    // scale: {
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

export default config;