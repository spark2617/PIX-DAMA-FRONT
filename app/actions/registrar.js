'use client'

import { createClient } from "@/utils/supabase/client"

export async function cadastro(nome, email, senha, CPF, dataFormatada, confirmaOsTermos, confirmaPreencherCorretamente, confirmaSerMaiorDeIdade) {
  const supabase = createClient()

  let sucessoCadastro = false
  let resposta = {}

  const data = {
    email: email,
    password: senha
  }

  const apenasNumero = CPF.replace(/\D/g, '');
  const CPF_Formatado = parseInt(apenasNumero, 10);

  let { data: dadosCPF } = await supabase
    .from('dados_usuarios')
    .select("*")
    .eq('CPF', CPF_Formatado)

   

  if (dadosCPF.length != 0) {
    sucessoCadastro = false
    resposta = {
      sucessoCadastro,
      mensagem: 'CPF já cadastrado'
    }
  } else {
    const { error } = await supabase.auth.signUp(data)

    if (error) {
      sucessoCadastro = false
      resposta = {
        sucessoCadastro,
        mensagem: 'Foi encontrado uma conta com o email informado'
      }
    } else {
      const { data: user } = await supabase.auth.getUser()
      const userId = user.user.id;

      const { error } = await supabase
        .from('dados_usuarios')
        .insert([{ id_usuario: userId, nome: nome, email: email, data_nascimento: dataFormatada, CPF: CPF_Formatado, aceitou_termos: confirmaOsTermos, confirmou_idade: confirmaSerMaiorDeIdade, confirmou_dados: confirmaPreencherCorretamente }])

      if (error) {
        sucessoCadastro = false
        resposta = {
          sucessoCadastro,
          mensagem: 'Erro desconhecido! Reinicie a pagina e tente novamente ou contate o suporte'
        }
      } else {
        sucessoCadastro = true
        resposta = {
          sucessoCadastro,
          mensagem: 'Usuario Cadastrado com sucesso'
        }
      }
    }
  }

  return resposta

}