'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const games = [
    {
      title: 'CODE BREAKER',
      description: 'Crack visual patterns and transform grids',
      path: '/arc',
      color: '#ef3e40', // Red
      image: '/WB_Level_1.png',
    },
    {
      title: 'PATTERN MATCHER',
      description: 'Find the rule that separates two groups',
      path: '/bongard',
      color: '#4673b9', // Blue
      image: '/WB_Level_2.png',
    },
    {
      title: 'STORY SOLVER',
      description: 'Figure out what mystery words mean',
      path: '/winograd',
      color: '#a7c839', // Green
      image: '/WB_Level_3.png',
    },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 max-w-6xl w-full"
      >
        {/* Logo */}
        <motion.img
          src="/logo.svg"
          alt="Logo"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto drop-shadow-2xl"
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="azosans-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-2xl text-center leading-tight"
        >
          NINJA PUZZLES
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="azosans-bold text-lg sm:text-xl md:text-2xl text-white/90 text-center max-w-2xl leading-relaxed"
        >
          Choose your mission and train your brain!
        </motion.p>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl mt-4">
          {games.map((game, index) => (
            <motion.div
              key={game.path}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              // whileHover={{ scale: 1.03, y: -3 }}
              className="bg-slate-800 p-6 sm:p-8 rounded-2xl border-4 border-slate-700 shadow-2xl transition-all group hover:border-slate-600 flex flex-col h-full"
            >
              {/* Image */}
              <div className="w-full aspect-square mb-4 rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-all"
                />
              </div>

              {/* Title */}
              <h2
                className="azosans-black text-lg sm:text-xl md:text-2xl mb-3 transition-all"
                style={{ color: game.color }}
              >
                {game.title}
              </h2>

              {/* Description */}
              <p className="azosans-bold text-sm sm:text-base md:text-lg text-white/80 leading-relaxed mb-8">
                {game.description}
              </p>

              {/* Button — pushed to bottom */}
              <button
                onClick={() => router.push(game.path)}
                className="mt-auto azosans-black text-base sm:text-lg px-6 py-3 rounded-lg text-white transition-all bg-opacity-90 hover:bg-opacity-100 hover:shadow-lg focus:ring-4 focus:ring-white/30"
                style={{ backgroundColor: game.color }}
              >
                START MISSION
              </button>
            </motion.div>

          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="azosans-bold text-sm sm:text-base text-white/60">
            Three different ways to challenge your thinking! 🥷✨
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
