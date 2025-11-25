import { useState, useEffect, useCallback } from 'react'
import { useTheme, useCopyToClipboard, usePasswordOptions, usePassphraseOptions } from './hooks/useGenerators'
import { generatePassword, generatePassphrase, generatePin, getPoolSize, englishWords, germanWords } from './utils/generator'
import { calculateCrackTime, formatCrackTime, getStrengthLevel, getPinStrengthLevel, formatCombinations, ATTACK_SPEEDS, GUESSES_PER_SECOND } from './utils/strength'
import { Icons } from './components/Icons'

type Tab = 'password' | 'passphrase' | 'pin' | 'checker'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<Tab>('password')

  // Password state
  const [passwordLength, setPasswordLength] = useState(22)
  const [passwordCount, setPasswordCount] = useState(5)
  const [password, setPassword] = useState('')
  const [passwords, setPasswords] = useState<string[]>([])
  const { options: passwordOptions, toggleOption: togglePasswordOption, activeCount } = usePasswordOptions()
  const passwordCopy = useCopyToClipboard()

  // Passphrase state
  const [wordCount, setWordCount] = useState(4)
  const [passphraseCount, setPassphraseCount] = useState(5)
  const [passphrase, setPassphrase] = useState('')
  const [passphrases, setPassphrases] = useState<string[]>([])
  const { options: passphraseOptions, toggleOption: togglePassphraseOption } = usePassphraseOptions()
  const passphraseCopy = useCopyToClipboard()

  const [pinLength, setPinLength] = useState(6)
  const [pinCount, setPinCount] = useState(5)
  const [pin, setPin] = useState('')
  const [pins, setPins] = useState<string[]>([])
  const pinCopy = useCopyToClipboard()

  const [checkerInput, setCheckerInput] = useState('')
  const [checkerVisible, setCheckerVisible] = useState(false)
  const doGeneratePassword = useCallback(() => {
    const pwd = generatePassword(passwordLength, passwordOptions)
    setPassword(pwd)
    const pwds = Array.from({ length: passwordCount }, () => 
      generatePassword(passwordLength, passwordOptions)
    )
    setPasswords(pwds)
  }, [passwordLength, passwordCount, passwordOptions])

  const doGeneratePassphrase = useCallback(() => {
    const pp = generatePassphrase(wordCount, passphraseOptions)
    setPassphrase(pp)
    const pps = Array.from({ length: passphraseCount }, () =>
      generatePassphrase(wordCount, passphraseOptions)
    )
    setPassphrases(pps)
  }, [wordCount, passphraseCount, passphraseOptions])

  const doGeneratePin = useCallback(() => {
    const p = generatePin(pinLength)
    setPin(p)
    const ps = Array.from({ length: pinCount }, () => generatePin(pinLength))
    setPins(ps)
  }, [pinLength, pinCount])

  useEffect(() => { doGeneratePassword() }, [doGeneratePassword])
  useEffect(() => { doGeneratePassphrase() }, [doGeneratePassphrase])
  useEffect(() => { doGeneratePin() }, [doGeneratePin])

  const poolSize = getPoolSize(passwordOptions)
  const entropy = passwordLength * Math.log2(poolSize)
  const crackSeconds = calculateCrackTime(poolSize, passwordLength)
  const crackYears = crackSeconds / 31536000
  const strength = getStrengthLevel(entropy, crackYears, passwordLength, activeCount)

  const wordlistSize = passphraseOptions.germanWords ? germanWords.length : englishWords.length
  let passphraseEntropy = wordCount * Math.log2(wordlistSize)
  if (passphraseOptions.addNumbers) passphraseEntropy += wordCount * 3
  if (passphraseOptions.addSpecial) passphraseEntropy += wordCount * 2
  const passphraseCrackSeconds = Math.pow(wordlistSize, wordCount) / GUESSES_PER_SECOND / 2
  const passphraseCrackYears = passphraseCrackSeconds / 31536000
  const passphraseStrength = getStrengthLevel(passphraseEntropy, passphraseCrackYears, wordCount * 5, 2)

  const pinEntropy = pinLength * Math.log2(10)
  const pinCrackSeconds = calculateCrackTime(10, pinLength)
  const pinStrength = getPinStrengthLevel(pinLength)

  const checkerHasUpper = /[A-Z]/.test(checkerInput)
  const checkerHasLower = /[a-z]/.test(checkerInput)
  const checkerHasNumbers = /[0-9]/.test(checkerInput)
  const checkerHasSpecial = /[^A-Za-z0-9]/.test(checkerInput)
  
  let checkerPoolSize = 0
  if (checkerHasUpper) checkerPoolSize += 26
  if (checkerHasLower) checkerPoolSize += 26
  if (checkerHasNumbers) checkerPoolSize += 10
  if (checkerHasSpecial) checkerPoolSize += 32
  if (checkerPoolSize === 0) checkerPoolSize = 26

  const checkerEntropy = checkerInput.length * Math.log2(checkerPoolSize)
  const checkerCombinations = Math.pow(checkerPoolSize, checkerInput.length)
  const checkerCrackYears = (checkerCombinations / GUESSES_PER_SECOND / 2) / 31536000
  const checkerOptionCount = (checkerHasUpper ? 1 : 0) + (checkerHasLower ? 1 : 0) + (checkerHasNumbers ? 1 : 0) + (checkerHasSpecial ? 1 : 0)
  const checkerStrength = checkerInput ? getStrengthLevel(checkerEntropy, checkerCrackYears, checkerInput.length, checkerOptionCount) : null

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <div className="logo-icon">
            <Icons.Lock />
          </div>
          <span className="logo-text">SecureGen</span>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} title="Theme wechseln">
          {theme === 'light' ? <Icons.Sun /> : <Icons.Moon />}
        </button>
      </header>

      <div className="tabs">
        <button className={`tab ${activeTab === 'password' ? 'active' : ''}`} onClick={() => setActiveTab('password')}>
          <Icons.Key /> Passwort
        </button>
        <button className={`tab ${activeTab === 'passphrase' ? 'active' : ''}`} onClick={() => setActiveTab('passphrase')}>
          <Icons.Book /> Passphrase
        </button>
        <button className={`tab ${activeTab === 'pin' ? 'active' : ''}`} onClick={() => setActiveTab('pin')}>
          <Icons.Lock /> PIN
        </button>
        <button className={`tab ${activeTab === 'checker' ? 'active' : ''}`} onClick={() => setActiveTab('checker')}>
          <Icons.Check /> Checker
        </button>
      </div>

      {activeTab === 'password' && (
        <>
          <div className="card">
            <div className="password-wrapper">
              <div className={`copy-success ${passwordCopy.showSuccess ? 'show' : ''}`}>Kopiert!</div>
              <input
                type="text"
                className="password-field"
                value={password}
                readOnly
                onClick={() => passwordCopy.copy(password)}
              />
              <div className="password-actions">
                <button className="action-btn" onClick={doGeneratePassword} title="Neu generieren">
                  <Icons.Refresh />
                </button>
                <button className="action-btn" onClick={() => passwordCopy.copy(password)} title="Kopieren">
                  <Icons.Copy />
                </button>
              </div>
            </div>

            <div className="strength-section">
              <div className="strength-header">
                <span className="strength-label">Passwortstärke</span>
                <span className={`strength-value ${strength.rainbow ? 'rainbow' : ''}`} style={{ color: strength.rainbow ? undefined : strength.color }}>
                  {strength.text}
                </span>
              </div>
              <div className="strength-bar-container">
                <div 
                  className={`strength-bar ${strength.rainbow ? 'rainbow' : ''}`}
                  style={{ width: strength.width, background: strength.rainbow ? undefined : strength.color }}
                />
              </div>
              <div className="crack-time">
                <span className="crack-time-icon"><Icons.Clock /></span>
                <span className="crack-time-text">Zeit zum Knacken:</span>
                <span className="crack-time-value">{formatCrackTime(crackSeconds)}</span>
              </div>
              <div className="info-box">
                <Icons.Info />
                <span>Berechnung: 100 Billionen Versuche/Sek. (moderner GPU-Cluster)</span>
              </div>
            </div>

            <div className="slider-section">
              <div className="slider-header">
                <span className="slider-title">Passwortlänge</span>
                <div className="slider-value-display">
                  <input
                    type="number"
                    className="slider-input"
                    value={passwordLength}
                    min={4}
                    max={128}
                    onChange={e => setPasswordLength(Math.min(128, Math.max(4, parseInt(e.target.value) || 4)))}
                  />
                  <span className="slider-unit">Zeichen</span>
                </div>
              </div>
              <div className="slider-track">
                <div className="slider-fill" style={{ width: `${((passwordLength - 4) / 124) * 100}%` }} />
                <input
                  type="range"
                  className="slider"
                  min={4}
                  max={128}
                  value={passwordLength}
                  onChange={e => setPasswordLength(parseInt(e.target.value))}
                />
              </div>
              <div className="slider-marks">
                <span className="slider-mark">4</span>
                <span className="slider-mark">32</span>
                <span className="slider-mark">64</span>
                <span className="slider-mark">96</span>
                <span className="slider-mark">128</span>
              </div>
            </div>

            <div className="options-section">
              <div className="options-title">Zeichenoptionen</div>
              <div className="options-grid">
                {[
                  { key: 'uppercase', label: 'Großbuchstaben', preview: 'A-Z (26)' },
                  { key: 'lowercase', label: 'Kleinbuchstaben', preview: 'a-z (26)' },
                  { key: 'numbers', label: 'Zahlen', preview: '0-9 (10)' },
                  { key: 'special', label: 'Sonderzeichen', preview: '!@#$%^&* (32)' },
                  { key: 'umlauts', label: 'Umlaute', preview: 'ÄÖÜäöüß (7)' },
                  { key: 'brackets', label: 'Klammern', preview: '()[]{}⟨⟩ (8)' },
                  { key: 'spaces', label: 'Leerzeichen', preview: '"␣" (1)' },
                  { key: 'excludeSimilar', label: 'Ähnliche ausschließen', preview: 'O0 1lI| entfernen' },
                ].map(({ key, label, preview }) => (
                  <div
                    key={key}
                    className={`option ${passwordOptions[key as keyof typeof passwordOptions] ? 'active' : ''}`}
                    onClick={() => togglePasswordOption(key as keyof typeof passwordOptions)}
                  >
                    <div className="option-check"><Icons.CheckMark /></div>
                    <div className="option-text">
                      <div className="option-label">{label}</div>
                      <div className="option-preview">{preview}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="multi-section">
              <div className="multi-header">
                <span className="multi-title">Mehrere Passwörter</span>
                <div className="multi-controls">
                  <div className="count-control">
                    <button className="count-btn" onClick={() => setPasswordCount(Math.max(1, passwordCount - 1))}>
                      <Icons.Minus />
                    </button>
                    <span className="count-display">{passwordCount}</span>
                    <button className="count-btn" onClick={() => setPasswordCount(Math.min(10, passwordCount + 1))}>
                      <Icons.Plus />
                    </button>
                  </div>
                  <button className="copy-all-btn" onClick={() => passwordCopy.copy(passwords.join('\n'))}>
                    <Icons.Copy /> Alle kopieren
                  </button>
                </div>
              </div>
              <div className="password-list">
                {passwords.map((pwd, i) => (
                  <div key={i} className="password-item" onClick={() => passwordCopy.copy(pwd)}>
                    <span className="password-item-num">{i + 1}</span>
                    <span className="password-item-text">{pwd}</span>
                    <button className="password-item-copy" onClick={e => { e.stopPropagation(); passwordCopy.copy(pwd) }}>
                      <Icons.Copy />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="info-grid">
              <div className="info-item">
                <div className="info-value">{Math.round(entropy)}</div>
                <div className="info-label">Entropie (Bits)</div>
              </div>
              <div className="info-item">
                <div className="info-value">{poolSize}</div>
                <div className="info-label">Zeichenpool</div>
              </div>
              <div className="info-item">
                <div className="info-value">{formatCombinations(Math.pow(poolSize, passwordLength))}</div>
                <div className="info-label">Kombinationen</div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'passphrase' && (
        <>
          <div className="card">
            <div className="password-wrapper">
              <div className={`copy-success ${passphraseCopy.showSuccess ? 'show' : ''}`}>Kopiert!</div>
              <input
                type="text"
                className="password-field passphrase-field"
                value={passphrase}
                readOnly
                onClick={() => passphraseCopy.copy(passphrase)}
              />
              <div className="password-actions">
                <button className="action-btn" onClick={doGeneratePassphrase} title="Neu generieren">
                  <Icons.Refresh />
                </button>
                <button className="action-btn" onClick={() => passphraseCopy.copy(passphrase)} title="Kopieren">
                  <Icons.Copy />
                </button>
              </div>
            </div>

            <div className="strength-section">
              <div className="strength-header">
                <span className="strength-label">Passphrase-Stärke</span>
                <span className="strength-value" style={{ color: passphraseStrength.color }}>
                  {passphraseStrength.text}
                </span>
              </div>
              <div className="strength-bar-container">
                <div className="strength-bar" style={{ width: passphraseStrength.width, background: passphraseStrength.color }} />
              </div>
              <div className="crack-time">
                <span className="crack-time-icon"><Icons.Clock /></span>
                <span className="crack-time-text">Zeit zum Knacken:</span>
                <span className="crack-time-value">{formatCrackTime(passphraseCrackSeconds)}</span>
              </div>
            </div>

            <div className="slider-section">
              <div className="slider-header">
                <span className="slider-title">Anzahl Wörter</span>
                <div className="slider-value-display">
                  <input
                    type="number"
                    className="slider-input"
                    value={wordCount}
                    min={3}
                    max={10}
                    onChange={e => setWordCount(Math.min(10, Math.max(3, parseInt(e.target.value) || 3)))}
                  />
                  <span className="slider-unit">Wörter</span>
                </div>
              </div>
              <div className="slider-track">
                <div className="slider-fill" style={{ width: `${((wordCount - 3) / 7) * 100}%` }} />
                <input
                  type="range"
                  className="slider"
                  min={3}
                  max={10}
                  value={wordCount}
                  onChange={e => setWordCount(parseInt(e.target.value))}
                />
              </div>
              <div className="slider-marks">
                <span className="slider-mark">3</span>
                <span className="slider-mark">5</span>
                <span className="slider-mark">7</span>
                <span className="slider-mark">10</span>
              </div>
            </div>

            <div className="options-section">
              <div className="options-title">Passphrase-Optionen</div>
              <div className="options-grid">
                {[
                  { key: 'capitalize', label: 'Großschreibung', preview: 'Wort-Wort-Wort' },
                  { key: 'hyphen', label: 'Bindestrich', preview: 'wort-wort-wort' },
                  { key: 'underscore', label: 'Unterstrich', preview: 'wort_wort_wort' },
                  { key: 'space', label: 'Leerzeichen', preview: 'wort wort wort' },
                  { key: 'addNumbers', label: 'Zahlen hinzufügen', preview: 'wort42-wort' },
                  { key: 'addSpecial', label: 'Sonderzeichen', preview: 'wort!-wort@' },
                  { key: 'germanWords', label: 'Deutsche Wörter', preview: 'Haus-Baum-Sonne' },
                  { key: 'englishWords', label: 'Englische Wörter', preview: 'house-tree-sun' },
                ].map(({ key, label, preview }) => (
                  <div
                    key={key}
                    className={`option ${passphraseOptions[key as keyof typeof passphraseOptions] ? 'active' : ''}`}
                    onClick={() => togglePassphraseOption(key as keyof typeof passphraseOptions)}
                  >
                    <div className="option-check"><Icons.CheckMark /></div>
                    <div className="option-text">
                      <div className="option-label">{label}</div>
                      <div className="option-preview">{preview}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="multi-section">
              <div className="multi-header">
                <span className="multi-title">Mehrere Passphrasen</span>
                <div className="multi-controls">
                  <div className="count-control">
                    <button className="count-btn" onClick={() => setPassphraseCount(Math.max(1, passphraseCount - 1))}>
                      <Icons.Minus />
                    </button>
                    <span className="count-display">{passphraseCount}</span>
                    <button className="count-btn" onClick={() => setPassphraseCount(Math.min(10, passphraseCount + 1))}>
                      <Icons.Plus />
                    </button>
                  </div>
                  <button className="copy-all-btn" onClick={() => passphraseCopy.copy(passphrases.join('\n'))}>
                    <Icons.Copy /> Alle kopieren
                  </button>
                </div>
              </div>
              <div className="password-list">
                {passphrases.map((pp, i) => (
                  <div key={i} className="password-item" onClick={() => passphraseCopy.copy(pp)}>
                    <span className="password-item-num">{i + 1}</span>
                    <span className="password-item-text">{pp}</span>
                    <button className="password-item-copy" onClick={e => { e.stopPropagation(); passphraseCopy.copy(pp) }}>
                      <Icons.Copy />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="info-grid">
              <div className="info-item">
                <div className="info-value">{Math.round(passphraseEntropy)}</div>
                <div className="info-label">Entropie (Bits)</div>
              </div>
              <div className="info-item">
                <div className="info-value">{wordlistSize}</div>
                <div className="info-label">Wortliste</div>
              </div>
              <div className="info-item">
                <div className="info-value">{formatCombinations(Math.pow(wordlistSize, wordCount))}</div>
                <div className="info-label">Kombinationen</div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'pin' && (
        <>
          <div className="card">
            <div className="password-wrapper">
              <div className={`copy-success ${pinCopy.showSuccess ? 'show' : ''}`}>Kopiert!</div>
              <input
                type="text"
                className="password-field pin-field"
                value={pin}
                readOnly
                onClick={() => pinCopy.copy(pin)}
              />
              <div className="password-actions">
                <button className="action-btn" onClick={doGeneratePin} title="Neu generieren">
                  <Icons.Refresh />
                </button>
                <button className="action-btn" onClick={() => pinCopy.copy(pin)} title="Kopieren">
                  <Icons.Copy />
                </button>
              </div>
            </div>

            <div className="strength-section">
              <div className="strength-header">
                <span className="strength-label">PIN-Stärke</span>
                <span className="strength-value" style={{ color: pinStrength.color }}>
                  {pinStrength.text}
                </span>
              </div>
              <div className="strength-bar-container">
                <div className="strength-bar" style={{ width: pinStrength.width, background: pinStrength.color }} />
              </div>
              <div className="crack-time">
                <span className="crack-time-icon"><Icons.Clock /></span>
                <span className="crack-time-text">Zeit zum Knacken:</span>
                <span className="crack-time-value">{formatCrackTime(pinCrackSeconds)}</span>
              </div>
            </div>

            <div className="slider-section">
              <div className="slider-header">
                <span className="slider-title">PIN-Länge</span>
                <div className="slider-value-display">
                  <input
                    type="number"
                    className="slider-input"
                    value={pinLength}
                    min={4}
                    max={18}
                    onChange={e => setPinLength(Math.min(18, Math.max(4, parseInt(e.target.value) || 4)))}
                  />
                  <span className="slider-unit">Ziffern</span>
                </div>
              </div>
              <div className="slider-track">
                <div className="slider-fill" style={{ width: `${((pinLength - 4) / 14) * 100}%` }} />
                <input
                  type="range"
                  className="slider"
                  min={4}
                  max={18}
                  value={pinLength}
                  onChange={e => setPinLength(parseInt(e.target.value))}
                />
              </div>
              <div className="slider-marks">
                <span className="slider-mark">4</span>
                <span className="slider-mark">8</span>
                <span className="slider-mark">12</span>
                <span className="slider-mark">18</span>
              </div>
            </div>

            <div className="multi-section">
              <div className="multi-header">
                <span className="multi-title">Mehrere PINs</span>
                <div className="multi-controls">
                  <div className="count-control">
                    <button className="count-btn" onClick={() => setPinCount(Math.max(1, pinCount - 1))}>
                      <Icons.Minus />
                    </button>
                    <span className="count-display">{pinCount}</span>
                    <button className="count-btn" onClick={() => setPinCount(Math.min(10, pinCount + 1))}>
                      <Icons.Plus />
                    </button>
                  </div>
                  <button className="copy-all-btn" onClick={() => pinCopy.copy(pins.join('\n'))}>
                    <Icons.Copy /> Alle kopieren
                  </button>
                </div>
              </div>
              <div className="password-list">
                {pins.map((p, i) => (
                  <div key={i} className="password-item" onClick={() => pinCopy.copy(p)}>
                    <span className="password-item-num">{i + 1}</span>
                    <span className="password-item-text">{p}</span>
                    <button className="password-item-copy" onClick={e => { e.stopPropagation(); pinCopy.copy(p) }}>
                      <Icons.Copy />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="info-grid">
              <div className="info-item">
                <div className="info-value">{Math.round(pinEntropy)}</div>
                <div className="info-label">Entropie (Bits)</div>
              </div>
              <div className="info-item">
                <div className="info-value">10</div>
                <div className="info-label">Zeichenpool</div>
              </div>
              <div className="info-item">
                <div className="info-value">{formatCombinations(Math.pow(10, pinLength))}</div>
                <div className="info-label">Kombinationen</div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'checker' && (
        <>
          <div className="card">
            <div className="card-title">
              <Icons.Check /> Passwort-Stärke prüfen
            </div>

            <div className="checker-input-wrapper">
              <input
                type={checkerVisible ? 'text' : 'password'}
                className="checker-input"
                placeholder="Passwort eingeben..."
                value={checkerInput}
                onChange={e => setCheckerInput(e.target.value)}
              />
              <button className="toggle-visibility" onClick={() => setCheckerVisible(!checkerVisible)}>
                {checkerVisible ? <Icons.EyeOff /> : <Icons.Eye />}
              </button>
            </div>

            <div className="strength-section">
              <div className="strength-header">
                <span className="strength-label">Passwortstärke</span>
                <span 
                  className={`strength-value ${checkerStrength?.rainbow ? 'rainbow' : ''}`}
                  style={{ color: checkerStrength?.rainbow ? undefined : checkerStrength?.color }}
                >
                  {checkerStrength?.text || '—'}
                </span>
              </div>
              <div className="strength-bar-container">
                <div 
                  className={`strength-bar ${checkerStrength?.rainbow ? 'rainbow' : ''}`}
                  style={{ 
                    width: checkerStrength?.width || '0%',
                    background: checkerStrength?.rainbow ? undefined : checkerStrength?.color
                  }}
                />
              </div>
            </div>

            <div className="char-breakdown">
              <div className={`char-tag ${checkerInput ? 'active' : ''}`}>
                <span className="char-tag-count">{checkerInput.length}</span> Zeichen
              </div>
              <div className={`char-tag ${checkerHasUpper ? 'active' : ''}`}>Großbuchstaben</div>
              <div className={`char-tag ${checkerHasLower ? 'active' : ''}`}>Kleinbuchstaben</div>
              <div className={`char-tag ${checkerHasNumbers ? 'active' : ''}`}>Zahlen</div>
              <div className={`char-tag ${checkerHasSpecial ? 'active' : ''}`}>Sonderzeichen</div>
            </div>

            <div className="checker-stats">
              <div className="checker-stat">
                <div className="checker-stat-value">{checkerInput ? Math.round(checkerEntropy) : 0}</div>
                <div className="checker-stat-label">Entropie</div>
              </div>
              <div className="checker-stat">
                <div className="checker-stat-value">{checkerInput ? checkerPoolSize : 0}</div>
                <div className="checker-stat-label">Pool</div>
              </div>
              <div className="checker-stat">
                <div className="checker-stat-value">{checkerInput ? new Set(checkerInput).size : 0}</div>
                <div className="checker-stat-label">Einzigartig</div>
              </div>
              <div className="checker-stat">
                <div className="checker-stat-value">{checkerInput ? Math.min(100, Math.round(checkerEntropy * 0.8)) : 0}</div>
                <div className="checker-stat-label">Score</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">
              <Icons.Clock /> Zeit zum Knacken (Realistische Szenarien)
            </div>

            <div className="scenarios-grid">
              {[
                { name: 'Online-Angriff (gedrosselt)', desc: 'Webseiten mit Rate-Limiting', speed: '~1.000 Versuche/Sek.', key: 'online' },
                { name: 'Offline-Angriff (schneller Hash)', desc: 'MD5/SHA1 Hash auf normalem PC', speed: '~10 Mrd. Versuche/Sek.', key: 'offlineFast' },
                { name: 'GPU-Cluster (Standard)', desc: 'Professioneller Angriff, bcrypt/scrypt', speed: '~100 Billionen Versuche/Sek.', key: 'gpu' },
                { name: 'Supercomputer / Zukunft', desc: 'Staatliche Ressourcen, ~2030', speed: '~1 Billiarde Versuche/Sek.', key: 'supercomputer' },
              ].map(scenario => (
                <div key={scenario.key} className="scenario-item">
                  <div className="scenario-info">
                    <div className="scenario-name">
                      <Icons.Monitor /> {scenario.name}
                    </div>
                    <div className="scenario-desc">{scenario.desc}</div>
                    <div className="scenario-speed">{scenario.speed}</div>
                  </div>
                  <div className="scenario-time">
                    <div className="scenario-time-value">
                      {checkerInput ? formatCrackTime(checkerCombinations / ATTACK_SPEEDS[scenario.key as keyof typeof ATTACK_SPEEDS] / 2) : '—'}
                    </div>
                    <div className="scenario-time-label">zum Knacken</div>
                  </div>
                </div>
              ))}

              <div className="scenario-item">
                <div className="scenario-info">
                  <div className="scenario-name">
                    <Icons.Info /> Quantencomputer (theoretisch)
                  </div>
                  <div className="scenario-desc">Grover's Algorithmus (√ Speedup)</div>
                  <div className="scenario-speed">Halbiert effektive Entropie</div>
                </div>
                <div className="scenario-time">
                  <div className="scenario-time-value">
                    {checkerInput ? formatCrackTime(Math.pow(2, checkerEntropy / 2) / ATTACK_SPEEDS.supercomputer / 2) : '—'}
                  </div>
                  <div className="scenario-time-label">zum Knacken</div>
                </div>
              </div>
            </div>

            <div className="info-box" style={{ marginTop: '16px' }}>
              <Icons.Info />
              <span>Die Zeiten zeigen den Durchschnitt (50% der Kombinationen). Dein Passwort wird <strong>nicht</strong> gespeichert oder übertragen.</span>
            </div>
          </div>
        </>
      )}

      <footer className="footer">
        <p>Made with ❤️ by <a href="https://github.com/thomasu" target="_blank" rel="noopener noreferrer">Thomas U.</a></p>
        <p style={{ marginTop: '6px' }}>Open Source · MIT Lizenz</p>
      </footer>
    </div>
  )
}

export default App
