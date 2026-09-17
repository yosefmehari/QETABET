'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Shield, PlusCircle, CheckCircle2, PhoneCall } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 focus:outline-none">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
            <Home className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-stone-900">
                QETA<span className="text-emerald-600">BET</span>
              </span>
              <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                ቀጣቤት
              </span>
            </div>
            <p className="hidden text-[10px] font-medium text-stone-500 sm:block">
              Addis Ababa Verified Direct Rentals
            </p>
          </div>
        </Link>

        {/* Value Prop Badges (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-stone-600">
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-emerald-800 border border-emerald-200/60">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>Zero Delala Fee (0% ደላላ)</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 text-stone-700">
            <Shield className="h-3.5 w-3.5 text-emerald-600" />
            <span>Direct Landlord Verified</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-stone-500">
            <span>Telebirr & Chapa Ready</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 transition"
          >
            <span>Telegram Channel</span>
          </a>

          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-bold text-stone-700 hover:bg-stone-100 transition"
            title="Admin Dashboard"
          >
            <Shield className="h-3.5 w-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Admin</span>
          </Link>

          <Link
            href="/listings/new"
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition active:scale-95"
          >
            <PlusCircle className="h-4 w-4" />
            <span>List Property</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
