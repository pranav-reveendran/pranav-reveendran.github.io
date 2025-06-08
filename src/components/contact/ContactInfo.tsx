import React from 'react';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-serif font-bold text-text mb-6">
        Contact Information
      </h3>
      
      <div className="space-y-6">
        <div className="flex items-start group hover:-translate-y-1 transition-transform duration-300">
          <div className="bg-accent/10 p-3 rounded-full mr-4 group-hover:bg-accent/20 transition-colors">
            <Mail className="text-accent h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium text-text">Email</h4>
            <a href="mailto:pranav.reveendran@sjsu.edu" className="text-text/70 hover:text-accent transition-colors">
              pranav.reveendran@sjsu.edu
            </a>
          </div>
        </div>
        
        <div className="flex items-start group hover:-translate-y-1 transition-transform duration-300">
          <div className="bg-accent/10 p-3 rounded-full mr-4 group-hover:bg-accent/20 transition-colors">
            <Phone className="text-accent h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium text-text">Phone</h4>
            <a href="tel:+16693357762" className="text-text/70 hover:text-accent transition-colors">
              +1 669 335 7762
            </a>
          </div>
        </div>
        
        <div className="flex items-start group hover:-translate-y-1 transition-transform duration-300">
          <div className="bg-accent/10 p-3 rounded-full mr-4 group-hover:bg-accent/20 transition-colors">
            <MapPin className="text-accent h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium text-text">Location</h4>
            <p className="text-text/70">
              San Francisco, California (PST)
            </p>
          </div>
        </div>

        <div className="flex items-start group hover:-translate-y-1 transition-transform duration-300">
          <div className="bg-accent/10 p-3 rounded-full mr-4 group-hover:bg-accent/20 transition-colors">
            <Clock className="text-accent h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium text-text">Availability</h4>
            <p className="text-text/70">
              Monday - Friday: 9:00 AM - 5:00 PM PST
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
