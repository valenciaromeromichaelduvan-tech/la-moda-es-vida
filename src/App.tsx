/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  User as UserIcon, 
  Star, 
  TrendingUp, 
  Menu, 
  X, 
  ChevronRight, 
  ShieldCheck, 
  Zap,
  Heart,
  MapPin,
  UserPlus,
  Wind,
  Sun,
  CreditCard,
  Wallet,
  Truck,
  CheckCircle,
  PiggyBank
} from 'lucide-react';
import { STRATEGY, SITEMAP } from './constants';
import { User, CartItem, Product } from './types';

// Mock Identification Service
const IdentificationService = {
  // Simulates checking a secure cookie or session token
  getIdentifiedUser: (): User | null => {
    // In a real app, this would be an API call or a secure token decode
    const mockUser: User = {
      id: "COL-98765",
      name: "Mariana Valencia",
      email: "mariana.v@example.co",
      loyaltyPoints: 1250,
      tier: 'Oro',
      lastPurchase: "2024-03-15",
      city: "Bogotá",
      suggestedSize: "M / 8",
      suggestedCategory: "Abrigos de Lujo",
      preferences: ["Moda Urbana", "Accesorios Artesanales"]
    };
    
    // We simulate that the user is "recognized" via a persistent session token
    return mockUser;
  }
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [docNumber, setDocNumber] = useState('');
  const [docType, setDocType] = useState('CC');
  const [isSearching, setIsSearching] = useState(false);

  const [isFound, setIsFound] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('TODO');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pse' | 'wallet'>('card');
  const [isPaying, setIsPaying] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const CATEGORIES = ["TODO", "PANTALONES", "CAMISAS", "ZAPATOS", "ABRIGOS", "CHAQUETAS"];

  // Micro-interaction: Search for profile when document number changes
  useEffect(() => {
    if (docNumber.length > 7) {
      setIsSearching(true);
      setIsFound(false);
      const timer = setTimeout(() => {
        setIsSearching(false);
        setIsFound(true); // Simulate finding the user in the global DB
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
      setIsFound(false);
    }
  }, [docNumber]);

  // Mock Identification Logic
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsIdentifying(true);
    
    // Simulate system recognizing the ID
    setTimeout(() => {
      const mockUser: User = {
        id: "COL-98765",
        name: "Mariana Valencia",
        email: "mariana.v@example.co",
        loyaltyPoints: 1250,
        tier: 'Oro',
        city: "Bogotá",
        suggestedSize: "M / 8",
        suggestedCategory: "Abrigos de Lujo",
        preferences: ["Moda Urbana", "Accesorios Artesanales"]
      };
      setUser(mockUser);
      setIsIdentifying(false);
      setIsLoginModalOpen(false);
    }, 1500);
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
  };

  const addToCart = (product: Product | any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, size: user?.suggestedSize || 'Única' }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartSubtotal = cartItems.reduce((acc, item) => {
    const priceStr = item.price.replace(/[^0-9]/g, '');
    return acc + (parseInt(priceStr) * item.quantity);
  }, 0);

  const handleCheckout = () => {
    if (!user) {
      setIsCartOpen(false);
      setIsLoginModalOpen(true);
    } else {
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
    }
  };

  const processPayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setOrderComplete(true);
      setCartItems([]);
    }, 2500);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (itemName: string) => {
    switch (itemName) {
      case "Inicio":
        scrollToSection('inicio');
        break;
      case "Tendencias Colombianas":
        scrollToSection('tendencias');
        break;
      case "MI ESPACIO & BENEFICIOS":
        if (!user) {
          setIsLoginModalOpen(true);
        } else {
          scrollToSection('ecosistema-dashboard');
        }
        break;
      case "Colecciones":
      case "Tendencias":
        scrollToSection('tendencias');
        break;
      case "Sostenibilidad":
        scrollToSection('sostenibilidad');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed] text-[#1a1a1a] font-sans selection:bg-emerald-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1a1a1a] uppercase">LA MODA ES VIDA</span>
            </div>

            {/* Desktop Menu - Center */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-center">
              {SITEMAP.filter(item => item.name !== "MI ESPACIO & BENEFICIOS").map((item) => (
                <button 
                  key={item.name}
                  onClick={() => handleNavClick(item.name)}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative group py-2 hover:text-emerald-600"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-emerald-600 transition-all group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Right Side - Auth & Tools */}
            <div className="flex items-center gap-4">
              <AnimatePresence mode="wait">
                {user ? (
                  <motion.div 
                    key="auth-tools"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4"
                  >
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-white text-emerald-600 rounded-full border border-emerald-100 shadow-sm">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">{user.name.toUpperCase()} - ACTIVO</span>
                    </div>

                    <button 
                      onClick={() => handleNavClick("MI ESPACIO & BENEFICIOS")}
                      className="px-6 py-2 bg-[#1a1a1a] text-white rounded-full hover:bg-emerald-600 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest transition-all shadow-md group"
                    >
                      <Star size={12} className="fill-emerald-400 group-hover:fill-white" />
                      HOLA, {user.name.split(' ')[0].toUpperCase()}
                    </button>

                    <button 
                      onClick={handleLogout}
                      className="text-[9px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors underline underline-offset-4"
                    >
                      SALIR
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    key="guest-login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setIsLoginModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-2 bg-[#1a1a1a] text-white text-[9px] font-bold uppercase tracking-widest rounded-full hover:bg-emerald-600 transition-all shadow-md"
                  >
                    <Star size={12} className="text-emerald-400" />
                    MI ESPACIO & BENEFICIOS
                  </motion.button>
                )}
              </AnimatePresence>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors relative"
              >
                <ShoppingBag size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full border-2 border-white" />
                )}
              </button>

              <button 
                className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-white flex flex-col p-8 pt-24"
          >
            <div className="flex flex-col gap-6">
              {SITEMAP.filter(item => item.name !== "Mi Espacio Personal" || user).map((item) => (
                <button 
                  key={item.name}
                  onClick={() => handleNavClick(item.name)}
                  className="text-2xl font-serif text-left border-b border-black/5 pb-4 last:border-0"
                >
                  {item.name}
                </button>
              ))}
              {!user && (
                <button 
                  onClick={() => { setIsLoginModalOpen(true); setIsMenuOpen(false); }}
                  className="mt-4 w-full py-4 bg-black text-white font-bold uppercase tracking-widest rounded-xl"
                >
                  Iniciar Sesión
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smart Shopping Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
            />
            
            {/* Sidebar */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[80] flex flex-col"
            >
              {/* Header */}
              <div className="p-8 border-b border-black/5 flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-2xl">Bolsa de Estilo</h3>
                  <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold mt-1">Ecosistema Inteligente</p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                    <ShoppingBag size={48} className="mb-4" />
                    <p className="font-serif text-xl italic text-black">Tu bolsa está vacía</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 group">
                        <div className="w-20 h-24 bg-[#f5f2ed] rounded-xl overflow-hidden shrink-0">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-sm leading-tight text-black">{item.title}</h4>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-black/20 hover:text-red-500 transition-colors"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            <div className="flex gap-3 text-[10px] mt-2">
                              <span className="bg-[#f5f2ed] px-2 py-0.5 rounded font-bold">TALLA: {item.size}</span>
                              <span className="text-black/40 uppercase tracking-widest font-bold">CANT: {item.quantity}</span>
                            </div>
                          </div>
                          <p className="text-sm font-bold text-emerald-600">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer / Summary */}
              {cartItems.length > 0 && (
                <div className="p-8 bg-[#fcfbf9] border-t border-black/5">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-1">Subtotal estimado</p>
                      <h4 className="font-serif text-3xl font-bold">${cartSubtotal.toLocaleString()} COP</h4>
                    </div>
                    {user && (
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 mb-1">Beneficio Fidelidad</p>
                        <p className="text-xs font-bold text-black italic">Envío Express Gratis</p>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    className="w-full py-5 bg-[#1a1a1a] text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3 active:scale-95"
                  >
                    Finalizar Compra
                    <ChevronRight size={16} />
                  </button>
                  
                  <p className="text-center mt-6 text-[9px] uppercase tracking-[0.2em] text-black/30 leading-relaxed">
                    Procesado por el ecosistema LA MODA ES VIDA <br />
                    Tus datos de {user ? user.id : 'ID'} agilizan este proceso.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <header id="inicio" className="relative h-[85vh] flex items-center overflow-hidden bg-[#1a1a1a]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
            alt="High Fashion" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-white w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="font-serif text-4xl md:text-6xl mb-8 leading-[1.1]">
              No es solo una tienda, <br />
              <span className="italic text-emerald-400">es un ecosistema que te reconoce.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed font-light">
              {STRATEGY.heroSubtext.replace('{city}', user ? user.city : 'tu ciudad')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => user ? scrollToSection('ecosistema-dashboard') : setIsLoginModalOpen(true)}
                className="px-10 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-emerald-50 transition-all shadow-xl"
              >
                Explorar mi selección personal
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Smart Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden relative"
            >
              {orderComplete ? (
                <div className="p-20 text-center space-y-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto"
                  >
                    <CheckCircle size={48} />
                  </motion.div>
                  <h2 className="font-serif text-5xl">¡Pedido Confirmado!</h2>
                  <p className="text-black/50 text-xl font-light max-w-md mx-auto">
                    Tu estilo está en camino, {user?.name.split(' ')[0]}. Hemos enviado los detalles a tu correo verificado.
                  </p>
                  <button 
                    onClick={() => { setIsCheckoutOpen(false); setOrderComplete(false); }}
                    className="px-12 py-5 bg-[#1a1a1a] text-white font-bold uppercase tracking-widest rounded-full hover:bg-emerald-600 transition-all"
                  >
                    Volver a la tienda
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left Column: Form */}
                  <div className="p-8 md:p-12 space-y-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
                    <div className="flex justify-between items-center">
                      <h3 className="font-serif text-3xl">Checkout Seguro</h3>
                      <button onClick={() => setIsCheckoutOpen(false)} className="p-2 hover:bg-black/5 rounded-full"><X size={20} /></button>
                    </div>

                    {/* Módulo de Residencia */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck size={18} className="text-emerald-600" />
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">Entrega</h4>
                      </div>
                      <div className="p-6 bg-[#f5f2ed] rounded-3xl border border-black/5">
                        <p className="text-sm font-bold mb-1">Enviar a tu dirección guardada</p>
                        <p className="text-xs text-black/40 mb-4">{user?.city}, Colombia • [Dirección Principal]</p>
                        <button className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 hover:underline">
                          Agregar nueva dirección
                        </button>
                      </div>
                    </div>

                    {/* Módulo de Pago */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard size={18} className="text-emerald-600" />
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">Método de Pago</h4>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'card', name: 'Tarjeta', icon: <CreditCard size={16} /> },
                          { id: 'pse', name: 'PSE', icon: <Zap size={16} /> },
                          { id: 'wallet', name: 'Billetera', icon: <Wallet size={16} /> }
                        ].map(method => (
                          <button 
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id as any)}
                            className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                              paymentMethod === method.id 
                                ? 'bg-[#1a1a1a] text-white border-black shadow-lg scale-105' 
                                : 'bg-white border-black/5 hover:border-emerald-300'
                            }`}
                          >
                            <span className={paymentMethod === method.id ? 'text-white' : 'text-emerald-600'}>{method.icon}</span>
                            <span className="text-[9px] font-bold uppercase tracking-widest">{method.name}</span>
                          </button>
                        ))}
                      </div>

                      {paymentMethod === 'card' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                          <input type="text" placeholder="Número de Tarjeta" className="w-full px-5 py-4 bg-[#f5f2ed] border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                          <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="MM/YY" className="w-full px-5 py-4 bg-[#f5f2ed] border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                            <input type="text" placeholder="CVV" className="w-full px-5 py-4 bg-[#f5f2ed] border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                          </div>
                        </motion.div>
                      )}

                      {/* Puntos de Fidelidad */}
                      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <PiggyBank size={20} className="text-emerald-600" />
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-800">Canje de Puntos</p>
                            <p className="text-[10px] text-emerald-600 font-medium">Tienes {user?.loyaltyPoints} puntos disponibles</p>
                          </div>
                        </div>
                        <input type="checkbox" className="w-5 h-5 accent-emerald-600 rounded-lg cursor-pointer" />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Order Summary */}
                  <div className="bg-[#1a1a1a] text-white p-8 md:p-12 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-2xl mb-8">Resumen</h4>
                      <div className="space-y-4 mb-10 overflow-y-auto max-h-[30vh] custom-scrollbar pr-2">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex justify-between items-center text-sm">
                            <span className="text-white/60">{item.quantity}x {item.title}</span>
                            <span className="font-bold">{item.price}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-3 pt-6 border-t border-white/10">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/40 font-light">Subtotal</span>
                          <span className="font-bold">${cartSubtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/40 font-light">Envío Express</span>
                          <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-widest">Gratis</span>
                        </div>
                        <div className="flex justify-between text-2xl font-serif pt-4 border-t border-white/20">
                          <span>Total</span>
                          <span className="text-emerald-400">${cartSubtotal.toLocaleString()} COP</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={processPayment}
                      disabled={isPaying}
                      className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest rounded-2xl hover:bg-emerald-400 transition-all shadow-xl mt-12 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isPaying ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Validando con ID...
                        </>
                      ) : (
                        <>
                          <CreditCard size={18} />
                          Pagar Ahora y Recibir mi Estilo
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isLoginModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-8 right-8 p-2 hover:bg-black/5 rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Tabs Header */}
              <div className="flex border-b border-black/5">
                <button 
                  onClick={() => { setActiveTab('login'); setIsFound(false); setDocNumber(''); }}
                  className={`flex-1 py-6 text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${activeTab === 'login' ? 'text-black bg-white' : 'text-black/30 bg-[#f5f2ed]/50'}`}
                >
                  Ya soy parte
                </button>
                <button 
                  onClick={() => { setActiveTab('signup'); setIsFound(false); setDocNumber(''); }}
                  className={`flex-1 py-6 text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${activeTab === 'signup' ? 'text-black bg-white' : 'text-black/30 bg-[#f5f2ed]/50'}`}
                >
                  Quiero unirme
                </button>
              </div>
              
              <div className="p-10">
                <div className="text-center mb-10">
                  <div className="w-12 h-12 bg-[#1a1a1a] flex items-center justify-center rounded-full mx-auto mb-4">
                    <span className="text-white font-serif text-xl font-bold">V</span>
                  </div>
                  <h2 className="text-2xl font-serif mb-2">
                    {activeTab === 'login' ? 'Bienvenido de vuelta' : 'Crea tu perfil'}
                  </h2>
                  <p className="text-xs text-black/40 font-light">
                    {activeTab === 'login' 
                      ? 'Accede a tu mundo de moda personalizada.' 
                      : 'Vinculamos tu identidad para una experiencia sin fricción.'}
                  </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-6">
                  {activeTab === 'login' ? (
                    <>
                      <div className="space-y-4">
                        <div className="relative">
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2 ml-1">
                            Tipo de Documento
                          </label>
                          <select 
                            className="w-full px-6 py-4 bg-[#f5f2ed] border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm appearance-none cursor-pointer"
                            defaultValue="CC"
                          >
                            <option value="CC">Cédula de Ciudadanía (CC)</option>
                            <option value="TI">Tarjeta de Identidad (TI)</option>
                            <option value="Pasaporte">Pasaporte</option>
                            <option value="NIT">NIT (Empresas)</option>
                          </select>
                        </div>
                        <div className="relative">
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2 ml-1">
                            Número de Documento
                          </label>
                          <input 
                            type="text" 
                            required
                            placeholder="Tu ID Único del Ecosistema"
                            className="w-full px-6 py-4 bg-[#f5f2ed] border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2 ml-1">
                            Contraseña
                          </label>
                          <input 
                            type="password" 
                            required
                            placeholder="••••••••"
                            className="w-full px-6 py-4 bg-[#f5f2ed] border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm"
                          />
                        </div>
                      </div>
                      <button 
                        disabled={isIdentifying}
                        className="w-full py-5 bg-[#1a1a1a] text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-black/10"
                      >
                        {isIdentifying ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Reconociendo...
                          </>
                        ) : 'Entrar a mi Perfil'}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="space-y-4 max-h-[50vh] overflow-y-auto px-1 custom-scrollbar">
                        <div className="relative">
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2 ml-1">
                            Tipo de Documento
                          </label>
                          <select 
                            value={docType}
                            onChange={(e) => setDocType(e.target.value)}
                            className="w-full px-6 py-4 bg-[#f5f2ed] border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm appearance-none cursor-pointer"
                          >
                            <option value="CC">Cédula de Ciudadanía (CC)</option>
                            <option value="TI">Tarjeta de Identidad (TI)</option>
                            <option value="Pasaporte">Pasaporte</option>
                            <option value="NIT">NIT (Empresas)</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2 ml-1">
                              {docType === 'NIT' ? 'Razón Social' : 'Nombres'}
                            </label>
                            <input 
                              type="text" 
                              required
                              placeholder={docType === 'NIT' ? "Ej: Moda SAS" : "Ej: Mariana"}
                              className="w-full px-6 py-4 bg-[#f5f2ed] border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2 ml-1">
                              {docType === 'NIT' ? 'Rep. Legal' : 'Apellidos'}
                            </label>
                            <input 
                              type="text" 
                              required
                              placeholder={docType === 'NIT' ? "Ej: Pedro Pérez" : "Ej: Valencia"}
                              className="w-full px-6 py-4 bg-[#f5f2ed] border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2 ml-1">
                            Correo Electrónico
                          </label>
                          <input 
                            type="email" 
                            required
                            placeholder="contacto@ejemplo.co"
                            className="w-full px-6 py-4 bg-[#f5f2ed] border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm"
                          />
                        </div>

                        <div className="relative">
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2 ml-1">
                            Número de Documento
                          </label>
                          <input 
                            type="text" 
                            required
                            value={docNumber}
                            onChange={(e) => setDocNumber(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                            placeholder="ID Único"
                            className="w-full px-6 py-4 bg-[#f5f2ed] border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm"
                          />
                          <AnimatePresence>
                            {isSearching && (
                              <motion.span 
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute -bottom-6 left-1 text-[9px] text-emerald-600 font-medium italic"
                              >
                                Consultando base de datos global...
                              </motion.span>
                            )}
                            {isFound && !isSearching && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute -bottom-14 left-0 right-0 p-3 bg-emerald-50 border border-emerald-100 rounded-xl z-20"
                              >
                                <p className="text-[10px] text-emerald-800 leading-tight">
                                  <span className="font-bold">¡Te encontramos!</span> Solo asigna una contraseña para activar tu perfil en Colombia.
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className={isFound ? "pt-12" : ""}>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2 ml-1">
                            Número de Celular
                          </label>
                          <input 
                            type="tel" 
                            required
                            placeholder="300 123 4567"
                            className="w-full px-6 py-4 bg-[#f5f2ed] border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2 ml-1">
                            Contraseña
                          </label>
                          <input 
                            type="password" 
                            required
                            placeholder="••••••••"
                            className="w-full px-6 py-4 bg-[#f5f2ed] border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm"
                          />
                        </div>
                      </div>
                      <button 
                        disabled={isIdentifying}
                        className="w-full py-5 bg-[#1a1a1a] text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-black/10 mt-4"
                      >
                        {isIdentifying ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Procesando...
                          </>
                        ) : 'Unirme al Ecosistema'}
                      </button>
                    </>
                  )}
                </form>
                
                <p className="text-center mt-10 text-[9px] uppercase tracking-[0.2em] text-black/20 leading-relaxed">
                  Al continuar, aceptas que LA MODA ES VIDA vincule tu identidad <br />
                  con nuestra base de datos global de estilo.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-visible">
        
        {/* MÓDULO DE IDENTIFICACIÓN (Estrategia Tecnológica) */}
        {!user && (
          <section id="registro" className="mb-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-emerald-500 font-bold text-xs uppercase tracking-[0.3em] mb-4 block underline decoration-emerald-500/30 underline-offset-8">Módulo de Identificación</span>
                <h2 className="font-serif text-4xl md:text-5xl mb-8 italic">Reconocimiento Cero Fricción.</h2>
                <div className="space-y-6 text-black/60 leading-relaxed font-light">
                  <p>
                    {STRATEGY.valueProposition}
                  </p>
                  <div className="p-8 bg-white rounded-3xl border border-black/5 shadow-sm">
                    <h4 className="font-bold text-black mb-4 flex items-center gap-2">
                      <ShieldCheck size={18} className="text-emerald-500" />
                      Nota Técnica:
                    </h4>
                    <p className="text-sm leading-relaxed">
                      Solicitamos tu información una única vez. A partir de este momento, nuestro ecosistema inteligente reconocerá tu identidad en cada visita futura, eliminando la necesidad de formularios redundantes y personalizando tu experiencia al instante basándose en tu ID único.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-black/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <UserPlus size={120} />
                </div>
                
                <h3 className="font-serif text-3xl mb-8">Unirme al Ecosistema</h3>
                <form onSubmit={handleAuth} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-1">Tipo de Documento</label>
                    <select 
                      value={docType}
                      onChange={(e) => setDocType(e.target.value)}
                      className="w-full px-5 py-4 bg-[#f5f2ed] border-none rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-sm outline-none cursor-pointer appearance-none"
                    >
                      <option value="CC">Cédula de Ciudadanía (CC)</option>
                      <option value="TI">Tarjeta de Identidad (TI)</option>
                      <option value="Pasaporte">Pasaporte</option>
                      <option value="NIT">NIT (Empresas)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-1">
                        {docType === 'NIT' ? 'Razón Social' : 'Nombre'}
                      </label>
                      <input type="text" required placeholder={docType === 'NIT' ? "Moda SAS" : "Mariana"} className="w-full px-5 py-4 bg-[#f5f2ed] border-none rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-sm outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-1">
                        {docType === 'NIT' ? 'Rep. Legal' : 'Apellido'}
                      </label>
                      <input type="text" required placeholder={docType === 'NIT' ? "Pedro Pérez" : "Valencia"} className="w-full px-5 py-4 bg-[#f5f2ed] border-none rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-sm outline-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-1">Correo Electrónico</label>
                    <input type="email" required placeholder="contacto@moda.co" className="w-full px-5 py-4 bg-[#f5f2ed] border-none rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-sm outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-1">Documento (ID Único)</label>
                      <input 
                        type="text" 
                        required 
                        value={docNumber}
                        onChange={(e) => setDocNumber(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                        placeholder="Número de ID" 
                        className="w-full px-5 py-4 bg-[#f5f2ed] border-none rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-sm font-mono outline-none" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-1">Celular</label>
                      <input type="tel" required placeholder="300..." className="w-full px-5 py-4 bg-[#f5f2ed] border-none rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-sm outline-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-1">Contraseña</label>
                    <input type="password" required placeholder="••••••••" className="w-full px-5 py-4 bg-[#f5f2ed] border-none rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-sm outline-none" />
                  </div>
                  <button className="w-full py-5 bg-[#1a1a1a] text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-black/10 mt-4 flex items-center justify-center gap-3 font-serif italic text-lg tracking-normal">
                    {isIdentifying ? 'Vinculando ID...' : 'Crear mi Perfil en el Ecosistema'}
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* Unified Ecosystem Dashboard (Authenticated Only) */}
        <AnimatePresence>
          {user && (
            <motion.section 
              id="ecosistema-dashboard"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-32"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px flex-1 bg-black/10" />
                <h2 className="font-serif text-3xl italic">Mi Espacio & Beneficios</h2>
                <div className="h-px flex-1 bg-black/10" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Panel 1: Identidad */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 flex flex-col gap-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-emerald-100 border-2 border-emerald-50">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" 
                        alt="Profile"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{user.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold">{user.city}, Colombia</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#f5f2ed] rounded-2xl">
                      <span className="block text-[9px] uppercase tracking-wider text-black/40 mb-1 font-bold">Mis Tallas</span>
                      <span className="font-bold text-sm">{user.suggestedSize}</span>
                    </div>
                    <div className="p-4 bg-[#f5f2ed] rounded-2xl">
                      <span className="block text-[9px] uppercase tracking-wider text-black/40 mb-1 font-bold">Identificación</span>
                      <span className="font-bold text-sm tracking-tighter">ID: {user.id}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Panel 2: Estatus de Fidelidad */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-[#1a1a1a] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Star size={100} />
                  </div>
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Círculo Vida</span>
                        <span className="px-2 py-0.5 bg-blue-500 text-[9px] font-bold rounded-full uppercase tracking-widest">{user.tier}</span>
                      </div>
                      <div className="mb-6">
                        <span className="text-4xl font-serif block">{user.loyaltyPoints}</span>
                        <span className="text-[9px] uppercase tracking-widest text-blue-400 font-bold">Puntos Acumulados</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase text-white/40">
                        <span>Nivel de Socio: {user.tier}</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-3/4" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Panel 3: Beneficios Exclusivos */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Zap size={20} className="text-white/80" />
                    <h3 className="text-sm font-bold uppercase tracking-widest">Beneficios Exclusivos</h3>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div className="p-4 bg-white/10 border border-white/20 rounded-2xl">
                      <p className="text-[10px] uppercase font-bold text-white/60 mb-1">Cupón del Clima</p>
                      <p className="font-bold text-sm mb-1 leading-tight">20% en abrigos por frío en {user.city}</p>
                      <span className="text-[9px] font-mono bg-white text-blue-600 px-2 py-1 rounded">BOG20-COL</span>
                    </div>
                    <div className="p-4 bg-white/10 border border-white/20 rounded-2xl">
                      <p className="text-[10px] uppercase font-bold text-white/60 mb-1">Envío Express</p>
                      <p className="font-bold text-sm leading-tight italic">Activo en tu próxima orden</p>
                    </div>
                  </div>
                  
                  <button className="w-full py-4 bg-white text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-blue-50 transition-all mt-6 shadow-lg shadow-black/10">
                    Ver todos mis cupones
                  </button>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Catálogo Inteligente y Multi-Categoría */}
        <section id="tendencias" className="mb-32">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.4em] mb-4 block">Ecosistema de Selección</span>
            <h2 className="font-serif text-5xl italic">Catálogo Inteligente</h2>
            <div className="max-w-2xl mx-auto mt-6 p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex items-center gap-4 justify-center">
              <ShieldCheck size={18} className="text-emerald-700 shrink-0" />
              <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-800 leading-tight">
                Nota Técnica: Catálogo pre-filtrado por tu Talla registrada ({user?.suggestedSize || 'Cargando...'}) para una experiencia de Cero Fricción.
              </p>
            </div>
          </div>

          {/* Quick Filter Bar */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-16 px-4">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                  selectedCategory === cat 
                    ? 'bg-[#1a1a1a] text-white border-black shadow-md' 
                    : 'bg-white text-black/40 border-black/5 hover:border-emerald-300 hover:text-emerald-600'
                }`}
              >
                {cat === 'TODO' ? 'TODOS' : cat}
              </button>
            ))}
            <button 
              onClick={() => setSelectedCategory('COMBOS')}
              className={`px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 border-2 ${
                selectedCategory === 'COMBOS'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-lg'
                  : 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              <Zap size={14} className={selectedCategory === 'COMBOS' ? 'text-white' : 'text-emerald-600'} />
              COMBOS & OUTFITS
            </button>
          </div>

          <AnimatePresence mode="wait">
            {selectedCategory === 'COMBOS' ? (
              <motion.div 
                key="combos-section"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-12"
              >
                <div className="p-8 md:p-12 bg-emerald-50 rounded-[4rem] border border-emerald-100 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-200/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                  <div className="flex-1 space-y-6 relative z-10">
                    <span className="px-4 py-1 bg-white text-emerald-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-emerald-200">Value Proposition: Smart Suggestion</span>
                    <h3 className="font-serif text-4xl italic">Combo Ejecutivo Inteligente</h3>
                    <p className="text-black/60 font-light leading-relaxed">
                      Sugerido automáticamente basándonos en tu historial y estilo global {user?.id}. Incluye: Camisa de Lino + Pantalón Slim Fit + Zapatos de Cuero Artesanal.
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-serif">$485.000 <span className="text-sm line-through text-black/20 font-sans ml-2">$570.000</span></span>
                      <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-widest">-15% OFF</span>
                    </div>
                    <button 
                      onClick={() => addToCart({ id: 99, title: "Combo Ejecutivo", price: "$485.000", img: "https://images.unsplash.com/photo-1598454061631-40ff1c418ad1?auto=format&fit=crop&q=80&w=400", cat: "COMBOS", tag: "Especial" })}
                      className="px-10 py-4 bg-emerald-600 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200"
                    >
                      Añadir Combo a la Bolsa
                    </button>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <img src="https://images.unsplash.com/photo-1598454061631-40ff1c418ad1?auto=format&fit=crop&q=80&w=400" alt="Item 1" className="rounded-3xl shadow-lg border-4 border-white aspect-square object-cover" referrerPolicy="no-referrer" />
                    <img src="https://images.unsplash.com/photo-1620012253295-c05c2e485547?auto=format&fit=crop&q=80&w=400" alt="Item 2" className="rounded-3xl shadow-lg border-4 border-white aspect-square object-cover translate-y-8" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="products-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
              >
                {[
                  { id: 1, cat: "ABRIGOS", title: "Abrigo Camel Alpaca", price: "$420.000", tag: "Ideal para Bogotá", img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=600" },
                  { id: 2, cat: "CAMISAS", title: "Camisa Lino Caribe", price: "$185.000", tag: "Ideal para Barranquilla", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=600" },
                  { id: 3, cat: "PANTALONES", title: "Pantalon Chino Olivo", price: "$145.000", tag: "Clima templado", img: "https://images.unsplash.com/photo-1473966968600-fa804b86829b?auto=format&fit=crop&q=80&w=600" },
                  { id: 4, cat: "ZAPATOS", title: "Mocasín Cuero Café", price: "$295.000", tag: "Todo clima", img: "https://images.unsplash.com/photo-1614252235316-8c8ec6971911?auto=format&fit=crop&q=80&w=600" },
                  { id: 5, cat: "CHAQUETAS", title: "Bomer Acolchada", price: "$220.000", tag: "Perfecta para Medellín", img: "https://images.unsplash.com/photo-1551028711-131da2813161?auto=format&fit=crop&q=80&w=600" },
                  { id: 6, cat: "CAMISAS", title: "Polo Premium Algodón", price: "$95.000", tag: "Fresco Barranquilla", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600" },
                  { id: 7, cat: "ABRIGOS", title: "Gabardina Marfil", price: "$380.000", tag: "Impermeable Bogotá", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600" },
                  { id: 8, cat: "PANTALONES", title: "Jeans Indigo Slim", price: "$165.000", tag: "Urbano Medellín", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600" },
                  { id: 9, cat: "ZAPATOS", title: "Sneaker Blanco Minimal", price: "$210.000", tag: "Todo clima", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=600" },
                  { id: 10, cat: "CHAQUETAS", title: "Chaqueta Denim Cuero", price: "$280.000", tag: "Cali Noche", img: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5dab1?auto=format&fit=crop&q=80&w=600" },
                  { id: 11, cat: "CAMISAS", title: "Oxford Celeste", price: "$155.000", tag: "Versátil", img: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?auto=format&fit=crop&q=80&w=600" },
                  { id: 12, cat: "PANTALONES", title: "Cargo Tech Negro", price: "$195.000", tag: "Urbano Medellín", img: "https://images.unsplash.com/photo-1473966968600-fa804b86829b?auto=format&fit=crop&q=80&w=600" }
                ].filter(p => selectedCategory === 'TODO' || p.cat === selectedCategory).map((product) => (
                  <motion.div 
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#f5f2ed] mb-4">
                      <img 
                        src={product.img} 
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-widest text-[#1a1a1a] shadow-sm flex items-center gap-1.5">
                          {product.tag.includes('Bogotá') ? <Wind size={10} /> : <Sun size={10} />}
                          {product.tag}
                        </span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform bg-gradient-to-t from-black/80 to-transparent">
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-full py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-lg"
                        >
                          Añadir a la Bolsa
                        </button>
                      </div>
                    </div>
                    <div className="px-2">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-600 block mb-1">{product.cat}</span>
                      <h4 className="font-serif text-lg leading-tight mb-1">{product.title}</h4>
                      <p className="text-black/40 text-sm font-light italic">{product.price} COP</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Sección Sostenibilidad (Penúltima) */}
        <section id="sostenibilidad" className="bg-[#f0f4f0] text-[#2c3e2c] rounded-[4rem] p-12 md:p-20 overflow-hidden relative border border-emerald-100 mb-20">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-10">
              <span className="text-emerald-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Legado Ético</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 italic">Sostenibilidad con Alma</h2>
              <p className="text-lg md:text-xl text-[#2c3e2c]/60 leading-relaxed font-light max-w-2xl mx-auto mb-10">
                En LA MODA ES VIDA, nuestro compromiso no termina en el diseño. Honramos la tierra colombiana utilizando fibras naturales y procesos de teñido circular.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { title: "Materiales Nobles", desc: "Lino orgánico y algodón recuperado.", icon: <Star size={16} /> },
                { title: "Ética Circular", desc: "Cero desperdicio en patronaje.", icon: <ShieldCheck size={16} /> },
                { title: "Herencia Viva", desc: "Producción con maestros artesanos.", icon: <Heart size={16} /> }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white/40 rounded-3xl border border-white/60 backdrop-blur-sm hover:shadow-md transition-all">
                  <div className="text-emerald-700 mb-3">{item.icon}</div>
                  <h4 className="font-bold text-[11px] uppercase tracking-widest mb-1.5">{item.title}</h4>
                  <p className="text-[11px] text-[#2c3e2c]/50 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN "NUESTRO ADN" (Cierre Estratégico) */}
        <section id="adn" className="mb-20 pt-4">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 items-start">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div>
                  <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-1 block">Identidad</span>
                  <h3 className="font-serif text-4xl mb-3">Nuestra <br /><span className="italic">Misión</span></h3>
                  <div className="w-12 h-0.5 bg-emerald-500 mb-4" />
                </div>
                <p className="text-lg text-black/80 leading-snug font-light italic">
                  "{STRATEGY.mission}"
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4 pt-8 md:pt-20"
              >
                <div>
                  <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-1 block">Futuro</span>
                  <h3 className="font-serif text-4xl mb-3">Nuestra <br /><span className="italic text-emerald-500">Visión</span></h3>
                  <div className="w-12 h-0.5 bg-black mb-4" />
                </div>
                <p className="text-base text-black/50 leading-snug font-light">
                  {STRATEGY.vision}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer / Sitemap */}
      <footer className="bg-[#1a1a1a] text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full">
                  <span className="text-black font-serif text-xl font-bold">V</span>
                </div>
                <span className="font-serif text-2xl tracking-tighter font-bold uppercase">La Moda es Vida</span>
              </div>
              <p className="text-white/40 max-w-sm mb-6 italic font-serif text-xl">
                "El estilo que ya te conoce."
              </p>
              <p className="text-white/20 max-w-xs text-[10px] uppercase tracking-widest leading-loose">
                Transformando el lujo contemporáneo en un ecosistema inteligente para Colombia.
              </p>
              <div className="flex gap-4 mt-8">
                {['Instagram', 'TikTok', 'LinkedIn'].map(social => (
                  <button key={social} className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-emerald-400 transition-colors">
                    {social}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-bold uppercase tracking-widest text-xs mb-8 text-white/60">Sitemap</h5>
              <ul className="space-y-4">
                {SITEMAP.map(item => (
                  <li key={item.name}>
                    <button className="text-sm text-white/40 hover:text-white transition-colors">
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-bold uppercase tracking-widest text-xs mb-8 text-white/60">Contacto</h5>
              <p className="text-sm text-white/40 mb-4">Bogotá, Colombia • Calle 93 #12-45</p>
              <p className="text-sm text-white/40">hola@lamodaesvida.co</p>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
              © 2026 LA MODA ES VIDA S.A.S. • Todos los derechos reservados.
            </p>
            <div className="flex gap-8">
              <button className="text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors">Privacidad</button>
              <button className="text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors">Términos</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
