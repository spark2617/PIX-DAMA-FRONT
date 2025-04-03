export const deposit = async (amount) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/cash-in`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount })
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Cash-In realizado com sucesso:", data);

        return data;
    } catch (error) {
        console.error("Erro ao realizar cash-in:", error);
        return null;
    }
};

