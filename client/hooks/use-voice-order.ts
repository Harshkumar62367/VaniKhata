"use client";
import { useState, useRef } from "react";

export const useVoiceOrder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      chunks.current = [];

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
        await sendToServer(audioBlob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access microphone. Please enable permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      // Stop all tracks to release microphone
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const sendToServer = async (blob: Blob) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("audio", blob);

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

      // 1. Send audio to be processed by Gemini
      const processResponse = await fetch(`${backendUrl}/api/process-audio`, {
        method: "POST",
        body: formData,
      });

      if (!processResponse.ok) {
        throw new Error("Failed to process audio");
      }

      const processData = await processResponse.json();
      console.log("Audio Processed:", processData);

      // 2. Save the processed order to the database (in-memory)
      const orderResponse = await fetch(`${backendUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processData),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to save order");
      }

      const orderData = await orderResponse.json();
      console.log("Order Saved:", orderData);
      
      // Verification Alert (Temporary)
      alert(`Order Processed!\nItems: ${processData.items?.length}\nTotal: ₹${processData.total || 0}`);

    } catch (error) {
      console.error("Error in voice order flow:", error);
      alert("Failed to process voice order. See console for details.");
    } finally {
      setIsProcessing(false);
    }
  };

  return { isRecording, isProcessing, startRecording, stopRecording };
};
