FROM node:16-alpine
RUN apk add --no-cache bash
RUN bash -c "mkdir -p ratedrentals/{scrapers/rentalsca,utils/{ecs-helper/tgz,rentalsca.js/tgz}}"
WORKDIR /ratedrentals
COPY ./utils/ecs-helper/tgz/ecs-helper-1.0.6.tgz ./utils/ecs-helper/tgz
COPY ./utils/rentalsca.js/tgz/rentalsca.js-1.0.42.tgz ./utils/rentalsca.js/tgz

COPY ./scrapers/rentalsca/package*.json ./scrapers/rentalsca
WORKDIR /ratedrentals/scrapers/rentalsca
RUN npm install
COPY ./scrapers/rentalsca .
RUN npm run build
EXPOSE 80
CMD ["npm", "run", "start"]