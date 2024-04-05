import Head from 'next/head'
import Form from '@/components/contact/ContactForm'
import * as S from '@/components/contact/page.styles'
import Footer from '@/components/global/Footer'
import Navbar from '@/components/global/Navbar'
import BetaHeader from '@/components/index/BetaHeader'

const Contact = () => {
  return (
    <S.Container>
      <Head>
        <title>Contact us - RatedRentals</title>
      </Head>
      <div style={{display: "flex", flexDirection: "column"}}>
      <Navbar />
      <div style={{position: "relative", display: "flex", flexDirection: "column"}}>
      <BetaHeader message={'This is a demo contact page and does not actually send messages.'} />

      <S.FormWrapper>
        <Form />
      </S.FormWrapper>
      </div>
      </div>
      <Footer />
    </S.Container>
  )
}

export default Contact
