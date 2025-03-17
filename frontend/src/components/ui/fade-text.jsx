"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";

export function FadeText({
  direction = "up",
  className,
  framerProps = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { type: "spring" } },
    duration: 0.5,
  },
  text
}) {
  const directionOffset = useMemo(() => {
    const map = { up: 10, down: -10, left: -10, right: 10 };
    return map[direction];
  }, [direction]);

  const axis = direction === "up" || direction === "down" ? "y" : "x";

  const FADE_ANIMATION_VARIANTS = useMemo(() => {
    const { hidden, show, ...rest } = framerProps;
    const duration = framerProps?show?.transition?.duration ?? 0.5 : 0.5;

    return {
      ...rest,
      hidden: {
        ...(hidden ?? {}),
        opacity: hidden?.opacity ?? 0,
        [axis]: hidden?.[axis] ?? directionOffset,
      },
      show: {
        ...(show ?? {}),
        opacity: show?.opacity ?? 1,
        [axis]: show?.[axis] ?? 0,
        transition: {
          ...(show?.transition ?? {}),
          duration: duration ?? 0.5,
        },
      },
    };
  }, [directionOffset, axis, framerProps]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={FADE_ANIMATION_VARIANTS}>
      <motion.span className={className}>{text}</motion.span>
    </motion.div>
  );
}
