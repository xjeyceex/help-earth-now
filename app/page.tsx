import Header from "./header";
import What from "./what";
import Who from "./who";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <What />
      <Who />
    </main>
  );
}
