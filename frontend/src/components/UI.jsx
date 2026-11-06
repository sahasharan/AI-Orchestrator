import React from 'react';

export const RiskBadge = ({ risk }) => {
  let bg, color;
  if (risk === 'Low' || risk === 'Low Risk') {
    bg = 'var(--risk-low-bg)';
    color = 'var(--risk-low-text)';
  } else if (risk === 'Moderate' || risk === 'Moderate Risk') {
    bg = 'var(--risk-mod-bg)';
    color = 'var(--risk-mod-text)';
  } else if (risk === 'High' || risk === 'High Risk') {
    bg = 'var(--risk-high-bg)';
    color = 'var(--risk-high-text)';
  } else {
    bg = '#F3F4F6';
    color = 'var(--text-secondary)';
  }

  return (
    <span style={{
      background: bg,
      color: color,
      padding: '4px 12px',
      borderRadius: '6px',
      fontSize: '0.75rem',
      fontWeight: 600,
      display: 'inline-block'
    }}>
      {risk}
    </span>
  );
};

export const ProgressRing = ({ percent }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: radius * 2, height: radius * 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg height={radius * 2} width={radius * 2} style={{ position: 'absolute' }}>
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="var(--primary)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease 0s' }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)' }}>{percent}%</div>
        <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Completed</div>
      </div>
    </div>
  );
};

export const AssessmentStatusBadge = ({ status }) => {
  let style = {};
  if (status === 'Not Started') {
    style = { border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'transparent' };
  } else if (status === 'In Progress') {
    style = { background: '#F59E0B', color: 'white' }; // Amber
  } else if (status === 'Completed') {
    style = { background: 'var(--accent-green)', color: 'white' };
  }

  return (
    <span style={{
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 500,
      display: 'inline-block',
      ...style
    }}>
      {status}
    </span>
  );
};
