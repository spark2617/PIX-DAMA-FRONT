'use client'

export const fetchUserTransactions = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/history-transactios`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include" 
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        // console.log("Transações do usuário:", data);
        return data;
    } catch (error) {
        console.error("Erro ao buscar transações:", error);
        return null;
    }
};
