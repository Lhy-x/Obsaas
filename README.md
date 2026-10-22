# Obsaas

Page de présentation francophone d'une plateforme de gestion d'objectifs, avec une vidéo de démonstration et une liste d'attente enregistrée dans PostgreSQL.

## Technologies

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, composants Radix UI, Zod et `pg`.

## Installation

Prérequis : Node.js 22 ou supérieur, npm et une base PostgreSQL accessible.

```sh
npm ci --legacy-peer-deps
cp .env.example .env.local
```

Le drapeau `--legacy-peer-deps` est nécessaire avec les dépendances actuelles : certains composants déclarent des versions de React antérieures à React 19. Le fichier `package-lock.json` est la référence pour l'installation npm.

Modifier `DATABASE_URL` dans `.env.local` avec les identifiants de la base. Ne jamais committer ce fichier.

## Base de données

Appliquer le schéma avec le client PostgreSQL, en remplaçant l'URL par celle de votre base :

```sh
psql 'postgresql://postgres:postgres@localhost:5432/obsaas' -v ON_ERROR_STOP=1 -f database/schema.sql
```

Le schéma crée la table `subscribers` et un index unique sur l'adresse e-mail sans tenir compte de la casse. Il peut être réappliqué. Si une table existante contient des doublons, leur présence bloque la création de l'index : les examiner et les résoudre avant de relancer le script. Aucune suppression automatique n'est effectuée.

Les inscriptions sont validées côté serveur, débarrassées des espaces aux extrémités et converties en minuscules. Une adresse déjà inscrite reçoit également une confirmation de succès, sans créer une nouvelle ligne. Une panne de connexion produit un message d'erreur générique.

La connexion est créée à la première inscription : afficher la page et compiler le projet ne nécessitent pas de base de données. Les inscriptions nécessitent une base configurée et le schéma installé. En production, utiliser la configuration TLS fournie par l'hébergeur ; le code ne désactive pas la vérification des certificats.

## Développement et vérifications

```sh
npm run dev        # http://localhost:3000
npm run typecheck  # vérification TypeScript
npm test           # validation, normalisation et erreurs d'inscription
npm run build      # compilation de production
npm start          # servir la compilation de production
```

Les tests unitaires ne nécessitent pas de base. Ils ne remplacent pas un test d'intégration PostgreSQL : sur une base de test, inscrire deux fois la même adresse avec une casse différente et vérifier qu'une seule ligne existe.

Le script `lint` historique nécessite une configuration ESLint, absente du dépôt. Le build existant ignore les erreurs ESLint et TypeScript ; exécuter explicitement `npm run typecheck` avant de déployer.

## Structure

- `app/` : page, métadonnées et styles globaux.
- `components/landing-page.tsx` : présentation et formulaire d'inscription.
- `components/success-modal.tsx` : confirmation d'inscription.
- `components/ui/` : composants d'interface réutilisables.
- `lib/actions.ts` : action serveur appelée par le formulaire.
- `lib/waitlist.ts` : validation et gestion des erreurs.
- `lib/db.ts` : connexion PostgreSQL et insertion idempotente.
- `database/schema.sql` : initialisation de la base.
- `tests/` : tests unitaires du parcours serveur.
- `public/` : images et ressources statiques.

## Déploiement

Le dépôt contient une configuration Vercel ciblant la région `cdg1`. La configuration actuelle référence le secret `@database_url` : le configurer dans Vercel ou remplacer cette référence par une variable `DATABASE_URL` définie dans les paramètres du projet. Initialiser la base avant d'accepter des inscriptions.

La vidéo embarquée dépend de Tella. Le projet ne contient pas encore d'authentification, d'envoi d'e-mails, de tableau de bord de gestion des objectifs ni de protection contre les inscriptions automatisées.
