'use client'

import { Button } from '@nextui-org/button'
import { useDisclosure } from "@nextui-org/modal";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { Fire, Trophy } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import {fetchUserTransactions} from "../api/payments/usuario/getTransfer"
import React, { useEffect, useState } from 'react'
// import { verificarSessao } from '../actions/verificarSessao'
import { checkSession } from '../services/auth'
import { useAppContext } from '../context/appContext'
import ModalDeposit from "../components/ModalDeposit"
import ModalWithdraw from "../components/ModalWithdraw"

function painelUsuario() {
    const [usuarioAutenticado, definirUsuarioAutenticado] = useState(false)
    const [dadosUsuarios, definirDadosUsuarios] = useState({})
    const [transactions, setTransactions] = useState([]);
    const route = useRouter()

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const { isOpen: isOpenWithdraw, onOpen:onOpenWithdraw, onOpenChange:onOpenChargenWithdraw } = useDisclosure()

    const {balance, setBalance} = useAppContext()
    

    useEffect(() => {

        const verificar = async () => {
            const { success, data } = await checkSession()

            if (data.usuarioAutenticado) {

                definirDadosUsuarios(data)
                definirUsuarioAutenticado(data.usuarioAutenticado)
            } else {
                route.push('/')
            }
        }
        
        // supabase.auth.onAuthStateChange((event) => {
        //     if (event == "SIGNED_IN") {
        //         verificar()
        //     } else if (event == "SIGNED_OUT") {
        //         definirUsuarioAutenticado(false)
        //     }
        // })

        verificar()

        const loadTransactions = async () => {
            const data = await fetchUserTransactions();
            setTransactions(data);
        };

        loadTransactions();

        

    }, [])

    


    return (
        <main className='flex min-h-screen flex-col items-center px-2 py-9 md:px-16 gap-10 text-white'>
            {usuarioAutenticado && (
                <>
                    <div className='flex flex-col md:hidden w-full gap-5'>
                        <div className='flex justify-start w-full'>
                            <div className='flex flex-col gap3'>
                                <div><h1 className='font-bold text-4xl'>Olá, {dadosUsuarios.nome}</h1></div>
                                <div>
                                    <p className='text-stone-500'>Saldo Atual:</p>
                                    <p >{balance}</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-3' >
                            <Button className='w-full bg-white text-black' variant='solid' onClick={onOpen} >DEPOSITAR</Button>
                            <Button className='w-full' variant='bordered'>SACAR</Button>
                        </div>

                        <div className="flex items-center w-full justify-between">
                            <div className="flex items-center gap-3">
                                <Fire size={50} color="#ff2424" weight="fill" />
                                <p className="text-white font-bold">Vitorias <br /> em <br /> Sequência</p>
                            </div>
                            <p className={`text-white font-black text-6xl `}>
                                {dadosUsuarios.vitoriasEmSequencia}
                            </p>
                        </div>

                    </div>

                    <div className='md:flex flex-col hidden w-full gap-5'>
                        <div className='flex justify-between'>
                            <div className='flex justify-start '>
                                <div className='flex flex-col gap3'>
                                    <div><h1 className='font-bold text-4xl'>Olá, {dadosUsuarios.nome}</h1></div>
                                    <div>
                                        <p className='text-stone-500'>Saldo Atual:</p>
                                        <p >{balance}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-20'>
                                <div className="flex items-center gap-3">
                                    <Fire size={50} color="#ff2424" weight="fill" />
                                    <p className="text-white font-bold">Vitorias <br /> em <br /> Sequência</p>
                                </div>
                                <p className={`text-white font-black text-6xl `}>
                                    {dadosUsuarios.vitoriasEmSequencia}
                                </p>

                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className='flex gap-3' >
                                <Button className='w-full bg-white text-black' variant='solid' onClick={onOpen} >DEPOSITAR</Button>
                                <Button className='w-full' variant='bordered' onClick={onOpenWithdraw}>SACAR</Button>
                            </div>
                        </div>

                    </div>

                    <div className='flex flex-col gap-5 w-full'>
                        <div className='flex flex-col items-start w-full'>
                            <h1 className='text-2xl font-bold'>Transações</h1>
                            <p className='text-stone-400'>Acompanhe as ultimas movimentações de sua carteira</p>
                        </div>
                        <Table aria-label="Tabela de Transações" removeWrapper>
                            <TableHeader>
                                <TableColumn>DATA</TableColumn>
                                <TableColumn>TIPO</TableColumn>
                                <TableColumn>VALOR</TableColumn>
                                <TableColumn>SALDO</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {transactions.length > 0 ? (
                                    
                                    transactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                                            <TableCell>{transaction.type}</TableCell>
                                            <TableCell>R$ {transaction.value.toFixed(2)}</TableCell>
                                            <TableCell>R$ {transaction.balance.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                            <TableCell>...</TableCell>
                                            <TableCell>...</TableCell>
                                            <TableCell>...</TableCell>
                                            <TableCell>...</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="w-full h-20 bg-stone-900 fixed bottom-0 flex items-center justify-around z-50 md:hidden">
                        <p className="text-white font-black text-xl">DAMAS</p>
                        <Button onClick={() => !usuarioAutenticado ? onOpen() : console.log('Usuario Logado')} size="sm" radius="full" className="bg-white text-black text-xl font-black ">Jogue Agora</Button>
                    </div>
                </>
            )}
        <ModalDeposit isOpen={isOpen} onOpenChange={onOpenChange} />
        <ModalWithdraw isOpen={isOpenWithdraw} onOpenChange={onOpenChargenWithdraw} />
        </main>
    )
}

export default painelUsuario