'use client';
import Link from "next/link";
import { useParams } from "next/navigation";

export default function What() {
    const params = useParams()
    const state = params.states
    console.log(state)

    return (
        <>
            <div className="grid grid-cols-3 how-help w-full">
                <div className="flex text-center questions-1 p-12 items-center">
                    What can I do for free?
                </div>
                <div className="col-span-2 answer-1 p-12">
                    Raise your thermostat. Will you feel a degree? 
                    <br />
                    <Link href={`${state}/who`} className="underline">Vote for people who care</Link>
                    <br />
                    Burn less: fewer fires, drive less
                </div>
                <div className=" flex items-center text-center questions-2 p-12">
                    What if I can spend a little?
                </div>
                <div className="col-span-2 answer-2 p-12">
                    Insulate your doors better
                    <br />
                    Support our efforts, or others like us
                </div>
                <div className="flex items-center text-center questions-3 p-12">
                    What if I can spend more?
                </div>
                <div className="col-span-2 answer-3 p-12">
                    Install solar cells <br />
                    Change appliances from gas to electricity <br />
                    Upgrade to energy efficient windows
                </div>
            </div>
        </>
    );
}
