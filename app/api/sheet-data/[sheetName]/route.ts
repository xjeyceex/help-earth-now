// app/api/sheet/[sheetName]/route.ts
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

interface SheetRow {
  [key: string]: string;
}

const SHEET_RANGES: Record<string, string> = {
  header: 'Primary Table!A2:S',
  keyPeople: 'People to Follow!A1:D',
  more: 'MORE 4 CCC!A1:U',
  workInClimateArea: 'Work in the Climate Area!A1:C',
  aboutUs: 'About Us!A2:B',
  videos: 'Videos!A1:C',
  learnMore: 'Additional Pages!B1:D',
};

const getSheetsData = async (range: string): Promise<SheetRow[]> => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_API_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient as any });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });

  const rows = response.data.values;
  if (!rows || rows.length === 0) throw new Error('No data found.');

  const headers = rows[0];
  const data = rows.slice(1);

  return data.map((row) =>
    headers.reduce((acc: SheetRow, header: string, i: number) => {
      acc[header] = row[i] || '';
      return acc;
    }, {})
  );
};

export async function GET(
  req: NextRequest,
  { params }: { params: { sheetName: string } }
) {
  try {
    const sheetRange = SHEET_RANGES[params.sheetName];
    if (!sheetRange) {
      return NextResponse.json(
        { error: 'Invalid sheet name' },
        { status: 400 }
      );
    }

    const sheetData = await getSheetsData(sheetRange);
    return NextResponse.json(sheetData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sheet data' },
      { status: 500 }
    );
  }
}
