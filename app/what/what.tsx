import Link from "next/link";

export default function What() {
	return (

		<div className="grid grid-cols-3 how-help">
			<div className="text-center questions-1 p-12">
				What can I do for free?
			</div>
			<div className="col-span-2 answer-1 p-12">
				Raise your thermostat.  Will you feel a degree? {' '} 
				<Link href='/who' className="underline">Vote for people who care</Link>
				<br/>
				Burn less: fewer fires, drive less
			</div>
			<div className="text-center questions-2 p-12">
				What if I can spend a little?
			</div>
			<div className="col-span-2 answer-2 p-12">
				Insulate your doors better
				<br/>
				Support our efforts, or others like us
			</div>
			<div className="text-center questions-3 p-12">
				What if I can spend more?
			</div>
			<div className="col-span-2 answer-3 p-12">
				Install solar cells <br/>
				Change appliences from gas to electricity <br/>
				Upgrade to energy efficient windows
			</div>
		</div>
	);
}
