
import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  try {
    const { name, phone, telegram, projectType, message } = await request.json();

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram Bot Token or Chat ID is missing');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Helper to escape HTML characters for Telegram
    const escapeHtml = (unsafe: string) => {
      return String(unsafe || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    };

    const text = `
🚀 <b>New Project Request</b>

👤 <b>Name:</b> ${escapeHtml(name)}
📱 <b>Phone:</b> ${escapeHtml(phone)}
✈️ <b>Telegram:</b> ${escapeHtml(telegram || 'N/A')}
🎯 <b>Project Type:</b> ${escapeHtml(projectType)}
📝 <b>Message:</b>
${escapeHtml(message)}
    `;

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    if (response.ok) {
        return NextResponse.json({ success: true });
    } else {
        const errorData = await response.json();
        console.error('Telegram API Error:', errorData);
        return NextResponse.json({ 
            error: `Telegram Error: ${errorData.description || errorData.error_code || 'Unknown error'}` 
        }, { status: 500 });
    }

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
