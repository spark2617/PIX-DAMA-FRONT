// import { createClient } from "@/utils/supabase/client"

// export const verificarSessao = async () => {

//     const supabase = createClient()

//     let dadosUsuarios = {
//         id: '',
//         nome: '',
//         email: '',
//         administrador: false,
//         totalVitorias: 0,
//         usuarioAutenticado: false,
//         alterandoSenha: false
//     }

//     const formatarNomeUsuario = (nomeCompleto) => {
//         const nomes = nomeCompleto.trim().split(" ");

//         let primeiroNome = nomes[0];

//         primeiroNome = primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1).toLowerCase();

//         return primeiroNome;
//     }

//     const { data, error } = await supabase.auth.getUser()

    
//     let usuarioAdministrador = false

//     if (!error || data.user != null) {
//         let emailUsuario = data.user.email
//         const idUsuario = data.user.id
        
//         let { data: dados_usuarios, error } = await supabase
//             .from('dados_usuarios')
//             .select("*")
//             .eq('id_usuario', data.user.id)

//         if (!error) {
            
//             if (dados_usuarios[0].nivel_usuario && dados_usuarios[0].nivel_usuario == 2) {
//                 usuarioAdministrador = true
//             }

//             dadosUsuarios = {
//                 id: idUsuario,
//                 nome: formatarNomeUsuario(dados_usuarios[0].nome),
//                 email: emailUsuario,
//                 administrador: usuarioAdministrador,
//                 totalVitorias: dados_usuarios[0].numero_vitorias,
//                 usuarioAutenticado: true,
//                 alterandoSenha: dados_usuarios[0].alterando_senha
//             }
//         } 

//         console.error(error)
//     }

//     console.error(error)

//     return dadosUsuarios
// }