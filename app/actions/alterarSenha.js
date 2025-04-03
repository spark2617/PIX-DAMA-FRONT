// 'use client'

// import { createClient } from "@/utils/supabase/client"


// async function alterarSenha(email, id) {
//   const supabase = createClient()


//   const { error } = await supabase
//     .from('dados_usuarios')
//     .update({ alterando_senha: Boolean(true) })
//     .eq('id_usuario', id)
//     .select()

//   if(error){
//     const error = 'Ocorreu um erro inesperado, tente novamente mais tarde'
//     return error
//   }else {
//     await supabase.auth.resetPasswordForEmail(email, {
//       redirectTo: process.env.NEXT_PUBLIC_URL_ALTERACAO_SENHA,
//     })
//   }

 
// }

// export default alterarSenha