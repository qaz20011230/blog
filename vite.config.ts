import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import fs from 'node:fs'
import path from 'node:path'

function allRoutes() {
  const idxPath = path.resolve('src/content/posts-index.json')
  const idx = JSON.parse(fs.readFileSync(idxPath, 'utf-8'))
  const base = ['/', '/categories', '/books', '/about', '/en', '/en/categories', '/en/books', '/en/about']
  const zh = idx.zh.map((p) => `/post/${p.slug}`)
  const en = idx.en.map((p) => `/en/post/${p.slug}`)
  return [...base, ...zh, ...en]
}

export default defineConfig(({ command }) => ({
  plugins: [
    react({
      babel: {
        // react-dev-locator is a dev-only inspector; keep it out of production
        // builds so it doesn't inject attributes (and leak local paths) into the
        // prerendered HTML.
        plugins: command === 'serve' ? ['react-dev-locator'] : [],
      },
    }),
    tsconfigPaths(),
  ],
  ssgOptions: {
    script: 'async',
    dirStyle: 'nested',
    entry: 'src/main.tsx',
    formatting: 'none',
    includedRoutes() {
      return allRoutes()
    },
  },
}))
