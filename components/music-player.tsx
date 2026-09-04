import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CirclePlay, Pause, SkipBack, SkipForward, ChevronDown, Loader2, Volume2, VolumeX, Repeat, Shuffle } from 'lucide-react';
import { Button } from '@/components/components/ui/button';
import { Separator } from '@/components/components/ui/separator';
import { Slider } from '@/components/components/ui/slider';
import { useMusicPlayer } from './MusicPlayerContext';
import { playlist } from '@/data/playlist';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/components/lib/utils';

const progressVariants = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
};

const playlistItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
    },
  }),
};

export default function MusicPlayer({ compact = false }: { compact?: boolean } = {}) {
  const {
    isPlaying,
    currentSongIndex,
    currentTime,
    duration,
    isLoading,
    volume,
    isMuted,
    play,
    pause,
    togglePlayPause,
    skipBack,
    skipForward,
    seek,
    setVolume,
    toggleMute,
  } = useMusicPlayer();

  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    
    return () => {
      window.removeEventListener('resize', checkIsDesktop);
    };
  }, []);

  const isCompact = compact || !isDesktop;
  const currentSong = playlist[currentSongIndex];

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seek(percent * duration);
  };

  const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleProgressClick(e);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-neutral-200/50 bg-white/80 shadow-sm backdrop-blur-md dark:border-neutral-800/50 dark:bg-neutral-900/80",
        !isCompact ? "p-6" : "p-2"
      )}
    >
      <div className="relative z-10">
        {!isCompact ? (
          // Desktop Layout
          <div className="flex gap-6">
            {/* Left Section - Album Art */}
            <motion.div 
              className="relative aspect-square w-64 shrink-0 overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src={currentSong.thumbnail || '/placeholder.svg'}
                alt="Album art"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </motion.div>

            {/* Right Section - Controls & Playlist */}
            <div className="flex flex-1 flex-col">
              {/* Song Info */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                  {currentSong.title}
                </h2>
                <p className="text-lg text-neutral-500 dark:text-neutral-400">
                  {currentSong.artist}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div
                  className="group relative h-1.5 w-full cursor-pointer rounded-full bg-neutral-200 dark:bg-neutral-800"
                  onClick={handleProgressClick}
                  onMouseMove={handleProgressDrag}
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                >
                  <motion.div
                    className="absolute h-full rounded-full bg-blue-500"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                    variants={progressVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.3 }}
                  />
                  <div 
                    className="absolute -top-2 h-5 w-5 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ left: `${(currentTime / duration) * 100}%` }}
                  >
                    <div className="h-full w-full rounded-full border-2 border-white bg-blue-500 shadow-lg" />
                  </div>
                </div>
                <div className="mt-1 flex justify-between text-sm text-neutral-500 dark:text-neutral-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.button
                    className={cn(
                      "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white",
                      isShuffle && "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsShuffle(!isShuffle)}
                  >
                    <Shuffle className="h-5 w-5" />
                  </motion.button>

                  <motion.button 
                    className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={skipBack}
                  >
                    <SkipBack className="h-5 w-5" />
                  </motion.button>
                  
                  <motion.button
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePlayPause}
                  >
                    {isLoading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <CirclePlay className="h-6 w-6" />
                    )}
                  </motion.button>
                  
                  <motion.button 
                    className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={skipForward}
                  >
                    <SkipForward className="h-5 w-5" />
                  </motion.button>

                  <motion.button
                    className={cn(
                      "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white",
                      isRepeat && "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsRepeat(!isRepeat)}
                  >
                    <Repeat className="h-5 w-5" />
                  </motion.button>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMute}
                  >
                    {isMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </motion.button>
                  <div className="w-32">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      min={0}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Playlist */}
              <div className="flex-1 overflow-hidden rounded-lg border border-neutral-200 bg-white/50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Playlist</h3>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {currentSongIndex + 1} / {playlist.length}
                  </span>
                </div>
                <div className="max-h-[280px] space-y-1 overflow-y-auto">
                  {playlist.map((song, index) => (
                    <motion.button
                      key={song.id}
                      variants={playlistItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                      onClick={() => play(index)}
                      className={cn(
                        "group relative w-full overflow-hidden rounded-lg p-2 transition-all hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50",
                        currentSongIndex === index && "bg-neutral-200/30 dark:bg-neutral-800/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="relative h-10 w-10 overflow-hidden rounded-md"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Image
                            src={song.thumbnail || '/placeholder.svg'}
                            alt={song.title}
                            fill
                            className="object-cover"
                          />
                          {currentSongIndex === index && isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <div className="h-3 w-3 animate-pulse rounded-full bg-white" />
                            </div>
                          )}
                        </motion.div>

                        <div className="flex-1 text-left min-w-0">
                          <p className={cn(
                            "font-medium truncate",
                            currentSongIndex === index 
                              ? "text-blue-500" 
                              : "text-neutral-900 dark:text-white"
                          )}>
                            {song.title}
                          </p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                            {song.artist}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Mobile Layout
          <div className="flex items-center gap-2">
            {/* Album Art */}
            <motion.div 
              className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={currentSong.thumbnail || '/placeholder.svg'}
                alt="Album art"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Song Info & Controls */}
            <div className="flex flex-1 flex-col min-w-0">
              <div className="flex items-center justify-between gap-1">
                <div className="min-w-0 flex-1">
                  <h2 className="text-xs font-medium text-neutral-900 dark:text-white truncate">
                    {currentSong.title}
                  </h2>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                    {currentSong.artist}
                  </p>
                </div>
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400 ml-1 shrink-0">
                  {formatTime(currentTime)}
                </span>
              </div>

              {/* Progress Bar */}
              <div
                className="group relative h-1 w-full cursor-pointer rounded-full bg-neutral-200 dark:bg-neutral-800 my-1"
                onClick={handleProgressClick}
                onMouseMove={handleProgressDrag}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
              >
                <motion.div
                  className="absolute h-full rounded-full bg-blue-500"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-1">
                  <motion.button 
                    className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white p-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={skipBack}
                  >
                    <SkipBack className="h-3 w-3" />
                  </motion.button>
                  
                  <motion.button
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm hover:bg-blue-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePlayPause}
                  >
                    {isLoading ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : isPlaying ? (
                      <Pause className="h-3 w-3" />
                    ) : (
                      <CirclePlay className="h-3 w-3" />
                    )}
                  </motion.button>
                  
                  <motion.button 
                    className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white p-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={skipForward}
                  >
                    <SkipForward className="h-3 w-3" />
                  </motion.button>

                  <motion.button
                    className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white p-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMute}
                  >
                    {isMuted ? (
                      <VolumeX className="h-3 w-3" />
                    ) : (
                      <Volume2 className="h-3 w-3" />
                    )}
                  </motion.button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 rounded-full px-2 text-[10px] font-medium text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-white"
                  onClick={() => setShowPlaylist(!showPlaylist)}
                >
                  Playlist
                  <ChevronDown className="ml-1 h-2 w-2" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Playlist */}
        {isCompact && (
          <AnimatePresence>
            {showPlaylist && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2"
              >
                <Separator animated gradient className="mb-2" />
                <div className="space-y-0.5 max-h-36 overflow-y-auto">
                  {playlist.map((song, index) => (
                    <motion.button
                      key={song.id}
                      variants={playlistItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                      onClick={() => play(index)}
                      className={cn(
                        "group relative w-full overflow-hidden rounded-md p-1.5 transition-all hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50",
                        currentSongIndex === index && "bg-neutral-200/30 dark:bg-neutral-800/30"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className="relative h-6 w-6 overflow-hidden rounded"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Image
                            src={song.thumbnail || '/placeholder.svg'}
                            alt={song.title}
                            fill
                            className="object-cover"
                          />
                          {currentSongIndex === index && isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                            </div>
                          )}
                        </motion.div>

                        <div className="flex-1 text-left min-w-0">
                          <p className={cn(
                            "text-xs font-medium truncate",
                            currentSongIndex === index 
                              ? "text-blue-500" 
                              : "text-neutral-900 dark:text-white"
                          )}>
                            {song.title}
                          </p>
                          <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                            {song.artist}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-xl dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10" />
    </motion.div>
  );
}