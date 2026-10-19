import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ComplexMap } from "@/components/complex/ComplexMap";
import {
  designFigures,
  buildingDrawings,
  constructionEntries,
} from "@/lib/buildingData";

export const metadata: Metadata = {
  title: "The Building | Central Asian Museum, Leh",
  description:
    "The Central Asian Museum building in Leh: a Tibetan-Ladakhi fortress tower designed by André Alexander and built by hand by Ladakhi masons and carpenters from 2008.",
};

export default function BuildingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header variant="solid" />

      <main className="flex-1">
        {/* building.hero */}
        <section className="relative overflow-hidden border-b border-border-subtle bg-bg-secondary py-12 sm:py-16 md:py-18 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-palette-sand/40 blur-3xl"
          />
          <Container className="relative z-10">
            <div>
              <h1 className="font-heading text-[38px] font-medium leading-[1.1] tracking-[-0.01em] text-heading sm:text-[48px] md:text-[58px] lg:text-[66px]">
                A Tibetan-Ladakhi Fortress Tower with a Contemporary Edge
              </h1>
              <p className="mt-6 text-[16px] font-normal leading-relaxed text-body md:text-[18px]">
                Designed by André Alexander and built by hand by Ladakhi masons and carpenters, from local stone, timber and mud. The foundation stone was laid on 22 August 2008.
              </p>
            </div>
          </Container>
        </section>

        {/* building.design */}
        <section id="design" className="py-14 sm:py-16 md:py-18 lg:py-20">
          <Container>
            <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <SectionHeading
                  kicker="Design"
                  title="Conceived by André Alexander"
                />
                <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-body md:text-[16px]">
                  <p>
                    The final concept and design are the work of André Alexander of Tibet Heritage Fund (THF/LOTI), who drew on traditional Ladakhi and Tibetan building types. In April 2008, a student team from the Habitat Unit of the Berlin University of Technology and two participants of the ASA exchange programme came to Leh to contribute design ideas.
                  </p>
                  <p>
                    Local artisans shaped the building from the first sketches: master masons Lal Singh and Jamyang, carpenter Tsering Dorje and the Anjuman team, working with A. Catanese and S. Klein of THF/LOTI, N. Weber and B. Preller.
                  </p>
                  <p>
                    The museum takes the form of a Tibetan-Ladakhi fortress tower with a contemporary edge. Its square ground plan echoes ancient Buddhist, Hindu and Muslim places of worship, with an internal circumambulation, and each floor is encircled by a passage leading to the stairway to the next.
                  </p>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {designFigures.map((f, i) => (
                    <figure key={i} className="build-fig">
                      <img src={f.image} alt={f.alt} loading="lazy" />
                      <figcaption>{f.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <figure className="relative mx-auto w-full max-w-110 lg:max-w-none">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-3 rounded-md border border-palette-sand/60 bg-bg-secondary/50 sm:-inset-4"
                  />
                  <img
                    alt="The stone museum tower with its timber gallery and external stairway"
                    className="portrait-full relative block w-full rounded-[3px] border border-border shadow-lg"
                    loading="lazy"
                    src="/images/tower-exterior-stairs.webp"
                    width={1023}
                    height={1537}
                  />
                  <figcaption className="relative mt-4 flex items-center justify-between text-[12px] text-muted">
                    <span>The Museum Tower</span>
                    <span className="text-palette-amber font-medium">Exterior</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </Container>
        </section>

        {/* building.drawings */}
        <section id="drawings" className="border-t border-border-subtle bg-bg-secondary py-14 sm:py-16 md:py-18 lg:py-20">
          <Container>
            <SectionHeading
              kicker="Plans & Drawings"
              title="The Tower on Paper"
              align="center"
            />
            {/* V4-12: swipeable row on mobile (<768px), 3 cols on tablet/desktop */}
            <div className="mt-12 flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory -mx-6 px-6 scrollbar-none md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
              {buildingDrawings.map((d, i) => (
                <figure key={i} className="build-drawing flex-none w-[82%] snap-start md:w-auto">
                  <div className="build-drawing__sheet">
                    <img src={d.image} alt={d.alt} loading="lazy" />
                  </div>
                  <figcaption>{d.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>

        {/* building.materials — V4-6: Merged Materials, Craft & Details section */}
        <section id="materials" className="py-14 sm:py-16 md:py-18 lg:py-20">
          <Container>
            <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7 lg:col-start-6 lg:order-2">
                <SectionHeading
                  kicker="Materials, Craft & Details"
                  title="Every Stone Dressed by Hand"
                />
                <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-body md:text-[16px]">
                  <p>
                    Traditional Ladakhi construction materials of stone, timber and mud have been used. Everything is hand-made: each stone was individually dressed by masons on site, and every wood-carving was done on site.
                  </p>
                  <p>
                    The walls of the museum were built in solid stone masonry with mud mortar. The style of the masonry, individually faced stones embedded in layers of splinter stones, is the same as that found in Lhasa and in the remains of monuments of the Gandhara civilisation. The stones are local granite, quarried at Shey village, the old royal domain of Ladakh. The mortar is local mud mortar, a mix of soil, water and markalak clay.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4 border-l-2 border-palette-amber pl-5">
                  <p className="font-heading italic text-[18px] text-heading md:text-[20px]">
                    Tibetans say that the embedding, or &apos;braiding&apos;, of large stones into small stones gives a wall a certain flexibility that is good in case of tremors.
                  </p>
                </div>

                {/* Subheading: Windows, Gates and Inherited Elements */}
                <div className="mt-11 pt-10 border-t border-border">
                  <h3 className="font-heading text-[26px] font-medium leading-tight text-heading md:text-[30px]">
                    Windows, Gates and Inherited Elements
                  </h3>
                  <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-body md:text-[16px]">
                    <p>
                      The windows are designed to give the building a contemporary, modern outlook. They are tall and thin, unusual in the Ladakhi context, and placed asymmetrically on the facades. The main door is inspired by the gates of the large old houses in the old town of Leh, which in the past were home to wealthy and powerful families. The gate to the complex is inspired by the historic gate of the palace of Basti Ram, an administrator working for the Raja of Jammu in the late 19th century.
                    </p>
                    <p>
                      The floors are decked with slate stone, traditionally used for paving monastic courtyards. The ceilings are decked in traditional Ladakhi style with willow twigs. The roof is the typical Himalayan flat roof, decked with slate stone on top of the traditional mud layers to guarantee waterproofing.
                    </p>
                    <p>
                      Historic elements donated by local community members have been integrated throughout the building. These include three lintels carved with Buddhist and Islamic floral patterns, as well as two dozen historic windows, most of them in the style of Kashmiri tracery windows.
                    </p>
                    <p>
                      Visitors exit into the Tsas Soma Garden, an idyllic oasis in the centre of Leh, with ancient willow trees and a water channel.
                    </p>
                  </div>
                </div>
              </div>

              {/* Photo Column */}
              <div className="lg:col-span-4 lg:order-1">
                <div className="relative mx-auto w-full max-w-155 lg:max-w-none">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-3 rounded-md border border-palette-sand/60 bg-bg-secondary/50 sm:-inset-4"
                  />
                  <div className="relative aspect-3/4 w-full overflow-hidden rounded-[3px] border border-border shadow-lg">
                    <img
                      alt="A mason laying dressed stone on the Tibetan-style walls"
                      className="object-cover object-center"
                      loading="lazy"
                      src="/images/thf/tibetan-walls.webp"
                      style={{ position: "absolute", height: "100%", width: "100%", inset: 0 }}
                    />
                  </div>
                  <div className="relative mt-4 flex items-center justify-between text-[12px] text-muted">
                    <span>Tibetan-style stone walls under construction</span>
                    <span className="text-palette-amber font-medium">Masonry</span>
                  </div>
                </div>

                {/* Additional photos from former Details section */}
                <div className="mt-9 grid grid-cols-2 gap-4">
                  <figure className="build-fig">
                    <img
                      src="/images/thf/tower-windows.webp"
                      alt="The museum tower with its tall, thin, asymmetrically placed windows and a timber bay window"
                      loading="lazy"
                    />
                    <figcaption>Tall, thin windows placed asymmetrically</figcaption>
                  </figure>
                  <figure className="build-fig">
                    <img
                      src="/images/thf/shing-tsak.webp"
                      alt="Fixing the carved timber shing-tsak over the main entrance"
                      loading="lazy"
                    />
                    <figcaption>Fixing the shing-tsak over the entrance</figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* building.construction — V4-6: Takes the tinted background since #details and #floors are removed */}
        <section id="construction" className="border-t border-border-subtle bg-bg-secondary py-14 sm:py-16 md:py-18 lg:py-20">
          <Container>
            <SectionHeading
              kicker="Construction"
              title="Built by Hand"
              description="From the prayers at the foundation stone in August 2008: stone walls raised by Ladakhi masons, a carved entrance, and a timber frame assembled on site around the lantern at its heart."
            />
            <ol className="build-diary mt-12">
              {constructionEntries.map((e, i) => (
                <li key={i} className="build-diary__item">
                  <img src={e.image} alt={e.text} loading="lazy" />
                  <p className="build-diary__when">{e.label}</p>
                  <p className="build-diary__text">{e.text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* building.complex — V4-8 & V4-9 & V4-10: Around the Tower with interactive map */}
        <section id="complex" className="py-14 sm:py-16 md:py-18 lg:py-20">
          <Container>
            <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-16 items-start">
              {/* Left Column: Heading, Text & Button */}
              <div className="w-full lg:col-span-5 order-1 lg:order-1">
                <SectionHeading
                  kicker="The Complex"
                  title="Around the Tower"
                />

                {/* Mobile Map placement (between heading and text) */}
                <div className="mt-8 block lg:hidden order-2">
                  <ComplexMap isLinkOnly={true} />
                  <p className="mt-2 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                    Select a place on the map
                  </p>
                </div>

                <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-body md:text-[16px]">
                  <p>
                    The tower stands in Tsas Soma, the garden where trade caravans once camped. According to THF, the land was given to the local community for this purpose in the 17th century by King Jamyang Namgyal.
                  </p>
                  <p>
                    Around the museum, THF/LOTI built gates, a library, a kitchen museum and gardens, and renovated the old bakery next door. Solar panels installed in 2013 supply the complex with electricity.
                  </p>
                  <p>
                    At the heart of the complex is the Caravan Garden, with ancient willow trees and a stream crossed by two wooden bridges. Visitors leave the tower over an iron bridge and step down into it. In the garden stands the Masjid Sharif, Leh&apos;s oldest mosque, whose restoration in 2007 led to the idea of the museum.
                  </p>
                  <p>
                    The Trans-Himalayan Research Library, opened in 2011, holds books on the Himalayas and Central Asia. The Ladakhi Kitchen Museum, built in 2012–13, serves tea around a traditional clay stove, and the old bakery, renovated in 2014–15, now has a hall for conferences, talks and exhibitions.
                  </p>
                </div>

                <div className="mt-8">
                  <Button
                    href="/complex"
                    variant="primary"
                    icon="arrow-right"
                    size="lg"
                  >
                    Explore the Museum Complex
                  </Button>
                </div>
              </div>

              {/* Right Column: Interactive Map on Desktop (1024px+) */}
              <div className="hidden lg:block lg:col-span-7 w-full lg:order-2">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted mb-2">
                  Select a place on the map
                </p>
                <ComplexMap isLinkOnly={true} />
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
