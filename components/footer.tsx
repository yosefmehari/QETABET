import React from 'react';
import { Home, Phone, Mail, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white font-black">
              <Home className="h-5 w-5" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              QETA<span className="text-emerald-500">BET</span>
            </span>
          </div>
          <p className="text-xs text-stone-400 max-w-md leading-relaxed">
            QetaBet is Addis Ababa's direct-to-landlord rental network. We eliminate extortionate broker (delala) commissions, protect tenants from fake Telegram listings, and verify crucial infrastructure like water reserve tanks and backup generators.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
            <Shield className="h-4 w-4" />
            <span>Built for Addis Ababa Living Parameters</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
            Major Sub-Cities
          </h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>Bole (CMC, Atlas, Medhanialem, Gerji)</li>
            <li>Kirkos (Kazanchis, Olympia, Mexico)</li>
            <li>Yeka (Megenagna, Signal, Kotebe)</li>
            <li>Nifas Silk-Lafto (Sarbet, Bisrate Gabriel)</li>
            <li>Arada (Piazza, 4 Kilo, 6 Kilo)</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
            Payment & Support
          </h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>Telebirr Integrated Escrow</li>
            <li>Chapa (Cards & Local Banks)</li>
            <li>Landlord ID & Title Verification</li>
            <li className="pt-2 text-[11px] text-stone-500">
              Addis Ababa, Ethiopia • support@qetabet.et
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-8 pt-6 border-t border-stone-800 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} QetaBet Ethiopia. All rights reserved. Zero Broker Fees Guaranteed.
      </div>
    </footer>
  );
}
