
import React from 'react';
import { Linkedin, Github, Instagram, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <footer className="py-16 px-6 bg-black text-white">
      <div className="container mx-auto">
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.a 
            href="#" 
            className="text-3xl font-display font-bold mb-8 inline-block hover:opacity-80 transition-opacity no-underline"
            variants={fadeInUp}
          >
            Portfolio
          </motion.a>
          
          <motion.nav className="mb-12" variants={fadeInUp}>
            <ul className="flex flex-wrap justify-center gap-2 md:gap-8">
              <li><a href="#" className="px-4 py-2 hover:bg-white/10 rounded-md transition-colors no-underline">Home</a></li>
              <li><a href="#about" className="px-4 py-2 hover:bg-white/10 rounded-md transition-colors no-underline">About</a></li>
              <li><a href="#projects" className="px-4 py-2 hover:bg-white/10 rounded-md transition-colors no-underline">Projects</a></li>
              <li><a href="#skills" className="px-4 py-2 hover:bg-white/10 rounded-md transition-colors no-underline">Skills</a></li>
              <li><a href="#contact" className="px-4 py-2 hover:bg-white/10 rounded-md transition-colors no-underline">Contact</a></li>
            </ul>
          </motion.nav>
          
          <motion.div 
            className="flex justify-center space-x-6 mb-12"
            variants={fadeInUp}
          >
            {[
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Instagram, href: "#", label: "Instagram" },
              { icon: Mail, href: "#contact", label: "Email" }
            ].map(({ icon: Icon, href, label }) => (
              <a 
                key={label}
                href={href} 
                className="bg-white/10 hover:bg-white/20 text-white p-3.5 rounded-full transition-all duration-300 no-underline"
                aria-label={label}
              >
                <Icon size={22} />
              </a>
            ))}
          </motion.div>
          
          <motion.div 
            className="border-t border-white/20 pt-10"
            variants={fadeInUp}
          >
            <p className="text-white text-opacity-80">
              © {currentYear} Pranav Reveendran.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
