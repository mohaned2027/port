import { useState } from 'react';
import { Send } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = formData.fullname.trim() && formData.email.trim() && formData.message.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Reset form
    setFormData({ fullname: '', email: '', message: '' });
    setIsSubmitting(false);
    
    // Show success message (you can add toast notification here)
    alert('Message sent successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <article className="animate-fade-in">
      <header>
        <h2 className="article-title mb-6 sm:mb-8">Contact</h2>
      </header>

      {/* Map */}
      <section className="relative h-[250px] sm:h-[380px] w-full rounded-2xl sm:rounded-[18px] mb-8 border border-jet overflow-hidden">
        <figure className="h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199666.5651251294!2d-121.58334177520186!3d38.56165006739519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac672b28397f9%3A0x921f6aaa74197fdb!2sSacramento%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1647608789441!5m2!1sen!2sbd"
            className="w-full h-full border-none grayscale invert"
            loading="lazy"
            title="Location Map"
          />
        </figure>
      </section>

      {/* Contact Form */}
      <section className="mb-3">
        <h3 className="text-white-2 text-lg mb-5">Contact Form</h3>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Full name"
              required
              className="bg-transparent text-white-2 text-sm font-normal py-3.5 sm:py-4 px-5 border border-jet rounded-xl outline-none focus:border-orange-yellow transition-colors placeholder:font-medium"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className="bg-transparent text-white-2 text-sm font-normal py-3.5 sm:py-4 px-5 border border-jet rounded-xl outline-none focus:border-orange-yellow focus:invalid:border-destructive transition-colors placeholder:font-medium"
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="w-full bg-transparent text-white-2 text-sm font-normal py-3.5 sm:py-4 px-5 border border-jet rounded-xl outline-none focus:border-orange-yellow min-h-[100px] h-[120px] max-h-[200px] resize-y mb-6 sm:mb-8 placeholder:font-medium"
          />

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="form-btn md:w-auto md:ml-auto md:px-8"
          >
            <Send size={16} />
            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          </button>
        </form>
      </section>
    </article>
  );
};

export default ContactSection;
