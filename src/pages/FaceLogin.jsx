/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import useFaceAuth from "../hooks/useFaceAuth";
import useFaceModels from "../hooks/useFaceModels"; // ✅ Importando o novo hook

const FaceLogin = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const { status, setStatus, registerFace, verifyFace } = useFaceAuth();
  const { modelsReady, status: modelStatus } = useFaceModels(); // ✅ Usando o hook para carregar os modelos da API

  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [login, setLogin] = useState("");

  /**
   * ✅ Obtém a lista de dispositivos de vídeo
   */
  const getDevices = async () => {
    try {
      const mediaDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = mediaDevices.filter(device => device.kind === "videoinput");
      setDevices(videoDevices);

      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    } catch (error) {
      console.error("Erro ao listar dispositivos:", error);
    }
  };

  /**
   * ✅ Inicia a câmera
   */
  const startVideo = async (deviceId) => {
    try {
      stopVideo(); // Garante que a câmera anterior seja desligada antes de abrir uma nova

      const constraints = {
        video: deviceId ? { deviceId: { exact: deviceId } } : true,
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = newStream; // Salva a stream ativa

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }

      // Atualiza a lista de dispositivos APÓS a permissão ser concedida
      setTimeout(getDevices, 1000);

      setStatus("Câmera iniciada! Posicione seu rosto na tela.");
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err);
      setStatus("Erro ao acessar a câmera.");
    }
  };

  /**
   * ✅ Desliga a câmera
   */
  const stopVideo = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setStatus("Câmera desligada.");
    }
  };

  /**
   * ✅ Captura a face do usuário para registro
   */
  const handleRegisterFace = async () => {
    if (!login) {
      setStatus("❌ Digite seu login antes de registrar!");
      return;
    }

    setStatus("Capturando face...");

    if (!videoRef.current || videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
      setStatus("❌ Erro: Nenhuma imagem válida capturada.");
      return;
    }

    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detections) {
      const descriptor = Array.from(detections.descriptor);
      await registerFace(login, descriptor);
    } else {
      setStatus("Nenhum rosto detectado. Tente novamente.");
    }
  };

  /**
   * ✅ Realiza o login via reconhecimento facial
   */
  const handleLoginWithFace = async () => {
    if (!login) {
      setStatus("❌ Digite seu login antes de logar!");
      return;
    }

    setStatus("Verificando rosto...");

    if (!videoRef.current || videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
      setStatus("❌ Erro: Nenhuma imagem válida capturada.");
      return;
    }

    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detections) {
      const descriptor = Array.from(detections.descriptor);
      await verifyFace(login, descriptor);
    } else {
      setStatus("Nenhum rosto detectado.");
    }
  };

  /**
   * ✅ Garante que a câmera será desligada ao sair do componente
   */
  useEffect(() => {
    return () => {
      stopVideo();
    };
  }, []);

  if (!modelsReady) {
    return <p>{modelStatus}</p>; // ✅ Aguarda os modelos carregarem antes de exibir a interface
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Login por Reconhecimento Facial</h2>
      <p>{status}</p>

      <input
        type="text"
        placeholder="Digite seu login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />

      <div>
        <label>Selecione a Câmera: </label>
        <select value={selectedDeviceId} onChange={(e) => setSelectedDeviceId(e.target.value)} style={{ marginBottom: "10px", padding: "5px" }}>
          {devices.map((device, index) => (
            <option key={index} value={device.deviceId}>
              {device.label || `Câmera ${index + 1}`}
            </option>
          ))}
        </select>
        <button onClick={() => startVideo(selectedDeviceId)} style={{ marginLeft: "10px", padding: "5px" }}>
          Iniciar Câmera
        </button>
        <button onClick={stopVideo} style={{ marginLeft: "10px", padding: "5px", background: "red", color: "white" }}>
          Desligar Câmera
        </button>
      </div>

      <div style={{ position: "relative", display: "inline-block", marginTop: "10px" }}>
        <video ref={videoRef} autoPlay muted playsInline style={{ width: "100%", height: "100%", borderRadius: "10px" }} />
        <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleRegisterFace} style={{ marginRight: "10px", padding: "10px" }}>
          Registrar Face
        </button>
        <button onClick={handleLoginWithFace} style={{ padding: "10px" }}>
          Fazer Login
        </button>
      </div>
    </div>
  );
};

export default FaceLogin;
