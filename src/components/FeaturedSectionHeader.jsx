"use client";

import { motion } from "framer-motion";

export default function FeaturedSectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.15,
          type: "spring",
          stiffness: 140,
        }}
        whileHover={{
          scale: 1.02,
          textShadow: "0px 10px 30px rgba(14,165,233,0.25)",
        }}
        className="mt-3 bg-gradient-to-r from-slate-800 via-sky-600 to-indigo-700 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl"
      >
        Featured Life Lessons
      </motion.h2>

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "220px" }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.8 }}
        className="mx-auto mt-4 h-1 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500"
      />

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600"
      >
        Carefully selected stories filled with wisdom, resilience, and
        unforgettable experiences that inspire growth and leave a lasting
        impact.
      </motion.p>
    </motion.div>
  );
}