import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl transform transition-all">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#518DFF]/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-[#518DFF]" />
          </div>
          <h3 className="text-2xl font-bold text-[#151531] mb-2">Inscription réussie!</h3>
          <p className="text-gray-600 mb-6">
            Vous êtes maintenant sur la liste d'attente. Nous vous contacterons bientôt!
          </p>
          <button
            onClick={onClose}
            className="bg-[#518DFF] text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors"
          >
            Merci
          </button>
        </div>
      </div>
    </div>
  );
} 