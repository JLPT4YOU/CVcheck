'use client'

import { LanguageProvider } from '@/lib/language-context'
import { ReactNode } from 'react'

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  )
}
