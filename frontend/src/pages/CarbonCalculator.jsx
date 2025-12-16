import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Calculator, Zap, Droplets, Car, Trash2, Save 
} from "lucide-react";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip 
} from "recharts";

// Componentes de UI (Shadcn)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "../api/apiClient"; 

// Estilos personalizados
import "../styles/CarbonCalculator.css";

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

    // Factores de conversión
    const energyEmissions = energy * 0.5;
    const waterEmissions = water * 0.001;
    const transportEmissions = transport * 0.21;
    const wasteEmissions = waste * 0.5;
    const total = energyEmissions + waterEmissions + transportEmissions + wasteEmissions;

    const pieData = [
      { name: "Energía", value: energyEmissions, color: "#2ecc71" },
      { name: "Agua", value: waterEmissions, color: "#3498db" },
      { name: "Transporte", value: transportEmissions, color: "#f39c12" },
      { name: "Residuos", value: wasteEmissions, color: "#e74c3c" }
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
    <div className="carbon-page">
      <div className="calc-container">
        {/* Botón Volver con clase CSS personalizada */}
        <button onClick={() => navigate("/dashboard")} className="btn-back">
          <ArrowLeft size={18} /> Volver al Dashboard
        </button>

        <main className="calc-grid">
          {/* --- FORMULARIO --- */}
          <Card className="calc-card">
            <CardHeader className="card-header">
              <CardTitle className="card-title">
                <Calculator size={24} color="#2ecc71" /> Datos de Consumo
              </CardTitle>
              <CardDescription className="card-desc">
                Ingresa tus consumos mensuales para calcular tu huella.
              </CardDescription>
            </CardHeader>
            <CardContent className="card-content">
              <div className="input-group">
                <Label className="input-label"><Zap size={16} color="#f1c40f" /> Energía (kWh)</Label>
                <Input 
                  type="number" 
                  className="calc-input" 
                  placeholder="Ej: 150" 
                  value={formData.energy} 
                  onChange={(e) => handleInputChange("energy", e.target.value)} 
                />
              </div>
              <div className="input-group">
                <Label className="input-label"><Droplets size={16} color="#3498db" /> Agua (m³)</Label>
                <Input 
                  type="number" 
                  className="calc-input" 
                  placeholder="Ej: 20" 
                  value={formData.water} 
                  onChange={(e) => handleInputChange("water", e.target.value)} 
                />
              </div>
              <div className="input-group">
                <Label className="input-label"><Car size={16} color="#e67e22" /> Transporte (km)</Label>
                <Input 
                  type="number" 
                  className="calc-input" 
                  placeholder="Ej: 500" 
                  value={formData.transport} 
                  onChange={(e) => handleInputChange("transport", e.target.value)} 
                />
              </div>
              <div className="input-group">
                <Label className="input-label"><Trash2 size={16} color="#e74c3c" /> Residuos (kg)</Label>
                <Input 
                  type="number" 
                  className="calc-input" 
                  placeholder="Ej: 15" 
                  value={formData.waste} 
                  onChange={(e) => handleInputChange("waste", e.target.value)} 
                />
              </div>
              <Button onClick={calculateFootprint} className="btn-calculate">
                Calcular Huella
              </Button>
            </CardContent>
          </Card>

          {/* --- RESULTADOS --- */}
          {results && (
            <Card className="calc-card">
              <CardHeader className="card-header">
                <CardTitle className="card-title text-emerald-600">Resultados</CardTitle>
                <CardDescription className="card-desc">
                  Tu impacto ambiental estimado este mes.
                </CardDescription>
              </CardHeader>
              <CardContent className="card-content">
                <div className="result-box">
                  <div className="result-number">{results.total.toFixed(2)}</div>
                  <p className="result-label">tCO₂ totales mensuales</p>
                </div>

                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={results.pieData} innerRadius={60} outerRadius={80} dataKey="value">
                        {results.pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val) => [`${val.toFixed(2)} tCO₂`, "Impacto"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results.barData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="category" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip formatter={(val) => `${val.toFixed(2)} tCO₂`} />
                      <Bar dataKey="emissions" fill="#2ecc71" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="recommendation-box mb-4">
                  <strong>💡 Recomendación:</strong>{" "}
                  {results.total > 1 
                    ? "Tus emisiones son altas. Intenta reducir el consumo de energía y optimizar tus viajes." 
                    : "¡Buen trabajo! Tu huella está por debajo del promedio. Sigue así."}
                </div>

                <Button 
                  onClick={saveData} 
                  disabled={loadingSave} 
                  className="btn-calculate" 
                  style={{ backgroundColor: '#34495e' }}
                >
                  {loadingSave ? "Guardando..." : <><Save size={18} className="mr-2" /> Guardar en Historial</>}
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default CarbonCalculator;