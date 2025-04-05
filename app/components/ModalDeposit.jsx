import React, { useState } from "react";
import QRCode from "react-qr-code";
import { X, Check } from "@phosphor-icons/react";
import { Input } from "@nextui-org/input";
import { deposit } from "../api/payments/usuario/deposit";

const DepositModal = ({ isOpen, onOpenChange }) => {
    const [amount, setAmount] = useState("");
    const [evmCode, setEvmCode] = useState(null);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

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


    const handleConfirm = async () => {
        if (!amount) {
            setError("Digite um valor válido.");
            return;
        }

        const amountStr = String(amount)
            .replace(/[^\d,]/g, "")
            .replace(",", ".");

        const formattedAmount = parseFloat(amountStr);

        if (isNaN(formattedAmount) || formattedAmount < 5) {
            setError("O valor mínimo para depósito é R$ 5,00.");
            return;
        }
        
        setError("");
        setLoading(true);

        try {
            const data = await deposit(formattedAmount);
            setEvmCode(data.pix);
        } catch (error) {
            setError("Erro ao gerar código PIX. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(evmCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClose = () => {
        setEvmCode(null);
        setAmount("");
        setError("");
        onOpenChange();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={handleClose}>
            <div className="bg-[#141414] p-6 rounded-xl shadow-lg w-96 relative border border-gray-700" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-3 right-3 text-gray-400 hover:text-white" onClick={handleClose}>
                    <X size={20} />
                </button>
                <h2 className="text-xl font-bold text-white">Depósito via PIX</h2>

                {!evmCode ? (
                    <>
                        <Input 
                            className="dark text-white mt-3" 
                            variant="bordered" 
                            label="Valor" 
                            type="text" 
                            placeholder="Digite o valor" 
                            isRequired 
                            value={amount} 
                            onChange={handleInputChange} 
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        
                        <button className="w-full bg-green-600 text-white py-2 mt-4 rounded hover:bg-green-500 flex justify-center items-center" onClick={handleConfirm} disabled={loading}>
                            {loading ? "Carregando..." : "Confirmar"}
                        </button>
                        <button className="w-full text-red-500 py-2 mt-2 rounded hover:text-red-400" onClick={handleClose}>
                            Cancelar
                        </button>
                    </>
                ) : (
                    <div className="text-center mt-4">
                        <QRCode value={evmCode} className="mx-auto bg-white p-2 rounded-lg" />
                        <div className="flex justify-center mt-4">
                            <button onClick={copyToClipboard} className="text-green-400 hover:text-green-300 text-lg flex items-center gap-2">
                                Copia e Cola {copied && <Check size={18} className="text-green-500" />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DepositModal;
