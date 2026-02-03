// import React from "react";

// // components/Layouts/Card.jsx
// export function Card({ title, children }) {
//   return (
//     <div className="bg-white bg-opacity-10 rounded-2xl shadow-lg p-6 flex flex-col backdrop-blur-sm">
//       {title && (
//         <h2 className="text-lg font-semibold text-white mb-4">
//           {title}
//         </h2>
//       )}
//       <div className="flex-1 text-white">{children}</div>
//     </div>
//   );
// }

// export function CardContent({ children, className = "" }) {
//   return (
//     <div className={`p-4 ${className} text-white`}>
//       {children}
//     </div>
//   );
// }





//client/src/components/Layouts.Card.js

import React from "react";


export function Card({ title, children, bgColor = "bg-white", borderColor = "border-gray-300" }) {
  return (
    <div
      className={`${bgColor} ${borderColor} rounded-2xl shadow-lg p-6 flex flex-col border`}
    >
      {title && (
        <h2 className="text-lg font-semibold text-black mb-4">{title}</h2>
      )}
      <div className="flex-1 text-black">{children}</div>
    </div>
  );
}

export function CardContent({ children, className = "", bgColor = "bg-white" }) {
  return (
    <div className={`p-4 ${className} ${bgColor} text-black`}>
      {children}
    </div>
  );
}
