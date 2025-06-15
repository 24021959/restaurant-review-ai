
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type BusinessProfile = {
  id: string;
  business_name: string;
  business_description: string;
  website: string;
  phone: string;
  address: string;
  communication_style: string;
};

type BusinessDocument = {
  id: string;
  title: string;
  content: string;
  type: string;
};

const communicationOptions = [
  { value: "formale", label: "Formale" },
  { value: "informale", label: "Informale" },
  { value: "personalizzato", label: "Personalizzato" },
];

export default function BusinessProfileManager() {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<Omit<BusinessProfile, "id">>({
    business_name: "",
    business_description: "",
    website: "",
    phone: "",
    address: "",
    communication_style: "formale",
  });

  // --- Documenti FAQ
  const [documents, setDocuments] = useState<BusinessDocument[]>([]);
  const [docForm, setDocForm] = useState<{title: string; content: string}>({title: "", content: ""});
  const [docLoading, setDocLoading] = useState(false);

  // Fetch profilo aziendale
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("business_profiles")
        .select("*")
        .single();
      if (data) {
        setProfile(data);
        setForm({
          business_name: data.business_name,
          business_description: data.business_description || "",
          website: data.website || "",
          phone: data.phone || "",
          address: data.address || "",
          communication_style: data.communication_style || "formale",
        });
        // Carica documenti
        const { data: docs } = await supabase
          .from("business_documents")
          .select("*")
          .eq("business_profile_id", data.id);
        setDocuments(docs || []);
      }
      setLoading(false);
    })();
  }, []);

  // Salva/aggiorna profilo
  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    let res;
    if (profile) {
      res = await supabase
        .from("business_profiles")
        .update(form)
        .eq("id", profile.id)
        .select()
        .single();
    } else {
      res = await supabase
        .from("business_profiles")
        .insert({ ...form })
        .select()
        .single();
    }
    if (res.data) {
      setProfile(res.data);
      setEdit(false);
    }
    setLoading(false);
  }

  // Gestione documenti FAQ
  async function handleAddDocument(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return alert("Prima compila il profilo attività");
    setDocLoading(true);
    const { data, error } = await supabase
      .from("business_documents")
      .insert({
        business_profile_id: profile.id,
        title: docForm.title,
        content: docForm.content,
        type: "faq",
      })
      .select()
      .single();
    if (data) {
      setDocuments((docs) => [...docs, data]);
      setDocForm({ title: "", content: "" });
    }
    setDocLoading(false);
  }

  async function handleDeleteDocument(docId: string) {
    await supabase.from("business_documents").delete().eq("id", docId);
    setDocuments((docs) => docs.filter((d) => d.id !== docId));
  }

  if (loading) return <div className="p-6 text-center">Caricamento…</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Profilo Attività</CardTitle>
        </CardHeader>
        <CardContent>
          {(!edit && profile) ? (
            <div className="mb-4 space-y-2">
              <div><b>Nome:</b> {profile.business_name}</div>
              {profile.business_description && <div><b>Descrizione:</b> {profile.business_description}</div>}
              {profile.website && <div><b>Sito:</b> {profile.website}</div>}
              {profile.phone && <div><b>Telefono:</b> {profile.phone}</div>}
              {profile.address && <div><b>Indirizzo:</b> {profile.address}</div>}
              <div><b>Tono comunicazione:</b> {profile.communication_style || "formale"}</div>
              <Button onClick={() => setEdit(true)} className="mt-4">Modifica Profilo</Button>
            </div>
          ) : (
            <form className="space-y-3" onSubmit={handleSaveProfile}>
              <div>
                <label className="block text-sm font-medium">Nome attività *</label>
                <input
                  className="input border rounded w-full p-2"
                  required
                  value={form.business_name}
                  onChange={e => setForm(f => ({...f, business_name: e.target.value}))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Descrizione</label>
                <textarea
                  className="input border rounded w-full p-2"
                  value={form.business_description}
                  onChange={e => setForm(f => ({...f, business_description: e.target.value}))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Sito web</label>
                <input
                  className="input border rounded w-full p-2"
                  value={form.website}
                  onChange={e => setForm(f => ({...f, website: e.target.value}))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Telefono</label>
                <input
                  className="input border rounded w-full p-2"
                  value={form.phone}
                  onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Indirizzo</label>
                <input
                  className="input border rounded w-full p-2"
                  value={form.address}
                  onChange={e => setForm(f => ({...f, address: e.target.value}))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Tono comunicazione</label>
                <select
                  className="border rounded w-full p-2"
                  value={form.communication_style}
                  onChange={e => setForm(f => ({...f, communication_style: e.target.value}))}
                >
                  {communicationOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 mt-3">
                <Button type="submit" disabled={loading}>Salva Profilo</Button>
                {profile && (
                  <Button variant="outline" type="button" onClick={() => setEdit(false)}>Annulla</Button>
                )}
              </div>
            </form>
          )}

          <hr className="my-6" />
          {/* Gestione documenti/FAQ */}
          <div>
            <h4 className="font-semibold mb-2">Documenti/FAQ dell'attività</h4>
            <form className="flex flex-col md:flex-row gap-3 mb-4" onSubmit={handleAddDocument}>
              <input
                className="input border rounded p-2 flex-1"
                placeholder="Titolo"
                required
                value={docForm.title}
                onChange={e => setDocForm(f => ({...f, title: e.target.value}))}
              />
              <input
                className="input border rounded p-2 flex-1"
                placeholder="Contenuto FAQ o altro"
                required
                value={docForm.content}
                onChange={e => setDocForm(f => ({...f, content: e.target.value}))}
              />
              <Button type="submit" disabled={docLoading}>Aggiungi</Button>
            </form>
            <ul className="space-y-1">
              {documents.map(doc => (
                <li key={doc.id} className="flex items-center justify-between bg-gray-50 rounded p-2">
                  <span className="font-medium">{doc.title}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteDocument(doc.id)}>Elimina</Button>
                </li>
              ))}
              {documents.length === 0 && <li className="text-gray-400 text-sm">Nessun documento inserito.</li>}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
