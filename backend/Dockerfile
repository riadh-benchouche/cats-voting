FROM node:latest

WORKDIR /app

# Copier les fichiers de configuration
COPY package.json ./
# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

EXPOSE 3000

# Commande Vite avec host pour Docker
CMD ["npm", "run", "start:dev"]