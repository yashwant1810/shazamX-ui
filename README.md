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

--- 

## Using the Frontend with ngrok-Exposed Backend

If you're hosting the frontend on Vercel and running the backend (`shazamX`) locally, follow these steps to connect them using [ngrok](https://ngrok.com/):

### 1. Expose your backend with ngrok

Start your FastAPI server:
```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

Then in another terminal:
```bash
ngrok http 8000
```

Copy the generated URL (e.g. `https://xyz.ngrok-free.app`).

### 2. Add backend URL in Vercel

Go to your Vercel project dashboard:

- Navigate to **Settings → Environment Variables**
- Add:
  - **Key**: `VITE_BACKEND_URL`
  - **Value**: your `https://xyz.ngrok-free.app` from step 1
  - **Environment**: `Production` (and optionally `Preview`)

Then redeploy your Vercel app for the changes to take effect.

### 3. Enable CORS on the backend

Ensure your `shazamX` FastAPI backend has this in `main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to ["https://your-vercel-domain.vercel.app"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

With this setup, your Vercel-hosted frontend will successfully connect to your locally running backend via ngrok.

