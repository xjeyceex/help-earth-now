export default function Header() {
  const video_url = "https://www.youtube.com/embed/4ZmGmryMKI4?si=dFc6ZBnIF5N3-hS3";
  return (
    <div>

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
        <iframe className="col-span-2 row-span-2 exposition-video" src={video_url} ></iframe>
        <div className="row-span-2">
          <div className="exposition-warning p-12">
            It's bad and it's getting worse
          </div>
          <div className="exposition-link p-12">
            What can I do?
          </div>
        </div>
      </div>

    </div>
  );
}
