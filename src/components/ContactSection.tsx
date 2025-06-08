import React from 'react';
import ContactInfo from './contact/ContactInfo';
import SocialLinks from './contact/SocialLinks';
import ContactForm from './contact/ContactForm';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-6 md:px-12 bg-surface">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Get In Touch</h2>
          <div className="h-1 w-20 bg-accent mx-auto rounded-full"></div>
          <p className="text-text text-opacity-80 max-w-2xl mx-auto mt-6">
            Have a question or want to work together? Feel free to reach out using the contact form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <ContactInfo />
            <SocialLinks />
          </div>
          
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
