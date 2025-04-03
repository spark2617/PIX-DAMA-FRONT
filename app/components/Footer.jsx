import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <div className='lg:h-28 mb-16 w-full bg-gray-700 text-white text-center flex  flex-col items-center justify-center gap-5 md:mb-0 py-8 px-4'>
            <div className='flex gap-5'>
                <Link href="/" className='cursor-pointer'>
                    <p className='text-md text-white '>PIX <span className='font-black text-gray-300'>Dama</span> </p>
                </Link>
                |
                <p>Todos os Direitos reservados</p>
                |
                <a href="/termos" target='_blank' className='font-bold'>Termos da Plataforma</a>
            </div>
            <div className='flex gap-4 items-center'>
                <div className='border py-1 px-2 rounded-full'>
                    <p>+18</p>
                </div>
                <p>Apostas <span className='font-bold'>proibidas</span> para menores de 18 anos</p>
            </div>
        </div>
    )
}

export default Footer