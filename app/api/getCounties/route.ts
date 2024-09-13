import { NextResponse } from 'next/server';


const STATE_FIPS_CODES: Record<string, string> = {
    'Alabama': '01',
    'Alaska': '02',
    'Arizona': '04',
    'Arkansas': '05',
    'California': '06',
    'Colorado': '08',
    'Connecticut': '09',
    'Delaware': '10',
    'Florida': '12',
    'Georgia': '13',
    'Hawaii': '15',
    'Idaho': '16',
    'Illinois': '17',
    'Indiana': '18',
    'Iowa': '19',
    'Kansas': '20',
    'Kentucky': '21',
    'Louisiana': '22',
    'Maine': '23',
    'Maryland': '24',
    'Massachusetts': '25',
    'Michigan': '26',
    'Minnesota': '27',
    'Mississippi': '28',
    'Missouri': '29',
    'Montana': '30',
    'Nebraska': '31',
    'Nevada': '32',
    'New Hampshire': '33',
    'New Jersey': '34',
    'New Mexico': '35',
    'New York': '36',
    'North Carolina': '37',
    'North Dakota': '38',
    'Ohio': '39',
    'Oklahoma': '40',
    'Oregon': '41',
    'Pennsylvania': '42',
    'Rhode Island': '44',
    'South Carolina': '45',
    'South Dakota': '46',
    'Tennessee': '47',
    'Texas': '48',
    'Utah': '49',
    'Vermont': '50',
    'Virginia': '51',
    'Washington': '53',
    'West Virginia': '54',
    'Wisconsin': '55',
    'Wyoming': '56'
  };  

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stateName = searchParams.get('state');
  
  if (!stateName || !STATE_FIPS_CODES[stateName]) {
    return NextResponse.json({ error: 'Valid state is required' }, { status: 400 });
  }

  const stateFipsCode = STATE_FIPS_CODES[stateName];

  try {
    const response = await fetch(`https://api.census.gov/data/2023/geoinfo?get=NAME&for=county:*&in=state:${stateFipsCode}&key=${process.env.CENSUS_API_KEY}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from Census API');
    }
    
    const data = await response.json();

    const counties = data.slice(1).map((item: any) => ({
      name: item[0],
      stateCode: item[1],
      countyCode: item[2],
    }));
    
    return NextResponse.json({ counties });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
