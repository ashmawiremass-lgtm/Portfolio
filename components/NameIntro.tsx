"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME = "Remass Ashmawi";

export default function NameIntro() {
  const [visible, setVisible] = useState(true);
  const [line, setLine] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("intro-seen")) {
      setVisible(false);
      return;
    }
    const cmd = "whoami";
    let i = 0;
    const typeTimer = setInterval(() => {
      i++;
      setLine(cmd.slice(0, i));
      if (i === cmd.length) clearInterval(typeTimer);
    }, 55);

    const dismiss = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("intro-seen", "1");
    }, 2100);

    return () => {
      clearInterval(typeTimer);
      clearTimeout(dismiss);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-base"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center">
            <p className="font-mono text-sm text-muted mb-4">
              <span className="text-signal">$</span> {line}
              <span className="inline-block w-[2px] h-4 bg-signal ml-1 animate-blink align-middle" />
            </p>

            <motion.h1
              className="title-glow text-3xl md:text-5xl font-bold tracking-tight"
              initial="hidden"
              animate={line.length === "whoami".length ? "show" : "hidden"}
            >
              {NAME.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              className="mt-6 h-[2px] w-40 rounded-full bg-border overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-signal to-mint"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.9, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
