// Character sets
export const charSets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  special: '!@#$%^&*()_+-=[]{}|;:,.<>?/~`',
  umlauts: 'ÄÖÜäöüß',
  brackets: '()[]{}⟨⟩',
  spaces: ' '
}

export const similarChars = 'O0Il1|'

// Word lists
export const englishWords = [
  'apple','arrow','badge','beach','brain','bread','brick','bridge','brush','cable',
  'camel','candy','chair','chalk','charm','chess','chest','child','claim','class',
  'clock','cloud','coach','coast','coral','craft','crane','cream','crown','dance',
  'diary','draft','drain','dream','dress','drink','drive','earth','ember','empty',
  'equal','event','faith','feast','fence','field','flame','flash','floor','flower',
  'focus','force','frame','frost','fruit','ghost','glass','globe','grace','grain',
  'grape','grass','green','guard','guide','happy','heart','heavy','horse','house',
  'human','image','index','inner','input','judge','juice','knife','label','lance',
  'laser','layer','learn','lemon','level','light','limit','linen','liver','logic',
  'lunch','magic','major','maker','maple','march','match','medal','media','melon',
  'metal','meter','minor','model','money','month','motor','mount','mouse','music',
  'nerve','night','noble','noise','north','nurse','ocean','offer','olive','opera',
  'orbit','order','organ','other','outer','owner','paint','panel','paper','party',
  'pasta','patch','peace','pearl','phase','phone','photo','piano','piece','pilot',
  'pitch','place','plain','plane','plant','plate','plaza','point','polar','pound',
  'power','press','price','pride','prime','print','prize','proof','proud','pulse',
  'punch','queen','quiet','quote','radar','radio','raise','range','rapid','ratio',
  'reach','ready','realm','rebel','refer','reign','relax','reply','rider','ridge',
  'right','river','robot','rocky','royal','ruler','rural','salad','scale','scene',
  'scope','score','scout','sense','serve','shade','shake','shape','share','shark',
  'sharp','sheep','shell','shift','shine','shirt','shock','shore','short','sight',
  'sigma','silly','skill','slate','sleep','slice','slide','slope','smart','smile',
  'smoke','snake','solar','solid','solve','sonic','sound','south','space','spare',
  'spark','speak','speed','spend','spice','spine','spirit','split','sport','spray',
  'squad','stack','staff','stage','stake','stamp','stand','start','state','steam',
  'steel','steep','stick','still','stock','stone','store','storm','story','stove',
  'strip','study','style','sugar','suite','sunny','super','surge','sweet','swift',
  'swing','sword','table','taste','teach','tempo','theme','think','thorn','tiger',
  'title','toast','today','token','tooth','topic','total','touch','tower','trace',
  'track','trade','trail','train','trash','treat','trend','trial','tribe','trick',
  'truck','truly','trump','trunk','trust','truth','tulip','ultra','uncle','under',
  'union','unity','upper','urban','usual','valid','value','vault','verse','video',
  'vigor','viral','virus','visit','vital','vivid','vocal','voice','watch','water',
  'whale','wheat','wheel','white','whole','width','world','worry','worth','wound',
  'wrist','write','wrong','yacht','young','youth','zebra','zesty'
]

export const germanWords = [
  'Ahorn','Ampel','Anker','Apfel','Arbeit','Asche','Bach','Baum','Berg','Bild',
  'Blatt','Blick','Blitz','Blume','Boden','Braut','Brief','Brise','Brot','Bruch',
  'Dach','Dampf','Degen','Docht','Drang','Draht','Dreck','Druck','Dunst','Eiche',
  'Eimer','Engel','Ernte','Faden','Fahne','Farbe','Feder','Feier','Feind','Feld',
  'Ferne','Feuer','Fisch','Fleck','Flucht','Fluss','Form','Frost','Fuchs','Gabel',
  'Gasse','Geist','Glanz','Glas','Gleis','Glied','Gnade','Gold','Grube','Grund',
  'Hafen','Halle','Hals','Hammer','Hand','Harfe','Hauch','Haupt','Haus','Haut',
  'Hebel','Hecke','Heide','Heim','Held','Hemd','Herbst','Herde','Herz','Hilfe',
  'Hirte','Hobel','Honig','Hose','Huhn','Hund','Insel','Junge','Kabel','Kaffee',
  'Kampf','Kanal','Karte','Kater','Kegel','Keller','Kerze','Kette','Kind','Kinn',
  'Kiste','Klang','Kleid','Klotz','Knabe','Knochen','Knopf','Kohle','Kopf','Korb',
  'Kraft','Kranz','Kreis','Kreuz','Krone','Kunst','Kugel','Lampe','Lanze','Laub',
  'Leben','Leder','Lehre','Leier','Licht','Liebe','Linie','Liste','Liter','Loch',
  'Luft','Macht','Magen','Markt','Mauer','Meile','Meise','Menge','Milch','Monat',
  'Motte','Mund','Musik','Nagel','Natur','Nebel','Neid','Nerv','Nest','Netz',
  'Norden','Nudel','Ofen','Osten','Palme','Pappe','Paste','Pfahl','Pfand','Pfeil',
  'Pflug','Phase','Platz','Pokal','Preis','Prinz','Probe','Punkt','Quelle','Rache',
  'Rahmen','Rand','Rasen','Ratte','Rauch','Raum','Regal','Regen','Reich','Reise',
  'Rinde','Ring','Rohr','Rose','Rumpf','Sache','Saft','Salat','Salz','Sand',
  'Satz','Schaf','Schal','Schatz','Schein','Schiff','Schlaf','Schloss','Schnee','Schrank',
  'Schuh','Seele','Segel','Seide','Seife','Seil','Seite','Sicht','Sieb','Sitz',
  'Socke','Sommer','Sonne','Sorge','Spiel','Spinne','Stadt','Stahl','Stamm','Stand',
  'Staub','Steg','Stein','Stern','Stich','Stiel','Stirn','Stock','Stoff','Strand',
  'Stroh','Stuck','Stuhl','Sturm','Suche','Sumpf','Tafel','Tal','Tanne','Tanz',
  'Tasche','Tasse','Taube','Tee','Teich','Teil','Teller','Tier','Tinte','Tisch',
  'Titel','Topf','Traum','Treue','Tritt','Tropf','Truhe','Tuch','Turm','Ufer',
  'Uhr','Wald','Wand','Wange','Ware','Wasser','Watte','Wecker','Wein','Weise',
  'Welle','Welt','Werk','Wert','Wesen','Weste','Wiese','Wille','Wind','Woche',
  'Wolke','Wort','Wunde','Wurm','Wurzel','Zahl','Zahn','Zaun','Zeile','Zeit',
  'Zelle','Ziege','Ziel','Zimmer','Zinn','Zopf','Zucht','Zucker','Zunge','Zweig'
]

// Generate random string
export function generateRandomString(chars: string, length: number): string {
  const array = new Uint32Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, x => chars[x % chars.length]).join('')
}

// Generate password
export function generatePassword(
  length: number,
  options: {
    uppercase: boolean
    lowercase: boolean
    numbers: boolean
    special: boolean
    umlauts: boolean
    brackets: boolean
    spaces: boolean
    excludeSimilar: boolean
  }
): string {
  let chars = ''
  if (options.uppercase) chars += charSets.uppercase
  if (options.lowercase) chars += charSets.lowercase
  if (options.numbers) chars += charSets.numbers
  if (options.special) chars += charSets.special
  if (options.umlauts) chars += charSets.umlauts
  if (options.brackets) chars += charSets.brackets
  if (options.spaces) chars += charSets.spaces
  
  if (options.excludeSimilar) {
    chars = chars.split('').filter(c => !similarChars.includes(c)).join('')
  }
  
  if (!chars) {
    chars = charSets.lowercase + charSets.uppercase + charSets.numbers
  }
  
  return generateRandomString(chars, length)
}

// Generate passphrase
export function generatePassphrase(
  wordCount: number,
  options: {
    capitalize: boolean
    hyphen: boolean
    underscore: boolean
    space: boolean
    addNumbers: boolean
    addSpecial: boolean
    germanWords: boolean
  }
): string {
  const wordlist = options.germanWords ? germanWords : englishWords
  const array = new Uint32Array(wordCount)
  crypto.getRandomValues(array)
  
  const words = Array.from(array).map(n => {
    let word = wordlist[n % wordlist.length]
    if (options.capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    } else {
      word = word.toLowerCase()
    }
    if (options.addNumbers && Math.random() > 0.5) {
      word += Math.floor(Math.random() * 100)
    }
    if (options.addSpecial && Math.random() > 0.5) {
      word += '!@#$%&*'[Math.floor(Math.random() * 7)]
    }
    return word
  })
  
  let separator = ''
  if (options.hyphen) separator = '-'
  else if (options.underscore) separator = '_'
  else if (options.space) separator = ' '
  
  return words.join(separator)
}

// Generate PIN
export function generatePin(length: number): string {
  return generateRandomString('0123456789', length)
}

// Get pool size from options
export function getPoolSize(options: {
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  special: boolean
  umlauts: boolean
  brackets: boolean
  spaces: boolean
  excludeSimilar: boolean
}): number {
  let size = 0
  if (options.uppercase) size += 26
  if (options.lowercase) size += 26
  if (options.numbers) size += 10
  if (options.special) size += 32
  if (options.umlauts) size += 7
  if (options.brackets) size += 8
  if (options.spaces) size += 1
  
  if (options.excludeSimilar) {
    // Remove similar characters count
    let removed = 0
    if (options.uppercase) removed += 2 // O, I
    if (options.lowercase) removed += 1 // l
    if (options.numbers) removed += 2 // 0, 1
    if (options.special) removed += 1 // |
    size -= removed
  }
  
  return size || 62 // Default fallback
}
