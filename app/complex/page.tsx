import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ComplexExplorer } from "@/components/complex/ComplexExplorer";

export const metadata: Metadata = {
  title: "Museum Complex | Central Asian Museum, Leh",
  description:
    "The Central Asian Museum complex in Tsas Soma, Leh: Museum Tower, Trans-Himalayan Research Library, Ladakhi Kitchen Museum, Conference Hall, Tsas Soma Mosque and Caravan Garden.",
};

export default function MuseumComplexPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header variant="solid" />

      <main className="flex-1">
        {/* Complex Hero */}
        <section className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary py-12 sm:py-16 md:py-18 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-palette-sand/40 blur-3xl"
          />
          <Container className="relative z-10">
            <div>
              <h1 className="font-heading text-[38px] font-medium leading-[1.1] tracking-[-0.01em] text-heading sm:text-[48px] md:text-[58px] lg:text-[66px]">
                The Museum Complex in Tsas Soma
              </h1>
              <p className="mt-6 text-[16px] font-normal leading-relaxed text-body md:text-[18px]">
                The tower stands in Tsas Soma, the garden where trade caravans once camped. According to THF, the land was given to the local community for this purpose in the 17th century by King Jamyang Namgyal. Around the museum, THF/LOTI built gates, a library, a kitchen museum and gardens, and renovated the old bakery next door. Solar panels installed in 2013 supply the complex with electricity.
              </p>
            </div>
          </Container>
        </section>

        {/* Interactive Complex Map & Exploration Section */}
        <section id="complex" className="py-14 sm:py-16 md:py-18 lg:py-20">
          <Container>
            <ComplexExplorer />
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
