import { useState } from 'react';
import {
    Home, Layout, FileText, Edit3, Users, Bell, Gift, QrCode,
    Globe, CreditCard, TrendingUp, UserPlus, CheckCircle,
    Plus, ChevronDown
} from 'lucide-react';

interface DashboardProps {
    onBackToHome: () => void;
}

export default function Dashboard({ onBackToHome }: DashboardProps) {
    const [activeMenu, setActiveMenu] = useState('Dashboard');

    const menuItems = [
        { icon: <Home className="w-5 h-5" />, label: 'Dashboard' },
        { icon: <Layout className="w-5 h-5" />, label: 'Template' },
        { icon: <FileText className="w-5 h-5" />, label: 'Undangan Saya' },
        { icon: <Edit3 className="w-5 h-5" />, label: 'Edit Undangan' },
        { icon: <Users className="w-5 h-5" />, label: 'Data Tamu' },
        { icon: <Bell className="w-5 h-5" />, label: 'RSVP' },
        { icon: <Gift className="w-5 h-5" />, label: 'Amplop Digital' },
        { icon: <QrCode className="w-5 h-5" />, label: 'QR Check-In' },
        { icon: <Globe className="w-5 h-5" />, label: 'Domain' },
        { icon: <CreditCard className="w-5 h-5" />, label: 'Transaksi' },
    ];

    const statCards = [
        {
            icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
            iconBg: 'bg-blue-50',
            label: 'Total Kunjungan',
            value: '2.847',
            change: '+12%',
        },
        {
            icon: <UserPlus className="w-6 h-6 text-[#C4A265]" />,
            iconBg: 'bg-[#C4A265]/10',
            label: 'Jumlah Tamu',
            value: '248',
            change: '+8 baru',
        },
        {
            icon: <CheckCircle className="w-6 h-6 text-green-600" />,
            iconBg: 'bg-green-50',
            label: 'RSVP Masuk',
            value: '186',
            change: '75%',
        },
        {
            icon: <Gift className="w-6 h-6 text-purple-600" />,
            iconBg: 'bg-purple-50',
            label: 'Amplop Digital',
            value: 'Rp 12,4jt',
            change: '+450rb',
        },
    ];

    const rsvpList = [
        { name: 'Dewi Sartika', initial: 'D', time: '5 mnt lalu', status: 'Hadir' },
        { name: 'Ahmad Fauzi', initial: 'A', time: '12 mnt lalu', status: 'Hadir' },
        { name: 'Rina Kusuma', initial: 'R', time: '1 jam lalu', status: 'Tidak Hadir' },
        { name: 'Budi Santoso', initial: 'B', time: '2 jam lalu', status: 'Hadir' },
        { name: 'Maya Putri', initial: 'M', time: '3 jam lalu', status: 'Hadir' },
    ];

    const invitations = [
        { name: 'Anisa & Raka', theme: 'Elegant', visits: '2.847 kunjungan', status: 'Published' },
        { name: 'Draft Undangan 2', theme: 'Floral', visits: '— kunjungan', status: 'Draft' },
    ];

    return (
        <div className="min-h-screen bg-[#F5F1EB] flex">
            {/* SIDEBAR */}
            <aside className="w-64 bg-[#2C2420] text-white flex flex-col fixed h-full">
                <div className="p-6 border-b border-white/10">
                    <div
                        className="flex items-center gap-2 text-2xl font-serif font-bold cursor-pointer"
                        onClick={onBackToHome}
                    >
                        <span className="text-[#C4A265]">♥</span>
                        Invito
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => setActiveMenu(item.label)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeMenu === item.label
                                ? 'bg-[#C4A265] text-white'
                                : 'text-white/70 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                        <div className="w-10 h-10 rounded-full bg-[#C4A265] flex items-center justify-center font-bold">
                            A
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">Anisa Rahmawati</p>
                            <p className="text-xs text-white/60 truncate">anisa@email.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 ml-64">
                {/* Header */}
                <header className="bg-white border-b border-stone-200 px-8 py-5 flex items-center justify-between sticky top-0 z-40">
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-stone-900">Dashboard</h1>
                        <p className="text-sm text-stone-500">Selamat datang, Anisa!</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 hover:bg-stone-100 rounded-lg transition-colors">
                            <Bell className="w-5 h-5 text-stone-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button className="bg-[#C4A265] hover:bg-[#b08e55] text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors">
                            <Plus className="w-4 h-4" /> Buat Undangan
                        </button>
                    </div>
                </header>

                <div className="p-8 space-y-6">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {statCards.map((stat, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-stone-100">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                                        {stat.icon}
                                    </div>
                                    <span className="text-xs font-semibold text-green-600">{stat.change}</span>
                                </div>
                                <div className="text-3xl font-bold text-stone-900 mb-1">{stat.value}</div>
                                <div className="text-sm text-stone-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Chart + RSVP */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {/* Chart Area */}
                        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-stone-100">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-stone-900">Statistik Kunjungan</h3>
                                    <p className="text-sm text-stone-500">7 hari terakhir</p>
                                </div>
                                <div className="relative">
                                    <select className="appearance-none bg-stone-100 border-0 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-stone-700 cursor-pointer focus:outline-none">
                                        <option>7 hari</option>
                                        <option>30 hari</option>
                                        <option>3 bulan</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500" />
                                </div>
                            </div>

                            {/* Simple Chart Visualization */}
                            <div className="h-64 flex items-end justify-between gap-2 px-4">
                                {[120, 185, 150, 220, 380, 520, 450].map((val, i) => {
                                    const height = (val / 600) * 100;
                                    const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
                                    return (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                            <div
                                                className="w-full bg-[#C4A265]/20 rounded-t-lg relative group cursor-pointer hover:bg-[#C4A265]/40 transition-colors"
                                                style={{ height: `${height}%` }}
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    {val} views
                                                </div>
                                            </div>
                                            <span className="text-xs text-stone-500">{days[i]}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* RSVP Terbaru */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-100">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-lg font-bold text-stone-900">RSVP Terbaru</h3>
                                <button className="text-sm text-[#C4A265] font-semibold hover:underline">Lihat semua</button>
                            </div>
                            <div className="space-y-3">
                                {rsvpList.map((rsvp, i) => (
                                    <div key={i} className="flex items-center gap-3 pb-3 border-b border-stone-100 last:border-0 last:pb-0">
                                        <div className="w-9 h-9 rounded-full bg-[#C4A265]/10 flex items-center justify-center text-[#C4A265] font-bold text-sm">
                                            {rsvp.initial}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-stone-900 truncate">{rsvp.name}</p>
                                            <p className="text-xs text-stone-500">{rsvp.time}</p>
                                        </div>
                                        <span
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${rsvp.status === 'Hadir'
                                                ? 'bg-green-50 text-green-700'
                                                : 'bg-red-50 text-red-700'
                                                }`}
                                        >
                                            {rsvp.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Undangan Saya */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-stone-900">Undangan Saya</h3>
                            <button className="text-sm text-[#C4A265] font-semibold flex items-center gap-1 hover:underline">
                                <Plus className="w-4 h-4" /> Buat baru
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {invitations.map((inv, i) => (
                                <div key={i} className="border border-stone-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="h-40 bg-gradient-to-br from-[#f5e6d3] to-[#e8d5c4] flex items-center justify-center">
                                        <span className="text-xl font-serif font-bold text-[#C4A265]">{inv.name}</span>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-semibold text-stone-900">{inv.theme}</span>
                                            <span
                                                className={`text-xs font-semibold px-2 py-0.5 rounded ${inv.status === 'Published'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                    }`}
                                            >
                                                {inv.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-stone-500">{inv.visits}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Card Buat Baru */}
                            <button className="border-2 border-dashed border-stone-300 rounded-xl h-full min-h-[240px] flex flex-col items-center justify-center gap-3 hover:border-[#C4A265] hover:bg-[#C4A265]/5 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                                    <Plus className="w-6 h-6 text-stone-500" />
                                </div>
                                <span className="text-sm font-semibold text-stone-600">Buat Undangan Baru</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}