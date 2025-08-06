/* app/page.tsx — ClarifyIQ homepage (complete) */
'use client'

/* ───────── UI primitives ───────── */
import { Header } from '@/app/components/layout/header'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'

/* ───────── Feature blocks ───────── */
import { ROICalculator } from '@/app/components/features/roi-calculator'
import { AnalysisForm } from '@/app/components/features/analysis-form'
import MiniAuditCard from '@/components/MiniAudit/MiniAuditCard'

/* ───────── Visuals ───────── */
import { ParticleScene } from '@/app/components/ParticleScene'

/* ───────── Live review-stream widgets ───────── */
import { ReviewStreamProvider } from '@/app/components/review-stream/review-stream-provider'
import { WaterfallColumn } from '@/app/components/review-stream/waterfall-column'
import { SpotlightSplitter } from '@/app/components/review-stream/spotlight-splitter'
import { AttributeBins } from '@/app/components/review-stream/attribute-bins'

/* ───────── Icons (lucide-react) ───────── */
import {
  Brain,
  DollarSign,
  Target,
  TrendingUp,
  Shield,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* -------------------------------------------------- */}
      {/* navbar */}
      {/* -------------------------------------------------- */}
      <Header />

      {/* -------------------------------------------------- */}
      {/* HERO */}
      {/* -------------------------------------------------- */}
      <section
        id="hero"
        className="relative h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden"
      >
        <ParticleScene streams={3} />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pointer-events-none">
          <h1 className="text-5xl sm:text-6xl font-extrabold drop-shadow-lg text-center mb-4">
            Steal Tomorrow’s Calls—Rise to the Top
          </h1>
          <p className="text-lg sm:text-xl drop-shadow text-center max-w-2xl">
            We quantify 200 growth levers—here are the first three you should tackle.
          </p>
        </div>

        <div className="absolute bottom-16 opacity-0 animate-fade-in-up delay-[4s]">
          <button className="bg-gradient-to-r from-purple-500 to-blue-400 px-8 py-3 rounded-full font-semibold">
            Run My Local Scan
          </button>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* PAIN POINTS + SOLUTION */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* pain */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Stop Losing Revenue to Bad Reviews
            </h2>

            {[
              { kpi: '$10 000–50 000', text: 'lost annually from negative reviews' },
              { kpi: '10+ hours', text: 'spent weekly checking multiple platforms' },
              { kpi: 'No clear plan', text: 'to improve ratings systematically' },
              { kpi: 'Zero market insight', text: 'into nearby competitors' },
            ].map((item) => (
              <div key={item.text} className="flex gap-3 mb-4">
                <span className="mt-2 w-2 h-2 bg-red-500 rounded-full" />
                <p className="text-gray-600">
                  <strong>{item.kpi}</strong> {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* solution bullets */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold">ClarifyIQ Solution:</h3>
            {[
              'Automated daily monitoring for you + competitors',
              'Exact revenue impact per issue',
              'Prioritised action plans (effort × impact)',
              'Track improvements and ROI over time',
            ].map((txt, i) => (
              <div
                key={txt}
                className={`flex items-center gap-3 p-4 rounded-lg ${
                  ['green', 'blue', 'purple', 'yellow'][i]
                }-50 bg-opacity-30`}
              >
                <CheckCircle
                  className={`w-5 h-5 text-${['green', 'blue', 'purple', 'yellow'][i]}-600`}
                />
                <span>{txt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* MINI-AUDIT CARDS */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <MiniAuditCard type="reviews" />
          <MiniAuditCard type="seo" />
          <MiniAuditCard type="ux" />
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* VALUE PILLARS (cards) */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Intelligence, Simple Results</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI doesn’t just detect sentiment— it quantifies the exact revenue you’re
            missing and delivers precise next steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {[
            {
              icon: Brain,
              title: 'Smart Analysis',
              body:
                '95 % accuracy ensemble that maps sentiment, attributes and revenue impact across every platform.',
              color: 'purple',
            },
            {
              icon: DollarSign,
              title: 'Revenue Intelligence',
              body:
                'See exactly what each issue costs monthly, with market benchmarks and confidence scoring.',
              color: 'green',
            },
            {
              icon: Target,
              title: 'Action Plans',
              body:
                'Not generic advice—specific fixes prioritised by effort vs. impact for maximum ROI.',
              color: 'blue',
            },
            {
              icon: TrendingUp,
              title: 'Track Progress',
              body:
                'Quarterly deep-dives + bi-weekly pulse checks so you stay ahead of new issues.',
              color: 'orange',
            },
          ].map(({ icon: Icon, title, body, color }) => (
            <Card key={title} className="text-center">
              <CardHeader>
                <Icon className={`w-12 h-12 text-${color}-600 mx-auto mb-4`} />
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* ROI CALCULATOR */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Calculate Your Revenue Opportunity</h2>
          <p className="text-xl text-gray-600">
            Discover how much revenue you’re missing because of review issues.
          </p>
        </div>
        <ROICalculator />
      </section>

      {/* -------------------------------------------------- */}
      {/* LIVE REVIEW STREAM */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Live Voice of the Customer</h2>
          <ReviewStreamProvider>
            <div className="flex justify-center items-start gap-12">
              <WaterfallColumn />
              <SpotlightSplitter />
              <AttributeBins />
            </div>
          </ReviewStreamProvider>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* CTA STRIP */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Stop Guessing, Start Growing</h2>
          <p className="text-xl mb-8">
            Join hundreds of businesses that turned reputation into revenue.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
            Get Your Free Analysis Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-purple-200 mt-4">
            Free analysis • No credit card required • Results in 5 minutes
          </p>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* FOOTER */}
      {/* -------------------------------------------------- */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold">ClarifyIQ</span>
          </div>
          <p className="text-gray-400">
            Transform your online reputation into your strongest revenue driver.
          </p>
          <p className="text-gray-500 mt-4">&copy; 2025 ClarifyIQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
