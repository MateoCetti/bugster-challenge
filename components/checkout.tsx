import { updateUserPlan } from "@/app/actions";
import { useState } from "react";

type CheckoutModalProps = {
    open: boolean;
    onClose: () => void;
};

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
    const [email, setEmail] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>("");
    const [expiry, setExpiry] = useState<string>("");
    const [cvc, setCvc] = useState<string>("");
    const [cardholder, setCardholder] = useState<string>("");
    const [country, setCountry] = useState<string>("Spain");
    const [success, setSuccess] = useState<boolean | null>(null)

    const handlePayment = async () => {
        const response = await updateUserPlan();
        console.log(response)
        if (response.success) onClose();
  }

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-lg font-semibold">Pago Seguro</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
                </div>

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="w-full border rounded-lg px-3 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div>
                        <label className="block text-sm font-medium">Información de la tarjeta</label>
                        <input
                            type="text"
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                            placeholder="1234 1234 1234 1234"
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                        <div className="flex gap-2 mt-2">
                            <input
                                type="text"
                                placeholder="MM/AA"
                                className="w-1/2 border rounded-lg px-3 py-2"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="CVC"
                                className="w-1/2 border rounded-lg px-3 py-2"
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value)}
                            />
                        </div>
                    </div>

                    <input
                        type="text"
                        placeholder="Nombre del titular de la tarjeta"
                        className="w-full border rounded-lg px-3 py-2"
                        value={cardholder}
                        onChange={(e) => setCardholder(e.target.value)}
                    />

                    <select
                        className="w-full border rounded-lg px-3 py-2"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <option value="Spain">Spain</option>
                        <option value="USA">USA</option>
                        <option value="Mexico">Mexico</option>
                    </select>

                    <button onClick={() => handlePayment()} className="w-full bg-blue-600 text-white rounded-lg px-3 py-2 hover:bg-blue-700">
                        Pagar
                    </button>
                </div>
            </div>
        </div>
    );
}
