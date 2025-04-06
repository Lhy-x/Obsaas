import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Gérez vos objectifs pour monter votre productivité au sommet",
  description: "Plateforme de productivité pour gérer vos objectifs efficacement",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'