import { z } from "zod"

const emailSchema = z.string().trim().toLowerCase().max(254).email()

export type SubscriptionResult = { success: boolean; message?: string }

export async function registerSubscriber(
  email: unknown,
  save: (email: string) => Promise<SubscriptionResult>,
): Promise<SubscriptionResult> {
  const parsed = emailSchema.safeParse(email)
  if (!parsed.success) {
    return { success: false, message: "Veuillez fournir une adresse e-mail valide." }
  }

  try {
    return await save(parsed.data)
  } catch {
    // Do not expose database details or subscribers' personal data.
    return {
      success: false,
      message: "L'inscription est momentanément indisponible. Veuillez réessayer.",
    }
  }
}
