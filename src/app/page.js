import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Agenda } from "@/components/sections/agenda";
import { Gallery } from "@/components/sections/gallery";
import { Mentors } from "@/components/sections/pemateri";
import { Testimonials } from "@/components/sections/testimonials";
import { Sponsors } from "@/components/sections/sponsors";
import { RegistrationForm } from "@/components/sections/registration-form";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { MobileCta } from "@/components/sections/mobile-cta";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      {/* <About /> */}
      <Agenda />
      <Gallery />
      <Mentors />
      {/* <Testimonials /> */}
      <Sponsors />
      <RegistrationForm />
      <FAQ />
      <Footer />
      <MobileCta />
    </main>
  );
}
