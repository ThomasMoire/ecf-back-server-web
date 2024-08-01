# ecf-back-cda-2024-server

Cette évalution est en deux parties : la première est une suite de questions la deuxième est un projet à coder.

# Modalités d'envoi du projet
Faite un fork de ce repository git et codez votre projet dans le dossier *app*.
![alt text](image.png)
*Voir **fork** en haut à droite*

## Partie 1 - Questions

1. Ecrire la requête SQL qui permet de récupérer tout les produits de la carte.
```sql
SELECT * FROM product;

```

2. Ecrire la requête SQL qui permet d'ajouter un produit au panier de l'utilisateur.
```sql
INSERT INTO cart (user_id, product_id, quantity ) VALUES ( 1, 2, 1 );

```

3. Ecrire la requête SQL qui permet de valider une commande pour qu'elle parte en salle.
```sql
UPDATE commandes
SET statut = "Prête pour la salle"
WHERE id_commande = 123;

```

4. Un nouveau burger est arrivé : le DoubleBigMassi. Ecrivez la requête SQL qui permet d'ajouter ce magnifique *burger* à la carte.
```sql
INSERT INTO carte ( nom, description ) VALUES (
"Le DoubleBigMassi",
"ce magnifique *burger"
);

```

5. Ecrire la requête SQL qui permet de récupérer tout les produits d'une commande en fonction de l'id d'un utilisateur.
```sql
SELECT p.id_produit, p.nom, p.description, p.prix, lcquantite
FROM utilisateurs u
JOIN commandes c ON u.id_utilisateur = c.id_utilisateur
JOIN ligne_commande lc ON c.id_commande = lc.id_commande
WHERE u.id_utilisateur = 5;
```
Explications des TABLES : 
# Utilisateurs : pour stocker les informations des utilisateurs.
- id_utilisateur (clé primaire)
- nom
- email

# Commandes : pour stocker les commandes passées.
- id_commande (clé primaire)
- id_utilisateur (clé étrangère vers utilisateurs)
- date_commande

# Produits : pour stocker les informations sur les produits.
- id_produit (clé primaire)
- nom
- description
- prix

# Ligne_commande : pour associer les produits aux commandes.
- id_ligne_commande (clé primaire)
- id_commande (clé étrangère vers commandes)
- id_produit (clé étrangère vers produits)
- quantite

## Partie 2 - Projet
### Description du projet
Mettez en place le back-end du système de borne McDonalds de Souillac-les-bains.

- **Le back-end doit au minimum permettre un accès CRUD.**
- Le back-end doit être codé dans un langage fortement typé comme TypeScript, Java ou bien en PHP typé.
- Mcdo ne peut pas se permettre que le back-end plante à la moindre erreur. Mettez en place la gestion des erreurs qui empèche le back-end de planter.
- *Bonus : Sécurité les routes via un système d'authentification.*

Vous avez carte blanche sur la stack et le code tant que les consignes d'en haut sont réspectées.

### Documentations éventuelles
####  Use case
![alt text](use-case-mcdo.png)

#### Exemple de  menu du Mcdo :
- [Table des prix](PRIX-.pdf)
- https://www.mcdonalds.com/ch/fr-ch/menu.html

#### Exemple de commande Mcdo :
Les commandes peuvent être mangées sur place ou à emportée.

![alt text](mcdonald_s_02211300_194510247.jpeg)
