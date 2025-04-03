'use client'


export async function entrar(email, senha) {
    const supabase = createClient()
    
    let sucessoLogin = false
    let resposta = {}
    
    const data = {
      email: email,
      password: senha
    }

  
    const { error } = await supabase.auth.signInWithPassword(data)
  
    if (error) {
      sucessoLogin = false 
      console.log(error)
      resposta = {
        sucessoLogin,
        mensagem: "Email ou senha Incorretos"
      }
    } else {
      sucessoLogin = true 

      resposta = {
        sucessoLogin,
        mensagem: 'Login Realizado com sucesso'
      }
    }

    return resposta
    
}