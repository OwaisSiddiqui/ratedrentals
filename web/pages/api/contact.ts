import sgMail from '@sendgrid/mail'
import { NextApiHandler } from 'next'

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
if (!SENDGRID_API_KEY) {
  throw new Error('Please define the SENDGRID_API_KEY in .env')
}
sgMail.setApiKey(SENDGRID_API_KEY)
interface ReqBody {
  email: string
  subject: string
  message: string
}

const verifyReqBody = (body: ReqBody) => {
  if (
    body.email &&
    body.subject &&
    body.message &&
    typeof body.email == 'string' &&
    typeof body.subject == 'string' &&
    typeof body.message == 'string'
  ) {
    return true
  }
  return false
}

const api: NextApiHandler = async (req, res) => {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'POST') {
    if (req.body && req.headers['content-type'] === 'application/json') {
      const reqBody = req.body
      if (verifyReqBody(reqBody)) {
        const message = {
          to: 'ratedrentalsca@gmail.com',
          from: 'no-reply@ratedrentals.ca',
          subject: `Inquiry from ${reqBody.email}`,
          html: `From email: ${reqBody.email} <br />Subject: ${reqBody.subject}<br />Message: ${reqBody.message}`,
        }
        return await sgMail
          .send(message)
          .then(() => {
            return res.send({ message: 'Success! Email sent.' })
          })
          .catch(error => {
            console.error(error)
            return res
              .status(500)
              .send({ message: 'Error sending email. Did not send email.' })
          })
      } else {
        return res.status(400).send({})
      }
    } else {
      return res.status(400).send({})
    }
  } else {
    res.setHeader('Allow', 'POST, GET, HEAD')
    return res.status(405).send({})
  }
}

export default api
