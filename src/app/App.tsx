import { useState, useEffect } from "react";
import {
  LayoutDashboard, Users, Building2, Heart, Zap, Gavel, Brain, BarChart3, Shield, Settings,
  Bell, Search, ChevronLeft, ChevronRight, ChevronDown, X, AlertTriangle, AlertCircle,
  Info, CheckCircle, Clock, FileText, Plus, Filter, Eye, MapPin, Calendar, Hash,
  Activity, Check, XCircle, RefreshCw, Download, TrendingUp, Star,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line,
} from "recharts";

// ─── Design tokens ────────────────────────────────────────────────────────────
const PRIMARY = "#1B3A6B";
const TEAL = "#2A9D8F";
const BG = "#F4F6F9";
const BORDER = "#E2E7EE";
const TEXT = "#1A2233";
const MUTED = "#5B6472";
const S_GREEN = "#2E7D5B";
const S_AMBER = "#E0A526";
const S_RED = "#C0492E";

function scoreColor(v: number) { return v >= 75 ? S_GREEN : v >= 50 ? S_AMBER : S_RED; }
function scoreLabel(v: number) { return v >= 75 ? "Alta" : v >= 50 ? "Media" : "Baja"; }

// ─── Mock data ────────────────────────────────────────────────────────────────
const nnaList = [
  { id: "NNA-2024-0891", nombre: "Sofía Morales Castro", edad: 9, comuna: "La Florida", escuela: "Esc. República de México", saludMental: "Alta complejidad", hermanos: "Grupo 3", condicion: "Vulnerado", estado: "Pendiente" },
  { id: "NNA-2024-0892", nombre: "Diego Fuentes Rojas", edad: 14, comuna: "Pudahuel", escuela: "Lic. Diego Portales", saludMental: "Sin indicadores", hermanos: "Individual", condicion: "Infractor", estado: "Asignado" },
  { id: "NNA-2024-0893", nombre: "Valentina Pérez Soto", edad: 7, comuna: "Maipú", escuela: "Esc. Bello Horizonte", saludMental: "Moderado", hermanos: "Grupo 3", condicion: "Vulnerado", estado: "Reservado" },
  { id: "NNA-2024-0894", nombre: "Matías Sánchez López", edad: 12, comuna: "Recoleta", escuela: "Esc. Villa Francia", saludMental: "Sin indicadores", hermanos: "Individual", condicion: "Vulnerado", estado: "Pendiente" },
  { id: "NNA-2024-0895", nombre: "Emilia Torres Vera", edad: 16, comuna: "Santiago Centro", escuela: "Lic. Estadio Español", saludMental: "Alta complejidad", hermanos: "Individual", condicion: "Vulnerado", estado: "Pendiente" },
  { id: "NNA-2024-0896", nombre: "Lucas Ramírez Díaz", edad: 8, comuna: "La Pintana", escuela: "Esc. Unión La Pintana", saludMental: "Moderado", hermanos: "Grupo 2", condicion: "Vulnerado", estado: "Asignado" },
  { id: "NNA-2024-0897", nombre: "Isidora Muñoz Pinto", edad: 11, comuna: "Pudahuel", escuela: "Esc. San José", saludMental: "Sin indicadores", hermanos: "Grupo 2", condicion: "Vulnerado", estado: "Pendiente" },
];

const residenciasList = [
  { id: "RES-001", nombre: "Residencia Los Arrayanes", comuna: "La Florida", tipo: "General", especializacion: "Salud mental", ocupacion: 11, max: 15 },
  { id: "RES-002", nombre: "Centro Acogida Familiar Maipú", comuna: "Maipú", tipo: "General", especializacion: "Sin especialización", ocupacion: 15, max: 15 },
  { id: "RES-003", nombre: "Residencia Salud Mental Norte", comuna: "Recoleta", tipo: "Especializada", especializacion: "Salud mental", ocupacion: 8, max: 15 },
  { id: "RES-004", nombre: "Hogar Jóvenes Pudahuel", comuna: "Pudahuel", tipo: "General", especializacion: "Adolescentes", ocupacion: 13, max: 15 },
  { id: "RES-005", nombre: "Residencia Amanecer", comuna: "Santiago Centro", tipo: "Especializada", especializacion: "Alta complejidad", ocupacion: 6, max: 15 },
];

const familiasList = [
  { id: "FA-001", apellido: "Vargas Muñoz", comuna: "Las Condes", disponibilidad: "Disponible", idoneidad: "Alta", rangoEtario: "0–6 años", acreditada: true },
  { id: "FA-002", apellido: "Contreras Lagos", comuna: "Maipú", disponibilidad: "Ocupada", idoneidad: "Alta", rangoEtario: "6–12 años", acreditada: true },
  { id: "FA-003", apellido: "Espinoza Reyes", comuna: "Pudahuel", disponibilidad: "Disponible", idoneidad: "Media", rangoEtario: "0–18 años", acreditada: true },
  { id: "FA-004", apellido: "Herrera Castillo", comuna: "La Florida", disponibilidad: "En revisión", idoneidad: "Media", rangoEtario: "12–18 años", acreditada: false },
];

const decisionesList = [
  { id: "DEC-001", nna: "Sofía Morales Castro (NNA-2024-0891)", residencia: "Residencia Los Arrayanes", score: 84, fecha: "03/07/2025", estado: "Pendiente revisión" },
  { id: "DEC-002", nna: "Emilia Torres Vera (NNA-2024-0895)", residencia: "Residencia Amanecer", score: 71, fecha: "02/07/2025", estado: "Pendiente revisión" },
  { id: "DEC-003", nna: "Lucas Ramírez Díaz (NNA-2024-0896)", residencia: "Hogar Jóvenes Pudahuel", score: 61, fecha: "01/07/2025", estado: "Revisada" },
];

const saludMentalList = [
  { id: "NNA-2024-0891", nombre: "Sofía Morales Castro", centro: "Hospital Dr. Sótero del Río", diasReserva: 7, residencia: "Residencia Los Arrayanes", alerta: false },
  { id: "NNA-2024-0899", nombre: "Camila Vega Moreno", centro: "Clínica Psiquiátrica UC", diasReserva: 2, residencia: "Residencia Salud Mental Norte", alerta: true },
  { id: "NNA-2024-0902", nombre: "Benjamín Ojeda Ríos", centro: "Hospital del Salvador", diasReserva: 14, residencia: "Residencia Amanecer", alerta: false },
];

const auditLog = [
  { id: 1, fecha: "03/07/2025 14:22", usuario: "Jueza Carmen Riquelme", rol: "Juez de Familia", evento: "Resolución aprobada", detalle: "Aprobó asignación NNA-2024-0891 → Residencia Los Arrayanes. Especialización de salud mental confirmada.", caso: "NNA-2024-0891" },
  { id: 2, fecha: "03/07/2025 11:05", usuario: "Psicóloga Andrea Vallejos", rol: "Dupla psicosocial", evento: "Recomendación solicitada", detalle: "Motor de asignación ejecutado para NNA-2024-0891. Score calculado: 84/100. Factores: perfil, salud mental, cercanía.", caso: "NNA-2024-0891" },
  { id: 3, fecha: "02/07/2025 09:30", usuario: "Coordinador Pablo Ávila", rol: "Coordinador residencia", evento: "Cupo actualizado", detalle: "Residencia Los Arrayanes actualizó ocupación de 10 a 11 cupos tras egreso de NNA-2024-0875.", caso: "RES-001" },
  { id: 4, fecha: "01/07/2025 16:45", usuario: "Admin Sistema", rol: "Administrador", evento: "Peso del motor modificado", detalle: "Factor \"Cercanía geográfica\" ajustado de 20% a 25%. Ajuste aprobado por Coordinación Nacional.", caso: "CONFIG" },
];

const notifList = [
  { id: 1, sev: "critica", titulo: "Reserva por vencer", desc: "NNA-2024-0899 (Camila Vega Moreno): cupo reservado vence en 2 días. Acción requerida.", leida: false },
  { id: 2, sev: "critica", titulo: "NNA en espera crítica", desc: "Sofía Morales Castro lleva 18 días sin asignación efectiva.", leida: false },
  { id: 3, sev: "advertencia", titulo: "Residencia al tope legal", desc: "Centro Acogida Familiar Maipú: 15/15 cupos. No puede recibir nuevas asignaciones.", leida: false },
  { id: 4, sev: "informativa", titulo: "Nueva familia acreditada", desc: "Familia Vargas Muñoz completó el proceso de acreditación exitosamente.", leida: true },
  { id: 5, sev: "advertencia", titulo: "Decisiones pendientes", desc: "2 recomendaciones aguardan resolución judicial por más de 48 horas.", leida: true },
];

const analyticsBarData = [
  { tipo: "Salud mental", deficit: 18 }, { tipo: "0–5 años", deficit: 12 }, { tipo: "6–12 años", deficit: 8 },
  { tipo: "Adolescentes", deficit: 6 }, { tipo: "Alta comp.", deficit: 14 }, { tipo: "General", deficit: 4 },
];

const analyticsLineData = [
  { mes: "Ene", nna: 210, cupos: 195 }, { mes: "Feb", nna: 218, cupos: 198 }, { mes: "Mar", nna: 225, cupos: 201 },
  { mes: "Abr", nna: 229, cupos: 200 }, { mes: "May", nna: 235, cupos: 205 }, { mes: "Jun", nna: 241, cupos: 207 }, { mes: "Jul", nna: 248, cupos: 210 },
];

// ─── Shared components ────────────────────────────────────────────────────────
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-lg border ${className}`} style={{ borderColor: BORDER, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      {children}
    </div>
  );
}

function StatusChip({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Asignado": `bg-[#EDF7F2] text-[${S_GREEN}] border border-[#2E7D5B]/20`,
    "Pendiente": `bg-[#FFF8E6] text-[${S_AMBER}] border border-[#E0A526]/20`,
    "Reservado": "bg-[#EBF4FF] text-[#1B3A6B] border border-[#1B3A6B]/20",
    "Alta complejidad": "bg-[#FEF0ED] text-[#C0492E] border border-[#C0492E]/20",
    "Moderado": "bg-[#FFF8E6] text-[#E0A526] border border-[#E0A526]/20",
    "Sin indicadores": "bg-[#EDF7F2] text-[#2E7D5B] border border-[#2E7D5B]/20",
    "Disponible": "bg-[#EDF7F2] text-[#2E7D5B] border border-[#2E7D5B]/20",
    "Ocupada": "bg-[#FEF0ED] text-[#C0492E] border border-[#C0492E]/20",
    "En revisión": "bg-[#FFF8E6] text-[#E0A526] border border-[#E0A526]/20",
    "Activo": "bg-[#EDF7F2] text-[#2E7D5B] border border-[#2E7D5B]/20",
    "Pendiente revisión": "bg-[#FFF8E6] text-[#E0A526] border border-[#E0A526]/20",
    "Revisada": "bg-[#EDF7F2] text-[#2E7D5B] border border-[#2E7D5B]/20",
    "Vulnerado": "bg-[#FEF0ED] text-[#C0492E] border border-[#C0492E]/20",
    "Infractor": "bg-[#F0E8FF] text-[#6B46C1] border border-[#6B46C1]/20",
    "Individual": "bg-[#F4F6F9] text-[#5B6472] border border-[#E2E7EE]",
  };
  const cls = map[status] ?? "bg-gray-100 text-gray-600 border border-gray-200";
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${cls}`}>{status}</span>;
}

function OccupancyBar({ current, max }: { current: number; max: number }) {
  const pct = (current / max) * 100;
  const color = pct >= 100 ? S_RED : pct >= 80 ? S_AMBER : S_GREEN;
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs tabular-nums" style={{ color: MUTED }}>{current}/{max} cupos</span>
        {pct >= 100 && <span className="text-xs font-bold" style={{ color: S_RED }}>Tope legal</span>}
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: BORDER }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function CircularGauge({ value, size = 140 }: { value: number; size?: number }) {
  const r = (size - 24) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const c = scoreColor(value);
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={BORDER} strokeWidth={12} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={c} strokeWidth={12}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute flex flex-col items-center pointer-events-none">
        <span className="font-bold tabular-nums" style={{ fontSize: size / 4 + 2, color: c, lineHeight: 1 }}>{value}</span>
        <span className="text-xs font-semibold mt-1" style={{ color: c }}>{scoreLabel(value)}</span>
        <span className="text-xs" style={{ color: MUTED }}>Idoneidad</span>
      </div>
    </div>
  );
}

function ScoreFactorBar({ label, value, weight, aporte }: { label: string; value: number; weight: number; aporte: number }) {
  const c = scoreColor(value);
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium" style={{ color: TEXT }}>{label}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: MUTED }}>Peso: {Math.round(weight * 100)}%</span>
          <span className="text-sm font-bold tabular-nums" style={{ color: c }}>{value}/100</span>
        </div>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: BORDER }}>
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: c }} />
      </div>
      <p className="text-xs mt-1" style={{ color: MUTED }}>Aporte al score final: +{aporte.toFixed(1)} puntos</p>
    </div>
  );
}

function KpiCard({ title, value, sub, icon: Icon, color, alert: isAlert }: {
  title: string; value: string | number; sub?: string; icon: any; color: string; alert?: boolean;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: MUTED }}>{title}</p>
          <p className="text-3xl font-bold tabular-nums" style={{ color: isAlert ? S_RED : TEXT }}>{value}</p>
          {sub && <p className="text-xs mt-1" style={{ color: MUTED }}>{sub}</p>}
        </div>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}18` }}>
          <Icon size={20} style={{ color }} />
        </div>
      </div>
    </Card>
  );
}

// ─── Layout: Sidebar ──────────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard", label: "Panel principal", icon: LayoutDashboard },
  { id: "nna-list", label: "NNA", icon: Users },
  { id: "residencias", label: "Residencias y cupos", icon: Building2 },
  { id: "familias", label: "Familias de acogida", icon: Heart },
  { id: "motor-solicitud", label: "Motor de asignación", icon: Zap },
  { id: "decisiones", label: "Decisiones", icon: Gavel },
  { id: "salud-mental", label: "Salud mental y reservas", icon: Brain },
  { id: "analitica", label: "Analítica y déficit", icon: BarChart3 },
  { id: "auditoria", label: "Auditoría", icon: Shield },
  { id: "configuracion", label: "Configuración", icon: Settings },
];

function Sidebar({ collapsed, onToggle, current, onNav }: {
  collapsed: boolean; onToggle: () => void; current: string; onNav: (p: string) => void;
}) {
  const isMotor = current === "motor-resultados" || current === "motor-solicitud";
  return (
    <aside
      className="flex flex-col h-full border-r flex-shrink-0 transition-all duration-200"
      style={{ width: collapsed ? 64 : 240, backgroundColor: PRIMARY, borderColor: "rgba(255,255,255,0.1)" }}
    >
      <div className="flex items-center h-16 px-4 border-b flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        {collapsed ? (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto" style={{ backgroundColor: TEAL }}>
            <Shield size={16} className="text-white" />
          </div>
        ) : (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: TEAL }}>
              <Shield size={16} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-tight">SinA·NNA</p>
              <p className="text-xs leading-tight truncate" style={{ color: "rgba(255,255,255,0.55)" }}>Sistema de Asignación</p>
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = current === item.id || (item.id === "motor-solicitud" && isMotor);
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              title={collapsed ? item.label : undefined}
              className="w-full flex items-center gap-3 py-2.5 text-left transition-colors"
              style={{
                paddingLeft: collapsed ? 0 : 16,
                paddingRight: 16,
                justifyContent: collapsed ? "center" : "flex-start",
                backgroundColor: active ? "rgba(42,157,143,0.22)" : "transparent",
                color: active ? "#fff" : "rgba(255,255,255,0.65)",
                borderLeft: active && !collapsed ? `3px solid ${TEAL}` : "3px solid transparent",
              }}
            >
              <Icon size={17} className="flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <button onClick={onToggle} className="w-full flex items-center justify-center p-1.5 rounded" style={{ color: "rgba(255,255,255,0.5)" }}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}

// ─── Layout: TopBar ───────────────────────────────────────────────────────────
function TopBar({ onNotif, notifCount }: { onNotif: () => void; notifCount: number }) {
  return (
    <header className="h-16 flex items-center px-6 gap-4 border-b bg-white flex-shrink-0" style={{ borderColor: BORDER }}>
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: MUTED }} />
          <input
            placeholder="Buscar NNA, residencia, caso..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border outline-none"
            style={{ borderColor: BORDER, backgroundColor: BG, color: TEXT }}
          />
        </div>
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <button onClick={onNotif} className="relative p-2 rounded-lg transition-colors hover:bg-[#F4F6F9]" style={{ color: MUTED }}>
          <Bell size={19} />
          {notifCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ backgroundColor: S_RED }}>
              {notifCount}
            </span>
          )}
        </button>
        <div className="flex items-center gap-2.5 pl-3 border-l" style={{ borderColor: BORDER }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: PRIMARY }}>CR</div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold" style={{ color: TEXT }}>Carmen Riquelme</p>
            <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: "#EBF4FF", color: PRIMARY }}>Juez de Familia</span>
          </div>
          <ChevronDown size={13} style={{ color: MUTED }} />
        </div>
      </div>
    </header>
  );
}

// ─── Layout: Page wrapper ─────────────────────────────────────────────────────
function Page({ title, breadcrumb, actions, children }: {
  title: string; breadcrumb?: string[]; actions?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="flex-1 overflow-auto" style={{ backgroundColor: BG }}>
      <div className="px-8 py-6">
        {breadcrumb && (
          <div className="flex items-center gap-1.5 mb-1 text-xs" style={{ color: MUTED }}>
            {breadcrumb.map((b, i) => <span key={i} className="flex items-center gap-1.5">{i > 0 && <span>/</span>}<span>{b}</span></span>)}
          </div>
        )}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold" style={{ color: TEXT }}>{title}</h1>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Screen: Login ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [mfa, setMfa] = useState(false);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: PRIMARY }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: TEAL }}>
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">SinA·NNA</h1>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>Sistema Nacional de Asignación de NNA</p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Poder Judicial — Servicio Mejor Niñez</p>
        </div>
        <Card className="p-8">
          {!mfa ? (
            <>
              <h2 className="text-lg font-bold mb-6" style={{ color: TEXT }}>Iniciar sesión</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: TEXT }}>RUT o nombre de usuario</label>
                  <input placeholder="12.345.678-9" className="w-full px-3 py-2.5 text-sm rounded-lg border outline-none" style={{ borderColor: BORDER, color: TEXT }} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: TEXT }}>Contraseña</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 text-sm rounded-lg border outline-none" style={{ borderColor: BORDER, color: TEXT }} />
                </div>
                <button onClick={() => setMfa(true)} className="w-full py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: PRIMARY }}>
                  Continuar
                </button>
                <p className="text-center text-sm">
                  <a href="#" className="hover:underline" style={{ color: TEAL }}>¿Olvidó su contraseña?</a>
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold mb-1" style={{ color: TEXT }}>Verificación en dos pasos</h2>
              <p className="text-sm mb-6" style={{ color: MUTED }}>Ingrese el código enviado a su dispositivo registrado.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: TEXT }}>Código de verificación</label>
                  <input placeholder="000000" maxLength={6} className="w-full px-3 py-3 text-center rounded-lg border outline-none font-mono tracking-widest" style={{ borderColor: BORDER, color: TEXT, fontSize: 22 }} />
                </div>
                <button onClick={onLogin} className="w-full py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: TEAL }}>
                  Ingresar al sistema
                </button>
                <button onClick={() => setMfa(false)} className="w-full text-sm text-center hover:underline" style={{ color: MUTED }}>Volver</button>
              </div>
            </>
          )}
        </Card>
        <p className="text-xs text-center mt-6 px-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
          Este sistema trata datos sensibles de NNA conforme a la Ley N° 19.628 sobre Protección de la Vida Privada y la Ley N° 21.430 sobre garantías y protección integral de la niñez.
        </p>
      </div>
    </div>
  );
}

// ─── Screen: Dashboard ────────────────────────────────────────────────────────
function DashboardScreen({ onNav }: { onNav: (p: string, d?: any) => void }) {
  const alertas = [
    { sev: "critica", titulo: "Reserva por vencer", desc: "NNA-2024-0899: cupo reservado vence en 2 días. Acción inmediata requerida." },
    { sev: "critica", titulo: "NNA en espera crítica", desc: "Sofía Morales Castro: 18 días sin asignación efectiva. Prioridad máxima." },
    { sev: "advertencia", titulo: "Residencia al tope legal", desc: "Centro Acogida Familiar Maipú: 15/15. No puede recibir nuevos NNA." },
    { sev: "informativa", titulo: "Decisiones pendientes", desc: "2 recomendaciones esperan resolución judicial por más de 48 horas." },
  ];
  const sevMap: Record<string, { color: string; bg: string; label: string; Icon: any }> = {
    critica: { color: S_RED, bg: "#FEF0ED", label: "Crítica", Icon: AlertCircle },
    advertencia: { color: S_AMBER, bg: "#FFF8E6", label: "Advertencia", Icon: AlertTriangle },
    informativa: { color: PRIMARY, bg: "#EBF4FF", label: "Informativa", Icon: Info },
  };
  return (
    <Page
      title="Panel principal"
      actions={
        <>
          <button onClick={() => onNav("nna-list")} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-white" style={{ backgroundColor: TEAL }}>
            <Plus size={15} /> Nuevo NNA
          </button>
          <button onClick={() => onNav("motor-solicitud")} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border" style={{ borderColor: BORDER, color: TEXT }}>
            <Zap size={15} /> Solicitar recomendación
          </button>
        </>
      }
    >
      <p className="text-sm mb-5" style={{ color: MUTED }}>
        Bienvenida, <strong style={{ color: TEXT }}>jueza Carmen Riquelme</strong> — 7° Juzgado de Familia de Santiago. Hoy es lunes, 7 de julio de 2025.
      </p>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard title="NNA sin asignación" value={47} sub="Actualizado hoy 08:00" icon={Users} color={S_RED} alert />
        <KpiCard title="Cupos disponibles" value={31} sub="En 18 residencias activas" icon={Building2} color={S_GREEN} />
        <KpiCard title="Reservas activas" value={8} sub="Por internación psiquiátrica" icon={Brain} color={S_AMBER} />
        <KpiCard title="Residencias al límite" value={3} sub="Tope legal 15/15 alcanzado" icon={AlertTriangle} color={S_RED} alert />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: MUTED }}>Alertas prioritarias</h3>
          <div className="space-y-2.5">
            {alertas.map((a, i) => {
              const cfg = sevMap[a.sev];
              const Icon = cfg.Icon;
              return (
                <div key={i} className="rounded-lg p-3 border-l-4" style={{ backgroundColor: cfg.bg, borderLeftColor: cfg.color }}>
                  <div className="flex gap-2">
                    <Icon size={13} className="flex-shrink-0 mt-0.5" style={{ color: cfg.color }} />
                    <div>
                      <p className="text-xs font-bold" style={{ color: cfg.color }}>{cfg.label} — {a.titulo}</p>
                      <p className="text-xs mt-0.5" style={{ color: TEXT }}>{a.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: MUTED }}>Casos recientes</h3>
            <button onClick={() => onNav("nna-list")} className="text-xs font-semibold hover:underline" style={{ color: TEAL }}>Ver todos</button>
          </div>
          <Card>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: BORDER }}>
                  {["ID", "Nombre", "Edad", "S. mental", "Estado"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide" style={{ color: MUTED }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {nnaList.slice(0, 5).map(n => (
                  <tr key={n.id} className="border-b hover:bg-[#F4F6F9] cursor-pointer transition-colors" style={{ borderColor: BORDER }} onClick={() => onNav("nna-profile", n)}>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: MUTED }}>{n.id}</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: TEXT }}>{n.nombre}</td>
                    <td className="px-4 py-3 tabular-nums" style={{ color: TEXT }}>{n.edad}</td>
                    <td className="px-4 py-3"><StatusChip status={n.saludMental} /></td>
                    <td className="px-4 py-3"><StatusChip status={n.estado} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </Page>
  );
}

// ─── Screen: NNA List ─────────────────────────────────────────────────────────
function NNAListScreen({ onNav }: { onNav: (p: string, d?: any) => void }) {
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState("Todos");
  const filtered = nnaList.filter(n => {
    const q = search.toLowerCase();
    return (n.nombre.toLowerCase().includes(q) || n.id.includes(q)) && (filterEstado === "Todos" || n.estado === filterEstado);
  });
  return (
    <Page title="Niños, niñas y adolescentes" breadcrumb={["Panel principal", "NNA"]}
      actions={<button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-white" style={{ backgroundColor: TEAL }}><Plus size={15} /> Nuevo NNA</button>}>
      <Card className="p-4 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: MUTED }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nombre o ID..." className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border outline-none" style={{ borderColor: BORDER, color: TEXT }} />
          </div>
          <select value={filterEstado} onChange={e => setFilterEstado(e.target.value)} className="px-3 py-2 text-sm rounded-lg border outline-none" style={{ borderColor: BORDER, color: TEXT, backgroundColor: "white" }}>
            {["Todos", "Pendiente", "Asignado", "Reservado"].map(o => <option key={o}>{o}</option>)}
          </select>
          <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border" style={{ borderColor: BORDER, color: MUTED }}><Filter size={13} /> Más filtros</button>
          <span className="text-xs ml-auto" style={{ color: MUTED }}>{filtered.length} registros</span>
        </div>
      </Card>
      <Card>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b" style={{ borderColor: BORDER }}>
              {["ID", "Nombre", "Edad", "Comuna", "Escuela", "S. mental", "Hermanos", "Condición", "Estado", ""].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide whitespace-nowrap" style={{ color: MUTED }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(n => (
              <tr key={n.id} className="border-b hover:bg-[#F4F6F9] transition-colors" style={{ borderColor: BORDER }}>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: MUTED }}>{n.id}</td>
                <td className="px-4 py-3 font-semibold" style={{ color: TEXT }}>{n.nombre}</td>
                <td className="px-4 py-3 tabular-nums" style={{ color: TEXT }}>{n.edad}</td>
                <td className="px-4 py-3" style={{ color: TEXT }}>{n.comuna}</td>
                <td className="px-4 py-3 text-xs max-w-32 truncate" style={{ color: MUTED }}>{n.escuela}</td>
                <td className="px-4 py-3"><StatusChip status={n.saludMental} /></td>
                <td className="px-4 py-3"><StatusChip status={n.hermanos} /></td>
                <td className="px-4 py-3"><StatusChip status={n.condicion} /></td>
                <td className="px-4 py-3"><StatusChip status={n.estado} /></td>
                <td className="px-4 py-3">
                  <button onClick={() => onNav("nna-profile", n)} className="flex items-center gap-1 text-xs font-semibold hover:underline" style={{ color: TEAL }}>
                    <Eye size={12} /> Ver ficha
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t text-sm" style={{ borderColor: BORDER }}>
          <span style={{ color: MUTED }}>Mostrando 1–{filtered.length} de {filtered.length} registros</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border text-xs" style={{ borderColor: BORDER, color: MUTED }}>Anterior</button>
            <button className="px-3 py-1 rounded text-xs text-white" style={{ backgroundColor: PRIMARY }}>1</button>
            <button className="px-3 py-1 rounded border text-xs" style={{ borderColor: BORDER, color: MUTED }}>Siguiente</button>
          </div>
        </div>
      </Card>
    </Page>
  );
}

// ─── Screen: NNA Profile ──────────────────────────────────────────────────────
function NNAProfileScreen({ nna, onNav }: { nna: any; onNav: (p: string, d?: any) => void }) {
  const [tab, setTab] = useState("general");
  const d = nna || nnaList[0];
  const tabs = [
    { id: "general", label: "Datos generales" }, { id: "salud", label: "Salud mental" },
    { id: "vinculos", label: "Vínculos y escuela" }, { id: "hermanos", label: "Hermanos" }, { id: "historial", label: "Historial" },
  ];
  return (
    <Page title={d.nombre} breadcrumb={["Panel principal", "NNA", d.nombre]}>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold" style={{ color: TEXT }}>{d.nombre}</h2>
              <StatusChip status={d.estado} />
              <StatusChip status={d.condicion} />
            </div>
            <div className="flex items-center gap-6 text-sm" style={{ color: MUTED }}>
              <span className="flex items-center gap-1"><Hash size={12} /> {d.id}</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> {d.edad} años</span>
              <span className="flex items-center gap-1"><MapPin size={12} /> {d.comuna}</span>
            </div>
          </Card>

          <div className="flex border-b" style={{ borderColor: BORDER }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className="px-4 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors"
                style={{ borderBottomColor: tab === t.id ? TEAL : "transparent", color: tab === t.id ? TEAL : MUTED }}>
                {t.label}
              </button>
            ))}
          </div>

          <Card className="p-6">
            {tab === "general" && (
              <div className="grid grid-cols-2 gap-5">
                {[
                  ["Nombre completo", d.nombre], ["Identificador", d.id], ["Fecha de nacimiento", "14 de marzo de 2015"],
                  ["Edad", `${d.edad} años`], ["Comuna de origen", d.comuna], ["Establecimiento educacional", d.escuela],
                  ["Condición", d.condicion], ["Situación de calle", "No"], ["Ingreso al sistema", "16 de junio de 2025"],
                  ["Tribunal a cargo", "7° Juzgado de Familia de Santiago"],
                ].map(([l, v]) => (
                  <div key={l as string}>
                    <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: MUTED }}>{l}</p>
                    <p className="text-sm" style={{ color: TEXT }}>{v}</p>
                  </div>
                ))}
              </div>
            )}
            {tab === "salud" && (
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: MUTED }}>Indicadores</p>
                  <div className="flex gap-2 flex-wrap">
                    <StatusChip status={d.saludMental} />
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#FEF0ED] text-[#C0492E] border border-[#C0492E]/20">Trastorno del apego</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#FFF8E6] text-[#E0A526] border border-[#E0A526]/20">TDAH en evaluación</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: MUTED }}>Tratamientos activos</p>
                  <p className="text-sm" style={{ color: TEXT }}>Psicoterapia individual semanal — COSAM La Florida</p>
                  <p className="text-sm mt-1" style={{ color: TEXT }}>Psiquiatría infantil mensual — Hospital Dr. Sótero del Río</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: MUTED }}>Restricciones clínicas</p>
                  <div className="p-3 rounded-lg border-l-4" style={{ backgroundColor: "#FFF8E6", borderLeftColor: S_AMBER }}>
                    <p className="text-sm font-semibold" style={{ color: TEXT }}>Requiere residencia con especialización en salud mental o acceso garantizado a tratamiento externo.</p>
                    <p className="text-xs mt-1" style={{ color: MUTED }}>No puede asignarse a residencias generales sin coordinación terapéutica previa.</p>
                  </div>
                </div>
              </div>
            )}
            {tab === "vinculos" && (
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: MUTED }}>Referentes significativos</p>
                  <div className="space-y-2">
                    {[
                      { nombre: "María Castro Núñez", rel: "Abuela materna", contacto: "Contacto supervisado permitido", ok: true },
                      { nombre: "Roberto Morales", rel: "Padre biológico", contacto: "Sin contacto (medida cautelar vigente)", ok: false },
                    ].map(r => (
                      <div key={r.nombre} className="flex items-start justify-between p-3 rounded-lg border" style={{ borderColor: BORDER }}>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: TEXT }}>{r.nombre}</p>
                          <p className="text-xs" style={{ color: MUTED }}>{r.rel}</p>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded ml-3 text-right" style={{ backgroundColor: r.ok ? "#EDF7F2" : "#FEF0ED", color: r.ok ? S_GREEN : S_RED }}>{r.contacto}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>Escuela y continuidad educativa</p>
                  <p className="text-sm font-semibold" style={{ color: TEXT }}>{d.escuela} — {d.comuna}</p>
                  <p className="text-xs mt-1" style={{ color: MUTED }}>Prioridad: mantener continuidad en el establecimiento o garantizar traslado sin interrupción del año escolar.</p>
                </div>
              </div>
            )}
            {tab === "hermanos" && (
              <div>
                <div className="p-3 rounded-lg mb-4" style={{ backgroundColor: "#EBF4FF" }}>
                  <p className="text-sm font-bold" style={{ color: PRIMARY }}>Grupo de hermanos — Deben permanecer juntos</p>
                  <p className="text-xs mt-0.5" style={{ color: MUTED }}>Restricción dura del motor: este grupo no puede ser separado bajo ninguna circunstancia.</p>
                </div>
                <div className="space-y-2">
                  {[
                    { id: "NNA-2024-0891", nombre: "Sofía Morales Castro", edad: 9, rol: "Hermana mayor" },
                    { id: "NNA-2024-0898", nombre: "Camilo Morales Castro", edad: 7, rol: "Hermano" },
                    { id: "NNA-2024-0900", nombre: "Fernanda Morales Castro", edad: 5, rol: "Hermana menor" },
                  ].map(h => (
                    <div key={h.id} className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: BORDER }}>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: TEXT }}>{h.nombre}</p>
                        <p className="text-xs" style={{ color: MUTED }}>{h.edad} años · {h.rol} · <span className="font-mono">{h.id}</span></p>
                      </div>
                      <StatusChip status="Pendiente" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === "historial" && (
              <div className="relative pl-8">
                <div className="absolute left-4 top-0 bottom-0 w-0.5" style={{ backgroundColor: BORDER }} />
                <div className="space-y-5">
                  {[
                    { fecha: "16 Jun 2025", evento: "Ingreso al sistema", desc: "NNA ingresada por medida de protección. Tribunal: 7° JF Santiago.", color: PRIMARY },
                    { fecha: "18 Jun 2025", evento: "Evaluación psicosocial", desc: "Dupla psicosocial (A. Vallejos / M. Torres) realizó evaluación inicial completa.", color: TEAL },
                    { fecha: "25 Jun 2025", evento: "Recomendación generada", desc: "Motor ejecutado. Resultado: Residencia Los Arrayanes (score 84/100).", color: TEAL },
                    { fecha: "03 Jul 2025", evento: "Pendiente resolución judicial", desc: "Recomendación enviada a bandeja del juez. Sin resolución a la fecha.", color: S_AMBER },
                  ].map((ev, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-4 top-1 w-3 h-3 rounded-full border-2 border-white" style={{ backgroundColor: ev.color }} />
                      <div className="flex items-baseline gap-3 mb-0.5">
                        <span className="text-xs font-mono" style={{ color: MUTED }}>{ev.fecha}</span>
                        <span className="text-sm font-bold" style={{ color: TEXT }}>{ev.evento}</span>
                      </div>
                      <p className="text-sm" style={{ color: MUTED }}>{ev.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="col-span-1 space-y-4">
          <Card className="p-5 border-t-4" style={{ borderTopColor: TEAL }}>
            <h3 className="font-bold mb-3" style={{ color: TEXT }}>Estado de asignación</h3>
            <div className="space-y-2.5 mb-5">
              {[["Estado actual", <StatusChip key="e" status={d.estado} />], ["Días en espera", <span key="d" className="font-bold tabular-nums" style={{ color: S_RED }}>18 días</span>], ["Prioridad", <span key="p" className="font-bold" style={{ color: S_RED }}>Alta</span>]].map(([l, v]) => (
                <div key={l as string} className="flex justify-between items-center text-sm">
                  <span style={{ color: MUTED }}>{l}</span>{v}
                </div>
              ))}
            </div>
            <button onClick={() => onNav("motor-solicitud", d)} className="w-full py-3 rounded-lg text-sm font-bold text-white flex items-center justify-center gap-2" style={{ backgroundColor: PRIMARY }}>
              <Zap size={15} /> Solicitar recomendación
            </button>
          </Card>
          <Card className="p-5">
            <h3 className="font-bold mb-3" style={{ color: TEXT }}>Restricciones activas</h3>
            <div className="space-y-2">
              {[
                { label: "Especialización salud mental", tipo: "dura" },
                { label: "Hermanos deben estar juntos", tipo: "dura" },
                { label: "Sin mezcla vulnerado/infractor", tipo: "dura" },
                { label: "Cercanía La Florida (< 20 km)", tipo: "blanda" },
                { label: "Continuidad escolar", tipo: "blanda" },
              ].map(r => (
                <div key={r.label} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: r.tipo === "dura" ? S_RED : S_AMBER }} />
                  <span className="flex-1" style={{ color: TEXT }}>{r.label}</span>
                  <span className="font-bold" style={{ color: r.tipo === "dura" ? S_RED : S_AMBER }}>{r.tipo === "dura" ? "Dura" : "Blanda"}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}

// ─── Screen: Motor Solicitud ──────────────────────────────────────────────────
function MotorSolicitudScreen({ nna, onNav }: { nna: any; onNav: (p: string, d?: any) => void }) {
  const [step, setStep] = useState<"select" | "review" | "loading">("select");
  const [selected, setSelected] = useState<any>(nna || nnaList[0]);

  useEffect(() => {
    if (step !== "loading") return;
    const t = setTimeout(() => onNav("motor-resultados", selected), 2400);
    return () => clearTimeout(t);
  }, [step]);

  const pendientes = nnaList.filter(n => n.estado === "Pendiente");

  return (
    <Page title="Motor de asignación — Solicitud" breadcrumb={["Panel principal", "Motor de asignación", "Solicitud"]}>
      <div className="max-w-2xl">
        {step === "select" && (
          <Card className="p-6">
            <h2 className="font-bold mb-4" style={{ color: TEXT }}>Seleccione el NNA o grupo de hermanos</h2>
            <div className="space-y-2 mb-6">
              {pendientes.map(n => (
                <label key={n.id} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-[#F4F6F9] transition-colors"
                  style={{ borderColor: selected?.id === n.id ? TEAL : BORDER }}>
                  <input type="radio" name="nna" checked={selected?.id === n.id} onChange={() => setSelected(n)} className="w-4 h-4" style={{ accentColor: TEAL }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: TEXT }}>{n.nombre}</p>
                    <p className="text-xs" style={{ color: MUTED }}>{n.id} · {n.edad} años · {n.comuna}{n.hermanos !== "Individual" ? ` · ${n.hermanos}` : ""}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <StatusChip status={n.saludMental} />
                  </div>
                </label>
              ))}
            </div>
            <button onClick={() => setStep("review")} className="px-6 py-2.5 rounded-lg text-sm font-bold text-white" style={{ backgroundColor: PRIMARY }}>
              Continuar →
            </button>
          </Card>
        )}
        {step === "review" && (
          <div className="space-y-4">
            <Card className="p-6">
              <h2 className="font-bold mb-4" style={{ color: TEXT }}>Confirmar restricciones cargadas</h2>
              <div className="p-3 rounded-lg mb-4" style={{ backgroundColor: "#EBF4FF" }}>
                <p className="text-sm font-bold" style={{ color: PRIMARY }}>{selected?.nombre}</p>
                <p className="text-xs mt-0.5" style={{ color: MUTED }}>{selected?.id} · {selected?.edad} años · {selected?.comuna}</p>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Máximo 15 NNA por residencia", tipo: "dura" },
                  { label: "Sin mezcla vulnerado/infractor", tipo: "dura" },
                  { label: "Especialización salud mental requerida", tipo: "dura" },
                  { label: "Hermanos deben permanecer juntos (Grupo 3)", tipo: "dura" },
                  { label: "Cercanía geográfica La Florida (peso 25%)", tipo: "blanda" },
                  { label: "Continuidad escolar (peso 15%)", tipo: "blanda" },
                ].map(r => (
                  <div key={r.label} className="flex items-center gap-3 p-2.5 rounded border" style={{ borderColor: BORDER }}>
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: r.tipo === "dura" ? S_RED : S_AMBER }} />
                    <span className="text-sm flex-1" style={{ color: TEXT }}>{r.label}</span>
                    <span className="text-xs font-bold" style={{ color: r.tipo === "dura" ? S_RED : S_AMBER }}>{r.tipo === "dura" ? "Dura" : "Blanda"}</span>
                    <CheckCircle size={14} style={{ color: S_GREEN }} />
                  </div>
                ))}
              </div>
            </Card>
            <div className="flex gap-3">
              <button onClick={() => setStep("select")} className="px-4 py-2.5 text-sm rounded-lg border" style={{ borderColor: BORDER, color: TEXT }}>← Volver</button>
              <button onClick={() => setStep("loading")} className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white" style={{ backgroundColor: TEAL }}>
                <Zap size={15} /> Generar recomendación
              </button>
            </div>
          </div>
        )}
        {step === "loading" && (
          <Card className="p-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#EBF4FF" }}>
              <Activity size={28} style={{ color: PRIMARY }} className="animate-pulse" />
            </div>
            <h2 className="font-bold mb-2" style={{ color: TEXT }}>Calculando recomendación...</h2>
            <p className="text-sm mb-8" style={{ color: MUTED }}>El motor evalúa compatibilidad con todas las residencias y familias disponibles.</p>
            <div className="w-full max-w-xs space-y-3">
              {["Validando restricciones duras", "Calculando factores de idoneidad", "Ordenando alternativas por score", "Generando explicaciones para el juez"].map((l, i) => (
                <div key={l} className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: i < 3 ? TEAL : BORDER }}>
                    {i < 3 && <Check size={11} className="text-white" />}
                  </div>
                  <span style={{ color: i < 3 ? TEXT : MUTED }}>{l}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </Page>
  );
}

// ─── Screen: Motor Resultados (Star screen) ───────────────────────────────────
function MotorResultadosScreen({ nna, onNav }: { nna: any; onNav: (p: string, d?: any) => void }) {
  const d = nna || nnaList[0];
  const score = 84;
  const [resolucion, setResolucion] = useState<null | "aprobada" | "rechazada">(null);

  const factores = [
    { label: "Compatibilidad de perfil", value: 91, weight: 0.30, aporte: 27.3 },
    { label: "Especialización en salud mental", value: 88, weight: 0.25, aporte: 22.0 },
    { label: "Cercanía geográfica", value: 74, weight: 0.20, aporte: 14.8 },
    { label: "Continuidad de vínculos", value: 82, weight: 0.15, aporte: 12.3 },
    { label: "Capacidad legal disponible", value: 93, weight: 0.10, aporte: 9.3 },
  ];

  const alternativas = [
    { nombre: "Residencia Amanecer", comuna: "Santiago Centro", score: 71, razon: "Especialización compatible, pero mayor distancia a escuela (+8 km) y menor disponibilidad de cupos." },
    { nombre: "Hogar Jóvenes Pudahuel", comuna: "Pudahuel", score: 58, razon: "Sin especialización en salud mental. Solo viable con coordinación terapéutica externa garantizada." },
    { nombre: "Familia Espinoza Reyes", comuna: "Pudahuel", score: 52, razon: "Familia de acogida disponible. No apta para grupo de hermanos de 3 integrantes." },
  ];

  if (resolucion) {
    return (
      <Page title="Resolución registrada" breadcrumb={["Panel principal", "Motor de asignación", "Resultados", "Resolución"]}>
        <div className="max-w-lg mx-auto">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: resolucion === "aprobada" ? "#EDF7F2" : "#FEF0ED" }}>
              {resolucion === "aprobada" ? <CheckCircle size={32} style={{ color: S_GREEN }} /> : <XCircle size={32} style={{ color: S_RED }} />}
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: TEXT }}>{resolucion === "aprobada" ? "Asignación aprobada" : "Recomendación rechazada"}</h2>
            <p className="text-sm mb-6" style={{ color: MUTED }}>
              {resolucion === "aprobada"
                ? "La resolución ha sido registrada en el expediente. La Residencia Los Arrayanes ha sido notificada de la próxima incorporación."
                : "El rechazo fue registrado. El caso regresa al motor para generar una nueva recomendación."}
            </p>
            <div className="p-4 rounded-lg mb-6 text-left" style={{ backgroundColor: BG }}>
              <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: MUTED }}>Resolución N° 2025-1047</p>
              {[["NNA", `${d.nombre} · ${d.id}`], ["Destino", "Residencia Los Arrayanes"], ["Magistrado/a", "Jueza Carmen Riquelme — 7° JF Santiago"], ["Fecha y hora", "07/07/2025 14:22"]].map(([l, v]) => (
                <p key={l} className="text-sm mb-0.5" style={{ color: TEXT }}><span style={{ color: MUTED }}>{l}:</span> {v}</p>
              ))}
            </div>
            <button onClick={() => onNav("dashboard")} className="w-full py-2.5 rounded-lg text-sm font-bold text-white" style={{ backgroundColor: PRIMARY }}>
              Volver al Panel principal
            </button>
          </Card>
        </div>
      </Page>
    );
  }

  return (
    <Page title="Resultados del motor de asignación" breadcrumb={["Panel principal", "Motor de asignación", "Resultados"]}>
      <div className="p-4 rounded-lg mb-5 flex items-start gap-3" style={{ backgroundColor: "#EBF4FF", border: `1px solid ${PRIMARY}30` }}>
        <Info size={15} className="flex-shrink-0 mt-0.5" style={{ color: PRIMARY }} />
        <p className="text-sm" style={{ color: PRIMARY }}>
          <strong>El sistema recomienda; la decisión es humana.</strong> Esta recomendación es orientativa y debe ser revisada y resuelta por el juez y la dupla psicosocial competentes. Toda resolución quedará registrada en el expediente.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          {/* Recomendación principal */}
          <Card className="p-6 border-t-4" style={{ borderTopColor: S_GREEN }}>
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Star size={13} style={{ color: S_AMBER, fill: S_AMBER }} />
                  <span className="text-xs font-bold uppercase tracking-wide" style={{ color: S_GREEN }}>Recomendación principal</span>
                </div>
                <h2 className="text-xl font-bold" style={{ color: TEXT }}>Residencia Los Arrayanes</h2>
                <p className="text-sm mt-0.5" style={{ color: MUTED }}>La Florida · General · Especialización salud mental</p>
                <p className="text-sm mt-0.5" style={{ color: MUTED }}>11/15 cupos · Distancia a escuela: 3.2 km</p>
              </div>
              <CircularGauge value={score} size={140} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: MUTED }}>Restricciones verificadas</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Máx. 15 — cumplido", ok: true },
                  { label: "Hermanos juntos", ok: true },
                  { label: "Sin mezcla V/I", ok: true },
                  { label: "Especializ. salud mental", ok: true },
                  { label: "Cercanía < 20 km", ok: true },
                  { label: "Continuidad escolar", ok: null },
                ].map(r => (
                  <span key={r.label} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border"
                    style={r.ok === true
                      ? { backgroundColor: "#EDF7F2", color: S_GREEN, borderColor: `${S_GREEN}30` }
                      : { backgroundColor: "#FFF8E6", color: S_AMBER, borderColor: `${S_AMBER}30` }
                    }>
                    {r.ok === true ? <Check size={10} /> : <AlertTriangle size={10} />}
                    {r.label}
                  </span>
                ))}
              </div>
              <p className="text-xs mt-2" style={{ color: MUTED }}>
                <span className="font-semibold" style={{ color: S_AMBER }}>Tensión menor:</span> Continuidad escolar requiere coordinación de transporte (+1.2 km vs. establecimiento actual).
              </p>
            </div>
          </Card>

          {/* Explicabilidad */}
          <Card className="p-6">
            <h3 className="font-bold mb-1" style={{ color: TEXT }}>Explicación del score por factor</h3>
            <p className="text-sm mb-5" style={{ color: MUTED }}>
              Cada factor tiene un peso asignado por el equipo técnico (configurable en Administración). El score final es la suma ponderada. Esta información es legible para el juez sin necesidad de conocimientos técnicos.
            </p>
            {factores.map(f => <ScoreFactorBar key={f.label} {...f} />)}
            <div className="mt-4 pt-4 border-t flex items-center justify-between" style={{ borderColor: BORDER }}>
              <span className="font-bold" style={{ color: TEXT }}>Score de idoneidad total</span>
              <span className="text-2xl font-bold tabular-nums" style={{ color: scoreColor(score) }}>{score}/100</span>
            </div>
          </Card>

          {/* Alternativas */}
          <Card className="p-6">
            <h3 className="font-bold mb-4" style={{ color: TEXT }}>Alternativas ordenadas por idoneidad</h3>
            <div className="space-y-3">
              {alternativas.map((alt, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg border" style={{ borderColor: BORDER }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ backgroundColor: BG, color: MUTED }}>{i + 2}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-0.5">
                      <span className="font-semibold text-sm" style={{ color: TEXT }}>{alt.nombre}</span>
                      <span className="text-xs" style={{ color: MUTED }}>{alt.comuna}</span>
                    </div>
                    <p className="text-xs" style={{ color: MUTED }}>{alt.razon}</p>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="text-lg font-bold tabular-nums" style={{ color: scoreColor(alt.score) }}>{alt.score}</span>
                    <span className="text-xs font-semibold" style={{ color: scoreColor(alt.score) }}>{scoreLabel(alt.score)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right panel */}
        <div className="col-span-1 space-y-4">
          <Card className="p-5">
            <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: MUTED }}>NNA evaluada</p>
            <p className="font-bold" style={{ color: TEXT }}>{d.nombre}</p>
            <p className="text-xs mt-0.5 mb-3" style={{ color: MUTED }}>{d.id} · {d.edad} años · {d.comuna}</p>
            <div className="flex gap-2 flex-wrap">
              <StatusChip status={d.saludMental} />
              <StatusChip status={d.condicion} />
            </div>
          </Card>

          <Card className="p-5 border-2" style={{ borderColor: PRIMARY }}>
            <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: PRIMARY }}>Resolución judicial</p>
            <p className="text-xs mb-4" style={{ color: MUTED }}>La decisión final corresponde al juez competente. Todo acto queda registrado de forma inmutable.</p>
            <div className="space-y-2">
              <button onClick={() => setResolucion("aprobada")} className="w-full py-2.5 rounded-lg text-sm font-bold text-white flex items-center justify-center gap-2" style={{ backgroundColor: S_GREEN }}>
                <Check size={15} /> Aprobar asignación
              </button>
              <button onClick={() => setResolucion("rechazada")} className="w-full py-2.5 rounded-lg text-sm font-bold border flex items-center justify-center gap-2" style={{ borderColor: S_RED, color: S_RED }}>
                <XCircle size={15} /> Rechazar
              </button>
              <button onClick={() => onNav("motor-solicitud", d)} className="w-full py-2.5 rounded-lg text-sm font-medium border flex items-center justify-center gap-2" style={{ borderColor: BORDER, color: MUTED }}>
                <RefreshCw size={13} /> Solicitar otra recomendación
              </button>
            </div>
          </Card>

          <Card className="p-5">
            <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: MUTED }}>Residencia recomendada</p>
            <p className="font-semibold text-sm" style={{ color: TEXT }}>Residencia Los Arrayanes</p>
            <div className="mt-3"><OccupancyBar current={11} max={15} /></div>
            <div className="mt-3 space-y-1.5 text-xs" style={{ color: MUTED }}>
              {[["Especialización", "Salud mental"], ["Tipo", "General"], ["Distancia escuela", "3.2 km"], ["Cupos libres", "4"]].map(([l, v]) => (
                <p key={l} className="flex justify-between"><span>{l}</span><span className="font-semibold" style={{ color: TEXT }}>{v}</span></p>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}

// ─── Screen: Decisiones ───────────────────────────────────────────────────────
function DecisionesScreen({ onNav }: { onNav: (p: string, d?: any) => void }) {
  return (
    <Page title="Decisiones — Bandeja del juez" breadcrumb={["Panel principal", "Decisiones"]}>
      <div className="p-4 rounded-lg mb-5 flex items-start gap-3" style={{ backgroundColor: "#FFF8E6", border: `1px solid ${S_AMBER}30` }}>
        <AlertTriangle size={15} style={{ color: S_AMBER }} className="flex-shrink-0 mt-0.5" />
        <p className="text-sm" style={{ color: TEXT }}>
          <strong>2 recomendaciones</strong> aguardan su resolución. Las resoluciones quedan registradas de forma permanente e inmutable en el expediente del caso.
        </p>
      </div>
      <Card>
        <div className="px-4 py-3 border-b flex items-center gap-4" style={{ borderColor: BORDER }}>
          <button className="text-sm font-bold pb-1 border-b-2" style={{ borderBottomColor: TEAL, color: TEAL }}>Pendientes (2)</button>
          <button className="text-sm" style={{ color: MUTED }}>Resueltas (18)</button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b" style={{ borderColor: BORDER }}>
              {["ID", "NNA", "Residencia recomendada", "Score", "Generada", "Estado", ""].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide" style={{ color: MUTED }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {decisionesList.map(d => (
              <tr key={d.id} className="border-b hover:bg-[#F4F6F9] transition-colors" style={{ borderColor: BORDER }}>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: MUTED }}>{d.id}</td>
                <td className="px-4 py-3 font-semibold" style={{ color: TEXT }}>{d.nna}</td>
                <td className="px-4 py-3" style={{ color: TEXT }}>{d.residencia}</td>
                <td className="px-4 py-3"><span className="font-bold tabular-nums text-base" style={{ color: scoreColor(d.score) }}>{d.score}</span></td>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: MUTED }}>{d.fecha}</td>
                <td className="px-4 py-3"><StatusChip status={d.estado} /></td>
                <td className="px-4 py-3">
                  {d.estado === "Pendiente revisión" && (
                    <button onClick={() => onNav("motor-resultados", nnaList[0])} className="flex items-center gap-1 text-xs font-bold hover:underline" style={{ color: TEAL }}>
                      <Eye size={12} /> Revisar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Page>
  );
}

// ─── Screen: Residencias List ─────────────────────────────────────────────────
function ResidenciasScreen({ onNav }: { onNav: (p: string, d?: any) => void }) {
  return (
    <Page title="Residencias y cupos" breadcrumb={["Panel principal", "Residencias y cupos"]}>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <KpiCard title="Total residencias" value={18} sub="Activas en el sistema" icon={Building2} color={PRIMARY} />
        <KpiCard title="Cupos disponibles" value={31} sub="De un total de 270 cupos" icon={CheckCircle} color={S_GREEN} />
        <KpiCard title="En tope legal (15/15)" value={3} sub="Requieren atención" icon={AlertTriangle} color={S_RED} alert />
      </div>
      <div className="space-y-3">
        {residenciasList.map(r => {
          const pct = (r.ocupacion / r.max) * 100;
          return (
            <Card key={r.id} className="p-5">
              <div className="flex items-center gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold" style={{ color: TEXT }}>{r.nombre}</h3>
                      <p className="text-xs mt-0.5" style={{ color: MUTED }}>{r.id} · {r.comuna} · {r.tipo}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded border" style={{ borderColor: BORDER, color: MUTED }}>{r.especializacion}</span>
                      {pct >= 100 && (
                        <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "#FEF0ED", color: S_RED }}>
                          <AlertTriangle size={11} /> Tope legal
                        </span>
                      )}
                    </div>
                  </div>
                  <OccupancyBar current={r.ocupacion} max={r.max} />
                </div>
                <button onClick={() => onNav("residencia-detalle", r)} className="px-4 py-2 text-sm font-semibold rounded-lg border flex items-center gap-2 flex-shrink-0" style={{ borderColor: BORDER, color: TEXT }}>
                  <Eye size={13} /> Ver detalle
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </Page>
  );
}

// ─── Screen: Residencia Detalle ───────────────────────────────────────────────
function ResidenciaDetalleScreen({ residencia }: { residencia: any }) {
  const r = residencia || residenciasList[0];
  const pct = (r.ocupacion / r.max) * 100;
  const gaugeColor = pct >= 100 ? S_RED : pct >= 80 ? S_AMBER : S_GREEN;
  const circ = 2 * Math.PI * 50;
  return (
    <Page title={r.nombre} breadcrumb={["Panel principal", "Residencias y cupos", r.nombre]}>
      {r.ocupacion >= r.max && (
        <div className="p-4 rounded-lg mb-5 flex items-center gap-3 border-2" style={{ backgroundColor: "#FEF0ED", borderColor: S_RED }}>
          <AlertCircle size={20} style={{ color: S_RED }} />
          <p className="text-sm font-bold" style={{ color: S_RED }}>Esta residencia ha alcanzado el límite legal de 15 NNA. No puede recibir nuevas asignaciones hasta liberar un cupo.</p>
        </div>
      )}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <Card className="p-6">
            <h3 className="font-bold mb-4" style={{ color: TEXT }}>Datos del centro</h3>
            <div className="grid grid-cols-2 gap-4">
              {[["ID", r.id], ["Tipo", r.tipo], ["Especialización", r.especializacion], ["Comuna", r.comuna], ["Capacidad máxima legal", `${r.max} NNA`], ["Dirección", "Av. Departamental 5620"], ["Responsable técnico", "Daniela Herrera González"], ["Teléfono", "+56 2 2345 6789"]].map(([l, v]) => (
                <div key={l as string}>
                  <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: MUTED }}>{l}</p>
                  <p className="text-sm" style={{ color: TEXT }}>{v}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-bold mb-4" style={{ color: TEXT }}>NNA actualmente asignados ({r.ocupacion})</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: BORDER }}>
                  {["ID", "Nombre", "Edad", "Condición", "Ingreso"].map(h => <th key={h} className="pb-2 text-left text-xs font-bold uppercase tracking-wide" style={{ color: MUTED }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {nnaList.filter(n => n.estado === "Asignado").map(n => (
                  <tr key={n.id} className="border-b" style={{ borderColor: BORDER }}>
                    <td className="py-2 font-mono text-xs" style={{ color: MUTED }}>{n.id}</td>
                    <td className="py-2 font-semibold" style={{ color: TEXT }}>{n.nombre}</td>
                    <td className="py-2 tabular-nums" style={{ color: TEXT }}>{n.edad}</td>
                    <td className="py-2"><StatusChip status={n.condicion} /></td>
                    <td className="py-2 font-mono text-xs" style={{ color: MUTED }}>15/06/2025</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className="p-5">
            <h3 className="font-bold mb-4" style={{ color: TEXT }}>Ocupación</h3>
            <div className="flex justify-center mb-4">
              <div className="relative" style={{ width: 128, height: 128 }}>
                <svg viewBox="0 0 120 120" width={128} height={128} style={{ transform: "rotate(-90deg)" }}>
                  <circle cx={60} cy={60} r={50} fill="none" stroke={BORDER} strokeWidth={12} />
                  <circle cx={60} cy={60} r={50} fill="none" stroke={gaugeColor} strokeWidth={12}
                    strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold tabular-nums" style={{ color: TEXT }}>{r.ocupacion}</span>
                  <span className="text-xs" style={{ color: MUTED }}>de {r.max}</span>
                </div>
              </div>
            </div>
            <OccupancyBar current={r.ocupacion} max={r.max} />
          </Card>
        </div>
      </div>
    </Page>
  );
}

// ─── Screen: Familias ─────────────────────────────────────────────────────────
function FamiliasScreen() {
  return (
    <Page title="Familias de acogida" breadcrumb={["Panel principal", "Familias de acogida"]}
      actions={<button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-white" style={{ backgroundColor: TEAL }}><Plus size={15} /> Nueva familia</button>}>
      <Card>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b" style={{ borderColor: BORDER }}>
              {["ID", "Familia", "Comuna", "Disponibilidad", "Idoneidad", "Rango etario", "Acreditada", ""].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide" style={{ color: MUTED }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {familiasList.map(f => (
              <tr key={f.id} className="border-b hover:bg-[#F4F6F9] transition-colors" style={{ borderColor: BORDER }}>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: MUTED }}>{f.id}</td>
                <td className="px-4 py-3 font-semibold" style={{ color: TEXT }}>Familia {f.apellido}</td>
                <td className="px-4 py-3" style={{ color: TEXT }}>{f.comuna}</td>
                <td className="px-4 py-3"><StatusChip status={f.disponibilidad} /></td>
                <td className="px-4 py-3"><span className="font-bold text-sm" style={{ color: f.idoneidad === "Alta" ? S_GREEN : S_AMBER }}>{f.idoneidad}</span></td>
                <td className="px-4 py-3 text-xs" style={{ color: TEXT }}>{f.rangoEtario}</td>
                <td className="px-4 py-3">{f.acreditada ? <CheckCircle size={16} style={{ color: S_GREEN }} /> : <XCircle size={16} style={{ color: S_RED }} />}</td>
                <td className="px-4 py-3"><button className="text-xs font-semibold hover:underline" style={{ color: TEAL }}>Ver perfil</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Page>
  );
}

// ─── Screen: Salud Mental ─────────────────────────────────────────────────────
function SaludMentalScreen({ onNav }: { onNav: (p: string, d?: any) => void }) {
  return (
    <Page title="Salud mental y reservas de cupo" breadcrumb={["Panel principal", "Salud mental y reservas"]}>
      <div className="p-4 rounded-lg mb-5 flex items-start gap-3 border-2" style={{ backgroundColor: "#FEF0ED", borderColor: `${S_RED}40` }}>
        <AlertCircle size={18} style={{ color: S_RED }} className="flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold mb-0.5" style={{ color: S_RED }}>Riesgo de NNA sin cupo al alta hospitalaria</p>
          <p className="text-sm" style={{ color: TEXT }}>Los NNA internados en psiquiatría tienen un cupo reservado por tiempo limitado. Al vencer el plazo, el cupo se libera y el NNA queda sin residencia confirmada al momento del alta. Actúe antes del vencimiento.</p>
        </div>
      </div>
      <Card>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b" style={{ borderColor: BORDER }}>
              {["ID NNA", "Nombre", "Centro psiquiátrico", "Días restantes de reserva", "Residencia reservada", "Acciones"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide" style={{ color: MUTED }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {saludMentalList.map(s => (
              <tr key={s.id} className="border-b hover:bg-[#F4F6F9] transition-colors" style={{ borderColor: BORDER, backgroundColor: s.alerta ? "#FEF0ED20" : undefined }}>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: MUTED }}>{s.id}</td>
                <td className="px-4 py-3 font-semibold" style={{ color: TEXT }}>{s.nombre}</td>
                <td className="px-4 py-3 text-xs" style={{ color: TEXT }}>{s.centro}</td>
                <td className="px-4 py-3">
                  <span className="font-bold tabular-nums text-base" style={{ color: s.diasReserva <= 3 ? S_RED : s.diasReserva <= 7 ? S_AMBER : S_GREEN }}>{s.diasReserva} días</span>
                  {s.alerta && <span className="ml-2 text-xs font-bold" style={{ color: S_RED }}>⚑ Urgente</span>}
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: TEXT }}>{s.residencia}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="text-xs px-2.5 py-1.5 rounded font-bold text-white" style={{ backgroundColor: TEAL }}>Reintegrar al alta</button>
                    <button onClick={() => onNav("motor-solicitud")} className="text-xs px-2.5 py-1.5 rounded border font-medium" style={{ borderColor: BORDER, color: MUTED }}>Re-ejecutar motor</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Page>
  );
}

// ─── Screen: Analítica ────────────────────────────────────────────────────────
function AnaliticaScreen() {
  const comunas = [
    { nombre: "Cerro Navia", deficit: 15 }, { nombre: "La Pintana", deficit: 12 }, { nombre: "Maipú", deficit: 10 },
    { nombre: "Pudahuel", deficit: 8 }, { nombre: "Lo Espejo", deficit: 6 }, { nombre: "La Florida", deficit: 4 },
    { nombre: "Recoleta", deficit: 3 }, { nombre: "Santiago", deficit: 2 },
  ];
  return (
    <Page title="Analítica y déficit de cupos" breadcrumb={["Panel principal", "Analítica y déficit"]}
      actions={<button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border" style={{ borderColor: BORDER, color: MUTED }}><Download size={13} /> Exportar informe</button>}>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard title="Déficit total nacional" value={48} sub="Cupos faltantes estimados" icon={TrendingUp} color={S_RED} alert />
        <KpiCard title="Comunas en déficit crítico" value={3} sub="Más de 10 cupos faltantes" icon={MapPin} color={S_RED} alert />
        <KpiCard title="NNA en espera más de 15 días" value={12} sub="Sin asignación efectiva" icon={Clock} color={S_AMBER} />
        <KpiCard title="Tasa de ocupación promedio" value="87%" sub="A nivel nacional" icon={Activity} color={PRIMARY} />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <Card className="p-5">
            <h3 className="font-bold mb-0.5" style={{ color: TEXT }}>Déficit por comuna</h3>
            <p className="text-xs mb-4" style={{ color: MUTED }}>Cupos faltantes según demanda proyectada</p>
            <div className="space-y-3">
              {comunas.map(c => {
                const pct = (c.deficit / 15) * 100;
                const color = c.deficit >= 10 ? S_RED : c.deficit >= 5 ? S_AMBER : S_GREEN;
                return (
                  <div key={c.nombre}>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span style={{ color: TEXT }}>{c.nombre}</span>
                      <span className="font-bold tabular-nums" style={{ color }}>{c.deficit}</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ backgroundColor: BORDER }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
        <div className="col-span-2 space-y-4">
          <Card className="p-5">
            <h3 className="font-bold mb-0.5" style={{ color: TEXT }}>Déficit por tipo de cupo</h3>
            <p className="text-xs mb-4" style={{ color: MUTED }}>Comparativo por especialización y tramo etario</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={analyticsBarData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} vertical={false} />
                <XAxis dataKey="tipo" tick={{ fontSize: 10, fill: MUTED }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: MUTED }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderColor: BORDER, borderRadius: 8 }} />
                <Bar dataKey="deficit" fill={PRIMARY} radius={[4, 4, 0, 0]} name="Déficit" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-5">
            <h3 className="font-bold mb-0.5" style={{ color: TEXT }}>Tendencia: NNA vs. Cupos disponibles</h3>
            <p className="text-xs mb-4" style={{ color: MUTED }}>Ene–Jul 2025 — La brecha se amplía mes a mes</p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={analyticsLineData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                <XAxis dataKey="mes" tick={{ fontSize: 10, fill: MUTED }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: MUTED }} tickLine={false} axisLine={false} domain={[190, 260]} />
                <Tooltip contentStyle={{ fontSize: 12, borderColor: BORDER, borderRadius: 8 }} />
                <Line type="monotone" dataKey="nna" stroke={S_RED} strokeWidth={2} dot={false} name="NNA sin asignación" />
                <Line type="monotone" dataKey="cupos" stroke={S_GREEN} strokeWidth={2} dot={false} name="Cupos disponibles" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </Page>
  );
}

// ─── Screen: Auditoría ────────────────────────────────────────────────────────
function AuditoriaScreen() {
  return (
    <Page title="Auditoría y trazabilidad" breadcrumb={["Panel principal", "Auditoría"]}
      actions={<button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border" style={{ borderColor: BORDER, color: MUTED }}><Download size={13} /> Exportar</button>}>
      <div className="p-3 rounded-lg mb-5 flex items-center gap-3" style={{ backgroundColor: "#EBF4FF", border: `1px solid ${PRIMARY}25` }}>
        <Shield size={14} style={{ color: PRIMARY }} />
        <p className="text-sm" style={{ color: PRIMARY }}>Registro de solo lectura. Todos los eventos son inmutables y no pueden ser editados ni eliminados.</p>
      </div>
      <Card className="p-4 mb-4">
        <div className="flex gap-3 flex-wrap">
          <input placeholder="Buscar por caso o usuario..." className="px-3 py-2 text-sm rounded-lg border outline-none flex-1 min-w-48" style={{ borderColor: BORDER, color: TEXT }} />
          <input type="date" defaultValue="2025-07-01" className="px-3 py-2 text-sm rounded-lg border outline-none" style={{ borderColor: BORDER, color: TEXT }} />
          <input type="date" defaultValue="2025-07-07" className="px-3 py-2 text-sm rounded-lg border outline-none" style={{ borderColor: BORDER, color: TEXT }} />
          <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border" style={{ borderColor: BORDER, color: MUTED }}><Filter size={13} /> Filtrar</button>
        </div>
      </Card>
      <Card className="p-6">
        <div className="relative pl-8">
          <div className="absolute left-4 top-0 bottom-0 w-0.5" style={{ backgroundColor: BORDER }} />
          <div className="space-y-6">
            {auditLog.map(ev => (
              <div key={ev.id} className="relative">
                <div className="absolute -left-4 top-2 w-4 h-4 rounded-full flex items-center justify-center border-2 border-white" style={{ backgroundColor: "#EBF4FF" }}>
                  <FileText size={9} style={{ color: PRIMARY }} />
                </div>
                <div className="flex items-start justify-between mb-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold" style={{ color: TEXT }}>{ev.evento}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: "#EBF4FF", color: PRIMARY }}>{ev.rol}</span>
                  </div>
                  <span className="text-xs font-mono flex-shrink-0 ml-3" style={{ color: MUTED }}>{ev.fecha}</span>
                </div>
                <p className="text-xs mb-1" style={{ color: MUTED }}>
                  Responsable: <strong style={{ color: TEXT }}>{ev.usuario}</strong> · Caso: <span className="font-mono">{ev.caso}</span>
                </p>
                <p className="text-sm" style={{ color: TEXT }}>{ev.detalle}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Page>
  );
}

// ─── Screen: Configuración ────────────────────────────────────────────────────
function ConfiguracionScreen() {
  const [tab, setTab] = useState("usuarios");
  const [weights, setWeights] = useState({ perfil: 30, saludMental: 25, cercania: 20, vinculos: 15, capacidad: 10 });
  const total = Object.values(weights).reduce((a, b) => a + b, 0);

  return (
    <Page title="Configuración del sistema" breadcrumb={["Panel principal", "Configuración"]}>
      <div className="flex border-b mb-6" style={{ borderColor: BORDER }}>
        {[["usuarios", "Usuarios y roles"], ["pesos", "Pesos del motor"], ["catalogo", "Catálogo"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className="px-4 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors"
            style={{ borderBottomColor: tab === id ? TEAL : "transparent", color: tab === id ? TEAL : MUTED }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "usuarios" && (
        <Card>
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: BORDER }}>
            <h3 className="font-bold" style={{ color: TEXT }}>Usuarios del sistema</h3>
            <button className="flex items-center gap-2 text-sm font-bold text-white px-3 py-1.5 rounded-lg" style={{ backgroundColor: TEAL }}><Plus size={13} /> Agregar usuario</button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: BORDER }}>
                {["Nombre", "RUT", "Rol", "Institución", "Estado", ""].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide" style={{ color: MUTED }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                { nombre: "Carmen Riquelme", rut: "12.345.678-9", rol: "Juez de Familia", inst: "7° JF Santiago", activo: true },
                { nombre: "Andrea Vallejos", rut: "15.234.567-8", rol: "Dupla psicosocial", inst: "Servicio Mejor Niñez RM", activo: true },
                { nombre: "Pablo Ávila", rut: "14.876.543-2", rol: "Coordinador residencia", inst: "Res. Los Arrayanes", activo: true },
                { nombre: "Isabel Montoya", rut: "17.654.321-0", rol: "Encargado FA", inst: "Servicio Mejor Niñez", activo: false },
                { nombre: "Admin Sistema", rut: "99.999.999-9", rol: "Administrador", inst: "Servicio Mejor Niñez", activo: true },
              ].map(u => (
                <tr key={u.rut} className="border-b hover:bg-[#F4F6F9] transition-colors" style={{ borderColor: BORDER }}>
                  <td className="px-4 py-3 font-semibold" style={{ color: TEXT }}>{u.nombre}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: MUTED }}>{u.rut}</td>
                  <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded font-semibold" style={{ backgroundColor: "#EBF4FF", color: PRIMARY }}>{u.rol}</span></td>
                  <td className="px-4 py-3 text-xs" style={{ color: TEXT }}>{u.inst}</td>
                  <td className="px-4 py-3"><StatusChip status={u.activo ? "Asignado" : "Pendiente"} /></td>
                  <td className="px-4 py-3"><button className="text-xs font-semibold hover:underline" style={{ color: TEAL }}>Editar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === "pesos" && (
        <div className="max-w-2xl">
          <Card className="p-6">
            <h3 className="font-bold mb-1" style={{ color: TEXT }}>Pesos del motor de asignación</h3>
            <p className="text-sm mb-3" style={{ color: MUTED }}>Configure la importancia relativa de cada factor. Las restricciones duras no son configurables: siempre se aplican.</p>
            <div className="p-3 rounded-lg mb-6 flex items-center justify-between" style={{ backgroundColor: total === 100 ? "#EDF7F2" : "#FFF8E6" }}>
              <span className="text-sm font-semibold" style={{ color: total === 100 ? S_GREEN : S_AMBER }}>
                Suma total: {total}% {total === 100 ? "✓ Correcto" : `— faltan ${100 - total}% para completar 100%`}
              </span>
            </div>
            <div className="space-y-6">
              {([
                { key: "perfil", label: "Compatibilidad de perfil", desc: "Edad, género, tipo de condición" },
                { key: "saludMental", label: "Especialización salud mental", desc: "Compatibilidad clínica con la residencia" },
                { key: "cercania", label: "Cercanía geográfica", desc: "Distancia a escuela y referentes significativos" },
                { key: "vinculos", label: "Continuidad de vínculos", desc: "Referentes y grupo de hermanos" },
                { key: "capacidad", label: "Capacidad legal disponible", desc: "Cupos reales disponibles" },
              ] as const).map(f => (
                <div key={f.key}>
                  <div className="flex items-baseline justify-between mb-1">
                    <div>
                      <span className="text-sm font-semibold" style={{ color: TEXT }}>{f.label}</span>
                      <p className="text-xs" style={{ color: MUTED }}>{f.desc}</p>
                    </div>
                    <span className="text-xl font-bold tabular-nums ml-4" style={{ color: PRIMARY }}>{weights[f.key]}%</span>
                  </div>
                  <input type="range" min={5} max={50} step={5} value={weights[f.key]}
                    onChange={e => setWeights(w => ({ ...w, [f.key]: +e.target.value }))}
                    className="w-full" style={{ accentColor: TEAL }} />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button className="px-4 py-2 text-sm font-bold text-white rounded-lg" style={{ backgroundColor: PRIMARY }}>Guardar configuración</button>
              <button className="px-4 py-2 text-sm rounded-lg border" style={{ borderColor: BORDER, color: MUTED }}>Restaurar valores por defecto</button>
            </div>
          </Card>
        </div>
      )}

      {tab === "catalogo" && (
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-bold mb-4" style={{ color: TEXT }}>Parámetros legales</h3>
            <div className="space-y-3">
              {[
                { label: "Máximo NNA por residencia", valor: "15", editable: false, nota: "No modificable (Ley N° 21.430)" },
                { label: "Días máx. reserva de cupo por internación", valor: "30", editable: true, nota: "" },
                { label: "Días de espera para alerta crítica", valor: "15", editable: true, nota: "" },
              ].map(p => (
                <div key={p.label} className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: BORDER }}>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: TEXT }}>{p.label}</p>
                    {p.nota && <p className="text-xs" style={{ color: MUTED }}>{p.nota}</p>}
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <span className="text-xl font-bold tabular-nums" style={{ color: PRIMARY }}>{p.valor}</span>
                    {p.editable && <button className="text-xs font-semibold" style={{ color: TEAL }}>Editar</button>}
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-bold mb-4" style={{ color: TEXT }}>Tipos de residencia</h3>
            <div className="space-y-2">
              {["General", "Especializada — Salud mental", "Especializada — Adolescentes infractores", "Familia de acogida simple", "Familia de acogida especializada"].map(t => (
                <div key={t} className="flex items-center justify-between p-2.5 rounded border" style={{ borderColor: BORDER }}>
                  <span className="text-sm" style={{ color: TEXT }}>{t}</span>
                  <button className="text-xs font-semibold" style={{ color: TEAL }}>Editar</button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </Page>
  );
}

// ─── Notificaciones Drawer ────────────────────────────────────────────────────
function NotifDrawer({ onClose }: { onClose: () => void }) {
  const sevCfg: Record<string, { color: string; bg: string; label: string }> = {
    critica: { color: S_RED, bg: "#FEF0ED", label: "Crítica" },
    advertencia: { color: S_AMBER, bg: "#FFF8E6", label: "Advertencia" },
    informativa: { color: PRIMARY, bg: "#EBF4FF", label: "Informativa" },
  };
  return (
    <>
      <div className="fixed inset-0 z-40" style={{ backgroundColor: "rgba(0,0,0,0.25)" }} onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-96 bg-white z-50 flex flex-col" style={{ boxShadow: "-4px 0 24px rgba(0,0,0,0.12)" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0" style={{ borderColor: BORDER }}>
          <h2 className="font-bold" style={{ color: TEXT }}>Notificaciones</h2>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-[#F4F6F9]"><X size={17} style={{ color: MUTED }} /></button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {(["critica", "advertencia", "informativa"] as const).map(sev => {
            const items = notifList.filter(n => n.sev === sev);
            if (!items.length) return null;
            const cfg = sevCfg[sev];
            return (
              <div key={sev}>
                <div className="px-5 py-2 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: BG, color: cfg.color }}>
                  {cfg.label} ({items.length})
                </div>
                {items.map(n => (
                  <div key={n.id} className="px-5 py-4 border-b flex items-start gap-3 transition-colors hover:bg-[#F4F6F9]"
                    style={{ borderColor: BORDER, backgroundColor: !n.leida ? cfg.bg + "55" : undefined }}>
                    <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: n.leida ? "transparent" : cfg.color }} />
                    <div>
                      <p className="text-sm font-bold" style={{ color: TEXT }}>{n.titulo}</p>
                      <p className="text-xs mt-0.5" style={{ color: MUTED }}>{n.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div className="px-5 py-3 border-t flex-shrink-0" style={{ borderColor: BORDER }}>
          <button className="text-sm font-semibold hover:underline" style={{ color: TEAL }}>Marcar todas como leídas</button>
        </div>
      </div>
    </>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [selectedNNA, setSelectedNNA] = useState<any>(null);
  const [selectedRes, setSelectedRes] = useState<any>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const unread = notifList.filter(n => !n.leida).length;

  function nav(p: string, data?: any) {
    setPage(p);
    if (data) {
      if (p === "nna-profile" || p === "motor-solicitud" || p === "motor-resultados") setSelectedNNA(data);
      if (p === "residencia-detalle") setSelectedRes(data);
    }
  }

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  function renderPage() {
    switch (page) {
      case "dashboard": return <DashboardScreen onNav={nav} />;
      case "nna-list": return <NNAListScreen onNav={nav} />;
      case "nna-profile": return <NNAProfileScreen nna={selectedNNA} onNav={nav} />;
      case "residencias": return <ResidenciasScreen onNav={nav} />;
      case "residencia-detalle": return <ResidenciaDetalleScreen residencia={selectedRes} />;
      case "familias": return <FamiliasScreen />;
      case "motor-solicitud": return <MotorSolicitudScreen nna={selectedNNA} onNav={nav} />;
      case "motor-resultados": return <MotorResultadosScreen nna={selectedNNA} onNav={nav} />;
      case "decisiones": return <DecisionesScreen onNav={nav} />;
      case "salud-mental": return <SaludMentalScreen onNav={nav} />;
      case "analitica": return <AnaliticaScreen />;
      case "auditoria": return <AuditoriaScreen />;
      case "configuracion": return <ConfiguracionScreen />;
      default: return <DashboardScreen onNav={nav} />;
    }
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: BG }}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} current={page} onNav={nav} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onNotif={() => setNotifOpen(o => !o)} notifCount={unread} />
        {renderPage()}
      </div>
      {notifOpen && <NotifDrawer onClose={() => setNotifOpen(false)} />}
    </div>
  );
}
