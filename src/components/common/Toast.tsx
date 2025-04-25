import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  show: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  show, 
  message, 
  type = 'info', 
  duration = 3000, 
  onClose 
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);
  
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200',
          icon: <CheckCircle className="h-5 w-5 text-green-500" />
        };
      case 'error':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-200',
          icon: <AlertCircle className="h-5 w-5 text-red-500" />
        };
      default:
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          borderColor: 'border-blue-200',
          icon: <Info className="h-5 w-5 text-blue-500" />
        };
    }
  };
  
  const { bgColor, textColor, borderColor, icon } = getToastStyles();
  
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center pointer-events-none pt-4 sm:pt-6 px-4">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className={`${bgColor} ${textColor} ${borderColor} border rounded-lg shadow-md p-3 flex items-center pointer-events-auto max-w-sm w-full`}
          >
            <div className="flex-shrink-0 mr-3">
              {icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{message}</p>
            </div>
            <button 
              onClick={onClose}
              className="ml-3 flex-shrink-0 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Toast; 