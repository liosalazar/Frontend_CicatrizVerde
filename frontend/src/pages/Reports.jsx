import React, { useEffect, useState } from "react";
import { ArrowLeft, FileText, Download, Calendar, BarChart3, PieChart, TrendingUp, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"; // Usamos Toasts
import "../styles/Reports.css";

// Mapeo de iconos
const iconMap = {
  BarChart3: BarChart3,
  PieChart: PieChart,
  TrendingUp: TrendingUp
};

const Reports = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [templates, setTemplates] = useState([]);
  const [myReports, setMyReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false); // Para mostrar carga al generar

  // 1. Cargar Datos Iniciales
  const loadData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return; // O redirigir a login

    try {
      // Cargar Plantillas
      const resTemp = await fetch("http://localhost:5000/api/reports/templates");
      const dataTemp = await resTemp.json();
      if (dataTemp.success) setTemplates(dataTemp.data);

      // Cargar Historial del Usuario
      const resMy = await fetch("http://localhost:5000/api/reports/my-reports", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const dataMy = await resMy.json();
      if (dataMy.success) setMyReports(dataMy.data);

    } catch (error) {
      console.error("Error cargando reportes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 2. Función Generar Reporte
  const handleGenerate = async (templateId) => {
    const token = localStorage.getItem("token");
    setGenerating(true);

    try {
      const res = await fetch("http://localhost:5000/api/reports/generate", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ templateId })
      });

      const data = await res.json();

      if (data.success) {
        toast({
            title: "Solicitud recibida 📄",
            description: "Tu reporte se está generando. Actualiza la lista en unos segundos.",
            className: "bg-blue-600 text-white border-none",
        });
        // Recargamos la lista después de un momento para ver el nuevo reporte
        setTimeout(() => loadData(), 2500);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "No se pudo generar el reporte.",
        });
    } finally {
        setGenerating(false);
    }
  };

  const handleDownload = (name) => {
    toast({ description: `⬇️ Iniciando descarga de: ${name}` });
  };

  return (
    <div className="reports-page">
      <header className="reports-header">
        <div className="header-content">
          <button 
            onClick={() => navigate("/servicios")} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#666', marginRight: '20px' }}
          >
            <ArrowLeft size={20} style={{ marginRight: '5px' }} /> Volver
          </button>
          <div className="reports-title">
            <FileText size={28} style={{ color: '#2ecc71' }} />
            <span>Reportes Ambientales</span>
          </div>
        </div>
      </header>

      <main className="reports-container">
        <div className="reports-intro">
          <h2>Centro de Reportes</h2>
          <p>Genera y descarga informes detallados sobre el desempeño ambiental de tu empresa.</p>
        </div>

        {/* Sección Templates */}
        <div className="section-block">
          <h3 className="section-title">Generar Nuevo Reporte</h3>
          <p className="section-desc">Selecciona el tipo de reporte que necesitas generar hoy.</p>
          
          {loading ? <p>Cargando opciones...</p> : (
            <div className="templates-grid">
                {templates.map((template) => {
                const Icon = iconMap[template.icon_name] || BarChart3;
                return (
                    <div key={template.id} className="report-card">
                        <div className={`icon-box ${template.color_class}`}>
                            <Icon size={24} />
                        </div>
                        <h4 className="card-title">{template.title}</h4>
                        <p className="card-desc">{template.description}</p>
                        
                        <div className="badges-row">
                            <span className="badge badge-gray">{template.type}</span>
                            <span className="badge badge-outline">{template.frequency}</span>
                        </div>

                        <div style={{marginTop: 'auto', marginBottom: '15px'}}>
                            <div className="details-row"><span>Extensión:</span> <span>{template.pages}</span></div>
                            <div className="details-row"><span>Formato:</span> <span>{template.format}</span></div>
                        </div>

                        <button 
                            onClick={() => handleGenerate(template.id)} 
                            className="btn-generate"
                            disabled={generating}
                            style={{ opacity: generating ? 0.7 : 1 }}
                        >
                            {generating ? "Procesando..." : "Generar Reporte"}
                        </button>
                    </div>
                );
                })}
            </div>
          )}
        </div>

        {/* Sección Inferior */}
        <div className="lower-grid">
            
            {/* Lista Historial Real */}
            <div className="report-card">
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem'}}>
                    <h3 className="card-title" style={{margin:0}}>Mis Reportes</h3>
                    <button onClick={loadData} style={{border:'none', background:'transparent', color:'#2ecc71', cursor:'pointer', fontSize:'0.8rem'}}>↻ Actualizar</button>
                </div>
                
                {myReports.length === 0 ? (
                    <p style={{color:'#999', fontStyle:'italic', padding:'20px', textAlign:'center'}}>No has generado reportes aún.</p>
                ) : (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        {myReports.map((report) => (
                            <div key={report.id} className="recent-item">
                                <div className="flex items-start space-x-3">
                                    <div style={{ marginRight: '10px' }}>
                                        {report.status === 'Procesando...' ? <Loader2 size={20} className="animate-spin text-blue-500"/> : <FileText size={20} color="#2ecc71" />}
                                    </div>
                                    <div className="recent-info">
                                        <h4>{report.title}</h4>
                                        <div className="meta-info">
                                            <Calendar size={12} /> {new Date(report.generated_date).toLocaleDateString()} • {report.file_size}
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDownload(report.title)} 
                                    className="btn-download"
                                    disabled={report.status === 'Procesando...'}
                                >
                                    <Download size={14} /> {report.status === 'Procesando...' ? '...' : 'Descargar'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Vista Previa (Estática por ahora) */}
            <div className="report-card">
                <h3 className="card-title" style={{marginBottom: '1rem'}}>Vista Previa</h3>
                <div className="preview-paper">
                    <div className="paper-header">
                        <h4 style={{margin:0, color: '#333'}}>Cicatriz Verde</h4>
                        <span style={{fontSize: '0.8rem', color: '#888'}}>Ejemplo de Reporte</span>
                    </div>
                    <div className="paper-body" style={{textAlign:'center', padding:'20px 0', color:'#999'}}>
                        <p>Selecciona "Generar Reporte" para crear un análisis basado en tus datos reales.</p>
                    </div>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
};

export default Reports;