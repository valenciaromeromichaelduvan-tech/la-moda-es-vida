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
  MapPin
} from 'lucide-react';
import { STRATEGY, SITEMAP } from './constants';
import { User } from './types';

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
      preferences: ["Moda Urbana", "Accesorios Artesanales"]
    };
    
    // We simulate that the user is "recognized" via a persistent session token
    return mockUser;
  }
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Simulate automatic identification on mount
    const identifiedUser = IdentificationService.getIdentifiedUser();
    if (identifiedUser) {
      setTimeout(() => setUser(identifiedUser), 1000); // Slight delay for "smart" feel
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f2ed] text-[#1a1a1a] font-sans selection:bg-emerald-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center rounded-full">
                <span className="text-white font-serif text-xl font-bold">V</span>
              </div>
              <span className="font-serif text-2xl tracking-tighter font-bold uppercase">La Moda es Vida</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {SITEMAP.slice(0, 4).map((item) => (
                <button 
                  key={item.name}
                  className="text-sm font-medium uppercase tracking-widest hover:text-emerald-700 transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <AnimatePresence>
                {user && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100"
                  >
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                      Hola, {user.name.split(' ')[0]}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <ShoppingBag size={20} />
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[80vh] flex items-center overflow-hidden bg-[#1a1a1a]">
        <div className="absolute inset-0 opacity-60">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
            alt="Colombian Fashion"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block px-4 py-1 border border-white/30 rounded-full text-xs font-semibold uppercase tracking-[0.3em] mb-6">
              Lanzamiento Colombia 2026
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] mb-8">
              La Moda <br />
              <span className="italic text-emerald-400">es</span> Vida
            </h1>
            <p className="text-lg text-white/80 font-light leading-relaxed mb-10 max-w-lg">
              {STRATEGY.valueProposition}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-emerald-400 transition-all rounded-sm">
                Explorar Tendencias
              </button>
              <button className="px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all rounded-sm">
                Nuestra Visión
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Smart Identification Section */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-black/10" />
            <h2 className="font-serif text-3xl italic">Mi Perfil Inteligente</h2>
            <div className="h-px flex-1 bg-black/10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Identification Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-black/5 flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-emerald-100 border-4 border-emerald-50">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" 
                    alt="Profile"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg">
                  <ShieldCheck size={20} />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold">{user ? user.name : 'Identificando...'}</h3>
                  {user && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Miembro {user.tier}
                    </span>
                  )}
                </div>
                <p className="text-black/50 text-sm mb-6">
                  {user ? `ID: ${user.id} • Sesión Segura Activa` : 'Buscando credenciales en el sistema...'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#f5f2ed] rounded-2xl">
                    <span className="block text-[10px] uppercase tracking-wider text-black/40 mb-1">Talla Sugerida</span>
                    <span className="font-bold">M / 8</span>
                  </div>
                  <div className="p-4 bg-[#f5f2ed] rounded-2xl">
                    <span className="block text-[10px] uppercase tracking-wider text-black/40 mb-1">Clima Local</span>
                    <span className="font-bold flex items-center gap-1">
                      <MapPin size={12} /> Bogotá, 14°C
                    </span>
                  </div>
                  <div className="p-4 bg-[#f5f2ed] rounded-2xl hidden sm:block">
                    <span className="block text-[10px] uppercase tracking-wider text-black/40 mb-1">Última Visita</span>
                    <span className="font-bold">Hoy</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Loyalty Dashboard */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#1a1a1a] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Star size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60 mb-8">Beneficios de Fidelidad</h3>
                <div className="mb-10">
                  <span className="text-5xl font-serif block mb-2">{user?.loyaltyPoints || 0}</span>
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Puntos Vida Acumulados</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Próximo Nivel: {user?.tier === 'Oro' ? 'Diamante' : 'Plata'}</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-3/4" />
                  </div>
                  <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all mt-4">
                    Canjear Beneficios
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trends Catalog */}
        <section className="mb-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.3em] mb-2 block">Curaduría Local</span>
              <h2 className="font-serif text-4xl">Tendencias Colombianas</h2>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-emerald-700 transition-colors group">
              Ver todo el catálogo <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Lino del Caribe", price: "$189.900", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" },
              { title: "Artesanal Chic", price: "$125.000", img: "https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?auto=format&fit=crop&q=80&w=800" },
              { title: "Urbano Medellín", price: "$210.000", img: "https://images.unsplash.com/photo-1554412930-c74f639447a9?auto=format&fit=crop&q=80&w=800" },
              { title: "Esenciales Bogotá", price: "$155.000", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-white">
                  <img 
                    src={item.img} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart size={18} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-full py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-lg">
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
                <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-black/50 text-sm">{item.price}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Business Strategy Section */}
        <section className="bg-white rounded-[4rem] p-12 md:p-24 border border-black/5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Estrategia Corporativa</span>
              <h2 className="font-serif text-5xl md:text-6xl mb-8">Nuestra Promesa</h2>
              <p className="text-xl text-black/60 font-light leading-relaxed">
                Adaptamos nuestra visión global a la calidez y diversidad del territorio colombiano.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
              <div>
                <h3 className="font-serif text-2xl italic mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm not-italic font-bold">M</span>
                  Misión
                </h3>
                <p className="text-black/70 leading-relaxed">
                  {STRATEGY.mission}
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl italic mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm not-italic font-bold">V</span>
                  Visión
                </h3>
                <p className="text-black/70 leading-relaxed">
                  {STRATEGY.vision}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {STRATEGY.values.map((value, i) => (
                <div key={i} className="p-6 bg-[#f5f2ed] rounded-3xl">
                  <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    {i === 0 && <TrendingUp size={20} className="text-emerald-600" />}
                    {i === 1 && <Zap size={20} className="text-amber-600" />}
                    {i === 2 && <ShieldCheck size={20} className="text-blue-600" />}
                    {i === 3 && <Heart size={20} className="text-rose-600" />}
                  </div>
                  <h4 className="font-bold mb-2">{value.name}</h4>
                  <p className="text-xs text-black/50 leading-relaxed">{value.description}</p>
                </div>
              ))}
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
              <p className="text-white/40 max-w-sm mb-8">
                Transformando el e-commerce en una experiencia de reconocimiento y estilo para cada colombiano.
              </p>
              <div className="flex gap-4">
                {['Instagram', 'TikTok', 'LinkedIn'].map(social => (
                  <button key={social} className="text-xs font-bold uppercase tracking-widest hover:text-emerald-400 transition-colors">
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
