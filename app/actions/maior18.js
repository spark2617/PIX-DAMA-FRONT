export const maior18 = (dataNascimento) => {
    const { day, month, year } = dataNascimento;
    const today = new Date();
    const dataNascimentoObj = new Date(year, month - 1, day); 
    let age = today.getFullYear() - dataNascimentoObj.getFullYear();
    const monthDiff = today.getMonth() - dataNascimentoObj.getMonth();
  
    // Verifica se o mês ainda não passou ou se estamos no mesmo mês mas o dia ainda não chegou
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dataNascimentoObj.getDate())) {
      age--;
    }
  
    return age >= 18;
  };