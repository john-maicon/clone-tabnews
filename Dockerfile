# Use a imagem oficial do Node.js como base
FROM node:18.20.2

# Define o diretório de trabalho dentro do contêiner 
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

# Copia os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package.json ./

# Limpa o cache do npm
RUN npm cache clean --force

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do diretório atual para o diretório de trabalho no contêiner
COPY . .
RUN npm install

# Create system user to run Composer and Artisan Commands
# RUN useradd -G www-data,root -u $uid -d /home/$user $user
# RUN mkdir -p /home/$user/.composer && \
#     chown -R $user:$user /home/$user

# USER $user


# Exponha a porta 3000 (ou a porta que seu aplicativo Node.js usa)
# EXPOSE 5000 3000

# Comando para iniciar a aplicação quando o contêiner for executado
# CMD ["node", "index"]
CMD [ "bash", "entrypoint.sh" ]




############################################################################
# Imagem usada é baseada em debian por isso usa se o apt se fosse imagem
# baseada em alpine seria apk