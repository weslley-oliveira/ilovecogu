import { useState } from "react";

export type NewCustomerInput = {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  address: { street: string; city: string; state: string; zipCode: string };
};

type Props = {
  show: boolean;
  onClose: () => void;
  onSave: (data: NewCustomerInput) => Promise<void> | void;
  title?: string;
};

export default function CustomerCreateModal({ show, onClose, onSave, title = "Novo Cliente" }: Props) {
  const [form, setForm] = useState<NewCustomerInput>({
    firstName: "", lastName: "", email: "", phone: "",
    address: { street: "", city: "", state: "", zipCode: "" }
  });

  if (!show) return null;

  const set = <K extends keyof NewCustomerInput>(k: K, v: any) =>
    setForm(f => ({ ...f, [k]: v }));
  const setAddr = <K extends keyof NewCustomerInput["address"]>(k: K, v: any) =>
    setForm(f => ({ ...f, address: { ...f.address, [k]: v } }));

  async function handleSave() {
    if (!form.firstName || !form.lastName || !form.phone) return;
    await onSave(form);
    onClose();
    setForm({
      firstName: "", lastName: "", email: "", phone: "",
      address: { street: "", city: "", state: "", zipCode: "" }
    });
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={onClose} className="px-2 py-1 rounded hover:bg-gray-100">✕</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Nome</label>
              <input className="w-full rounded border px-3 py-2"
                value={form.firstName} onChange={e => set("firstName", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Sobrenome</label>
              <input className="w-full rounded border px-3 py-2"
                value={form.lastName} onChange={e => set("lastName", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">E-mail</label>
              <input type="email" className="w-full rounded border px-3 py-2"
                value={form.email} onChange={e => set("email", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Telefone</label>
              <input className="w-full rounded border px-3 py-2" inputMode="tel"
                value={form.phone} onChange={e => set("phone", e.target.value)} />
            </div>
          </div>

          <fieldset className="mt-4 border rounded-xl p-4">
            <legend className="px-2 text-sm text-gray-600">Endereço</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="w-full rounded border px-3 py-2 md:col-span-2" placeholder="Rua"
                value={form.address.street} onChange={e => setAddr("street", e.target.value)} />
              <input className="w-full rounded border px-3 py-2" placeholder="Cidade"
                value={form.address.city} onChange={e => setAddr("city", e.target.value)} />
              <input className="w-full rounded border px-3 py-2" placeholder="Estado"
                value={form.address.state} onChange={e => setAddr("state", e.target.value)} />
              <input className="w-full rounded border px-3 py-2" placeholder="CEP" inputMode="numeric"
                value={form.address.zipCode} onChange={e => setAddr("zipCode", e.target.value)} />
            </div>
          </fieldset>

          <div className="mt-6 flex justify-end gap-2">
            <button className="px-4 py-2 rounded border" onClick={onClose}>Cancelar</button>
            <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={handleSave}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
