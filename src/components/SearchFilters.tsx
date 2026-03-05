import { motion } from 'framer-motion';

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  resultCount: number;
}

const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Remote'];

export default function SearchFilters({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  resultCount
}: SearchFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8 border-b-2 border-[#1A1A1A] pb-4">
        <div>
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#1A1A1A]">
            Open Positions
          </h2>
          <p className="text-xs md:text-sm text-[#1A1A1A]/50 mt-1 tracking-wide">
            {resultCount} {resultCount === 1 ? 'opportunity' : 'opportunities'} available
          </p>
        </div>
        <p className="text-xs italic text-[#1A1A1A]/40 hidden md:block">
          "The future belongs to those who prepare for it today."
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by title, company, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:shadow-[4px_4px_0px_0px_#1A1A1A] transition-shadow text-sm md:text-base"
          />
        </div>

        {/* Type Filter */}
        <div className="flex flex-wrap gap-2">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`
                px-4 md:px-5 py-3 md:py-4 text-xs md:text-sm font-medium tracking-wide uppercase transition-all duration-200
                ${selectedType === type
                  ? 'bg-[#1A1A1A] text-[#FEFBF3]'
                  : 'bg-transparent text-[#1A1A1A] border-2 border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
                }
              `}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Active filter indicator */}
      {(searchQuery || selectedType !== 'All') && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 flex flex-wrap items-center gap-2 text-sm"
        >
          <span className="text-[#1A1A1A]/50">Active filters:</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#E85A4F]/10 text-[#E85A4F] border border-[#E85A4F]/30 hover:bg-[#E85A4F]/20 transition-colors"
            >
              "{searchQuery}"
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {selectedType !== 'All' && (
            <button
              onClick={() => setSelectedType('All')}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#7D8E74]/10 text-[#7D8E74] border border-[#7D8E74]/30 hover:bg-[#7D8E74]/20 transition-colors"
            >
              {selectedType}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
