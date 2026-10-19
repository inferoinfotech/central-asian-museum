"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";
import { mainNavItems, type NavItem } from "@/lib/navigation";
import { Icon } from "@/components/ui/Icon";
import { useHasExhibitions } from "@/lib/useHasExhibitions";

type HeaderProps = {
  items?: NavItem[];
  brandLabel?: string;
  brandHref?: string;
  logoSrc?: string;
  variant?: "transparent" | "solid";
  hasExhibitions?: boolean;
};

export function Header({
  items,
  brandLabel = "Central Asian Museum",
  brandHref = "/",
  logoSrc = "/images/logo/cam-logo-dark.webp",
  variant = "transparent",
  hasExhibitions: propHasExhibitions,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isSolid = variant === "solid";

  const hasExhibitions = useHasExhibitions(propHasExhibitions);
  const navItems = useMemo(() => {
    const base = items || mainNavItems;
    if (hasExhibitions) return base;
    return base.filter((it) => it.href !== "/exhibitions");
  }, [items, hasExhibitions]);

  const headerRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let compact = false;
    let away = false;
    const root = document.documentElement;

    const update = () => {
      // Progress bar fill
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      }

      // Compact header (logo and padding shrink once scrolled)
      const y = window.scrollY;
      if (!compact && y > 140) {
        compact = true;
        root.setAttribute("data-ui-scrolled", "");
      } else if (compact && y < 30) {
        compact = false;
        root.removeAttribute("data-ui-scrolled");
      }

      // Header yields to footer on sticky pages
      if (isSolid) {
        const headerEl = headerRef.current;
        const footerEl = document.querySelector("footer");
        if (headerEl && footerEl) {
          const gap = footerEl.getBoundingClientRect().top - headerEl.offsetHeight;
          if (!away && gap < 24) {
            away = true;
            root.setAttribute("data-header-away", "");
          } else if (away && gap > 72) {
            away = false;
            root.removeAttribute("data-header-away");
          }
        }
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(update);
      ro.observe(document.body);
    }

    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (ro) ro.disconnect();
      root.removeAttribute("data-ui-scrolled");
      root.removeAttribute("data-header-away");
    };
  }, [isSolid, pathname]);

  return (
    <header
      ref={headerRef}
      className={`z-50 w-full transition-colors duration-300 ${
        isSolid
          ? "sticky top-0 bg-surface-dark text-white shadow-md"
          : `${open ? "bg-surface-dark lg:bg-transparent shadow-md" : "bg-transparent"} absolute inset-x-0 top-0 text-white`
      }`}
    >
      <div className={`pg-bar ${!isSolid ? "pg-bar--top" : ""}`} aria-hidden="true">
        <i ref={fillRef} />
      </div>
      <div className="header-inner mx-auto flex max-w-360 items-center justify-between gap-6 px-6 py-4 md:px-10 lg:px-14 lg:py-5">
        <Link
          href={brandHref}
          className="inline-flex items-center shrink-0 transition-opacity hover:opacity-90"
          aria-label={`${brandLabel}: home`}
        >
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={brandLabel}
              width={104}
              height={101}
              priority
              className="header-logo h-auto w-16 md:w-20 lg:w-26 object-contain transition-transform duration-200"
            />
          ) : (
            <span className="font-heading text-[22px] font-medium tracking-[0.02em] text-white md:text-[26px]">
              {brandLabel}
            </span>
          )}
        </Link>

        <nav className="header-nav hidden items-center gap-4 xl:gap-7 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && item.href !== "/about" && pathname?.startsWith(item.href + "/"));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`header-nav__link relative text-[16px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 py-1 whitespace-nowrap ${
                  isActive
                    ? "text-white after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-palette-amber"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-white/80 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-surface-dark px-6 py-6 lg:hidden">
          <nav className="mx-auto flex max-w-360 flex-col gap-2" aria-label="Mobile">
            {navItems.map((item) => {
              const isActive =
              pathname === item.href ||
              (item.href !== "/" && item.href !== "/about" && pathname?.startsWith(item.href + "/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`py-3 text-[15px] font-bold uppercase tracking-[0.12em] transition-colors ${
                    isActive
                      ? "text-palette-amber border-l-2 border-palette-amber pl-3"
                      : "text-white/90 hover:text-white"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
