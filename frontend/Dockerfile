FROM node:latest

WORKDIR /app

# Copier les fichiers de configuration
COPY package.json ./
COPY vite.config.ts ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

EXPOSE 5173

# Commande Vite avec host pour Docker
CMD ["npm", "run", "dev"]