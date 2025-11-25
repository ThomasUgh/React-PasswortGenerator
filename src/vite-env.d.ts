/// <reference types="vite/client" />

interface Window {
  electronAPI?: {
    platform: string
    versions: {
      node: string
      chrome: string
      electron: string
    }
  }
}
