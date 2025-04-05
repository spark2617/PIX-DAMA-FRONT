export async function getQuantMatchAfterDeposit() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/quant-match-after-deposit`, {
        method: 'GET',
        credentials: 'include', 
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao buscar dados');
      }
  
      const data = await response.json();
      console.log('quant_match_after_deposit:', data.quant_match_after_deposit);
      return data.quant_match_after_deposit;
  
    } catch (err) {
      console.error('Erro:', err.message);
      return null;
    }
  }
  