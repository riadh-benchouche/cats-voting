FROM node:latest

WORKDIR /app

# Copier les fichiers de configuration
COPY package.json ./
COPY frontend/vite.config.js ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY frontend .

EXPOSE 5173

# Commande Vite avec host pour Docker
CMD ["npm", "run", "dev"]