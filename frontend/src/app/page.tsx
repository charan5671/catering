"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Phone, MapPin, Users, Clock, ShoppingBag, Send } from "lucide-react";

// Lucide icons need to be imported or handled if not using lucide-react, 
// for simplicity here I'll use SVGs or standard elements if lucide isn't available.
// Assuming lucide-react is installed since it's common in Next.js projects.
// If not, I'll fallback to SVG.

type MenuItem = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  foodType: "Veg" | "Non-Veg";
};

export default function Home() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    numberOfPeople: 5,
    eventDate: "",
    eventAddress: "",
    foodType: "Veg" as const,
    dishIds: [] as string[],
    specialInstructions: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenu(data.items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch menu:", err);
        setLoading(false);
      });
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate WhatsApp Message
    const dishNames = menu
      .filter((m) => booking.dishIds.includes(m._id))
      .map((m) => m.name)
      .join(", ");

    const message = `*New Lunch Booking Request*\n\n` +
      `*Name:* ${booking.name}\n` +
      `*Phone:* ${booking.phone}\n` +
      `*People:* ${booking.numberOfPeople}\n` +
      `*Date:* ${booking.eventDate}\n` +
      `*Address:* ${booking.eventAddress}\n` +
      `*Food Type:* ${booking.foodType}\n` +
      `*Dishes:* ${dishNames}\n` +
      `*Note:* ${booking.specialInstructions}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/91XXXXXXXXXX?text=${encodedMessage}`; // Replace with actual phone

    window.open(whatsappUrl, "_blank");

    // Also save to backend if needed
    fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...booking,
        email: "placeholder@example.com", // Backend requires email in schema
        eventDate: new Date(booking.eventDate).toISOString(),
      }),
    })
      .then(res => res.json())
      .then(data => console.log("Booking saved:", data))
      .catch(err => console.error("Error saving booking:", err));
  };

  const toggleDish = (id: string) => {
    setBooking((prev) => ({
      ...prev,
      dishIds: prev.dishIds.includes(id)
        ? prev.dishIds.filter((dishId) => dishId !== id)
        : [...prev.dishIds, id],
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">S</div>
            <span className="text-xl font-bold tracking-tight">Srinu Lunch Basket</span>
          </div>
          <div className="hidden space-x-8 md:flex font-medium">
            <a href="#menu" className="transition-colors hover:text-primary">Menu</a>
            <a href="#order" className="transition-colors hover:text-primary">Order Now</a>
            <a href="#contact" className="transition-colors hover:text-primary">Contact</a>
          </div>
          <a href="#order" className="rounded-full bg-primary px-6 py-2 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-transform active:scale-95">
            Book Now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 h-full w-1/3 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl mb-6">
              Homemade <span className="gradient-text">Deliciousness</span> <br />
              Delivered To Your Door
            </h1>
            <p className="mb-8 text-lg text-foreground/70 max-w-lg leading-relaxed">
              Experience the authentic taste of home-cooked luxury. Srinu Lunch Basket brings you curated menus, fresh ingredients, and love in every bite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#menu" className="flex items-center justify-center gap-2 rounded-xl bg-foreground px-8 py-4 text-background font-bold transition-all hover:bg-foreground/90">
                Explore Menu
              </a>
              <div className="flex items-center gap-4 px-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="size-10 rounded-full border-2 border-background bg-zinc-200 overflow-hidden">
                      <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" width={40} height={40} />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold">500+ Happy Clients</p>
                  <p className="text-foreground/60">Across the city</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 lg:mt-0 lg:w-1/2 relative">
            <div className="relative aspect-square w-full max-w-lg mx-auto overflow-hidden rounded-3xl shadow-2xl rotate-3 group transition-transform hover:rotate-0">
              <Image
                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000"
                alt="Delicious Lunch Thali"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-2xl text-foreground">
                <p className="font-bold">✨ Today's Special</p>
                <p className="text-sm opacity-80">Full Authentic Veg Thali - Ready at 12 PM</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats/Features */}
      <section className="bg-white dark:bg-black/20 py-16 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Fresh Ingredients", icon: "🌱" },
            { label: "Express Delivery", icon: "🚀" },
            { label: "Eco-Friendly", icon: "📦" },
            { label: "Quality Taste", icon: "⭐" },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="font-bold">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Curated Menu</h2>
            <p className="text-foreground/60">Hand-picked dishes prepared with traditional recipes</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <div key={i} className="h-80 rounded-3xl bg-zinc-100 dark:bg-zinc-800 animate-pulse"></div>)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menu.map((item) => (
                <div
                  key={item._id}
                  className={`group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-4 transition-all hover:shadow-xl hover:-translate-y-1 ${booking.dishIds.includes(item._id) ? 'ring-2 ring-primary bg-primary/5' : ''}`}
                  onClick={() => toggleDish(item._id)}
                >
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-2xl">
                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute top-2 left-2 rounded-full bg-white/90 dark:bg-black/80 px-3 py-1 text-xs font-bold flex items-center gap-1">
                      <span className={item.foodType === 'Veg' ? 'text-green-600' : 'text-red-600'}>●</span> {item.foodType}
                    </div>
                    <div className="absolute bottom-2 right-2 rounded-full bg-primary px-3 py-1 text-sm font-bold text-white">
                      ₹{item.price}
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{item.name}</h3>
                  <p className="mb-4 text-sm text-foreground/60 line-clamp-2">{item.description}</p>
                  <button className={`mt-auto w-full rounded-xl py-2 font-bold transition-colors ${booking.dishIds.includes(item._id) ? 'bg-primary text-white' : 'bg-secondary border border-border hover:bg-primary hover:text-white'}`}>
                    {booking.dishIds.includes(item._id) ? 'Selected' : 'Add to Order'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Booking Section */}
      <section id="order" className="py-24 bg-primary/5">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-[2.5rem] bg-card p-10 shadow-2xl shadow-primary/10 border border-primary/10">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-2">Place Your Order</h2>
              <p className="text-foreground/60 italic">Orders confirmed instantly via WhatsApp</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-bold flex items-center gap-2 px-1"><Users className="size-4 text-primary" /> Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Srinu"
                  className="w-full rounded-2xl border border-border bg-background p-4 outline-none focus:ring-2 focus:ring-primary/50"
                  value={booking.name}
                  onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold flex items-center gap-2 px-1"><Phone className="size-4 text-primary" /> Phone Number</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 00000 00000"
                  className="w-full rounded-2xl border border-border bg-background p-4 outline-none focus:ring-2 focus:ring-primary/50"
                  value={booking.phone}
                  onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold flex items-center gap-2 px-1"><Clock className="size-4 text-primary" /> Number of People</label>
                <input
                  required
                  type="number"
                  min="1"
                  className="w-full rounded-2xl border border-border bg-background p-4 outline-none focus:ring-2 focus:ring-primary/50"
                  value={booking.numberOfPeople}
                  onChange={(e) => setBooking({ ...booking, numberOfPeople: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold flex items-center gap-2 px-1"><Clock className="size-4 text-primary" /> Event Date & Time</label>
                <input
                  required
                  type="datetime-local"
                  className="w-full rounded-2xl border border-border bg-background p-4 outline-none focus:ring-2 focus:ring-primary/50"
                  value={booking.eventDate}
                  onChange={(e) => setBooking({ ...booking, eventDate: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-bold flex items-center gap-2 px-1"><MapPin className="size-4 text-primary" /> Delivery Address</label>
                <textarea
                  required
                  rows={3}
                  placeholder="123 Street, Area, City"
                  className="w-full rounded-2xl border border-border bg-background p-4 outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  value={booking.eventAddress}
                  onChange={(e) => setBooking({ ...booking, eventAddress: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-bold px-1">Special Instructions (Optional)</label>
                <input
                  type="text"
                  placeholder="Less spicy, extra curd, etc."
                  className="w-full rounded-2xl border border-border bg-background p-4 outline-none focus:ring-2 focus:ring-primary/50"
                  value={booking.specialInstructions}
                  onChange={(e) => setBooking({ ...booking, specialInstructions: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={booking.dishIds.length === 0}
                className="md:col-span-2 mt-4 w-full rounded-2xl bg-primary py-5 text-xl font-bold text-white shadow-xl shadow-primary/20 transition-all hover:shadow-2xl hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:grayscale cursor-pointer"
              >
                Confirm via WhatsApp <Send className="inline-block ml-2 size-6" />
              </button>
              {booking.dishIds.length === 0 && <p className="md:col-span-2 text-center text-sm text-red-500 font-medium">Please select at least one item from the menu above</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/91XXXXXXXXXX"
        target="_blank"
        className="fixed bottom-8 right-8 z-[100] flex size-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/30 transition-transform hover:scale-110 active:scale-90"
      >
        <Phone className="size-8" />
        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold ring-2 ring-white">1</span>
      </a>

      {/* Footer */}
      <footer id="contact" className="py-20 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 italic">Srinu Lunch Basket</h3>
              <p className="text-background/60 leading-relaxed">Crafting taste, delivering happiness. Your daily dose of home-cooked luxury.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-background/60">
                <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="#menu" className="hover:text-primary transition-colors">Our Menu</a></li>
                <li><a href="#order" className="hover:text-primary transition-colors">Order Now</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-background/60">
                <li>Help Center</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-background/10 text-center text-background/40 text-sm">
            © {new Date().getFullYear()} Srinu Lunch Basket. All rights reserved. Built with ❤️ for Srinu.
          </div>
        </div>
      </footer>
    </div>
  );
}
