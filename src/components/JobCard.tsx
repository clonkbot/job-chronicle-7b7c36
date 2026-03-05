import { motion } from 'framer-motion';
import type { Job } from '../App';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: () => void;
}

export default function JobCard({ job, isSaved, onToggleSave }: JobCardProps) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="group relative bg-[#FEFBF3] border-2 border-[#1A1A1A] p-4 md:p-6 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#1A1A1A]"
    >
      {/* Type badge */}
      <div className="absolute -top-3 right-4 md:right-6">
        <span
          className={`
            px-3 py-1 text-xs font-bold tracking-wider uppercase
            ${job.type === 'Remote'
              ? 'bg-[#7D8E74] text-white'
              : job.type === 'Contract'
                ? 'bg-[#D4A574] text-[#1A1A1A]'
                : job.type === 'Part-time'
                  ? 'bg-[#8B7355] text-white'
                  : 'bg-[#1A1A1A] text-[#FEFBF3]'
            }
          `}
        >
          {job.type}
        </span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h2 className="font-playfair text-xl md:text-2xl font-bold text-[#1A1A1A] leading-tight mb-1 break-words">
            {job.title}
          </h2>
          <p className="text-sm md:text-base text-[#1A1A1A]/70 font-medium">
            {job.company}
          </p>
        </div>
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-[#1A1A1A]/60 mb-4 border-b border-[#1A1A1A]/10 pb-4">
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </span>
        <span className="text-[#1A1A1A]/30">|</span>
        <span className="font-semibold text-[#E85A4F]">{job.salary}</span>
        <span className="text-[#1A1A1A]/30">|</span>
        <span className="italic">{job.posted}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-[#1A1A1A]/70 leading-relaxed mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-[#1A1A1A]/5 text-[#1A1A1A]/70 border border-[#1A1A1A]/10"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-[#E85A4F] text-white py-3 text-sm font-bold tracking-wide uppercase transition-colors hover:bg-[#D4483D]"
        >
          Apply Now
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleSave}
          className={`
            w-12 h-12 flex items-center justify-center border-2 transition-all duration-200
            ${isSaved
              ? 'bg-[#1A1A1A] border-[#1A1A1A] text-[#FEFBF3]'
              : 'bg-transparent border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A]/5'
            }
          `}
          aria-label={isSaved ? 'Remove from saved' : 'Save job'}
        >
          <svg
            className="w-5 h-5"
            fill={isSaved ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </motion.button>
      </div>
    </motion.article>
  );
}
