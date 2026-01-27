// import type React from "react"
// import type { Metadata } from "next"
// import { GeistSans } from "geist/font/sans"
// import { GeistMono } from "geist/font/mono"
// import { Analytics } from "@vercel/analytics/next"
// import { Suspense } from "react"
// import "./globals.css"

// export const metadata: Metadata = {
//   title: "LMS Platform - Learn, Grow, Succeed",
//   description: "A comprehensive Learning Management System with course tracking, certificates, and progress analytics",
//   generator: "v0.app",
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en" className="dark">
//       <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-purple-gradient-dark min-h-screen`}>
//         <Suspense fallback={null}>{children}</Suspense>
//         <Analytics />
//       </body>
//     </html>
//   )
// }
