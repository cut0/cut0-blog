FROM node:21.5.0-alpine

WORKDIR /build

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY workspaces/server/package.json ./workspaces/server/
COPY workspaces/server/src ./workspaces/server/src
COPY dist ./dist

RUN corepack enable pnpm
RUN --mount=type=cache,id=runner_deps,target=/root/.pnpm-store \
  pnpm config set store-dir /root/.pnpm-store && \
  pnpm i --frozen-lockfile

ENV PORT 8080

EXPOSE 8080
ENTRYPOINT ["pnpm"]
CMD ["start"]
