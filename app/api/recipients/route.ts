export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Append data to Google Sheets with independent columns
const appendToSheets = async (email?: string, phone?: string) => {
  if (
    !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !process.env.GOOGLE_SHEETS_API_KEY ||
    !process.env.GOOGLE_SHEET_ID
  ) {
    throw new Error(
      'Missing required environment variables for Google Sheets API'
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_API_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient as any });

  // Get last used row for Email (column A)
  const colA = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: 'Recipients!A:A',
  });
  const lastRowA = colA.data.values ? colA.data.values.length : 0;

  // Get last used row for Phone (column B)
  const colB = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: 'Recipients!B:B',
  });
  const lastRowB = colB.data.values ? colB.data.values.length : 0;

  // Write Email to next row in column A
  if (email) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: `Recipients!A${lastRowA + 1}`,
      valueInputOption: 'RAW',
      requestBody: { values: [[email]] },
    });
  }

  // Write Phone to next row in column B
  if (phone) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: `Recipients!B${lastRowB + 1}`,
      valueInputOption: 'RAW',
      requestBody: { values: [[phone]] },
    });
  }
};

// POST handler to append data
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, phone } = body;

    // Validate that at least one contact method is provided
    if (
      (!email || typeof email !== 'string') &&
      (!phone || typeof phone !== 'string')
    ) {
      return NextResponse.json(
        { error: 'Please provide either a valid email or phone number' },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (email && typeof email === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }
    }

    // Validate phone format if provided
    if (phone && typeof phone === 'string') {
      const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
      if (!phoneRegex.test(phone)) {
        return NextResponse.json(
          { error: 'Invalid phone format. Please use (XXX) XXX-XXXX format' },
          { status: 400 }
        );
      }
    }

    // Append data
    await appendToSheets(email, phone);

    return NextResponse.json(
      { success: true, message: 'Contact information successfully saved' },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  } catch (error) {
    console.error('Error saving contact information:', error);
    return NextResponse.json(
      { error: 'Failed to save contact information' },
      { status: 500 }
    );
  }
}
