import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/common/Toast';

type ToastType = 'success' | 'error' | 'info';

interface ToastContextProps {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'info' as ToastType,
    duration: 3000,
  });

  const showToast = (message: string, type: ToastType = 'info', duration: number = 3000) => {
    setToast({
      show: true,
      message,
      type,
      duration,
    });
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        onClose={handleCloseToast}
      />
    </ToastContext.Provider>
  );
};

export default ToastProvider; 