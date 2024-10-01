import Footer from "@/app/components/Footer";
import Link from "next/link";

export default function Who() {
	return (
    <>
      <div className="grid grid-cols-3 who-help" id='who'>

        {/* Senate */}
        <div className="flex items-center justify-center text-center who-help-1 p-4 md:p-8 row-span-2">
          President
        </div>
        <div className="col-span-2 who-1-1 p-4 md:p-8">
          Kamala Harris - Rating 76: <Link href='https://www.whitehouse.gov/briefing-room/speeches-remarks/2023/07/14/remarks-by-vice-president-harris-on-combatting-climate-change-and-building-a-clean-energy-economy/' className="underline" target="_blank"> Calls climate crisis an urgent issue and prom​oted the IRA - spending $20B to fight climate change </Link>
        </div>
        <div className="col-span-2 who-1-2 p-4 md:p-8">
          Donald Trump - Rating -82: <Link href='https://www.npr.org/2024/06/25/nx-s1-5006573/trump-election-2024-climate-change-fossil-fuels' className="underline" target="_blank"> Pulled U.S. out of the Paris Agreement and rolled back efforts to fight climate change </Link>
        </div>

        {/* Senate */}
        <div className="flex items-center justify-center text-center who-help-2 p-4 md:p-8 row-span-8">
          Senate
        </div>
        <div className="col-span-2 who-2-1 p-4 md:p-8">
          Debbie Mucarsel-Powell - Rating 52
        </div>
        <div className="col-span-2 who-2-2 p-4 md:p-8">
          Rick Scott - Rating 10
        </div>
        <div className="col-span-2 who-2-1 p-4 md:p-8">
          Catherine Cortez Masto - Rating 12
        </div>
        <div className="col-span-2 who-2-2 p-4 md:p-8">
          Joe Manchin - Rating 10
        </div>
        <div className="col-span-2 who-2-1 p-4 md:p-8">
          Sherrod Brown - Rating 24
        </div>
        <div className="col-span-2 who-2-2 p-4 md:p-8">
          Jon Tester - Rating -12
        </div>
        <div className="col-span-2 who-2-1 p-4 md:p-8">
          Tammy Baldwin - Rating 65
        </div>
        <div className="col-span-2 who-2-2 p-4 md:p-8">
          Debbie Mucarsel-Powell - Rating -23
        </div>

        {/* House of Representative */}
        <div className="flex items-center justify-center text-center who-help-3 p-4 md:p-8 row-span-1">
          House of Representatives
        </div>
        <div className="col-span-2 who-3-1 p-4 md:p-8">
          Gay Valimont - Rating 96
        </div>
      </div>
      <Footer/>
    </>
	);
  }
  