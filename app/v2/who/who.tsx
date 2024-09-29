import Footer from "@/app/components/Footer";
import Link from "next/link";

export default function Who() {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 text-gray-800" id='who'>
      
        {/* President Section */}
        <div className="col-span-3 text-2xl font-bold text-center py-4 border-b border-gray-300">
          President
        </div>
        <div className="col-span-1 flex items-center justify-center text-center bg-blue-200 p-4 rounded-lg">
          Kamala Harris - Rating 76
        </div>
        <div className="col-span-2 bg-white p-4 rounded-lg shadow">
          <Link 
          href="https://www.whitehouse.gov/briefing-room/speeches-remarks/2023/07/14/remarks-by-vice-president-harris-on-combatting-climate-change-and-building-a-clean-energy-economy/"
          className="underline text-blue-600" 
          target="_blank">
          Calls climate crisis an urgent issue and promoted the IRA - spending $20B to fight climate change
          </Link>
        </div>
        <div className="col-span-1 flex items-center justify-center text-center bg-red-200 p-4 rounded-lg">
          Donald Trump - Rating -82
        </div>
        <div className="col-span-2 bg-white p-4 rounded-lg shadow">
          <Link 
          href="https://www.npr.org/2024/06/25/nx-s1-5006573/trump-election-2024-climate-change-fossil-fuels"
          className="underline text-blue-600"
          target="_blank">
          Pulled U.S. out of the Paris Agreement and rolled back efforts to fight climate change
          </Link>
        </div>

        {/* Senate Section */}
        <div className="col-span-3 text-2xl font-bold text-center py-4 border-t border-b border-gray-300">
          Senate
        </div>
        {[
          { name: "Debbie Mucarsel-Powell", rating: 52 },
          { name: "Rick Scott", rating: 10 },
          { name: "Catherine Cortez Masto", rating: 12 },
          { name: "Joe Manchin", rating: 10 },
          { name: "Sherrod Brown", rating: 24 },
          { name: "Jon Tester", rating: -12 },
          { name: "Tammy Baldwin", rating: 65 },
          { name: "Debbie Mucarsel-Powell", rating: -23 }
        ].map((senator, index) => (
          <div key={index} className={`col-span-1 ${index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100'} p-4 rounded-lg`}>
          {senator.name} - Rating {senator.rating}
          </div>
        ))}

        {/* House of Representatives */}
        <div className="col-span-3 text-2xl font-bold text-center py-4 border-t border-gray-300">
          House of Representatives
        </div>
        <div className="col-span-1 flex items-center justify-center text-center bg-green-200 p-4 rounded-lg">
          Gay Valimont - Rating 96
        </div>
      </div>
      <Footer/>
    </>
  );
}
