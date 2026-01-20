export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

/* ------------------------- Utilities ------------------------- */

const normalizePhone = (input: string): string => {
  const digits = input.replace(/\D/g, '');
  if (digits.length !== 10) {
    throw new Error('Invalid phone number');
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const getTimestamp = (): string => {
  const now = new Date();
  return now.toISOString().replace('T', ' ').slice(0, 19);
};

/* ------------------------- Sheets Logic ------------------------- */

const upsertToSheets = async (email?: string, phone?: string) => {
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

  const sheets = google.sheets({ version: 'v4', auth });

  const normalizedPhone = phone ? normalizePhone(phone) : undefined;
  const timestamp = getTimestamp();

  // Fetch existing rows
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: 'Recipients!A:C',
  });

  const rows = existing.data.values || [];

  // Look for existing email or phone
  for (let i = 0; i < rows.length; i++) {
    const [existingEmail, existingPhone] = rows[i];
    const rowIndex = i + 1;

    // Match email OR phone
    if (
      (email && existingEmail === email) ||
      (normalizedPhone && existingPhone === normalizedPhone)
    ) {
      // Partial update
      const updatedEmail = existingEmail || email || '';
      const updatedPhone = existingPhone || normalizedPhone || '';

      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEET_ID!,
        range: `Recipients!A${rowIndex}:C${rowIndex}`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [[updatedEmail, updatedPhone, timestamp]],
        },
      });

      return { action: 'updated' };
    }
  }

  // Insert new row
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: 'Recipients!A:C',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[email ?? '', normalizedPhone ?? '', timestamp]],
    },
  });

  return { action: 'inserted' };
};

/* ------------------------- API Handler ------------------------- */

export async function POST(req: NextRequest) {
  try {
    const { email, phone } = await req.json();

    if (
      (!email || typeof email !== 'string') &&
      (!phone || typeof phone !== 'string')
    ) {
      return NextResponse.json(
        { error: 'Provide at least email or phone' },
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

    let normalizedPhone: string | undefined;
    if (phone) {
      try {
        normalizedPhone = normalizePhone(phone);
      } catch {
        return NextResponse.json(
          { error: 'Invalid phone number' },
          { status: 400 }
        );
      }
    }

    const result = await upsertToSheets(email, normalizedPhone);

    return NextResponse.json({
      success: true,
      action: result.action,
    });
  } catch (error) {
    console.error('Sheets error:', error);
    return NextResponse.json(
      { error: 'Failed to save contact information' },
      { status: 500 }
    );
  }
}
