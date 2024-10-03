import Link from "next/link";

export default function Header() {
  const video_url = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <div className="w-full" id="home">
      <div className="grid grid-cols-1 md:grid-cols-3 premise">
        <div className="title col-span-2 text-center p-4 md:p-10 text-lg md:text-3xl leading-tight md:leading-normal">
          Climate change is hurting us all - now
        </div>

        <div className="care-about p-4 md:p-6 text-lg md:text-2xl">
          Do you care about:
          <ul className="care-about-list list-disc list-inside space-y-3 text-base md:text-xl leading-relaxed mt-4">
            <li>More and larger hurricanes?</li>
            <li>Increasing insurance rates?</li>
            <li>More and deeper floods?</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        <video
          className="col-span-2 w-full aspect-video"
          src={video_url}
          autoPlay
          muted
          loop
          playsInline
          controls
        >
          Your browser does not support the video tag.
        </video>

        <div className="flex flex-col h-full justify-center items-center">
          <div className="exposition-warning p-6 text-xl md:text-2xl bg-yellow-400 text-white h-full w-full text-center">
            It&apos;s bad and it&apos;s getting worse, and we need to fight it-now
          </div>
          <div className="exposition-link p-6 text-xl md:text-2xl bg-green-400 text-white h-full w-full text-center">
            <Link href='/v3/what' className="underline">What can I do?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
