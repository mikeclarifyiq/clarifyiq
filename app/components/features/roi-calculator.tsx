'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { Calculator, TrendingUp } from 'lucide-react'

export function ROICalculator() {
  const [businessType, setBusinessType] = useState('hvac')
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000)
  const [currentRating, setCurrentRating] = useState(3.8)
  const [reviewCount, setReviewCount] = useState(45)

  const businessTypes = {
    hvac: { name: 'HVAC', multiplier: 1.2 },
    plumbing: { name: 'Plumbing', multiplier: 1.1 },
    electrical: { name: 'Electrical', multiplier: 1.15 },
    dental: { name: 'Dental', multiplier: 1.3 },
    restaurant: { name: 'Restaurant', multiplier: 0.9 }
  }

  const ratingImpact = (4.5 - currentRating) * 0.15 * monthlyRevenue
  const reviewVolumeImpact = Math.max(0, (100 - reviewCount) * 50)
  const industryMultiplier = businessTypes[businessType as keyof typeof businessTypes].multiplier
  
  const monthlyOpportunity = (ratingImpact + reviewVolumeImpact) * industryMultiplier
  const annualOpportunity = monthlyOpportunity * 12

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-purple-600" />
          ROI Calculator
        </CardTitle>
        <p className="text-gray-600">See how much revenue you could be missing</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Type
            </label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              {Object.entries(businessTypes).map(([key, { name }]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Revenue
            </label>
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-center font-semibold text-purple-600">
              {formatCurrency(monthlyRevenue)}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Potential Revenue Impact</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(monthlyOpportunity)}
              </div>
              <div className="text-sm text-gray-600">Monthly Opportunity</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(annualOpportunity)}
              </div>
              <div className="text-sm text-gray-600">Annual Opportunity</div>
            </div>
          </div>
        </div>

        <Button className="w-full" size="lg">
          Get Your Free Analysis
        </Button>
      </CardContent>
    </Card>
  )
}
