"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function CursorRing() {
  const pathname = usePathname();
  const ringRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // Disable on admin or outbox pages, or on touch/coarse pointers
    if (/^\/(admin|outbox)(\/|$)/.test(pathname || "")) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const ring = ringRef.current;
    const prog = progRef.current;
    const arc = circleRef.current;
    if (!ring || !prog || !arc) return;

    const R = 20;
    const C = 2 * Math.PI * R;
    const both = [ring, prog];
    const set = (cls: string, on: boolean) => {
      both.forEach((el) => el.classList.toggle(cls, !!on));
    };

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let seen = false;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const place = () => {
      const t = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
      ring.style.translate = t;
      prog.style.translate = t;
    };

    const tick = () => {
      raf = 0;
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      if (Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1) {
        x = tx;
        y = ty;
      }
      place();
      if (x !== tx || y !== ty) raf = requestAnimationFrame(tick);
    };

    const onMouseMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!seen || still) {
        seen = true;
        x = tx;
        y = ty;
        place();
        set("is-on", true);
      } else if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    };

    const hide = () => {
      set("is-on", false);
      seen = false;
    };

    const onMouseOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || !t.closest) return;
      if (t.tagName === "IFRAME") return hide();

      const isLink = !!t.closest(
        'a, button, [role="button"], summary, label, select, input[type="submit"], input[type="button"], input[type="checkbox"], input[type="radio"]'
      );
      const isText = !!t.closest(
        'textarea, input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"])'
      );

      set("is-link", isLink);
      set("is-text", isText);
    };

    const onMouseDown = () => set("is-down", true);
    const onMouseUp = () => set("is-down", false);

    const progress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      arc.setAttribute("stroke-dashoffset", (C * (1 - p)).toFixed(2));
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    window.addEventListener("scroll", progress, { passive: true });
    window.addEventListener("resize", progress);

    let ro: ResizeObserver | null = null;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(progress);
      ro.observe(document.body);
    }

    progress();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
      document.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("scroll", progress);
      window.removeEventListener("resize", progress);
      if (ro) ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <>
      <div ref={ringRef} className="cur-ring" aria-hidden="true" />
      <div ref={progRef} className="cur-prog" aria-hidden="true">
        <svg viewBox="0 0 44 44">
          <circle
            ref={circleRef}
            cx="22"
            cy="22"
            r="20"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={(2 * Math.PI * 20).toFixed(2)}
            strokeDashoffset={(2 * Math.PI * 20).toFixed(2)}
          />
        </svg>
      </div>
    </>
  );
}
