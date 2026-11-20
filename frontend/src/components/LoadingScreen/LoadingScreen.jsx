import { motion } from "motion/react"

// 1.4s in all: the bar fills and wipes over 0.92s, App hides the loader at 1.05s, and it fades out over 0.35s
export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-spotify-grey"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="relative flex h-12">
        <motion.h1
          className="text-4xl font-extralight tracking-wide"
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: 120, opacity: 0 }}
          transition={{ duration: 0.45, delay: 0.5 }}
        >
          loading
        </motion.h1>
        <div className="absolute -right-full inset-y-0 w-32 h-full bg-linear-to-r from-transparent from-0% via-spotify-grey via-25% to-spotify-grey to-100%" />
      </div>
      

      <div className="w-64 h-1 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 origin-left bg-white"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 origin-left bg-spotify-grey"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.65, ease: "easeInOut", delay: 0.27 }}
        />
      </div>
    </motion.div>
  )
}
