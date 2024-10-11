import Link from "next/link";
export default function What() {

    return (
        <>
            <div className="grid grid-cols-11 how-help w-full" id='what'>
                <div className="flex items-center col-span-3 text-center questions-1 p-12">
                    What can I do for free?
                </div>
                <div className="col-span-8 answer-1 p-12">
                    Share this site with others
                    <br />
                    <Link href='/who' className="text-blue-500 underline hover:text-blue-700">
                        Vote for people who care &rarr;
                    </Link>                    <br />
                    Burn less: fewer fires, drive less
                </div>

                <div className="flex items-center col-span-3 text-center questions-2 p-12">
                    What if I can spend a little?
                </div>
                <div className="flex items-center col-span-8 answer-2 p-12">
                    Insulate your doors & windows better
                </div>

                <div className="flex items-center col-span-3 text-center questions-3 p-12">
                    What if I can spend more?
                </div>
                <div className="col-span-8 answer-3 p-12">
                    Install solar cells <br />
                    Change appliances from gas to electricity <br />
                    Upgrade to energy efficient windows
                </div>
            </div>
        </>
    );
}
