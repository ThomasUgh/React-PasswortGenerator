// Attack speeds (guesses per second)
export const ATTACK_SPEEDS = {
  online: 1e3,           // 1,000 (Rate-limited)
  offlineFast: 1e10,     // 10 Billion (MD5/SHA1)
  gpu: 1e14,             // 100 Trillion (bcrypt on GPU cluster)
  supercomputer: 1e15,   // 1 Quadrillion (Future/State)
}

// Standard for strength calculation
export const GUESSES_PER_SECOND = ATTACK_SPEEDS.gpu

// Calculate crack time in seconds
export function calculateCrackTime(poolSize: number, length: number, speed: number = GUESSES_PER_SECOND): number {
  const combinations = Math.pow(poolSize, length)
  return combinations / speed / 2 // Average case (50%)
}

// Format crack time to human readable string
export function formatCrackTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '∞'
  if (seconds < 0.000001) return '< 1 µs'
  if (seconds < 0.001) return '< 1 ms'
  if (seconds < 1) return '< 1 Sek.'
  if (seconds < 60) return '~' + Math.round(seconds) + ' Sek.'
  if (seconds < 3600) return '~' + Math.round(seconds / 60) + ' Min.'
  if (seconds < 86400) return '~' + Math.round(seconds / 3600) + ' Std.'
  if (seconds < 2592000) return '~' + Math.round(seconds / 86400) + ' Tage'
  if (seconds < 31536000) return '~' + Math.round(seconds / 2592000) + ' Monate'
  
  const years = seconds / 31536000
  if (years < 1000) return '~' + Math.round(years).toLocaleString('de-DE') + ' Jahre'
  if (years < 1e6) return '~' + Math.round(years / 1000).toLocaleString('de-DE') + ' Tsd. Jahre'
  if (years < 1e9) return '~' + Math.round(years / 1e6).toLocaleString('de-DE') + ' Mio. Jahre'
  if (years < 1e12) return '~' + Math.round(years / 1e9).toLocaleString('de-DE') + ' Mrd. Jahre'
  if (years < 1e15) return '~' + Math.round(years / 1e12).toLocaleString('de-DE') + ' Bio. Jahre'
  if (years < 1e18) return '~' + Math.round(years / 1e15).toLocaleString('de-DE') + ' Brd. Jahre'
  return '∞'
}

// Strength level type
export interface StrengthLevel {
  text: string
  color: string
  width: string
  rainbow: boolean
}

// Get strength level based on entropy and crack time
export function getStrengthLevel(
  entropy: number,
  crackYears: number,
  length: number,
  optionCount: number
): StrengthLevel {
  const allOptionsActive = optionCount >= 7
  
  if (entropy < 25 || crackYears < 0.000001) {
    return { text: 'Kritisch', color: 'var(--strength-1)', width: '4%', rainbow: false }
  }
  if (entropy < 35 || crackYears < 0.0001) {
    return { text: 'Sehr Schwach', color: 'var(--strength-1)', width: '8%', rainbow: false }
  }
  if (entropy < 45 || crackYears < 0.01) {
    return { text: 'Schwach', color: 'var(--strength-2)', width: '14%', rainbow: false }
  }
  if (entropy < 55 || crackYears < 1) {
    return { text: 'Mäßig', color: 'var(--strength-3)', width: '22%', rainbow: false }
  }
  if (entropy < 65 || crackYears < 100) {
    return { text: 'Mittel', color: 'var(--strength-4)', width: '30%', rainbow: false }
  }
  if (entropy < 75 || crackYears < 10000) {
    return { text: 'Gut', color: 'var(--strength-5)', width: '38%', rainbow: false }
  }
  if (entropy < 85 || crackYears < 1e6) {
    return { text: 'Sehr Gut', color: 'var(--strength-6)', width: '48%', rainbow: false }
  }
  if (entropy < 100 || crackYears < 1e9) {
    return { text: 'Stark', color: 'var(--strength-7)', width: '58%', rainbow: false }
  }
  if (entropy < 120 || crackYears < 1e12) {
    return { text: 'Sehr Stark', color: 'var(--strength-8)', width: '68%', rainbow: false }
  }
  if (entropy < 150 || crackYears < 1e15) {
    return { text: 'Extrem Stark', color: 'var(--strength-9)', width: '78%', rainbow: false }
  }
  if (entropy < 200 || crackYears < 1e18 || length < 64) {
    return { text: 'Extrem', color: 'var(--strength-10)', width: '88%', rainbow: false }
  }
  
  // UNSCHLAGBAR: 64+ chars AND all options AND >200 bits
  if (length >= 64 && allOptionsActive && entropy >= 200) {
    return { text: '🛡️ Unschlagbar', color: 'var(--strength-12)', width: '100%', rainbow: true }
  }
  
  return { text: 'Extrem', color: 'var(--strength-11)', width: '92%', rainbow: false }
}

// Get PIN strength level
export function getPinStrengthLevel(length: number): StrengthLevel {
  if (length <= 4) {
    return { text: 'Sehr Schwach', color: 'var(--strength-1)', width: '10%', rainbow: false }
  }
  if (length <= 6) {
    return { text: 'Schwach', color: 'var(--strength-2)', width: '20%', rainbow: false }
  }
  if (length <= 8) {
    return { text: 'Mäßig', color: 'var(--strength-3)', width: '35%', rainbow: false }
  }
  if (length <= 10) {
    return { text: 'Mittel', color: 'var(--strength-4)', width: '50%', rainbow: false }
  }
  if (length <= 14) {
    return { text: 'Gut', color: 'var(--strength-5)', width: '65%', rainbow: false }
  }
  return { text: 'Stark', color: 'var(--strength-6)', width: '80%', rainbow: false }
}

// Format combinations
export function formatCombinations(num: number): string {
  if (!isFinite(num)) return '∞'
  const exp = Math.floor(Math.log10(num))
  if (exp > 6) return '10' + formatSuperscript(exp)
  return num.toLocaleString('de-DE')
}

// Format number as superscript
export function formatSuperscript(num: number): string {
  const superscripts: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
  }
  return String(num).split('').map(d => superscripts[d] || d).join('')
}
