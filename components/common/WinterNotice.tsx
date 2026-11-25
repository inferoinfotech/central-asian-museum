"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

const STORAGE_KEY = "cam-winter-notice-seen";
// Reopening day: 1 May 2027 at 00:00 India Standard Time (UTC+5:30)
const WINTER_ENDS = Date.parse("2027-05-01T00:00:00+05:30");

export function WinterNotice() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prevActiveElementRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setIsClosing(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      // ignore
    }
    if (prevActiveElementRef.current && typeof prevActiveElementRef.current.focus === "function") {
      prevActiveElementRef.current.focus();
    }
    setTimeout(() => {
      setShow(false);
      setIsClosing(false);
    }, 300);
  }, []);

  useEffect(() => {
    // End date check: from 1 May 2027 00:00 IST it stops showing
    if (Date.now() >= WINTER_ENDS) return;

    // Do not show on admin pages
    if (pathname?.startsWith("/admin")) return;

    // Show once per visit: if already dismissed in this session, do not show
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "dismissed") return;
    } catch {
      // ignore
    }

    prevActiveElementRef.current = document.activeElement as HTMLElement | null;
    setShow(true);
  }, [pathname]);

  // Lock document scroll while notice is open
  useEffect(() => {
    if (show && !isClosing) {
      document.documentElement.setAttribute("data-wn-open", "");
      btnRef.current?.focus({ preventScroll: true });
      return () => {
        document.documentElement.removeAttribute("data-wn-open");
      };
    } else {
      document.documentElement.removeAttribute("data-wn-open");
    }
  }, [show, isClosing]);

  // Trap keyboard inside dialog and close on Escape
  useEffect(() => {
    if (!show || isClosing) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "Tab") {
        const focusable = [closeBtnRef.current, btnRef.current].filter(Boolean) as HTMLElement[];
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [show, isClosing, close]);

  if (!show) return null;

  return (
    <div
      className={`wn ${isClosing ? "is-closing" : ""}`}
      data-open=""
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          close();
        }
      }}
    >
      <div
        ref={cardRef}
        className="wn__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wn-title"
        aria-describedby="wn-text"
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="wn__close"
          aria-label="Close"
          onClick={close}
        >
          <Icon name="close" size={18} />
        </button>
        <h2 className="wn__title" id="wn-title">
          The museum is closed for winter
        </h2>
        <p className="wn__text" id="wn-text">
          For centuries, Silk Road caravans waited out the Ladakhi winter in Leh until
          the high passes opened again. We keep the same calendar: closed from November,
          back in May when the apricot trees blossom.
        </p>
        <Link
          ref={btnRef}
          href="/about"
          className="wn__btn"
          onClick={close}
        >
          Explore the museum in the meantime
        </Link>
      </div>
    </div>
  );
}
