import Head from 'next/head'
import Form from '@/components/contact/ContactForm'
import * as S from '@/components/contact/page.styles'
import Footer from '@/components/global/Footer'

const Contact = () => {
  return (
    <S.Container>
      <Head>
        <title>Contact us - RatedRentals</title>
      </Head>
      <S.FormWrapper>
        <Form />
      </S.FormWrapper>
      <Footer />
    </S.Container>
  )
}

export default Contact
