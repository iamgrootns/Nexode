// Pixel art preview — run with: bun pixel-preview.ts
// Each char in the grid = 1 pixel. Pairs of rows render as one terminal row using ▀ (top=fg, bot=bg)

const E = '\x1b'
const RST = `${E}[0m`
const fg = (r: number, g: number, b: number) => `${E}[38;2;${r};${g};${b}m`
const bg = (r: number, g: number, b: number) => `${E}[48;2;${r};${g};${b}m`

// ── Palette ──────────────────────────────────────────────────────────────────
const PAL: Record<string, [number,number,number]> = {
  '.': [6,  6,  18],   // night sky
  ',': [12, 12, 35],   // sky mid
  ':': [18, 18, 50],   // sky light
  '*': [50, 33, 14],   // cliff dark
  '=': [70, 46, 20],   // cliff mid
  '+': [90, 60, 25],   // cliff light
  // Naruto
  'Y': [230,185,  0],  // yellow hair
  'y': [200,155,  0],  // hair shadow
  'F': [225,160, 90],  // face/skin
  'f': [195,130, 70],  // skin shadow
  'O': [215, 80,  5],  // orange jacket
  'o': [175, 55,  0],  // jacket shadow
  'B': [235,200,100],  // belt/trim
  'W': [240,240,240],  // white eyes/headband
  'b': [80, 80, 120],  // dark blue headband plate
  // Rasengan
  'R': [80, 170,255],  // rasengan blue
  'r': [180,220,255],  // rasengan core
  'G': [255,255,200],  // clash glow center
  // Sasuke
  'H': [18,  18, 55],  // dark hair
  'h': [30,  30, 80],  // hair mid
  'S': [35,  40, 95],  // dark blue suit
  's': [55,  65,140],  // suit mid
  'w': [180,180,220],  // sasuke white collar
  // Chidori
  'P': [140, 50,230],  // purple chidori
  'p': [190,110,255],  // chidori bright
  'L': [230,210,255],  // lightning white
}

// ── Scene: Naruto (left) vs Sasuke (right), 48 wide × 28 tall pixels ─────────
// 48 chars wide, renders as 14 char rows
const SCENE = [
//       0         1         2         3         4
//       0123456789012345678901234567890123456789012345678
/* 00 */ '................................................',
/* 01 */ '................................................',
/* 02 */ '......YYY...............................HHH......',
/* 03 */ '.....YYYYY...............................HHHH....',
/* 04 */ '.....yYYYy.......rRRr........pPp.........hHHHh..',
/* 05 */ '.....YFFFY......rRRRRr.....pPPPp.........HwwH...',
/* 06 */ '.....FOOOf......RRRRRG.....GPPPp.........SSSSH..',
/* 07 */ '....fOOOOOf....RRRRGGG...GGGPPP..........sSSSSh.',
/* 08 */ '....OOOBOOo....rRRGGGG...GGGGPPr.........SSSSSH.',
/* 09 */ '....OOOoOOo.....rRGGGG...GGGPpr..........SSSSSh.',
/* 10 */ '.....OOoOOo......RGGG.....GGGPr...........SSSSs..',
/* 11 */ '.....fOOfOf..............GGG...............sSSs...',
/* 12 */ '......oOoff............GGGGG................Ss....',
/* 13 */ '...*....oO..............GGG...................S...*',
/* 14 */ '..***..*ooo...........................*.....***..*',
/* 15 */ '.*****.****.........................***....*****.*',
/* 16 */ '======*===**......................****...**=======',
/* 17 */ '========***=....................*****..==========',
/* 18 */ '=============..........=....*=*****==============',
/* 19 */ '==================================================',
/* 20 */ '**************************************************',
/* 21 */ '**************************************************',
/* 22 */ '**................................................**',
/* 23 */ '**................................................**',
/* 24 */ '**................................................**',
/* 25 */ '**................................................**',
/* 26 */ '**................................................**',
/* 27 */ '**................................................**',
]

function renderPixelArt(rows: string[]): string {
  const BG_DEF: [number,number,number] = [6, 6, 18]
  let out = ''
  for (let row = 0; row < rows.length - 1; row += 2) {
    const topRow = rows[row]
    const botRow = rows[row + 1]
    for (let col = 0; col < topRow.length; col++) {
      const topKey = topRow[col]
      const botKey = botRow?.[col] ?? '.'
      const [tr, tg, tb] = PAL[topKey] ?? BG_DEF
      const [br, bg2, bb] = PAL[botKey] ?? BG_DEF
      out += fg(tr, tg, tb) + bg(br, bg2, bb) + '▀'
    }
    out += RST + '\n'
  }
  return out
}

// ── VS flash label between characters ─────────────────────────────────────────
const VS_LINE = `  ${E}[38;2;255;80;0m${E}[1m⚡ NARUTO ${E}[38;2;255;255;255mvs${E}[38;2;140;50;230m SASUKE ⚡${RST}`

// ── Render ────────────────────────────────────────────────────────────────────
process.stdout.write('\n')
process.stdout.write(renderPixelArt(SCENE))
process.stdout.write('\n' + ' '.repeat(14) + VS_LINE + '\n\n')
process.stdout.write(`  ${E}[38;2;200;200;200mThis is a preview. Pixel art will appear above the logo when you open nex.${RST}\n\n`)
