import {Link, useLocation} from 'react-router-dom'
import {
    Home,
    FileText,
    Search,
    Users,
    UploadCloud,
    History,
    Settings,
    HeartPulse,
    ShieldCheck,
} from 'lucide-react'

import {cn} from '@/lib/utils'
import {MountainSnow} from 'lucide-react'
import {ThemeToggle} from "../components/theme-toggle.tsx";

export function Sidebar({collapsed}: { collapsed: boolean }) {
    const {pathname} = useLocation()

    const links = [
        {to: '/', icon: <Home className="w-5 h-5"/>, label: 'Inicio'},
        {to: '/requests', icon: <FileText className="w-5 h-5"/>, label: 'Solicitudes'},
        {to: '/matches', icon: <Search className="w-5 h-5"/>, label: 'Coincidencias'},
        {to: '/identities', icon: <Users className="w-5 h-5"/>, label: 'Identidades'},
        {to: '/admin', icon: <ShieldCheck className="w-5 h-5"/>, label: 'Administración'},
        {to: '/upload', icon: <UploadCloud className="w-5 h-5"/>, label: 'Análisis'},
        {to: '/history', icon: <History className="w-5 h-5"/>, label: 'Historial de Casos'},
        {to: '/settings', icon: <Settings className="w-5 h-5"/>, label: 'Configuración'},
        {to: '/system-health', icon: <HeartPulse className="w-5 h-5"/>, label: 'Salud del Sistema'},
    ]

    return (
        <aside
            className={`h-full border-r bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] flex flex-col justify-between transition-all duration-300 ${
                collapsed ? 'w-20' : 'w-64'
            }`}
        >
            <div className="space-y-6 px-4 py-2">
                {/* Logo */}
                <div className="flex items-center gap-2 text-lg font-bold transition-all">
                    <MountainSnow className="w-6 h-6 text-icon"/>
                    {!collapsed && <span className="truncate">Buscando Armero</span>}
                </div>

                {/* Navegación */}
                <nav className="space-y-1">
                    {links.map(({to, icon, label}) => (
                        <Link
                            key={to}
                            to={to}
                            className={cn(
                                'flex items-center gap-2 p-2 rounded transition-colors',
                                'hover:bg-[var(--sidebar-hover)] text-[var(--sidebar-text)]',
                                pathname === to && 'bg-[var(--sidebar-active)] font-semibold'
                            )}
                        >
                            {icon}
                            {!collapsed && <span className="transition-all">{label}</span>}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Usuario */}
            <div className="pt-4 border-t px-4 pb-4">
                <ThemeToggle/>
            </div>
        </aside>
    )
}
