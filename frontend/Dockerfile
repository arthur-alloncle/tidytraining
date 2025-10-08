FROM node:lts AS development

# ARG VITE_SERVER_URL=http://127.0.0.1:3000
# ENV VITE_SERVER_URL=$VITE_SERVER_URL

ENV CI = true
ENV PORT=3000

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm ci
COPY . /code

CMD ["npm", "run", "dev"]

FROM development AS builder

RUN npm run build

FROM development AS dev-envs

RUN <<EOF
apt-get update
apt-get install -y --no install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF

CMD ["npm", "run", "dev"]

FROM nginx:1.29.2-alpine

COPY --from=builder /code/build /usr/share/nginx/html