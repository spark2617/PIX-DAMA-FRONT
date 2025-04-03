'use client'

export async function signUp(name, email, password, cpf, birthdate, aceitou_termos, confirmou_dados, confirmou_idade) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                cpf,
                birthdate,
                aceitou_termos,
                confirmou_dados,
                confirmou_idade,
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(data)
        }

        if (data.success === false) {
            if (data.message.includes(`duplicate key value violates unique constraint "user_cpf_key"`)) {
                return {
                    sucesso: false,
                    mensagem: "CPF já cadastrado"
                };
            } else if (data.message.includes("email informado")) {
                return {
                    sucesso: false,
                    mensagem: "Foi encontrado uma conta com o email informado"
                };
            } else {
                return {
                    sucesso: false,
                    mensagem: data.message
                };
            }
        }

        return {
            sucesso: true,
            mensagem: "Usuário cadastrado com sucesso"
        };

    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return {
            sucesso: false,
            mensagem: "Erro de conexão! Verifique sua internet ou tente novamente mais tarde."
        };
    }
}
