"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SolarIcon from "./SolarIcon";

// Import the liquid metal fragment shader from ESM.sh to avoid local dependency issues
const LIQUID_METAL_SHADER = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_repetition;
uniform float u_softness;
uniform float u_scale;
uniform float u_angle;
uniform float u_shiftRed;
uniform float u_shiftBlue;
uniform float u_distortion;
uniform float u_contour;
uniform float u_shape;
uniform float u_offsetX;
uniform float u_offsetY;

void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    float t = u_time * 0.5;
    
    // Simple liquid metal effect simulation
    for(int i=1; i<4; i++) {
        p.x += 0.3 / float(i) * sin(float(i) * 3.0 * p.y + t + u_offsetX);
        p.y += 0.3 / float(i) * cos(float(i) * 3.0 * p.x + t + u_offsetY);
    }
    
    float r = sin(p.x + p.y + t) * 0.5 + 0.5;
    float g = sin(p.x + p.y + t + 2.0) * 0.5 + 0.5;
    float b = sin(p.x + p.y + t + 4.0) * 0.5 + 0.5;
    
    // Mix with some metallic colors (VBI Teals)
    vec3 color1 = vec3(0.18, 0.65, 0.52); // Teal 500
    vec3 color2 = vec3(0.11, 0.61, 0.52); // Teal 600
    vec3 finalColor = mix(color1, color2, r);
    
    gl_FragColor = vec4(finalColor * (0.8 + 0.2 * b), 1.0);
}
`;

/**
 * NavButton — Orb-like navigation button with liquid metal shader effect.
 * Inspired by: https://framer.com/m/IconWebglShader-b8f8wh.js
 */
export default function NavButton({ href, iconName, label, active, onClick }) {
  const shaderRef = useRef(null);
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const maskId = React.useId();

  useEffect(() => {
    if (!shaderRef.current) return;
    const canvas = shaderRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // Create shader program
    const vsSource = `
      attribute vec4 a_position;
      void main() {
        gl_Position = a_position;
      }
    `;
    
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, LIQUID_METAL_SHADER);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const offsetLocX = gl.getUniformLocation(program, "u_offsetX");
    const offsetLocY = gl.getUniformLocation(program, "u_offsetY");

    let animationFrameId;
    const render = (time) => {
      gl.uniform1f(timeLoc, time * 0.001);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(offsetLocX, hovered ? 0.5 : 0.1);
      gl.uniform1f(offsetLocY, hovered ? 0.3 : -0.1);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hovered]);

  const size = 44;
  const strokeWidth = 2.5;
  const radius = size / 2;
  const ringRadius = radius - strokeWidth / 2;

  return (
    <Link 
      href={href} 
      className={`nav-button-wrapper ${active ? 'is-active' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="nav-orb-container" style={{ width: size, height: size, flexShrink: 0 }}>
        {/* SVG Mask for the shader ring */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <mask id={maskId}>
              <rect width="100%" height="100%" fill="black" />
              <circle 
                cx={radius} 
                cy={radius} 
                r={ringRadius} 
                fill="none" 
                stroke="white" 
                strokeWidth={strokeWidth} 
              />
            </mask>
          </defs>
        </svg>

        {/* The Shader Ring */}
        <canvas
          ref={shaderRef}
          width={size}
          height={size}
          className="nav-orb-shader"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            filter: active || hovered ? "contrast(1.5) brightness(1.2) saturate(1.4)" : "contrast(1.1) brightness(0.9) saturate(0.8)",
            mask: `url(#${maskId})`,
            WebkitMask: `url(#${maskId})`,
            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
            opacity: active || hovered ? 1 : 0.6,
            width: size,
            height: size
          }}
        />

        {/* Inner Orb Body */}
        <div 
          className="nav-orb-inner"
          style={{
            position: "absolute",
            inset: strokeWidth,
            borderRadius: "50%",
            background: active 
              ? "linear-gradient(180deg, #2f6b45, #0f4e43)"
              : hovered 
                ? "linear-gradient(180deg, #3f7b4f, #1c1c1c)" 
                : "linear-gradient(180deg, #222, #000)",
            boxShadow: `
              inset 0 1px 2px rgba(255,255,255,0.1), 
              inset 0 -3px 6px rgba(0,0,0,0.6),
              ${active || hovered ? '0 0 15px rgba(47, 107, 69, 0.3)' : 'none'}
            `,
            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
            zIndex: 1,
            width: size - (strokeWidth * 2),
            height: size - (strokeWidth * 2)
          }}
        >
          {/* Inner Highlight */}
          <div style={{
            position: 'absolute',
            top: '15%',
            left: '25%',
            width: '50%',
            height: '25%',
            background: 'rgba(255,255,255,0.1)',
            filter: 'blur(4px)',
            borderRadius: '50%',
          }} />
        </div>

        {/* Icon */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: active || hovered ? "#fff" : "#8a8a8a",
          zIndex: 2,
          transition: 'all 0.3s ease',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          width: '100%',
          height: '100%'
        }}>
          <SolarIcon name={iconName} size={20} strokeWidth={1.8} />
        </div>
      </div>
      
      {/* Label (appearing on hover or if active) */}
      <span className="nav-orb-label">{label}</span>

      <style jsx>{`
        .nav-button-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          position: relative;
          transition: transform 0.2s ease;
        }
        .nav-button-wrapper:hover {
          transform: translateY(-2px);
        }
        .nav-orb-label {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--teal-600);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0;
          transform: translateY(2px);
          position: absolute;
          bottom: -18px;
          white-space: nowrap;
          pointer-events: none;
        }
        .nav-button-wrapper:hover .nav-orb-label,
        .nav-button-wrapper.is-active .nav-orb-label {
          opacity: 1;
          transform: translateY(0);
          color: var(--teal-500);
        }
      `}</style>
    </Link>
  );
}

