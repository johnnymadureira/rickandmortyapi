# Usamos uma imagem base que já contém o ambiente Node.js instalado.
FROM node:18

# Define o diretório de trabalho dentro do contêiner.
WORKDIR /usr/src/app

# Copia o arquivo package.json para o diretório de trabalho.
COPY package*.json ./

# Instala as dependências do projeto. Isso é executado primeiro para aproveitar o cache de camadas do Docker.
RUN npm install

# Copia todo o código fonte da aplicação para o diretório de trabalho.
COPY . .
# Expõe a porta onde a aplicação estará executando.
EXPOSE 3030

# Comando para iniciar a aplicação quando o contêiner for iniciado.
CMD [ "npm", "start" ]