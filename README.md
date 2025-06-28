# shazamX-ui — Vite + React Frontend

## Description

`shazamX-ui` is a single-page frontend for audio recognition. Users can upload or record a short audio snippet in the browser, which is then matched against the local `shazamX` backend.

## Key Techniques

- Mic recording using the [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- Audio preview using native [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)[ controls](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
- File transfer via [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- Styled with [Tailwind CSS](https://tailwindcss.com/) and [@tailwindcss/vite](https://tailwindcss.com/docs/guides/vite)
- Built with [Vite](https://vitejs.dev/) for fast development and HMR
- Cross-origin handling to communicate with FastAPI backend at `localhost:8000`

## Non-Obvious Libraries & Fonts

- [`@vitejs/plugin-react-swc`](https://www.npmjs.com/package/@vitejs/plugin-react-swc): fast React compilation with SWC
- [`Tailwind CSS`](https://tailwindcss.com/): utility-first styling
- Fonts used:
  - [Luckiest Guy](https://fonts.google.com/specimen/Luckiest+Guy)
  - [Oi](https://fonts.google.com/specimen/Oi) *(Fonts are imported directly in **``** via **``** and not from **``**)*

## Project Structure

```txt
shazamX-ui/
├── public/
│   └── favicon.png            # Custom tab icon
├── src/
│   ├── App.jsx                # Main UI for drop/record/predict
│   ├── index.css              # Tailwind setup + font imports
│   └── main.jsx               # Vite app entrypoint
```

- `src/App.jsx`: Contains UI elements, logic for recording/uploading audio, and sending it to the backend
- `src/index.css`: Tailwind base setup + font imports
- `public/favicon.png`: Tab icon used for the website

---

This frontend is designed to work with [`shazamX`](../shazamX) as the backend. Make sure both are running locally to complete the pipeline.

