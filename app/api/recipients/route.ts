export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const appendToSheets = async (email?: string, phone?: string) => {
  if (
    !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !process.env.GOOGLE_SHEETS_API_KEY ||
    !process.env.GOOGLE_SHEET_ID
  ) {
    throw new Error('Missing Google Sheets environment variables');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_API_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  // ✅ PASS GoogleAuth DIRECTLY (fixes TS overload error)
  const sheets = google.sheets({
    version: 'v4',
    auth,
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: 'Recipients!A:B',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[email ?? '', phone ?? '']],
    },
  });
};

export async function POST(req: NextRequest) {
  try {
    const { email, phone } = await req.json();

    if (
      (!email || typeof email !== 'string') &&
      (!phone || typeof phone !== 'string')
    ) {
      return NextResponse.json(
        { error: 'Please provide either a valid email or phone number' },
        { status: 400 }
      );
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }
    }

    if (phone) {
      const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
      if (!phoneRegex.test(phone)) {
        return NextResponse.json(
          {
            error: 'Invalid phone format. Use (XXX) XXX-XXXX',
          },
          { status: 400 }
        );
      }
    }

    await appendToSheets(email, phone);

    return NextResponse.json(
      { success: true },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to save contact information' },
      { status: 500 }
    );
  }
}
