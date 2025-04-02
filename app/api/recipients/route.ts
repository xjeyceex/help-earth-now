// app/api/learnMore/route.ts
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Append data to Google Sheets
const appendToSheets = async (email: string): Promise<void> => {
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

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: 'Recipients!A:A',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[email]],
      },
    });
  } catch (error) {
    console.error('Error appending data to Google Sheets:', error);
    throw new Error('Error appending data to Google Sheets');
  }
};

// POST handler to append data
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    await appendToSheets(email);

    return NextResponse.json(
      { success: true, message: 'Email successfully saved' },
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
    console.error('Error saving email:', error);
    return NextResponse.json(
      { error: 'Failed to save email' },
      { status: 500 }
    );
  }
}
