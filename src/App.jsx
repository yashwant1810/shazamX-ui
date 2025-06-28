import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { useEffect, useRef } from "react";

export default function App() {
  const [audioFile, setAudioFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [resultObj, setResultObj] = useState(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("audio")) {
      setAudioFile(file);
      setPrediction("");
      setResultObj(null);
    }
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    recordedChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(recordedChunksRef.current, { type: "audio/wav" });
      const file = new File([audioBlob], "recording.wav", { type: "audio/wav" });
      setAudioFile(file);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const predictAudio = async () => {
    if (!audioFile) return;
    const formData = new FormData();
    formData.append("file", audioFile);

    const res = await fetch("http://127.0.0.1:8000/match", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    const result = data.result;
    if (result && typeof result === "object") {
      const summary = `🎯 ${result.title} by ${result.artist} (${result.album})`;
      setPrediction(summary);
      setResultObj(result);
    } else {
      setPrediction("No match found");
      setResultObj(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 to-black text-white flex flex-col items-center p-6 gap-6">
      <h1 className="main-title">shazam<span style={{ textTransform: 'uppercase' }}>x</span></h1>
      <p className="sub-title">mini shazam by yashwant1810</p>

      <Card className="bg-white/5 backdrop-blur-md p-4 w-full max-w-md text-center mb-6 shadow-lg border-0">
        <CardContent className="drop-zone">
          <label className="cursor-pointer w-full block">
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <div className="flex flex-col items-center justify-center gap-2 bg-white/10 rounded-xl p-6 transition hover:bg-white/20 shadow-inner backdrop-blur">
              <div className="text-3xl">📂</div>
              <div className="text-sm font-medium text-white/90">
                Drop audio file here or click to upload
              </div>
              {audioFile && (
                <div className="text-xs text-emerald-300 mt-2">
                  Selected: {audioFile.name}
                </div>
              )}
            </div>
          </label>
        </CardContent>
      </Card>

      <Card className="bg-white/10 p-4 w-full max-w-md text-center shadow-lg border-0">
        <CardContent className="flex flex-col gap-4 items-center">
          {!recording ? (
            <Button onClick={startRecording} variant="outline">
              🎙️ Record Audio
            </Button>
          ) : (
            <Button onClick={stopRecording} className="bg-red-600 hover:bg-red-700 flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white shadow animate-pulse">
              <span className="w-3 h-3 bg-white rounded-full animate-ping"></span>
              Recording... ⏹️
            </Button>
          )}

          {audioFile && (
            <audio
              controls
              className="w-full rounded-md bg-white/10"
              src={URL.createObjectURL(audioFile)}
            />
          )}
          <Button onClick={predictAudio} disabled={!audioFile} className="w-full bg-emerald-600 hover:bg-emerald-700">
            🔍 Predict
          </Button>

          {prediction && (
            <div className="text-emerald-300 mt-2 font-mono text-sm">🎯 {prediction}</div>
          )}
          {prediction && typeof prediction === "string" && prediction.startsWith("🎯") && resultObj && (
            <div className="flex flex-col items-center gap-14 mt-8">
              {resultObj.spotify_url && (
                <a
                  href={resultObj.spotify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-300 flex items-center gap-2 no-underline"
                >
                  <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png" alt="Spotify" className="h-4 w-auto max-w-[80px] mr-4" />  &nbsp; &nbsp; &nbsp;Check it out on Spotify
                </a>
              )}
              {resultObj.youtube_video_id && (
                <a
                  href={`https://www.youtube.com/watch?v=${resultObj.youtube_video_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-300 flex items-center gap-2 no-underline"
                >
                  <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" className="h-4 w-auto max-w-[80px] mr-4" /> &nbsp; &nbsp; &nbsp; Check it out on YouTube
                </a>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}