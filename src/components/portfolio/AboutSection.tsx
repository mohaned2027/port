import { Palette, Code, Smartphone, Camera } from 'lucide-react';
import aboutData from '@/data/about.json';
import testimonialsData from '@/data/testimonials.json';
import TestimonialModal from './TestimonialModal';
import { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  text: string;
  date: string;
}

const getServiceIcon = (icon: string) => {
  switch (icon) {
    case 'design':
      return <Palette size={40} className="text-orange-yellow" />;
    case 'dev':
      return <Code size={40} className="text-orange-yellow" />;
    case 'app':
      return <Smartphone size={40} className="text-orange-yellow" />;
    case 'photo':
      return <Camera size={40} className="text-orange-yellow" />;
    default:
      return <Palette size={40} className="text-orange-yellow" />;
  }
};

const AboutSection = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  return (
    <article className="animate-fade-in">
      <header>
        <h2 className="article-title mb-4 sm:mb-5">About me</h2>
      </header>

      {/* Bio */}
      <section className="mb-8 sm:mb-10">
        {aboutData.bio.map((paragraph, index) => (
          <p key={index} className="text-light-gray text-sm font-light leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </section>

      {/* Services */}
      <section className="mb-8 sm:mb-10">
        <h3 className="text-white-2 text-lg mb-5">What I'm Doing</h3>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {aboutData.services.map((service) => (
            <li key={service.id} className="service-item flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 p-5 sm:p-[30px]">
              <div className="flex-shrink-0 mt-0 sm:mt-1">
                {getServiceIcon(service.icon)}
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-white-2 text-base mb-2">{service.title}</h4>
                <p className="text-light-gray text-sm font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Testimonials */}
      <section className="mb-8">
        <h3 className="text-white-2 text-lg mb-5">Testimonials</h3>
        <ul className="flex gap-4 sm:gap-[30px] overflow-x-auto custom-scrollbar -mx-4 px-4 py-6 pb-8 snap-x snap-mandatory">
          {testimonialsData.testimonials.map((testimonial) => (
            <li
              key={testimonial.id}
              className="min-w-full sm:min-w-[calc(50%-15px)] lg:min-w-[calc(50%-15px)] snap-center"
            >
              <div
                className="content-card cursor-pointer hover:scale-[1.02] transition-transform"
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <figure
                  className="absolute top-0 left-0 transform translate-x-4 -translate-y-6 sm:translate-x-[30px] sm:-translate-y-[30px] rounded-xl sm:rounded-[20px] overflow-hidden"
                  style={{ background: 'var(--bg-gradient-onyx)', boxShadow: 'var(--shadow-1)' }}
                >
                  <div className="w-[60px] h-[60px] sm:w-20 sm:h-20 bg-gradient-to-br from-jet to-onyx flex items-center justify-center text-2xl text-orange-yellow">
                    {testimonial.name.charAt(0)}
                  </div>
                </figure>

                <h4 className="text-white-2 text-base mb-2 ml-0 sm:ml-[95px]">
                  {testimonial.name}
                </h4>
                <p className="text-light-gray text-sm font-light leading-relaxed line-clamp-4 sm:line-clamp-2">
                  {testimonial.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Testimonial Modal */}
      <TestimonialModal
        testimonial={selectedTestimonial}
        onClose={() => setSelectedTestimonial(null)}
      />
    </article>
  );
};

export default AboutSection;
