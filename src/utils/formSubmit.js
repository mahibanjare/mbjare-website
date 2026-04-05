// Frontend utility for form submission with Turnstile validation

export const submitForm = async (formData, turnstileToken, formType = 'contact') => {
  if (!turnstileToken) {
    throw new Error('Please complete the Turnstile verification');
  }

  const response = await fetch('/api/submit-contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: turnstileToken,
      formData,
      formType,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to submit form');
  }

  return result;
};
