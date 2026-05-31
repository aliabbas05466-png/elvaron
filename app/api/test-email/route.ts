import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ 
        success: false, 
        error: 'RESEND_API_KEY not configured'
      }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'teamelvaron@gmail.com',
      subject: 'Test Email from ELVARON',
      html: '<p>This is a test email. If you received this, the email system is working!</p>',
    })

    console.log('[v0] Test email result:', result)

    return NextResponse.json({ 
      success: true,
      message: 'Test email sent successfully',
      result: result
    })
  } catch (error) {
    console.error('[v0] Test email error:', error)
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: JSON.stringify(error)
    }, { status: 500 })
  }
}
