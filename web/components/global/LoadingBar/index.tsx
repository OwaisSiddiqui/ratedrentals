import Loader from '@/components/global/icons/Loader'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import * as S from './styles'

const LoadingBar = () => {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const start = () => {
      increment()
    }

    const increment = () => {
      /* How long to wait before next progress change */
      const timeout = Math.round(Math.random() * 300)

      setProgress(progress => {
        if (progress < 100) {
          /* How much to increase the progress by, from 0 to 10 % */
          const percent = Math.round(Math.random() * 10)
          /* What the next progress should be */
          const next = Math.min(progress + percent, 80)

          if (next < 80) {
            setTimer(setTimeout(increment, timeout))
          }

          return next
        } else {
          return 100
        }
      })
    }

    const complete = () => {
      if (timer) {
        clearTimeout(timer)
      }
      setProgress(100)
    }

    if (router.events) {
      router.events.on('routeChangeStart', start)
      router.events.on('routeChangeComplete', complete)
      router.events.on('routeChangeError', complete)
    }
  }, [router.events, timer])

  return (
    <S.Progress>
      <S.Indicator
        progress={progress}
        opacity={progress > 0 && progress < 100 ? 1 : 0}
      />
      <S.LoaderWrapper opacity={progress > 0 && progress < 100 ? 1 : 0}>
        <Loader />
      </S.LoaderWrapper>
    </S.Progress>
  )
}

export default LoadingBar
