import { ChevronDown, Mail, Phone, Calendar, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import profileData from '@/data/profile.json';
import avatarImage from '@/assets/avatar.png';

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isExpanded, onToggle }: SidebarProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook size={18} />;
      case 'twitter':
        return <Twitter size={18} />;
      case 'instagram':
        return <Instagram size={18} />;
      default:
        return null;
    }
  };

  return (
    <aside
      className={`card-gradient mb-4 lg:mb-0 lg:sticky lg:top-[60px] lg:h-fit transition-all duration-500 overflow-hidden
        ${isExpanded ? 'max-h-[600px] lg:max-h-none' : 'max-h-[112px] sm:max-h-[180px] lg:max-h-none'}
      `}
    >
      {/* Basic Info */}
      <div className="relative flex items-center gap-4 sm:gap-6">
        <figure className="rounded-2xl sm:rounded-3xl overflow-hidden" style={{ background: 'var(--bg-gradient-onyx)' }}>
          <img 
            src={avatarImage} 
            alt={profileData.name}
            className="w-20 h-20 sm:w-[120px] sm:h-[120px] lg:w-[150px] lg:h-[150px] object-cover"
          />
        </figure>

        <div className="flex-1 lg:text-center lg:w-full">
          <h1 className="text-white-2 text-[17px] font-medium tracking-tight mb-2 lg:mb-4 lg:whitespace-nowrap">
            {profileData.name}
          </h1>
          <p className="bg-onyx text-white-1 text-[11px] sm:text-xs font-light w-fit px-3 py-1 rounded-lg lg:mx-auto">
            {profileData.title}
          </p>
        </div>

        {/* Toggle Button - Hidden on large screens */}
        <button
          onClick={onToggle}
          className="absolute -top-4 -right-4 sm:-top-[30px] sm:-right-[30px] lg:hidden rounded-none sm:rounded-tl-none rounded-tr-[15px] rounded-br-none rounded-bl-[15px] p-2.5 sm:px-4 sm:py-2.5 z-[1] transition-all duration-[250ms] group"
          style={{ background: 'var(--border-gradient-onyx)', boxShadow: 'var(--shadow-2)' }}
        >
          <span className="hidden sm:block text-xs text-orange-yellow">
            {isExpanded ? 'Hide Contacts' : 'Show Contacts'}
          </span>
          <ChevronDown
            className={`sm:hidden text-orange-yellow transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            size={16}
          />
        </button>
      </div>

      {/* Expandable Info */}
      <div
        className={`transition-all duration-500 lg:opacity-100 lg:visible
          ${isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible lg:opacity-100 lg:visible'}
        `}
      >
        {/* Separator */}
        <div className="w-full h-px bg-jet my-4 lg:my-8" />

        {/* Contact List */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">
          <li className="flex items-center gap-4">
            <div className="icon-box">
              <Mail size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-light-gray/70 text-[11px] uppercase mb-0.5">Email</p>
              <a
                href={`mailto:${profileData.email}`}
                className="text-white-2 text-[13px] hover:text-orange-yellow transition-colors truncate block"
              >
                {profileData.email}
              </a>
            </div>
          </li>

          <li className="flex items-center gap-4">
            <div className="icon-box">
              <Phone size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-light-gray/70 text-[11px] uppercase mb-0.5">Phone</p>
              <a
                href={`tel:${profileData.phone}`}
                className="text-white-2 text-[13px] hover:text-orange-yellow transition-colors"
              >
                {profileData.phone}
              </a>
            </div>
          </li>

          <li className="flex items-center gap-4">
            <div className="icon-box">
              <Calendar size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-light-gray/70 text-[11px] uppercase mb-0.5">Birthday</p>
              <time className="text-white-2 text-[13px]">{formatDate(profileData.birthday)}</time>
            </div>
          </li>

          <li className="flex items-center gap-4">
            <div className="icon-box">
              <MapPin size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-light-gray/70 text-[11px] uppercase mb-0.5">Location</p>
              <address className="text-white-2 text-[13px] not-italic">{profileData.location}</address>
            </div>
          </li>
        </ul>

        {/* Separator */}
        <div className="w-full h-px bg-jet my-4 lg:my-4 lg:opacity-0" />

        {/* Social Links */}
        <ul className="flex items-center gap-4 pl-2 pb-1 lg:justify-center">
          {profileData.social_links.map((social, index) => (
            <li key={index}>
              <a
                href={social.url}
                className="text-light-gray/70 hover:text-light-gray transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {getSocialIcon(social.platform)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
