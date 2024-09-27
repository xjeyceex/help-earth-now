export default function Header() {
  const video_url = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <div className="w-full">
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

      <div className="grid grid-cols-1 md:grid-cols-3 exposition ">
        <iframe 
          className="col-span-2 w-full h-40 md:h-auto md:min-h-[300px] aspect-video md:aspect-auto exposition-video"
          src={video_url}
          allowFullScreen
        ></iframe>

        <div className="flex flex-col h-full">
          <div className="exposition-warning p-6 text-xl md:text-2xl bg-yellow-400 text-white flex-grow">
            It&apos;s bad and it&apos;s getting worse
          </div>
          <div className="exposition-link p-6 text-xl md:text-2xl bg-green-400 text-white flex-grow">
            What can I do?
          </div>
        </div>
      </div>
    </div>
  );
}
