import { google } from 'googleapis';

interface SheetRow {
  [key: string]: string;
}

export const getSheetsData = async (): Promise<SheetRow[]> => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      private_key: process.env.GOOGLE_SHEETS_API_KEY!.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  // Get the authenticated client, which is typed as GoogleAuth
  const authClient = await auth.getClient();

  // Type assertion here to assure TypeScript that authClient is valid
  const sheets = google.sheets({ version: 'v4', auth: authClient as any }); // Using `as any` here to avoid typing issues

  const range = 'Senators!A3:F82'; // Adjust the range as needed

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log('No data found.');
      return [];
    }

    const headers: string[] = rows[0]; // First row as headers
    const data: string[][] = rows.slice(1); // Remaining rows as data

    // Map each row into an object where keys are the headers and values are the corresponding row data
    const formattedData: SheetRow[] = data.map((row) => {
      return headers.reduce((acc: SheetRow, header: string, i: number) => {
        acc[header] = row[i] || ''; // Add default empty string for missing values
        return acc;
      }, {} as SheetRow);
    });

    return formattedData;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return [];
  }
};
