import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const FaceLogin = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("Carregando modelos...");
  const [registeredDescriptor, setRegisteredDescriptor] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // Pasta onde estão os modelos treinados

      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

      setStatus("Modelos carregados! Iniciando câmera...");
      startVideo();
    };

    loadModels();

    // Carregar o rosto salvo no localStorage
    const storedFace = localStorage.getItem("faceDescriptor");
    if (storedFace) {
      setRegisteredDescriptor(new Float32Array(JSON.parse(storedFace)));
      setStatus("Face registrada. Tente logar.");
    }
  }, []);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err);
      setStatus("Erro ao acessar a câmera");
    }
  };

  const registerFace = async () => {
    setStatus("Registrando face...");
    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detections) {
      const descriptor = Array.from(detections.descriptor);
      localStorage.setItem("faceDescriptor", JSON.stringify(descriptor));
      setRegisteredDescriptor(new Float32Array(descriptor));
      setStatus("Face registrada com sucesso! Agora você pode logar.");
    } else {
      setStatus("Nenhum rosto detectado. Tente novamente.");
    }
  };

  const loginWithFace = async () => {
    if (!registeredDescriptor) {
      setStatus("Nenhuma face registrada. Por favor, registre primeiro.");
      return;
    }

    setStatus("Verificando rosto...");
    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detections) {
      const distance = faceapi.euclideanDistance(detections.descriptor, registeredDescriptor);

      if (distance < 0.6) {
        setStatus("✅ Login bem-sucedido! Seja bem-vindo!");
      } else {
        setStatus("❌ Rosto não reconhecido! Tente novamente.");
      }
    } else {
      setStatus("Nenhum rosto detectado.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Login por Reconhecimento Facial</h2>
      <p>{status}</p>

      <div style={{ position: "relative", display: "inline-block" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{ width: "640px", height: "480px", borderRadius: "10px" }}
        />
        <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={registerFace} style={{ marginRight: "10px", padding: "10px" }}>
          Registrar Face
        </button>
        <button onClick={loginWithFace} style={{ padding: "10px" }}>
          Fazer Login
        </button>
      </div>
    </div>
  );
};

export default FaceLogin;
