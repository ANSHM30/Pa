import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// Characters used for the scramble effect
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
const ROLE_TRANSITION_DELAY = 4000;
const ANIMATION_DURATION = 750;

const roles = [
  "Full Stack Developer",
  "React Developer",
  "Node.js Specialist",
  "Cloud Enthusiast",
];

const getRandomChar = () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

export default function RotatingText() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(roles[0]);
  const intervalRef = React.useRef();

  const scramble = useCallback((startText, endText) => {
    let frame = 0;
    const totalFrames = Math.ceil(ANIMATION_DURATION / 16.67);
    const paddedStartText = startText.padEnd(endText.length, ' ');

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      let newText = '';
      const progress = frame / totalFrames;

      for (let i = 0; i < endText.length; i++) {
        if (progress * endText.length > i) {
          newText += endText[i];
        } else if (i < paddedStartText.length) {
          newText += getRandomChar();
        } else {
          newText += ' ';
        }
      }

      setDisplayText(newText);
      frame++;

      if (frame > totalFrames) {
        clearInterval(intervalRef.current);
        setDisplayText(endText);
      }
    }, 16.67);
  }, []);

  useEffect(() => {
    const previousText = roles[(index - 1 + roles.length) % roles.length];
    const targetText = roles[index];

    scramble(previousText, targetText);

    const displayTimeout = setTimeout(() => {
      setIndex(prevIndex => (prevIndex + 1) % roles.length);
    }, ROLE_TRANSITION_DELAY + ANIMATION_DURATION);

    return () => {
      clearTimeout(displayTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [index, scramble]);

  return (
    <div className="h-10 sm:h-12 md:h-16 flex items-center justify-center overflow-hidden mb-6">
     <motion.h2
  className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text 
             bg-gradient-to-r from-teal-500 via-orange-500 to-yellow-500 
             bg-[length:200%_auto] animate-gradient animate-glow"
>
  {displayText}
</motion.h2>

    </div>
  );
}
