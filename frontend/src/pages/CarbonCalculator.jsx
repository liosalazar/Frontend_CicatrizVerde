// src/pages/CarbonCalculator.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Calculator, Zap, Droplets, Car, Trash2, Save 
} from "lucide-react";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip 
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "../api/apiClient"; 

const CarbonCalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loadingSave, setLoadingSave] = useState(false);

  const [formData, setFormData] = useState({
    energy: "",
    water: "",
    transport: "",
    waste: ""
  });
  const [results, setResults] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateFootprint = () => {
    const energy = parseFloat(formData.energy) || 0;
    const water = parseFloat(formData.water) || 0;
    const transport = parseFloat(formData.transport) || 0;
    const waste = parseFloat(formData.waste) || 0;

    const energyEmissions = energy * 0.5;
    const waterEmissions = water * 0.001;
    const transportEmissions = transport * 0.21;
    const wasteEmissions = waste * 0.5;
    const total = energyEmissions + waterEmissions + transportEmissions + wasteEmissions;

    const pieData = [
      { name: "Energía", value: energyEmissions, color: "#10b981" },
      { name: "Agua", value: waterEmissions, color: "#3b82f6" },
      { name: "Transporte", value: transportEmissions, color: "#f59e0b" },
      { name: "Residuos", value: wasteEmissions, color: "#ef4444" }
    ];

    const barData = [
      { category: "Energía", emissions: energyEmissions },
      { category: "Agua", emissions: waterEmissions },
      { category: "Transp.", emissions: transportEmissions },
      { category: "Resid.", emissions: wasteEmissions }
    ];

    setResults({ total, pieData, barData });
  };

  const saveData = async () => {
    if (!results) return;
    setLoadingSave(true);
    try {
      await apiClient("/api/measurements/save", {
        method: "POST",
        body: {
          energy: formData.energy || 0,
          water: formData.water || 0,
          transport: formData.transport || 0,
          waste: formData.waste || 0,
          total: results.total
        },
      });

      toast({
        title: "¡Guardado! 💾",
        description: "Esta medición se ha añadido a tu historial.",
      });
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al guardar",
        description: error.message || "No se pudo conectar con el servidor.",
      });
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver
          </Button>
          <Calculator className="h-6 w-6 text-emerald-600 mr-2" />
          <h1 className="text-xl font-bold">Calculadora de Huella de Carbono</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <Card>
            <CardHeader>
              <CardTitle>Datos de Consumo</CardTitle>
              <CardDescription>Ingresa tus consumos mensuales.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Zap className="h-4 w-4 text-emerald-500"/> Energía (kWh)</Label>
                <Input type="number" placeholder="0" value={formData.energy} onChange={(e)=>handleInputChange("energy", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Droplets className="h-4 w-4 text-blue-500"/> Agua (m³)</Label>
                <Input type="number" placeholder="0" value={formData.water} onChange={(e)=>handleInputChange("water", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Car className="h-4 w-4 text-orange-500"/> Transporte (km)</Label>
                <Input type="number" placeholder="0" value={formData.transport} onChange={(e)=>handleInputChange("transport", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Trash2 className="h-4 w-4 text-red-500"/> Residuos (kg)</Label>
                <Input type="number" placeholder="0" value={formData.waste} onChange={(e)=>handleInputChange("waste", e.target.value)} />
              </div>
              <Button onClick={calculateFootprint} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Calcular Huella
              </Button>
            </CardContent>
          </Card>

          {/* Resultados y Gráficos */}
          {results && (
            <Card>
              <CardHeader>
                <CardTitle>Tu Impacto: {results.total.toFixed(2)} tCO₂</CardTitle>
                <CardDescription>Distribución de tus emisiones.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={results.pieData} innerRadius={60} outerRadius={80} dataKey="value">
                        {results.pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={(val) => `${val.toFixed(2)} tCO₂`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results.barData}>
                      <XAxis dataKey="category" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip formatter={(val) => `${val.toFixed(2)} tCO₂`} />
                      <Bar dataKey="emissions" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <Button onClick={saveData} disabled={loadingSave} variant="secondary" className="w-full gap-2">
                  {loadingSave ? "Guardando..." : <><Save size={18} /> Guardar en Historial</>}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default CarbonCalculator;