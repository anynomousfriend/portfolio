import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'officialsubhankar01@gmail.com',
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="background:#09090b;color:#e4e4e7;font-family:system-ui,sans-serif;padding:40px;">
            <div style="max-width:520px;margin:0 auto;background:#18181b;border:1px solid #27272a;border-radius:12px;padding:32px;">
              <h2 style="color:#a5b4fc;margin:0 0 24px;">New Portfolio Message</h2>
              <p style="color:#71717a;font-size:12px;margin:0 0 16px;">FROM</p>
              <p style="margin:0 0 4px;font-weight:600;">${name}</p>
              <p style="margin:0 0 24px;color:#a1a1aa;">${email}</p>
              <p style="color:#71717a;font-size:12px;margin:0 0 12px;">MESSAGE</p>
              <p style="margin:0;line-height:1.7;color:#d4d4d8;white-space:pre-wrap;">${message}</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('[Resend error]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact route error]', err);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
