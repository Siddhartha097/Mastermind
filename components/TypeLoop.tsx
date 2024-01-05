'use client'

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TypeLoopProps {
  strings: string[];
}

const TypeLoop: React.FC<TypeLoopProps> = ({ strings }) => {
  const [currentString, setCurrentString] = useState('');
  const [stringIndex, setStringIndex] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    let currentText = '';
    const interval = setInterval(() => {
      const target = strings[stringIndex];
      currentText = target.substring(0, currentIndex);
      setCurrentString(currentText);

      currentIndex++;
      if (currentIndex > target.length) {
        clearInterval(interval);
        setTimeout(() => {
          setStringIndex((prevIndex) => (prevIndex + 1) % strings.length);
        }, 1000); // Pause before typing the next string
      }
    }, 100); // Typing speed

    return () => clearInterval(interval);
  }, [stringIndex, strings]);

  return (
    <div>
      <motion.h1>{currentString}</motion.h1>
    </div>
  );
};

export default TypeLoop;

// import { useState, useEffect } from 'react';

// interface TypeLoopProps {
//   strings: string[];
//   typingSpeed?: number;
//   pauseTime?: number;
// }

// const TypeLoop: React.FC<TypeLoopProps> = ({ strings, typingSpeed = 100, pauseTime = 1000 }) => {
//   const [displayText, setDisplayText] = useState('');
//   const [currentStringIndex, setCurrentStringIndex] = useState(0);
//   const [currentTextIndex, setCurrentTextIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     const typingEffect = setTimeout(() => {
//       if (!isDeleting && currentTextIndex < strings[currentStringIndex].length) {
//         setDisplayText(prevText => prevText + strings[currentStringIndex][currentTextIndex]);
//         setCurrentTextIndex(prevIndex => prevIndex + 1);
//       } else if (isDeleting && currentTextIndex >= 0) {
//         setDisplayText(prevText => prevText.slice(0, -1));
//         setCurrentTextIndex(prevIndex => prevIndex - 1);
//       } else {
//         setIsDeleting(!isDeleting);
//         if (isDeleting) {
//           setCurrentStringIndex(prevIndex => (prevIndex + 1) % strings.length);
//         }
//         setTimeout(() => setIsDeleting(!isDeleting), pauseTime);
//       }
//     }, isDeleting ? typingSpeed / 2 : typingSpeed);

//     return () => clearTimeout(typingEffect);
//   }, [currentTextIndex, currentStringIndex, isDeleting, strings, typingSpeed, pauseTime]);

//   // When the current string changes, reset the display text
//   useEffect(() => {
//     setDisplayText('');
//     setCurrentTextIndex(0);
//     setIsDeleting(false);
//   }, [currentStringIndex, strings]);

//   return <div>{displayText}</div>;
// };

// export default TypeLoop;
