import { useState } from "react";

// const API_URL = "http://localhost:3000/api";
const API_URL = import.meta.env.VITE_API_URL;

const useFaceAuth = () => {
  const [status, setStatus] = useState("");
  const [registeredDescriptor, setRegisteredDescriptor] = useState(null);

  const registerFace = async (login, descriptor) => {
    setStatus("Registrando face na API...");

    try {
      const response = await fetch(`${API_URL}/face`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, descriptor }),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar face");
      }

      const data = await response.json();
      setRegisteredDescriptor(new Float32Array(descriptor));
      setStatus("✅ Face registrada com sucesso!");

      return data;
    } catch (error) {
      setStatus(`❌ Erro: ${error.message}`);
      console.error(error);
    }
  };

  const verifyFace = async (login, descriptor) => {
    setStatus("Verificando rosto...");

    try {
      const response = await fetch(`${API_URL}/face/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, descriptor }),
      });

      if (!response.ok) {
        throw new Error("Rosto não reconhecido!");
      }

      const data = await response.json();
      setStatus("✅ Login bem-sucedido! Bem-vindo(a) " + data.user.name);

      return data;
    } catch (error) {
      setStatus("❌ Rosto não reconhecido!");
      console.error(error);
    }
  };

  return { status, setStatus, registeredDescriptor, registerFace, verifyFace };
};

export default useFaceAuth;
