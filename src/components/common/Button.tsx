import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  className?: string;
  translationKey?: string; // Translation key for built-in label translation
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  icon,
  className = '',
  translationKey,
}) => {
  const { t } = useLanguage();
  
  // Use translation if translationKey is provided
  const buttonText = translationKey ? t(translationKey) : children;
  
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500',
    secondary: 'bg-pink-500 hover:bg-pink-600 text-white focus:ring-pink-400',
    outline: 'border border-purple-500 text-purple-600 hover:bg-purple-50 focus:ring-purple-400',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400',
  };
  
  // Disabled classes
  const disabledClasses = 'opacity-60 cursor-not-allowed';
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled ? disabledClasses : ''}
    ${widthClasses}
    ${className}
  `;
  
  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {buttonText}
    </motion.button>
  );
};

export default Button;