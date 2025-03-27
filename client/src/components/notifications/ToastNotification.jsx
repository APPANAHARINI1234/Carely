import React, { useEffect } from "react";

const ToastNotification = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-md shadow-lg">
      <button onClick={onClose} className="absolute top-1 right-1 text-white">✖</button>
      <p className="font-bold">{notification.title}</p>
      <p className="text-sm">{notification.body}</p>
    </div>
  );
};

export default ToastNotification;
