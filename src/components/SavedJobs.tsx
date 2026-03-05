import { motion } from 'framer-motion';
import type { Job } from '../App';

interface SavedJobsProps {
  jobs: Job[];
  onBack: () => void;
  onRemove: (jobId: string) => void;
}

export default function SavedJobs({ jobs, onBack, onRemove }: SavedJobsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-12 border-b-2 border-[#1A1A1A] pb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FEFBF3] transition-colors"
            aria-label="Go back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h2 className="font-playfair text-2xl md:text-4xl font-bold text-[#1A1A1A]">
              Your Clippings
            </h2>
            <p className="text-xs md:text-sm text-[#1A1A1A]/50 mt-1">
              {jobs.length} saved {jobs.length === 1 ? 'position' : 'positions'}
            </p>
          </div>
        </div>
      </div>

      {jobs.length === 0 ? (
        <motion.div
          className="text-center py-16 md:py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-6 border-2 border-[#1A1A1A]/20 flex items-center justify-center">
            <svg className="w-8 h-8 md:w-12 md:h-12 text-[#1A1A1A]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <p className="font-playfair text-xl md:text-2xl text-[#1A1A1A]/40 italic">
            No positions saved yet
          </p>
          <p className="text-sm text-[#1A1A1A]/30 mt-2">
            Click the bookmark icon on any job to save it here
          </p>
          <button
            onClick={onBack}
            className="mt-8 px-6 py-3 bg-[#1A1A1A] text-[#FEFBF3] text-sm font-bold tracking-wide uppercase hover:bg-[#333] transition-colors"
          >
            Browse Jobs
          </button>
        </motion.div>
      ) : (
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-6 bg-white border-2 border-[#1A1A1A] hover:shadow-[4px_4px_0px_0px_#1A1A1A] transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                  <h3 className="font-playfair text-lg md:text-xl font-bold text-[#1A1A1A]">
                    {job.title}
                  </h3>
                  <span
                    className={`
                      px-2 py-0.5 text-xs font-bold tracking-wider uppercase
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
                <p className="text-sm text-[#1A1A1A]/60">
                  {job.company} · {job.location} · <span className="text-[#E85A4F] font-semibold">{job.salary}</span>
                </p>
              </div>

              <div className="flex gap-2 md:gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 md:flex-none px-4 md:px-6 py-3 bg-[#E85A4F] text-white text-sm font-bold tracking-wide uppercase hover:bg-[#D4483D] transition-colors"
                >
                  Apply
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onRemove(job.id)}
                  className="w-12 h-12 flex items-center justify-center border-2 border-[#1A1A1A]/20 text-[#1A1A1A]/40 hover:border-[#E85A4F] hover:text-[#E85A4F] transition-colors"
                  aria-label="Remove from saved"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
