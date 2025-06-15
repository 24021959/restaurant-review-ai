
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Database, Mail, Shield, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SystemSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: 'RistoReply',
    supportEmail: 'support@ristoreply.com',
    maxApiKeys: 5,
    trialDays: 15,
    enableRegistration: true,
    enableEmailNotifications: true,
    maintenanceMode: false,
    maintenanceMessage: 'Il sistema è temporaneamente in manutenzione. Riprova più tardi.'
  });

  const handleSave = () => {
    // In una implementazione reale, qui salveresti le impostazioni nel database
    toast({
      title: "Impostazioni salvate",
      description: "Le impostazioni di sistema sono state aggiornate con successo."
    });
  };

  const handleInputChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Impostazioni Generali
          </CardTitle>
          <CardDescription>
            Configurazioni base della piattaforma
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Nome del Sito</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Email di Supporto</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleInputChange('supportEmail', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Limiti e Quota
          </CardTitle>
          <CardDescription>
            Gestisci i limiti di utilizzo della piattaforma
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxApiKeys">Massimo Chiavi API per Utente</Label>
              <Input
                id="maxApiKeys"
                type="number"
                value={settings.maxApiKeys}
                onChange={(e) => handleInputChange('maxApiKeys', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trialDays">Giorni di Prova Gratuita</Label>
              <Input
                id="trialDays"
                type="number"
                value={settings.trialDays}
                onChange={(e) => handleInputChange('trialDays', parseInt(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Sicurezza e Accesso
          </CardTitle>
          <CardDescription>
            Configurazioni di sicurezza e accesso
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Abilita Registrazioni</Label>
              <p className="text-sm text-gray-500">
                Permetti a nuovi utenti di registrarsi alla piattaforma
              </p>
            </div>
            <Switch
              checked={settings.enableRegistration}
              onCheckedChange={(checked) => handleInputChange('enableRegistration', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Modalità Manutenzione</Label>
              <p className="text-sm text-gray-500">
                Disabilita l'accesso alla piattaforma per manutenzione
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
            />
          </div>

          {settings.maintenanceMode && (
            <div className="space-y-2">
              <Label htmlFor="maintenanceMessage">Messaggio di Manutenzione</Label>
              <Textarea
                id="maintenanceMessage"
                value={settings.maintenanceMessage}
                onChange={(e) => handleInputChange('maintenanceMessage', e.target.value)}
                rows={3}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Notifiche Email
          </CardTitle>
          <CardDescription>
            Configurazioni per le notifiche via email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Abilita Notifiche Email</Label>
              <p className="text-sm text-gray-500">
                Invia notifiche automatiche via email agli utenti
              </p>
            </div>
            <Switch
              checked={settings.enableEmailNotifications}
              onCheckedChange={(checked) => handleInputChange('enableEmailNotifications', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Salva Impostazioni
        </Button>
      </div>
    </div>
  );
}
