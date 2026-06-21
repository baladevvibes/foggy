import About from "./components/About";
import Attractions from "./components/Attractions";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar/>

      <main className="pt-20">
       <Hero/>
       <About/>
       <Gallery/>
       <Attractions/>
       <Testimonials/>
       <Contact/>
       <Footer/>
      </main>
    </>
  );
}