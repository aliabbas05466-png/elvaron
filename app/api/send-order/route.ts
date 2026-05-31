import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface OrderData {
  name: string
  email: string
  phone: string
  city: string
  address: string
  cart: Array<{
    name: string
    price: number
    quantity: number
  }>
  total: number
}

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json()
    
    console.log('[v0] New order received:', {
      name: orderData.name,
      email: orderData.email,
      city: orderData.city,
      total: orderData.total,
      items: orderData.cart.length,
    })

    // Initialize Resend client only when route is called
    if (!process.env.RESEND_API_KEY) {
      console.log('[v0] RESEND_API_KEY not configured')
      return NextResponse.json({ 
        success: false, 
        message: 'Email service not configured. Please set RESEND_API_KEY in Vercel environment variables.',
      }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // Format cart items HTML
    const cartHTML = orderData.cart
      .map(
        (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: left;">${item.name}</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">x${item.quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">₨${(item.price * item.quantity).toLocaleString()}</td>
        </tr>
      `
      )
      .join('')

    // Email template
    const emailTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #D4AF37 0%, #FFE082 100%); padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px; }
        .header h1 { margin: 0; color: white; font-size: 28px; font-weight: bold; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px; font-size: 18px; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th { background: #f5f5f5; padding: 12px; text-align: left; font-weight: bold; border-bottom: 2px solid #D4AF37; }
        .total-row { background: #f9f9f9; font-weight: bold; font-size: 16px; }
        .total-row td { padding: 15px 12px; border-top: 2px solid #D4AF37; }
        .details-box { background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .detail-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e0e0e0; }
        .detail-item:last-child { border-bottom: none; }
        .detail-label { font-weight: bold; color: #666; }
        .detail-value { color: #333; }
        .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✓ Order Confirmed</h1>
          <p style="margin: 10px 0 0 0; color: #ffd700;">ELVARON Premium Fragrances</p>
        </div>

        <div class="section">
          <h2>Order Summary</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th style="text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${cartHTML}
              <tr class="total-row">
                <td colspan="2">Total Amount</td>
                <td style="text-align: right;">₨${orderData.total.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>Delivery Information</h2>
          <div class="details-box">
            <div class="detail-item">
              <span class="detail-label">Name:</span>
              <span class="detail-value">${orderData.name}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Phone:</span>
              <span class="detail-value">${orderData.phone}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">City:</span>
              <span class="detail-value">${orderData.city}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Address:</span>
              <span class="detail-value">${orderData.address}</span>
            </div>
          </div>
        </div>

        <div class="footer">
          <p>Thank you for choosing ELVARON!</p>
          <p>Our team will contact you shortly to confirm your order.</p>
          <p>© 2026 ELVARON. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `

    // Send email to admin
    console.log('[v0] Sending admin email to teamelvaron@gmail.com')
    const adminEmailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'teamelvaron@gmail.com',
      subject: `New Order - ${orderData.name} - ₨${orderData.total.toLocaleString()}`,
      html: emailTemplate,
    })

    console.log('[v0] Admin email response:', adminEmailResponse)

    // Send confirmation email to customer
    console.log('[v0] Sending customer email to', orderData.email)
    const customerEmailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: orderData.email,
      subject: 'Order Confirmation - ELVARON',
      html: emailTemplate,
    })

    console.log('[v0] Customer email response:', customerEmailResponse)

    return NextResponse.json({ 
      success: true, 
      message: 'Order received and confirmation sent to email',
    })
  } catch (error) {
    console.error('[v0] Order processing error:', error)
    console.error('[v0] Error details:', JSON.stringify(error, null, 2))
    return NextResponse.json({ 
      error: 'Failed to process order',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

