import { useState } from 'react'
import * as S from './styles'

const Form = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <S.FormComponent>
      <S.FormForm
        action='/api/contact'
        method='POST'
        id='contact-form'
        onSubmit={event => {
          event.preventDefault()
          const form: HTMLFormElement = event.target as HTMLFormElement
          const formData = new FormData(form)
          const fetchBody = JSON.stringify(
            Object.fromEntries(formData.entries())
          )
          setIsLoading(true)
          fetch('/api/contact', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: fetchBody,
          }).then(() => {
            form.reset()
            setIsSubmitted(true)
            setIsLoading(false)
          })
        }}
        show={!(isSubmitted || isLoading)}
      >
        <S.Title>Contact us</S.Title>
        <S.Inputs>
          <S.InputSectionLabel>Your email address</S.InputSectionLabel>
          <S.InputInput
            placeholder='Your email address'
            name='email'
            type='email'
            required
          />
          <S.InputSectionLabel>Subject</S.InputSectionLabel>
          <S.InputInput
            placeholder='Your subject'
            name='subject'
            type='subject'
            required
          />
          <S.InputSectionLabel>Message</S.InputSectionLabel>
          <S.MessageTextarea
            as='textarea'
            placeholder='Your message'
            name='message'
            required
          />
        </S.Inputs>
        <S.SubmitButton type='submit' name='submit' value='Submit' as='input' />
      </S.FormForm>
      <S.FeedBackMessage show={isSubmitted || isLoading}>
        {isLoading ? (
          <span>Sending your message...</span>
        ) : isSubmitted ? (
          <>
            <span>Sent successfully.</span>
            <span>Thanks for contacting us!</span>
            <span>We will be in touch with you shortly.</span>
          </>
        ) : null}
      </S.FeedBackMessage>
    </S.FormComponent>
  )
}

export default Form
