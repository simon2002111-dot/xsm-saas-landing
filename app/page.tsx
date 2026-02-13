'use client';

import React, { useMemo, useState } from 'react';

type PricingTier = {
  name: string;
  price: string;
  tagline: string;
  highlight?: boolean;
  bullets: string[];
  cta: string;
};

type FAQItem = {
  q: string;
  a: string;
};

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ');
}

function Icon({
  name,
  className,
}: {
  name:
    | 'bolt'
    | 'spark'
    | 'shield'
    | 'layout'
    | 'rocket'
    | 'wand'
    | 'check'
    | 'chevron'
    | 'code'
    | 'stars';
  className?: string;
}) {
  // Lightweight inline SVGs (no external deps)
  const common = className ?? 'h-5 w-5';
  switch (name) {
    case 'bolt':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M13 2L3 14h8l-1 8 11-14h-8l0-6Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'spark':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M12 2l1.2 5.3L18 9l-4.8 1.7L12 16l-1.2-5.3L6 9l4.8-1.7L12 2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M20 13l.6 2.6L23 16l-2.4.4L20 19l-.6-2.6L17 16l2.4-.4L20 13Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M12 2l8 4v7c0 5-3.4 9-8 9s-8-4-8-9V6l8-4Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 12l2.3 2.3L15.8 9.3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'layout':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M4 4h16v16H4V4Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M4 9h16M9 20V9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'rocket':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M5 14c-1 3-1 6-1 6s3 0 6-1c2 1 5 1 7-1 3-3 4-11 4-11s-8 1-11 4c-2 2-2 5-1 7Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9 15l-3 3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M15 9a2 2 0 1 0 0.01 0"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'wand':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M3 21l9-9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M14 3l7 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M12 5l7 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M15 2l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'check':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'chevron':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'code':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M9 18l-6-6 6-6M15 6l6 6-6 6M14 4l-4 16"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'stars':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            d="M12 2l1.1 4.9L18 9l-4.9 1.1L12 15l-1.1-4.9L6 9l4.9-2.1L12 2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M4 13l.7 3.1L8 17l-3.3.9L4 21l-.7-3.1L0 17l3.3-.9L4 13Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Button({
  children,
  variant = 'primary',
  onClick,
  href,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  href?: string;
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const styles =
    variant === 'primary'
      ? 'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:ring-zinc-900'
      : variant === 'secondary'
        ? 'bg-white/70 text-zinc-900 ring-1 ring-zinc-200 hover:bg-white focus-visible:ring-zinc-900'
        : 'bg-transparent text-zinc-800 hover:bg-zinc-100 focus-visible:ring-zinc-900';

  const content = (
    <>
      {children}
      {variant !== 'ghost' ? <span className="opacity-70" aria-hidden="true">→</span> : null}
    </>
  );

  if (href) {
    return (
      <a className={classNames(base, styles)} href={href}>
        {content}
      </a>
    );
  }
  return (
    <button className={classNames(base, styles)} onClick={onClick} type="button">
      {content}
    </button>
  );
}

function StatPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200">
      <Icon name="check" className="h-4 w-4" />
      {children}
    </div>
  );
}

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-zinc-200 rounded-3xl bg-white/70 ring-1 ring-zinc-200">
      {items.map((it, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={it.q} className="p-5 sm:p-6">
            <button
              className="flex w-full items-center justify-between gap-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              aria-controls={`faq-${idx}`}
              type="button"
            >
              <span className="text-sm font-semibold text-zinc-900">{it.q}</span>
              <span
                className={classNames(
                  'inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700 transition',
                  isOpen && 'rotate-90'
                )}
                aria-hidden="true"
              >
                <Icon name="chevron" className="h-5 w-5" />
              </span>
            </button>
            <div
              id={`faq-${idx}`}
              className={classNames(
                'grid transition-all duration-200 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <p className="mt-3 text-sm leading-6 text-zinc-600">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Page() {
  const pricing: PricingTier[] = useMemo(
    () => [
      {
        name: 'Starter',
        price: '$19',
        tagline: 'For solo founders',
        bullets: [
          'Full landing page source code',
          'Commercial license (single product)',
          'Setup guide (deploy in minutes)',
          'Lifetime access to this version',
          'Basic email support (7 days)',
        ],
        cta: 'Buy Starter',
      },
      {
        name: 'Pro',
        price: '$49',
        tagline: 'For serious launches',
        highlight: true,
        bullets: [
          'Everything in Starter',
          'Commercial license (multiple products)',
          'Bonus sections & components',
          'Update pack for minor improvements',
          'Priority support (14 days)',
        ],
        cta: 'Buy Pro',
      },
      {
        name: 'Business',
        price: '$99',
        tagline: 'For teams and agencies',
        bullets: [
          'Everything in Pro',
          'Client projects allowed',
          'Branding customization checklist',
          'Extended support (30 days)',
          'Team handoff notes included',
        ],
        cta: 'Buy Business',
      },
    ],
    []
  );

  const faqs: FAQItem[] = useMemo(
    () => [
      {
        q: 'Do I need coding skills?',
        a: 'Basic edits are simple: change text, links, and pricing directly in the code. If you can copy/paste and run a command, you’re good. For deeper customization, a developer can help.',
      },
      {
        q: 'How do I deploy to Vercel?',
        a: 'Push the project to GitHub, import it into Vercel, and click Deploy. The template is designed to work out of the box with Next.js.',
      },
      {
        q: 'Is there a commercial license?',
        a: 'Yes. You can use it for your own products. The Pro/Business tiers expand usage rights (including client work for Business).',
      },
      {
        q: 'Can I use it for client projects?',
        a: 'Yes—choose the Business tier for agency/client usage. That tier explicitly allows client projects.',
      },
      {
        q: 'Do you offer refunds?',
        a: 'Because this is a digital download, refunds are typically not offered once files are delivered. If something is broken, we’ll fix it.',
      },
      {
        q: 'Will I get updates?',
        a: 'You’ll keep lifetime access to the version you bought. Pro includes a small update pack for minor improvements when available.',
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_20%_10%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(900px_circle_at_80%_20%,rgba(16,185,129,0.12),transparent_55%),radial-gradient(900px_circle_at_50%_90%,rgba(236,72,153,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(24,24,27,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => scrollToId('top')}
            className="group inline-flex items-center gap-2 rounded-xl px-2 py-1 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
            aria-label="Go to top"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-zinc-900 text-white">
              <Icon name="spark" className="h-5 w-5" />
            </span>
            <span>
              XsM <span className="text-zinc-500">Templates</span>
            </span>
          </button>

          <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary navigation">
            <button
              type="button"
              onClick={() => scrollToId('features')}
              className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => scrollToId('pricing')}
              className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
            >
              Pricing
            </button>
            <button
              type="button"
              onClick={() => scrollToId('faq')}
              className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
            >
              FAQ
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => scrollToId('pricing')}>
              Get Template
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="relative">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200">
                <Icon name="stars" className="h-4 w-4" />
                AI-powered website templates for fast launches
              </div>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
                Build Your AI SaaS Website in Minutes — Not Weeks
              </h1>

              <p className="mt-4 max-w-xl text-base leading-7 text-zinc-700 sm:text-lg">
                Launch a modern, high-converting SaaS landing page. Built with Next.js and designed with AI for founders who move fast.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button variant="primary" onClick={() => scrollToId('pricing')}>
                  Get the Template
                </Button>
                <Button variant="secondary" href="#demo" onClick={() => scrollToId('demo')}>
                  View Live Demo
                </Button>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <StatPill>Instant download</StatPill>
                <StatPill>Commercial license</StatPill>
                <StatPill>Vercel-ready</StatPill>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/70 p-5 ring-1 ring-zinc-200">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Icon name="bolt" className="h-5 w-5" />
                    Ship faster
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    Clean sections, strong hierarchy, conversion-first layout—ready to customize.
                  </p>
                </div>
                <div className="rounded-3xl bg-white/70 p-5 ring-1 ring-zinc-200">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Icon name="shield" className="h-5 w-5" />
                    Production-ready
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    Built with accessibility, responsive design, and performance in mind.
                  </p>
                </div>
              </div>
            </div>

            {/* Mockup (no external images) */}
            <div id="demo" className="relative">
              <div className="rounded-[28px] bg-white/70 p-4 ring-1 ring-zinc-200 shadow-sm">
                <div className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-3 ring-1 ring-zinc-200">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                  </div>
                  <div className="rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-600 ring-1 ring-zinc-200">
                    xsmtemplates.com/demo
                  </div>
                </div>

                <div className="mt-4 grid gap-4">
                  <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-zinc-500">Dashboard</div>
                        <div className="mt-1 text-lg font-bold">Weekly signups</div>
                      </div>
                      <div className="rounded-2xl bg-zinc-900 px-3 py-2 text-xs font-semibold text-white">
                        +38%
                      </div>
                    </div>
                    <div className="mt-4 h-28 rounded-2xl bg-[linear-gradient(90deg,rgba(24,24,27,0.06),rgba(24,24,27,0.02))]" />
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="rounded-2xl bg-zinc-50 p-3 ring-1 ring-zinc-200">
                        <div className="text-xs text-zinc-500">MRR</div>
                        <div className="mt-1 text-sm font-bold">$1,240</div>
                      </div>
                      <div className="rounded-2xl bg-zinc-50 p-3 ring-1 ring-zinc-200">
                        <div className="text-xs text-zinc-500">Trials</div>
                        <div className="mt-1 text-sm font-bold">92</div>
                      </div>
                      <div className="rounded-2xl bg-zinc-50 p-3 ring-1 ring-zinc-200">
                        <div className="text-xs text-zinc-500">Churn</div>
                        <div className="mt-1 text-sm font-bold">2.1%</div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Icon name="wand" className="h-5 w-5" />
                      AI-designed layout blocks
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      Swap copy, change prices, plug in your links—then deploy.
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="h-16 rounded-2xl bg-zinc-50 ring-1 ring-zinc-200" />
                      <div className="h-16 rounded-2xl bg-zinc-50 ring-1 ring-zinc-200" />
                      <div className="h-16 rounded-2xl bg-zinc-50 ring-1 ring-zinc-200" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[36px] bg-white/40 blur-2xl" />
            </div>
          </div>
        </section>

        {/* Social proof row */}
        <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
          <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-zinc-200">
            <p className="text-center text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Built for modern startups
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm font-semibold text-zinc-700 sm:grid-cols-5">
              {['Indie Hackers', 'Startup Teams', 'Creators', 'Agencies', 'AI Builders'].map((t) => (
                <div key={t} className="rounded-2xl bg-zinc-50 py-3 ring-1 ring-zinc-200">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Everything you need to launch fast
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-zinc-700">
              A battle-tested landing page structure designed to convert—clean UI, clear messaging, and fast setup.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: 'layout', title: 'Conversion-focused sections', desc: 'Hero, features, pricing, testimonials, FAQ—wired for clarity.' },
              { icon: 'spark', title: 'Mobile-first responsive layout', desc: 'Looks great on phones, tablets, and desktops out of the box.' },
              { icon: 'wand', title: 'Clean modern UI', desc: 'Premium spacing, typography, and components that feel “startup-ready”.' },
              { icon: 'code', title: 'Easy to customize', desc: 'Update copy and links quickly. Tailwind classes keep edits simple.' },
              { icon: 'bolt', title: 'Fast performance', desc: 'Lightweight structure and minimal dependencies for speedy loads.' },
              { icon: 'rocket', title: 'Vercel deployment ready', desc: 'Deploy in minutes with Next.js App Router and a clean page setup.' },
            ].map((f) => (
              <div key={f.title} className="rounded-3xl bg-white/70 p-6 ring-1 ring-zinc-200">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                  <Icon name={f.icon as any} className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Launch in 3 steps</h2>
              <p className="mt-3 text-base leading-7 text-zinc-700">
                Stop rebuilding the same landing page. Download, customize, deploy—then focus on your product.
              </p>

              <ol className="mt-7 space-y-4">
                {[
                  { title: 'Download the template', desc: 'Get the full source code and a quick setup guide.' },
                  { title: 'Update your content in minutes', desc: 'Swap copy, pricing, links, and brand name.' },
                  { title: 'Deploy to Vercel and go live', desc: 'Ship a clean SaaS site today—no weeks of design back-and-forth.' },
                ].map((s, idx) => (
                  <li key={s.title} className="flex gap-4 rounded-3xl bg-white/70 p-5 ring-1 ring-zinc-200">
                    <div className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-2xl bg-zinc-900 text-sm font-bold text-white">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{s.title}</div>
                      <div className="mt-1 text-sm leading-6 text-zinc-600">{s.desc}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-zinc-200">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Icon name="code" className="h-5 w-5" />
                Quick start
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                A tiny “code-like” block to make it feel real and developer-friendly.
              </p>

              <div className="mt-4 rounded-2xl bg-zinc-950 p-5 text-sm text-zinc-100">
                <div className="text-xs text-zinc-400">terminal</div>
                <pre className="mt-2 overflow-x-auto leading-6">
{`npm install
npm run dev

# deploy
# push to GitHub → import to Vercel → Deploy`}
                </pre>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200">
                  <div className="text-xs font-semibold text-zinc-500">Setup time</div>
                  <div className="mt-1 text-lg font-extrabold">~ 5 minutes</div>
                </div>
                <div className="rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200">
                  <div className="text-xs font-semibold text-zinc-500">Sections included</div>
                  <div className="mt-1 text-lg font-extrabold">10</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Simple pricing</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-zinc-700">
              One-time payment. Instant download. Start shipping today.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {pricing.map((tier) => (
              <div
                key={tier.name}
                className={classNames(
                  'rounded-3xl p-6 ring-1 transition',
                  tier.highlight
                    ? 'bg-white ring-zinc-300 shadow-sm'
                    : 'bg-white/70 ring-zinc-200 hover:ring-zinc-300'
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold">{tier.name}</div>
                    <div className="mt-1 text-xs font-semibold text-zinc-500">{tier.tagline}</div>
                  </div>
                  {tier.highlight ? (
                    <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  ) : null}
                </div>

                <div className="mt-5 flex items-end gap-2">
                  <div className="text-4xl font-extrabold">{tier.price}</div>
                  <div className="pb-1 text-sm text-zinc-500">one-time</div>
                </div>

                <ul className="mt-5 space-y-3">
                  {tier.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-zinc-700">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 text-zinc-900">
                        <Icon name="check" className="h-4 w-4" />
                      </span>
                      <span className="leading-6">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Button
                    variant={tier.highlight ? 'primary' : 'secondary'}
                    onClick={() => alert('Replace this with your Gumroad/WordPress checkout link.')}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 text-center text-sm text-zinc-600">
            One-time payment. Instant download.
          </p>

          <div className="mx-auto mt-6 max-w-3xl rounded-3xl bg-white/70 p-5 ring-1 ring-zinc-200">
            <p className="text-xs text-zinc-500">
              🔧 <span className="font-semibold text-zinc-800">Next step:</span> replace the pricing button actions with your
              checkout URLs (Gumroad or your WordPress checkout). I can wire it for you once you have the links.
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Loved by builders</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-zinc-700">
              Short, realistic testimonials that fit a template product.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              {
                quote: 'I launched my landing page the same day. The structure is exactly what a SaaS needs.',
                name: 'Alex',
                role: 'Indie Founder',
              },
              {
                quote: 'Clean UI and easy to edit. I swapped branding and pricing in minutes.',
                name: 'Maya',
                role: 'Product Designer',
              },
              {
                quote: 'Perfect starter for client work—saves me hours and looks premium.',
                name: 'Sam',
                role: 'Agency Owner',
              },
            ].map((t) => (
              <div key={t.name} className="rounded-3xl bg-white/70 p-6 ring-1 ring-zinc-200">
                <p className="text-sm leading-7 text-zinc-700">“{t.quote}”</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold">{t.name}</div>
                    <div className="text-xs font-semibold text-zinc-500">{t.role}</div>
                  </div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                    <Icon name="spark" className="h-5 w-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto mt-16 max-w-6xl px-4 pb-16 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Frequently asked questions</h2>
              <p className="mt-3 text-base leading-7 text-zinc-700">
                Keep answers short, clear, and aligned with digital product norms.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <StatPill>Fast setup</StatPill>
                <StatPill>Commercial use</StatPill>
                <StatPill>Instant download</StatPill>
              </div>

              <div className="mt-7 rounded-3xl bg-white/70 p-6 ring-1 ring-zinc-200">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Icon name="rocket" className="h-5 w-5" />
                  Tip
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Don’t over-polish v1. Ship the template, validate sales, then iterate.
                </p>
              </div>
            </div>

            <FAQAccordion items={faqs} />
          </div>

          {/* Final CTA */}
          <div className="mx-auto mt-14 max-w-6xl">
            <div className="rounded-[32px] bg-zinc-900 px-6 py-10 text-white shadow-sm sm:px-10">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                    Ready to launch your SaaS?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-200">
                    Get the template and ship your website today.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button
                    variant="secondary"
                    onClick={() => alert('Replace with your live demo URL or anchor section.')}
                  >
                    View Live Demo
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => scrollToId('pricing')}
                  >
                    Get the Template
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mx-auto mt-10 max-w-6xl rounded-3xl bg-white/70 p-6 ring-1 ring-zinc-200 sm:p-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="text-sm font-extrabold">
                  XsM <span className="text-zinc-500">Templates</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  AI-powered website templates for fast launches.
                </p>
              </div>

              <div>
                <div className="text-sm font-bold">Product</div>
                <ul className="mt-3 space-y-2 text-sm text-zinc-600">
                  <li><button className="hover:text-zinc-900" onClick={() => scrollToId('features')}>Features</button></li>
                  <li><button className="hover:text-zinc-900" onClick={() => scrollToId('pricing')}>Pricing</button></li>
                  <li><button className="hover:text-zinc-900" onClick={() => scrollToId('faq')}>FAQ</button></li>
                </ul>
              </div>

              <div>
                <div className="text-sm font-bold">Company</div>
                <ul className="mt-3 space-y-2 text-sm text-zinc-600">
                  <li><a className="hover:text-zinc-900" href="#contact">Contact</a></li>
                  <li><a className="hover:text-zinc-900" href="#about">About</a></li>
                </ul>
              </div>

              <div>
                <div className="text-sm font-bold">Legal</div>
                <ul className="mt-3 space-y-2 text-sm text-zinc-600">
                  <li><a className="hover:text-zinc-900" href="#terms">Terms</a></li>
                  <li><a className="hover:text-zinc-900" href="#privacy">Privacy</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-zinc-200 pt-5 text-xs text-zinc-500">
              © 2026 XsM Templates. All rights reserved.
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
