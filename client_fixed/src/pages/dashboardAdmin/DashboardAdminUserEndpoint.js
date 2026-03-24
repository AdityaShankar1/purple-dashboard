// //client/src/pages/dashboardAdmin/DashbaordAdminUserEndpoint.js

// "use client";

// import React, { useMemo } from "react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";
// import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
// import { Card } from "../../components/Layouts/Card";
// import { useWazuhSocket } from "../../hooks/useWazuhSocket";

// const geoUrl =
//   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// export default function DashboardAdminUserEndpoint() {
//   const alerts = useWazuhSocket(200);

//   const logonData = useMemo(() => {
//     const userLogons = alerts.reduce((acc, alert) => {
//       const user = alert.user?.name || "unknown";
//       if (!acc[user]) {
//         acc[user] = { success: 0, failure: 0 };
//       }
//       if (alert.rule?.description?.includes("successful")) {
//         acc[user].success += 1;
//       } else if (alert.rule?.description?.includes("failed")) {
//         acc[user].failure += 1;
//       }
//       return acc;
//     }, {});
//     return Object.entries(userLogons).map(([user, data]) => ({
//       user,
//       success: data.success,
//       failure: data.failure,
//     }));
//   }, [alerts]);

//   const locations = useMemo(() => {
//     return alerts
//       .filter((a) => a.location?.lat && a.location?.lon)
//       .map((a) => ({
//         lat: a.location.lat,
//         lng: a.location.lon,
//       }));
//   }, [alerts]);

//   const compliance = useMemo(() => {
//     const total = alerts.length;
//     const compliant = alerts.filter(a => a.rule?.groups?.includes("pci_dss_10.2")).length;
//     return total > 0 ? Math.round((compliant / total) * 100) : 0;
//   }, [alerts]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
//       {/* User Logon Activity */}
//       <Card title="👤 User Logon Activity">
//         {logonData.length === 0 ? (
//           <p className="text-purple-300">No logon data available</p>
//         ) : (
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={logonData}>
//               <XAxis dataKey="user" stroke="#aaa" />
//               <YAxis stroke="#aaa" />
//               <Tooltip />
//               <Bar dataKey="success" fill="#4ADE80" name="Success" />
//               <Bar dataKey="failure" fill="#DC2626" name="Failure" />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//       </Card>

//       {/* Geographical Logon Map */}
//       <Card title="🌍 Geographical Logon Map">
//         {locations.length === 0 ? (
//           <p className="text-purple-300">No login locations available</p>
//         ) : (
//           <ComposableMap projectionConfig={{ scale: 140 }}>
//             <Geographies geography={geoUrl}>
//               {({ geographies }) =>
//                 geographies.map((geo) => (
//                   <Geography
//                     key={geo.rsmKey}
//                     geography={geo}
//                     fill="#1E1B4B"
//                     stroke="#6366F1"
//                   />
//                 ))
//               }
//             </Geographies>
//             {locations.map((loc, i) => (
//               <Marker key={i} coordinates={[loc.lng, loc.lat]}>
//                 <circle r={5} fill="#FACC15" stroke="#fff" strokeWidth={1} />
//               </Marker>
//             ))}
//           </ComposableMap>
//         )}
//       </Card>

//       {/* Endpoint Compliance */}
//       <Card title="💻 Endpoint Compliance" className="md:col-span-2">
//         <div className="flex flex-col items-center">
//           <div className="text-5xl font-bold text-purple-200">{compliance}%</div>
//           <p className="text-gray-400 mt-2">
//             Endpoints up-to-date with security patches
//           </p>
//           <div className="w-full bg-gray-700 rounded-full h-4 mt-4">
//             <div
//               className="bg-green-500 h-4 rounded-full"
//               style={{ width: `${compliance}%` }}
//             ></div>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }























// "use client";

// import React from "react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";
// import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
// import { Card } from "../../components/Layouts/Card";
// import { useUserEndpointData } from "../../hooks/useUserEndpointData";

// const geoUrl =
//   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// export default function DashboardAdminUserEndpoint() {
//   const { logons, locations, compliance } = useUserEndpointData();

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
//       {/* User Logon Activity */}
//       <Card title="👤 User Logon Activity">
//         {logons.length === 0 ? (
//           <p className="text-purple-300">No logon data available</p>
//         ) : (
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={logons}>
//               <XAxis dataKey="user" stroke="#aaa" />
//               <YAxis stroke="#aaa" />
//               <Tooltip />
//               <Bar dataKey="success" fill="#4ADE80" name="Success" />
//               <Bar dataKey="failure" fill="#DC2626" name="Failure" />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//       </Card>

//       {/* Geographical Logon Map */}
//       <Card title="🌍 Geographical Logon Map">
//         {locations.length === 0 ? (
//           <p className="text-purple-300">No login locations available</p>
//         ) : (
//           <ComposableMap projectionConfig={{ scale: 140 }}>
//             <Geographies geography={geoUrl}>
//               {({ geographies }) =>
//                 geographies.map((geo) => (
//                   <Geography
//                     key={geo.rsmKey}
//                     geography={geo}
//                     fill="#1E1B4B"
//                     stroke="#6366F1"
//                   />
//                 ))
//               }
//             </Geographies>
//             {locations.map((loc, i) => (
//               <Marker key={i} coordinates={[loc.lon, loc.lat]}>
//                 <circle r={5} fill="#FACC15" stroke="#fff" strokeWidth={1} />
//               </Marker>
//             ))}
//           </ComposableMap>
//         )}
//       </Card>

//       {/* Endpoint Compliance */}
//       <Card title="💻 Endpoint Compliance" className="md:col-span-2">
//         <div className="flex flex-col items-center">
//           <div className="text-5xl font-bold text-purple-200">{compliance}%</div>
//           <p className="text-gray-400 mt-2">
//             Endpoints up-to-date with security patches
//           </p>
//           <div className="w-full bg-gray-700 rounded-full h-4 mt-4">
//             <div
//               className="bg-green-500 h-4 rounded-full"
//               style={{ width: `${compliance}%` }}
//             ></div>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }














//client/src/pages/dashboardAdmin/DashboardAdminUserEndpoint.js

"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card } from "../../components/Layouts/Card";
import { useUserEndpointData } from "../../hooks/useUserEndpointData";

export default function DashboardAdminUserEndpoint() {
  const { logons, compliance, loading, error } = useUserEndpointData();

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [mapError, setMapError] = useState(null);
  const [isMapLoaded, setMapLoaded] = useState(false);

  /**
   * BUG FIX LOG:
   * 1. Port Mismatch: Standardized all 5000/4000 port references to 5001 to match server configuration.
   * 2. Map Race Condition: Implemented polling (setInterval) to ensure window.L is available before initialization.
   * 3. Error Handling: Added try-catch block for robust initialization and error reporting.
   */
  useEffect(() => {
    let checkInterval;
    let attempts = 0;
    const maxAttempts = 10;

    const initMap = () => {
      try {
        if (window.L && mapRef.current && !mapInstance.current) {
          const collegeCoords = [12.9348, 77.5342];

          mapInstance.current = window.L.map(mapRef.current, {
            zoomControl: false
          }).setView(collegeCoords, 17);

          window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          }).addTo(mapInstance.current);

          window.L.circle(collegeCoords, {
            radius: 120,
            fillColor: "#ff4d4d",
            color: "#ff4d4d",
            weight: 1,
            opacity: 0.4,
            fillOpacity: 0.15
          }).addTo(mapInstance.current);

          window.L.circleMarker(collegeCoords, {
            radius: 4,
            fillColor: "#ff4d4d",
            color: "#fff",
            weight: 1,
            opacity: 1,
            fillOpacity: 1
          })
            .addTo(mapInstance.current)
            .bindTooltip("PES University", {
              permanent: true,
              direction: 'top',
              className: 'small-map-label',
              offset: [0, -5]
            });

          if (checkInterval) clearInterval(checkInterval);
          setMapError(null);
          setMapLoaded(true);
        } else if (!window.L && attempts >= maxAttempts) {
          setMapError("Leaflet JS failed to load after multiple attempts.");
          if (checkInterval) clearInterval(checkInterval);
        }
        attempts++;
      } catch (err) {
        console.error("[CRITICAL] Failed to initialize map in UserEndpoint:", err);
        setMapError(`Map Init Error: ${err.message}`);
        if (checkInterval) clearInterval(checkInterval);
      }
    };

    initMap();
    checkInterval = setInterval(initMap, 1000); // Polling every 1s

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (mapInstance.current) {
        try {
          mapInstance.current.remove();
        } catch (err) {
          console.warn("[Map] Failed to clean up map instance:", err);
        }
        mapInstance.current = null;
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-purple-300 text-lg font-medium">
        ⏳ Loading user endpoint data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-400 text-lg font-medium">
        ❌ Error fetching data: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* User Logon Activity */}
      <Card title="👤 User Logon Activity">
        {logons.length === 0 ? (
          <p className="text-purple-300">No logon data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={logons}>
              <XAxis dataKey="user" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="success" fill="#4ADE80" name="Success" />
              <Bar dataKey="failure" fill="#DC2626" name="Failure" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* Geographical Logon Map */}
      <Card title="🌍 Geographical Logon Map">
        <style dangerouslySetInnerHTML={{
          __html: `
          .small-map-label {
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 1px 4px;
            font-size: 10px;
            font-weight: bold;
            color: #333;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          }
        `}} />
        <div
          ref={mapRef}
          style={{ height: '300px', width: '100%', borderRadius: '0.75rem', overflow: 'hidden' }}
          className="z-0 bg-gray-900 flex items-center justify-center relative"
        >
          {mapError ? (
            <div className="text-red-400 text-sm p-4 text-center">
              ⚠ {mapError}<br />
              <span className="text-xs text-gray-500">Check CDN connection or CSP settings.</span>
            </div>
          ) : !isMapLoaded && (
            <div className="flex items-center justify-center h-full text-purple-300 font-medium">
              <div className="animate-pulse">Loading Map Infrastructure...</div>
            </div>
          )}
        </div>
      </Card>

      {/* Endpoint Compliance */}
      <Card title="💻 Endpoint Compliance" className="md:col-span-2">
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold text-purple-200">{compliance}%</div>
          <p className="text-gray-400 mt-2">
            Endpoints up-to-date with security patches
          </p>
          <div className="w-full bg-gray-700 rounded-full h-4 mt-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${compliance}%` }}
            ></div>
          </div>
        </div>
      </Card>
    </div>
  );
}
