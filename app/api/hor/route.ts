// app/api/hors/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

interface SheetRow {
  [key: string]: string;
}

// Fetching data from Google Sheets
const getSheetsData = async (): Promise<SheetRow[]> => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_API_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient as any});

  const range = 'House Of Representatives!A3:E'; // Adjust the range as needed

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

    // Map each row into an object using headers as keys
    const formattedData: SheetRow[] = data.map((row) => {
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
    const horsData = await getSheetsData();
    return NextResponse.json(horsData, {
        headers: {
            'Access-Control-Allow-Origin': '*',  
            'Access-Control-Allow-Methods': 'GET, POST',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        });
  } catch (error) {
    console.error('Error fetching hors data:', error);
    return NextResponse.json({ error: 'Failed to fetch hors data' }, { status: 500 });
  }
}
