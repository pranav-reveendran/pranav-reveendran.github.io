import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Create email content
    const emailSubject = encodeURIComponent(`Portfolio Contact: ${values.subject}`);
    const emailBody = encodeURIComponent(
      `Hi Pranav,\n\n` +
      `You have received a new message from your portfolio website:\n\n` +
      `Name: ${values.name}\n` +
      `Email: ${values.email}\n` +
      `Subject: ${values.subject}\n\n` +
      `Message:\n${values.message}\n\n` +
      `Best regards,\n${values.name}`
    );
    
    // Open email client with pre-filled content
    const mailtoLink = `mailto:pranav.reveendran@sjsu.edu?subject=${emailSubject}&body=${emailBody}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    setTimeout(() => {
      toast({
        title: "Email client opened!",
        description: "Your email client should now be open with the message pre-filled. Please send the email to complete your inquiry.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-surface p-8 rounded-md shadow-subtle border border-border">
      <h3 className="text-2xl font-serif font-bold text-text mb-6">
        Send Me a Message
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text">Your Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-bg border-border focus:border-accent focus:ring-accent transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text">Your Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="bg-bg border-border focus:border-accent focus:ring-accent transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                            <FormLabel className="text-text">Subject</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-bg border-border focus:border-accent focus:ring-accent transition-all duration-300"
                placeholder="Project Inquiry"
              />
            </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                            <FormLabel className="text-text">Message</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                className="bg-bg border-border focus:border-accent focus:ring-accent transition-all duration-300 min-h-[150px]"
                placeholder="Your message here..."
              />
            </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-white py-6 transition-all duration-300 hover:shadow-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending Message...' : 'Send Message'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
