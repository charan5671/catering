import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-[#0F1115] text-[#F8F9FA] p-6 lg:p-12">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-[#D4AF37] hover:underline mb-12">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
                </Link>

                <header className="mb-12">
                    <ShieldCheck className="w-16 h-16 text-[#D4AF37] mb-6" />
                    <h1 className="text-5xl font-bold mb-4 text-gradient-gold">Terms of Service</h1>
                    <p className="text-[#ADB5BD]">Effective Date: February 26, 2026</p>
                </header>

                <div className="glass-premium p-10 rounded-3xl space-y-8 text-[#ADB5BD] leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-[#F8F9FA] mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing and using the Srinu Lunch Basket application, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our services.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-[#F8F9FA] mb-4">2. Service Description</h2>
                        <p>Srinu Lunch Basket provides a home-style lunch delivery service. Orders are processed primarily through our digital platform and confirmed via WhatsApp. We reserve the right to modify menu prices and availability without prior notice.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-[#F8F9FA] mb-4">3. Ordering and Delivery</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Orders must be placed before 10:30 AM for same-day delivery.</li>
                            <li>Delivery is subject to location availability.</li>
                            <li>Customers must provide accurate delivery information to ensure timely service.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-[#F8F9FA] mb-4">4. Cancellation and Refunds</h2>
                        <p>Cancellations made after 11:00 AM on the day of delivery may not be subject to a refund due to the prepared nature of our meals.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-[#F8F9FA] mb-4">5. Limitation of Liability</h2>
                        <p>Srinu Lunch Basket is not liable for any indirect or consequential damages resulting from the use of our service or consumption of our products.</p>
                    </section>

                    <footer className="pt-8 border-t border-white/10 text-sm">
                        Interested in more details? Contact our support via the Help Center.
                    </footer>
                </div>
            </div>
        </div>
    );
}
