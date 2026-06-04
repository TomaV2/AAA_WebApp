# All About Automation

Application web permettant de piloter des démonstrations sur un robot FANUC CRX depuis une interface tactile simple et intuitive.

## Fonctionnalités

* Affichage du logo de l'entreprise
* Interface plein écran adaptée aux salons professionnels
* 3 boutons de démonstration personnalisables
* Backend Node.js avec API REST
* Communication TCP/IP avec le contrôleur FANUC
* Architecture simple et extensible

## Architecture

```text
┌─────────────────┐
│ Interface Web   │
│ HTML / CSS / JS │
└────────┬────────┘
         │ HTTP
         ▼
┌─────────────────┐
│ Node.js Express │
└────────┬────────┘
         │ TCP Socket
         ▼
┌─────────────────┐
│ FANUC CRX-3iA   │
└─────────────────┘
```

## Structure du projet

```text
.
├── server.js
├── robot.js
├── package.json
├── public
│   ├── index.html
│   ├── css
│   │   └── style.css
│   ├── js
│   │   └── app.js
│   └── img
│       └── logo.png
└── README.md
```

## Prérequis

* Node.js 20+
* npm
* Contrôleur FANUC connecté au réseau local
* Option TCP/IP configurée côté robot

## Installation

Cloner le dépôt :

```bash
git clone <repository-url>
cd fanuc-crx-salon-demo
```

Installer les dépendances :

```bash
npm install
```

## Lancement

Mode normal :

```bash
npm start
```

Mode développement :

```bash
npm run dev
```

L'application sera disponible à l'adresse :

```text
http://localhost:3000
```

## Configuration du robot

Modifier les paramètres réseau dans `robot.js` :

```javascript
const ROBOT_IP = '192.168.1.100';
const ROBOT_PORT = 9000;
```

Adapter ces valeurs à la configuration du contrôleur FANUC.

## API

### Lancer une action

```http
POST /api/action/:name
```

Exemple :

```http
POST /api/action/DIP_CHOCO
```

Réponse :

```json
{
  "success": true,
  "response": "OK"
}
```

## Exemple Frontend

```javascript
await fetch('/api/action/DIP_CHOCO', {
    method: 'POST'
});
```

## Communication TCP

Le backend envoie une commande texte au robot :

```text
DIP_CHOCO
```

Le robot répond :

```text
OK
```

Cette logique peut être adaptée pour :

* Écriture de registres
* Déclenchement de programmes TP
* Gestion des états du robot
* Retour d'informations vers l'interface

## Personnalisation

### Changer le logo

Remplacer :

```text
public/img/logo.png
```

### Modifier les boutons

Modifier :

```text
public/index.html
```

et

```text
public/js/app.js
```

### Modifier le style

Modifier :

```text
public/css/style.css
```

## Sécurité

Cette application est prévue pour un réseau local de démonstration.

Pour un déploiement industriel, il est recommandé d'ajouter :

* Authentification
* Journalisation des commandes
* Gestion des erreurs avancée
* Validation des commandes
* Chiffrement des communications

## Licence

Ce projet est fourni à titre d'exemple.

Dépendances principales :

* Node.js (MIT)
* Express (MIT)
* cors (MIT)
