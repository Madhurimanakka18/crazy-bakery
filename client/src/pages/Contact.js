import emailjs from '@emailjs/browser';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
const handleSubmit = (e) => {
  e.preventDefault();
  if (!form.name || !form.email || !form.message) {
    toast.error('Please fill all required fields!');
    return;
  }
  setSending(true);
  emailjs.send(
    'service_urjt5sq',
    'template_o8d3wrj',
    {
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    },
    'shqUMSS4krkL2iMs4'
  ).then(() => {
    toast.success('🎉 Message sent! We\'ll get back to you soon.');
    setForm({ name: '', email: '', phone: '', message: '' });
    setSending(false);
  }).catch(() => {
    toast.error('Something went wrong. Please try again!');
    setSending(false);
  });
};

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you — say hello!</p>
        <div className="divider" />
      </div>

      <div className="contact-body container">
        {/* Info Cards */}
        <div className="contact-cards">
          {[
            {
              icon: '📍',
              title: 'Our Location',
              lines: ['Crazy Bakery', 'Kompally, Hyderabad', 'Telangana - 500014'],
              action: { label: 'Get Directions', href: 'https://maps.google.com/?q=Kompally+Hyderabad' },
            },
            {
              icon: '📞',
              title: 'Call Us',
              lines: ['+91 98765 43210', '+91 91234 56789', 'Mon–Sun: 7AM – 10PM'],
              action: { label: 'Call Now', href: 'tel:+919876543210' },
            },
            {
              icon: '✉️',
              title: 'Email Us',
              lines: ['madhuuu184@gmail.com', 'orders@madhuuu184.in', 'We reply within 2 hours'],
              action: { label: 'Send Email', href: 'mailto:crazybakery@gmail.com' },
            },
            {
              icon: '💬',
              title: 'WhatsApp',
              lines: ['+91 98765 43210', 'Chat for quick orders', 'Usually replies instantly'],
              action: {
                label: 'Open WhatsApp',
                href: 'https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order%20from%20Crazy%20Bakery',
                green: true,
              },
            },
          ].map(({ icon, title, lines, action }) => (
            <div key={title} className="info-card">
              <span className="info-icon">{icon}</span>
              <h3>{title}</h3>
              {lines.map(l => <p key={l}>{l}</p>)}
              <a
                href={action.href}
                target="_blank"
                rel="noreferrer"
                className={`info-action ${action.green ? 'green' : ''}`}
              >
                {action.label} →
              </a>
            </div>
          ))}
        </div>

        {/* Contact Form + Map */}
        <div className="contact-main">
          {/* Form */}
          <div className="contact-form-wrap">
            <h2>Send us a Message</h2>
            <p>Have a custom order or question? We're happy to help!</p>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Rishendra"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="rishi@example.com"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your order, custom cake requirements, or anything else..."
                  required
                />
              </div>
              <button type="submit" className="btn-primary" disabled={sending}>
                {sending ? '⏳ Sending...' : '📨 Send Message'}
              </button>
            </form>
          </div>

          {/* Map Embed */}
          <div className="map-wrap">
            <h2>Find Us Here</h2>
            <p>We're located in the heart of Kompally, Hyderabad.</p>
            <div className="map-container">
              <iframe
                title="Crazy Bakery Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30413.88!2d78.4867!3d17.5600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99dffd3a!2sKompally%2C+Hyderabad%2C+Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="reach-us">
              <h3>🚀 Order Instantly</h3>
              <div className="reach-btns">
                <a
                  href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order%20from%20Crazy%20Bakery"
                  target="_blank"
                  rel="noreferrer"
                  className="reach-btn whatsapp"
                >
                  💬 WhatsApp Order
                </a>
                <a href="mailto:crazybakery@gmail.com" className="reach-btn email">
                  ✉️ Email Order
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
