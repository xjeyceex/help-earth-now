import Header from "./v3/header";
import What from "./v3/what/what";
import NavbarThree from "./v3/navbar-v3";
import CookieConsent from "./components/CookieConsent";
import Footer from "./components/Footer";
import { getSheetsData } from './readSheet'

export default async function Home() {

  const data = await getSheetsData()
  console.log('data',data)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarThree/>
      <Header />
      <What />
      <CookieConsent/>
      <Footer/>
    </main>
  );
}
