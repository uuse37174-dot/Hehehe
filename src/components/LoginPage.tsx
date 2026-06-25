/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useStore } from "../store";
import { Shield, Lock, Mail, Terminal, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export function LoginPage() {
  const login = useStore((state) => state.login);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Please specify a valid email address.");
      return;
    }
    if (!password || password.length < 5) {
      setError("Decryption key (password) must be at least 5 characters.");
      return;
    }

    setIsLoading(true);

    // Simulate standard system latency for a cool secure handshake feel
    setTimeout(() => {
      try {
        const success = login(trimmedEmail, password);
        setIsLoading(false);
        if (!success) {
          setError("Access Denied: Invalid Administrative Credentials.");
        }
      } catch (err) {
        setIsLoading(false);
        setError("Cryptographic handshake failed. Please check credentials.");
      }
    }, 900);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden select-none font-sans">
      
      {/* Decorative Cybernetic Hex Grid & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.06),transparent_65%)] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl relative z-10"
      >
        {/* Top Header */}
        <div className="text-center mb-6">
          <div className="inline-flex bg-green-500/10 border border-green-500/30 p-3 rounded-xl mb-4">
            <Shield className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-mono font-bold tracking-tight text-white flex items-center justify-center gap-2">
            HACK<span className="text-green-500">ROAD</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1.5 font-mono uppercase tracking-wider">
            Secured Penetration testing syllabus
          </p>
        </div>

        {/* Security Warning notice */}
        <div className="bg-zinc-950 border border-zinc-800/60 rounded-xl p-3 mb-6">
          <div className="flex gap-2.5 items-start">
            <Terminal className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <div className="text-[11px] font-mono leading-relaxed text-zinc-400">
              <span className="text-green-400 font-bold block mb-0.5">SYLLABUS PORTAL SECURITY</span>
              Authentication required. Enter the authorized administrative email and password to decrypt the syllabus database and access the simulation sandbox terminal.
            </div>
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 bg-red-950/30 border border-red-500/30 rounded-xl p-3 text-xs text-red-400 flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
              Email Address / Identity
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="hacker@hackroad.org"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-green-500 transition"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
              Decryption Key / Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="••••••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-10 py-2.5 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-green-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 hover:text-zinc-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-mono font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_25px_rgba(34,197,94,0.35)]"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-black border-t-transparent" />
                Handshaking...
              </span>
            ) : (
              <>
                Initialize Terminal Session
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Bottom Footer Details */}
        <div className="mt-6 text-center text-[10px] font-mono text-zinc-600">
          SECURE PROTOCOL v4.12.8 • MFA_REQUIRED_SESSION_PASS
        </div>
      </motion.div>
    </div>
  );
}
