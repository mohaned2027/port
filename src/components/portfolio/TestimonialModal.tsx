import { X, Quote } from 'lucide-react';
import { useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  text: string;
  date: string;
}

interface TestimonialModalProps {
  testimonial: Testimonial | null;
  onClose: () => void;
}

const TestimonialModal = ({ testimonial, onClose }: TestimonialModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (testimonial) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [testimonial, onClose]);

  if (!testimonial) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center overflow-y-auto z-20">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/80 transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <section
        className="relative bg-eerie-black-2 p-4 sm:p-[30px] m-4 border border-jet rounded-xl sm:rounded-[20px] shadow-portfolio-5 z-10 max-w-[680px] w-full flex flex-col sm:flex-row gap-4 sm:gap-6 animate-scale-up"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-onyx rounded-lg w-8 h-8 flex justify-center items-center text-white-2 text-lg opacity-70 hover:opacity-100 transition-opacity"
        >
          <X size={18} strokeWidth={3} />
        </button>

        {/* Avatar and Quote */}
        <div className="flex flex-col items-center flex-shrink-0">
          <figure
            className="rounded-[18px] overflow-hidden mb-0 sm:mb-4"
            style={{ background: 'var(--bg-gradient-onyx)', boxShadow: 'var(--shadow-2)' }}
          >
            <div className="w-[65px] h-[65px] sm:w-20 sm:h-20 bg-gradient-to-br from-jet to-onyx flex items-center justify-center text-2xl sm:text-3xl text-orange-yellow">
              {testimonial.name.charAt(0)}
            </div>
          </figure>
          <Quote className="hidden sm:block text-orange-yellow flex-grow w-9 opacity-50" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h4 className="text-white-2 text-lg mb-1">{testimonial.name}</h4>
          <time className="text-sm text-light-gray/70 font-light block mb-3">
            {formatDate(testimonial.date)}
          </time>
          <p className="text-light-gray text-sm font-light leading-relaxed">
            {testimonial.text}
          </p>
        </div>
      </section>
    </div>
  );
};

export default TestimonialModal;
