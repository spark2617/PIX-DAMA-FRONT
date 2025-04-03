'use client'

import { createClient } from "../../utils/supabase/client"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Eye, EyeClosed } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { verificarSessao } from "../actions/verificarSessao"

function recuperarSenha() {

    const supabase = createClient()
    const route = useRouter()

    const [senha, definirSenha] = useState('')
    const [confirmarSenha, definirConfirmarSenha] = useState('')

    const [usuarioAutenticado, definirUsuarioAutenticado] = useState(false)
    const [dadosUsuarios, definirDadosUsuarios] = useState({})

    // Gerenciadores da visibilidade da senha
    const [senhaVisivel, definirSenhaVisivel] = useState(false)
    const [confirmarSenhaVisivel, definirConfirmarSenhaVisivel] = useState(false)

    const [erroDeSenha, definirErroDeSenha] = useState({
        erro: false,
        mensagemErro: ''
    })

    useEffect(() => {

        const verificar = async () => {
            const dados = await verificarSessao()

            if (dados.alterandoSenha) {
                definirDadosUsuarios(dados)
                definirUsuarioAutenticado(dados.usuarioAutenticado)
            } else {
                route.push('/')
            }

        }

        supabase.auth.onAuthStateChange((event) => {
            if (event == "SIGNED_IN") {
                verificar()
            } else if (event == "SIGNED_OUT") {
                definirUsuarioAutenticado(false)
            }
        })

        verificar()

    }, [])

    useEffect(() => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (senha != confirmarSenha && senha != '') {
            definirErroDeSenha({
                erro: true,
                mensagemErro: "As senhas digitadas são diferentes"
            })
        } else if (!regex.test(senha) && senha != '') {
            definirErroDeSenha({
                erro: true,
                mensagemErro: "A senha não atende todos os requisitos"
            })
        } else {
            definirErroDeSenha({
                erro: false,
                mensagemErro: ""
            })


        }


    }, [senha, confirmarSenha])

    const redefinir = async () => {
        const { data, error } = await supabase.auth.getUser()
        let idUsuario = data.user.id

        if (senha == '' || senha != confirmarSenha) {
            definirErroDeSenha({
                erro: true,
                mensagemErro: "Preencha corretamente todos os campos"
            })
        } else {
            definirErroDeSenha({
                erro: false,
                mensagemErro: ''
            })

            const { error } = await supabase.auth.updateUser({
                id: idUsuario,
                password: senha
            })

            const { error2 } = await supabase
                .from('dados_usuarios')
                .update({ alterando_senha: false })

                .eq('id_usuario', idUsuario)
                .select()

            if (error && error.code == 'same_password') {
                alert('A nova senha não pode ser similar a anterior')
                definirErroDeSenha({
                    erro: true,
                    mensagemErro: 'A nova senha não pode similar a anterior'
                })
            } else {
                definirErroDeSenha({
                    erro: false,
                    mensagemErro: ''
                })
                route.push('/painel-usuario')
            }
        }
    }

    return (
        <main className='flex min-h-screen flex-col items-center px-2 py-9 md:px-16 gap-5 text-white'>
            {usuarioAutenticado && (
                <>
                    <h1 className="font-bold text-3xl">Recuperação de Senha</h1>

                    <div className="flex flex-col gap-4">
                        <Input className="dark text-white" variant="bordered" label="Senha" type={senhaVisivel ? "text" : "password"} placeholder={senhaVisivel ? "sua senha" : "*******"} isRequired onValueChange={definirSenha} value={senha} isInvalid={erroDeSenha.erro} errorMessage={erroDeSenha.mensagemErro}
                            endContent={
                                <button onClick={() => definirSenhaVisivel(!senhaVisivel)}>
                                    {senhaVisivel ?
                                        <Eye size={20} weight="bold" />
                                        :
                                        <EyeClosed size={20} weight="bold" />
                                    }
                                </button>
                            }

                        />


                        <Input className="dark text-white" variant="bordered" label="Confirme sua Senha" type={confirmarSenhaVisivel ? "text" : "password"} placeholder={confirmarSenhaVisivel ? "sua senha" : "*******"} isRequired value={confirmarSenha} onValueChange={definirConfirmarSenha}
                            endContent={
                                <button onClick={() => definirConfirmarSenhaVisivel(!confirmarSenhaVisivel)}>
                                    {confirmarSenhaVisivel ?
                                        <Eye size={20} weight="bold" />
                                        :
                                        <EyeClosed size={20} weight="bold" />
                                    }
                                </button>
                            }

                        />

                        <div >
                            <p className='text-neutral-500 text-sm'>Sua senha deve conter:</p>
                            <ul className='text-neutral-500 text-[10px]'>
                                <li>* Minimo de 8 Caracteres</li>
                                <li>* Minimo de 1 Caracter Maisculo</li>
                                <li>* Minimo de 1 Caracter Numerico</li>
                                <li>* Minimo de 1 Caracter Especial</li>
                            </ul>
                        </div>

                        <Button onPress={redefinir}>
                            Redefinir Senha
                        </Button>
                    </div>
                </>
            )}
        </main>
    )
}

export default recuperarSenha