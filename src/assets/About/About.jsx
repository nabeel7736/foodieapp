import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Title Animation */}
        <h2
          className="text-4xl font-bold text-yellow-400 mb-7 mt-4"
          data-aos="fade-up"
        >
          About Us
        </h2>

        {/* First Paragraph */}
        <p
          className="text-lg text-gray-300 leading-relaxed"
          data-aos="fade-right"
        >
          Welcome to{" "}
          <span className="text-yellow-500 font-semibold">foodish.</span> — your
          go-to place for authentic biriyani and quick bites. We combine
          tradition with convenience, bringing you freshly made dishes,
          lightning-fast delivery, and prices that don’t break the bank.
        </p>

        {/* Second Paragraph */}
        <p className="text-gray-400" data-aos="fade-left">
          Founded with a passion for flavor and service, we aim to deliver not
          just food, but an experience. Whether you're craving biriyani,
          burgers, or desserts, we have something to satisfy every craving.
        </p>
      </div>
    </div>
  );
};

export default About;
