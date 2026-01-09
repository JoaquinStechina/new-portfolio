"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import Whatsapp from "../Icons/Whatsapp/Whatsapp";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const EMAILJS_CONFIG = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
  };

  const contactInfo = [
    {
      icon: <Mail className="h-4 w-4" />,
      text: "joaquinstechina12@gmail.com",
      href: "mailto:joaquinstechina12@gmail.com",
    },
    {
      icon: <Whatsapp size={20} color="white" />,
      text: "+54 9 3482-204125",
      href: "https://wa.me/+543482204125",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Por favor completa todos los campos");
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "joaquinstechina12@gmail.com",
        to_name: "Joaquín",
        reply_to: formData.email,
        date: new Date().toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      setStatus({
        type: "success",
        message: "¡Message sent! I'll answer you soon.",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setStatus({ type: null, message: "" });
      }, 5000);
    } catch (error) {
      console.error("Error al enviar el email:", error);

      let errorMessage = "There was an error sending the message. Try again.";

      if (error instanceof Error) {
        if (error.message.includes("Por favor completa")) {
          errorMessage = error.message;
        } else if (error.message.includes("Network Error")) {
          errorMessage = "Connection error. Check your internet network.";
        }
      }

      setStatus({
        type: "error",
        message: errorMessage,
      });

      setTimeout(() => {
        setStatus({ type: null, message: "" });
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="contact"
      className="flex items-center justify-center max-lg:mt-3 lg:h-screen max-lg:w-3/4 lg:w-1/2 p-4"
    >
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl mb-2">My Contact</h1>
          <p className="text-[var(--foreground)] opacity-70">
            Do you have a project in mind? Let's talk.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border-2 rounded-2xl border-[var(--primary)] border-opacity-20 text-[var(--foreground)] hover:bg-[var(--card)] transition-colors"
            >
              {info.icon}
              <span className="text-sm">{info.text}</span>
            </a>
          ))}
        </div>

        {status.type && (
          <div
            className={`p-4 rounded-2xl border-2 ${
              status.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center gap-3">
              {status.type === "success" ? (
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
              )}
              <p className="text-sm">{status.message}</p>
            </div>
          </div>
        )}

        <Card className="border-2 border-[var(--primary)] bg-[var(--card)] rounded-2xl">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[var(--foreground)]">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name here"
                  className="border-2 border-[var(--primary)] border-opacity-30"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[var(--foreground)]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email@here.com"
                  className="border-2 border-[var(--primary)] border-opacity-30"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-[var(--foreground)]">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can I help you?"
                  className="min-h-[100px] border-2 border-[var(--primary)] border-opacity-30"
                  required
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--primary)] hover:bg-[var(--primary)] hover:opacity-80 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
