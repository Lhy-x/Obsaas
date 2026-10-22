"use server"

import { saveEmail } from "./db"
import { registerSubscriber } from "./waitlist"

export async function subscribeToWaitlist(email: string) {
  return registerSubscriber(email, saveEmail)
}
