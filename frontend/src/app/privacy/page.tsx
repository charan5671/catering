import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#0F1115] text-[#F8F9FA] p-6 lg:p-12">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-[#D4AF37] hover:underline mb-12">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
                </Link>

                <header className="mb-12">
                    <Lock className="w-16 h-16 text-[#D4AF37] mb-6" />
                    <h1 className="text-5xl font-bold mb-4 text-gradient-gold">Privacy Policy</h1>
                    <p className="text-[#ADB5BD]">Effective Date: February 26, 2026</p>
                </header>

                <div className="glass-premium p-10 rounded-3xl space-y-8 text-[#ADB5BD] leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-[#F8F9FA] mb-4">1. Data Collection</h2>
                        <p>We collect minimal information required to process your lunch orders, including your name, WhatsApp number, and delivery address. This data is used solely for service fulfillment.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-[#F8F9FA] mb-4">2. WhatsApp Communication</h2>
                        <p>Our primary communication channel is WhatsApp. By placing an order, you agree to receive order-related updates and delivery notifications on your provided number.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-[#F8F9FA] mb-4">3. Security</h2>
                        <p>We implement industry-standard security measures to protect your personal data from unauthorized access or disclosure.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-[#F8F9FA] mb-4">4. Third-Party Sharing</h2>
                        <p>Srinu Lunch Basket does not sell or share your personal information with third parties for marketing purposes. Your data is only shared with logistics partners for delivery purposes.</p>
                    </section>

                    <footer className="pt-8 border-t border-white/10 text-sm">
                        For any privacy-related inquiries, please contact us at privacy@srinulunch.com.
                    </footer>
                </div>
            </div>
        </div>
    );
}
