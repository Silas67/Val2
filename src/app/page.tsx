"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import TypewriterComponent from "typewriter-effect";
import { BsHeartFill } from "react-icons/bs";
import Slider from "@/component/Slider";

export const Nicknames = [
  { name: "Mama Drama", id: 1 },
  { name: "Dora", id: 2 },
  { name: "Mimi", id: 3 },
  { name: "Bad Egg", id: 4 },
];

export default function Home() {
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const heartRef = useRef(null);
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: "70%", left: "70%" });

  const moveNoButton = () => {
    const newX = Math.random() * 80 + "%";
    const newY = Math.random() * 80 + "%";
    setNoPosition({ top: newY, left: newX });
  };

  useEffect(() => {
    gsap.fromTo(
      heartRef.current,
      {
        y: 500,
        scale: 1,
      },
      {
        y: 0,
        scale: 4.5,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 7,
      }
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroVisible(false);
    }, 10000); // Animation duration
    return () => clearTimeout(timer);
  }, [isIntroVisible]);
  return (
    <>
      {isIntroVisible && (
        <div className="fixed w-full h-full text-background bg-pink-200 flex items-center justify-center z-50 flex-col">
          <div>
            <TypewriterComponent
              options={{
                delay: 75, // Typing speed
                autoStart: true, // Automatically starts typing
                wrapperClassName: "text-xl text-black",
                cursor: "__",
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Yo Watsup") // Type the first string
                  .start();
              }}
            />
            <div className="h-[40px] overflow-hidden ">
              <Slider autoSlide={true} autoSlideInterval={2000}>
                {Nicknames.map((item) => (
                  <div key={item.id}>{item.name}</div>
                ))}
              </Slider>
            </div>
          </div>

          <div ref={heartRef} className="absolute animate-fade-in">
            <BsHeartFill />
          </div>
        </div>
      )}

      <div
        id="intro"
        className={`${isIntroVisible ? "opacity-5" : "opacity-100"} `}
      >
        <div className="flex items-center justify-center h-screen bg-pink-200 relative overflow-hidden">
          {/* Floating Hearts Animation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -10 }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1.5,
            }}
            className="absolute top-10 left-1/4 text-4xl"
          >
            ❤️
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -10 }}
            transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
            className="absolute top-20 right-1/4 text-3xl"
          >
            💕
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -10 }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1.8,
            }}
            className="absolute bottom-10 left-1/3 text-4xl"
          >
            💖
          </motion.div>
          {!accepted ? (
            <div className="text-center px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-red-500">
                Will you be my Valentine? 💖
              </h1>
              <div className="relative mt-6 flex flex-col items-center">
                <button
                  onClick={() => setAccepted(true)}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg text-xl hover:bg-red-600 transition"
                >
                  Yes 💕
                </button>
                <motion.button
                  onMouseEnter={moveNoButton}
                  onTap={moveNoButton}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-lg text-xl absolute"
                  style={{
                    top: noPosition.top,
                    left: noPosition.left,
                    position: "absolute",
                  }}
                >
                  No 💔
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="text-center px-4">
              <h1 className="text-2xl md:text-4xl font-sans font-medium text-red-500">
                Awwn, See abeg, After all your forming, So you love me? 😂🥰💕
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
