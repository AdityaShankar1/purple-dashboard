// // "use client"

// // import * as React from "react"
// // import * as ProgressPrimitive from "@radix-ui/react-progress"

// // const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
// //   <ProgressPrimitive.Root
// //     ref={ref}
// //     className={"relative h-4 w-full overflow-hidden rounded-full bg-secondary " + (className || "")}
// //     {...props}
// //   >
// //     <ProgressPrimitive.Indicator
// //       className="h-full w-full flex-1 bg-primary transition-all"
// //       style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
// //     />
// //   </ProgressPrimitive.Root>
// // ))
// // Progress.displayName = ProgressPrimitive.Root.displayName

// // export { Progress }








// import React from "react"

// export function Progress({ value = 0, className = "" }) {
//   return (
//     <div className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
//       <div
//         className="h-full bg-blue-600 transition-all duration-300"
//         style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
//       />
//     </div>
//   )
// }
















// client/src/components/Layouts/progress.jsx
import React from "react";

export const Progress = ({ value = 0, className = "", showLabel = false }) => {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <div className={`relative ${className}`}>
      <div className="w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-700 mr-2">
          {percentage}%
        </span>
      )}
    </div>
  );
};