import React from "react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "glow" | "3d" | "morph" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "glow",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const baseClasses = "rounded-xl font-semibold transition-all duration-300";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    glow: "btn-glow text-white",
    "3d": "btn-3d text-white",
    morph: "btn-morph border border-blue-500 text-blue-500 hover:text-blue-400",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
