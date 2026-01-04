'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

type AuthMode = 'login' | 'signup' | 'signup-details' | 'verify-otp';

const ROLES = ['Designer', 'Marketing Manager', 'Brand Manager', 'Developer', 'Other'];
const PURPOSES = ['Create Retail Ads', 'Brand Campaigns', 'Product Promotions', 'Learning/Exploration', 'Other'];

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [purpose, setPurpose] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Debug: Log session status
  useEffect(() => {
    console.log('Auth Page - Session Status:', status);
    console.log('Auth Page - Session Data:', session);
  }, [session, status]);

  // Check if already logged in (NextAuth session)
  useEffect(() => {
    if (status === 'authenticated' && session) {
      console.log('Redirecting to editor - user is authenticated');
      router.replace('/editor');
    }
  }, [session, status, router]);

  // Check for error from NextAuth callback
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(`Login failed: ${errorParam}`);
    }
  }, [searchParams]);

  // Also check custom JWT auth
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        router.replace('/editor');
      }
    } catch (error) {
      // Not logged in, stay on auth page
    }
  };

  // Show loading while checking auth
  if (status === 'loading') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#fafafa',
        fontFamily: 'Poppins, sans-serif'
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  const handleSignupStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    setMode('signup-details');
  };

  const handleSignupStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, organization, role, purpose }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setSuccess('OTP sent to your email!');
      setMode('verify-otp');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setSuccess('OTP sent to your email!');
      setMode('verify-otp');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter complete OTP');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpString }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setSuccess('Verified successfully! Redirecting...');
      setTimeout(() => {
        router.push('/editor');
      }, 1000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + digits.length, 5);
      otpRefs.current[nextIndex]?.focus();
    } else {
      const newOtp = [...otp];
      newOtp[index] = value.replace(/\D/g, '');
      setOtp(newOtp);
      
      if (value && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <svg width="40" height="40" viewBox="0 0 56 56" fill="none">
            <rect width="56" height="56" rx="12" fill="#00539F"/>
            <path d="M16 20h24M16 28h20M16 36h16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="40" cy="36" r="6" fill="white" fillOpacity="0.3" />
            <path d="M38 36l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="logo-text">RetailSync AI</span>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="auth-message error">
            {error}
          </div>
        )}
        {success && (
          <div className="auth-message success">
            {success}
          </div>
        )}

        {/* Login Form */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="auth-form">
            <h2 className="form-title">Welcome Back</h2>
            <p className="form-description">Sign in to continue creating amazing ads</p>
            
            {/* Google Button */}
            <button type="button" className="google-btn" onClick={() => signIn('google', { callbackUrl: '/editor' })}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">or</span>
              <div className="divider-line"></div>
            </div>
            
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </div>
            
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Sign In'}
            </button>
            
            <p className="auth-switch">
              New to RetailSync?{' '}
              <button type="button" onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}>
                Create Account
              </button>
            </p>
          </form>
        )}

        {/* Signup Form - Step 1 */}
        {mode === 'signup' && (
          <form onSubmit={handleSignupStep1} className="auth-form">
            <h2 className="form-title">Create Account</h2>
            <p className="form-description">Join thousands of marketers creating better ads</p>
            
            {/* Google Button */}
            <button type="button" className="google-btn" onClick={() => signIn('google', { callbackUrl: '/editor' })}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">or</span>
              <div className="divider-line"></div>
            </div>
            
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </div>
            
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                minLength={6}
                required
              />
            </div>
            
            <button type="submit" className="auth-button">
              Continue →
            </button>
            
            <p className="auth-switch">
              Already have an account?{' '}
              <button type="button" onClick={() => { setMode('login'); setError(''); setSuccess(''); }}>
                Sign In
              </button>
            </p>
          </form>
        )}

        {/* Signup Form - Step 2 (Details) */}
        {mode === 'signup-details' && (
          <form onSubmit={handleSignupStep2} className="auth-form">
            <h2 className="form-title">Tell Us About You</h2>
            <p className="form-description">Help us personalize your experience</p>
            
            <div className="input-group">
              <label>Organization / Company</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g., Tesco, Amazon, etc."
              />
            </div>
            
            <div className="input-group">
              <label>Your Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select your role</option>
                {ROLES.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            
            <div className="input-group">
              <label>Why are you using RetailSync?</label>
              <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
                <option value="">Select purpose</option>
                {PURPOSES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Create Account'}
            </button>
            
            <p className="auth-switch">
              <button type="button" onClick={() => { setMode('signup'); setError(''); }}>
                ← Back
              </button>
            </p>
          </form>
        )}

        {/* OTP Verification */}
        {mode === 'verify-otp' && (
          <form onSubmit={handleVerifyOtp} className="auth-form">
            <h2 className="form-title">Verify Email</h2>
            <p className="form-description">
              Enter the 6-digit code sent to<br />
              <strong>{email}</strong>
            </p>
            
            <div className="otp-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { otpRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="otp-input"
                />
              ))}
            </div>
            
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Verify & Continue'}
            </button>
            
            <p className="auth-switch">
              <button type="button" onClick={() => { setMode('login'); setOtp(['', '', '', '', '', '']); setError(''); setSuccess(''); }}>
                ← Back to Login
              </button>
            </p>
          </form>
        )}

        {/* Footer */}
        <div className="auth-footer">
          <p>© 2025 RetailSync AI • Tesco Retail Media Hackathon</p>
        </div>
      </div>

      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fafafa;
          padding: 24px;
          font-family: 'Poppins', sans-serif;
        }

        .auth-card {
          width: 100%;
          max-width: 460px;
          background: #ffffff;
          padding: 40px;
          border-radius: 16px;
          border: 2px solid #1f2937;
        }

        .auth-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 32px;
        }

        .logo-text {
          font-size: 20px;
          font-weight: 600;
          color: #111827;
        }

        .auth-message {
          padding: 12px 16px;
          margin-bottom: 20px;
          border-radius: 8px;
          font-size: 14px;
          text-align: center;
        }

        .auth-message.error {
          background: #fef2f2;
          color: #dc2626;
        }

        .auth-message.success {
          background: #f0fdf4;
          color: #16a34a;
        }

        .auth-form {
          padding: 0;
        }

        .form-title {
          font-size: 24px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 8px 0;
          text-align: center;
        }

        .form-description {
          color: #6b7280;
          font-size: 14px;
          margin: 0 0 28px 0;
          text-align: center;
        }

        .google-btn {
          width: 100%;
          padding: 14px;
          background: #ffffff;
          color: #374151;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: background 0.2s, border-color 0.2s;
          font-family: 'Poppins', sans-serif;
          margin-bottom: 24px;
        }

        .google-btn:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #e5e7eb;
        }

        .divider-text {
          color: #9ca3af;
          font-size: 13px;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .input-group input,
        .input-group select {
          width: 100%;
          padding: 14px 16px;
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 15px;
          color: #111827;
          transition: border-color 0.2s;
          outline: none;
          font-family: 'Poppins', sans-serif;
        }

        .input-group select {
          cursor: pointer;
        }

        .input-group input:focus,
        .input-group select:focus {
          border-color: #00539F;
        }

        .input-group input::placeholder {
          color: #9ca3af;
        }

        .otp-container {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin: 24px 0;
        }

        .otp-input {
          width: 48px;
          height: 56px;
          text-align: center;
          font-size: 20px;
          font-weight: 600;
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          color: #111827;
          outline: none;
          transition: border-color 0.2s;
          font-family: 'Poppins', sans-serif;
        }

        .otp-input:focus {
          border-color: #00539F;
        }

        .auth-button {
          width: 100%;
          padding: 14px;
          background: #00539F;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          font-family: 'Poppins', sans-serif;
        }

        .auth-button:hover:not(:disabled) {
          background: #004080;
        }

        .auth-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .auth-switch {
          text-align: center;
          margin-top: 20px;
          color: #6b7280;
          font-size: 14px;
        }

        .auth-switch button {
          background: none;
          border: none;
          color: #00539F;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
        }

        .auth-switch button:hover {
          text-decoration: underline;
        }

        .auth-footer {
          text-align: center;
          margin-top: 32px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
        }

        .auth-footer p {
          color: #9ca3af;
          font-size: 12px;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

// Loading component for Suspense
function AuthLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-12 h-12 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-violet-500/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 animate-spin"></div>
        </div>
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}

// Main export with Suspense boundary
export default function AuthPage() {
  return (
    <Suspense fallback={<AuthLoading />}>
      <AuthContent />
    </Suspense>
  );
}
