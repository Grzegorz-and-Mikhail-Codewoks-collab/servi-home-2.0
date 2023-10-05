import Footer from "../components/Footer";
import Service from "../components/Services";
import Principal from "../components/Principal";


export default function Home() : JSX.Element {

  return (
    <div className="bg-zinc-500">
      <Principal />
      <Service />
      <Footer />
    </div>
  );
}