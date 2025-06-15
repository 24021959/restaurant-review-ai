
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ApiKey {
  id: string;
  name: string;
  encrypted_key: string;
  user_id: string;
  is_active: boolean | null;
  daily_limit: number | null;
  total_requests: number | null;
  created_at: string | null;
  updated_at: string | null;
}

const AllApiKeysManager = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [keyName, setKeyName] = useState("");
  const [keyValue, setKeyValue] = useState("");
  const { toast } = useToast();

  const fetchAllKeys = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("google_api_keys").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setApiKeys(data || []);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare le chiavi API",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllKeys();
  }, []);

  const handleAddKey = async () => {
    if (!keyName.trim() || !keyValue.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("google_api_keys").insert({
        name: keyName,
        encrypted_key: keyValue,
        is_active: true,
        daily_limit: 10000,
        user_id: "admin",
      });
      if (error) throw error;
      setKeyName("");
      setKeyValue("");
      fetchAllKeys();
      toast({
        title: "Successo",
        description: "Chiave API aggiunta",
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile aggiungere la chiave API",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleDeleteKey = async (id: string) => {
    if (!confirm("Vuoi eliminare questa chiave API?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("google_api_keys").delete().eq("id", id);
      if (error) throw error;
      fetchAllKeys();
      toast({
        title: "Eliminata",
        description: "Chiave API eliminata.",
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile eliminare la chiave API",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const filteredKeys = apiKeys.filter(
    (k) =>
      k.name.toLowerCase().includes(filter.toLowerCase()) ||
      k.encrypted_key.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestione API keys globale</CardTitle>
        <CardDescription>Visualizza, aggiungi ed elimina tutte le chiavi API di tutti gli utenti.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Input placeholder="Filtra per nome o chiave..." value={filter} onChange={(e) => setFilter(e.target.value)} />
          <Button size="sm" variant="outline" onClick={fetchAllKeys}><Filter className="h-4 w-4" /> Aggiorna</Button>
        </div>
        <form onSubmit={e => { e.preventDefault(); handleAddKey(); }} className="flex gap-2 mb-4">
          <Input placeholder="Nome chiave" value={keyName} onChange={(e) => setKeyName(e.target.value)} />
          <Input placeholder="Valore chiave (API key)" value={keyValue} onChange={(e) => setKeyValue(e.target.value)} />
          <Button type="submit" size="sm" disabled={loading}> <Plus className="h-4 w-4" />Aggiungi</Button>
        </form>
        <div className="rounded border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Chiave (inizio)</TableHead>
                <TableHead>Utente</TableHead>
                <TableHead>Attiva</TableHead>
                <TableHead>Limite giornaliero</TableHead>
                <TableHead>Totale richieste</TableHead>
                <TableHead>Data creazione</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKeys.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-400">Nessuna chiave trovata</TableCell>
                </TableRow>
              ) : (
                filteredKeys.map((k) => (
                  <TableRow key={k.id}>
                    <TableCell>{k.name}</TableCell>
                    <TableCell><span className="font-mono">{k.encrypted_key?.slice(0, 8) ?? ""}...</span></TableCell>
                    <TableCell><Badge variant="secondary">{k.user_id}</Badge></TableCell>
                    <TableCell>{k.is_active ? "Si" : "No"}</TableCell>
                    <TableCell>{k.daily_limit ?? "-"}</TableCell>
                    <TableCell>{k.total_requests ?? "-"}</TableCell>
                    <TableCell>{k.created_at ? new Date(k.created_at).toLocaleString("it-IT") : "-"}</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteKey(k.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AllApiKeysManager;
