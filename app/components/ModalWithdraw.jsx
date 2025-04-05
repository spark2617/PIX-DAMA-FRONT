import React, { useState } from "react";
import { X, Check } from "@phosphor-icons/react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { fetchCashOut } from "../api/payments/usuario/withdraw";
import { useAppContext } from "../context/appContext";

const CashOutModal = ({ isOpen, onOpenChange }) => {
    const [amount, setAmount] = useState("");
    const [pixKey, setPixKey] = useState("");
    const [pixType, setPixType] = useState("CPF");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const {balance, setBalance} = useAppContext()

    const formatCurrency = (value) => {
        const numericValue = value.replace(/[^0-9]/g, "");
        const formattedValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
        return formattedValue;
    };

    const handleInputChange = (e) => {
        setAmount(formatCurrency(e.target.value));
        setError("");
    };

    const handleCashOut = async () => {
        setError(""); 
        setSuccess(false); 
    
        if (!amount.trim() || !pixKey.trim() || !pixType.trim()) {
            setError("Preencha todos os campos.");
            return;
        }
    
        const amountStr = amount.replace(/[^\d,]/g, "").replace(",", ".");
        const formattedAmount = parseFloat(amountStr);

        const balanceStr = balance.replace(/[^\d,]/g, "").replace(",", ".");
        const formattedbalance = parseFloat(balanceStr);
    
        if (isNaN(formattedAmount) || formattedAmount < 5) {
            setError("O valor mínimo para saque é R$ 5,00.");
            return;
        }
        
        console.log(formattedAmount, formattedbalance)
        if (formattedAmount > formattedbalance) {
            setError("Saldo insuficiente para o saque.");
            return;
        }
    
        setLoading(true);
    
        try {
            const response = await fetchCashOut(pixKey, pixType, formattedAmount);
    
            if (!response?.error) {
                setSuccess(true);
                setBalance((prevBalance) => prevBalance - formattedAmount); // Atualiza o saldo
            } else {
                setError(response?.error || "Erro ao processar saque. Tente novamente.");
            }
    
        } catch (error) {
            console.error("Erro ao conectar com o servidor:", error);
            setError("Erro ao conectar com o servidor. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };
    
    

    const handleClose = () => {
        setAmount("");
        setPixKey("");
        setPixType("CPF");
        setError("");
        setSuccess(false);
        onOpenChange();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={handleClose}>
            <div className="bg-[#141414] p-6 rounded-xl shadow-lg w-96 relative border border-gray-700" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-3 right-3 text-gray-400 hover:text-white" onClick={handleClose}>
                    <X size={20} />
                </button>
                <h2 className="text-xl font-bold text-white">Saque via PIX</h2>

                {!success ? (
                    <>
                        <Input className="dark text-white mt-3" variant="bordered" label="Valor" type="text" placeholder="Digite o valor" value={amount} onChange={handleInputChange} />
                        <Select
                            className="dark text-white mt-3"
                            variant="bordered"
                            label="Tipo de Chave PIX"
                            selectedKeys={[pixType]}
                            onChange={(e) => setPixType(e.target.value)}
                        >
                            <SelectItem key="CPF">CPF</SelectItem>
                            <SelectItem key="CNPJ">CNPJ</SelectItem>
                            <SelectItem key="PHONE">Telefone</SelectItem>
                            <SelectItem key="EMAIL">E-mail</SelectItem>
                            <SelectItem key="RANDOM">Chave Aleatória</SelectItem>
                        </Select>
                        <Input className="dark text-white mt-3" variant="bordered" label="Chave PIX" type="text" placeholder="Digite sua chave PIX" value={pixKey} onChange={(e) => setPixKey(e.target.value)} />
                        
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        
                        <button className="w-full bg-green-600 text-white py-2 mt-4 rounded hover:bg-green-500 flex justify-center items-center" onClick={handleCashOut} disabled={loading}>
                            {loading ? "Processando..." : "Confirmar Saque"}
                        </button>
                        <button className="w-full text-red-500 py-2 mt-2 rounded hover:text-red-400" onClick={handleClose}>
                            Cancelar
                        </button>
                    </>
                ) : (
                    <div className="text-center mt-4">
                        <Check size={40} className="text-green-500 mx-auto" />
                        <p className="text-white mt-2">Saque solicitado com sucesso!</p>
                        <button className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-500" onClick={handleClose}>
                            Fechar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CashOutModal;
