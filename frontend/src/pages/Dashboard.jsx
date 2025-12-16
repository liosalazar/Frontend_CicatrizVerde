import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "../api/apiClient";
import * as XLSX from 'xlsx';
import { FaFileExcel, FaLeaf, FaBell, FaUsers, FaUserShield, FaProjectDiagram, FaChartLine } from "react-icons/fa";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user, loadUser } = useUser();
  const { toast } = useToast();
  
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    loadUser();
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await apiClient("/api/measurements/history");
      if (response.success) {
        const sortedData = response.data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        setHistory(sortedData);
      }
    } catch (error) {
      console.error("Error al cargar historial:", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const exportToExcel = async () => {
    try {
      toast({ description: "Generando reporte Excel..." });
      const response = await apiClient("/api/measurements/all-clients");
      
      if (response.success) {
        const dataToExport = response.data.map(item => ({
          "Fecha": new Date(item.created_at).toLocaleDateString(),
          "Cliente": item.client_name,
          "Email": item.client_email,
          "Energía (kWh)": item.energy,
          "Agua (m3)": item.water,
          "Transporte (km)": item.transport,
          "Residuos (kg)": item.waste,
          "Total (tCO2)": parseFloat(item.total).toFixed(2)
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte General");
        XLSX.writeFile(workbook, `Reporte_Huella_${new Date().toLocaleDateString()}.xlsx`);
        
        toast({ title: "¡Éxito!", description: "Archivo Excel descargado." });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo generar el Excel." });
    }
  };

  const handleNotificationClick = () => {
    toast({ description: "🔕 No tienes notificaciones nuevas." });
  };

  const chartData = history.map(item => ({
    name: new Date(item.created_at).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' }),
    total: parseFloat(item.total)
  }));

  const promedio = history.length > 0 
    ? (history.reduce((acc, curr) => acc + parseFloat(curr.total), 0) / history.length).toFixed(2) 
    : "0.00";

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Panel de Control</h1>
      
      <h2 className="dashboard-welcome">
        Hola, {user?.name || "Usuario"} <span className="role-tag">({user?.role})</span>
      </h2>

      {/* --- 1. SECCIÓN ASESOR (BOTÓN EXCEL) --- */}
      {(user?.role === 'asesor' || user?.role === 'admin') && (
        <div className="advisor-tools-container">
          <button onClick={exportToExcel} className="btn-excel">
            <FaFileExcel style={{ marginRight: '8px' }} /> Descargar Reporte Consolidado (Excel)
          </button>
        </div>
      )}

      {/* --- 2. WIDGETS DE RESUMEN (KPIs para Clientes) --- */}
      {user?.role === 'cliente' && history.length > 0 && (
        <div className="summary-widgets">
          <div className="widget-card">
            <div className="widget-icon" style={{ backgroundColor: '#e8f8f5' }}><FaLeaf color="#2ecc71" /></div>
            <div className="widget-info">
              <span className="widget-label">Última Medición</span>
              <span className="widget-value">{parseFloat(history[history.length - 1].total).toFixed(2)} <small>tCO₂</small></span>
            </div>
          </div>
          <div className="widget-card">
            <div className="widget-icon" style={{ backgroundColor: '#fef9e7' }}><FaChartLine color="#f1c40f" /></div>
            <div className="widget-info">
              <span className="widget-label">Promedio Mensual</span>
              <span className="widget-value">{promedio} <small>tCO₂</small></span>
            </div>
          </div>
          <div className="widget-card">
            <div className="widget-icon" style={{ backgroundColor: '#ebf5fb' }}><FaProjectDiagram color="#3498db" /></div>
            <div className="widget-info">
              <span className="widget-label">Total Registros</span>
              <span className="widget-value">{history.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* --- 3. GRÁFICO DE TENDENCIA --- */}
      {user?.role === 'cliente' && history.length > 0 && (
        <div className="dashboard-chart-section">
          <div className="chart-card">
            <h3 className="chart-title"><FaChartLine /> Tendencia de Emisiones</h3>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" fontSize={12} tick={{fill: '#888'}} axisLine={false} />
                  <YAxis fontSize={12} tick={{fill: '#888'}} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Line type="monotone" dataKey="total" stroke="#2ecc71" strokeWidth={4} dot={{ r: 4, fill: '#2ecc71', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* --- 4. GRID DE ACCIONES --- */}
      <div className="cards-grid">
        {user?.role === 'cliente' && (
          <Link to="/calcular" className="card-link">
            <div className="card highlight-card"> 
              <FaLeaf size={40} color="#2ecc71" />
              <div className="card-content">
                <h3>Nueva Medición</h3>
                <p>Calcula tu huella actual.</p>
              </div>
            </div>
          </Link>
        )}

        {(user?.role === 'asesor' || user?.role === 'admin') && (
          <Link to="/clients-list" className="card-link">
            <div className="card highlight-card advisor-card">
              <FaUsers size={40} color="#f1c40f" />
              <div className="card-content">
                <h3>Panel de Clientes</h3>
                <p>Gestionar mediciones.</p>
              </div>
            </div>
          </Link>
        )}

        <div className="card" onClick={handleNotificationClick}>
          <FaBell size={40} color="#3e7f5e" />
          <div className="card-content">
            <h3>Notificaciones</h3>
            <p>Ver alertas del sistema.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;