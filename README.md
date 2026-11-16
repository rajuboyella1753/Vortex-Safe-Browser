# 🛡️ Vortex Browser

**Vortex Browser** is a secure, lightweight, and modern desktop web browser built using **Electron.js** and **Node.js**. It features built-in strict 18+ content filtering, a network-level adblocker, a dynamic theme customizer, persistent tabs, and a side-panel downloads manager.

---

## 🚀 Key Features

* **🛡️ Advanced Security & Content Filtering:** 
  * Strict network-level and keyword-based filtering that blocks restricted 18+ adult content and redirects users to a secure custom warning page (`blocked.html`).
  * Built-in ad-blocking domain rules to filter out tracking scripts and unwanted advertisements.
* **📂 Side-Panel Downloads Manager:** 
  * Live download progress tracking with toast notifications and a dedicated side-panel list to monitor active downloads.
  * Quick access button to open the system downloads folder directly.
* **💾 Persistent Tabs (Local Storage):** 
  * Automatically saves your open tabs and browsing sessions using local storage, restoring them seamlessly even after restarting the browser.
* **💾 Webpage Saving Utility:** 
  * Save any active webpage locally in complete HTML format (`.html`) using a native save dialog.
* **🎨 Dynamic Theme Customizer:** 
  * Switch between multiple modern themes on-the-fly (Dark Modern, Cyberpunk Neon Blue, Emerald Forest, Sunset Orange, and Clean Light Mode).
* **🌐 Built-in Page Translator:** 
  * Instant webpage translation support for multiple languages (Telugu, Hindi, Spanish, French, etc.).
* **🕵️ Incognito Mode:** 
  * Secure browsing sessions with isolated data partitions and cache clearing.

---

## 🛠️ Tech Stack

* **Core Framework:** [Electron.js](https://www.electronjs.org/) (Node.js & Chromium)
* **Frontend UI:** HTML5, CSS3, JavaScript (Glassmorphism & Modern CSS Variables)
* **Build & Packaging:** `electron-builder` (for Windows `.exe` NSIS installer generation)
* **Development Reload:** `electron-reload`

---

## 📦 Project Setup & Installation

Follow these steps to run Vortex Browser locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/vortex-browser.git](https://github.com/your-username/vortex-browser.git)
   cd vortex-browser