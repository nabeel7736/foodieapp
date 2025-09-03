import React, { useEffect } from 'react';
import AOS from "aos";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Service from '../services/service';
import About from '../About/About';
import Contact from '../Contact/Contact';
import Burger from './burgeranim.jpeg';
import pizza from './pizza.png';
import biriyani from './biriyani1-Photoroom.png';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false, 
    });
  }, []);

  const navigate = useNavigate();

  const handleOrderbtn = () => {
    navigate("/menu");
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black opacity-40 z-0" />

        <div 
          className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-aos="fade-up"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-6">
            
            {/* Left Content */}
            <div className="text-center sm:text-left space-y-6" data-aos="fade-right">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-yellow-400 leading-tight">
                <motion.span
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  Welcome to <span className="text-white">foodish.</span> Restaurant
                </motion.span>
              </h1>
              <h3 className='text-yellow-400'>Your Favorite Food, Delivered Fast!</h3>
              <p className="text-base text-gray-200">
                Craving something delicious? Explore a wide range of mouthwatering meals from your favorite restaurants. 
                Fast delivery, fresh ingredients, and flavors you’ll love — all in one place.
                <br />
                Order now and satisfy your hunger with just a few clicks!
              </p>

              <motion.button
                onClick={handleOrderbtn}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black px-6 py-2 rounded-full hover:scale-105 transition-transform duration-200 font-semibold shadow-lg"
              >
                Order Now
              </motion.button>
            </div>

            {/* Right Animated Images */}
            <div 
              className="mt-12 lg:mt-0 relative w-full lg:w-1/2 flex justify-center items-center"
              data-aos="zoom-in"
            >
              {/* Main Biriyani */}
              <motion.img
                src={biriyani}
                alt="Biriyani"
                className="w-60 sm:w-80 relative z-20 drop-shadow-2xl rounded-2xl left-20"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: [0, -20, 0], opacity: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Burger */}
              <motion.img
                src={Burger}
                alt="Burger"
                className="w-32 sm:w-44 absolute -top-6 -left-8 rotate-[-12deg] drop-shadow-lg"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: [0, -20, 0], opacity: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Pizza */}
              <motion.img
                src={pizza}
                alt="Pizza"
                className="w-36 sm:w-52 absolute -bottom-20 -right-70 rotate-[10deg] drop-shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.15, 1], opacity: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

          </div>
        </div>
      </div>
        <Service />

        <About />
        <Contact />
      
    </>
  );
};

export default Home;
