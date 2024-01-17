# Lambert Duran - peopleVox

## Organisation du projet :  
peopleVox  
  &nbsp;  |_ frontend  
  &nbsp;  |_ backend  

# BACKEND
##  Lancer le serveur d'applications  
D'abord installer les dépendances :  

 ```npm install```  
 
 puis lancer le serveur :  
 
  ```npx nodemon index```
  
 ## Lancer les tests  
  ```npm test```  
  
  Pour les tests j'ai utilisé Jest et la fonction d'ApolloServer : executeOperation  

  # FRONTEND  

  ## Lancer l'application
  D'abord installer les dépendances :  
  
 ```npm install```  
 
 puis lancer :  
 
  ```npm start```

  ## Lancer les tests 

   D'abord lancer le backend :  
   
   ```npx nodemon index```
   
   Puis lancer:  
   
   ```npm test``` 
   Pour les tests j'ai utilisé cypress et start-server-and-test

   ## Commentaires

   J'ai à peu près suivi toutes les guidelines d'Antoine. Au niveau du back j'ai uniquement développé deux resolvers: auth pour authentifier l'utilisateur et addUser pour créer un utilisateur. Si on voudrait aller un peu plus loin il faudrait aussi développer
   un resolver pour récupérer tous les utilisateurs, un seul utilisateur, supprimer un utilisateur. Vu que je n'ai pas développé le resolver pour supprimer un utilisateur, j'ai un peu triché dans mes tests. Si j'avais eu plus de temps pour être rigoureux avec Jest il aurait fallu que j'utilise un beforeEach où je crée un utilisateur avant chaque test et un afterEach où je supprimerai cet utilisateur. De même avec Cypress, pour que les tests passent c'est important dans les lancer dans l'ordre car une fois que j'ai créé un utilisateur je ne l'ai pas supprimé.

   ## Améliorations à prévoir:

   - Les tests pour le front fonctionnent à peu près en local car je lance le serveur d'applications en parallèle, il faut que je réfléchisse à un moyen de les faire marcher dans le workflow github.
   - Développer les GET et DELETE pour le back et ensuite paufiner les tests (j'ai conscience de ne pas du tout avoir tout traité pour le front)
   - Créer un composant de loading et l'afficher à la création d'un utilisateur avant de basculer vers la page Home, idem lors du login
   - Utiliser JWT au lieu de stocker directement le nom et le prénom dans le navigateur
   - Encrypter le mot de passe
