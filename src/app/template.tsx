"use client";

import { useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen finishLoading={() => setIsLoading(false)} />
        ) : (
          <>
            <Navbar />
            {children}
          </>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}
