import Header from "./header";
import What from "./what";
import Who from "./who";
import Navbar from "./navbar";
import NavbarTwo from "./navbar-two";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarTwo/>
      <Header />
      <What />
      <Who />
    </main>
  );
}
