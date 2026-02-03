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

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Card } from "../../components/Layouts/Card";
import { useUserEndpointData } from "../../hooks/useUserEndpointData";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export default function DashboardAdminUserEndpoint() {
  const { logons, locations, compliance, loading, error } = useUserEndpointData();

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
        {locations.length === 0 ? (
          <p className="text-purple-300">No login locations available</p>
        ) : (
          <ComposableMap projectionConfig={{ scale: 140 }}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#1E1B4B"
                    stroke="#6366F1"
                  />
                ))
              }
            </Geographies>
            {locations.map((loc, i) => (
              <Marker key={i} coordinates={[loc.lon, loc.lat]}>
                <circle r={5} fill="#FACC15" stroke="#fff" strokeWidth={1} />
              </Marker>
            ))}
          </ComposableMap>
        )}
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
