import { createContext, useContext, useState } from 'react'
import { translations } from '../i18n'

export const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('zebcytec_lang') || 'es')

  const changeLang = (code) => {
    setLang(code)
    localStorage.setItem('zebcytec_lang', code)
  }

  const t = translations[lang] || translations.es

  return (
    <LangContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
