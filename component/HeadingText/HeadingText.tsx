'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

const AnimatedTitle = () => {
    const textRef = useRef(null);
    const [currentWord, setCurrentWord] = useState('JOB');
    const words = ['JOB', 'INTERNSHIP'];
    const staticText = 'YOUR ULTIMATE';
    const trailingText = 'SEARCH COMPANION';

    // Hook 1: Manages the word-switching timer
    useEffect(() => {
        const interval = setInterval(() => {
            // Use the functional update form to access the previous state
            // This avoids the stale closure issue.
            setCurrentWord(prevWord => {
                const currentIndex = words.indexOf(prevWord);
                const nextIndex = (currentIndex + 1) % words.length;
                return words[nextIndex];
            });
        }, 3000); // Switch every 3 seconds

        // Cleanup the interval when the component unmounts
        return () => clearInterval(interval);
    }, []); // <-- Empty dependency array means this effect runs only ONCE

    // Hook 2: Manages the animation for the current word
    useEffect(() => {
        const element = textRef.current;
        if (!element) return;

        // Split the new text into characters
        const split = new SplitType(element, { types: 'chars' });

        // Animate the characters in
        gsap.from(split.chars, {
            x: 80, // Animate from below
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.05,
        });

        // Cleanup by reverting the split to prevent layout issues
        return () => {
            split.revert();
        };

    }, [currentWord]); // <-- Re-run this animation effect whenever currentWord changes

    return (
        <div className='text-2xl md:text-6xl text-center font-extrabold text-white'>
            <div>{staticText}{' '}</div>
            {/* Adding a key prop forces React to re-mount the span, ensuring a clean animation state */}
            <span ref={textRef} key={currentWord} style={{
                color: "#a989f6",
            }}>
                {currentWord}
            </span>{' '}
            <br />
            {trailingText}
        </div>
    );
};

export default AnimatedTitle;