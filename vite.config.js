import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import invitation from './scripts/invitation-plugin.js'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  // GitHub Pages serves the site under /<repo-name>/ — the deploy workflow sets BASE_PATH.
  base: process.env.BASE_PATH || '/',
  // Your own pictures (e.g. the map image) go into the "assets" folder.
  publicDir: 'assets',
  plugins: [react(), invitation({ file: path.join(root, 'invitation.yaml') })],
})
