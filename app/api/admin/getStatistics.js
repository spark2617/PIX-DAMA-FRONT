export async function fetchStatistics() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-statistics`, {
            method: "GET",
            credentials: "include"
        });
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        console.log('Estatísticas recebidas:', data);

        return data;
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        return null;
    }
}
