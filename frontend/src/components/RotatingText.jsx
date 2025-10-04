import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
const ROLE_TRANSITION_DELAY = 3000;
const ANIMATION_DURATION = 500;

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

  // Use a ref to hold the interval ID so we can clear it reliably
  const intervalRef = React.useRef(); 

  const scramble = useCallback((startText, endText) => {
    let frame = 0;
    const totalFrames = Math.ceil(ANIMATION_DURATION / 16.67);
    const paddedStartText = startText.padEnd(endText.length, ' ');

    // Clear any existing interval before starting a new scramble
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      let newText = '';
      const progress = frame / totalFrames;

      for (let i = 0; i < endText.length; i++) {
        // Character is settled
        if (progress * endText.length > i) {
          newText += endText[i];
        } 
        // Character is scrambling
        else if (i < paddedStartText.length) {
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
  }, []); // scramble is stable and only relies on the setters

  
  useEffect(() => {
    // This effect runs only on mount and when 'index' changes
    const previousText = roles[(index - 1 + roles.length) % roles.length];
    const targetText = roles[index];
    
    // Start the scramble animation
    scramble(previousText, targetText);

    // Set the timer for the NEXT transition
    const displayTimeout = setTimeout(() => {
      setIndex(prevIndex => (prevIndex + 1) % roles.length);
    }, ROLE_TRANSITION_DELAY + ANIMATION_DURATION);

    return () => {
      clearTimeout(displayTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [index, scramble]); // Rerun when index changes or scramble function changes (it won't)


  return (
    <div className="h-10 sm:h-12 md:h-16 flex items-center justify-center overflow-hidden">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-semibold whitespace-pre
          text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500"
      >
        {displayText}
      </motion.h2>
    </div>
  );
}