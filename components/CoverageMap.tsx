"use client";

import { useEffect, useRef, useState } from "react";
import { states } from "@/lib/content";

// Leaflet map of service areas per state (circle size ~ number of service areas).
export default function CoverageMap() {
  const el = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;
    // Leaflet touches `window` on import, so load it only in the browser.
    import("leaflet").then((L) => {
      if (cancelled || !el.current) return;
      map = L.map(el.current, { scrollWheelZoom: false, zoomControl: true }).setView([38.5, -96], 4);
      L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors",
        maxZoom: 12,
      })
        .once("load", () => setLoading(false))
        .addTo(map);
      for (const s of states) {
        L.circleMarker([s.lat, s.lng], {
          radius: 5 + Math.sqrt(s.count) * 1.6,
          color: "#7a6c00",
          weight: 1.5,
          fillColor: "#fee100",
          fillOpacity: 0.75,
        })
          .bindPopup(`<strong>${s.name}</strong><br>${s.count} service areas<br><a href="${s.href}">View locations</a>`)
          .addTo(map);
      }
    });
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return (
    <div className="dmap-map-wrap">
      <div ref={el} className="dmap-map" role="img" aria-label="Map of National Dispatching service areas across the United States." />
      {loading && (
        <div className="dmap-map-loading" aria-hidden="true">
          <span className="dmap-spinner" />
          Loading service areas…
        </div>
      )}
    </div>
  );
}
