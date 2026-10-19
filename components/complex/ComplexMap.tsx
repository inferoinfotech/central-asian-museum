"use client";

import { useMemo, useState } from "react";
import {
  complexPlaces,
  complexOutlinePoints,
  generateCatmullRomOutline,
  MAP_VIEW_BOX,
  type ComplexPlace,
} from "@/lib/complexData";

interface ComplexMapProps {
  selectedSlug?: string;
  onSelectPlace?: (slug: string) => void;
  className?: string;
  isLinkOnly?: boolean; // When rendered on /about/building, clicking links to /complex#slug
}

export function ComplexMap({
  selectedSlug,
  onSelectPlace,
  className = "",
  isLinkOnly = false,
}: ComplexMapProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const outlineD = useMemo(
    () => generateCatmullRomOutline(complexOutlinePoints),
    []
  );

  const holes = useMemo(() => {
    return complexPlaces
      .map((pl) => (pl.map.area ? "M" + pl.map.area.split(" ").join("L") + "Z" : ""))
      .join("");
  }, []);

  const handlePlaceClick = (slug: string) => {
    if (isLinkOnly) {
      window.location.href = `/complex#${slug}`;
    } else if (onSelectPlace) {
      onSelectPlace(slug);
    }
  };

  const [vx, vy, vw, vh] = MAP_VIEW_BOX;

  return (
    <div className={`cx-map ${hoveredSlug ? "has-hot" : ""} ${className}`}>
      <div className="cx-map__stage">
        <svg
          viewBox={`${vx} ${vy} ${vw} ${vh}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Paper ground */}
          <rect
            className="cx-map__paper"
            x={vx}
            y={vy}
            width={vw}
            height={vh}
            fill="var(--museum-bg-secondary)"
          />

          {/* Hand-drawn plan base image */}
          <image
            className="cx-map__plan"
            href="/images/complex/complex-plan-draft.svg"
            x={vx}
            y={vy}
            width={vw}
            height={vh}
          />

          {/* Place Areas (Polygons & Ground) */}
          <g className="cx-areas">
            {complexPlaces.map((pl) => {
              const isHot = hoveredSlug === pl.slug;
              const isOn = selectedSlug === pl.slug;
              const slug = pl.slug;

              if (pl.map.ground) {
                return (
                  <path
                    key={slug}
                    className={`cx-area cx-area--ground ${isHot ? "is-hot" : ""} ${
                      isOn ? "is-on" : ""
                    }`}
                    style={{ ["--c" as string]: pl.map.c }}
                    data-cx-slug={slug}
                    fillRule="evenodd"
                    d={outlineD + holes}
                    onClick={() => handlePlaceClick(slug)}
                    onMouseEnter={() => setHoveredSlug(slug)}
                    onMouseLeave={() => setHoveredSlug(null)}
                    onFocus={() => setHoveredSlug(slug)}
                    onBlur={() => setHoveredSlug(null)}
                  />
                );
              }

              return (
                <polygon
                  key={slug}
                  className={`cx-area ${isHot ? "is-hot" : ""} ${
                    isOn ? "is-on" : ""
                  }`}
                  style={{ ["--c" as string]: pl.map.c }}
                  data-cx-slug={slug}
                  points={pl.map.area}
                  onClick={() => handlePlaceClick(slug)}
                  onMouseEnter={() => setHoveredSlug(slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  onFocus={() => setHoveredSlug(slug)}
                  onBlur={() => setHoveredSlug(null)}
                />
              );
            })}
          </g>

          {/* Orientation Cues */}
          <g className="cx-cues" pointerEvents="none">
            <text
              transform="translate(922 560) rotate(90)"
              textAnchor="middle"
              fontSize="31"
              letterSpacing="5"
              fontFamily="inherit"
              fontWeight="700"
            >
              OLD TOWN ↑
            </text>
            <g>
              <text
                x="432"
                y="36"
                textAnchor="middle"
                fontSize="25"
                letterSpacing="2"
                fontFamily="inherit"
                fontWeight="700"
              >
                KASHMIR GATE
              </text>
              <text
                x="524"
                y="226"
                textAnchor="end"
                fontSize="24"
                fontFamily="inherit"
                fontWeight="700"
              >
                stream
              </text>
              <text
                x="360"
                y="662"
                fontSize="24"
                fontFamily="inherit"
                fontWeight="700"
              >
                iron bridge
              </text>
            </g>
            <text
              x="505"
              y="1081"
              textAnchor="middle"
              fontSize="31"
              letterSpacing="5"
              fontFamily="inherit"
              fontWeight="700"
            >
              ↓ MAIN BAZAAR
            </text>

            <g className="cx-cues__gate">
              <circle className="cx-cues__pulse" cx="505" cy="938" r="30" />
              <circle cx="505" cy="938" r="30" />
              <circle cx="505" cy="938" r="9" className="cx-cues__dot" />
              <text
                x="505"
                y="1040"
                textAnchor="middle"
                fontSize="29"
                letterSpacing="2.5"
                fontFamily="inherit"
                fontWeight="700"
              >
                MAIN ENTRANCE
              </text>
            </g>

            <g className="cx-cues__north" transform="translate(900 62)">
              <circle r="34" />
              <path d="M0 -24L11 12 0 5 -11 12Z" />
              <text
                y="-42"
                textAnchor="middle"
                fontSize="27"
                fontFamily="inherit"
                fontWeight="700"
              >
                N
              </text>
            </g>
          </g>
        </svg>

        {/* Place Buttons / Name Plates */}
        {complexPlaces.map((pl) => {
          const isHot = hoveredSlug === pl.slug;
          const isOn = selectedSlug === pl.slug;
          const leftPercent = (((pl.map.pin[0] - vx) / vw) * 100).toFixed(2);
          const topPercent = (((pl.map.pin[1] - vy) / vh) * 100).toFixed(2);

          return (
            <button
              key={pl.slug}
              type="button"
              className={`cx-pin ${isHot ? "is-hot" : ""} ${isOn ? "is-on" : ""}`}
              style={{
                ["--c" as string]: pl.map.c,
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
              }}
              data-cx-slug={pl.slug}
              aria-label={pl.title}
              aria-pressed={isOn ? "true" : "false"}
              onClick={() => handlePlaceClick(pl.slug)}
              onMouseEnter={() => setHoveredSlug(pl.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              onFocus={() => setHoveredSlug(pl.slug)}
              onBlur={() => setHoveredSlug(null)}
            >
              {pl.map.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
