"use client";

import React, { useEffect, useRef } from 'react';

const InteractiveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mousePositionRef = useRef<{ x: number; y: number } | null>(null);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    // Mouse leave handler - clear position when mouse leaves
    const handleMouseLeave = () => {
      mousePositionRef.current = null;
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    // Animation loop for flowing water wave effect
    const animate = () => {
      if (!ctx) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mousePositionRef.current) {
        const { x, y } = mousePositionRef.current;
        timeRef.current += 0.02;

        // Create flowing water wave effect
        const waveCount = 5; // Number of waves
        const waveSpacing = 120; // Spacing between waves
        const waveAmplitude = 25; // Wave height
        const waveSpeed = 0.03; // Wave flow speed

        for (let i = 0; i < waveCount; i++) {
          const waveOffset = i * waveSpacing;
          const waveProgress = (timeRef.current * waveSpeed + waveOffset) % (waveSpacing * 2);
          const distanceFromMouse = Math.abs(waveProgress - waveSpacing);
          
          if (distanceFromMouse < waveSpacing) {
            const opacity = 1 - (distanceFromMouse / waveSpacing) * 0.8;
            const radius = 60 + distanceFromMouse * 0.5;
            
            // Create flowing wave shape
            ctx.beginPath();
            
            const points = 60;
            for (let j = 0; j <= points; j++) {
              const angle = (j / points) * Math.PI * 2;
              const waveDistortion = Math.sin(angle * 3 + timeRef.current * 2) * waveAmplitude * opacity;
              const currentRadius = radius + waveDistortion;
              
              const pointX = x + Math.cos(angle) * currentRadius;
              const pointY = y + Math.sin(angle) * currentRadius;
              
              if (j === 0) {
                ctx.moveTo(pointX, pointY);
              } else {
                ctx.lineTo(pointX, pointY);
              }
            }
            
            ctx.closePath();
            
            // Create gradient for water effect
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius + waveAmplitude);
            gradient.addColorStop(0, `rgba(91, 183, 0, ${opacity * 0.12})`);
            gradient.addColorStop(0.6, `rgba(91, 183, 0, ${opacity * 0.06})`);
            gradient.addColorStop(1, 'rgba(91, 183, 0, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Add flowing wave stroke
            ctx.strokeStyle = `rgba(91, 183, 0, ${opacity * 0.15})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      } else {
        // Reset time when mouse stops
        timeRef.current = 0;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-screen pointer-events-none z-50"
      style={{
        width: '100%',
        height: '100vh',
        background: 'transparent',
      }}
    />
  );
};

export default InteractiveCanvas;

