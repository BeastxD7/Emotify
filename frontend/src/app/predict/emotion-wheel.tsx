"use client";

import { useEffect, useRef } from "react";

interface EmotionWheelProps {
  emotions: Record<string, number>;
}

export function EmotionWheel({ emotions }: EmotionWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw emotion wheel
    const emotionEntries = Object.entries(emotions);
    const totalEmotions = emotionEntries.length;
    const angleStep = (2 * Math.PI) / totalEmotions;

    // Draw connecting lines
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    emotionEntries.forEach((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw circular path
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw emotions and values
    emotionEntries.forEach(([emotion, value], index) => {
      const angle = index * angleStep - Math.PI / 2;
      // const x = centerX + Math.cos(angle) * radius;
      // const y = centerY + Math.sin(angle) * radius;

      // Draw emotion label
      ctx.fillStyle = "#fff";
      ctx.font = "12px Inter";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const labelX = centerX + Math.cos(angle) * (radius + 20);
      const labelY = centerY + Math.sin(angle) * (radius + 20);
      ctx.fillText(emotion, labelX, labelY);

      // Draw emotion point
      const pointRadius = 4;
      const intensity = value as number;
      const pointDistance = radius * intensity;
      const pointX = centerX + Math.cos(angle) * pointDistance;
      const pointY = centerY + Math.sin(angle) * pointDistance;

      ctx.beginPath();
      ctx.arc(pointX, pointY, pointRadius, 0, 2 * Math.PI);
      ctx.fillStyle = intensity > 0.5 ? "#ffa500" : "#6366f1";
      ctx.fill();
    });

    // Draw connecting lines between points
    ctx.beginPath();
    ctx.strokeStyle = "rgba(99, 102, 241, 0.4)";
    emotionEntries.forEach(([, value], index) => {
      const angle = index * angleStep - Math.PI / 2;
      const intensity = value as number;
      const pointDistance = radius * intensity;
      const x = centerX + Math.cos(angle) * pointDistance;
      const y = centerY + Math.sin(angle) * pointDistance;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    // Close the path
    const firstValue = emotionEntries[0][1] as number;
    const firstAngle = -Math.PI / 2;
    const firstX = centerX + Math.cos(firstAngle) * (radius * firstValue);
    const firstY = centerY + Math.sin(firstAngle) * (radius * firstValue);
    ctx.lineTo(firstX, firstY);
    ctx.stroke();

  }, [emotions]);

  return (
    <div className="flex items-center justify-center w-full">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto"
        style={{ width: "400px", height: "400px" }}
      />
    </div>
  );
}

