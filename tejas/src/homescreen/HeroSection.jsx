import React, { forwardRef, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Users, CreditCard, ChevronRight } from "lucide-react";

import bhk2Video from "../assets/video/the_1_property_2bhk.mp4";
import bhk25Video from "../assets/video/the_1_property_2.5bhk.mp4";
import bhk3Video from "../assets/video/the_1_property_3bhk_without-watermark.mp4";
import bhk35Video from "../assets/video/the_1_property_3.5bhk_without-watermark.mp4";

const Card = forwardRef(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-xl border bg-white text-card-foreground shadow-lg transition-all duration-300 ${className}`}
    {...props}
  />
));
Card.displayName = "Card";

const Button = forwardRef(
  ({ className = "", variant = "secondary", size = "sm", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md font-semibold transition-colors duration-200";
    const variants = {
      secondary:
        "bg-white text-[#0c2d67] border border-gray-300 hover:bg-gray-100",
    };
    const sizes = { sm: "text-xs px-5 py-2 h-auto" };
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

const VideoCard = ({ videoSrc, type, color, offsetClass }) => {
  const videoRef = useRef(null);
  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => videoRef.current?.pause();

  return (
    <div
      className={`snap-center relative w-48 h-32 sm:w-56 sm:h-36 lg:w-64 lg:h-40 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl border-4 ${color} bg-white transform hover:scale-105 hover:z-20 transition-transform duration-300 ${offsetClass}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        alt={`${type} interior video`}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        preload="metadata"
      />
      <div
        className="absolute inset-0 flex flex-col justify-end p-3 text-white text-2xl sm:text-3xl font-semibold opacity-90 transition-opacity"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      >
        <span className="[text-shadow:_0_2px_4px_rgb(0_0_0_/_70%)] font-bold text-3xl">
          {type}
        </span>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    let direction = 1;

    const autoScroll = () => {
      if (!scrollContainer) return;
      scrollContainer.scrollBy({
        left: direction,
        behavior: "smooth",
      });

      if (
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth - 2 ||
        scrollContainer.scrollLeft <= 0
      ) {
        direction *= -1;
      }
    };

    const interval = setInterval(autoScroll, 30); // smooth & continuous
    return () => clearInterval(interval);
  }, []);

  const propertyCards = [
    { type: "2 BHK", video: bhk2Video, color: "border-red-700" },
    { type: "2.5 BHK", video: bhk25Video, color: "border-purple-700" },
    { type: "3 BHK", video: bhk3Video, color: "border-yellow-700" },
    { type: "3.5 BHK", video: bhk35Video, color: "border-orange-700" },
  ];

  const features = [
    { icon: CheckCircle, title: "Verified Listings", subtitle: "By Admin" },
    { icon: Users, title: "Direct Builder", subtitle: "admin collaboration" },
    { icon: CreditCard, title: "Home Loan", subtitle: "Assistance" },
  ];

  return (
    <div className="bg-white overflow-hidden w-full">
      <div className="text-center pt-12 pb-24 sm:pb-28">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#623654] px-4">
          <span className="italic text-gray-400">Find</span> Your Dream{" "}
          <span className="italic text-gray-400">Property</span> with Verified{" "}
          <span className="italic">Listings</span>
        </h1>
      </div>

      <div className="bg-[#623654] relative text-white pb-24 sm:pb-28 pt-6">
        <div className="relative -mt-20 z-10">
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex justify-start gap-4 overflow-x-auto snap-x snap-mandatory pt-12 pb-12 md:justify-center md:gap-6 scrollbar-hide"
            >
              {propertyCards.map((card, index) => {
                let extraClasses = "";
                if (index === 0) extraClasses += "pl-4 sm:pl-0 md:pl-0 ";
                if (index === propertyCards.length - 1)
                  extraClasses += "pr-4 sm:pr-0 md:pr-0 ";
                const offsetClass =
                  card.type === "2 BHK" || card.type === "3 BHK"
                    ? "-translate-y-10"
                    : card.type === "2.5 BHK" || card.type === "3.5 BHK"
                    ? "-translate-y-2"
                    : "";
                return (
                  <VideoCard
                    key={card.type}
                    videoSrc={card.video}
                    type={card.type}
                    color={card.color}
                    offsetClass={`${offsetClass} ${extraClasses}`}
                  />
                );
              })}
            </div>
            <button className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 z-30">
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-6 items-center text-center pt-0">
            <p className="text-sm leading-relaxed max-w-lg">
              We bridge the gap between builders and buyers by offering a trusted,
              transparent, and admin-verified platform for discovering and
              investing in real estate.
            </p>
            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/properties">
                <Button>Explore Properties</Button>
              </Link>
              <Button>Contact Admin</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative -mt-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <Card
              key={i}
              className="bg-gray-50 text-gray-900 p-4 text-center flex flex-col items-center justify-center h-32 sm:h-36"
            >
              <div className="flex justify-center mb-2">
                <feature.icon className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="text-sm font-semibold">{feature.title}</h4>
              <p className="text-xs text-gray-500">{feature.subtitle}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
