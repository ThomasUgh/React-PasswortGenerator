import { useState, useEffect, useCallback } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme')
    return (saved as 'light' | 'dark') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : '')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])

  return { theme, toggleTheme }
}

export function useCopyToClipboard() {
  const [showSuccess, setShowSuccess] = useState(false)

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 1500)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [])

  return { copy, showSuccess }
}

export interface PasswordOptions {
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  special: boolean
  umlauts: boolean
  brackets: boolean
  spaces: boolean
  excludeSimilar: boolean
}

export function usePasswordOptions() {
  const [options, setOptions] = useState<PasswordOptions>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true,
    umlauts: false,
    brackets: false,
    spaces: false,
    excludeSimilar: false,
  })

  const toggleOption = useCallback((key: keyof PasswordOptions) => {
    setOptions(prev => {
      const charOptions: (keyof PasswordOptions)[] = ['uppercase', 'lowercase', 'numbers', 'special', 'umlauts', 'brackets', 'spaces']
      if (charOptions.includes(key) && key !== 'excludeSimilar') {
        const activeCount = charOptions.filter(k => k !== 'excludeSimilar' && prev[k]).length
        if (activeCount === 1 && prev[key]) return prev
      }
      return { ...prev, [key]: !prev[key] }
    })
  }, [])

  const activeCount = Object.entries(options)
    .filter(([key, value]) => key !== 'excludeSimilar' && value)
    .length

  return { options, toggleOption, activeCount }
}

export interface PassphraseOptions {
  capitalize: boolean
  hyphen: boolean
  underscore: boolean
  space: boolean
  addNumbers: boolean
  addSpecial: boolean
  germanWords: boolean
  englishWords: boolean
}

export function usePassphraseOptions() {
  const [options, setOptions] = useState<PassphraseOptions>({
    capitalize: true,
    hyphen: true,
    underscore: false,
    space: false,
    addNumbers: false,
    addSpecial: false,
    germanWords: false,
    englishWords: true,
  })

  const toggleOption = useCallback((key: keyof PassphraseOptions) => {
    setOptions(prev => {
      const newOptions = { ...prev }
      if (['hyphen', 'underscore', 'space'].includes(key)) {
        if (!prev[key]) {
          newOptions.hyphen = key === 'hyphen'
          newOptions.underscore = key === 'underscore'
          newOptions.space = key === 'space'
        } else {
          newOptions[key] = false
        }
        return newOptions
      }
      
      if (['germanWords', 'englishWords'].includes(key)) {
        newOptions.germanWords = key === 'germanWords'
        newOptions.englishWords = key === 'englishWords'
        return newOptions
      }
      
      newOptions[key] = !prev[key]
      return newOptions
    })
  }, [])

  return { options, toggleOption }
}
