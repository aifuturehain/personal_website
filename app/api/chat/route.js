import { NextResponse } from 'next/server';

class GeminiAI {
  constructor() {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) throw new Error('GOOGLE_GEMINI_API_KEY is not set in environment variables');
    
    this.apiKey = apiKey;
    this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
  }

  async chatWithContent(websiteContent, websiteTitle, userQuestion) {
    try {
      const prompt = this.buildPrompt(websiteContent, websiteTitle, userQuestion);
      
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) throw new Error(`API request failed: ${response.status}`);

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (!text || text.length === 0) {
        return { response: '', error: 'NO_RESPONSE_GENERATED' };
      }

      return { response: text };

    } catch (error) {
      console.error('Gemini AI error:', error);
      
      if (error.message.includes('quota') || error.message.includes('limit')) return { response: '', error: 'QUOTA_EXCEEDED' };
      if (error.message.includes('blocked') || error.message.includes('safety')) return { response: '', error: 'CONTENT_BLOCKED' };
      if (error.message.includes('rate limit')) return { response: '', error: 'RATE_LIMITED' };

      return { response: '', error: 'AI_SERVICE_ERROR' };
    }
  }

  buildPrompt(websiteContent, websiteTitle, userQuestion) {
    return `You are a knowledgeable assistant who has thoroughly reviewed the website "${websiteTitle}". You speak naturally and help users find what they need.

Website you've reviewed: ${websiteTitle}

Content you know about:
${websiteContent}

User's question: ${userQuestion}

Guidelines for your response:
- Speak as if you personally know this website inside and out
- Be conversational, warm, and helpful (no robotic language)
- If you can answer from the website content, do so naturally and confidently
- If the information isn't available on the website, suggest they contact the business directly. Look for phone numbers, email addresses, contact forms, or "Contact Us" information in the content and mention them specifically
- For business websites (like dealerships, services, retail), focus on practical help - inventory, services, pricing, hours, location, contact info, etc.
- When mentioning contact information, be specific: "You can call them at [phone number]" or "Reach out through their contact form" or "Email them at [email]"
- Keep responses concise but genuinely helpful

Respond naturally and helpfully.`;
  }
}

function getAIErrorResponse(errorType) {
  const errorMap = {
    'NO_RESPONSE_GENERATED': { status: 'error', errorType: 'NO_RESPONSE', message: 'The AI was unable to generate a response', suggestion: 'Try rephrasing your question or ask something more specific about the website content' },
    'QUOTA_EXCEEDED': { status: 'error', errorType: 'QUOTA_EXCEEDED', message: 'AI service quota has been exceeded', suggestion: 'Please try again later when the quota resets' },
    'CONTENT_BLOCKED': { status: 'error', errorType: 'CONTENT_BLOCKED', message: 'Your question or the website content was blocked by safety filters', suggestion: 'Try asking a different question or use a different website' },
    'RATE_LIMITED': { status: 'error', errorType: 'RATE_LIMITED', message: 'Too many requests. Please slow down', suggestion: 'Wait a moment before asking another question' }
  };
  
  return errorMap[errorType] || { status: 'error', errorType: 'AI_SERVICE_ERROR', message: 'The AI service encountered an error', suggestion: 'Please try asking your question again' };
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate all required fields
    const validations = [
      { field: 'question', message: 'Question cannot be empty' },
      { field: 'websiteContent', message: 'Website content is required' },
      { field: 'websiteTitle', message: 'Website title is required' },
      { field: 'websiteUrl', message: 'Valid website URL is required' }
    ];

    for (const { field, message } of validations) {
      if (!body[field] || typeof body[field] !== 'string' || body[field].trim().length === 0) {
        return NextResponse.json({
          status: 'error', errorType: 'INVALID_REQUEST', message, suggestion: 'Please make sure you have scraped a website first and entered a valid question'
        }, { status: 400 });
      }
    }
    
    const gemini = new GeminiAI();
    const aiResponse = await gemini.chatWithContent(body.websiteContent, body.websiteTitle, body.question);

    if (aiResponse.error) {
      return NextResponse.json(getAIErrorResponse(aiResponse.error), { status: 400 });
    }

    return NextResponse.json({
      status: 'success',
      response: aiResponse.response,
      websiteTitle: body.websiteTitle,
      websiteUrl: body.websiteUrl
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      status: 'error', errorType: 'SERVER_ERROR', message: 'An unexpected error occurred while processing your question', suggestion: 'Please try asking your question again'
    }, { status: 500 });
  }
}