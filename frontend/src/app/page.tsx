"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  Utensils,
  MapPin,
  Clock,
  CheckCircle,
  ChevronRight,
  Smartphone,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  Menu as MenuIcon,
  X,
  Star,
  Quote
} from "lucide-react";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  foodType: "Veg" | "Non-Veg" | "Both";
}

export default function LandingPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    items: "",
  });

  const WHATSAPP_NUMBER = "+919010123973";

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/api/menu`)
      .then((res) => res.json())
      .then((data) => {
        setMenu(data.items || []);
      })
      .catch((err) => console.error("Error fetching menu:", err));
  }, []);

  const categories = ["All", ...Array.from(new Set(menu.map((item) => item.category)))];
  const filteredMenu = activeCategory === "All" ? menu : menu.filter((i) => i.category === activeCategory);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("loading");

    const message = `*Srinu Lunch Basket - New Order*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Address:* ${formData.address}\n*Items:* ${formData.items}\n\n_Please confirm our order._`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Also save to backend
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: formData.name,
        phoneNumber: formData.phone,
        deliveryAddress: formData.address,
        orderItems: [{ name: formData.items, quantity: 1, foodType: "Veg" }],
      }),
    }).finally(() => {
      setBookingStatus("success");
      setTimeout(() => setBookingStatus("idle"), 3000);
    });
  };

  return (
    <div className="bg-[#0F1115] text-[#F8F9FA] selection:bg-[#D4AF37] selection:text-black">

      {/* Navigation */}
      <nav className="fixed w-full z-50 glass-premium border-b border-white/5 top-0 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-full border border-[#D4AF37]/30">
              <Image
                src="/images/logo.png"
                alt="Srinu Lunch Basket"
                fill
                className="object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-2xl font-bold text-gradient-gold">Srinu Lunch Basket</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10 font-medium text-sm tracking-wide">
            <a href="#menu" className="hover:text-[#D4AF37] transition-colors">OUR MENU</a>
            <a href="#about" className="hover:text-[#D4AF37] transition-colors">PHILOSOPHY</a>
            <a href="#booking" className="hover:text-[#D4AF37] transition-colors">ORDER NOW</a>
            <Link href="/help-center" className="bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 transition-colors">SUPPORT</Link>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0F1115] pt-24 px-8 animate-fade-in md:hidden">
          <div className="flex flex-col gap-8 text-2xl font-bold">
            <a href="#menu" onClick={() => setMobileMenuOpen(false)}>Menu</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>Our Story</a>
            <a href="#booking" onClick={() => setMobileMenuOpen(false)}>Order Now</a>
            <Link href="/help-center" onClick={() => setMobileMenuOpen(false)}>Help Center</Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#D4AF37]/5 blur-[120px] rounded-full -mr-40 mt-20" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-blue-500/5 blur-[100px] rounded-full -ml-20 mb-20" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="animate-fade-in [animation-delay:200ms]">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-2 rounded-full text-xs font-bold mb-8 border border-[#D4AF37]/20 uppercase tracking-[0.2em]">
              <Star className="w-3 h-3 fill-[#D4AF37]" /> The Gold Standard of Home Dining
            </div>
            <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8">
              Lunch <br />
              <span className="text-gradient-gold">Redefined.</span>
            </h1>
            <p className="text-[#ADB5BD] text-xl mb-12 max-w-lg leading-relaxed">
              Authentic flavors, premium ingredients, and the warmth of home. Delivered with precision to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="#menu" className="bg-[#D4AF37] text-black px-10 py-5 rounded-full font-bold text-center hover:scale-105 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
                Explore the Collection
              </a>
              <a href="#booking" className="border border-white/20 hover:border-[#D4AF37] px-10 py-5 rounded-full font-bold text-center transition-all bg-white/5 backdrop-blur-sm">
                Reserve your Box
              </a>
            </div>
          </div>

          <div className="relative aspect-square animate-fade-in [animation-delay:400ms] hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent z-10" />
            <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/menu/veg-thali.png"
                alt="Premium Thali"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 glass-premium p-8 rounded-3xl border-[#D4AF37]/30 max-w-sm animate-fade-in [animation-delay:600ms] z-20">
              <Quote className="w-8 h-8 text-[#D4AF37] mb-4 opacity-50" />
              <p className="italic text-lg text-white mb-4">"Hands down the best lunch I've ever had delivered. It feels like a boutique dining experience at my desk."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500" />
                <div>
                  <div className="font-bold text-sm">Arjun Sharma</div>
                  <div className="text-[10px] text-[#ADB5BD] uppercase tracking-widest leading-none">Food Critic</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Indicators */}
      <section className="py-12 glass-premium border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Handcrafted Recipes", val: "50+", icon: Utensils },
            { label: "City-wide Reach", val: "100%", icon: MapPin },
            { label: "On-time Delivery", val: "99.9%", icon: Clock },
            { label: "Loyal Customers", val: "1k+", icon: CheckCircle },
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <item.icon className="w-6 h-6 mx-auto mb-4 text-[#D4AF37] group-hover:scale-125 transition-transform" />
              <div className="text-3xl font-bold text-white mb-1">{item.val}</div>
              <div className="text-[10px] text-[#ADB5BD] uppercase tracking-widest">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-xl animate-fade-in">
              <h2 className="text-5xl font-bold mb-6">Today's <span className="text-gradient-gold">Selections</span></h2>
              <p className="text-[#ADB5BD] text-lg leading-relaxed">Curated dishes prepared daily with fresh seasonal ingredients. Choose your experience.</p>
            </div>
            <div className="flex flex-wrap gap-4 animate-fade-in">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-full text-xs font-bold tracking-[0.1em] uppercase transition-all ${activeCategory === cat
                      ? "bg-[#D4AF37] text-black shadow-lg"
                      : "bg-white/5 text-[#ADB5BD] hover:bg-white/10"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {filteredMenu.map((item, i) => (
              <div key={item._id} className="group animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="glass-premium rounded-[2.5rem] overflow-hidden hover-gold-glow transition-all duration-500">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={item.image || "/images/placeholder.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 right-6 glass-premium px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase border-white/10">
                      {item.foodType}
                    </div>
                  </div>
                  <div className="p-10">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold group-hover:text-[#D4AF37] transition-colors">{item.name}</h3>
                      <span className="text-xl font-bold text-[#D4AF37]">₹{item.price}</span>
                    </div>
                    <p className="text-[#ADB5BD] text-sm leading-relaxed mb-10 line-clamp-2 italic">“{item.description}”</p>
                    <button
                      onClick={() => {
                        setFormData({ ...formData, items: item.name });
                        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full bg-white/5 group-hover:bg-[#D4AF37] group-hover:text-black py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                      Experience This <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-32 px-6 bg-gradient-to-b from-transparent to-[#0a0a0c]">
        <div className="max-w-7xl mx-auto">
          <div className="glass-premium rounded-[3rem] p-12 md:p-24 grid lg:grid-cols-2 gap-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

            <div className="relative z-10 animate-fade-in">
              <h2 className="text-5xl font-bold mb-8 leading-tight">Secure Your <br /><span className="text-gradient-gold">Luxury Meal.</span></h2>
              <p className="text-[#ADB5BD] text-lg mb-12 leading-relaxed">
                Confirm your order via our secure WhatsApp bridge. A personal concierge will handle your delivery details immediately.
              </p>

              <div className="space-y-8">
                {[
                  { label: "Premium Packaging", desc: "Eco-friendly insulated containers and high-end cutlery." },
                  { label: "Real-time Tracking", desc: "Instant updates via WhatsApp from kitchen to doorstep." },
                  { label: "Fresh Guarantee", desc: "Meals prepared just minutes before delivery." }
                ].map((f, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex-shrink-0 flex items-center justify-center border border-[#D4AF37]/20">
                      <CheckCircle className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">{f.label}</div>
                      <div className="text-sm text-[#ADB5BD]">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-6 relative z-10 animate-fade-in [animation-delay:200ms]">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest pl-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest pl-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 999 999 9999"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest pl-2">Delivery Address</label>
                <textarea
                  placeholder="Enter full address and landmark"
                  required
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#D4AF37] transition-all text-sm resize-none"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest pl-2">Special Notes / Items</label>
                <input
                  type="text"
                  placeholder="Specify items or spice levels"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
                  value={formData.items}
                  onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                />
              </div>
              <button
                type="submit"
                disabled={bookingStatus === "loading"}
                className={`w-full py-6 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${bookingStatus === "success"
                    ? "bg-green-500 text-white"
                    : "bg-white text-black hover:bg-[#D4AF37]"
                  }`}
              >
                {bookingStatus === "loading" ? "Initializing..." : bookingStatus === "success" ? <>Order Placed <CheckCircle /></> : <>Confirm via WhatsApp <MessageCircle className="w-5 h-5" /></>}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-32 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="relative w-10 h-10 overflow-hidden rounded-full border border-[#D4AF37]/30">
                  <Image src="/images/logo.png" alt="Logo" fill />
                </div>
                <span className="text-2xl font-bold text-gradient-gold">Srinu Lunch Basket</span>
              </div>
              <p className="text-[#ADB5BD] max-w-sm text-lg leading-relaxed mb-10">
                Elevating home-style Indian cuisine into a premium daily dining experience.
              </p>
              <div className="flex gap-6">
                <Instagram className="w-5 h-5 text-[#ADB5BD] hover:text-[#D4AF37] cursor-pointer" />
                <Facebook className="w-5 h-5 text-[#ADB5BD] hover:text-[#D4AF37] cursor-pointer" />
                <Twitter className="w-5 h-5 text-[#ADB5BD] hover:text-[#D4AF37] cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-8 tracking-widest uppercase">Concierge</h4>
              <ul className="space-y-4 text-sm text-[#ADB5BD]">
                <li><Link href="/help-center" className="hover:text-[#D4AF37]">Help Center</Link></li>
                <li><a href="#menu" className="hover:text-[#D4AF37]">Menu Guide</a></li>
                <li><a href="#about" className="hover:text-[#D4AF37]">Quality Standards</a></li>
                <li><Link href="/help-center" className="hover:text-[#D4AF37]">Contact Support</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-8 tracking-widest uppercase">Legal</h4>
              <ul className="space-y-4 text-sm text-[#ADB5BD]">
                <li><Link href="/privacy" className="hover:text-[#D4AF37]">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#D4AF37]">Terms of Service</Link></li>
                <li><a href="#" className="hover:text-[#D4AF37]">Cookies</a></li>
                <li><a href="#" className="hover:text-[#D4AF37]">Cancellation Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-[#555] font-bold tracking-[0.3em] uppercase">
            <div>© 2026 Srinu Lunch Basket. All Individual Rights Reserved.</div>
            <div className="flex gap-10">
              <span className="flex items-center gap-2"><Smartphone className="w-3 h-3" /> +91 90101 23973</span>
              <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Hyderabad, India</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`}
        target="_blank"
        className="fixed bottom-10 right-10 bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 group border-4 border-[#0F1115]"
      >
        <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
        <span className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
          Order via WhatsApp
        </span>
      </a>

    </div>
  );
}
