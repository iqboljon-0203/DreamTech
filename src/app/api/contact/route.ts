
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

    const text = `
🚀 *New Project Request*

👤 *Name:* ${name}
📱 *Phone:* ${phone}
✈️ *Telegram:* ${telegram || 'N/A'}
🎯 *Project Type:* ${projectType}
📝 *Message:*
${message}
    `;

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'Markdown',
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
