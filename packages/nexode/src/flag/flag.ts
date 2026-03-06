function truthy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "true" || value === "1"
}

export namespace Flag {
  export const NEXODE_AUTO_SHARE = truthy("NEXODE_AUTO_SHARE")
  export const NEXODE_GIT_BASH_PATH = process.env["NEXODE_GIT_BASH_PATH"]
  export const NEXODE_CONFIG = process.env["NEXODE_CONFIG"]
  export declare const NEXODE_TUI_CONFIG: string | undefined
  export declare const NEXODE_CONFIG_DIR: string | undefined
  export const NEXODE_CONFIG_CONTENT = process.env["NEXODE_CONFIG_CONTENT"]
  export const NEXODE_DISABLE_AUTOUPDATE = truthy("NEXODE_DISABLE_AUTOUPDATE")
  export const NEXODE_DISABLE_PRUNE = truthy("NEXODE_DISABLE_PRUNE")
  export const NEXODE_DISABLE_TERMINAL_TITLE = truthy("NEXODE_DISABLE_TERMINAL_TITLE")
  export const NEXODE_PERMISSION = process.env["NEXODE_PERMISSION"]
  export const NEXODE_DISABLE_DEFAULT_PLUGINS = truthy("NEXODE_DISABLE_DEFAULT_PLUGINS")
  export const NEXODE_DISABLE_LSP_DOWNLOAD = truthy("NEXODE_DISABLE_LSP_DOWNLOAD")
  export const NEXODE_ENABLE_EXPERIMENTAL_MODELS = truthy("NEXODE_ENABLE_EXPERIMENTAL_MODELS")
  export const NEXODE_DISABLE_AUTOCOMPACT = truthy("NEXODE_DISABLE_AUTOCOMPACT")
  export const NEXODE_DISABLE_MODELS_FETCH = truthy("NEXODE_DISABLE_MODELS_FETCH")
  export const NEXODE_DISABLE_CLAUDE_CODE = truthy("NEXODE_DISABLE_CLAUDE_CODE")
  export const NEXODE_DISABLE_CLAUDE_CODE_PROMPT =
    NEXODE_DISABLE_CLAUDE_CODE || truthy("NEXODE_DISABLE_CLAUDE_CODE_PROMPT")
  export const NEXODE_DISABLE_CLAUDE_CODE_SKILLS =
    NEXODE_DISABLE_CLAUDE_CODE || truthy("NEXODE_DISABLE_CLAUDE_CODE_SKILLS")
  export const NEXODE_DISABLE_EXTERNAL_SKILLS =
    NEXODE_DISABLE_CLAUDE_CODE_SKILLS || truthy("NEXODE_DISABLE_EXTERNAL_SKILLS")
  export declare const NEXODE_DISABLE_PROJECT_CONFIG: boolean
  export const NEXODE_FAKE_VCS = process.env["NEXODE_FAKE_VCS"]
  export declare const NEXODE_CLIENT: string
  export const NEXODE_SERVER_PASSWORD = process.env["NEXODE_SERVER_PASSWORD"]
  export const NEXODE_SERVER_USERNAME = process.env["NEXODE_SERVER_USERNAME"]
  export const NEXODE_ENABLE_QUESTION_TOOL = truthy("NEXODE_ENABLE_QUESTION_TOOL")

  // Experimental
  export const NEXODE_EXPERIMENTAL = truthy("NEXODE_EXPERIMENTAL")
  export const NEXODE_EXPERIMENTAL_FILEWATCHER = truthy("NEXODE_EXPERIMENTAL_FILEWATCHER")
  export const NEXODE_EXPERIMENTAL_DISABLE_FILEWATCHER = truthy("NEXODE_EXPERIMENTAL_DISABLE_FILEWATCHER")
  export const NEXODE_EXPERIMENTAL_ICON_DISCOVERY =
    NEXODE_EXPERIMENTAL || truthy("NEXODE_EXPERIMENTAL_ICON_DISCOVERY")

  const copy = process.env["NEXODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"]
  export const NEXODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT =
    copy === undefined ? process.platform === "win32" : truthy("NEXODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT")
  export const NEXODE_ENABLE_EXA =
    truthy("NEXODE_ENABLE_EXA") || NEXODE_EXPERIMENTAL || truthy("NEXODE_EXPERIMENTAL_EXA")
  export const NEXODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS = number("NEXODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS")
  export const NEXODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX = number("NEXODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX")
  export const NEXODE_EXPERIMENTAL_OXFMT = NEXODE_EXPERIMENTAL || truthy("NEXODE_EXPERIMENTAL_OXFMT")
  export const NEXODE_EXPERIMENTAL_LSP_TY = truthy("NEXODE_EXPERIMENTAL_LSP_TY")
  export const NEXODE_EXPERIMENTAL_LSP_TOOL = NEXODE_EXPERIMENTAL || truthy("NEXODE_EXPERIMENTAL_LSP_TOOL")
  export const NEXODE_DISABLE_FILETIME_CHECK = truthy("NEXODE_DISABLE_FILETIME_CHECK")
  export const NEXODE_EXPERIMENTAL_PLAN_MODE = NEXODE_EXPERIMENTAL || truthy("NEXODE_EXPERIMENTAL_PLAN_MODE")
  export const NEXODE_EXPERIMENTAL_MARKDOWN = truthy("NEXODE_EXPERIMENTAL_MARKDOWN")
  export const NEXODE_MODELS_URL = process.env["NEXODE_MODELS_URL"]
  export const NEXODE_MODELS_PATH = process.env["NEXODE_MODELS_PATH"]

  function number(key: string) {
    const value = process.env[key]
    if (!value) return undefined
    const parsed = Number(value)
    return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined
  }
}

// Dynamic getter for NEXODE_DISABLE_PROJECT_CONFIG
// This must be evaluated at access time, not module load time,
// because external tooling may set this env var at runtime
Object.defineProperty(Flag, "NEXODE_DISABLE_PROJECT_CONFIG", {
  get() {
    return truthy("NEXODE_DISABLE_PROJECT_CONFIG")
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for NEXODE_TUI_CONFIG
// This must be evaluated at access time, not module load time,
// because tests and external tooling may set this env var at runtime
Object.defineProperty(Flag, "NEXODE_TUI_CONFIG", {
  get() {
    return process.env["NEXODE_TUI_CONFIG"]
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for NEXODE_CONFIG_DIR
// This must be evaluated at access time, not module load time,
// because external tooling may set this env var at runtime
Object.defineProperty(Flag, "NEXODE_CONFIG_DIR", {
  get() {
    return process.env["NEXODE_CONFIG_DIR"]
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for NEXODE_CLIENT
// This must be evaluated at access time, not module load time,
// because some commands override the client at runtime
Object.defineProperty(Flag, "NEXODE_CLIENT", {
  get() {
    return process.env["NEXODE_CLIENT"] ?? "cli"
  },
  enumerable: true,
  configurable: false,
})
