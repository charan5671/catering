import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, HelpCircle, Phone, Mail } from 'lucide-react';

export default function HelpCenter() {
    const faqs = [
        {
            q: "How do I place an order?",
            a: "Simply browse our curated menu, select your preferred lunch basket, and click 'Confirm via WhatsApp'. This will bridge you to our official support line with your order details pre-filled."
        },
        {
            q: "What are the delivery timings?",
            a: "We deliver lunch between 12:00 PM and 2:00 PM. Please ensure your order is placed by 10:30 AM for same-day delivery."
        },
        {
            q: "Is there a subscription plan?",
            a: "Yes! We offer weekly and monthly subscription plans with exclusive discounts. Contact us via WhatsApp for a personalized plan."
        },
        {
            q: "Do you cater for events?",
            a: "Absolutely. Srinu Lunch Basket handles small to large-scale events. Reach out to us through our help center with your event details."
        }
    ];

    return (
        <div className="min-h-screen bg-[#0F1115] text-[#F8F9FA] p-6 lg:p-12">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-[#D4AF37] hover:underline mb-12">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
                </Link>

                <header className="mb-16 text-center">
                    <h1 className="text-5xl font-bold mb-4 text-gradient-gold">Help Center</h1>
                    <p className="text-[#ADB5BD] text-lg">Everything you need to know about Srinu Lunch Basket</p>
                </header>

                <section className="grid gap-8 mb-20">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                        <HelpCircle className="mr-3 text-[#D4AF37]" /> Frequently Asked Questions
                    </h2>
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="glass-premium p-8 rounded-2xl">
                            <h3 className="text-xl font-medium mb-3 text-[#F8F9FA]">{faq.q}</h3>
                            <p className="text-[#ADB5BD] leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </section>

                <section className="glass-premium p-10 rounded-3xl text-center border-[#D4AF37]/20">
                    <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
                    <p className="text-[#ADB5BD] mb-8">Click below to chat with our support team directly.</p>
                    <a
                        href="https://wa.me/919010123973"
                        target="_blank"
                        className="inline-flex items-center bg-[#D4AF37] text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
                    >
                        <MessageCircle className="mr-2" /> Chat with Us
                    </a>
                    <div className="mt-8 flex justify-center gap-8 text-sm text-[#ADB5BD]">
                        <span className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +91 9010123973</span>
                        <span className="flex items-center"><Mail className="w-4 h-4 mr-2" /> contact@srinulunch.com</span>
                    </div>
                </section>
            </div>
        </div>
    );
}
