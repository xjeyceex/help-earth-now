export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

interface SheetRow {
  [key: string]: string;
}

// Fetching data from Google Sheets
const getSheetsData = async (state?: string): Promise<SheetRow[]> => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_API_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient } as any);

  const range = 'Senators!A3:F'; // Adjust the range as needed

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.log('No data found.');
      return [];
    }

    const headers: string[] = rows[0]; // First row as headers
    const data: string[][] = rows.slice(1); // Remaining rows as data

    // Map each row into an object using headers as keys and filter by state if provided
    const formattedData: SheetRow[] = data
      .filter((row) => {
        const stateIndex = headers.indexOf('state'); // Assuming 'state' is the header for the state column
        return state ? (row[stateIndex]?.toUpperCase() === state.toUpperCase()) : true;
      })
      .map((row) => {
        return headers.reduce((acc: SheetRow, header: string, i: number) => {
          acc[header] = row[i] || '';
          return acc;
        }, {} as SheetRow);
      });

    return formattedData;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw new Error('Error fetching data from Google Sheets');
  }
};

// Named exports for each HTTP method
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const lowerCasestate = url.searchParams.get('state'); // Retrieve the 'state' query parameter
    const state = lowerCasestate ? lowerCasestate.toUpperCase() : undefined; // Convert to uppercase or set to undefined
    const senatorsData = await getSheetsData(state); // Pass state to filter during fetch

    return NextResponse.json(senatorsData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-cache, no-store, must-revalidate', // Add no-cache headers
        'Pragma': 'no-cache', // HTTP 1.0
        'Expires': '0', // Proxies
      },
    });
  } catch (error) {
    console.error('Error fetching senators data:', error);
    return NextResponse.json({ error: 'Failed to fetch senators data' }, { status: 500 });
  }
}
