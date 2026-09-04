'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/components/ui/button';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setIsSent(false);

    try {
      const response = await fetch('https://formspree.io/f/xbllvzwv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setIsSent(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const data = await response.json();
        setError(data?.errors?.[0]?.message || 'Failed to send message. Please try again.');
      }
    } catch {
      setError('An unexpected network error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative divide-y divide-gray-200 dark:divide-gray-700 max-w-4xl mx-auto">
      {/* Decorative background glows */}
      <div className="pointer-events-none absolute -top-12 -left-12 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gradient-to-tl from-purple-500/10 to-blue-500/10 blur-3xl" />

      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Contact Me
          </span>
        </h1>
        <p className="text-base sm:text-lg leading-7 text-gray-500 dark:text-gray-400">
          Have an inquiry, collaboration opportunity, or feedback? Drop a message and I&apos;ll get back to you promptly.
        </p>
      </div>

      <div className="py-8">
        <div className="relative rounded-2xl border border-neutral-200/80 bg-white/80 p-6 sm:p-8 shadow-sm backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-900/80">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm transition-colors placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-100 dark:placeholder:text-neutral-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm transition-colors placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-100 dark:placeholder:text-neutral-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="What's on your mind? Tell me about your project or inquiry..."
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm transition-colors placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-100 dark:placeholder:text-neutral-500"
              />
            </div>

            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-500/20 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </Button>
            </div>

            {isSent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-400"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>Thank you! Your message has been sent successfully. I will get back to you soon.</span>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-700 dark:text-rose-400"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
