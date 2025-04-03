'use client'

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import { CrownSimple, GearSix, PencilSimple, Users, Wallet } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import alterarSenha from '../actions/alterarSenha'
import { checkSession } from '../services/auth'
import { fetchStatistics } from "../api/admin/getStatistics"

function PainelAdm() {
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(false)
    const [dadosUsuarios, setDadosUsuarios] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statistics, setStatistics] = useState(null);

    const router = useRouter();

    // Buscar estatísticas
    useEffect(() => {
        async function getStats() {
            try {
                const data = await fetchStatistics();
                if (data) {
                    setStatistics(data);
                } else {
                    setError("Erro ao buscar estatísticas.");
                }
            } catch (err) {
                setError("Erro ao carregar estatísticas.");
            } finally {
                setLoading(false);
            }
        }

        getStats();
    }, []);

    // Verificar sessão do usuário
    useEffect(() => {
        async function verificar() {
            const { success, data } = await checkSession();

            if (success && data.administrador) {
                setDadosUsuarios(data);
                setUsuarioAutenticado(data.usuarioAutenticado);
            } else {
                router.push('/');
            }
        }

        verificar();
    }, [router]);

    const redefinirSenha = () => {
        alterarSenha(dadosUsuarios.email);
        alert('Um link para redefinição da sua senha foi enviado para o seu email!');
    };

    // Garantir que statistics não seja acessado se for null
    const {
        totalUsers = 0,
        totalMatches = 0,
        matchesThisMonth = 0,
        totalFee = 0,
        monthlyFee = 0
    } = statistics || {};

    return (
        <main className='flex min-h-screen flex-col items-center px-2 py-9 md:px-16 gap-5 text-white'>
            {usuarioAutenticado && (
                <>
                    <div className='w-full flex items-center justify-between'>
                        <h1 className='font-black text-3xl'>Olá, {dadosUsuarios.nome}</h1>
                        <Dropdown className='dark'>
                            <DropdownTrigger>
                                <GearSix size={40} weight="duotone" className='cursor-pointer' />
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem onClick={redefinirSenha} className='text-white' startContent={
                                    <PencilSimple size={25} weight="duotone" />
                                }>
                                    Alterar Senha
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    <p className='font-bold mt-7 md:mt-10 md:text-2xl'>Dashboard</p>

                    {loading ? (
                        <p>Carregando estatísticas...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <>
                            <div className='w-full flex flex-col gap-2 md:flex-row'>
                                <div className='w-full md:w-auto grow py-6 px-4 border-stone-600 border-2 rounded-2xl flex items-center gap-5'>
                                    <Users size={32} weight="duotone" />
                                    <div>
                                        <h2 className='font-bold text-xl'>Total de Usuários</h2>
                                        <p className='text-xl'>{totalUsers}</p>
                                    </div>
                                </div>
                                <div className='w-full md:w-auto grow py-6 px-4 border-stone-600 border-2 rounded-2xl flex items-center gap-5'>
                                    <CrownSimple size={32} weight="duotone" />
                                    <div>
                                        <h2 className='font-bold text-xl'>Total de Partidas</h2>
                                        <p className='text-xl'>{totalMatches}</p>
                                    </div>
                                </div>
                                <div className='w-full md:w-auto grow py-6 px-4 border-stone-600 border-2 rounded-2xl flex items-center gap-5'>
                                    <CrownSimple size={32} weight="duotone" />
                                    <div>
                                        <h2 className='font-bold text-xl'>Partidas do Último Mês</h2>
                                        <p className='text-stone-500 text-sm'>Partidas referentes ao mês atual</p>
                                        <p className='text-xl'>{matchesThisMonth}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex flex-col gap-2 md:flex-row'>
                                <div className='w-full py-6 px-4 md:w-auto grow border-stone-600 border-2 rounded-2xl flex items-center gap-5'>
                                    <Wallet size={32} weight="duotone" />
                                    <div>
                                        <h2 className='font-bold text-xl'>Taxa Total Arrecadada</h2>
                                        <p className='text-xl'>R$ {totalFee.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className='w-full py-6 px-4 md:w-auto grow border-stone-600 border-2 rounded-2xl flex items-center gap-5'>
                                    <Wallet size={32} weight="duotone" />
                                    <div>
                                        <h2 className='font-bold text-xl'>Taxa Arrecadada Mensal</h2>
                                        <p className='text-stone-500 text-sm'>Cálculo referente ao mês atual</p>
                                        <p className='text-xl'>R$ {monthlyFee.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </main>
    );
}

export default PainelAdm;
