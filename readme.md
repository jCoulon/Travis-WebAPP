# TrAVis dev

### Architecture

##### Tech
- AngularJS (client)
- Node.js (serveur)
    - Jade (Prepr html)
    - Express.js
    - Sequelize (ORM pour liaison base de données MySQL)
    
#####Views

L'application est découpée en vues gérées par ui.router.

| Fichier        | Views           | référence à la vue  |
| ------------- |:-------------:| -----:|
| **partials/index.jade**     | masterView |partials/dashboard.jade|
| **partials/dashboard.jade**   | leftContent|partials/leftContent.jade |
|| centralContent|partials/centralContent.jade|
|| rightContent|partials/rightContent.jade|


La vue **centralContent** charge une vue différentes en fonction de l'état de l'application (etat différent si dans dataViz, timeMachine ou crédits)

| Fichier        | Views           | référence à la vue  |
| ------------- |:-------------:| -----:|
|**partials/centralContent**|contentCentral|partials/dataViz.jade|
|||partials/timeMachine.jade|
|||partials/credits.jade|
|||partials/notes.jade|


----------------
# Dev Panel indicateur & gestion

- widget indicateur (le contenant)
- gestion des indicateurs (paramètres de l'utilisateur connecté)
    - Ajout d'un indicateur
        - Type d'indicateur
        - Paramètres de l'indicateur
    - Suppression d'un indicateur   
    - Sauvegarde de l'état du dashboard de l'utilisateur connecté

