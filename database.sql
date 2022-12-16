CREATE TABLE "KOALA" (
  --"column_name" datatype constraints
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(500) NOT NULL,
  "gender" VARCHAR(1) not null,
  "age" INT NOT NULL,
  "ready-to-transfer" VARCHAR(1) NOT NULL,
  "notes" VARCHAR(500)
);
INSERT INTO "KOALA"
  ("name", "gender","age","ready_to_transfer","notes")
  VALUES
  ('Scotty', 'M',4,'Y','Born in Guatemala'),
  ('Jean', 'F',5,'Y','Allergic to lots of lava'),
  ('Ororo', 'F',7,'N','Loves listening to Paula(Abdul)'),
  ('Logan', 'm',15,'N','Loves the sauna'),
  ('Charlie', 'M',9,'Y','Favorite band is Nirvana'),
  ('Betsy', 'F',4,'Y','Has a pet iguana');
