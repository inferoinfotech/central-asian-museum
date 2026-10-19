import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header variant="solid" />
      <main className="flex-1">
        <section className="ui-404">
          <div className="ui-404__in">
            <p className="ui-404__code">Error 404</p>
            <h1 className="font-heading">We can’t find that page</h1>
            <p className="ui-404__lead">
              The page may have moved, or the address may have been mistyped. Nothing is lost: the museum is one step away.
            </p>
            <div className="ui-404__actions">
              <Link className="ui-404__btn ui-404__btn--main" href="/">
                Back to the home page
              </Link>
              <Link className="ui-404__btn ui-404__btn--alt" href="/contact">
                Plan your visit
              </Link>
            </div>
            <div className="ui-404__more">
              <p>Or go straight to</p>
              <ul>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/about/building">The Building</Link>
                </li>
                <li>
                  <Link href="/collections">Collections</Link>
                </li>
                <li>
                  <Link href="/news-events">News &amp; Events</Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
