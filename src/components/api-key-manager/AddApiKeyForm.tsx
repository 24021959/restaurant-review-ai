
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface AddApiKeyFormProps {
  onAddApiKey: (name: string, key: string) => Promise<void>;
  isLoading: boolean;
}

export default function AddApiKeyForm({ onAddApiKey, isLoading }: AddApiKeyFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');

  const handleAddApiKey = async () => {
    if (!newKeyName.trim() || !newKeyValue.trim()) return;
    
    await onAddApiKey(newKeyName, newKeyValue);
    setNewKeyName('');
    setNewKeyValue('');
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="font-medium">Aggiungi Nuova Chiave API</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Nome chiave (es. Google-Key-1)"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
          />
          <Input
            placeholder="Chiave API"
            type="password"
            value={newKeyValue}
            onChange={(e) => setNewKeyValue(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleAddApiKey} 
            disabled={isLoading || !newKeyName.trim() || !newKeyValue.trim()}
          >
            {isLoading ? "Aggiungendo..." : "Aggiungi"}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowForm(false)}
          >
            Annulla
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button onClick={() => setShowForm(true)} className="w-full">
      <Plus className="h-4 w-4 mr-2" />
      Aggiungi Nuova Chiave API
    </Button>
  );
}
