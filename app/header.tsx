export default function Header() {
  const video_url = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <div className='w-full'>
      <div className="grid grid-cols-3 premise">
        <div className="title col-span-2 text-center p-12">
          Climate change is hurting us all - now
        </div>
        <div className="care-about p-3">
          Do you care about:
          <ul className="care-about-list list-disc list-inside">
            <li>More and larger hurricanes?</li>
            <li>Increasing insurance rates?</li>
            <li>More and deeper floods?</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-3 exposition">
        <iframe className="col-span-2 row-span-2 exposition-video" src={video_url}></iframe>
        <div className="row-span-2">
          <div className="exposition-warning p-12">
            It&apos;s bad and it&apos;s getting worse
          </div>
          <div className="exposition-link p-12">
            What can I do?
          </div>
        </div>
      </div>
    </div>
  );
}
