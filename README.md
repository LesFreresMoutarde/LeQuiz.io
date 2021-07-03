# <p style="text-align: center"><img src="logo.png" alt="leQuiz.io"></p>

## Mise en route

### Prérequis

Les programmes suivants sont nécessaires pour lancer le projet

- [Docker CE](https://www.docker.com/community-edition)
- [Docker Compose](https://docs.docker.com/compose/install)


### Initialisation

Après avoir cloné le dépôt git, certaines opérations sont nécessaires pour 
faire fonctionner le projet.

#### Création des fichiers de configuration

Certaines valeurs dépendent de l'environnement d'exécution (développement, 
production), comme des URL ou la configuration d'accès à la base de données.

Chaque brique du projet a son propre fichier de configuration, qui doit être créé manuellement à partir 
d'un fichier "template" :

- Frontend : `frontend/src/config/env.js` à partir de `frontend/src/config/env.default.js`
- Backend : `backend/config/env.js` à partir de `backend/config/env.default.js`
- Back-office : `back-office/.env.local` à partir de `back-office/.env`
- Private API : `private-api/config/config.php` à partir de `private-api/config/config.default.php`

#### Installation des dépendances

Les dépendances Node.JS du frontend, du backend et du back-office sont automatiquement installées au 
lancement des containers.

Pour installer les dépendances de la Private API :

```bash
docker-compose exec private-api composer install
```

#### Lancement du projet

```bash
docker-compose up -d
```

> Note: Vérifiez le contenu du fichier `docker-compose.yml`. Si d'autres containers utilisent les mêmes ports,
> vous pouvez créer un fichier `docker-compose.override.yml` en spécifiant d'autres ports.

### Accès

Vous pouvez accéder à :

- Frontend : [http://127.0.0.1](http://127.0.0.1)
- Backend : [http://127.0.0.1:3000](http://127.0.0.1:3000)
- API privée commune : [http://127.0.0.1:9000](http://127.0.0.1:9000)
- Mailhog : [http://127.0.0.1:8025](http://127.0.0.1:8025)
- adminer : [http://127.0.0.1:8080](http://127.0.0.1:8080)
  - Système : PostgreSQL
  - Host : `database`
  - Utilisateur : `admin`
  - Mot de passe : `admin`
  - Base de données : `lequiz-io`
  
> Note: Si vous utilisez Docker Toolbox, changez 127.0.0.1 par l'adresse IP de votre machine virtuelle, 
> par exemple 192.168.99.100

### Données d'exemple

Des données d'exemple sont générées quand le container Docker `database` est démarré.
Vous pouvez les changer ou les supprimer avec le fichier `sql/import.sql`.

Vous pouvez vous connecter

- en tant qu'utilisateur avec `user1@example.com` à `user9@example.com` ou `user1` à `user9`
- en tant que reviewer avec `reviewer1@example.com` et `reviewer2@example.com` ou `reviewer1` et `reviewer2`
- en tant qu'admin avec `admin1@example.com` ou `admin1`
  
Pour tous ces comptes, le mot de passe est `password`.

### Build

Pour créer un build de production du frontend, lancez `npm run build` dans le répertoire `frontend`.
