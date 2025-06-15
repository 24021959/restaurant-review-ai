
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BusinessProfileTab from "./settings/BusinessProfileTab";
import ToneTab from "./settings/ToneTab";
import KnowledgeTab from "./settings/KnowledgeTab";

export default function BusinessProfileManager() {
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<any>({
    business_name: "",
    business_description: "",
    website: "",
    phone: "",
    address: "",
    communication_style: "formale",
    custom_communication_style: "",
  });
  const [website, setWebsite] = useState('');
  const [extractedTexts, setExtractedTexts] = useState<string[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("business_profiles")
        .select("*")
        .maybeSingle();
      if (data) {
        setProfile(data);
        setForm({
          business_name: data.business_name,
          business_description: data.business_description || "",
          website: data.website || "",
          phone: data.phone || "",
          address: data.address || "",
          communication_style: data.communication_style || "formale",
          custom_communication_style: data.custom_communication_style || "",
        });
        setWebsite(data.website || "");
        const { data: docs } = await supabase
          .from("business_documents")
          .select("*")
          .eq("business_profile_id", data.id);
        setDocuments(docs || []);
      }
      setLoading(false);
    })();
  }, []);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    let res;
    if (!profile) {
      res = await supabase
        .from("business_profiles")
        .insert(form)
        .select()
        .single();
    } else {
      res = await supabase
        .from("business_profiles")
        .update(form)
        .eq("id", profile.id)
        .select()
        .single();
    }
    if (res.data) {
      setProfile(res.data);
      setEdit(false);
    }
    setLoading(false);
  }

  async function handleAddDocument(title: string, content: string) {
    if (!profile) return alert("Prima compila il profilo attività");
    const { data } = await supabase
      .from("business_documents")
      .insert({
        business_profile_id: profile.id,
        title,
        content,
        type: "faq",
      })
      .select()
      .single();
    if (data) setDocuments(docs => [...docs, data]);
  }

  async function handleDeleteDocument(docId: string) {
    await supabase.from("business_documents").delete().eq("id", docId);
    setDocuments(docs => docs.filter(d => d.id !== docId));
  }

  if (loading) return <div className="p-6 text-center">Caricamento…</div>;

  return (
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6 w-full flex">
          <TabsTrigger value="profile" className="flex-1">Profilo Attività</TabsTrigger>
          <TabsTrigger value="tone" className="flex-1">Tono</TabsTrigger>
          <TabsTrigger value="knowledge" className="flex-1">Conoscenza</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <BusinessProfileTab 
            profile={profile}
            form={form}
            setForm={setForm}
            edit={edit}
            setEdit={setEdit}
            onSave={handleSaveProfile}
            loading={loading}
          />
        </TabsContent>
        <TabsContent value="tone">
          <ToneTab form={form} setForm={setForm} />
        </TabsContent>
        <TabsContent value="knowledge">
          <KnowledgeTab
            website={website}
            setWebsite={setWebsite}
            extractedTexts={extractedTexts}
            setExtractedTexts={setExtractedTexts}
            profile={profile}
            documents={documents}
            onAddDocument={handleAddDocument}
            onDeleteDocument={handleDeleteDocument}
          />
        </TabsContent>
      </Tabs>
  );
}
