import { motion } from "motion/react"

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-spotify-grey"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex h-12">
        <motion.h1
          className="text-4xl font-extralight tracking-wide"
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: 120, opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
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
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 origin-left bg-spotify-grey"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
        />
      </div>
    </motion.div>
  )
}
