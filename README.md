# Exercice authentification

![Bannière](https://w0.peakpx.com/wallpaper/416/836/HD-wallpaper-blue-abstract-background-blue-geometric-abstraction-blue-rectangles-background-abstract-background.jpg)

Ce dépôt contient une base de travail sur la branche main, puis l'avancée petit à petit sur les branches suivantes.

## <div style="background-color: #154275; padding: 10px; color: white;">Branches</div>

- **1-register** ⇒ <link>https://github.com/delbaze/jwt-quete/tree/1-register</link>
- **2-login** ⇒ <link>https://github.com/delbaze/jwt-quete/tree/2-login</link>
- **3-register-suite** ⇒ <link>https://github.com/delbaze/jwt-quete/tree/3-register-suite</link>
- **4-books-create** ⇒ <link>https://github.com/delbaze/jwt-quete/tree/4-books-create</link>

*Branches bonus:
- **5-passage-infos** ⇒ <link>https://github.com/delbaze/jwt-quete/tree/5-passage-infos</link>
- **6-mailer** ⇒ <link>https://github.com/delbaze/jwt-quete/tree/6-mailer</link>

## <div style="background-color: #154275; padding: 10px; color: white;">Structure du Projet</div>

- **backend/** : Application TypeGraphQL avec Apollo Server
- **frontend/** : Application Next.js (sans utilisation du dossier api, Page Router)

## <div style="background-color: #154275; padding: 10px; color: white;">Technologie Utilisée</div>

- **Backend** : TypeGraphQL, Apollo Server, TypeORM
- **Frontend** : Next.js
- **Base de Données** : SQLite
- **Environnement** : Docker via docker-compose.yml à la racine du projet

## <div style="background-color: #154275; padding: 10px; color: white;">Installation</div>

1. Cloner ce dépôt : `git clone https://github.com/delbaze/jwt-quete`

##### Si vous souhaitez installer les dépendances localement directement plutôt que de mapper vos dossiers node_modules :

2. Accéder au répertoire backend : `cd backend/`
3. Installer les dépendances : `npm install`
4. Accéder au répertoire frontend : `cd ../frontend/`
5. Installer les dépendances : `npm install`

## <div style="background-color: #154275; padding: 10px; color: white;">Docker</div>

Le projet est conçu pour fonctionner sur Docker. Utilisez le fichier `docker-compose.yml` à la racine du projet pour lancer l'ensemble de l'application.

```bash
docker compose up --build
```

## Auteur

[David ELBAZE](https://github.com/delbaze)

---

Amusez vous bien!
