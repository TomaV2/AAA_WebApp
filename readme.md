# 🤖⚙️ All About Automation

Application web permettant de piloter des démonstrations sur un robot **FANUC CRX** depuis une interface tactile simple, rapide et intuitive.

---

## ✨ Fonctionnalités

- 🖼️ Affichage du logo de l'entreprise  
- 🖥️ Interface plein écran adaptée aux salons professionnels  
- 🔘 3 boutons de démonstration personnalisables  
- ⚡ Backend Node.js avec API REST  
- 🔌 Communication contact secs avec contrôleur FANUC CRX  
- 🧩 Architecture simple, modulaire et extensible  

---

🏗️ Architecture

```
🌐 Application Web
        ↓ HTTP
🍓 Raspberry Pi
🟢 Serveur Node.js
        ↓ GPIO
🔌 Module relais
        ↓ Contacts secs
🤖 Robot FANUC
📥 Entrées numériques (DI)
        ↓
📄 Programme TP
        ↓
⚙️ Exécution des actions robot
```
---

## 📁 Structure du projet

```
.
├── server.js
├── robot.js
├── package.json
│
├── public/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── img/
│       └── logo.png
│
└── README.md
```

---

## ⚙️ Prérequis

- 🟢 Node.js 20+
- 📦 npm
- 🌐 Réseau local opérationnel
- 🤖 Robot FANUC CRX connecté

---

## 🚀 Installation

### 📥 Cloner le projet

```bash
git clone <repository-url>
cd fanuc-crx-salon-demo
```

### 📦 Installer les dépendances

```bash
npm install
```

---

## ▶️ Lancement

### 🟢 Mode production

```bash
npm start
```

### 🔧 Mode développement

```bash
npm run dev
```

---

## 🌍 Accès à l'application

```
http://localhost:3000
```

---

## 🤖 Configuration du robot

Modifier les paramètres dans `robot.js` :

```javascript
const ROBOT_IP = '192.168.1.100';
const ROBOT_PORT = 9000;
```

---

## 🔌 API

### 🚀 Lancer une action

```
POST /api/action/:name
```

---

### 📌 Exemple

```
POST /api/action/DIP_CHOCO
```

---

### 📤 Réponse

```json
{
  "success": true,
  "response": "OK"
}
```

---

## 💻 Exemple Frontend

```javascript
await fetch('/api/action/DIP_CHOCO', {
    method: 'POST'
});
```

---

## 📡 Communication TCP

```
DIP_CHOCO
```

Robot réponse :

```
OK
```

---

## 🧠 Cas d’usage possibles

- 📊 Écriture de registres FANUC  
- ▶️ Déclenchement de programmes TP  
- 🔄 Gestion des états robot  
- 📡 Retour d’informations vers UI  
- 🎯 Automatisation de démos salon  

---

## 🎨 Personnalisation

### 🖼️ Changer le logo

```
public/img/logo.png
```

### 🔘 Modifier les boutons

```
public/index.html
public/js/app.js
```

### 🎨 Modifier le style

```
public/css/style.css
```

---

## 🔐 Sécurité

Application de démonstration locale.

- 🔐 Authentification recommandée en prod
- 📜 Logs des commandes
- ⚠️ Validation des inputs
- 🔒 Chiffrement possible (TLS)

---

## 📄 Licence

Projet éducatif et démonstration.

---

## 🧩 Dépendances

- Node.js (MIT)
- Express (MIT)
- cors (MIT)
