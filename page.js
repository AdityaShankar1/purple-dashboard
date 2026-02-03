"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BookOpen, Users, Award, TrendingUp, ArrowRight, Star, CheckCircle, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  const [stats, setStats] = useState({
    courses: 150,
    students: 5000,
    certificates: 2500,
    instructors: 50,
  })

  useEffect(() => {
    // Animate numbers on load
    const timer = setTimeout(() => {
      setStats({
        courses: 150,
        students: 5000,
        certificates: 2500,
        instructors: 50,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Comprehensive Courses",
      description: "Access a wide range of courses from beginner to advanced levels",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Verified Certificates",
      description: "Earn industry-recognized certificates upon course completion",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals and experienced educators",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      content:
        "This platform transformed my career. The courses are well-structured and the certificates are recognized by employers.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      content: "Excellent learning experience with real-world projects. The progress tracking keeps me motivated.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "UX Designer",
      content: "The best online learning platform I've used. Great content and amazing support from instructors.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/pesu_isfcr_logo.jpeg"
                  alt="PESU ISFCR Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <Image src="/pesu_logo.png" alt="PESU Logo" width={40} height={40} className="rounded-lg" />
                <Image src="/soc_logo.png" alt="SOC Logo" width={40} height={40} className="rounded-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">PESU ISFCR</h1>
                <p className="text-sm text-purple-200">Security Operations Center</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-purple-200 hover:text-white transition-colors">
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Secure Learning,{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Protected Future
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto"
            >
              Advanced Learning Management System with integrated Wazuh security monitoring. Learn cybersecurity while
              being protected by enterprise-grade security.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/signup"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center gap-2 transition-colors"
              >
                Start Learning <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="border border-purple-400 text-purple-200 hover:bg-purple-400/10 px-8 py-4 rounded-lg text-lg font-semibold flex items-center gap-2 transition-colors">
                <Play className="w-5 h-5" /> Watch Demo
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Courses", value: stats.courses, suffix: "+" },
              { label: "Students", value: stats.students, suffix: "+" },
              { label: "Certificates", value: stats.certificates, suffix: "+" },
              { label: "Instructors", value: stats.instructors, suffix: "+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-purple-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Discover the features that make our learning platform the best choice for your educational journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl text-center hover:bg-purple-500/20 transition-colors"
              >
                <div className="text-purple-400 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-purple-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Our Students Say</h2>
            <p className="text-xl text-purple-200">
              Join thousands of successful learners who transformed their careers with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-purple-200 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-purple-300 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card p-12 rounded-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Learning Journey?</h2>
            <p className="text-xl text-purple-200 mb-8">
              Join our community of learners and unlock your potential today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center gap-2 transition-colors"
              >
                Get Started Free <CheckCircle className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="border border-purple-400 text-purple-200 hover:bg-purple-400/10 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md border-t border-purple-500/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/pesu_isfcr_logo.jpeg"
                  alt="PESU ISFCR Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="text-xl font-bold text-white">PESU ISFCR SOC</span>
              </div>
              <p className="text-purple-200">
                Empowering cybersecurity education with enterprise-grade security monitoring and protection.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-purple-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Certificates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Progress Tracking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-purple-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-purple-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-purple-500/20 mt-8 pt-8 text-center text-purple-200">
            <p>&copy; 2024 PESU ISFCR Security Operations Center. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
