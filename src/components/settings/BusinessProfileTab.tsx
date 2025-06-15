import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  profile: any;
  form: any;
  setForm: any;
  edit: boolean;
  setEdit: (edit: boolean) => void;
  onSave: (e: React.FormEvent) => void;
  loading: boolean;
}
export default function BusinessProfileTab({ profile, form, setForm, edit, setEdit, onSave, loading }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profilo Attività</CardTitle>
      </CardHeader>
      <CardContent>
        {(!edit && profile) ? (
          <div className="mb-4 space-y-2">
            <div><b>Nome:</b> {profile.business_name}</div>
            {profile.business_description && <div><b>Descrizione:</b> {profile.business_description}</div>}
            {profile.phone && <div><b>Telefono:</b> {profile.phone}</div>}
            {profile.address && <div><b>Indirizzo:</b> {profile.address}</div>}
            <Button onClick={() => setEdit(true)} className="mt-4">Modifica Profilo</Button>
          </div>
        ) : (
          <form className="space-y-3" onSubmit={onSave}>
            <div>
              <label className="block text-sm font-medium">Nome attività *</label>
              <input className="input border rounded w-full p-2" required value={form.business_name} onChange={e => setForm((f: any) => ({ ...f, business_name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium">Descrizione</label>
              <textarea className="input border rounded w-full p-2" value={form.business_description} onChange={e => setForm((f: any) => ({ ...f, business_description: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium">Telefono</label>
              <input className="input border rounded w-full p-2" value={form.phone} onChange={e => setForm((f: any) => ({ ...f, phone: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium">Indirizzo</label>
              <input className="input border rounded w-full p-2" value={form.address} onChange={e => setForm((f: any) => ({ ...f, address: e.target.value }))} />
            </div>
            <div className="flex gap-2 mt-3">
              <Button type="submit" disabled={loading}>Salva Profilo</Button>
              {profile && <Button variant="outline" type="button" onClick={() => setEdit(false)}>Annulla</Button>}
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
