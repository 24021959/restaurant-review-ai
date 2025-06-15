import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FirecrawlService } from "@/utils/FirecrawlService";

interface Props {
  website: string;
  setWebsite: (website: string) => void;
  extractedTexts: string[];
  setExtractedTexts: (arr: string[]) => void;
  profile: any;
  documents: any[];
  onAddDocument: (title: string, content: string) => void;
  onDeleteDocument: (id: string) => void;
}

export default function KnowledgeTab({ website, setWebsite, extractedTexts, setExtractedTexts, profile, documents, onAddDocument, onDeleteDocument }: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!website) {
      toast({ title: "Inserisci un indirizzo" });
      return;
    }
    setLoading(true);
    const result = await FirecrawlService.crawlWebsite(website);
    if (result?.success && result.data && result.data.data) {
      // Assuming result.data.data is array with markdown content
      const texts = result.data.data
        .flatMap((item: any) => [item.body_markdown || '', item.body_html || ''])
        .filter((t: string) => t);
      setExtractedTexts(texts.slice(0, 10)); // limit output for UI
      toast({ title: "Estrazione completata", description: `Sono stati estratti ${texts.length} testi.` });
    } else {
      toast({ title: "Errore scraping", description: result?.error || "Errore sconosciuto", variant: "destructive" });
      setExtractedTexts([]);
    }
    setLoading(false);
  };

  const handleDocAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    onAddDocument(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Conoscenza: sito web ufficiale</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex gap-2 mb-2" onSubmit={handleScrape}>
            <Input
              value={website}
              onChange={e => setWebsite(e.target.value)}
              placeholder="https://tuosito.com"
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>{loading ? "Estrazione..." : "Estrai informazioni"}</Button>
          </form>
          {extractedTexts.length > 0 && (
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-xs text-gray-800 mb-1">Testi estratti:</p>
              <ul className="list-disc text-xs ml-4 max-h-32 overflow-y-auto">
                {extractedTexts.map((txt, i) => (
                  <li key={i} className="mb-1">{txt.slice(0, 120)}...</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documenti/FAQ manuali</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col md:flex-row gap-3 mb-4" onSubmit={handleDocAdd}>
            <Input placeholder="Titolo" value={title} onChange={e => setTitle(e.target.value)} className="flex-1" required />
            <Input placeholder="Contenuto FAQ o altro" value={content} onChange={e => setContent(e.target.value)} className="flex-1" required />
            <Button type="submit">Aggiungi</Button>
          </form>
          <ul className="space-y-1">
            {documents.map(doc => (
              <li key={doc.id} className="flex items-center justify-between bg-gray-50 rounded p-2">
                <span className="font-medium">{doc.title}</span>
                <Button variant="ghost" size="sm" onClick={() => onDeleteDocument(doc.id)}>Elimina</Button>
              </li>
            ))}
            {documents.length === 0 && <li className="text-gray-400 text-sm">Nessun documento inserito.</li>}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
