
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const communicationOptions = [
  { value: "formale", label: "Formale" },
  { value: "informale", label: "Informale" },
  { value: "cordiale", label: "Cordiale" },
  { value: "amichevole", label: "Amichevole" },
  { value: "diretto", label: "Diretto" },
  { value: "personalizzato", label: "Personalizzato" },
];

interface Props {
  form: any;
  setForm: any;
}
export default function ToneTab({ form, setForm }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tono Comunicazione</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <label className="block text-sm font-medium">Tono comunicazione</label>
          <select
            className="border rounded w-full p-2"
            value={form.communication_style}
            onChange={e => setForm((f: any) => ({
              ...f,
              communication_style: e.target.value,
              custom_communication_style: e.target.value === "personalizzato" ? f.custom_communication_style : ""
            }))}
          >
            {communicationOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        {form.communication_style === "personalizzato" && (
          <div className="mt-2">
            <label className="block text-sm font-medium">Descrivi il tuo stile personalizzato</label>
            <input
              className="input border rounded w-full p-2"
              value={form.custom_communication_style}
              required
              onChange={e => setForm((f: any) => ({ ...f, custom_communication_style: e.target.value }))}
              maxLength={120}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
