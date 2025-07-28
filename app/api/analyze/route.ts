import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const supabase = await createClient()

    console.log('Analysis request received:', data)

    // Create or get customer
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .upsert({ 
        email: data.email,
        full_name: data.businessName,
        company_name: data.businessName
      }, {
        onConflict: 'email'
      })
      .select()
      .single()

    if (customerError) {
      console.error('Customer error:', customerError)
      throw customerError
    }

    // Create business
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .insert({
        customer_id: customer.id,
        business_name: data.businessName,
        location: data.location,
        business_type: data.businessType,
        google_business_url: data.businessUrl,
        website_url: data.businessUrl
      })
      .select()
      .single()

    if (businessError) {
      console.error('Business error:', businessError)
      throw businessError
    }

    // Create analysis
    const { data: analysis, error: analysisError } = await supabase
      .from('analyses')
      .insert({
        business_id: business.id,
        customer_id: customer.id,
        status: 'pending',
        analysis_type: 'initial'
      })
      .select()
      .single()

    if (analysisError) {
      console.error('Analysis error:', analysisError)
      throw analysisError
    }

    return NextResponse.json({ 
      id: analysis.id,
      customer_id: customer.id,
      business_id: business.id,
      status: 'pending',
      message: 'Analysis started successfully!'
    })

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to start analysis', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
