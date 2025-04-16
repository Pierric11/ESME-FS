# ESME-FS
Modèle de données:
Table: Objet
-champ 1:codeObjet
        text, entier: OBJ001; OBJ002; OBJ003; OBJ004; OBJ005; OBJ006; OBJ007; OBJ008; OBJ009; OBJ010; OBJ011; OBJ012; OBJ013; OBJ014
        15 lignes

-champ 2:X
        réel: 12.5; 8.2; -4.0; 2.7; 0.0; 1.7; 7.3; 7.4; 20.0; -8.5; 3.2; 9.9; 100; -100
        15 lignes
        
-champ 3:Y
        réel: 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0;-10
        15 lignes

-champ 4:Z
        réel: 3.7; 9.5; 9.1; 1.4; 0.0; 7.7; 6.4; 3.4; -5.0; 2.2; 0.0; 9.9; -300; -300
        15 lignes
        
-champ 5:codeType
        text: TREE; TREE; TREE_F; TREE_F; FLOWER_Y; FLOWER_Y; FLOWER_P; FLOWER_P; TENT; TENT; ROCK; ROCK; KART; PLANE
        15 lignes

-champ 6:scalex
        réel: 10; 10; 10; 10; 10; 10; 10; 10; 10; 10; 10; 0.1; 1
        15 lignes

-champ 7:scaley
        réel: 20; 20; 20; 20; 20; 20; 20; 20; 20; 20; 20; 20; 0.1; 1
        15 lignes

-champ 8:scalez
        réel: 10; 10; 10; 10; 10; 10; 10; 10; 10; 10; 10; 10; 0.1; 1
        15 lignes
        

Table: Type objet:
-champ 1:codeType
        text: TREE; TREE_F; FLOWER_Y; FLOWER_P; TENT; ROCK; KART; PLANE
        9 lignes
        
-champ 2:couleur
        text: green; orange; yellow; purple
        9 lignes

-champ 3:nombre
        entier: 100; 50; 200; 200; 10; 50; 1; 1
        9 lignes