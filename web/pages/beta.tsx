import Head from 'next/head'
import * as S from '@/components/beta/page.styles'
import Footer from '@/components/global/Footer'
import { useState } from 'react'
import { COMPANY_NAME } from '@/utils/constants'

const Beta = () => {
  const subscribeEmail = (email: string) => {
    setIsFetching(true)
    fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
      }),
    }).then(async response => {
      if (response.status === 200) {
        setIsSubscribed(true)
      } else {
        setIsError(true)
      }
      setIsFetching(false)
    })
  }

  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isError, setIsError] = useState(false)

  return (
    <>
      <Head>
        <title>{`Our status - ${COMPANY_NAME}`}</title>
      </Head>
      <S.Page>
        <S.Container>
          <S.Main>
            <S.MainHeading>Our status</S.MainHeading>
            <S.Explanation>
              We are currently in beta status. This means that we are testing
              out our website features. You may encounter outdated rental home
              listings, bad rental home matches, or be unable to successfully
              contact the listing poster.
            </S.Explanation>
          </S.Main>
          <S.HR />
          <S.SubscribeFormSection>
            <S.Explanation>
              Join our mailing listing to receive updates anytime we release new
              features or have changed our status.
            </S.Explanation>
            {!isSubscribed && !isFetching && !isError ? (
              <S.SubcribeForm
                onSubmit={event => {
                  event.preventDefault()
                  const form: HTMLFormElement = event.target as HTMLFormElement
                  const formData = new FormData(form)
                  const email = formData.get('email')?.toString()
                  if (email) {
                    subscribeEmail(email)
                  } else {
                    throw new Error('Email is undefined')
                  }
                }}
              >
                <label htmlFor='email' />
                <S.Email
                  type='email'
                  required
                  id='email'
                  name='email'
                  placeholder='Your email'
                />
                <S.SubscribeButton as='input' type='submit' value='Join' />
              </S.SubcribeForm>
            ) : (
              <S.SubscribeMessage isError={isError} isLoading={isFetching}>
                {!isError && !isFetching && isSubscribed
                  ? 'Thanks for subscribing!'
                  : !isError && isFetching
                  ? 'Loading...'
                  : 'Failed to add email to mailing list.'}
              </S.SubscribeMessage>
            )}
          </S.SubscribeFormSection>
        </S.Container>
        <Footer />
      </S.Page>
    </>
  )
}

export default Beta
