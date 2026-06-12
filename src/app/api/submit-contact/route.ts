import { NextRequest, NextResponse } from 'next/server'

// Verifies the Cloudflare Turnstile token, then forwards the submission
// to the Google Apps Script endpoint that writes to the sheet.

export async function POST(req: NextRequest) {
  let body: { token?: string; formData?: Record<string, string>; formType?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { token, formData, formType } = body
  if (!formData || !formType) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Newsletter signups skip Turnstile (low-risk, single email field);
  // contact submissions require a token.
  if (formType === 'contact') {
    if (!token) {
      return NextResponse.json({ error: 'Missing verification token' }, { status: 400 })
    }
    const remoteip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      undefined

    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        ...(remoteip ? { remoteip } : {}),
      }),
    })
    const verify = await verifyRes.json()
    if (!verify.success) {
      return NextResponse.json(
        { error: 'Verification failed', details: verify['error-codes'] },
        { status: 400 }
      )
    }
  }

  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL
  if (!scriptUrl) {
    return NextResponse.json(
      { error: 'Google Apps Script URL not configured' },
      { status: 500 }
    )
  }

  try {
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    const scriptRes = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: formType,
        data: { Timestamp: timestamp, ...formData },
      }),
    })
    const result = await scriptRes.json()

    if (!result.success) {
      console.error('Apps Script error:', result)
      return NextResponse.json(
        { error: 'Failed to save data', details: result.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: result.id })
  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
