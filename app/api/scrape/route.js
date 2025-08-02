import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

class WebScraper {
  constructor() {
    this.timeout = 30000;
    this.maxContentLength = 10000;
  }

  async scrapeWebsite(url) {
    try {
      if (!this.isValidUrl(url)) {
        return { title: '', content: '', url, error: 'INVALID_URL' };
      }

      const response = await axios.get(url, {
        timeout: this.timeout,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WebsiteAssistant/1.0)' },
      });

      const $ = cheerio.load(response.data);
      const title = $('title').text().trim() || 'Untitled Page';

      const contentSelectors = ['main', 'article', '[role="main"]', '.content', '.main-content', '#content', '#main'];
      let content = '';
      
      for (const selector of contentSelectors) {
        const mainContent = $(selector).first();
        if (mainContent.length > 0) {
          content = this.extractTextContent(mainContent, $);
          break;
        }
      }

      if (!content) {
        content = this.extractTextContent($('body'), $);
      }

      const contactContent = this.extractContactInfo($);
      if (contactContent) {
        content += '\n\nContact Information:\n' + contactContent;
      }

      content = this.cleanContent(content);

      if (!content || content.length < 50) {
        return { title, content: '', url, error: 'NO_CONTENT_FOUND' };
      }

      return { title, content, url };

    } catch (error) {
      console.error('Scraping error:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') return { title: '', content: '', url, error: 'TIMEOUT' };
        if (error.response?.status === 404) return { title: '', content: '', url, error: 'NOT_FOUND' };
        if (error.response?.status && error.response.status >= 400) return { title: '', content: '', url, error: 'ACCESS_DENIED' };
      }

      return { title: '', content: '', url, error: 'SCRAPING_FAILED' };
    }
  }

  isValidUrl(url) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch {
      return false;
    }
  }

  extractTextContent(element, $) {
    element.find('script, style, nav, footer, header, aside, .sidebar, .navigation, .menu').remove();
    const textElements = [];
    
    element.find('h1, h2, h3, h4, h5, h6, p, li, blockquote').each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 10) {
        textElements.push(text);
      }
    });

    return textElements.join('\n\n');
  }

  extractContactInfo($) {
    const contactInfo = [];
    const contactSelectors = ['[class*="contact"]', '[id*="contact"]', 'footer', '[class*="phone"]', '[class*="email"]', '[href^="tel:"]', '[href^="mailto:"]'];

    contactSelectors.forEach(selector => {
      $(selector).each((_, element) => {
        const text = $(element).text().trim();
        const href = $(element).attr('href');
        
        if (href && href.startsWith('tel:')) contactInfo.push(`Phone: ${href.replace('tel:', '')}`);
        if (href && href.startsWith('mailto:')) contactInfo.push(`Email: ${href.replace('mailto:', '')}`);
        
        const phoneMatch = text.match(/(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/);
        if (phoneMatch) contactInfo.push(`Phone: ${phoneMatch[0]}`);
        
        const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
        if (emailMatch) contactInfo.push(`Email: ${emailMatch[0]}`);
      });
    });

    return [...new Set(contactInfo)].join('\n');
  }

  cleanContent(content) {
    content = content.replace(/\s+/g, ' ').trim();
    if (content.length > this.maxContentLength) {
      content = content.substring(0, this.maxContentLength) + '...';
    }
    return content;
  }
}

class GeminiAI {
  constructor() {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) throw new Error('GOOGLE_GEMINI_API_KEY is not set in environment variables');
    
    this.apiKey = apiKey;
    this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
  }

  async generateSummary(websiteContent, websiteTitle) {
    try {
      const prompt = `Please provide a brief summary (2-3 sentences) of this website content:\n\nWebsite: ${websiteTitle}\nContent: ${websiteContent}\n\nFocus on the main topics and key information covered. Write in a natural, conversational tone.`;

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

      return { response: text || 'Summary generated successfully' };

    } catch (error) {
      console.error('Summary generation error:', error);
      return { response: '', error: 'SUMMARY_GENERATION_FAILED' };
    }
  }
}

function getErrorResponse(errorType) {
  const errorMap = {
    'INVALID_URL': { status: 'error', errorType: 'INVALID_URL', message: 'The URL you provided is not valid', suggestion: 'Please enter a valid HTTP or HTTPS URL (e.g., https://example.com)' },
    'TIMEOUT': { status: 'error', errorType: 'TIMEOUT', message: 'The website took too long to respond', suggestion: 'Try a different website or check if the URL is correct' },
    'NOT_FOUND': { status: 'error', errorType: 'NOT_FOUND', message: 'The webpage could not be found (404 error)', suggestion: 'Please check the URL and try again' },
    'ACCESS_DENIED': { status: 'error', errorType: 'ACCESS_DENIED', message: 'Unable to access this website (it may block automated requests)', suggestion: 'Try a different website that allows public access' },
    'NO_CONTENT_FOUND': { status: 'error', errorType: 'NO_CONTENT', message: 'No readable content found on this webpage', suggestion: 'Try a different URL with more text content' }
  };
  
  return errorMap[errorType] || { status: 'error', errorType: 'SCRAPING_FAILED', message: 'Failed to extract content from this website', suggestion: 'Please try a different website or check if the URL is accessible' };
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body.url || typeof body.url !== 'string') {
      return NextResponse.json({
        status: 'error', errorType: 'INVALID_URL', message: 'Please provide a valid URL', suggestion: 'Please enter a valid HTTP or HTTPS URL (e.g., https://example.com)'
      }, { status: 400 });
    }
    
    const scraper = new WebScraper();
    const scrapedContent = await scraper.scrapeWebsite(body.url);

    if (scrapedContent.error) {
      return NextResponse.json(getErrorResponse(scrapedContent.error), { status: 400 });
    }

    let contentSummary = 'Content available for questions';
    try {
      const gemini = new GeminiAI();
      const summaryResult = await gemini.generateSummary(scrapedContent.content, scrapedContent.title);
      if (summaryResult.response) contentSummary = summaryResult.response;
    } catch (error) {
      console.warn('Summary generation failed, continuing without summary:', error);
    }

    return NextResponse.json({
      status: 'success',
      websiteTitle: scrapedContent.title,
      contentSummary,
      content: scrapedContent.content,
      url: scrapedContent.url
    });

  } catch (error) {
    console.error('Scrape API error:', error);
    return NextResponse.json({
      status: 'error', errorType: 'SERVER_ERROR', message: 'An unexpected error occurred while processing your request', suggestion: 'Please try again in a moment'
    }, { status: 500 });
  }
}