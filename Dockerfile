# Single Stage Dockerfile
FROM node:16-alpine AS runner

RUN apk add --no-cache libc6-compat \
    && addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive --production=false

COPY . .

RUN yarn build \
    && yarn install --production --frozen-lockfile --non-interactive --prefer-offline

USER nextjs

EXPOSE 3000

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN echo "Build completed at $(date)"

CMD ["yarn", "start"]
