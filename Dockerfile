# Use a imagem oficial do Node.js como base
FROM node:18.20.2

WORKDIR /usr/src/app

ARG user=john
ARG uid=1000

RUN apt-get update && apt-get install -y curl bash \
    #  installs NVM (Node Version Manager)
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash \
    # exporta NVM para o bash para poder usar
    && echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc \
    && echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.bashrc \
    && echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> ~/.bashrc \
    && apt-get clean

RUN apt install postgresql-client -y

COPY package.json ./

RUN npm cache clean --force

RUN npm install

COPY . .
RUN npm install
CMD [ "bash", "entrypoint.sh" ]

############################################################################
# Imagem usada é baseada em debian por isso usa se o apt se fosse imagem
# baseada em alpine seria apk