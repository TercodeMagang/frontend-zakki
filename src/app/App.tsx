import React, { useState, useEffect } from 'react';
import {
  Heart, ArrowRight, Smartphone, Edit3, Zap, Sparkles,
  Gift, Layers, Check, Play, Star, Menu, X, Eye,
  Mail, Instagram, Facebook, Twitter,
  Package, CreditCard, CheckCircle, Clock, Copy, Download,
  QrCode, Shield, Lock, User, LogOut, Settings,
  History, Plus, Trash2, Image as ImageIcon, Music, Save,
  Calendar, Gift as GiftIcon, MessageCircle
} from 'lucide-react';

// --- DATA MOCKUP ---
const THEMES = [
  { id: 1, name: 'Elegant', badge: 'Populer', gradient: 'from-[#f5e6d3] to-[#e8d5c4]', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&crop=face' },
  { id: 2, name: 'Floral', badge: null, gradient: 'from-[#ffe4e1] to-[#ffc0cb]', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop' },
  { id: 3, name: 'Minimalist', badge: 'Baru', gradient: 'from-[#f0f0f0] to-[#d3d3d3]', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop' },
  { id: 4, name: 'Modern', badge: null, gradient: 'from-[#2c2c2c] to-[#4a4a4a]', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop' },
  { id: 5, name: 'Traditional', badge: null, gradient: 'from-[#d4a574] to-[#b8956a]', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop' },
  { id: 6, name: 'Luxury', badge: 'Premium', gradient: 'from-[#1a1a1a] to-[#333333]', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop' },
];

const FEATURES = [
  { icon: <Smartphone className="w-6 h-6" />, title: 'Mudah Digunakan', desc: 'Buat undangan dalam hitungan menit tanpa skill desain.' },
  { icon: <Edit3 className="w-6 h-6" />, title: 'Edit Lewat HP', desc: 'Akses dan edit undangan kapan saja dari perangkat apapun.' },
  { icon: <Zap className="w-6 h-6" />, title: 'Proses Cepat', desc: 'Undangan siap dibagikan hanya dalam waktu singkat.' },
  { icon: <Sparkles className="w-6 h-6" />, title: 'Tampilan Elegan', desc: 'Desain premium yang memukau setiap tamu undangan Anda.' },
  { icon: <Gift className="w-6 h-6" />, title: 'Harga Terjangkau', desc: 'Paket lengkap dengan harga yang ramah di kantong.' },
  { icon: <Layers className="w-6 h-6" />, title: 'Banyak Pilihan Tema', desc: 'Ratusan tema siap pakai untuk setiap selera dan konsep.' },
];

const TESTIMONIALS = [
  { name: 'Anisa & Raka', text: 'Undangannya sangat elegan dan tamunya senang bisa RSVP langsung lewat HP. Recommended banget!', role: 'Pengantin Baru', avatar: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=100&h=100&fit=crop&crop=face' },
  { name: 'Budi & Siti', text: 'Proses pembuatannya cepat banget, kurang dari 10 menit udah jadi. Desainnya juga mewah.', role: 'Pengantin Baru', avatar: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?w=100&h=100&fit=crop&crop=face' },
  { name: 'Dewi & Andi', text: 'Harganya terjangkau tapi kualitasnya nggak murahan. Fitur amplop digitalnya sangat membantu.', role: 'Pengantin Baru', avatar: 'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=100&h=100&fit=crop&crop=face' },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<any>(null);

  // ✅ State untuk demo template & posisi scroll
  const [showDemo, setShowDemo] = useState<any>(null);
  const [demoScrollPos, setDemoScrollPos] = useState(0);

  // ✅ State untuk alur Riwayat -> Pilih Template -> Edit
  const [showTemplateSelect, setShowTemplateSelect] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState<any>(null);

  // ✅ State untuk preview hasil undangan
  const [showInvitationPreview, setShowInvitationPreview] = useState(false);

  // ✅ STATE BARU UNTUK LOGIN, REGISTER & PROFIL CUSTOMER
  const [showCustomerLogin, setShowCustomerLogin] = useState(false);
  const [showCustomerRegister, setShowCustomerRegister] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  // ✅ PERUBAHAN: Mengubah showPurchaseHistory menjadi isHistoryOverlay
  const [isHistoryOverlay, setIsHistoryOverlay] = useState(false);

  const [showEditor, setShowEditor] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null);
  const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]);
  const [editorData, setEditorData] = useState({
    template: '',
    brideName: '',
    groomName: '',
    date: '',
    description: '',
    invitedName: '',
    gallery: [] as string[],
    logoSound: '',
    guests: [] as string[],
    newGuest: ''
  });

  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const [pendingPackage, setPendingPackage] = useState<string | null>(null);

  // ✅ State untuk data profil yang bisa diubah
  const [profileData, setProfileData] = useState({
    name: 'Anisa Rahmawati',
    email: 'anisa@email.com',
    password: ''
  });

  // ✅ State untuk form register
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string>('Standard');
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [paymentTab, setPaymentTab] = useState('va');
  const [savedScrollPos, setSavedScrollPos] = useState(0);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    weddingDate: '',
    fullName: '',
    email: '',
    whatsapp: '',
  });

  // ✅ Load data dari localStorage saat app dimulai
  useEffect(() => {
    const savedPurchases = localStorage.getItem('invito_purchases');
    if (savedPurchases) {
      setPurchaseHistory(JSON.parse(savedPurchases));
    }
  }, []);

  // ✅ Save purchase history ke localStorage
  useEffect(() => {
    localStorage.setItem('invito_purchases', JSON.stringify(purchaseHistory));
  }, [purchaseHistory]);

  useEffect(() => {
    if (showCheckout && checkoutStep === 3) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          let { hours, minutes, seconds } = prev;
          if (seconds > 0) seconds--;
          else if (minutes > 0) { minutes--; seconds = 59; }
          else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
          return { hours, minutes, seconds };
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showCheckout, checkoutStep]);

  // Fungsi helper untuk scroll ke section tertentu
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset -80px untuk mengakomodasi navbar fixed
      const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleSelectPackage = (packageName: string) => {
    if (!isCustomerLoggedIn) {
      setPendingPackage(packageName);
      setShowCustomerLogin(true);
    } else {
      setSavedScrollPos(window.scrollY);
      setSelectedPackage(packageName);
      setCheckoutStep(1);
      setShowCheckout(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCustomerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCustomerLoggedIn(true);
    setShowCustomerLogin(false);

    if (pendingPackage) {
      setSavedScrollPos(window.scrollY);
      setSelectedPackage(pendingPackage);
      setCheckoutStep(1);
      setShowCheckout(true);
      setPendingPackage(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCustomerRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      alert('Password dan konfirmasi password tidak cocok!');
      return;
    }

    if (registerData.password.length < 6) {
      alert('Password minimal 6 karakter!');
      return;
    }

    setIsCustomerLoggedIn(true);
    setShowCustomerRegister(false);

    setProfileData({
      name: registerData.name,
      email: registerData.email,
      password: registerData.password
    });

    setRegisterData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    alert('Akun berhasil dibuat! Selamat datang di Invito.');

    if (pendingPackage) {
      setSavedScrollPos(window.scrollY);
      setSelectedPackage(pendingPackage);
      setCheckoutStep(1);
      setShowCheckout(true);
      setPendingPackage(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCustomerLogout = () => {
    setIsCustomerLoggedIn(false);
    setShowCheckout(false);
    setCheckoutStep(1);
    setSelectedPayment(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setShowCheckout(false);
    setCheckoutStep(1);
    setSelectedPayment(null);
    setTimeout(() => {
      window.scrollTo({ top: savedScrollPos, behavior: 'auto' });
    }, 50);
  };

  const handleNextToPayment = () => {
    setCheckoutStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePayNow = () => {
    if (!selectedPayment) return;
    setCheckoutStep(3);

    const newPurchase = {
      id: Date.now(),
      package: selectedPackage,
      date: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      invitationData: null
    };

    setPurchaseHistory(prev => [...prev, newPurchase]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyVA = () => {
    navigator.clipboard.writeText('8808 8088 5050 1234');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ✅ Fungsi untuk menyimpan editor
  const saveEditor = () => {
    if (!selectedPurchase) return;

    const updatedPurchases = purchaseHistory.map(p => {
      if (p.id === selectedPurchase.id) {
        return { ...p, invitationData: editorData };
      }
      return p;
    });

    setPurchaseHistory(updatedPurchases);
    alert('Undangan berhasil disimpan!');
    setShowEditor(false);
    setSelectedPurchase(null);
    setShowInvitationPreview(true); // ✅ Tampilkan preview setelah simpan
  };

  // ✅ Fungsi untuk menambah tamu
  const addGuest = () => {
    if (editorData.newGuest.trim() && !editorData.newGuest.includes(' ')) {
      setEditorData({
        ...editorData,
        guests: [...editorData.guests, editorData.newGuest.trim()],
        newGuest: ''
      });
    } else if (editorData.newGuest.includes(' ')) {
      alert('Nama tamu tidak boleh ada spasi!');
    }
  };

  // ✅ Fungsi untuk menghapus tamu
  const removeGuest = (index: number) => {
    const updatedGuests = editorData.guests.filter((_, i) => i !== index);
    setEditorData({ ...editorData, guests: updatedGuests });
  };

  const formatRupiah = (num: number) => 'Rp ' + num.toLocaleString('id-ID');

  const packagesData = [
    { id: 'Basic', name: 'Basic', price: 99000, originalPrice: null, popular: false, features: '1 tema pilihan • Link undangan digital • RSVP & ucapan tamu +3 lainnya' },
    { id: 'Standard', name: 'Standard', price: 199000, originalPrice: 299000, popular: true, features: 'Semua tema + custom • Custom domain .id • RSVP & amplop digital +4 lainnya' },
    { id: 'Premium', name: 'Premium', price: 349000, originalPrice: 499000, popular: false, features: 'Semua fitur Standard • Live streaming • QR Code Check-In +4 lainnya' },
  ];

  const paymentMethods = [
    { id: 'bca', name: 'BCA Virtual Account', color: 'bg-blue-700', logo: 'BCA' },
    { id: 'bni', name: 'BNI Virtual Account', color: 'bg-orange-600', logo: 'BNI' },
    { id: 'bri', name: 'BRI Virtual Account', color: 'bg-blue-800', logo: 'BRI' },
    { id: 'mandiri', name: 'Mandiri Virtual Account', color: 'bg-yellow-600', logo: 'MANDIRI' },
  ];

  const currentPackage = packagesData.find(p => p.id === selectedPackage) || packagesData[1];
  const currentPayment = paymentMethods.find(p => p.id === selectedPayment);

  // ================= HALAMAN PREVIEW UNDANGAN HASIL EDIT =================
  if (showInvitationPreview) {
    const selectedTheme = THEMES.find(t => t.name === editorData.template) || THEMES[0];

    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-2xl font-serif font-bold text-stone-900">
              <Heart className="w-6 h-6 text-[#C4A265]" /> Invito
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowInvitationPreview(false);
                  setEditingPurchase(null);
                  setIsHistoryOverlay(true); // ✅ Kembali ke overlay riwayat
                }}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 font-medium"
              >
                Kembali
              </button>
              <button
                onClick={() => {
                  setShowInvitationPreview(false);
                  setShowEditor(true);
                  setSelectedPurchase(editingPurchase);
                }}
                className="px-6 py-2 bg-[#C4A265] text-white rounded-xl font-bold hover:bg-[#b08e55] flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" /> Edit Lagi
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">Undangan Anda Siap!</h1>
            <p className="text-stone-500">Preview undangan digital yang telah Anda buat</p>
          </div>

          {/* Preview Card */}
          <div className={`bg-gradient-to-br ${selectedTheme.gradient} rounded-3xl overflow-hidden shadow-2xl`}>
            {/* Header Image */}
            <div className="relative h-96 overflow-hidden">
              <img
                src={selectedTheme.image}
                alt={selectedTheme.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-sm uppercase tracking-widest mb-2">The Wedding Of</p>
                  <h2 className="text-5xl font-serif font-bold mb-2">
                    {editorData.brideName || 'Bride'} & {editorData.groomName || 'Groom'}
                  </h2>
                  {editorData.date && (
                    <p className="text-lg">{new Date(editorData.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  )}
                </div>
              </div>
              {selectedTheme.badge && (
                <span className="absolute top-4 left-4 bg-[#C4A265] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {selectedTheme.badge}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-8 bg-white/95 backdrop-blur-sm">
              {editorData.description && (
                <div className="mb-8 text-center">
                  <p className="text-stone-700 italic text-lg">{editorData.description}</p>
                </div>
              )}

              {editorData.invitedName && (
                <div className="mb-8 text-center">
                  <p className="text-stone-600 mb-2">Kepada Yth.</p>
                  <p className="text-2xl font-bold text-stone-900">{editorData.invitedName}</p>
                </div>
              )}

              {editorData.guests.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-stone-900 mb-4 text-center">Daftar Tamu Undangan</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {editorData.guests.map((guest, index) => (
                      <div key={index} className="bg-stone-50 px-4 py-2 rounded-lg text-center text-sm text-stone-700">
                        {guest}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 justify-center mt-8">
                <button className="bg-[#C4A265] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#b08e55] transition-colors">
                  Bagikan Undangan
                </button>
                <button className="border-2 border-[#C4A265] text-[#C4A265] px-8 py-3 rounded-xl font-bold hover:bg-[#C4A265] hover:text-white transition-colors">
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
            <h3 className="text-lg font-bold text-stone-900 mb-4">Detail Undangan</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-stone-500">Template</p>
                <p className="font-semibold text-stone-900">{selectedTheme.name}</p>
              </div>
              <div>
                <p className="text-stone-500">Mempelai</p>
                <p className="font-semibold text-stone-900">{editorData.brideName} & {editorData.groomName}</p>
              </div>
              <div>
                <p className="text-stone-500">Tanggal Pernikahan</p>
                <p className="font-semibold text-stone-900">{editorData.date ? new Date(editorData.date).toLocaleDateString('id-ID') : '-'}</p>
              </div>
              <div>
                <p className="text-stone-500">Jumlah Tamu</p>
                <p className="font-semibold text-stone-900">{editorData.guests.length} tamu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= DEMO TEMPLATE VIEW =================
  if (showDemo) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${showDemo.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        </div>

        <nav className="relative z-10 p-6 flex justify-between items-center">
          <button
            onClick={() => {
              setShowDemo(null);
              setTimeout(() => {
                window.scrollTo({ top: demoScrollPos, behavior: 'auto' });
              }, 100);
            }}
            className="flex items-center gap-2 text-white font-medium hover:opacity-80"
          >
            <ArrowRight className="w-5 h-5 rotate-180" /> Kembali
          </button>
          <div className="text-white font-serif text-xl font-bold">Invito</div>
        </nav>

        <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 text-center text-white">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-widest mb-4 opacity-80">Undangan Pernikahan</p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
              {showDemo.name === 'Elegant' && 'Anisa & Raka'}
              {showDemo.name === 'Floral' && 'Budi & Siti'}
              {showDemo.name === 'Minimalist' && 'Dewi & Andi'}
              {showDemo.name === 'Modern' && 'Citra & Dimas'}
              {showDemo.name === 'Traditional' && 'Eka & Fajar'}
              {showDemo.name === 'Luxury' && 'Grace & Henry'}
            </h1>
            <p className="text-lg opacity-80">Sabtu, 25 April 2026</p>
          </div>

          <button className="bg-white/20 backdrop-blur-sm border-2 border-white px-8 py-3 rounded-full font-semibold mb-12 hover:bg-white/30 transition-all">
            Buka Undangan
          </button>

          <div className="mb-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
            <p className="text-lg italic opacity-90">
              "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya."
            </p>
            <p className="mt-2 text-sm opacity-70">QS. Ar-Rum: 21</p>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="text-2xl font-serif font-bold mb-4">Akad Nikah</h3>
              <p className="mb-2">Sabtu, 25 April 2026</p>
              <p className="opacity-80">Masjid Agung Al-Hikmah</p>
              <p className="text-sm opacity-70">Jl. Sudirman No. 123, Jakarta</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="text-2xl font-serif font-bold mb-4">Resepsi</h3>
              <p className="mb-2">Sabtu, 25 April 2026 | 11:00 - 15:00</p>
              <p className="opacity-80">Grand Ballroom Hotel Mulia</p>
              <p className="text-sm opacity-70">Jl. Gatot Subroto, Jakarta</p>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/10 backdrop-blur-md border-t border-white/20">
            <div className="max-w-2xl mx-auto flex justify-around">
              <button className="p-3 rounded-full hover:bg-white/20 transition-colors"><Heart className="w-5 h-5" /></button>
              <button className="p-3 rounded-full hover:bg-white/20 transition-colors"><Calendar className="w-5 h-5" /></button>
              <button className="p-3 rounded-full hover:bg-white/20 transition-colors"><GiftIcon className="w-5 h-5" /></button>
              <button className="p-3 rounded-full hover:bg-white/20 transition-colors"><MessageCircle className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="mt-12 pb-20 text-sm opacity-70">
            <p>Powered by Invito</p>
          </div>
        </div>
      </div>
    );
  }

  // ================= HALAMAN PILIH TEMPLATE DARI RIWAYAT =================
  if (showTemplateSelect && editingPurchase) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-2xl font-serif font-bold text-stone-900">
              <Layers className="w-6 h-6 text-[#C4A265]" /> Pilih Template
            </div>
            <button
              onClick={() => {
                setShowTemplateSelect(false);
                setEditingPurchase(null);
                setIsHistoryOverlay(true); // ✅ Kembali ke overlay riwayat
              }}
              className="text-stone-600 hover:text-stone-900 font-medium flex items-center gap-2"
            >
              <X className="w-5 h-5" /> Tutup
            </button>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">Pilih Template untuk Diedit</h1>
            <p className="text-stone-500">Pilih template yang ingin Anda gunakan untuk undangan ini</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {THEMES.map((theme) => (
              <div key={theme.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="relative h-64 overflow-hidden group">
                  <img src={theme.image} alt={theme.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  {theme.badge && (
                    <span className="absolute top-4 left-4 bg-[#C4A265] text-white text-xs font-bold px-3 py-1 rounded-full z-10">{theme.badge}</span>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <span className={`text-3xl font-serif font-bold drop-shadow-lg ${theme.name === 'Modern' || theme.name === 'Luxury' ? 'text-white' : 'text-[#C4A265]'}`}>
                      {theme.name}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{theme.name}</h3>
                  <p className="text-sm text-stone-500 mb-4">24 variasi tersedia</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setDemoScrollPos(window.scrollY);
                        setShowDemo(theme);
                      }}
                      className="flex-1 border border-stone-200 py-2.5 rounded-lg font-semibold text-sm hover:border-[#C4A265] hover:text-[#C4A265] transition-colors"
                    >
                      Lihat Demo
                    </button>
                    <button
                      onClick={() => {
                        setEditorData({
                          ...editorData,
                          template: theme.name
                        });
                        setShowTemplateSelect(false);
                        // Tidak perlu setIsHistoryOverlay(false) karena akan pindah ke Editor
                        setSelectedPurchase(editingPurchase);
                        setShowEditor(true);
                      }}
                      className="flex-1 bg-[#C4A265] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#b08e55] transition-colors"
                    >
                      Gunakan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ================= OVERLAY RIWAYAT PEMBELIAN (FIXED POSITION) =================
  // PERUBAHAN BESAR: Ini sekarang adalah overlay fixed, bukan halaman penuh
  const HistoryOverlay = isHistoryOverlay ? (
    <div className="fixed inset-0 z-[60] bg-[#FAF8F5] overflow-y-auto animate-fade-in">
      <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-serif font-bold text-stone-900">
            <Heart className="w-6 h-6 text-[#C4A265] fill-[#C4A265]" /> Invito
          </div>
          {/* PERUBAHAN: Tombol tutup hanya mematikan overlay */}
          <button onClick={() => setIsHistoryOverlay(false)} className="text-stone-600 hover:text-stone-900 font-medium flex items-center gap-2">
            <X className="w-5 h-5" /> Tutup
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">Riwayat Pembelian</h1>

        {purchaseHistory.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <Package className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500 text-lg">Belum ada pembelian</p>
            <button
              onClick={() => {
                setIsHistoryOverlay(false); // Tutup overlay dulu
                handleSelectPackage('Standard');
              }}
              className="mt-4 bg-[#C4A265] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#b08e55]"
            >
              Beli Paket Sekarang
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {purchaseHistory.map((purchase) => {
              const isExpired = new Date(purchase.expiryDate) < new Date();
              const daysLeft = Math.ceil((new Date(purchase.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              const invitationData = purchase.invitationData;
              const selectedTheme = THEMES.find(t => t.name === invitationData?.template) || THEMES[0];

              return (
                <div key={purchase.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                  {/* Preview Kartu Undangan */}
                  <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${selectedTheme.gradient}`}>
                    <img
                      src={selectedTheme.image}
                      alt={selectedTheme.name}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-6 text-center">
                      {invitationData?.brideName && invitationData?.groomName ? (
                        <>
                          <p className="text-xs uppercase tracking-widest mb-2 opacity-80">The Wedding Of</p>
                          <h3 className="text-3xl font-serif font-bold mb-1">
                            {invitationData.brideName.toLowerCase()} & {invitationData.groomName.toLowerCase()}
                          </h3>
                          {invitationData.date && (
                            <p className="text-sm opacity-90">
                              {new Date(invitationData.date).toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-lg italic opacity-80">Belum diedit</p>
                      )}
                    </div>
                    {selectedTheme.badge && (
                      <span className="absolute top-4 left-4 bg-[#C4A265] text-white text-xs font-bold px-3 py-1 rounded-full">
                        {selectedTheme.badge}
                      </span>
                    )}
                  </div>

                  {/* Info Paket & Status */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-stone-900">Paket {purchase.package}</h3>
                      {isExpired ? (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">Kadaluarsa</span>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Aktif</span>
                      )}
                    </div>

                    <div className="space-y-2 text-sm text-stone-600 mb-6">
                      <p>Tanggal Pembelian: {new Date(purchase.date).toLocaleDateString('id-ID')}</p>
                      <p className={isExpired ? 'text-red-600' : 'text-green-600'}>
                        {isExpired ? 'Kadaluarsa pada: ' : 'Berlaku sampai: '}
                        {new Date(purchase.expiryDate).toLocaleDateString('id-ID')}
                      </p>
                      {!isExpired && <p className="text-stone-500">Sisa waktu: {daysLeft} hari</p>}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditingPurchase(purchase);
                          setShowTemplateSelect(true);
                          // Overlay riwayat otomatis tertutup karena pindah halaman
                        }}
                        disabled={isExpired}
                        className={`flex-1 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${isExpired
                          ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                          : 'bg-[#C4A265] text-white hover:bg-[#b08e55]'
                          }`}
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>
                      {invitationData && (
                        <button
                          onClick={() => {
                            setEditorData(invitationData);
                            setSelectedPurchase(purchase);
                            setShowInvitationPreview(true);
                            // Overlay riwayat otomatis tertutup karena pindah halaman
                          }}
                          className="flex-1 px-4 py-3 rounded-xl font-bold border-2 border-[#C4A265] text-[#C4A265] hover:bg-[#C4A265] hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Lihat
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  ) : null;

  // ================= EDITOR UNDANGAN DIGITAL =================
  if (showEditor && selectedPurchase) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-2xl font-serif font-bold text-stone-900">
              <Edit3 className="w-6 h-6 text-[#C4A265]" /> Editor Undangan
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowEditor(false);
                  setIsHistoryOverlay(true); // ✅ Kembali ke overlay riwayat
                }}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 font-medium"
              >
                Batal
              </button>
              <button
                onClick={saveEditor}
                className="px-6 py-2 bg-[#C4A265] text-white rounded-xl font-bold hover:bg-[#b08e55] flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Simpan
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Editor Undangan Digital</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Template</label>
                <select
                  value={editorData.template}
                  onChange={(e) => setEditorData({ ...editorData, template: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265]"
                >
                  <option value="">Pilih Template</option>
                  {THEMES.map(theme => (
                    <option key={theme.id} value={theme.name}>{theme.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Nama Pengantin Wanita</label>
                  <input
                    type="text"
                    value={editorData.brideName}
                    onChange={(e) => setEditorData({ ...editorData, brideName: e.target.value })}
                    className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265]"
                    placeholder="Nama mempelai wanita"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Nama Pengantin Pria</label>
                  <input
                    type="text"
                    value={editorData.groomName}
                    onChange={(e) => setEditorData({ ...editorData, groomName: e.target.value })}
                    className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265]"
                    placeholder="Nama mempelai pria"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Tanggal Pernikahan</label>
                <input
                  type="date"
                  value={editorData.date}
                  onChange={(e) => setEditorData({ ...editorData, date: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Deskripsi</label>
                <textarea
                  value={editorData.description}
                  onChange={(e) => setEditorData({ ...editorData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265] h-32"
                  placeholder="Deskripsi acara pernikahan..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Nama yang Diundang</label>
                <input
                  type="text"
                  value={editorData.invitedName}
                  onChange={(e) => setEditorData({ ...editorData, invitedName: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265]"
                  placeholder="Nama tamu yang diundang"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Galeri</label>
                <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center">
                  <ImageIcon className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                  <p className="text-sm text-stone-500">Upload foto galeri (fitur coming soon)</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Logo Back Sound</label>
                <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center">
                  <Music className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                  <p className="text-sm text-stone-500">Upload lagu (fitur coming soon)</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Tambah Tamu</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editorData.newGuest}
                    onChange={(e) => setEditorData({ ...editorData, newGuest: e.target.value })}
                    className="flex-1 px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265]"
                    placeholder="Nama tamu (tanpa spasi)"
                    onKeyPress={(e) => e.key === 'Enter' && addGuest()}
                  />
                  <button
                    onClick={addGuest}
                    className="px-6 py-3 bg-[#C4A265] text-white rounded-lg font-bold hover:bg-[#b08e55]"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-stone-500 mt-1">* Nama tamu tidak boleh ada spasi</p>

                {editorData.guests.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {editorData.guests.map((guest, index) => (
                      <div key={index} className="flex items-center justify-between bg-stone-50 px-4 py-2 rounded-lg">
                        <span className="text-sm text-stone-700">{guest}</span>
                        <button
                          onClick={() => removeGuest(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= CUSTOMER REGISTER (SPLIT LAYOUT) =================
  if (showCustomerRegister) {
    return (
      <div className="min-h-screen flex bg-white">
        {/* SISI KIRI - GAMBAR FLORAL */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=900&fit=crop"
            alt="Wedding Setup"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B6F47]/80 via-[#C4A265]/70 to-[#1a1a1a]/80"></div>

          {/* Konten Kiri */}
          <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <span className="text-2xl font-serif font-bold">Invito</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl font-serif font-bold leading-tight">
                Mulai Cerita<br />Cinta Anda
              </h1>
              <p className="text-lg opacity-90 max-w-md leading-relaxed">
                Bergabunglah dengan ribuan pasangan yang telah mempercayakan momen spesial mereka kepada kami.
              </p>
              <div className="flex items-center gap-2 text-sm opacity-80">
                <span className="w-12 h-px bg-white"></span>
                <span>Create your account</span>
              </div>
            </div>

            <p className="text-sm opacity-70">© 2026 Invito. All rights reserved.</p>
          </div>
        </div>

        {/* SISI KANAN - FORM REGISTER */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-[#FAF8F5]">
          <div className="w-full max-w-md">
            {/* Logo Mobile */}
            <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
              <Heart className="w-6 h-6 text-[#C4A265] fill-[#C4A265]" />
              <span className="text-2xl font-serif font-bold text-stone-900">Invito</span>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">Daftar Akun</h2>
              <p className="text-stone-500">Sudah punya akun?{' '}
                <button
                  onClick={() => {
                    setShowCustomerRegister(false);
                    setShowCustomerLogin(true);
                  }}
                  className="text-[#C4A265] font-bold hover:underline"
                >
                  Masuk di sini
                </button>
              </p>
            </div>

            <form onSubmit={handleCustomerRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C4A265] focus:ring-2 focus:ring-[#C4A265]/20 transition-all"
                    placeholder="Nama lengkap Anda"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Alamat Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C4A265] focus:ring-2 focus:ring-[#C4A265]/20 transition-all"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="password"
                    required
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C4A265] focus:ring-2 focus:ring-[#C4A265]/20 transition-all"
                    placeholder="Minimal 6 karakter"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Konfirmasi Password</label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="password"
                    required
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C4A265] focus:ring-2 focus:ring-[#C4A265]/20 transition-all"
                    placeholder="Ulangi password"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input type="checkbox" id="terms" required className="w-4 h-4 mt-1 accent-[#C4A265]" />
                <label htmlFor="terms" className="text-xs text-stone-600">
                  Saya menyetujui <span className="text-[#C4A265] font-semibold">Syarat & Ketentuan</span> serta <span className="text-[#C4A265] font-semibold">Kebijakan Privasi</span> Invito
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#C4A265] to-[#8B6F47] hover:from-[#b08e55] hover:to-[#6d5636] text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#C4A265]/30 mt-2"
              >
                Daftar Sekarang
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-stone-200"></div>
              <span className="text-xs text-stone-400">atau daftar dengan</span>
              <div className="flex-1 h-px bg-stone-200"></div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-stone-200 rounded-xl hover:bg-white transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                <span className="text-sm font-medium text-stone-700">Google</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-stone-200 rounded-xl hover:bg-white transition-colors">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                <span className="text-sm font-medium text-stone-700">Facebook</span>
              </button>
            </div>

            <button
              onClick={() => setShowCustomerRegister(false)}
              className="w-full mt-6 text-sm text-stone-500 hover:text-stone-700 flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= MODAL PENGATURAN PROFIL =================
  if (showProfileSettings) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl">
          <button
            onClick={() => setShowProfileSettings(false)}
            className="absolute top-4 right-4 z-10 p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-stone-500" />
          </button>

          <div className="p-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 text-2xl font-serif font-bold text-stone-900 mb-2">
                <Settings className="w-6 h-6 text-[#C4A265]" />
                Pengaturan Profil
              </div>
              <p className="text-stone-500">Perbarui informasi akun Anda</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setShowProfileSettings(false);
              alert('Profil berhasil diperbarui!');
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265] focus:ring-1 focus:ring-[#C4A265]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Alamat Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265] focus:ring-1 focus:ring-[#C4A265]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Password Baru <span className="text-stone-400 font-normal">(Kosongkan jika tidak diubah)</span></label>
                <input
                  type="password"
                  value={profileData.password}
                  onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265] focus:ring-1 focus:ring-[#C4A265]"
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="w-full bg-[#C4A265] hover:bg-[#b08e55] text-white py-3 rounded-lg font-bold transition-colors mt-2">Simpan Perubahan</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ================= CUSTOMER LOGIN (SPLIT LAYOUT) =================
  if (showCustomerLogin) {
    return (
      <div className="min-h-screen flex bg-white">
        {/* SISI KIRI - GAMBAR FLORAL */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=900&fit=crop"
            alt="Floral Wedding"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#C4A265]/80 via-[#8B6F47]/70 to-[#2c2c2c]/80"></div>

          {/* Konten Kiri */}
          <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <span className="text-2xl font-serif font-bold">Invito</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl font-serif font-bold leading-tight">
                Selamat Datang<br />Kembali
              </h1>
              <p className="text-lg opacity-90 max-w-md leading-relaxed">
                Masuk untuk melanjutkan perjalanan membuat undangan pernikahan impian Anda.
              </p>
              <div className="flex items-center gap-2 text-sm opacity-80">
                <span className="w-12 h-px bg-white"></span>
                <span>Sign in to continue</span>
              </div>
            </div>

            <p className="text-sm opacity-70">© 2026 Invito. All rights reserved.</p>
          </div>
        </div>

        {/* SISI KANAN - FORM LOGIN */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-[#FAF8F5]">
          <div className="w-full max-w-md">
            {/* Logo Mobile */}
            <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
              <Heart className="w-6 h-6 text-[#C4A265] fill-[#C4A265]" />
              <span className="text-2xl font-serif font-bold text-stone-900">Invito</span>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">Masuk</h2>
              <p className="text-stone-500">Belum punya akun?{' '}
                <button
                  onClick={() => {
                    setShowCustomerLogin(false);
                    setShowCustomerRegister(true);
                  }}
                  className="text-[#C4A265] font-bold hover:underline"
                >
                  Daftar di sini
                </button>
              </p>
            </div>

            <form onSubmit={handleCustomerLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Alamat Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="email"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C4A265] focus:ring-2 focus:ring-[#C4A265]/20 transition-all"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-stone-700">Password</label>
                  <button type="button" className="text-xs text-[#C4A265] hover:underline">Lupa password?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="password"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C4A265] focus:ring-2 focus:ring-[#C4A265]/20 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4 accent-[#C4A265]" />
                <label htmlFor="remember" className="text-sm text-stone-600">Ingat saya</label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#C4A265] to-[#8B6F47] hover:from-[#b08e55] hover:to-[#6d5636] text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#C4A265]/30"
              >
                Masuk
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-stone-200"></div>
              <span className="text-xs text-stone-400">atau masuk dengan</span>
              <div className="flex-1 h-px bg-stone-200"></div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-stone-200 rounded-xl hover:bg-white transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                <span className="text-sm font-medium text-stone-700">Google</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-stone-200 rounded-xl hover:bg-white transition-colors">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                <span className="text-sm font-medium text-stone-700">Facebook</span>
              </button>
            </div>

            <button
              onClick={() => setShowCustomerLogin(false)}
              className="w-full mt-6 text-sm text-stone-500 hover:text-stone-700 flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= STEP 3: KONFIRMASI =================
  if (showCheckout && checkoutStep === 3) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xl font-serif font-bold text-stone-900">
              <Heart className="w-5 h-5 text-[#C4A265] fill-[#C4A265]" /> Invito
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full">
              <Clock className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-700">Menunggu Pembayaran</span>
            </div>
          </div>
        </nav>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">Selesaikan Pembayaran</h1>
            <p className="text-stone-500">Selesaikan pembayaran sebelum waktu habis</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 mb-6">
            <p className="text-center text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">Batas Waktu Pembayaran</p>
            <div className="flex items-center justify-center gap-3">
              {['hours', 'minutes', 'seconds'].map((unit, idx) => (
                <React.Fragment key={unit}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#FAF8F5] rounded-xl flex items-center justify-center border border-stone-200">
                      <span className="text-2xl font-bold text-[#C4A265]">{String(timeLeft[unit as keyof typeof timeLeft]).padStart(2, '0')}</span>
                    </div>
                    <p className="text-xs text-stone-500 mt-2 capitalize">{unit === 'hours' ? 'Jam' : unit === 'minutes' ? 'Menit' : 'Detik'}</p>
                  </div>
                  {idx < 2 && <span className="text-2xl font-bold text-stone-400">:</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-stone-900">{currentPayment?.name}</h3>
                <span className={`text-xs font-bold text-white px-3 py-1 rounded-full ${currentPayment?.color}`}>{currentPayment?.logo}</span>
              </div>
              <p className="text-sm text-stone-500 mb-2">Nomor Virtual Account:</p>
              <div className="bg-[#FAF8F5] rounded-xl p-4 flex items-center justify-between">
                <span className="text-xl font-bold text-stone-900 tracking-wider">8808 8088 5050 1234</span>
                <button onClick={handleCopyVA} className="flex items-center gap-1 text-sm text-[#C4A265] hover:text-[#b08e55] font-medium">
                  <Copy className="w-4 h-4" /> {copied ? 'Tersalin!' : 'Salin'}
                </button>
              </div>
              <div className="mt-6">
                <h4 className="font-bold text-stone-900 mb-3">Cara Bayar:</h4>
                <ol className="space-y-2 text-sm text-stone-600">
                  <li className="flex gap-2"><span className="font-bold text-[#C4A265]">1.</span> Buka aplikasi mobile banking</li>
                  <li className="flex gap-2"><span className="font-bold text-[#C4A265]">2.</span> Pilih menu Transfer ke Virtual Account</li>
                  <li className="flex gap-2"><span className="font-bold text-[#C4A265]">3.</span> Masukkan nomor VA di atas</li>
                  <li className="flex gap-2"><span className="font-bold text-[#C4A265]">4.</span> Konfirmasi pembayaran</li>
                </ol>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
              <h3 className="font-bold text-stone-900 mb-4">Detail Pesanan</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm"><span className="text-stone-500">No. Invoice</span><span className="font-mono font-semibold text-[#C4A265]">INV-20250112-001</span></div>
                <div className="flex justify-between text-sm"><span className="text-stone-500">Nama</span><span className="font-semibold text-stone-900">{formData.fullName || profileData.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-stone-500">Paket</span><span className="font-semibold text-stone-900">{currentPackage.name}</span></div>
                <div className="border-t border-stone-100 pt-3 flex justify-between">
                  <span className="font-bold text-stone-900">Total Bayar</span>
                  <span className="font-bold text-lg text-[#C4A265]">{formatRupiah(currentPackage.price)}</span>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setShowCheckout(false);
                    setIsHistoryOverlay(true); // ✅ Membuka overlay riwayat
                  }}
                  className="flex-1 bg-[#C4A265] hover:bg-[#b08e55] text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  Lihat Riwayat
                </button>
                <button className="flex-1 border border-stone-200 hover:border-[#C4A265] text-stone-700 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"><Download className="w-4 h-4" /> Instruksi</button>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-3">
            <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-yellow-600 text-sm font-bold">!</span></div>
            <p className="text-sm text-yellow-800">Undangan Anda akan aktif otomatis setelah pembayaran berhasil dikonfirmasi. Proses ini biasanya memakan waktu 1-5 menit.</p>
          </div>
        </div>
      </div>
    );
  }

  // ================= STEP 2: METODE BAYAR =================
  if (showCheckout && checkoutStep === 2) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-2xl font-serif font-bold text-stone-900 cursor-pointer" onClick={handleBackToHome}>
              <Heart className="w-6 h-6 text-[#C4A265] fill-[#C4A265]" /> Invito
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center"><Check className="w-4 h-4" /></div><span className="font-medium text-green-600">Pilih Paket</span></div>
              <div className="w-8 h-px bg-stone-300"></div>
              <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-[#C4A265] text-white flex items-center justify-center text-xs font-bold">2</div><span className="font-medium text-stone-900">Metode Bayar</span></div>
              <div className="w-8 h-px bg-stone-300"></div>
              <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center text-xs font-bold">3</div><span className="text-stone-500">Konfirmasi</span></div>
            </div>
            <button onClick={() => setCheckoutStep(1)} className="text-stone-600 hover:text-stone-900 font-medium flex items-center gap-2">← Kembali</button>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">Pilih Metode Pembayaran</h1>
          <p className="text-stone-500 mb-8">Powered by <span className="font-bold text-[#C4A265]">Xendit</span> — Pembayaran aman & terpercaya</p>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
                  {[{ id: 'va', label: 'Virtual Account', icon: <CreditCard className="w-4 h-4" /> }, { id: 'ewallet', label: 'E-Wallet', icon: <Smartphone className="w-4 h-4" /> }, { id: 'qris', label: 'QRIS', icon: <QrCode className="w-4 h-4" /> }].map((tab) => (
                    <button key={tab.id} onClick={() => setPaymentTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${paymentTab === tab.id ? 'bg-[#C4A265] text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
                      {tab.icon}{tab.label}
                    </button>
                  ))}
                </div>
                {paymentTab === 'va' && (
                  <div>
                    <p className="text-sm text-stone-600 mb-4">Pilih Virtual Account yang ingin Anda gunakan:</p>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <div key={method.id} onClick={() => setSelectedPayment(method.id)} className={`border-2 rounded-xl p-4 cursor-pointer transition-all flex items-center justify-between ${selectedPayment === method.id ? 'border-[#C4A265] bg-[#C4A265]/5' : 'border-stone-200 hover:border-stone-300'}`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === method.id ? 'border-[#C4A265]' : 'border-stone-300'}`}>
                              {selectedPayment === method.id && <div className="w-3 h-3 rounded-full bg-[#C4A265]"></div>}
                            </div>
                            <span className={`text-xs font-bold text-white px-3 py-1 rounded-full ${method.color}`}>{method.logo}</span>
                            <span className="font-medium text-stone-900">{method.name}</span>
                          </div>
                          <div className="text-right"><p className="text-xs text-stone-500">Biaya admin</p><p className="font-semibold text-stone-900">Gratis</p></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {paymentTab !== 'va' && <div className="text-center py-12 text-stone-500"><p>Metode pembayaran ini akan segera tersedia</p></div>}
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Ringkasan Pembayaran</h2>
                <div className="bg-[#FAF8F5] rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3 mb-2"><Package className="w-5 h-5 text-[#C4A265]" /><span className="text-sm text-stone-600">Paket</span></div>
                  <p className="font-bold text-stone-900">{currentPackage.name}</p>
                  <div className="flex justify-between mt-3 pt-3 border-t border-stone-200"><span className="text-sm text-stone-600">Harga paket</span><span className="font-semibold">{formatRupiah(currentPackage.price)}</span></div>
                  {currentPackage.originalPrice && <div className="flex justify-between mt-1"><span className="text-sm text-green-600">Diskon</span><span className="font-semibold text-green-600">-{formatRupiah(currentPackage.originalPrice - currentPackage.price)}</span></div>}
                  <div className="flex justify-between mt-3 pt-3 border-t border-stone-200"><span className="font-bold text-stone-900">Total</span><span className="font-bold text-lg text-[#C4A265]">{formatRupiah(currentPackage.price)}</span></div>
                </div>
                {selectedPayment && (
                  <div className="bg-[#FAF8F5] rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /><span className="text-sm font-medium text-stone-700">Metode dipilih</span></div>
                    <p className="font-semibold text-stone-900 mt-1">{currentPayment?.name}</p>
                  </div>
                )}
                <button onClick={handlePayNow} disabled={!selectedPayment} className={`w-full py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 ${selectedPayment ? 'bg-[#C4A265] hover:bg-[#b08e55] text-white' : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}>
                  {selectedPayment ? (<>Bayar Sekarang <ArrowRight className="w-5 h-5" /></>) : 'Pilih Metode Dulu'}
                </button>
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-stone-500">
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> SSL Encrypted</span>
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Xendit Secured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= STEP 1: PILIH PAKET =================
  if (showCheckout && checkoutStep === 1) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-2xl font-serif font-bold text-stone-900 cursor-pointer" onClick={handleBackToHome}>
              <Heart className="w-6 h-6 text-[#C4A265] fill-[#C4A265]" /> Invito
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-[#C4A265] text-white flex items-center justify-center text-xs font-bold">1</div><span className="font-medium text-stone-900">Pilih Paket</span></div>
              <div className="w-8 h-px bg-stone-300"></div>
              <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center text-xs font-bold">2</div><span className="text-stone-500">Metode Bayar</span></div>
              <div className="w-8 h-px bg-stone-300"></div>
              <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center text-xs font-bold">3</div><span className="text-stone-500">Konfirmasi</span></div>
            </div>
            <button onClick={handleBackToHome} className="text-stone-600 hover:text-stone-900 font-medium flex items-center gap-2">← Kembali</button>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">Pilih Paket & Checkout</h1>
          <p className="text-stone-500 mb-8">Pilih paket yang sesuai dengan kebutuhan Anda</p>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Package className="w-5 h-5 text-[#C4A265]" /> Pilih Paket</h2>
                <div className="space-y-4">
                  {packagesData.map((pkg) => (
                    <div key={pkg.id} onClick={() => setSelectedPackage(pkg.id)} className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${selectedPackage === pkg.id ? 'border-[#C4A265] bg-[#C4A265]/5' : 'border-stone-200 hover:border-stone-300'}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPackage === pkg.id ? 'border-[#C4A265]' : 'border-stone-300'}`}>
                            {selectedPackage === pkg.id && <div className="w-3 h-3 rounded-full bg-[#C4A265]"></div>}
                          </div>
                          <div>
                            <div className="flex items-center gap-2"><h3 className="font-bold text-lg">{pkg.name}</h3>{pkg.popular && <span className="text-xs bg-[#C4A265] text-white px-2 py-0.5 rounded-full font-bold">POPULER</span>}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          {pkg.originalPrice && <p className="text-xs text-stone-400 line-through">{formatRupiah(pkg.originalPrice)}</p>}
                          <p className="font-bold text-xl text-stone-900">{formatRupiah(pkg.price)}</p>
                        </div>
                      </div>
                      <p className="text-sm text-stone-500 ml-8">{pkg.features}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Heart className="w-5 h-5 text-[#C4A265]" /> Detail Undangan</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-stone-700 mb-2">Nama Mempelai Wanita</label><input type="text" value={formData.brideName} onChange={(e) => setFormData({ ...formData, brideName: e.target.value })} placeholder="Nama mempelai wanita" className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265]" /></div>
                  <div><label className="block text-sm font-medium text-stone-700 mb-2">Nama Mempelai Pria</label><input type="text" value={formData.groomName} onChange={(e) => setFormData({ ...formData, groomName: e.target.value })} placeholder="Nama mempelai pria" className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265]" /></div>
                  <div className="md:col-span-2"><label className="block text-sm font-medium text-stone-700 mb-2">Tanggal Pernikahan</label><input type="date" value={formData.weddingDate} onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })} className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265]" /></div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><User className="w-5 h-5 text-[#C4A265]" /> Data Pemesan</h2>
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-stone-700 mb-2">Nama Lengkap</label><input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Nama lengkap" className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265]" /></div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-stone-700 mb-2">Alamat Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@contoh.com" className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265]" /></div>
                    <div><label className="block text-sm font-medium text-stone-700 mb-2">Nomor WhatsApp</label><input type="tel" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} placeholder="081234567890" className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265]" /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Ringkasan Pesanan</h2>
                <div className="bg-[#FAF8F5] rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-2"><span className="text-sm text-stone-600">Paket dipilih</span><span className="text-xs bg-[#C4A265]/10 text-[#C4A265] px-2 py-1 rounded-full font-semibold">Aktif</span></div>
                  <p className="font-bold text-lg text-stone-900">{currentPackage.name}</p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between"><span className="text-stone-600">Harga paket</span><span className="font-semibold">{formatRupiah(currentPackage.price)}</span></div>
                  {currentPackage.originalPrice && <div className="flex justify-between"><span className="text-green-600">Hemat</span><span className="font-semibold text-green-600">-{formatRupiah(currentPackage.originalPrice - currentPackage.price)}</span></div>}
                  <div className="flex justify-between"><span className="text-stone-600">Biaya layanan</span><span className="font-semibold text-green-600">Gratis</span></div>
                  <div className="border-t border-stone-200 pt-3 flex justify-between"><span className="font-bold text-stone-900">Total Pembayaran</span><span className="font-bold text-lg text-[#C4A265]">{formatRupiah(currentPackage.price)}</span></div>
                </div>
                <button onClick={handleNextToPayment} className="w-full bg-[#C4A265] hover:bg-[#b08e55] text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">Lanjut ke Pembayaran <ArrowRight className="w-5 h-5" /></button>
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-stone-500">
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Pembayaran aman</span>
                  <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Xendit secured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= LANDING PAGE (DEFAULT) =================
  return (
    <div className="min-h-screen bg-white font-sans text-stone-800 relative">

      {/* ✅ PERUBAHAN: Render Overlay Riwayat di sini agar menumpuk di atas Landing Page */}
      {HistoryOverlay}

      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-serif font-bold text-stone-900 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Heart className="w-6 h-6 text-[#C4A265] fill-[#C4A265]" /> Invito
          </div>
          <div className="hidden md:flex items-center gap-6 font-medium text-stone-600">
            <button onClick={() => scrollToSection('fitur')} className="hover:text-[#C4A265] transition-colors">Fitur</button>
            <button onClick={() => scrollToSection('tema')} className="hover:text-[#C4A265] transition-colors">Tema</button>
            <button onClick={() => scrollToSection('harga')} className="hover:text-[#C4A265] transition-colors">Harga</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-[#C4A265] transition-colors">FAQ</button>
            {isCustomerLoggedIn && (
              <button
                // ✅ PERUBAHAN: Hanya mengaktifkan overlay, tidak pindah halaman
                onClick={() => setIsHistoryOverlay(true)}
                className="flex items-center gap-2 text-[#C4A265] hover:text-[#b08e55] transition-colors"
              >
                <History className="w-4 h-4" /> Riwayat
              </button>
            )}
          </div>
          <div className="hidden md:flex items-center gap-4">
            {isCustomerLoggedIn ? (
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center gap-3 pr-4 border-r border-stone-200 cursor-pointer hover:bg-stone-50 rounded-lg p-2 transition-colors"
                  onClick={() => setShowProfileSettings(true)}
                  title="Klik untuk pengaturan profil"
                >
                  <div className="w-9 h-9 rounded-full bg-[#C4A265] flex items-center justify-center text-white font-bold text-sm">
                    {profileData.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-stone-900 leading-tight">{profileData.name}</p>
                    <p className="text-xs text-stone-500">Calon Pengantin</p>
                  </div>
                </div>
                <button onClick={handleCustomerLogout} className="flex items-center gap-2 font-medium text-red-600 hover:text-red-700 transition-colors text-sm" title="Keluar">
                  <LogOut className="w-4 h-4" /> Keluar
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowCustomerRegister(true)}
                  className="font-medium text-[#C4A265] hover:text-[#b08e55] transition-colors"
                >
                  Daftar
                </button>
                <button
                  onClick={() => setShowCustomerLogin(true)}
                  className="font-medium text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Masuk
                </button>
              </>
            )}

            <button onClick={() => handleSelectPackage('Standard')} className="bg-[#C4A265] hover:bg-[#b08e55] text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-[#C4A265]/20">
              Mulai Gratis
            </button>
          </div>
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-6 flex flex-col gap-4 shadow-xl absolute w-full z-50">
            <button onClick={() => scrollToSection('fitur')} className="text-left text-lg font-medium py-2">Fitur</button>
            <button onClick={() => scrollToSection('tema')} className="text-left text-lg font-medium py-2">Tema</button>
            <button onClick={() => scrollToSection('harga')} className="text-left text-lg font-medium py-2">Harga</button>
            <button onClick={() => scrollToSection('faq')} className="text-left text-lg font-medium py-2">FAQ</button>

            <div className="border-t border-stone-100 pt-4 flex flex-col gap-3">
              {isCustomerLoggedIn ? (
                <>
                  <button
                    // ✅ PERUBAHAN: Hanya mengaktifkan overlay
                    onClick={() => { setIsHistoryOverlay(true); setIsMenuOpen(false); }}
                    className="text-left text-lg font-medium py-2 text-[#C4A265] flex items-center gap-2"
                  >
                    <History className="w-4 h-4" /> Riwayat
                  </button>
                  <div
                    className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg mb-2 cursor-pointer hover:bg-stone-100 transition-colors"
                    onClick={() => { setShowProfileSettings(true); setIsMenuOpen(false); }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#C4A265] flex items-center justify-center text-white font-bold">
                      {profileData.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">{profileData.name}</p>
                      <p className="text-xs text-stone-500">Ketuk untuk pengaturan</p>
                    </div>
                  </div>
                  <button onClick={() => { handleCustomerLogout(); setIsMenuOpen(false); }} className="text-left text-sm font-medium py-2 text-red-600 flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Keluar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setShowCustomerRegister(true); setIsMenuOpen(false); }}
                    className="text-left text-lg font-medium py-2 text-[#C4A265] hover:text-[#b08e55]"
                  >
                    Daftar
                  </button>
                  <button
                    onClick={() => { setShowCustomerLogin(true); setIsMenuOpen(false); }}
                    className="text-left text-lg font-medium py-2 text-stone-600"
                  >
                    Masuk
                  </button>
                </>
              )}
              <button onClick={() => { handleSelectPackage('Standard'); setIsMenuOpen(false); }} className="bg-[#C4A265] text-white py-3 rounded-xl font-bold mt-2 text-center">Mulai Gratis</button>
            </div>
          </div>
        )}
      </nav>

      <section className="pt-32 pb-20 px-6 bg-[#FAF8F5] overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-stone-100 text-[#C4A265] font-medium text-sm"><Sparkles className="w-4 h-4" /> Platform Undangan Digital #1 Indonesia</div>
            <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight text-stone-900">Buat Undangan Pernikahan <span className="text-[#C4A265] italic">Impianmu</span></h1>
            <p className="text-lg text-stone-600 max-w-lg leading-relaxed">Undangan digital elegan yang bisa dibagikan via WhatsApp. Tanpa keahlian desain, siap dalam hitungan menit.</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => handleSelectPackage('Standard')} className="bg-[#C4A265] hover:bg-[#b08e55] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-[#C4A265]/30 flex items-center gap-2">Mulai Buat Undangan <ArrowRight className="w-5 h-5" /></button>
              <button onClick={() => scrollToSection('tema')} className="bg-white border-2 border-stone-200 hover:border-[#C4A265] text-stone-700 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2"><Play className="w-5 h-5 fill-current" /> Lihat Template</button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative z-10 bg-white rounded-[3rem] p-4 shadow-2xl border-8 border-stone-900 w-[320px] mx-auto transform rotate-[-5deg]">
              <div className="bg-[#FAF8F5] rounded-[2.5rem] overflow-hidden">
                <div className="h-48 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop" alt="Wedding Background" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C4A265]/80 to-[#C4A265]/60 flex items-center justify-center"><span className="text-3xl font-serif font-bold text-white">Wedding</span></div>
                </div>
                <div className="p-6 text-center space-y-3 bg-white">
                  <p className="text-xs uppercase tracking-widest text-stone-500">The Wedding Of</p>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">Anisa & Raka</h3>
                  <p className="text-xs text-stone-500">Sabtu, 12 Januari 2025<br />Ballroom Hotel Mulia</p>
                  <button className="w-full bg-[#C4A265] text-white py-2 rounded-lg text-sm font-bold mt-4 hover:bg-[#b08e55] transition-colors">Buka Undangan</button>
                </div>
              </div>
            </div>
            <div className="absolute top-20 -left-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-pulse">
              <div className="bg-green-100 p-2 rounded-full text-green-600"><Check className="w-5 h-5" /></div>
              <div><p className="font-bold text-sm">RSVP Diterima</p><p className="text-xs text-stone-500">+48 tamu baru</p></div>
            </div>
            <div className="absolute bottom-20 -right-5 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="bg-[#C4A265]/10 p-2 rounded-full text-[#C4A265]"><Gift className="w-5 h-5" /></div>
              <div><p className="font-bold text-sm">Amplop Digital</p><p className="text-xs text-stone-500">Rp 12.450.000</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ PERUBAHAN: Menambahkan id="cara-kerja" */}
      <section id="cara-kerja" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><p className="text-[#C4A265] font-bold tracking-widest text-sm uppercase mb-3">Cara Kerja</p><h2 className="text-4xl font-serif font-bold text-stone-900">Mudah dalam 4 Langkah</h2></div>
          <div className="grid md:grid-cols-4 gap-8">
            {[{ step: 1, icon: <Smartphone className="w-8 h-8" />, title: 'Daftar atau Login', desc: 'Buat akun gratis dan mulai perjalanan undangan impian Anda' }, { step: 2, icon: <Layers className="w-8 h-8" />, title: 'Pilih Template', desc: 'Pilih dari ratusan tema elegan yang sesuai selera Anda' }, { step: 3, icon: <Edit3 className="w-8 h-8" />, title: 'Edit Undangan', desc: 'Kustomisasi setiap detail dengan editor yang mudah digunakan' }, { step: 4, icon: <ArrowRight className="w-8 h-8" />, title: 'Bagikan ke Tamu', desc: 'Kirim link undangan via WhatsApp, Instagram, atau media sosial' }].map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-[#C4A265] rounded-2xl flex items-center justify-center text-white mx-auto">{item.icon}</div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-[#C4A265] rounded-full flex items-center justify-center font-bold text-[#C4A265]">{item.step}</div>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-stone-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="fitur" className="py-24 px-6 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><p className="text-[#C4A265] font-bold tracking-widest text-sm uppercase mb-3">Keunggulan Kami</p><h2 className="text-4xl font-serif font-bold text-stone-900">Mengapa Memilih Invito?</h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-[#C4A265]/10 rounded-xl flex items-center justify-center text-[#C4A265] mb-6">{f.icon}</div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-stone-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="produk" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16"><p className="text-[#C4A265] font-bold tracking-widest text-sm uppercase mb-3">Produk Kami</p><h2 className="text-4xl font-serif font-bold text-stone-900">Pilihan Produk Undangan</h2></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#FAF8F5] p-10 rounded-3xl relative">
              <div className="absolute top-6 right-6 bg-[#C4A265] text-white text-xs font-bold px-3 py-1 rounded-full">TERLARIS</div>
              <Smartphone className="w-12 h-12 text-[#C4A265] mb-6" />
              <h3 className="text-2xl font-serif font-bold mb-4">Undangan Digital</h3>
              <p className="text-stone-500 mb-8">Undangan interaktif modern yang mudah dibagikan ke semua tamu.</p>
              <ul className="space-y-3 mb-10">{['Bisa dibagikan via WhatsApp & sosmed', 'Fitur RSVP & amplop digital', '100+ tema pilihan tersedia'].map((item, i) => (<li key={i} className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-[#C4A265]" /> {item}</li>))}</ul>
              <button className="w-full bg-[#C4A265] text-white py-4 rounded-xl font-bold">Lihat Detail</button>
            </div>
            <div className="bg-[#FAF8F5] p-10 rounded-3xl">
              <Mail className="w-12 h-12 text-[#C4A265] mb-6" />
              <h3 className="text-2xl font-serif font-bold mb-4">Undangan Cetak</h3>
              <p className="text-stone-500 mb-8">Undangan fisik premium dengan desain yang menawan dan elegan.</p>
              <ul className="space-y-3 mb-10">{['Desain premium profesional', 'Beragam pilihan kertas', 'Cetak sesuai jumlah tamu'].map((item, i) => (<li key={i} className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-[#C4A265]" /> {item}</li>))}</ul>
              <button className="w-full border-2 border-[#C4A265] text-[#C4A265] py-4 rounded-xl font-bold">Lihat Detail</button>
            </div>
          </div>
        </div>
      </section>

      <section id="tema" className="py-24 px-6 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><p className="text-[#C4A265] font-bold tracking-widest text-sm uppercase mb-3">Koleksi Tema</p><h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Pilihan Tema yang Memukau</h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {THEMES.map((theme) => (
              <div key={theme.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="relative h-64 overflow-hidden group">
                  <img src={theme.image} alt={theme.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  {theme.badge && <span className="absolute top-4 left-4 bg-[#C4A265] text-white text-xs font-bold px-3 py-1 rounded-full z-10">{theme.badge}</span>}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <span className={`text-3xl font-serif font-bold drop-shadow-lg ${theme.name === 'Modern' || theme.name === 'Luxury' ? 'text-white' : 'text-[#C4A265]'}`}>{theme.name}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{theme.name}</h3>
                  <p className="text-sm text-stone-500 mb-4">24 variasi tersedia</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setDemoScrollPos(window.scrollY);
                        setShowDemo(theme);
                      }}
                      className="flex-1 bg-[#C4A265] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#b08e55] transition-colors"
                    >
                      Lihat Demo
                    </button>
                    <button onClick={() => handleSelectPackage('Standard')} className="flex-1 border border-stone-200 py-2.5 rounded-lg font-semibold text-sm hover:border-[#C4A265] hover:text-[#C4A265] transition-colors">
                      Gunakan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-[#C4A265] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#b08e55] transition-colors">
              Lihat Semua Tema
            </button>
          </div>
        </div>
      </section>

      <section id="harga" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><p className="text-[#C4A265] font-bold tracking-widest text-sm uppercase mb-3">Paket Harga</p><h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Pilih Paket Sesuai Kebutuhan</h2><p className="text-stone-500">Mulai dari Rp 99.000 untuk undangan digital impian Anda</p></div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packagesData.map((pkg) => (
              <div key={pkg.id} className={`bg-white p-8 rounded-3xl shadow-sm border-2 relative ${pkg.popular ? 'border-[#C4A265]' : 'border-stone-100'}`}>
                {pkg.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C4A265] text-white px-4 py-1 rounded-full text-xs font-bold">PALING POPULER</div>}
                <h3 className="text-2xl font-serif font-bold mb-2">{pkg.name}</h3>
                <p className="text-stone-500 text-sm mb-4">Untuk pasangan yang ingin memulai</p>
                {pkg.originalPrice && <p className="text-sm text-stone-400 line-through">{formatRupiah(pkg.originalPrice)}</p>}
                <div className="text-4xl font-serif font-bold mb-6">{formatRupiah(pkg.price)}</div>
                <ul className="space-y-3 mb-8 text-sm">{pkg.features.split(' • ').map((feature, i) => (<li key={i} className="flex items-center gap-3"><Check className="w-4 h-4 text-[#C4A265]" /> {feature}</li>))}</ul>
                <button onClick={() => handleSelectPackage(pkg.id)} className={`w-full py-3 rounded-xl font-bold transition-colors ${pkg.popular ? 'bg-[#C4A265] text-white hover:bg-[#b08e55]' : 'border-2 border-stone-200 text-stone-700 hover:border-[#C4A265] hover:text-[#C4A265]'}`}>Pilih Paket {pkg.name}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ PERUBAHAN: Menambahkan id="testimoni" */}
      <section id="testimoni" className="py-24 px-6 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><p className="text-[#C4A265] font-bold tracking-widest text-sm uppercase mb-3">Testimoni</p><h2 className="text-4xl font-serif font-bold text-stone-900">Kata Mereka tentang Invito</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex text-[#C4A265] mb-4">{[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}</div>
                <p className="text-stone-700 italic mb-6">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#C4A265]/20" />
                  <div><h4 className="font-bold">{t.name}</h4><p className="text-xs text-stone-500">{t.role}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center bg-[#FAF8F5] rounded-3xl p-16">
          <Heart className="w-12 h-12 text-[#C4A265] mx-auto mb-6" />
          <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Buat Undangan Pernikahan Impianmu Sekarang</h2>
          <p className="text-stone-500 mb-8">Bergabung dengan 10.000+ pasangan yang telah mempercayai Invito untuk hari spesial mereka.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => handleSelectPackage('Standard')} className="bg-[#C4A265] hover:bg-[#b08e55] text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2">Mulai Gratis <ArrowRight className="w-5 h-5" /></button>
            <button onClick={() => scrollToSection('tema')} className="bg-white border-2 border-stone-200 px-8 py-4 rounded-full font-bold text-lg hover:border-[#C4A265] transition-colors">Lihat Semua Template</button>
          </div>
        </div>
      </section>

      {/* ✅ PERUBAHAN: Section FAQ sudah memiliki id="faq" */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16"><p className="text-[#C4A265] font-bold tracking-widest text-sm uppercase mb-3">FAQ</p><h2 className="text-4xl font-serif font-bold text-stone-900">Pertanyaan yang Sering Diajukan</h2></div>
          <div className="space-y-4">
            {[{ q: "Bagaimana cara membuat undangan digital?", a: "Cukup daftar, pilih tema, edit detail pernikahan Anda, dan undangan siap dibagikan dalam hitungan menit." }, { q: "Apakah bisa custom domain sendiri?", a: "Ya, untuk paket Standard dan Premium Anda bisa menggunakan custom domain .id atau domain lainnya." }, { q: "Berapa lama undangan bisa diakses?", a: "Tergantung paket yang dipilih. Basic 6 bulan, Standard 1 tahun, Premium selamanya." }, { q: "Apakah ada fitur RSVP dan amplop digital?", a: "Ya, semua paket sudah termasuk fitur RSVP. Amplop digital tersedia untuk paket Standard dan Premium." }, { q: "Bagaimana cara pembayarannya?", a: "Kami menerima berbagai metode pembayaran seperti transfer bank, e-wallet, dan QRIS." }].map((faq, i) => (
              <div key={i} className="border border-stone-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 text-stone-900">{faq.q}</h3>
                <p className="text-stone-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ PERUBAHAN: Footer dengan navigasi internal */}
      <footer className="bg-stone-900 text-stone-400 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 text-2xl font-serif font-bold text-white mb-6"><Heart className="w-6 h-6 text-[#C4A265] fill-[#C4A265]" /> Invito</div>
            <p className="text-sm leading-relaxed mb-6">Platform undangan digital pernikahan terbaik di Indonesia. Jadikan momen spesial Anda semakin berkesan.</p>
            <div className="flex gap-4"><Instagram className="w-5 h-5 hover:text-white cursor-pointer" /><Facebook className="w-5 h-5 hover:text-white cursor-pointer" /><Twitter className="w-5 h-5 hover:text-white cursor-pointer" /></div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Perusahaan</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => scrollToSection('fitur')} className="hover:text-[#C4A265] block text-left w-full transition-colors">Tentang Kami</button></li>
              <li><button onClick={() => scrollToSection('testimoni')} className="hover:text-[#C4A265] block text-left w-full transition-colors">Testimoni</button></li>
              <li><button className="hover:text-[#C4A265] block text-left w-full cursor-not-allowed opacity-50">Blog (Segera Hadir)</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Bantuan</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => scrollToSection('faq')} className="hover:text-[#C4A265] block text-left w-full transition-colors">FAQ</button></li>
              <li><button onClick={() => scrollToSection('cara-kerja')} className="hover:text-[#C4A265] block text-left w-full transition-colors">Panduan</button></li>
              <li><button className="hover:text-[#C4A265] block text-left w-full cursor-not-allowed opacity-50">Kontak (Segera Hadir)</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#C4A265] block">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-[#C4A265] block">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-[#C4A265] block">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-800 text-center text-xs"><p>© 2026 Invito. All rights reserved. Made with ❤️ in Indonesia.</p></div>
      </footer>

      {previewTheme && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-4xl h-[80vh] overflow-hidden relative shadow-2xl flex flex-col md:flex-row">
            <button onClick={() => setPreviewTheme(null)} className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-white"><X className="w-6 h-6" /></button>
            <div className={`w-full md:w-1/2 h-64 md:h-full bg-gradient-to-br ${previewTheme.gradient} flex items-center justify-center`}>
              <span className={`text-4xl font-serif font-bold ${previewTheme.name === 'Modern' || previewTheme.name === 'Luxury' ? 'text-white' : 'text-[#C4A265]'}`}>{previewTheme.name}</span>
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-[#C4A265] font-bold text-sm uppercase tracking-widest mb-2">Preview Tema</span>
              <h2 className="text-3xl font-serif font-bold mb-4">{previewTheme.name}</h2>
              <p className="text-stone-500 mb-8">Tema {previewTheme.name} menawarkan desain yang elegan dengan palet warna hangat. Cocok untuk konsep pernikahan outdoor maupun indoor.</p>
              <div className="space-y-4">
                <button onClick={() => { setPreviewTheme(null); handleSelectPackage('Standard'); }} className="w-full bg-[#C4A265] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#b08e55]">Gunakan Tema Ini</button>
                <button className="w-full border-2 border-stone-200 py-4 rounded-xl font-bold hover:border-stone-400">Lihat Demo Live</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}