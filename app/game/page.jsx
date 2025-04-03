'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkSession } from '../services/auth'
import Game from './components/Game'

function game() {
    const [usuarioAutenticado, definirUsuarioAutenticado] = useState(false)
    const [dadosUsuarios, definirDadosUsuarios] = useState({})
    const route = useRouter()

    useEffect(() => {

        const verificar = async () => {
            const { success, data} = await checkSession()

            if(data.usuarioAutenticado){
                definirDadosUsuarios(data)
                definirUsuarioAutenticado(data.usuarioAutenticado)
            }else{
                route.push('/')
            }
        }

        verificar()
    }, [])


    return (
        <main className='flex min-h-screen flex-col items-center px-2 py-9 md:px-16 gap-10 text-white'>
            {usuarioAutenticado && (
                <>
                    <div className="w-full max-w-4xl h-[600px]">
                        <Game />
                    </div>
                </>
            )}
        </main>
    )
}

export default game