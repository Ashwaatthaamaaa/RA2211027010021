import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { DataProvider } from "@/context/data-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Social Media Analytics",
  description: "Analytics dashboard for social media platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DataProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1 container mx-auto p-4">{children}</main>
            </div>
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'