// src/components/AudioVisualizer.tsx
import React, { useRef, useEffect } from 'react';

interface AudioVisualizerProps {
  audioStream: MediaStream | null;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioStream }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!audioStream || !canvasRef.current) return;

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(audioStream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256; // Determines the number of bars

    source.connect(analyser);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let animationFrameId: number;

    const draw = () => {
      animationFrameId = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        
        // Create a nice blue-to-purple gradient for the bars
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, '#3B82F6'); // Blue
        gradient.addColorStop(1, '#8B5CF6'); // Purple

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      audioContext.close();
    };
  }, [audioStream]);

  return <canvas ref={canvasRef} width="600" height="100" />;
};

export default AudioVisualizer;