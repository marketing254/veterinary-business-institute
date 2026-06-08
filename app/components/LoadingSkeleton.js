"use client";

import React from "react";

/**
 * LoadingSkeleton — A high-end shimmer wireframe system.
 * Based on: https://framer.com/m/Loading-Wireframe-KhM9.js
 *
 * Supports variants: card, list, article, grid, hero.
 * Uses pure CSS shimmer animation for performance.
 */
export default function LoadingSkeleton({ 
  variant = "card", 
  items = 3, 
  className = "",
  style = {} 
}) {

  const ShimmerLine = ({ width = "100%", height = "16px", borderRadius = "4px", marginBottom = "12px", style: lineStyle = {} }) => (
    <div 
      className="skeleton-box" 
      style={{ 
        width, 
        height, 
        borderRadius, 
        marginBottom, 
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'rgba(63, 123, 79, 0.05)',
        ...lineStyle 
      }} 
    >
      <div className="shimmer-glint" />
    </div>
  );

  const renderCard = (index) => (
    <div key={index} className="skeleton-card" style={{ padding: '24px', borderRadius: '24px', background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.8)', marginBottom: '20px' }}>
      <ShimmerLine width="100%" height="200px" borderRadius="16px" marginBottom="20px" />
      <ShimmerLine width="40%" height="12px" marginBottom="16px" />
      <ShimmerLine width="90%" height="24px" marginBottom="12px" />
      <ShimmerLine width="100%" height="16px" marginBottom="8px" />
      <ShimmerLine width="80%" height="16px" marginBottom="0" />
    </div>
  );

  const renderGrid = () => (
    <div className="skeleton-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
      {Array.from({ length: items }).map((_, i) => renderCard(i))}
    </div>
  );

  const renderList = () => (
    <div className="skeleton-list">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid rgba(63, 123, 79, 0.1)' }}>
          <ShimmerLine width="64px" height="64px" borderRadius="50%" marginBottom="0" />
          <div style={{ flex: 1 }}>
            <ShimmerLine width="30%" height="14px" marginBottom="8px" />
            <ShimmerLine width="60%" height="20px" marginBottom="0" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderArticle = () => (
    <div className="skeleton-article" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <ShimmerLine width="100%" height="400px" borderRadius="24px" marginBottom="40px" />
      <ShimmerLine width="70%" height="48px" marginBottom="20px" />
      <ShimmerLine width="30%" height="20px" marginBottom="40px" />
      {Array.from({ length: 6 }).map((_, i) => (
        <ShimmerLine key={i} width={i % 3 === 0 ? "100%" : i % 3 === 1 ? "95%" : "85%"} height="18px" marginBottom="16px" />
      ))}
    </div>
  );

  const renderHero = () => (
    <div className="skeleton-hero" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', gap: '60px', padding: '40px 0' }}>
      <div style={{ flex: 1.2 }}>
        <ShimmerLine width="40%" height="14px" marginBottom="24px" />
        <ShimmerLine width="90%" height="64px" marginBottom="16px" />
        <ShimmerLine width="80%" height="64px" marginBottom="32px" />
        <ShimmerLine width="100%" height="24px" marginBottom="8px" />
        <ShimmerLine width="85%" height="24px" marginBottom="48px" />
        <div style={{ display: 'flex', gap: '16px' }}>
          <ShimmerLine width="180px" height="56px" borderRadius="28px" marginBottom="0" />
          <ShimmerLine width="180px" height="56px" borderRadius="28px" marginBottom="0" />
        </div>
      </div>
      <div style={{ flex: 0.8, display: 'flex', justifyContent: 'center' }}>
        <ShimmerLine width="420px" height="420px" borderRadius="50%" marginBottom="0" />
      </div>
    </div>
  );

  const contentMap = {
    card: Array.from({ length: items }).map((_, i) => renderCard(i)),
    grid: renderGrid(),
    list: renderList(),
    article: renderArticle(),
    hero: renderHero()
  };

  return (
    <div className={`loading-skeleton-container ${className}`} style={{ ...style }}>
      {contentMap[variant] || renderCard(0)}

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .shimmer-glint {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg, 
            transparent, 
            rgba(63, 123, 79, 0.08), 
            transparent
          );
          animation: shimmer 1.5s infinite linear;
        }
        .skeleton-box {
          position: relative;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

