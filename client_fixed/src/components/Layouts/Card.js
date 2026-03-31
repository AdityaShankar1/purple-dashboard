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


export function Card({ title, children, className = "" }) {
  return (
    <div
      className={`bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-sm p-6 flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-purple)]">
            {title}
          </h2>
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-purple)] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}
      <div className="flex-1 text-[var(--text-secondary)]">{children}</div>
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`p-4 ${className} text-[var(--text-primary)]`}>
      {children}
    </div>
  );
}

