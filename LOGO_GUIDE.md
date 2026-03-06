# Nexode Logo Guide

Everything needed to change the logo, rebuild, and deploy to Android.

---

## The Only File That Matters

```
packages/nexode/src/cli/logo.ts
```

---

## Current Logo (NEX / ODE)

```typescript
export const logo = {
  left: ["                   ", "█▀▀▄ █▀▀█ ▄▀▀▄     ", "█__█ █^^^ ▐__▌     ", "▀▀▀▀ ▀▀▀▀ ▀~~▀     "],
  right: ["        ▄          ", "█▀▀█ █▀▀▄ █▀▀█     ", "█__█ █__█ █^^^     ", "▀▀▀▀ ▀▀▀▀ ▀▀▀▀     "],
}

export const marks = "_^~"
```

- `left[]`  = "NEX" — rendered in **gray** (textMuted), not bold
- `right[]` = "ODE" — rendered in **white** (text), bold
- 4 rows per side, each row must be the same length (19 chars)
- Letters are 4 chars wide, separated by 1 space

---

## How the Character System Works

### Regular chars (fg color, no bg needed)
| Char | What it looks like |
|------|--------------------|
| `█`  | Full solid block |
| `▀`  | Upper half block |
| `▄`  | Lower half block |
| `▌`  | Left half block |
| `▐`  | Right half block |

### Shadow marks — defined in `marks = "_^~"`
These use the terminal's **background color** for depth effect.
`shadow = tint(background, fgColor, 0.25)` — a 25% tinted dark version of the letter color.

| Mark | Renders as | fg | bg |
|------|-----------|----|----|
| `_`  | space     | fg | shadow |
| `^`  | `▀`       | fg | shadow |
| `~`  | `▀`       | shadow | none |

**On mobile terminals**: shadow bg may render as transparent/invisible. Design letters so they're recognizable even without the shadow effect.

---

## Letter Patterns (4 chars wide × 3 rows)

Each letter uses rows 2, 3, 4 (row 1 is blank or accent).

### Current letter patterns

```
N:  █▀▀▄  /  █__█  /  ▀▀▀▀
    top diagonal right    two bars + shadow inside    bottom bar

E:  █▀▀█  /  █^^^  /  ▀▀▀▀
    top bar both sides    left bar + mid horizontal (shadow halves)    bottom bar

X:  ▄▀▀▄  /  ▐__▌  /  ▀~~▀
    X top legs    right-half + shadow + shadow + left-half    X bottom legs (shadow halves in middle)

O:  █▀▀█  /  █__█  /  ▀▀▀▀
    both bars top    both bars + hollow shadow inside    bottom bar

D:  █▀▀▄  /  █__█  /  ▀▀▀▀
    left bar + curve hint    both bars + shadow    bottom bar
    (looks like N but used for D — acceptable in block art)

E:  █▀▀█  /  █^^^  /  ▀▀▀▀
    (same as left-side E)
```

### Accent dot
`right[0]` has a small `▄` accent. It sits above D's rightmost character (position 8):
```
right[0]: "        ▄          "
           0123456789...
```
Row 2 D starts at position 5: `"█▀▀█ █▀▀▄ █▀▀█     "` — `▄` at position 8 aligns with accent.

---

## How to Change the Logo

### Option A — Different word (e.g., rename brand)
Edit `logo.ts`. Use the letter reference below.

**Letter library** (4-wide, proven patterns):
```
A:  ▄▀▀▄  /  ████  /  █  █     (approximate)
B:  ███   /  ███   /  ███      (approximate)
C:  █▀▀▀  /  █___  /  ▀▀▀▀
D:  █▀▀▄  /  █__█  /  ▀▀▀▀
E:  █▀▀█  /  █^^^  /  ▀▀▀▀
F:  ████  /  █^^^  /  █
G:  █▀▀▀  /  █_██  /  ▀▀▀▀
H:  █__█  /  ████  /  █  █
I:   ██   /   █    /   ██      (thin)
K:  █▄▀   /  ███   /  █ ▀█
L:  █     /  █     /  ████
M:  █▄▄█  /  █  █  /  █  █
N:  █▀▀▄  /  █__█  /  ▀▀▀▀
O:  █▀▀█  /  █__█  /  ▀▀▀▀
P:  ███▀  /  ███   /  █
Q:  █▀▀█  /  █_▄█  /  ▀▀▀▀
R:  ███▀  /  ███   /  █  █
S:  ▀▀▀█  /  ^^^^  /  █▀▀▀
T:  ████  /  _█_   /  _█_
U:  █__█  /  █__█  /  ▀▀▀▀
V:  █  █  /  █  █  /   ▀▀
W:  █  █  /  █▄▄█  /  ▀▀▀▀
X:  ▄▀▀▄  /  ▐__▌  /  ▀~~▀
Y:  █__█  /  _██_  /  _██_
Z:  ▀▀▀█  /  _█__  /  █▀▀▀
```

### Option B — Different style entirely
Replace all 4 rows. Rules:
- All rows in `left[]` must be same length
- All rows in `right[]` must be same length
- Both sides should have matching row count (currently 4)
- Keep `marks = "_^~"` unless you remove shadow marks from patterns

---

## Rebuild After Changing

```bash
cd /home/groot/Nexode_light/cody_fresh/packages/nexode
bun run build
```

Binary output: `dist/nexode-linux-arm64/bin/nex` (~151MB)

Build takes ~2 minutes.

---

## Deploy to Android Phone (ADB)

### Step 1 — Push to sdcard
```bash
adb push \
  /home/groot/Nexode_light/cody_fresh/packages/nexode/dist/nexode-linux-arm64/bin/nex \
  /sdcard/Download/nex
```

### Step 2 — Install from Termux (run on phone)
Open Termux app and run:
```bash
cp /sdcard/Download/nex \
  /data/data/com.termux/files/usr/var/lib/proot-distro/installed-rootfs/ubuntu/root/bin/nex

chmod +x \
  /data/data/com.termux/files/usr/var/lib/proot-distro/installed-rootfs/ubuntu/root/bin/nex
```

Or if already inside Ubuntu proot:
```bash
cp /root/storage/downloads/nex /root/bin/nex
chmod +x /root/bin/nex
```

### Step 3 — Test
Inside Ubuntu proot:
```bash
nex
# or
nex --help
```

---

## Logo Renderer Location

The component that renders logo.ts:
```
packages/nexode/src/cli/cmd/tui/component/logo.tsx
```

Key logic:
- `logo.left[]` rendered in `theme.textMuted` (gray), not bold
- `logo.right[]` rendered in `theme.text` (white/bright), bold
- Shadow computed as: `tint(theme.background, fg, 0.25)`
- Marks parsed left-to-right, one char at a time

---

## Theme (Orange Color)

The default theme that controls colors:
```
packages/nexode/src/cli/cmd/tui/context/theme/nexode.json
```

Primary orange color (dark mode): `"darkStep9": "#E8692A"`
To change the accent color, edit `darkStep9` hex value.

---

## Quick Reference — Full Change-Build-Deploy Cycle

```bash
# 1. Edit logo
nano /home/groot/Nexode_light/cody_fresh/packages/nexode/src/cli/logo.ts

# 2. Build
cd /home/groot/Nexode_light/cody_fresh/packages/nexode && bun run build

# 3. Push to phone
adb push dist/nexode-linux-arm64/bin/nex /sdcard/Download/nex

# 4. On phone (Termux):
# cp /sdcard/Download/nex /data/data/com.termux/files/usr/var/lib/proot-distro/installed-rootfs/ubuntu/root/bin/nex && chmod +x /data/data/com.termux/.../nex
```
