// src/pages/CarbonCalculator.jsx
import { useState } from "react";
import "../styles/CarbonCalculator.css"; 
import { useToast } from "@/hooks/use-toast"; // <--- IMPORTANTE: Usamos Toasts
import { useUser } from "../context/UserContext"; // Para saber si está logueado (opcional)

import { ArrowLeft, Calculator, Zap, Droplets, Car, Trash2, Save } from "lucide-react"; // Añadí icono Save
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const CarbonCalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loadingSave, setLoadingSave] = useState(false); // Estado de carga para guardar

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

  // --- LÓGICA DE CÁLCULO (IGUAL QUE ANTES) ---
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
      { name: "Energía", value: energyEmissions, color: "#2ecc71" },
      { name: "Agua", value: waterEmissions, color: "#3498db" },
      { name: "Transporte", value: transportEmissions, color: "#f39c12" },
      { name: "Residuos", value: wasteEmissions, color: "#e74c3c" }
    ];

    setResults({ total, pieData });
    
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
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
        className: "bg-green-600 text-white border-none",
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
        <button onClick={() => navigate("/servicios")} className="btn-back">
           <ArrowLeft size={18} style={{marginRight: '8px'}} /> Volver a Servicios
        </button>

        <main className="calc-grid">
          
          {/* --- FORMULARIO --- */}
          <div className="calc-card">
            <div className="card-header">
              <div className="card-title">
                 <Calculator size={24} color="#2ecc71"/> Calculadora de Huella
              </div>
              <p className="card-desc">Ingresa los datos mensuales para calcular tus emisiones.</p>
            </div>

            <div className="card-content">
              {/* Inputs (Igual que antes...) */}
              <div className="input-group">
                <label className="input-label"><Zap size={16} color="#f1c40f" /> Consumo de energía (kWh)</label>
                <input type="number" className="calc-input" placeholder="Ej: 1500" value={formData.energy} onChange={(e) => handleInputChange("energy", e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label"><Droplets size={16} color="#3498db" /> Consumo de agua (m³)</label>
                <input type="number" className="calc-input" placeholder="Ej: 50" value={formData.water} onChange={(e) => handleInputChange("water", e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label"><Car size={16} color="#e67e22" /> Transporte (km recorridos)</label>
                <input type="number" className="calc-input" placeholder="Ej: 2000" value={formData.transport} onChange={(e) => handleInputChange("transport", e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label"><Trash2 size={16} color="#e74c3c" /> Residuos generados (kg)</label>
                <input type="number" className="calc-input" placeholder="Ej: 200" value={formData.waste} onChange={(e) => handleInputChange("waste", e.target.value)} />
              </div>

              <button onClick={calculateFootprint} className="btn-calculate">
                Calcular Resultados
              </button>
            </div>
          </div>

          {/* --- RESULTADOS --- */}
          {results && (
            <div className="calc-card">
              <div className="card-header">
                <div className="card-title">Resultados</div>
                <p className="card-desc">Tu impacto ambiental mensual estimado.</p>
              </div>
              
              <div className="card-content">
                <div className="result-box">
                  <div className="result-number">
                    {results.total.toFixed(2)} <span style={{fontSize: '1rem'}}>tCO₂</span>
                  </div>
                  <p className="result-label">Emisiones totales</p>
                </div>

                <div className="chart-container">
                   <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={results.pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" paddingAngle={5}>
                        {results.pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value.toFixed(2)} tCO₂`, "Emisión"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                 
                <div className="recommendation-box" style={{marginBottom: '20px'}}>
                   <strong>💡 Análisis:</strong> Identifica el sector más grande en el gráfico y prioriza reducirlo.
                </div>

                {/* --- BOTÓN DE GUARDAR (NUEVO) --- */}
                <button 
                    onClick={saveData} 
                    disabled={loadingSave}
                    className="btn-calculate"
                    style={{ 
                        backgroundColor: '#34495e', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '10px' 
                    }}
                >
                    {loadingSave ? "Guardando..." : <><Save size={18} /> Guardar en mi Historial</>}
                </button>

              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CarbonCalculator;