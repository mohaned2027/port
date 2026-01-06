import { BookOpen, Download } from 'lucide-react';
import resumeData from '@/data/resume.json';
import profileData from '@/data/profile.json';

const ResumeSection = () => {
  return (
    <article className="animate-fade-in">
      <header>
        <h2 className="article-title mb-6 sm:mb-8">Resume</h2>
      </header>

      {/* Education */}
      <section className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="icon-box !w-12 !h-12 !rounded-xl !text-lg">
            <BookOpen size={18} />
          </div>
          <h3 className="text-white-2 text-lg">Education</h3>
        </div>

        <ol className="ml-11 sm:ml-16">
          {resumeData.education.map((item) => (
            <li key={item.id} className="timeline-item">
              <h4 className="text-white-2 text-sm leading-tight mb-2">{item.title}</h4>
              <span className="text-vegas-gold text-sm font-normal leading-relaxed block mb-2">
                {item.period}
              </span>
              <p className="text-light-gray text-sm font-light leading-relaxed max-w-[700px]">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="icon-box !w-12 !h-12 !rounded-xl !text-lg">
            <BookOpen size={18} />
          </div>
          <h3 className="text-white-2 text-lg">Experience</h3>
        </div>

        <ol className="ml-11 sm:ml-16">
          {resumeData.experience.map((item) => (
            <li key={item.id} className="timeline-item">
              <h4 className="text-white-2 text-sm leading-tight mb-2">{item.title}</h4>
              <span className="text-vegas-gold text-sm font-normal leading-relaxed block mb-2">
                {item.period}
              </span>
              <p className="text-light-gray text-sm font-light leading-relaxed max-w-[700px]">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h3 className="text-white-2 text-lg mb-5">My Skills</h3>
        <div className="content-card !pt-5 !p-5">
          <ul className="space-y-4">
            {resumeData.skills.map((skill, index) => (
              <li key={index}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h5 className="text-white-2 text-[13px] font-medium">{skill.name}</h5>
                  <data className="text-light-gray text-[13px] font-light" value={skill.percentage}>
                    {skill.percentage}%
                  </data>
                </div>
                <div className="skill-progress-bg">
                  <div
                    className="skill-progress-fill transition-all duration-500"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Download CV Button */}
      <section className="mt-10">
        <a
          href={profileData.cv_url}
          download
          className="form-btn download-btn inline-flex w-auto !px-8 group"
        >
          <Download size={18} className="group-hover:animate-bounce" />
          <span>Download CV</span>
        </a>
      </section>
    </article>
  );
};

export default ResumeSection;
