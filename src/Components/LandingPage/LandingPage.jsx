"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Search,
  Users,
  PlusCircle,
  MapPin,
  Calendar,
  Heart,
  Coffee,
  Map,
  Globe,
  Compass,
  ChevronDown,
} from "lucide-react";
import FooterComponent from "../navBar/FooterComponent";

const API_URL = "https://rrn24.techchantier.site/malingo/public/api/activity";
const FALLBACK_IMAGE = "/src/assets/fallback_image.png";

// Color palette from SRS document
const colors = {
  primary: "#007CC3", // Blue from SRS
  secondary: "#FF8C00", // Orange from SRS
  accent: "#F4F4F4", // Light Grey from SRS
  text: "#333333", // Dark Grey from SRS
  background: "#FFFFFF", // White from SRS
};

export default function LandingPage() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setActivities(data);
        setFilteredActivities(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load activities.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredActivities(activities);
      return;
    }

    const filtered = activities.filter(
      (activity) =>
        activity.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredActivities(filtered);
  }, [searchQuery, activities]);

  // Animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const buttonHover = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 124, 195, 0.2)",
      transition: { duration: 0.3 },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="bg-white text-black">
      {/* Navigation Bar - Fixed on scroll */}
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <motion.h1
              className="text-2xl font-bold flex items-center"
              style={{ color: isScrolled ? colors.text : colors.primary }}
            >
              <motion.span
                style={{ color: colors.secondary }}
                animate={{
                  scale: [1, 1.1, 1],
                  rotateZ: [0, 5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                M
              </motion.span>
              <span>alingo</span>
            </motion.h1>
          </motion.div>

          <div className="hidden md:flex space-x-6 items-center">
            <motion.a
              whileHover={{ color: colors.primary, scale: 1.05 }}
              className="font-medium transition-colors"
              href="#how-it-works"
            >
              How It Works
            </motion.a>
            <motion.a
              whileHover={{ color: colors.primary, scale: 1.05 }}
              className="font-medium transition-colors"
              href="#why-choose"
            >
              Why Choose Us
            </motion.a>
            <motion.a
              whileHover={{ color: colors.primary, scale: 1.05 }}
              className="font-medium transition-colors"
              href="/about"
            >
              About
            </motion.a>
            <motion.a
              whileHover={{ color: colors.primary, scale: 1.05 }}
              className="font-medium transition-colors"
              href="/contact"
            >
              Contact
            </motion.a>
          </div>

          <div className="flex space-x-3">
            <motion.div
              variants={buttonHover}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-2 font-medium"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Log In
                </Button>
              </Link>
            </motion.div>
            <motion.div
              variants={buttonHover}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/signup">
                <Button
                  className="font-medium"
                  style={{ backgroundColor: colors.primary, color: "white" }}
                >
                  Sign Up
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        className="pt-32 pb-20 px-4 bg-gradient-to-b from-blue-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: colors.text }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Connect Through{" "}
              <span style={{ color: colors.primary }}>Shared</span> Experiences
            </motion.h2>
            <motion.p
              className="text-lg mb-8 text-gray-600 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Malingo brings people together through meaningful activities. From
              hiking and dining to travel and concerts – discover, join, and
              create memories together.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div
                variants={buttonHover}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/signup">
                  <Button
                    className="w-full sm:w-auto font-medium text-lg px-8 py-6"
                    style={{ backgroundColor: colors.primary, color: "white" }}
                  >
                    Get Started
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                variants={buttonHover}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <Link to="#how-it-works">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto font-medium text-lg px-8 py-6 border-2 flex items-center gap-2"
                    style={{
                      borderColor: colors.primary,
                      color: colors.primary,
                    }}
                  >
                    Learn More <ChevronDown size={18} />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative">
              {/* Hero image with animations */}
              <motion.img
                src="/src/Components/LandingPage/230616-juneteenth-grays-peak-ac-931p-25432d.webp"
                alt="People enjoying activities together"
                className="rounded-lg shadow-xl w-full object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              {/* Floating elements */}
              <motion.div
                className="absolute -top-5 -left-5 bg-white p-3 rounded-lg shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Heart size={24} color={colors.secondary} />
              </motion.div>
              <motion.div
                className="absolute -bottom-5 -right-5 bg-white p-3 rounded-lg shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <Globe size={24} color={colors.primary} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              className="p-6 rounded-lg"
              whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-4xl font-bold mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{ color: colors.primary }}
              >
                500+
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Activities</h3>
              <p className="text-gray-600">
                Join diverse activities happening near you
              </p>
            </motion.div>

            <motion.div
              className="p-6 rounded-lg"
              whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-4xl font-bold mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.3,
                }}
                style={{ color: colors.primary }}
              >
                10K+
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Members</h3>
              <p className="text-gray-600">
                Connect with like-minded individuals
              </p>
            </motion.div>

            <motion.div
              className="p-6 rounded-lg"
              whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-4xl font-bold mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.6,
                }}
                style={{ color: colors.primary }}
              >
                30+
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Categories</h3>
              <p className="text-gray-600">
                From hiking to dining, find your passion
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* How to use Malingo Section */}
      <motion.div
        id="how-it-works"
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: colors.text }}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              How to Use <span style={{ color: colors.primary }}>Malingo</span>
            </motion.h2>
            <motion.p
              className="max-w-2xl mx-auto text-gray-600 text-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Start your journey to meaningful connections in just a few simple
              steps
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden"
              custom={0}
              variants={fadeInUp}
              whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-blue-100 opacity-50"></div>
              <motion.div
                className="relative z-10 mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full"
                style={{ backgroundColor: `${colors.primary}20` }}
              >
                <Search size={28} color={colors.primary} />
              </motion.div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: colors.text }}
              >
                1. Discover Activities
              </h3>
              <p className="text-gray-600">
                Browse through a variety of activities or use the search
                function to find exactly what interests you based on category,
                location, or date.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden"
              custom={1}
              variants={fadeInUp}
              whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-orange-100 opacity-50"></div>
              <motion.div
                className="relative z-10 mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full"
                style={{ backgroundColor: `${colors.secondary}20` }}
              >
                <Users size={28} color={colors.secondary} />
              </motion.div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: colors.text }}
              >
                2. Join or Create
              </h3>
              <p className="text-gray-600">
                Join activities that interest you with a simple click, or create
                your own event and invite others to join your adventure.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden"
              custom={2}
              variants={fadeInUp}
              whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-blue-100 opacity-50"></div>
              <motion.div
                className="relative z-10 mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full"
                style={{ backgroundColor: `${colors.primary}20` }}
              >
                <Compass size={28} color={colors.primary} />
              </motion.div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: colors.text }}
              >
                3. Connect & Enjoy
              </h3>
              <p className="text-gray-600">
                Communicate with organizers, get all details through
                notifications, and enjoy meaningful experiences with your new
                connections.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Why Choose Malingo Section */}
      <motion.div
        id="why-choose"
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: colors.text }}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Why Choose <span style={{ color: colors.primary }}>Malingo</span>?
            </motion.h2>
            <motion.p
              className="max-w-2xl mx-auto text-gray-600 text-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              We're on a mission to help you overcome loneliness through
              meaningful experiences
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/src/Components/LandingPage/friends_playing_laser_tag.webp"
                alt="People connecting through activities"
                className="rounded-lg shadow-xl w-full object-cover"
              />
              {/* Floating elements */}
              <motion.div
                className="absolute -top-5 -right-5 bg-white p-3 rounded-lg shadow-lg"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Coffee size={24} color={colors.secondary} />
              </motion.div>
              <motion.div
                className="absolute -bottom-5 -left-5 bg-white p-3 rounded-lg shadow-lg"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              >
                <Map size={24} color={colors.primary} />
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="mb-8" custom={0} variants={fadeInUp}>
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <div
                      className="p-3 rounded-full"
                      style={{ backgroundColor: `${colors.primary}20` }}
                    >
                      <Heart size={24} color={colors.primary} />
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: colors.text }}
                    >
                      Combat Loneliness
                    </h3>
                    <p className="text-gray-600">
                      Malingo was created with a singular focus: to help people
                      overcome loneliness by fostering real-world connections
                      through shared interests and activities.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="mb-8" custom={1} variants={fadeInUp}>
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <div
                      className="p-3 rounded-full"
                      style={{ backgroundColor: `${colors.secondary}20` }}
                    >
                      <MapPin size={24} color={colors.secondary} />
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: colors.text }}
                    >
                      Local & Global Connections
                    </h3>
                    <p className="text-gray-600">
                      Whether you're looking to connect with people in your
                      neighborhood or planning activities while traveling,
                      Malingo helps you find companions wherever you go.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="mb-8" custom={2} variants={fadeInUp}>
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <div
                      className="p-3 rounded-full"
                      style={{ backgroundColor: `${colors.primary}20` }}
                    >
                      <Calendar size={24} color={colors.primary} />
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: colors.text }}
                    >
                      Diverse Activities
                    </h3>
                    <p className="text-gray-600">
                      From hiking and dining to traveling and concerts – Malingo
                      offers a wide range of activities to suit everyone's
                      interests and preferences.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div custom={3} variants={fadeInUp}>
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <div
                      className="p-3 rounded-full"
                      style={{ backgroundColor: `${colors.secondary}20` }}
                    >
                      <Users size={24} color={colors.secondary} />
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: colors.text }}
                    >
                      Safe & Supportive Community
                    </h3>
                    <p className="text-gray-600">
                      Our platform is built with safety in mind, with features
                      to verify users and activities, ensuring a supportive
                      environment for meaningful connections.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="py-16 bg-blue-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl font-bold mb-4"
              style={{ color: colors.text }}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Find Your Next{" "}
              <span style={{ color: colors.primary }}>Adventure</span>
            </motion.h2>
            <motion.p
              className="max-w-2xl mx-auto text-gray-600"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Discover activities happening around you or create your own
            </motion.p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-lg shadow-lg">
              <div className="flex-1 flex items-center border-b sm:border-b-0 sm:border-r border-gray-200 px-4 py-2">
                <Search size={20} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search activities..."
                  className="w-full bg-transparent border-none focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <motion.div
                variants={buttonHover}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="w-full sm:w-auto px-8"
                  style={{ backgroundColor: colors.primary, color: "white" }}
                >
                  Search
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Activity Cards */}
      <motion.div
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl font-bold mb-4"
              style={{ color: colors.text }}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Featured <span style={{ color: colors.primary }}>Activities</span>
            </motion.h2>
            <motion.p
              className="max-w-2xl mx-auto text-gray-600"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Discover some of the most exciting activities happening around
              you!
            </motion.p>
          </motion.div>{" "}
        </div>

        {/* Activity Cards Grid*/}
        <div className="grid mx-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                y: -10,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 },
              }}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => setSelectedActivity(activity)}
            >
              <div className="relative">
                <img
                  src={activity.ActivityPhoto || FALLBACK_IMAGE}
                  alt={activity.title}
                  className="w-full h-48 object-cover"
                />
                <motion.div
                  className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: colors.secondary, color: "white" }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {activity.category || "Activity"}
                </motion.div>
              </div>
              <div className="p-4">
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: colors.text }}
                >
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {activity.description && activity.description.length > 80
                    ? activity.description.substring(0, 80) + "..."
                    : activity.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <MapPin size={16} className="mr-1" /> {activity.location}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar size={16} className="mr-1" /> {activity.date} at{" "}
                  {activity.time}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Users size={16} className="mr-1" />{" "}
                  {activity.numberOfMembers || "0"} members
                </div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    className="w-full"
                    style={{ backgroundColor: colors.primary, color: "white" }}
                  >
                    See more
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl font-medium mb-2">No activities found</h3>
            <p className="text-gray-500">
              Try adjusting your search or create a new activity!
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="mt-4"
                style={{ backgroundColor: colors.primary, color: "white" }}
              >
                <PlusCircle size={16} className="mr-2" /> Create Activity
              </Button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
      {/* Activity Details Popup */}
      {selectedActivity && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden relative"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
          >
            <motion.button
              onClick={() => setSelectedActivity(null)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md"
              whileHover={{
                scale: 1.1,
                rotate: 90,
                backgroundColor: "#f8f8f8",
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes size={16} style={{ color: colors.text }} />
            </motion.button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-full">
                <motion.img
                  src={selectedActivity.ActivityPhoto || FALLBACK_IMAGE}
                  alt={selectedActivity.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <motion.div
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
                    style={{
                      backgroundColor: colors.secondary,
                      color: "white",
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedActivity.category || "Activity"}
                  </motion.div>
                  <motion.h3
                    className="text-2xl font-bold text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedActivity.title}
                  </motion.h3>
                </div>
              </div>

              <div className="p-6 flex flex-col h-full">
                <div className="mb-6 flex-grow">
                  <motion.div
                    className="flex flex-wrap gap-4 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className="flex items-center text-sm text-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <MapPin
                        size={18}
                        style={{ color: colors.primary }}
                        className="mr-1"
                      />
                      {selectedActivity.location}
                    </motion.div>
                    <motion.div
                      className="flex items-center text-sm text-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Calendar
                        size={18}
                        style={{ color: colors.primary }}
                        className="mr-1"
                      />
                      {selectedActivity.date} at {selectedActivity.time}
                    </motion.div>
                    <motion.div
                      className="flex items-center text-sm text-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Users
                        size={18}
                        style={{ color: colors.primary }}
                        className="mr-1"
                      />
                      {selectedActivity.numberOfMembers || "0"} members
                    </motion.div>
                  </motion.div>

                  <motion.h4
                    className="text-lg font-medium mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    About this activity
                  </motion.h4>
                  <motion.p
                    className="text-gray-700 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {selectedActivity.description}
                  </motion.p>

                  {selectedActivity.link && (
                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h4 className="text-lg font-medium mb-2">Group Link</h4>
                      <motion.a
                        href={selectedActivity.link}
                        className="inline-flex items-center text-sm underline"
                        style={{ color: colors.primary }}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                      >
                        {selectedActivity.title} group
                      </motion.a>
                    </motion.div>
                  )}
                </div>

                <motion.div
                  className="mt-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    onClick={() => handleJoinActivity(selectedActivity.id)}
                    className="w-full py-3"
                    style={{
                      backgroundColor: colors.primary,
                      color: "white",
                    }}
                  >
                    Join Activity
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      <footer className="h-5 text-center  p-6" style={{ background: colors.primary} }>
      <p className="text-bold text-white">&copy; 2025 Malingo</p>
      </footer>
    </div>
  );
}
