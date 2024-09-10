import Header from "./header";
import What from "./what";
import Who from "./who";
import Navbar from "./navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <Header />
      <What />
      <Who />
    </main>
  );
}
