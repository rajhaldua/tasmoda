'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { X, Lock, Mail, User, ArrowRight, ShieldCheck, LogOut, CheckCircle2 } from 'lucide-react';

export function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, user, signIn, signUp, signOut } = useStore();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please provide both email and password.');
      return;
    }

    if (mode === 'signup') {
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
    }

    setIsLoading(true);
    try {
      if (mode === 'signin') {
        const res = await signIn(email, password);
        if (!res.success) {
          setErrorMsg(res.error || 'Invalid email or password.');
        } else {
          setEmail('');
          setPassword('');
        }
      } else {
        const res = await signUp(email, password, fullName);
        if (!res.success) {
          setErrorMsg(res.error || 'Registration could not be completed.');
        } else {
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setFullName('');
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Authentication error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={() => setIsAuthModalOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#ECE5DA] overflow-hidden z-10 transition-all">
        {/* Modal Header */}
        <div className="bg-[#1C1917] text-[#FAF8F5] p-6 pb-7 relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D7C7B2] font-semibold block mb-1">
            Tasmoda Concierge
          </span>
          <h2 className="font-serif text-2xl font-normal text-white">
            {user ? 'Private Client Account' : mode === 'signin' ? 'Sign In to Your Account' : 'Join the Textile Atelier'}
          </h2>
          <p className="text-xs text-stone-300 font-light mt-1">
            {user
              ? 'Manage your orders, custom curtain swatches, and saved room palettes.'
              : 'Access bespoke curtain sizing, saved room palettes, and express checkout.'}
          </p>
        </div>

        {/* When User is Already Signed In */}
        {user ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-4 rounded-2xl bg-[#F6F2EB] border border-[#ECE5DA] flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#1C1917] text-[#FAF8F5] flex items-center justify-center font-serif text-lg font-normal">
                {user.fullName ? user.fullName[0].toUpperCase() : user.email[0].toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm text-[#1C1917] truncate">{user.fullName || 'Connoisseur'}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#9E7D56] shrink-0" />
                </div>
                <p className="text-xs text-[#8C827A] truncate mt-0.5">{user.email}</p>
                <span className="text-[10px] uppercase tracking-wider text-[#9E7D56] font-medium block mt-1">
                  Supabase Verified Member
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-[#57534E]">
              <div className="flex justify-between py-2 border-b border-[#ECE5DA]">
                <span>Membership Tier:</span>
                <span className="font-semibold text-[#1C1917]">Patron of Fine Textiles</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#ECE5DA]">
                <span>Account ID:</span>
                <span className="font-mono text-[11px] text-[#8C827A] truncate max-w-[180px]">{user.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#ECE5DA]">
                <span>Razorpay Express:</span>
                <span className="text-emerald-700 font-medium">Active &amp; Pre-linked</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-[#1C1917] hover:bg-[#322E2B] text-white text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={async () => {
                  await signOut();
                  setIsAuthModalOpen(false);
                }}
                className="py-3 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            {/* Mode Switcher Tabs */}
            <div className="flex rounded-xl bg-[#F6F2EB] p-1 mb-6 border border-[#ECE5DA]">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all ${
                  mode === 'signin'
                    ? 'bg-white text-[#1C1917] shadow-xs'
                    : 'text-[#8C827A] hover:text-[#1C1917]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-white text-[#1C1917] shadow-xs'
                    : 'text-[#8C827A] hover:text-[#1C1917]'
                }`}
              >
                Create Account
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 animate-in fade-in">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-[#57534E] uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8C827A]" />
                    <input
                      type="text"
                      placeholder="Lady Evelyn / Priya Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full bg-white border border-[#ECE5DA] rounded-xl pl-10 pr-4 py-3 text-xs text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:border-[#9E7D56]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#57534E] uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8C827A]" />
                  <input
                    type="email"
                    placeholder="client@tasmoda.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white border border-[#ECE5DA] rounded-xl pl-10 pr-4 py-3 text-xs text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:border-[#9E7D56]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#57534E] uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8C827A]" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white border border-[#ECE5DA] rounded-xl pl-10 pr-4 py-3 text-xs text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:border-[#9E7D56]"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-[#57534E] uppercase tracking-wider mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8C827A]" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full bg-white border border-[#ECE5DA] rounded-xl pl-10 pr-4 py-3 text-xs text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:border-[#9E7D56]"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#1C1917] hover:bg-[#322E2B] text-white text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
              >
                {isLoading ? (
                  <span>Connecting to Supabase...</span>
                ) : mode === 'signin' ? (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Create Private Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-[#ECE5DA] flex items-center justify-center gap-2 text-[11px] text-[#8C827A]">
              <ShieldCheck className="w-4 h-4 text-[#9E7D56]" />
              <span>Encrypted via Supabase Auth &amp; PostgreSQL Security</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
