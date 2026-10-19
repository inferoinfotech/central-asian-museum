"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ComplexMap } from "@/components/complex/ComplexMap";
import {
  complexPlaces,
  alsoInComplexCards,
  type ComplexPlace,
} from "@/lib/complexData";

export function ComplexExplorer() {
  const [currentSlug, setCurrentSlug] = useState<string>("tower");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [showMobileStrip, setShowMobileStrip] = useState<boolean>(false);

  const articleRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  // Sync hash on mount and hashchange
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && complexPlaces.some((p) => p.slug === hash)) {
        setCurrentSlug(hash);
        setActivePhotoIndex(0);
        // On mobile, scroll to text if hash was set
        if (window.innerWidth < 768 && articleRef.current) {
          setTimeout(() => {
            articleRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  // Track scroll position to show mobile strip once map scrolls past
  useEffect(() => {
    const handleScroll = () => {
      if (!exploreRef.current || !articleRef.current) return;
      const header = document.querySelector("header");
      const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
      const articleTop = articleRef.current.getBoundingClientRect().top;
      const exploreBottom = exploreRef.current.getBoundingClientRect().bottom;
      const stripHeight = stripRef.current ? stripRef.current.offsetHeight : 44;

      const shouldShow =
        articleTop < headerBottom + stripHeight + 28 &&
        exploreBottom > headerBottom + 140;

      setShowMobileStrip(shouldShow);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const selectPlace = (slug: string, scrollOnMobile = true) => {
    if (slug === currentSlug) return;
    setCurrentSlug(slug);
    setActivePhotoIndex(0);
    window.history.replaceState(null, "", `#${slug}`);

    if (scrollOnMobile && window.innerWidth < 768 && articleRef.current) {
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 60;
      const stripHeight = stripRef.current ? stripRef.current.offsetHeight : 44;
      const top =
        articleRef.current.getBoundingClientRect().top +
        window.scrollY -
        (headerHeight + stripHeight + 20);

      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  };

  const currentPlace: ComplexPlace =
    complexPlaces.find((p) => p.slug === currentSlug) || complexPlaces[0];

  const currentPhoto =
    currentPlace.photos[activePhotoIndex] || currentPlace.photos[0];

  return (
    <div>
      {/* Mobile Sticky Place Strip under Header (V4-5) */}
      <div
        ref={stripRef}
        className={`cx-strip ${showMobileStrip ? "is-visible" : ""}`}
        role="group"
        aria-label="Places in the complex"
      >
        {complexPlaces.map((pl) => {
          const isOn = pl.slug === currentSlug;
          return (
            <button
              key={pl.slug}
              type="button"
              className={isOn ? "is-on" : ""}
              style={{ ["--c" as string]: pl.map.c }}
              onClick={() => selectPlace(pl.slug, true)}
              aria-pressed={isOn ? "true" : "false"}
            >
              <i style={{ backgroundColor: isOn ? "#fff" : pl.map.c }} />
              <span>{pl.map.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Exploration Grid */}
      <div ref={exploreRef} className="cx-explore">
        {/* Flow: Map + Article */}
        <div className="cx-flow">
          <div className="cx-map-wrapper">
            <p className="cx-label">Select a place on the map</p>
            <ComplexMap
              selectedSlug={currentSlug}
              onSelectPlace={(slug) => selectPlace(slug, true)}
            />
          </div>

          <div
            ref={articleRef}
            className="cx-article"
            aria-live="polite"
          >
            <div key={currentPlace.slug} className="cx-anim">
              <h2 className="cx-title font-heading">{currentPlace.title}</h2>
              <div className="cx-text">
                {currentPlace.text.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              {currentPlace.more && (
                <div className="mt-6">
                  <Link href={currentPlace.more.href} className="cx-more">
                    <span>{currentPlace.more.label}</span>
                    <Icon name="arrow-right" size={16} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gallery Side Column */}
        <div className="cx-side">
          <div key={currentPlace.slug} className="cx-gallery cx-anim">
            {currentPhoto ? (
              <figure className="cx-main">
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  loading="lazy"
                  className="rounded-[3px] border border-border"
                />
                {currentPhoto.cap && (
                  <figcaption className="mt-2.5 text-[12px] text-muted">
                    {currentPhoto.cap}
                  </figcaption>
                )}
              </figure>
            ) : (
              <div className="cx-main cx-main--empty">
                <span>Photo to come</span>
              </div>
            )}

            {/* Thumbnail Strip */}
            <div className="cx-thumbs">
              {currentPlace.photos.map((photo, k) => (
                <button
                  key={k}
                  type="button"
                  className={`cx-thumb ${k === activePhotoIndex ? "is-on" : ""}`}
                  onClick={() => setActivePhotoIndex(k)}
                  aria-label={`Photo ${k + 1} of ${currentPlace.title}`}
                >
                  <img src={photo.src} alt="" loading="lazy" />
                </button>
              ))}
              {Array.from({ length: Math.max(0, 4 - currentPlace.photos.length) }).map(
                (_, idx) => (
                  <span
                    key={`empty-${idx}`}
                    className="cx-thumb cx-thumb--empty"
                    aria-hidden="true"
                  >
                    <span>Photo to come</span>
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* "Also in the Complex" Section */}
      <div className="mt-16 sm:mt-20 border-t border-border pt-10 sm:pt-14">
        <h2 className="font-heading text-[28px] sm:text-[34px] md:text-[38px] font-medium text-heading">
          Also in the Complex
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {alsoInComplexCards.map((card, idx) => (
            <figure key={idx} className="build-card group">
              <div className="build-card__img aspect-4/3 overflow-hidden rounded-[3px] border border-border shadow-sm">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-4">
                <h3 className="font-heading text-[22px] font-medium text-heading">
                  {card.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-body">
                  {card.text}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
