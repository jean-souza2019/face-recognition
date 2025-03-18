import { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = "http://localhost:3000/api"; // URL base da API

const useFaceModels = () => {
  const [status, setStatus] = useState("Carregando modelos...");
  const modelsLoaded = useRef(false); // Evita recarregamento desnecessário
  const [modelsReady, setModelsReady] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      if (modelsLoaded.current) {
        setStatus("Modelos já carregados.");
        return;
      }

      setStatus("Carregando modelos da API...");

      try {
        console.log("🔍 Iniciando carregamento dos modelos...");

        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(`${API_URL}/models/tiny_face_detector_model-weights_manifest.json`),
          faceapi.nets.faceLandmark68Net.loadFromUri(`${API_URL}/models/face_landmark_68_model-weights_manifest.json`),
          faceapi.nets.faceRecognitionNet.loadFromUri(`${API_URL}/models/face_recognition_model-weights_manifest.json`),
        ]);

        console.log("✅ Modelos carregados com sucesso!");
        modelsLoaded.current = true;
        setModelsReady(true);
        setStatus("✅ Modelos carregados e prontos para uso.");
      } catch (error) {
        console.error("❌ Erro ao carregar os modelos:", error);
        setStatus("❌ Erro ao carregar os modelos.");
      }
    };

    loadModels();
  }, []);

  return { status, modelsReady };
};

export default useFaceModels;
