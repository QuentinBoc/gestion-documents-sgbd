# Gestion des Documents SGBD

## Principe de l'application
Cette application permet de centraliser et de gérer des documents destinés aux professeurs et au personnel administratif d'une école. Elle offre une interface API qui permet d'ajouter, consulter, modifier et supprimer des documents, tout en les classant par catégories. Chaque document est stocké sur le serveur avec un lien direct à sa catégorie, facilitant ainsi son organisation et son accès.

## Contexte d'utilisation
L'application est conçue pour un usage interne au sein d'un établissement scolaire. Elle permet aux enseignants et au personnel administratif de retrouver rapidement les documents nécessaires, comme des formulaires, notes, guides et autres ressources essentielles. L'ajout de catégories dynamiques permet de mieux organiser les fichiers sans intervention manuelle sur la base de données.

## Installation et Démarrage

### Prérequis
- Node.js (v20+)
- MongoDB (Docker recommandé)

L'API sera disponible sur `http://localhost:3000`.

## Routes disponibles

### Récupérer tous les documents avec leur catégorie
```http
GET /documents/with-category
```

### Ajouter un document avec fichier
- **Méthode :** `POST`
- **URL :** `/documents`
- **Données (`form-data`) :**  
  - `file` (PDF, DOCX...)  
  - `title` (nom du document)  
  - `categoryName` (nom de la catégorie)

### Mettre à jour un document
- **Méthode :** `PUT`
- **URL :** `/documents/:id`
- **Body (JSON) :**
```json
{
  "title": "Nouveau titre",
  "categoryName": "Nouvelle catégorie"
}
```

### Supprimer un document
```http
DELETE /documents/:id
```

## Évolutions possibles
Si le développement de l'application est poursuivi, notamment dans le cadre d'un Travail de Fin d'Études (TFE), une amélioration envisageable serait l'intégration d'un gestionnaire d'authentification. Une fédération avec **Entra ID** pourrait être mise en place, permettant une authentification centralisée via **Microsoft 365**, ce qui s'inscrit dans une logique d'intégration avec les outils déjà utilisés par l'établissement.

## Remarque
Ce projet a été conçu pour un usage local et peut être amélioré avec une interface utilisateur.

## Auteur
Projet réalisé par Quentin, dans le cadre du développement SGBD.