export const fetchCashOut = async (pixKey, pixType, amount) => {
    try {
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/cash-out`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ pix_key: pixKey, pix_type: pixType, amount }),
        });

        const data = await response.json();
        
        return data
    } catch (error) {
        console.error("Erro ao processar o saque:", error);
        return { success: false, error: error.message };
    }
};
