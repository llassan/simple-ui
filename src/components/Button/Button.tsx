// Button.tsx
import React from 'react';
import styled, { css } from 'styled-components';
// import { flowColors } from '@skodaflow/web-tokens'; 
import tokens from "@skodaflow/web-tokens/src/tokens.json";
// Define color tokens (based on your tokens.json structure)

const flowColors = tokens["flow-colors"];

const colors = {
  primary: flowColors['brand-primary'],
  secondary: flowColors['brand-secondary'],
  surface: flowColors['surface-primary'],
  error: flowColors['semantic-alert'],
  inherit: 'inherit'
};

// Define button variants
type ButtonVariant = "filled" | "outlined" | "text";

// Define button sizes
type ButtonSize = "small" | "medium" | "large";

// ButtonProps types
interface ButtonProps {
  color?: keyof typeof colors;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

// Button Styles using styled-components
const ButtonWrapper = styled.button<ButtonProps>`
  padding: ${({ size }) => {
    switch (size) {
      case 'small': return '8px 16px';
      case 'medium': return '12px 24px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case 'small': return '14px';
      case 'medium': return '16px';
      case 'large': return '18px';
      default: return '16px';
    }
  }};
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease, border 0.3s ease;
  
  // Button colors and variants
  ${({ color, variant, disabled }) => {
    const bgColor = color ? colors[color] : colors.primary;
    const textColor = disabled ? "#c4c6c7FF" : "#ffffff";
    const borderColor = variant === 'outlined' ? bgColor : 'transparent';
    
    switch (variant) {
      case 'filled':
        return css`
          background-color: ${bgColor};
          color: ${textColor};
          border: 2px solid transparent;
          &:hover {
            background-color: ${darkenColor(bgColor)};
          }
          &:active {
            background-color: ${darkenColor(bgColor, 0.2)};
          }
        `;
      case 'outlined':
        return css`
          background-color: transparent;
          color: ${bgColor};
          border: 2px solid ${bgColor};
          &:hover {
            background-color: ${lightenColor(bgColor)};
          }
          &:active {
            background-color: ${lightenColor(bgColor, 0.2)};
          }
        `;
      case 'text':
        return css`
          background-color: transparent;
          color: ${bgColor};
          border: none;
          &:hover {
            background-color: ${lightenColor(bgColor, 0.1)};
          }
        `;
      default:
        return css``;
    }
  }}
  
  // Disabled state styling
  &:disabled {
    background-color: #d8d8d8FF;
    color: #9e9fa0FF;
    border: 2px solid #e4e4e4FF;
    cursor: not-allowed;
  }
`;

// Helper function to darken colors (used for hover/active effects)
function darkenColor(color: string, amount: number = 0.1) {
  let colorCode = color.replace('#', '');
  let r = parseInt(colorCode.substr(0, 2), 16);
  let g = parseInt(colorCode.substr(2, 2), 16);
  let b = parseInt(colorCode.substr(4, 2), 16);

  r = Math.round(r * (1 - amount));
  g = Math.round(g * (1 - amount));
  b = Math.round(b * (1 - amount));

  return `#${(1 << 24) + (r << 16) + (g << 8) + b.toString(16).slice(1)}`;
}

// Helper function to lighten colors (used for hover/active effects)
function lightenColor(color: string, amount: number = 0.1) {
  let colorCode = color.replace('#', '');
  let r = parseInt(colorCode.substr(0, 2), 16);
  let g = parseInt(colorCode.substr(2, 2), 16);
  let b = parseInt(colorCode.substr(4, 2), 16);

  r = Math.round(r + (255 - r) * amount);
  g = Math.round(g + (255 - g) * amount);
  b = Math.round(b + (255 - b) * amount);

  return `#${(1 << 24) + (r << 16) + (g << 8) + b.toString(16).slice(1)}`;
}

// Button component implementation
const Button: React.FC<ButtonProps> = ({ 
  color = 'primary', 
  variant = 'filled', 
  size = 'medium', 
  fullWidth = false, 
  disabled = false, 
  onClick, 
  children 
}) => {
  return (
    <ButtonWrapper 
      color={color} 
      variant={variant} 
      size={size} 
      fullWidth={fullWidth} 
      disabled={disabled} 
      onClick={onClick}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;
