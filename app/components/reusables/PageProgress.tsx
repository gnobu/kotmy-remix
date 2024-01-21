import { useNavigation } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '~/lib/utils'

export default function PageTransitionProgressBar() {
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimationCompleted, setHasAnimationCompleted] = useState(true)

  const navigation = useNavigation()
  const isTransitioning = navigation.state !== 'idle'

  useEffect(() => {
    if (!isTransitioning) {
      return
    }

    async function awaitAnimationCompletion() {
      if (!ref.current) return
      const runningAnimations = ref.current.getAnimations()
      const animationPromises = runningAnimations.map((animation) => animation.finished)
      await Promise.allSettled(animationPromises)
      setHasAnimationCompleted(true)
    }

    setHasAnimationCompleted(false)
    awaitAnimationCompletion()
  }, [isTransitioning])

  return (
    <div
      role="progressbar"
      aria-hidden={!isTransitioning}
      aria-valuetext={isTransitioning ? 'Loading' : undefined}
      className="fixed inset-x-0 top-0 left-0 z-50 h-1 animate-pulse"
    >
      <div
        ref={ref}
        className={cn(
          'h-full bg-gradient-to-r from-accent to-primary transition-all duration-500 ease-in-out',
          navigation.state === 'idle' && hasAnimationCompleted && 'w-0 opacity-0 transition-none',
          navigation.state === 'submitting' && 'w-4/12',
          navigation.state === 'loading' && 'w-10/12',
          navigation.state === 'idle' && !hasAnimationCompleted && 'w-full',
        )}
      />
    </div>
  )
}