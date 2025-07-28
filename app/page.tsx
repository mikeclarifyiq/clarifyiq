import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Header } from '@/app/components/layout/header'
import { ROICalculator } from '@/app/components/features/roi-calculator'
import { AnalysisForm } from '@/app/components/features/analysis-form'
import { 
  Brain, 
  DollarSign, 
  Target, 
  TrendingUp, 
  Shield,
  CheckCircle,
  Users,
  ArrowRight
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Turn Review Chaos into
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block">
                Revenue Clarity
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AI-powered intelligence that transforms scattered reviews into strategic growth opportunities. 
              See exactly what reviews are costing you and get the precise actions to fix it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                Get Your Free Analysis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Watch Demo
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-6 h-6 text-green-600" />
              <span className="text-gray-600">95% Analysis Accuracy</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              <span className="text-gray-600">500+ Businesses Analyzed</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <span className="text-gray-600">$2.1M Revenue Identified</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Stop Losing Revenue to Bad Reviews
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    <strong>$10,000-50,000 lost annually</strong> from negative reviews deterring customers
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    <strong>10+ hours weekly</strong> spent manually checking reviews across platforms
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    <strong>No clear action plan</strong> to improve ratings systematically
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    <strong>Blind to competitor performance</strong> and market positioning
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                ClarifyIQ Solution:
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Automated daily monitoring of your business + competitors</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Quantify exact revenue impact of each issue</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <span>Step-by-step action plans to fix problems</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-yellow-600" />
                  <span>Track improvement and ROI over time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Intelligence, Simple Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI doesn't just analyze sentiment—it decodes exactly what's costing you money 
              and delivers precise actions to fix it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Smart Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  95% accuracy with ensemble AI models analyzing sentiment, 
                  attributes, and revenue impact across all review platforms.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Revenue Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  See exactly how much each review issue costs you monthly, 
                  with industry benchmarks and confidence scoring.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Action Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Specific steps to fix problems, not generic advice. 
                  Prioritized by effort vs impact for maximum ROI.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Quarterly deep-dives and bi-weekly pulse checks 
                  to measure improvement and catch new issues early.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Calculate Your Revenue Opportunity
            </h2>
            <p className="text-xl text-gray-600">
              See how much revenue you could be missing due to review issues
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Uncover Your Revenue Opportunities?
            </h2>
            <p className="text-xl text-gray-600">
              Get your free analysis now—no credit card required
            </p>
          </div>
          <AnalysisForm />
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Stop Guessing, Start Growing
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join hundreds of businesses that have transformed their online reputation 
            into their strongest revenue driver with ClarifyIQ.
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

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Brain className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold">ClarifyIQ</span>
            </div>
            <p className="text-gray-400">
              Transform your online reputation into your strongest revenue driver.
            </p>
            <p className="text-gray-500 mt-4">
              &copy; 2025 ClarifyIQ. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
