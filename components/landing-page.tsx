"use client"

import type React from "react"

import { useState } from "react"
import { subscribeToWaitlist } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"
import Confetti from "react-confetti"
import { useWindowSize } from "@/hooks/use-window-size"
import { SuccessModal } from "./success-modal"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const { toast } = useToast()
  const { width, height } = useWindowSize()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await subscribeToWaitlist(email)

      if (result.success) {
        setShowSuccessModal(true)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 5000)
        setEmail("")
      } else {
        toast({
          title: "Erreur",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-[#E7F0FF] w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background-texture.svg')" }}
    >
      <main className="relative min-h-screen w-full flex flex-col items-center justify-start pt-16 md:pt-24 px-4">
        {showConfetti && <Confetti width={width} height={height} recycle={false} />}
        <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />

        <div className="max-w-5xl w-full flex flex-col items-center">
          <div className="bg-[#518DFF] text-white px-6 py-3 rounded-full text-sm md:text-base font-medium mb-8">
            Accès exclusif au 20 premiers
          </div>

          <h1 className="text-[#151531] text-3xl md:text-5xl lg:text-6xl font-black text-center leading-tight mb-12">
            Gérez vos objectifs pour monter
            <br />
            votre productivité au{" "}
            <span className="relative">
              sommet
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[#518DFF]"></span>
            </span>
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 w-full max-w-xl mb-12">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email ici"
              required
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518DFF]"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#151531] text-white px-8 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-colors disabled:opacity-70"
            >
              {isLoading ? "Chargement..." : "S'inscrire"}
            </button>
          </form>

          <div className="w-full aspect-video max-w-4xl rounded-2xl overflow-hidden bg-gray-200 mb-16">
            <iframe
              src="https://www.tella.tv/video/fixez-des-objectifs-ambitieux-bjkh/embed"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="mt-auto">
            <h2 className="text-gray-400 text-6xl md:text-8xl font-bold tracking-wider font-nimbus">Obsaas</h2>
          </div>
        </div>
      </main>
    </div>
  )
}

