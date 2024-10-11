// app/api/senators/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

interface SheetRow {
  [key: string]: string;
}

// Fetching data from Google Sheets
const getSheetsData = async (): Promise<SheetRow[]> => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: 'sheets@sheet-project-438209.iam.gserviceaccount.com',
      private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChb4EugN5gAZJP\nGanwjWVSPQ46Gm17le4vElDeWABK1NexW2v/ACMEKXp6P+5QpsbMOPn3rBRPM3KB\nFLPYKoAU+oWBj1pK9b+iSBvWufvqJKyc7uKyjsVdjwwGcCFqBBgH+IowKU6/EatU\nQLyBCPndpyCuJvqzvaFW3i7wp9r07G9b4sVsLc9hP4ZG2L2UME6JDqhdiChVPPyC\njQWuXWpFA2GUwC1H9pr1LWGYchYMa+TBe/PeeVJPjeLJsvJcqPJSF2wi8WYuHVHR\nd4WUXqhJWVEGwzyf6iEroR2ypW6MPpy03Znhv/TLii/GpjtqPUURmx5824xYQndO\nf/hBkV+/AgMBAAECgf9Ipo+V8KVoy+EzzyNep8EY8BIXlkF78/sQv6QZgzHkTNJ6\negTqleZWLrGZuRRtYT8MwITVR1z9Cyx6bSN96p3aK4JwloT7vhEXLMLO4fbJsMoj\nCTA0RzF4e/geT1glUjlP1gWNtQlN4Pc8CGiCf5yRdU8O4lH+zkgHqGDwj7Eq++Z0\nupgpQXFL6xBJZNQxoe7ImYgYg8BAw0guopV5rW/3JJDWFMskKucWgkhUUwmEBVkY\nZOofjM/vhLC3atlerajKw1W0bZ/Az/sOrXg/oAGm1D0Ll6XV7TIY7ZAomW67CnYw\n+LToOtFGJ9I6wmEcnTX26VKD2PB0hQc040wLtW0CgYEA3xLfafakTekMQ14d7vzs\n4lQNvv89wnj1xdY0DWuXazuc14V7b2VmQJ6+w3jzpF/WGPCI9ib00EO8Y5KAUtWA\ncgkXY7xybSJgeag2zUSsWo7C5NGtl4AZy6iQDO+1xwePOClRkdYCifcLBKauEuJp\n6lryxvDsLyu3y1b4J6C8i3UCgYEAuUOOEA2JAz4Hg9KF3hJJ8uhz2828CujFkgVF\ntqBypC5PcQmRjvMnb2eOdWUHVficmn3ANJ+Oyr0rtw2Wh7hJBQHTINVl0eDPwe1U\nefmsr9qL65FFeYzfUE7Gl+6h3K4IrO689h1qRzp8788mf6N0Qt0rvBDXGpFFgI76\nV+BO++MCgYEApusJT9HligLbUUGIpn6NhqGck5GMFgvK5BlvY6dhazT1HHPeNDGs\nvKfMWJoVvaaUnp7F7WKjB3/X5K4H5XOqpCnXXaLyAGWbyQyszRYY3b47aVrYSSfq\npXDhMTzhSSeH7F9GkRiRV8kKbpWGZc0TsfAR//jg0j8lTTsrfwOQcc0CgYEAlduD\nSpDoR2shgQwFpQB+OLK3JRFiDiEDz33cSkG2+f9L20+2Ij+looPNxEAYkv4rDvyx\nQN/gDTa/6a5gGSCEUDyNn31+gyqqY1+qeY/wk77gd4hm/k9pQ/i0w6kP3QYZlmj3\nCM36bettrD2QEqcRIBTvj4y/sonYAomlDvgua6kCgYEAksHnzf/I2W+PU8vvFKSl\nJ2a+Fh0ttsa5OySCPIRJOgDc2sbzSqw4v6QzMXiFa2LVSaZi/vVeiZt3v6yjf5qj\n96CMg40wlF7JgxiYXWI5Q5h0RQgqxIIivu25xD0qqv3j41p+4b745qTtHpM0B/bz\npYtnZAHvAVvQX8D+Sev3tgE=\n-----END PRIVATE KEY-----\n',
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient as any});

  const range = 'Senators!A3:F'; // Adjust the range as needed

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1DbTcX0TUPT9QYZmVTBwxyOj-lRuZly9G3CMxN2t9oqU',
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
      const senatorsData = await getSheetsData();
      return NextResponse.json(senatorsData, {
          headers: {
              'Access-Control-Allow-Origin': '*',  
              'Access-Control-Allow-Methods': 'GET, POST',
              'Access-Control-Allow-Headers': 'Content-Type',
          },
          });;
    } catch (error) {
      console.error('Error fetching senators data:', error);
      return NextResponse.json({ error: 'Failed to fetch senators data' }, { status: 500 });
    }
  }
