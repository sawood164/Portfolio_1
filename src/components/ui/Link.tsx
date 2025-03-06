import React from "react";
import { motion } from "framer-motion";
import NextLink from "next/link";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  className = "",
  external = false,
}) => {
  const baseClasses = "link-underline inline-flex items-center gap-1";

  const content = (
    <motion.span
      className="inline-block"
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
    >
      {children}
    </motion.span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <NextLink href={href} className={`${baseClasses} ${className}`}>
      {content}
    </NextLink>
  );
};
