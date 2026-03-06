const stage = process.env.SST_STAGE || "dev"

export default {
  url: stage === "production" ? "https://nexode.ai" : `https://${stage}.nexode.ai`,
  console: stage === "production" ? "https://nexode.ai/auth" : `https://${stage}.nexode.ai/auth`,
  email: "contact@anoma.ly",
  socialCard: "https://social-cards.sst.dev",
  github: "https://github.com/iamgrootns/Nexode",
  discord: "https://nexode.ai/discord",
  headerLinks: [
    { name: "app.header.home", url: "/" },
    { name: "app.header.docs", url: "/docs/" },
  ],
}
