<p align="center">
  <a href="https://nexode.ai">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="Nexode logo">
    </picture>
  </a>
</p>
<p align="center">The open source, Mobile-First AI coding agent.</p>
<p align="center">
  <a href="https://github.com/iamgrootns/Nexode/actions/workflows/publish.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/iamgrootns/Nexode/publish.yml?style=flat-square&branch=dev" /></a>
</p>

[![Nexode Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://github.com/iamgrootns/Nexode)

---

### What is Nexode?
Nexode is a powerful, **mobile-first** AI coding agent designed to let you build, edit, and run code directly from your smartphone. Instead of being tied to a desktop, Nexode brings the full power of an AI software engineer to your pocket.

---

### Installation (Android via Termux)

To run Nexode perfectly on your Android device, you'll need a Linux environment. We use **Termux** and **proot-distro** to create a seamless Ubuntu container.

```bash
# 1. Update Termux base system
apt update && apt upgrade -y 

# 2. Install proot-distro, git, and curl
pkg install proot-distro git curl wget -y

# 3. Install and login to Ubuntu environment
proot-distro install ubuntu 
proot-distro login ubuntu 

# 4. Inside Ubuntu, install Bun (the required runtime)
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
export PATH="/root/.bun/bin:$PATH"

# 5. Clone Nexode and install dependencies
git clone https://github.com/iamgrootns/Nexode.git
cd Nexode
bun install

# 6. Run Nexode!
bun run dev
```

> [!TIP]
> If you want to use the `nexode` command globally anywhere in Ubuntu, run `bun run build` followed by `bun link` inside the Nexode folder!

### Desktop Installation (macOS / Linux / Windows)

Nexode also works flawlessly on Desktop environments. Just clone and run:
```bash
git clone https://github.com/iamgrootns/Nexode.git
cd Nexode
bun install
bun run dev
```

### Using Free AI Models (Groq / Gemini)

By default, Nexode is engineered to prioritize **Free APIs** so you don't have to pay for expensive subscriptions:
1. Run Nexode.
2. Select **Groq** (Fast open-source models) or **Google** (Gemini models) from the setup menu.
3. Paste your free API key, and you're good to go! Bring your own key, no server lock-in.

---

### Agents

Nexode includes two built-in agents you can switch between with the `Tab` key.

- **build** - Default, full-access agent for development work.
- **plan** - Read-only agent for analysis and code exploration.

### Building on Nexode

If you are working on a project that's related to Nexode and is using "nexode" as part of its name, for example "nexode-dashboard", please add a note to your README to clarify that it is not built by the Nexode core team and is not affiliated with us in any way.

---

**Join our community on GitHub!**
