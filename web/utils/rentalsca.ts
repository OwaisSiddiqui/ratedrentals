export const contactRentalscaListing = () => {
  fetch('https://rentals.ca/phoenix/api/v1.0.2/listings/520573/leads', {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json;charset=UTF-8',
      'sec-ch-ua':
        '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'sentry-trace': 'ea227b53fb0d42f79be9667846690ea8-9eb6404af59f4912-0',
      'x-rentalsapi-apikey': 'kJFM-mm4c-xg6B-qiwy',
      cookie:
        'sessionid=xjoqzdxnknwrhrh4p73u1sb75d5kgjpd; nlbi_2331841=1tQQHL/a31+gtoYWb5LH3wAAAACY422A9yHJlyA5Qsrz1azc; visid_incap_2331841=EKLGrAD4Si6mXHQC7hdVqbeD02IAAAAAQUIPAAAAAAC9HW3jV6qXpCjmutgnBslN; incap_ses_1164_2331841=vSOzPRhnyht2lzktjVwnELeD02IAAAAAXttjvapjW9+iMt5wtriYcg==; _gcl_au=1.1.1909819648.1658028987; _ga=GA1.2.803861836.1658028989; _gid=GA1.2.1011009733.1658028989; _fbp=fb.1.1658028990609.100123906; reese84=3:pT/iqGo61BInCw+aYIBPZw==:foaYT/sydnE1V39MkdH2kzGAG4ktqwfM1dTvToSabSXwXURohLDj+X4EjoGoIhTJXUIiIoxw935p9ZRPNfYURC4T5ebthtVIXBDSBedKUfWRknYM8kYEpKoUST8lJBVqMN+Kfw7HQUJ/86ewXeQymuYQO3kzvzc264TPzGryRZ2GCKxIoe/9QlgAu62F9zy5AAJUU0bAA3cXFvWhofvtfDJIQZhklaPJHHkIn3oV3XT4+NbzRZurjoM/k5ZLLY9FUUfLxvQPdz54AvFZ+qIm7Sz0eXkvWpHh5djsYFl6evVwlNSsljPy6ADcwFE0pFKJRZO6jIu9VaQZKJhfN/k3MB0HJ5zndxFv4iCWaRzgn1r6VqjMoCJCo2JlID/qspyAasTlNPnast5H5RKtdBYm5tCuIO6QjfKxEuvLqrRDsJPaoR0wGGzYXHQnBkAE2/2rY5gIBX72edMvR4FyTpr4SmaVwDUCjldSjdCAXwUM9SY=:JQB9tXmSHt/Q2k3FZGhWP5PUQjRPEG8URASi5M8mC80=; ll-commute-mode=car; ll-visitor-id=976b56f9-ab4b-446e-a79a-3e47de581f3d; _hjFirstSeen=1; _hjSession_959397=eyJpZCI6IjNhY2E5ZGM3LWFmOWItNDI5NC05MzAzLTBmZjEyZWJiMTQ1OSIsImNyZWF0ZWQiOjE2NTgwMjg5OTUyNjEsImluU2FtcGxlIjpmYWxzZX0=; _hjAbsoluteSessionInProgress=0; __ssid=cb57b395193d4571543fdc2eff32e42; nlbi_2331841_2147483392=baBxJTHRgHzBY1fmb5LH3wAAAADp3/0L33blMjgHzlXPMY8/; _hjSessionUser_959397=eyJpZCI6IjkwNWJlYTJkLTViMzMtNTdiYy04ZWNjLWFlOGEyNzVlM2ZhMiIsImNyZWF0ZWQiOjE2NTgwMjg5OTA1MzEsImV4aXN0aW5nIjp0cnVlfQ==; _hjIncludedInSessionSample=0; __atuvc=2%7C28; __atuvs=62d383be4e91dd50001; __gads=ID=bfe7d3be327b2754:T=1658029606:S=ALNI_MZjijc016To1AoisqZWj7nvGibd3Q; __gpi=UID=000007222c9cbc67:T=1658029606:RT=1658029606:S=ALNI_MY_NMtFVjgXd01fwaKtPjnkKjnK0w; ll-discover-count=1',
      Referer: 'https://rentals.ca/mississauga/6886-postmaster-ridge',
      'Referrer-Policy': 'same-origin',
    },
    body: '{"type":"site-form","site_source":"rentals.ca","full_name":"Brent","phone":null,"email":"bruh@gmail.com","spam_full_name":null,"spam_phone":null,"spam_email":null,"unit":19637676,"message":"Hi, I\'d like to schedule a visit to your rental property I found on Rentals.ca. Please let me know when the best date and time would be. Thank you!","user_consent":false}',
    method: 'POST',
  })
}

export const imageLoader = ({
  width,
  height,
  src,
}: {
  width: number
  height: number
  src: string
}) => {
  return ``
}
