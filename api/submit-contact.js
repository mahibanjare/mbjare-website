// Vercel Serverless Function - Handle Contact Form Submissions
// Validates Turnstile token and sends data to Google Apps Script

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, formData, formType } = req.body;

  // Validate input
  if (!token || !formData || !formType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Step 1: Verify Turnstile token with Cloudflare
    const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });

    const turnstileData = await turnstileResponse.json();

    if (!turnstileData.success) {
      return res.status(400).json({ 
        error: 'Turnstile verification failed',
        details: turnstileData['error-codes']
      });
    }

    // Step 2: Prepare data with timestamp
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const dataWithTimestamp = { Timestamp: timestamp, ...formData };

    // Step 3: Send data to Google Apps Script
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    
    if (!scriptUrl) {
      return res.status(500).json({ 
        error: 'Google Apps Script URL not configured',
        hint: 'Set GOOGLE_APPS_SCRIPT_URL in environment variables'
      });
    }

    const appsScriptResponse = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: formType, // 'contact' or 'newsletter'
        data: dataWithTimestamp,
      }),
    });

    const scriptResult = await appsScriptResponse.json();

    if (!scriptResult.success) {
      console.error('Apps Script error:', scriptResult);
      return res.status(500).json({ 
        error: 'Failed to save data',
        details: scriptResult.message
      });
    }

    // Success
    return res.status(200).json({ 
      success: true,
      message: 'Form submitted successfully',
      id: scriptResult.id
    });

  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({ 
      error: 'Server error',
      details: error.message
    });
  }
}
