import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect } from 'react'

const Ad = ({ children }: PropsWithChildren<{}>) => {
  const router = useRouter()

  useEffect(() => {
    try {
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      )
    } catch (error) {
      console.log(error)
    }
  }, [router.route])

  return <>{children}</>
}

export default Ad
