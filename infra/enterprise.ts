import { SECRET } from "./secret"
import { domain, shortDomain } from "./stage"

const storage = new sst.cloudflare.Bucket("EnterpriseStorage")

const teams = new sst.cloudflare.x.SolidStart("Teams", {
  domain: shortDomain,
  path: "packages/enterprise",
  buildCommand: "bun run build:cloudflare",
  environment: {
    NEXODE_STORAGE_ADAPTER: "r2",
    NEXODE_STORAGE_ACCOUNT_ID: sst.cloudflare.DEFAULT_ACCOUNT_ID,
    NEXODE_STORAGE_ACCESS_KEY_ID: SECRET.R2AccessKey.value,
    NEXODE_STORAGE_SECRET_ACCESS_KEY: SECRET.R2SecretKey.value,
    NEXODE_STORAGE_BUCKET: storage.name,
  },
})
