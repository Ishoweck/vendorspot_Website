'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://vapp-be.onrender.com/api';

interface InviteData {
  name: string;
  email: string;
  ambassadorCode: string;
  role: 'student' | 'state';
}

function AmbassadorSignupForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') || '';

  const [step, setStep] = useState<'verifying' | 'form' | 'success' | 'error'>('verifying');
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!token) {
      setErrorMsg('No invite token found. Please use the link from your approval email.');
      setStep('error');
      return;
    }

    fetch(`${API_URL}/ambassadors/verify-invite?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.success) {
          setErrorMsg(data.message || 'Invalid or expired invite link.');
          setStep('error');
          return;
        }
        const d = data.data;
        setInviteData(d);
        // Pre-fill name from application
        const parts = d.name.trim().split(/\s+/);
        setFirstName(parts[0] || '');
        setLastName(parts.slice(1).join(' ') || '');
        setStep('form');
      })
      .catch(() => {
        setErrorMsg('Could not verify your invite. Please try again or contact support.');
        setStep('error');
      });
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!firstName.trim() || !lastName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setFormError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/auth/ambassador-register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, firstName: firstName.trim(), lastName: lastName.trim(), password }),
      });
      const data = await res.json();
      if (!data.success) {
        setFormError(data.message || 'Registration failed. Please try again.');
        return;
      }
      setStep('success');
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 'verifying') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#CC3366] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-sm">Verifying your invite...</p>
        </div>
      </div>
    );
  }

  if (step === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Invalid Invite</h1>
          <p className="text-gray-600 mb-6">{errorMsg}</p>
          <Link href="/ambassador-program" className="text-[#CC3366] font-semibold hover:underline text-sm">
            Back to Ambassador Program
          </Link>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">You're officially in!</h1>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Your Vendorspot ambassador account is ready. Download the app to access your dashboard, track referrals, and start earning.
          </p>
          {inviteData?.ambassadorCode && (
            <div className="bg-gray-50 border border-dashed border-[#CC3366] rounded-xl p-4 mb-6 inline-block">
              <p className="text-xs text-[#CC3366] font-semibold uppercase tracking-wider mb-1">Your Ambassador Code</p>
              <p className="font-mono text-2xl font-bold text-gray-900 tracking-widest">{inviteData.ambassadorCode}</p>
              <p className="text-xs text-gray-400 mt-1">Share this with everyone you invite</p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="px-6 py-3 bg-[#CC3366] text-white font-semibold rounded-xl text-sm hover:bg-[#b02d58] transition-colors"
            >
              Browse Vendorspot
            </Link>
            <Link
              href="/ambassador-program"
              className="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl text-sm hover:bg-gray-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#CC3366] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">VS</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Your Account</h1>
          <p className="text-gray-600 text-sm">
            Welcome to the Vendorspot Ambassador Program,{' '}
            <span className="font-semibold text-[#CC3366]">{inviteData?.name?.split(' ')[0]}</span>!
          </p>
        </div>

        {/* Code preview */}
        {inviteData?.ambassadorCode && (
          <div className="bg-pink-50 border border-pink-200 rounded-xl px-4 py-3 mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#CC3366] font-semibold uppercase tracking-wider">Your Ambassador Code</p>
              <p className="font-mono text-lg font-bold text-gray-900">{inviteData.ambassadorCode}</p>
            </div>
            <span className="text-2xl">🏅</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          {/* Email (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={inviteData?.email || ''}
              readOnly
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm cursor-not-allowed"
            />
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="First"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#CC3366]/30 focus:border-[#CC3366]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Last"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#CC3366]/30 focus:border-[#CC3366]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Min. 6 characters"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#CC3366]/30 focus:border-[#CC3366]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              placeholder="Repeat password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#CC3366]/30 focus:border-[#CC3366]"
            />
          </div>

          {formError && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{formError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-[#CC3366] text-white font-bold rounded-xl text-sm hover:bg-[#b02d58] disabled:opacity-60 transition-colors"
          >
            {submitting ? 'Creating account...' : 'Create Ambassador Account'}
          </button>

          <p className="text-xs text-center text-gray-400">
            By creating an account you agree to our{' '}
            <Link href="/terms" className="text-[#CC3366] hover:underline">Terms</Link> and{' '}
            <Link href="/privacy" className="text-[#CC3366] hover:underline">Privacy Policy</Link>.
          </p>
        </form>
      </div>
    </div>
  );
}

export default function AmbassadorSignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#CC3366] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AmbassadorSignupForm />
    </Suspense>
  );
}
