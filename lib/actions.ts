"use server"

import { saveEmail } from './db';

export async function subscribeToWaitlist(email: string) {
  if (!email || !email.includes("@")) {
    return {
      success: false,
      message: "Veuillez fournir une adresse e-mail valide.",
    }
  }

  try {
    const result = await saveEmail(email);
    return result;
  } catch (error) {
    console.error('Error in subscribeToWaitlist:', error);
    return {
      success: false,
      message: 'Une erreur est survenue l\'inscription'
    };
  }
}

