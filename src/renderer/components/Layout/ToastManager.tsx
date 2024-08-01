import React from "react";
import { Toaster } from "react-hot-toast";
import useToastNotifications from "../../hooks/useToastNotifications";

const ToastManager: React.FC = () => {
  useToastNotifications();

  return (
    <Toaster
      position="top-center"
    />
  );
};

export default ToastManager;
