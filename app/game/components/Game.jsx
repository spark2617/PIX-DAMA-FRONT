'use client'
import { useEffect, useRef } from 'react'
import StartGame from '../config/GameConfig'

export default function Game() {
    const gameRef = useRef(null)

    useEffect(() => {
        // Dynamic import of Phaser
        const initPhaser = async () => {
            if (typeof window !== 'undefined') {
                const Phaser = (await import('phaser')).default
                
                // Only create a new game if one doesn't exist
                if (!gameRef.current) {
                    gameRef.current = new Phaser.Game(StartGame)
                }
            }
        }

        initPhaser()

        // Cleanup
        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true)
                gameRef.current = null
            }
        }
    }, [])

    return <div id="game-container" className="w-full h-full" />
}