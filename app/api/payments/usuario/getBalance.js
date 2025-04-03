
export const fetchBalance = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/balance-user`, {
        method: "GET",
        credentials: "include", 
    });

    if (!response.ok) {
        return
    }

    const data = await response.json();
    // console.log("Saldo do usuário:", JSON.stringify(data.balance, null, 2));


    return data.balance
};


