import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JobCard from './components/JobCard';
import SearchFilters from './components/SearchFilters';
import SavedJobs from './components/SavedJobs';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  posted: string;
  tags: string[];
  description: string;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Product Designer',
    company: 'Stellar Studios',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$140k - $180k',
    posted: '2 days ago',
    tags: ['Figma', 'Design Systems', 'User Research'],
    description: 'Lead product design initiatives for our flagship SaaS platform. Shape the visual language and user experience for millions of users worldwide.'
  },
  {
    id: '2',
    title: 'Frontend Engineer',
    company: 'NexGen Tech',
    location: 'Remote',
    type: 'Remote',
    salary: '$120k - $160k',
    posted: '1 day ago',
    tags: ['React', 'TypeScript', 'GraphQL'],
    description: 'Build beautiful, performant web applications using modern technologies. Work with a passionate team pushing the boundaries of what\'s possible.'
  },
  {
    id: '3',
    title: 'Marketing Manager',
    company: 'GrowthCo',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$90k - $120k',
    posted: '5 days ago',
    tags: ['SEO', 'Content Strategy', 'Analytics'],
    description: 'Drive growth through creative marketing campaigns. Lead a team of talented marketers and shape our brand voice across all channels.'
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'Insight Labs',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$130k - $170k',
    posted: '3 days ago',
    tags: ['Python', 'Machine Learning', 'SQL'],
    description: 'Extract meaningful insights from complex datasets. Build predictive models that drive business decisions and product innovation.'
  },
  {
    id: '5',
    title: 'UX Researcher',
    company: 'Human First',
    location: 'Austin, TX',
    type: 'Contract',
    salary: '$80/hour',
    posted: '1 week ago',
    tags: ['User Interviews', 'Usability Testing', 'Surveys'],
    description: 'Conduct in-depth user research to inform product decisions. Be the voice of the customer and champion human-centered design.'
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'CloudScale Inc',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$150k - $190k',
    posted: '4 days ago',
    tags: ['AWS', 'Kubernetes', 'Terraform'],
    description: 'Build and maintain robust cloud infrastructure. Automate deployments and ensure 99.99% uptime for critical services.'
  },
  {
    id: '7',
    title: 'Content Writer',
    company: 'WordCraft',
    location: 'Remote',
    type: 'Part-time',
    salary: '$45k - $60k',
    posted: '6 days ago',
    tags: ['Copywriting', 'Blog Posts', 'Social Media'],
    description: 'Craft compelling narratives that engage and convert. Write across multiple formats and help brands find their unique voice.'
  },
  {
    id: '8',
    title: 'iOS Developer',
    company: 'AppWorks',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$125k - $165k',
    posted: '2 days ago',
    tags: ['Swift', 'SwiftUI', 'Core Data'],
    description: 'Build beautiful native iOS applications. Work on apps that millions of people use daily and push the limits of mobile technology.'
  }
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
  const [showSaved, setShowSaved] = useState(false);

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesSearch = searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = selectedType === 'All' || job.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);

  const savedJobs = useMemo(() => {
    return mockJobs.filter(job => savedJobIds.has(job.id));
  }, [savedJobIds]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-[#FEFBF3] relative overflow-hidden">
      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <header className="border-b-2 border-[#1A1A1A] bg-[#FEFBF3] relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#7D8E74] mb-1">
                Employment Gazette
              </p>
              <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-[#1A1A1A] leading-none">
                The Job<br className="md:hidden" /> Chronicle
              </h1>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 md:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-xs text-[#1A1A1A]/60 hidden md:block">
                Est. 2024 — Your Career, Classified
              </p>
              <button
                onClick={() => setShowSaved(!showSaved)}
                className={`
                  relative px-4 md:px-6 py-2 md:py-3 text-sm font-medium tracking-wide transition-all duration-300
                  ${showSaved
                    ? 'bg-[#1A1A1A] text-[#FEFBF3]'
                    : 'bg-transparent text-[#1A1A1A] border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FEFBF3]'
                  }
                `}
              >
                Saved ({savedJobIds.size})
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12 relative z-10">
        <AnimatePresence mode="wait">
          {showSaved ? (
            <SavedJobs
              key="saved"
              jobs={savedJobs}
              onBack={() => setShowSaved(false)}
              onRemove={toggleSaveJob}
            />
          ) : (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Search and Filters */}
              <SearchFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                resultCount={filteredJobs.length}
              />

              {/* Job Grid */}
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.08
                    }
                  }
                }}
              >
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={savedJobIds.has(job.id)}
                    onToggleSave={() => toggleSaveJob(job.id)}
                  />
                ))}
              </motion.div>

              {filteredJobs.length === 0 && (
                <motion.div
                  className="text-center py-16 md:py-24"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="font-playfair text-2xl md:text-3xl text-[#1A1A1A]/40 italic">
                    No positions match your criteria
                  </p>
                  <p className="text-sm text-[#1A1A1A]/30 mt-2">
                    Try adjusting your search terms
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1A1A1A]/10 mt-12 md:mt-20 py-6 md:py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-xs text-[#1A1A1A]/40">
            Requested by @clausra · Built by @clonkbot
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
