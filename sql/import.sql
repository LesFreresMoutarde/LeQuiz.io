-- Adminer 4.7.7 PostgreSQL dump

\connect "lequiz-io";

DROP TABLE IF EXISTS "SequelizeMeta";
CREATE TABLE "public"."SequelizeMeta" (
    "name" character varying(255) NOT NULL,
    CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY ("name")
) WITH (oids = false);

INSERT INTO "SequelizeMeta" ("name") VALUES
('20201008143133-create-user.js'),
('20201008164307-create-category.js'),
('20201008165914-create-custom-quiz.js'),
('20201008172452-create-category-custom-quiz.js'),
('20201009160820-create-user-review.js'),
('20201009160821-create-question.js'),
('20201009175935-create-question-position.js'),
('20201009193257-create-subscription.js'),
('20201010112122-create-category-question.js');

DROP TABLE IF EXISTS "user";
CREATE TABLE "public"."user" (
    "id" uuid NOT NULL,
    "username" character varying(30) NOT NULL,
    "email" character varying(191) NOT NULL,
    "password" character varying(255) NOT NULL,
    "plan" character varying(30) NOT NULL,
    "role" character varying(30) NOT NULL,
    "isTrustyWriter" boolean NOT NULL,
    "isActive" boolean NOT NULL,
    "isBanned" boolean NOT NULL,
    "unbanDate" timestamptz,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    "deletedAt" timestamptz,
    CONSTRAINT "user_email_key" UNIQUE ("email"),
    CONSTRAINT "user_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "user_username_key" UNIQUE ("username")
) WITH (oids = false);

CREATE INDEX "user_email" ON "public"."user" USING btree ("email");

CREATE INDEX "user_plan" ON "public"."user" USING btree ("plan");

CREATE INDEX "user_username" ON "public"."user" USING btree ("username");

INSERT INTO "user" ("id", "username", "email", "password", "plan", "role", "isTrustyWriter", "isActive", "isBanned", "unbanDate", "createdAt", "updatedAt", "deletedAt") VALUES
('826c7f20-9b3d-4725-bcdb-b1f8b6bd2031',	'user1',	'user1@lequiz.com',	'password',	'free',	'member',	'0',	'1',	'0',	NULL,	'2020-10-21 15:33:24.099+00',	'2020-10-21 15:33:24.099+00',	NULL),
('7d1a9992-05e0-4d09-ae5b-6ba9dc3d3fb3',	'user2',	'user2@lequiz.com',	'password',	'free',	'member',	'0',	'1',	'0',	NULL,	'2020-10-21 15:33:24.116+00',	'2020-10-21 15:33:24.116+00',	NULL),
('71c5c670-f12e-450d-9541-46f5ac6b6c9d',	'user3',	'user3@lequiz.com',	'password',	'free',	'member',	'0',	'1',	'0',	NULL,	'2020-10-21 15:33:24.131+00',	'2020-10-21 15:33:24.131+00',	NULL),
('2e00add0-4d92-4986-8d3c-4bb631f527c4',	'user4',	'user4@lequiz.com',	'password',	'vip',	'member',	'1',	'1',	'0',	NULL,	'2020-10-21 15:33:24.141+00',	'2020-10-21 15:33:24.141+00',	NULL),
('efee900e-f089-4f08-aacf-3bdd12f67957',	'user5',	'user5@lequiz.com',	'password',	'premium',	'member',	'1',	'1',	'0',	NULL,	'2020-10-21 15:33:24.157+00',	'2020-10-21 15:33:24.157+00',	NULL),
('8ec8e880-792f-4c7e-8cad-580f42384fa8',	'user6',	'user6@lequiz.com',	'password',	'free',	'member',	'0',	'0',	'0',	NULL,	'2020-10-21 15:33:24.167+00',	'2020-10-21 15:33:24.167+00',	NULL),
('ea3ab88d-9864-4e60-bad6-a0d0567e6f84',	'user7',	'user7@lequiz.com',	'password',	'free',	'member',	'0',	'0',	'0',	NULL,	'2020-10-21 15:33:24.177+00',	'2020-10-21 15:33:24.177+00',	NULL),
('2e041c75-d5c3-4d1e-9823-e3d426a88d88',	'user8',	'user8@lequiz.com',	'password',	'free',	'member',	'0',	'1',	'1',	NULL,	'2020-10-21 15:33:24.187+00',	'2020-10-21 15:33:24.187+00',	NULL),
('170ba076-8ec3-428f-a8f5-ceda0e9eaa36',	'user9',	'user9@lequiz.com',	'password',	'free',	'member',	'0',	'1',	'1',	NULL,	'2020-10-21 15:33:24.199+00',	'2020-10-21 15:33:24.199+00',	NULL),
('f76c2f1a-822f-48a3-b881-2a927e40cbf3',	'reviewer1',	'reviewer1@lequiz.com',	'password',	'free',	'reviewer',	'0',	'1',	'0',	NULL,	'2020-10-21 15:33:24.209+00',	'2020-10-21 15:33:24.209+00',	NULL),
('59f7d770-2366-4079-9675-0512e21424e3',	'reviewer2',	'reviewer2@lequiz.com',	'password',	'vip',	'reviewer',	'0',	'1',	'0',	NULL,	'2020-10-21 15:33:24.226+00',	'2020-10-21 15:33:24.226+00',	NULL),
('b6b28fe5-36a3-4710-bb3b-ee1b23390791',	'admin1',	'admin1@lequiz.com',	'password',	'vip',	'admin',	'0',	'1',	'0',	NULL,	'2020-10-21 15:33:24.237+00',	'2020-10-21 15:33:24.237+00',	NULL);

DROP TABLE IF EXISTS "category";
CREATE TABLE "public"."category" (
    "id" uuid NOT NULL,
    "name" character varying(50) NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE INDEX "category_name" ON "public"."category" USING btree ("name");

INSERT INTO "category" ("id", "name", "createdAt", "updatedAt") VALUES
('9bde0fff-731d-4fe2-939e-f737e926bd70',	'Histoire',	'2020-10-21 15:33:22.711+00',	'2020-10-21 15:33:22.711+00'),
('3b9474ad-189c-4ed3-8fc6-d8d4b222a5e3',	'Sport',	'2020-10-21 15:33:22.731+00',	'2020-10-21 15:33:22.731+00'),
('0f677077-2b7e-4eb5-a28c-d1d395b9c8f1',	'Jeu-Vidéo',	'2020-10-21 15:33:22.741+00',	'2020-10-21 15:33:22.741+00'),
('e8075ae3-cd03-42dd-a0d2-adda7d47488a',	'Cinéma',	'2020-10-21 15:33:22.753+00',	'2020-10-21 15:33:22.753+00'),
('47128e24-e31e-432e-b248-e6a86339c1f0',	'Musique',	'2020-10-21 15:33:22.763+00',	'2020-10-21 15:33:22.763+00'),
('1677996a-6859-4524-8e67-d88307e6648e',	'Automobile',	'2020-10-21 15:33:22.773+00',	'2020-10-21 15:33:22.773+00');

DROP TABLE IF EXISTS "custom_quiz";
CREATE TABLE "public"."custom_quiz" (
    "id" uuid NOT NULL,
    "title" character varying(255) NOT NULL,
    "authorId" uuid,
    "reviewsRequested" boolean NOT NULL,
    "status" character varying(30) NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "custom_quiz_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "custom_quiz_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"(id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

CREATE INDEX "custom_quiz_author_id" ON "public"."custom_quiz" USING btree ("authorId");

CREATE INDEX "custom_quiz_reviews_requested" ON "public"."custom_quiz" USING btree ("reviewsRequested");

CREATE INDEX "custom_quiz_status" ON "public"."custom_quiz" USING btree ("status");

CREATE INDEX "custom_quiz_title" ON "public"."custom_quiz" USING btree ("title");

DROP TABLE IF EXISTS "category_custom_quiz";
CREATE TABLE "public"."category_custom_quiz" (
    "categoryId" uuid NOT NULL,
    "customQuizId" uuid NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "category_custom_quiz_pkey" PRIMARY KEY ("categoryId", "customQuizId"),
    CONSTRAINT "category_custom_quiz_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES category(id) ON DELETE RESTRICT NOT DEFERRABLE,
    CONSTRAINT "category_custom_quiz_customQuizId_fkey" FOREIGN KEY ("customQuizId") REFERENCES custom_quiz(id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

DROP TABLE IF EXISTS "user_review";
CREATE TABLE "public"."user_review" (
    "id" uuid NOT NULL,
    "reviewerId" uuid,
    "customQuizId" uuid NOT NULL,
    "status" character varying(50) NOT NULL,
    "comment" text,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "user_review_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "user_review_customQuizId_fkey" FOREIGN KEY ("customQuizId") REFERENCES custom_quiz(id) ON DELETE RESTRICT NOT DEFERRABLE,
    CONSTRAINT "user_review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "user"(id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

CREATE INDEX "user_review_custom_quiz_id" ON "public"."user_review" USING btree ("customQuizId");

CREATE INDEX "user_review_reviewer_id" ON "public"."user_review" USING btree ("reviewerId");

CREATE INDEX "user_review_status" ON "public"."user_review" USING btree ("status");

DROP TABLE IF EXISTS "question";
CREATE TABLE "public"."question" (
    "id" uuid NOT NULL,
    "type" character varying(40) NOT NULL,
    "difficulty" character varying(30),
    "content" text NOT NULL,
    "answer" jsonb NOT NULL,
    "status" character varying(30) NOT NULL,
    "media" jsonb,
    "customQuizId" uuid,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "question_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "question_customQuizId_fkey" FOREIGN KEY ("customQuizId") REFERENCES custom_quiz(id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

CREATE INDEX "question_custom_quiz_id" ON "public"."question" USING btree ("customQuizId");

CREATE INDEX "question_difficulty" ON "public"."question" USING btree ("difficulty");

CREATE INDEX "question_status" ON "public"."question" USING btree ("status");

CREATE INDEX "question_type" ON "public"."question" USING btree ("type");

INSERT INTO "question" ("id", "type", "difficulty", "content", "answer", "status", "media", "customQuizId", "createdAt", "updatedAt") VALUES
('07b931e7-4ce3-4d76-8970-1277ab76c4c1',	'qcm',	NULL,	'Combien fait 1 + 4 ?',	'{"answers": [{"content": "5", "is_good_answer": true}, {"content": "3", "is_good_answer": false}, {"content": "4", "is_good_answer": false}, {"content": "6", "is_good_answer": false}], "additional": {"responseMedia": {"url": "http://example.com/toto.png", "info": "0 + 0 égale ? ..."}}}',	'approved',	'{"url": "http://example.com/calculatrice.png", "type": "image/png"}',	NULL,	'2020-10-21 15:33:22.787+00',	'2020-10-21 15:33:22.787+00'),
('05eab47f-5915-42ea-86b4-73909c79c680',	'qcm',	NULL,	'En quelle année, Mao a-t-il lancé sa révolution culturelle ?',	'{"answers": [{"content": "1814", "is_good_answer": false}, {"content": "1865", "is_good_answer": false}, {"content": "1920", "is_good_answer": false}, {"content": "1966", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:22.817+00',	'2020-10-21 15:33:22.817+00'),
('eb23b5ef-564e-4fb4-9ccd-f8c7ccd65ee3',	'qcm',	NULL,	'En quelle année les États-Unis ont-ils pris part à la Première Guerre mondiale ?',	'{"answers": [{"content": "1918", "is_good_answer": false}, {"content": "1915", "is_good_answer": false}, {"content": "1917", "is_good_answer": true}, {"content": "1916", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:22.84+00',	'2020-10-21 15:33:22.84+00'),
('8565553f-5b43-4123-bd07-0c1a48358d45',	'qcm',	NULL,	'Quels Jeux olympiques ont été supprimés à cause de la Seconde Guerre mondiale ?',	'{"answers": [{"content": "1936 et 1940", "is_good_answer": false}, {"content": "1944 et 1948", "is_good_answer": false}, {"content": "1940 et 1944", "is_good_answer": true}, {"content": "1932 et 1936", "is_good_answer": false}], "additional": {"responseMedia": {"url": null, "info": "Les Jeux ont été rénovés par le baron Pierre de Coubertin à la fin du XIXe siècle."}}}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:22.868+00',	'2020-10-21 15:33:22.868+00'),
('a420ef64-84b5-4317-b6d6-41f811eef1e9',	'qcm',	NULL,	'Dans les plaines de quel champ de bataille se dresse la Butte du Lion ?',	'{"answers": [{"content": "Verdun", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": true}, {"content": "Austerlitz", "is_good_answer": false}, {"content": "Valmy", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:22.889+00',	'2020-10-21 15:33:22.889+00'),
('b0d0b66f-5f2e-4ea0-ada2-f4adf4288c4b',	'qcm',	NULL,	'Quelle ligne de défense française fut contournée par les Allemands en 1940 ?',	'{"answers": [{"content": "La ligne Siegfried", "is_good_answer": false}, {"content": "La ligne Maginot", "is_good_answer": true}, {"content": "La ligne Verte", "is_good_answer": false}, {"content": "La ligne Daladier", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:22.916+00',	'2020-10-21 15:33:22.916+00'),
('5d620b5b-ba5d-493c-9498-7b4ef97435e4',	'qcm',	NULL,	'Le général Cambronne, qui commandait la vieille garde, eut une conduite héroïque à...',	'{"answers": [{"content": "Wagram", "is_good_answer": false}, {"content": "Iena", "is_good_answer": false}, {"content": "Midway", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:22.937+00',	'2020-10-21 15:33:22.937+00'),
('8ff65267-0ebe-4458-906e-9f677358327e',	'qcm',	NULL,	'Où a eu lieu le grand procès des criminels de guerre nazis ?',	'{"answers": [{"content": "Berlin", "is_good_answer": false}, {"content": "Nuremberg", "is_good_answer": true}, {"content": "Hambourg", "is_good_answer": false}, {"content": "Munich", "is_good_answer": false}], "additional": {"responseMedia": {"url": null, "info": "Le procès de Nuremberg fut intenté contre 24 responsables du Troisième Reich."}}}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:22.962+00',	'2020-10-21 15:33:22.962+00'),
('c4889952-bd5f-430b-997a-a35d482e099f',	'qcm',	NULL,	'Qui fut vainqueur de la Guerre de Troie, conflit légendaire de la mythologie grecque ?',	'{"answers": [{"content": "Sophocle", "is_good_answer": false}, {"content": "Ajax", "is_good_answer": false}, {"content": "Ulysse", "is_good_answer": true}, {"content": "Arkantos", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:22.982+00',	'2020-10-21 15:33:22.982+00'),
('5e4c14c6-14cd-432f-98cd-35e03d671db1',	'qcm',	NULL,	'En quelle année la bataille de Waterloo a-t-elle eu lieu, à vingt kilomètres au sud de Bruxelles ?',	'{"answers": [{"content": "1815", "is_good_answer": true}, {"content": "1831", "is_good_answer": false}, {"content": "1809", "is_good_answer": false}, {"content": "1824", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:22.996+00',	'2020-10-21 15:33:22.996+00'),
('94537999-371a-4cec-aa02-8df866c8e5fc',	'qcm',	NULL,	'Quel basketteur américain a été champion NBA en 1998 pour la sixième fois de sa carrière ?',	'{"answers": [{"content": "Patrick Ewing", "is_good_answer": false}, {"content": "Karl Malone", "is_good_answer": false}, {"content": "Charles Barkley", "is_good_answer": false}, {"content": "Michael Jordan", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.018+00',	'2020-10-21 15:33:23.018+00'),
('4c707cc5-3535-414a-9837-3e5dc5aff745',	'qcm',	NULL,	'Dans quelle pays est né le joueur de basket-ball professionnel Tony Parker ?',	'{"answers": [{"content": "Belgique", "is_good_answer": true}, {"content": "USA", "is_good_answer": false}, {"content": "France", "is_good_answer": false}, {"content": "Pologne", "is_good_answer": false}], "additional": {"responseMedia": {"url": null, "info": "Il évoluait dans l''équipe des Spurs de San Antonio depuis son arrivée dans la NBA en 2001."}}}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.039+00',	'2020-10-21 15:33:23.039+00'),
('aaa325b9-4cdd-432a-bb3e-52a37dfcad34',	'qcm',	NULL,	'Qui a été élu joueur de la décennie 2000 suite à un sondage du site officiel NBA ?',	'{"answers": [{"content": "Derek Fisher", "is_good_answer": false}, {"content": "Ron Harper", "is_good_answer": false}, {"content": "Kobe Bryant", "is_good_answer": true}, {"content": "Rick Fox", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.065+00',	'2020-10-21 15:33:23.065+00'),
('91567340-ca61-414b-88fa-b2854c435d72',	'qcm',	NULL,	'Quel concours de dunks est organisé par la NBA durant le NBA All-Star Week-end ?',	'{"answers": [{"content": "Skills Challenge", "is_good_answer": false}, {"content": "Slam Dunk Contest", "is_good_answer": true}, {"content": "Three-point Shootout", "is_good_answer": false}, {"content": "All-Star Game", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.087+00',	'2020-10-21 15:33:23.087+00'),
('e04a4873-ff9d-4beb-9416-0164c4bf0331',	'qcm',	NULL,	'Quel basketteur américain a réalisé en 2000 un 360 degrés inversé mythique ?',	'{"answers": [{"content": "Jarnell Stokes", "is_good_answer": false}, {"content": "Vince Carter", "is_good_answer": true}, {"content": "Marc Gasol", "is_good_answer": false}, {"content": "Andrew Harrison", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.115+00',	'2020-10-21 15:33:23.115+00'),
('73fd65f2-ab84-40d6-ac94-e5487975f259',	'qcm',	NULL,	'Quel joueur de NBA se définit lui-même comme un « viking africain » ?',	'{"answers": [{"content": "Derrick Rose", "is_good_answer": false}, {"content": "Pau Gasol", "is_good_answer": false}, {"content": "Aaron Brooks", "is_good_answer": false}, {"content": "Joakim Noah", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.135+00',	'2020-10-21 15:33:23.135+00'),
('e21daf03-3164-47af-909d-36ab6b10177e',	'qcm',	NULL,	'Quel événement annuel majeur de la NBA est comparable à une bourse de joueurs ?',	'{"answers": [{"content": "La franchise", "is_good_answer": false}, {"content": "Les playoffs", "is_good_answer": false}, {"content": "Le ballotage", "is_good_answer": false}, {"content": "La draft", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.162+00',	'2020-10-21 15:33:23.162+00'),
('521ac924-d6ae-4c1c-9f47-696626a1bac9',	'qcm',	NULL,	'Combien de titres de champion NBA Michael Jordan a-t-il obtenu ?',	'{"answers": [{"content": "Cinq", "is_good_answer": false}, {"content": "Sept", "is_good_answer": false}, {"content": "Six", "is_good_answer": true}, {"content": "Quatre", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.183+00',	'2020-10-21 15:33:23.183+00'),
('02c8d418-c8f1-4ee2-bbd6-e67d9f36c038',	'qcm',	NULL,	'Qui est le premier joueur français à avoir été sacré champion NBA ?',	'{"answers": [{"content": "Joe Dumars", "is_good_answer": false}, {"content": "Paul Pierce", "is_good_answer": false}, {"content": "Tony Parker", "is_good_answer": true}, {"content": "Tim Duncan", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.213+00',	'2020-10-21 15:33:23.213+00'),
('7112fd3f-0a25-4ec9-8671-c8e3a18ec0ed',	'qcm',	NULL,	'Qui a été élu deux fois meilleur joueur de la NBA, en 2005 et 2006 ?',	'{"answers": [{"content": "Jeff Brown", "is_good_answer": false}, {"content": "Dana Jones", "is_good_answer": false}, {"content": "Marlon Garnett", "is_good_answer": false}, {"content": "Steve Nash", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.248+00',	'2020-10-21 15:33:23.248+00'),
('e0d9d813-98a4-415f-b4cd-fe63789b8a14',	'qcm',	NULL,	'Quel gagnant de la « Nouvelle Star », diffusée sur M6, est surnommé « La Tortue » ?',	'{"answers": [{"content": "Christophe Willem", "is_good_answer": true}, {"content": "Julien Doré", "is_good_answer": false}, {"content": "Jonatan Cerrada", "is_good_answer": false}, {"content": "Steeve Estatof", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.27+00',	'2020-10-21 15:33:23.27+00'),
('75f3bdf2-38a4-44b9-92c3-b869efb86ff5',	'qcm',	NULL,	'En 1991, quel tube Yannick Noah a-t-il associé à la victoire de la France en coupe Davis ?',	'{"answers": [{"content": "Vagabond", "is_good_answer": false}, {"content": "Les Lionnes", "is_good_answer": false}, {"content": "Saga Africa", "is_good_answer": true}, {"content": "Ose", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.293+00',	'2020-10-21 15:33:23.293+00'),
('ecda0b6a-cfd4-4e1d-835b-69fac918b567',	'qcm',	NULL,	'Quel chanteur prénommé Mathieu a émergé du succès remporté par les Linkup ?',	'{"answers": [{"content": "Corneille", "is_good_answer": false}, {"content": "Keen''V", "is_good_answer": false}, {"content": "Raphaël", "is_good_answer": false}, {"content": "M. Pokora", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.318+00',	'2020-10-21 15:33:23.318+00'),
('6be59c13-4109-49c1-81f7-7829162161f6',	'qcm',	NULL,	'Quel est le style musical de l''album de Rohff, « La fierté des années » ?',	'{"answers": [{"content": "La Techno", "is_good_answer": false}, {"content": "Le tango", "is_good_answer": false}, {"content": "Le disco", "is_good_answer": false}, {"content": "Le rap", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.338+00',	'2020-10-21 15:33:23.338+00'),
('d6c0e162-d085-4604-87ce-70dcac39479d',	'qcm',	NULL,	'Quel Américano-Libanais est entré dans les charts avec « Life in Cartoon Motion » ?',	'{"answers": [{"content": "Mika", "is_good_answer": true}, {"content": "Iwan", "is_good_answer": false}, {"content": "Rida", "is_good_answer": false}, {"content": "K. Maro", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.36+00',	'2020-10-21 15:33:23.36+00'),
('d9a78015-015b-49f7-ba07-a289cb5eec42',	'qcm',	NULL,	'Qui a chanté au pied de …onnes le 10 juin 2000 ?',	'{"answers": [{"content": "Eddy Mitchell", "is_good_answer": false}, {"content": "Patrick Bruel", "is_good_answer": false}, {"content": "Christophe Maé", "is_good_answer": false}, {"content": "Johnny Hallyday", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.384+00',	'2020-10-21 15:33:23.384+00'),
('ebdc2c9c-020f-431f-a849-eca78162af89',	'qcm',	NULL,	'Sous quel nom le rappeur et homme d''affaires américain Curtis Jackson fait-il carrière ?',	'{"answers": [{"content": "50 cent", "is_good_answer": true}, {"content": "Fat Joe", "is_good_answer": false}, {"content": "Big Sean", "is_good_answer": false}, {"content": "Mike D", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.416+00',	'2020-10-21 15:33:23.416+00'),
('e309c9d1-e77d-4c12-acb0-2cf32fd57bb5',	'qcm',	NULL,	'Avec quel chanteur le top model Heidi Klum a-t-elle été mariée durant sept ans ?',	'{"answers": [{"content": "Seal", "is_good_answer": true}, {"content": "Paul McCartney", "is_good_answer": false}, {"content": "Sean Paul", "is_good_answer": false}, {"content": "Robbie Williams", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.439+00',	'2020-10-21 15:33:23.439+00'),
('53946baa-5ca1-4dd4-a738-172a08ff6b61',	'qcm',	NULL,	'Quel DJ a repris un titre des années 80 pour faire un tube avec « Living On Video » ?',	'{"answers": [{"content": "Pakito", "is_good_answer": true}, {"content": "Vitalic", "is_good_answer": false}, {"content": "Madeon", "is_good_answer": false}, {"content": "Brodinski", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.465+00',	'2020-10-21 15:33:23.465+00'),
('28b4699f-76f1-4781-9759-78faba008bc2',	'qcm',	NULL,	'Quel chanteur a sorti « Musicology » puis « 3121 » deux ans plus tard ?',	'{"answers": [{"content": "Bob James", "is_good_answer": false}, {"content": "Al Jarreau", "is_good_answer": false}, {"content": "Prince", "is_good_answer": true}, {"content": "James Brown", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.488+00',	'2020-10-21 15:33:23.488+00'),
('f0329413-3ad4-4558-becd-fd7dd5b5af22',	'qcm',	NULL,	'Dans quel pays se situe le circuit de course automobile du Mans ?',	'{"answers": [{"content": "Pays-Bas", "is_good_answer": false}, {"content": "Suisse", "is_good_answer": false}, {"content": "Belgique", "is_good_answer": false}, {"content": "France", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.509+00',	'2020-10-21 15:33:23.509+00'),
('fa1189a9-130a-4f03-8d2d-861db3411bc9',	'qcm',	NULL,	'À quel modèle de voiture ressemble le vieux tacot jaune que conduit Gaston Lagaffe ?',	'{"answers": [{"content": "Rolls-Royce", "is_good_answer": false}, {"content": "Citroën B10", "is_good_answer": false}, {"content": "Fiat 509", "is_good_answer": true}, {"content": "Jeep", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.545+00',	'2020-10-21 15:33:23.545+00'),
('cfb26bc2-ae22-4196-a2f1-b1519904b68d',	'qcm',	NULL,	'Quel sport automobile consiste à accélérer le plus rapidement possible avec son véhicule ?',	'{"answers": [{"content": "Le trial", "is_good_answer": false}, {"content": "Le Drift", "is_good_answer": false}, {"content": "Le Monster truck", "is_good_answer": false}, {"content": "Le Dragster", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.567+00',	'2020-10-21 15:33:23.567+00'),
('f8ec28c2-7980-4b71-a9cd-0abb40fa8e05',	'qcm',	NULL,	'Comment s''appelle le véhicule du personnage de bande dessinée Batman ?',	'{"answers": [{"content": "La BatDrive", "is_good_answer": false}, {"content": "La Batauto", "is_good_answer": false}, {"content": "La Batcar", "is_good_answer": false}, {"content": "La Batmobile", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.589+00',	'2020-10-21 15:33:23.589+00'),
('99aa7938-639c-418e-a3ff-ba654aaded85',	'qcm',	NULL,	'De quand date le Duster, véhicule utilitaire sport vendu par la marque roumaine Dacia ?',	'{"answers": [{"content": "2006", "is_good_answer": false}, {"content": "2008", "is_good_answer": false}, {"content": "2010", "is_good_answer": true}, {"content": "2012", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.615+00',	'2020-10-21 15:33:23.615+00'),
('2150cff1-fe9f-4984-836b-7f295021d7a9',	'qcm',	NULL,	'En France, refuser une priorité peut vous coûter combien de points sur le permis ?',	'{"answers": [{"content": "6 points", "is_good_answer": false}, {"content": "8 points", "is_good_answer": false}, {"content": "4 points", "is_good_answer": true}, {"content": "2 points", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.643+00',	'2020-10-21 15:33:23.643+00'),
('466db58e-2401-4b1b-b5d8-897b1c47c2ab',	'qcm',	NULL,	'Quelle principauté accueille l''un des plus prestigieux Grand Prix de Formule 1 ?',	'{"answers": [{"content": "Liechtenstein", "is_good_answer": false}, {"content": "Andorre", "is_good_answer": false}, {"content": "Mantoue", "is_good_answer": false}, {"content": "Monaco", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.671+00',	'2020-10-21 15:33:23.671+00'),
('1cfba762-cb68-47aa-bd38-c2b56d5edfce',	'qcm',	NULL,	'Dans le monde automobile, quel sigle correspond au Grand Tourisme Injection ?',	'{"answers": [{"content": "Sport", "is_good_answer": false}, {"content": "Gti", "is_good_answer": true}, {"content": "TT", "is_good_answer": false}, {"content": "Turbo", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.696+00',	'2020-10-21 15:33:23.696+00'),
('8751d0a2-9134-45fe-8cbe-e261bf0f2c0b',	'qcm',	NULL,	'Quelle société appartenant au groupe Belron « répare et remplace » votre pare-brise ?',	'{"answers": [{"content": "Carglass", "is_good_answer": true}, {"content": "Midas", "is_good_answer": false}, {"content": "Speedy", "is_good_answer": false}, {"content": "Norauto", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.717+00',	'2020-10-21 15:33:23.717+00'),
('8d4754bb-4643-44e1-8972-ce62aa218baa',	'qcm',	NULL,	'Quelle firme automobile, filiale française de FIAT, a ensuite intégré le groupe Chrysler ?',	'{"answers": [{"content": "Simca", "is_good_answer": true}, {"content": "Hommell", "is_good_answer": false}, {"content": "Packard", "is_good_answer": false}, {"content": "Triumph", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.739+00',	'2020-10-21 15:33:23.739+00'),
('7c7280df-696f-4dc2-aed0-6b3f33720429',	'qcm',	NULL,	'Dans quel jeu peux on voir des Chocobos ?',	'{"answers": [{"content": "Breath of fire", "is_good_answer": false}, {"content": "Final Fantasy", "is_good_answer": true}, {"content": "Secret of Mana", "is_good_answer": false}, {"content": "Golden stun", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.771+00',	'2020-10-21 15:33:23.771+00'),
('08d6d4ed-d023-46eb-9fe6-2998407f0290',	'qcm',	NULL,	'Salamèche évolue en ',	'{"answers": [{"content": "Dracaufeu", "is_good_answer": false}, {"content": "Reptincel", "is_good_answer": true}, {"content": "Magna", "is_good_answer": false}, {"content": "Ptera", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.792+00',	'2020-10-21 15:33:23.792+00'),
('aac01b4d-6d49-46d1-8fe7-64edfcb1de17',	'qcm',	NULL,	'Zelda est un jeu du genre',	'{"answers": [{"content": "Aventure", "is_good_answer": true}, {"content": "RPG", "is_good_answer": false}, {"content": "Course", "is_good_answer": false}, {"content": "Simulation", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.815+00',	'2020-10-21 15:33:23.815+00'),
('23fc9788-6c19-4567-b43f-69e0906151ca',	'qcm',	NULL,	'Sur quelle plateforme le jeu Tekken est sorti en premier ?',	'{"answers": [{"content": "La borne d''arcade", "is_good_answer": true}, {"content": "NES", "is_good_answer": false}, {"content": "Playstation", "is_good_answer": false}, {"content": "Gamecube", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.835+00',	'2020-10-21 15:33:23.835+00'),
('7a6d5dce-c0ea-48e1-b9d7-3fa6395a2a00',	'qcm',	NULL,	'Dans quel jeu le personnage de Mario a-t-il été développé en premier ?',	'{"answers": [{"content": "Super Mario", "is_good_answer": false}, {"content": "Super Mario Bros", "is_good_answer": false}, {"content": "Donkey Kong", "is_good_answer": true}, {"content": "Mario Party", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.871+00',	'2020-10-21 15:33:23.871+00'),
('3930bd12-44a3-406b-926e-eccb940a66db',	'qcm',	NULL,	'La série Fallout est la suite « spirituelle » de quel jeu ?',	'{"answers": [{"content": "Wasteland", "is_good_answer": true}, {"content": "Homeland", "is_good_answer": false}, {"content": "Falland", "is_good_answer": false}, {"content": "Skyrim", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.893+00',	'2020-10-21 15:33:23.893+00'),
('653287aa-c5d4-4e04-abea-1e4297905897',	'qcm',	NULL,	'Que signifie le nom de la serie GTA ?',	'{"answers": [{"content": "Burnout", "is_good_answer": false}, {"content": "Conduite dangeureuse", "is_good_answer": false}, {"content": "Vol de voiture", "is_good_answer": true}, {"content": "Voiture customisé", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.917+00',	'2020-10-21 15:33:23.917+00'),
('01a4c2e7-7152-454a-af2a-ea2d74635c62',	'qcm',	NULL,	'Le jeu Counter Strike dérive de quel autre jeu ?',	'{"answers": [{"content": "Half Life", "is_good_answer": true}, {"content": "Splinter Cell", "is_good_answer": false}, {"content": "Doom", "is_good_answer": false}, {"content": "Call of Duty", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.939+00',	'2020-10-21 15:33:23.939+00'),
('37c65e96-5885-4da1-98b4-1417ff516662',	'qcm',	NULL,	'Dans Pac man qu''est ce qui hante le labyrinthe ?',	'{"answers": [{"content": "Des plantes carnivores", "is_good_answer": false}, {"content": "Des fantômes", "is_good_answer": true}, {"content": "Des squelettes", "is_good_answer": false}, {"content": "Des zombies", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.961+00',	'2020-10-21 15:33:23.961+00'),
('95cf0737-8bda-4231-b51a-f23e5ca0e18c',	'qcm',	NULL,	'Dans la légende de Zelda, comment s''appelle le héros ?',	'{"answers": [{"content": "Zelda", "is_good_answer": false}, {"content": "Bruno", "is_good_answer": false}, {"content": "Ganondorf", "is_good_answer": false}, {"content": "Link", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2020-10-21 15:33:23.989+00',	'2020-10-21 15:33:23.989+00'),
('bc09a157-dceb-43b9-af40-23744c290fee',	'input',	NULL,	'Qui est le compagnon de Batman ?',	'{"answers": [{"content": "Robin", "is_good_answer": true}]}',	'pending',	'{}',	NULL,	'2020-10-21 15:33:24.013+00',	'2020-10-21 15:33:24.013+00'),
('2c75d8ba-20a7-4948-ab91-755edf1bef58',	'input',	NULL,	'Quel super héros ne se sépare jamais de son marteau forgé par les nains ',	'{"answers": [{"content": "Thor", "is_good_answer": true}]}',	'pending',	'{}',	NULL,	'2020-10-21 15:33:24.034+00',	'2020-10-21 15:33:24.034+00'),
('4b9d6ff3-dca8-4abf-83c6-e480b90f0d0e',	'qcm',	NULL,	'Quel super-héros à la force surhumaine ressemble à un être de pierre ?',	'{"answers": [{"content": "Hawkman", "is_good_answer": false}, {"content": "Plastic Man", "is_good_answer": false}, {"content": "Superboy", "is_good_answer": false}, {"content": "La Chose", "is_good_answer": true}]}',	'disapproved',	'{}',	NULL,	'2020-10-21 15:33:24.057+00',	'2020-10-21 15:33:24.057+00'),
('01d0daca-bd0b-48af-89ac-893aa0bda117',	'qcm',	NULL,	'Quel super-héros porte un costume inspiré du drapeau américain ?',	'{"answers": [{"content": "Tigra", "is_good_answer": false}, {"content": "Iron Man", "is_good_answer": false}, {"content": "Blade", "is_good_answer": false}, {"content": "Captain America", "is_good_answer": true}]}',	'disapproved',	'{}',	NULL,	'2020-10-21 15:33:24.078+00',	'2020-10-21 15:33:24.078+00');

DROP TABLE IF EXISTS "question_position";
CREATE TABLE "public"."question_position" (
    "questionId" uuid NOT NULL,
    "position" integer NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "question_position_pkey" PRIMARY KEY ("questionId"),
    CONSTRAINT "question_position_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES question(id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

CREATE INDEX "question_position_position" ON "public"."question_position" USING btree ("position");

DROP TABLE IF EXISTS "subscription";
CREATE TABLE "public"."subscription" (
    "id" uuid NOT NULL,
    "reference" character varying(255) NOT NULL,
    "userId" uuid NOT NULL,
    "startDate" date NOT NULL,
    "expirationDate" date NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "subscription_reference_key" UNIQUE ("reference"),
    CONSTRAINT "subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

CREATE INDEX "subscription_expiration_date" ON "public"."subscription" USING btree ("expirationDate");

CREATE INDEX "subscription_user_id" ON "public"."subscription" USING btree ("userId");

DROP TABLE IF EXISTS "category_question";
CREATE TABLE "public"."category_question" (
    "categoryId" uuid NOT NULL,
    "questionId" uuid NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "category_question_pkey" PRIMARY KEY ("categoryId", "questionId"),
    CONSTRAINT "category_question_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES category(id) ON DELETE RESTRICT NOT DEFERRABLE,
    CONSTRAINT "category_question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES question(id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

INSERT INTO "category_question" ("categoryId", "questionId", "createdAt", "updatedAt") VALUES
('9bde0fff-731d-4fe2-939e-f737e926bd70',	'07b931e7-4ce3-4d76-8970-1277ab76c4c1',	'2020-10-21 15:33:22.8+00',	'2020-10-21 15:33:22.8+00'),
('9bde0fff-731d-4fe2-939e-f737e926bd70',	'05eab47f-5915-42ea-86b4-73909c79c680',	'2020-10-21 15:33:22.827+00',	'2020-10-21 15:33:22.827+00'),
('9bde0fff-731d-4fe2-939e-f737e926bd70',	'eb23b5ef-564e-4fb4-9ccd-f8c7ccd65ee3',	'2020-10-21 15:33:22.855+00',	'2020-10-21 15:33:22.855+00'),
('9bde0fff-731d-4fe2-939e-f737e926bd70',	'8565553f-5b43-4123-bd07-0c1a48358d45',	'2020-10-21 15:33:22.878+00',	'2020-10-21 15:33:22.878+00'),
('9bde0fff-731d-4fe2-939e-f737e926bd70',	'a420ef64-84b5-4317-b6d6-41f811eef1e9',	'2020-10-21 15:33:22.902+00',	'2020-10-21 15:33:22.902+00'),
('9bde0fff-731d-4fe2-939e-f737e926bd70',	'b0d0b66f-5f2e-4ea0-ada2-f4adf4288c4b',	'2020-10-21 15:33:22.926+00',	'2020-10-21 15:33:22.926+00'),
('9bde0fff-731d-4fe2-939e-f737e926bd70',	'5d620b5b-ba5d-493c-9498-7b4ef97435e4',	'2020-10-21 15:33:22.948+00',	'2020-10-21 15:33:22.948+00'),
('9bde0fff-731d-4fe2-939e-f737e926bd70',	'8ff65267-0ebe-4458-906e-9f677358327e',	'2020-10-21 15:33:22.973+00',	'2020-10-21 15:33:22.973+00'),
('9bde0fff-731d-4fe2-939e-f737e926bd70',	'5e4c14c6-14cd-432f-98cd-35e03d671db1',	'2020-10-21 15:33:23.006+00',	'2020-10-21 15:33:23.006+00'),
('3b9474ad-189c-4ed3-8fc6-d8d4b222a5e3',	'94537999-371a-4cec-aa02-8df866c8e5fc',	'2020-10-21 15:33:23.028+00',	'2020-10-21 15:33:23.028+00'),
('3b9474ad-189c-4ed3-8fc6-d8d4b222a5e3',	'4c707cc5-3535-414a-9837-3e5dc5aff745',	'2020-10-21 15:33:23.051+00',	'2020-10-21 15:33:23.051+00'),
('3b9474ad-189c-4ed3-8fc6-d8d4b222a5e3',	'aaa325b9-4cdd-432a-bb3e-52a37dfcad34',	'2020-10-21 15:33:23.075+00',	'2020-10-21 15:33:23.075+00'),
('3b9474ad-189c-4ed3-8fc6-d8d4b222a5e3',	'91567340-ca61-414b-88fa-b2854c435d72',	'2020-10-21 15:33:23.103+00',	'2020-10-21 15:33:23.103+00'),
('3b9474ad-189c-4ed3-8fc6-d8d4b222a5e3',	'e04a4873-ff9d-4beb-9416-0164c4bf0331',	'2020-10-21 15:33:23.124+00',	'2020-10-21 15:33:23.124+00'),
('3b9474ad-189c-4ed3-8fc6-d8d4b222a5e3',	'73fd65f2-ab84-40d6-ac94-e5487975f259',	'2020-10-21 15:33:23.145+00',	'2020-10-21 15:33:23.145+00'),
('3b9474ad-189c-4ed3-8fc6-d8d4b222a5e3',	'e21daf03-3164-47af-909d-36ab6b10177e',	'2020-10-21 15:33:23.17+00',	'2020-10-21 15:33:23.17+00'),
('3b9474ad-189c-4ed3-8fc6-d8d4b222a5e3',	'521ac924-d6ae-4c1c-9f47-696626a1bac9',	'2020-10-21 15:33:23.198+00',	'2020-10-21 15:33:23.198+00'),
('3b9474ad-189c-4ed3-8fc6-d8d4b222a5e3',	'02c8d418-c8f1-4ee2-bbd6-e67d9f36c038',	'2020-10-21 15:33:23.225+00',	'2020-10-21 15:33:23.225+00'),
('3b9474ad-189c-4ed3-8fc6-d8d4b222a5e3',	'7112fd3f-0a25-4ec9-8671-c8e3a18ec0ed',	'2020-10-21 15:33:23.259+00',	'2020-10-21 15:33:23.259+00'),
('47128e24-e31e-432e-b248-e6a86339c1f0',	'e0d9d813-98a4-415f-b4cd-fe63789b8a14',	'2020-10-21 15:33:23.28+00',	'2020-10-21 15:33:23.28+00'),
('47128e24-e31e-432e-b248-e6a86339c1f0',	'75f3bdf2-38a4-44b9-92c3-b869efb86ff5',	'2020-10-21 15:33:23.304+00',	'2020-10-21 15:33:23.304+00'),
('47128e24-e31e-432e-b248-e6a86339c1f0',	'ecda0b6a-cfd4-4e1d-835b-69fac918b567',	'2020-10-21 15:33:23.328+00',	'2020-10-21 15:33:23.328+00'),
('47128e24-e31e-432e-b248-e6a86339c1f0',	'6be59c13-4109-49c1-81f7-7829162161f6',	'2020-10-21 15:33:23.349+00',	'2020-10-21 15:33:23.349+00'),
('47128e24-e31e-432e-b248-e6a86339c1f0',	'd6c0e162-d085-4604-87ce-70dcac39479d',	'2020-10-21 15:33:23.372+00',	'2020-10-21 15:33:23.372+00'),
('47128e24-e31e-432e-b248-e6a86339c1f0',	'd9a78015-015b-49f7-ba07-a289cb5eec42',	'2020-10-21 15:33:23.395+00',	'2020-10-21 15:33:23.395+00'),
('47128e24-e31e-432e-b248-e6a86339c1f0',	'ebdc2c9c-020f-431f-a849-eca78162af89',	'2020-10-21 15:33:23.427+00',	'2020-10-21 15:33:23.427+00'),
('47128e24-e31e-432e-b248-e6a86339c1f0',	'e309c9d1-e77d-4c12-acb0-2cf32fd57bb5',	'2020-10-21 15:33:23.453+00',	'2020-10-21 15:33:23.453+00'),
('47128e24-e31e-432e-b248-e6a86339c1f0',	'53946baa-5ca1-4dd4-a738-172a08ff6b61',	'2020-10-21 15:33:23.475+00',	'2020-10-21 15:33:23.475+00'),
('47128e24-e31e-432e-b248-e6a86339c1f0',	'28b4699f-76f1-4781-9759-78faba008bc2',	'2020-10-21 15:33:23.498+00',	'2020-10-21 15:33:23.498+00'),
('1677996a-6859-4524-8e67-d88307e6648e',	'f0329413-3ad4-4558-becd-fd7dd5b5af22',	'2020-10-21 15:33:23.53+00',	'2020-10-21 15:33:23.53+00'),
('1677996a-6859-4524-8e67-d88307e6648e',	'fa1189a9-130a-4f03-8d2d-861db3411bc9',	'2020-10-21 15:33:23.556+00',	'2020-10-21 15:33:23.556+00'),
('1677996a-6859-4524-8e67-d88307e6648e',	'cfb26bc2-ae22-4196-a2f1-b1519904b68d',	'2020-10-21 15:33:23.578+00',	'2020-10-21 15:33:23.578+00'),
('1677996a-6859-4524-8e67-d88307e6648e',	'f8ec28c2-7980-4b71-a9cd-0abb40fa8e05',	'2020-10-21 15:33:23.598+00',	'2020-10-21 15:33:23.598+00'),
('1677996a-6859-4524-8e67-d88307e6648e',	'99aa7938-639c-418e-a3ff-ba654aaded85',	'2020-10-21 15:33:23.629+00',	'2020-10-21 15:33:23.629+00'),
('1677996a-6859-4524-8e67-d88307e6648e',	'2150cff1-fe9f-4984-836b-7f295021d7a9',	'2020-10-21 15:33:23.658+00',	'2020-10-21 15:33:23.658+00'),
('1677996a-6859-4524-8e67-d88307e6648e',	'466db58e-2401-4b1b-b5d8-897b1c47c2ab',	'2020-10-21 15:33:23.684+00',	'2020-10-21 15:33:23.684+00'),
('1677996a-6859-4524-8e67-d88307e6648e',	'1cfba762-cb68-47aa-bd38-c2b56d5edfce',	'2020-10-21 15:33:23.706+00',	'2020-10-21 15:33:23.706+00'),
('1677996a-6859-4524-8e67-d88307e6648e',	'8751d0a2-9134-45fe-8cbe-e261bf0f2c0b',	'2020-10-21 15:33:23.727+00',	'2020-10-21 15:33:23.727+00'),
('1677996a-6859-4524-8e67-d88307e6648e',	'8d4754bb-4643-44e1-8972-ce62aa218baa',	'2020-10-21 15:33:23.756+00',	'2020-10-21 15:33:23.756+00'),
('0f677077-2b7e-4eb5-a28c-d1d395b9c8f1',	'7c7280df-696f-4dc2-aed0-6b3f33720429',	'2020-10-21 15:33:23.78+00',	'2020-10-21 15:33:23.78+00'),
('0f677077-2b7e-4eb5-a28c-d1d395b9c8f1',	'08d6d4ed-d023-46eb-9fe6-2998407f0290',	'2020-10-21 15:33:23.802+00',	'2020-10-21 15:33:23.802+00'),
('0f677077-2b7e-4eb5-a28c-d1d395b9c8f1',	'aac01b4d-6d49-46d1-8fe7-64edfcb1de17',	'2020-10-21 15:33:23.824+00',	'2020-10-21 15:33:23.824+00'),
('0f677077-2b7e-4eb5-a28c-d1d395b9c8f1',	'23fc9788-6c19-4567-b43f-69e0906151ca',	'2020-10-21 15:33:23.851+00',	'2020-10-21 15:33:23.851+00'),
('0f677077-2b7e-4eb5-a28c-d1d395b9c8f1',	'7a6d5dce-c0ea-48e1-b9d7-3fa6395a2a00',	'2020-10-21 15:33:23.881+00',	'2020-10-21 15:33:23.881+00'),
('0f677077-2b7e-4eb5-a28c-d1d395b9c8f1',	'3930bd12-44a3-406b-926e-eccb940a66db',	'2020-10-21 15:33:23.904+00',	'2020-10-21 15:33:23.904+00'),
('0f677077-2b7e-4eb5-a28c-d1d395b9c8f1',	'653287aa-c5d4-4e04-abea-1e4297905897',	'2020-10-21 15:33:23.929+00',	'2020-10-21 15:33:23.929+00'),
('0f677077-2b7e-4eb5-a28c-d1d395b9c8f1',	'01a4c2e7-7152-454a-af2a-ea2d74635c62',	'2020-10-21 15:33:23.95+00',	'2020-10-21 15:33:23.95+00'),
('0f677077-2b7e-4eb5-a28c-d1d395b9c8f1',	'37c65e96-5885-4da1-98b4-1417ff516662',	'2020-10-21 15:33:23.977+00',	'2020-10-21 15:33:23.977+00'),
('0f677077-2b7e-4eb5-a28c-d1d395b9c8f1',	'95cf0737-8bda-4231-b51a-f23e5ca0e18c',	'2020-10-21 15:33:24.001+00',	'2020-10-21 15:33:24.001+00'),
('e8075ae3-cd03-42dd-a0d2-adda7d47488a',	'bc09a157-dceb-43b9-af40-23744c290fee',	'2020-10-21 15:33:24.022+00',	'2020-10-21 15:33:24.022+00'),
('e8075ae3-cd03-42dd-a0d2-adda7d47488a',	'2c75d8ba-20a7-4948-ab91-755edf1bef58',	'2020-10-21 15:33:24.047+00',	'2020-10-21 15:33:24.047+00'),
('e8075ae3-cd03-42dd-a0d2-adda7d47488a',	'4b9d6ff3-dca8-4abf-83c6-e480b90f0d0e',	'2020-10-21 15:33:24.067+00',	'2020-10-21 15:33:24.067+00'),
('e8075ae3-cd03-42dd-a0d2-adda7d47488a',	'01d0daca-bd0b-48af-89ac-893aa0bda117',	'2020-10-21 15:33:24.089+00',	'2020-10-21 15:33:24.089+00'),
('9bde0fff-731d-4fe2-939e-f737e926bd70',	'c4889952-bd5f-430b-997a-a35d482e099f',	'2020-10-21 15:34:44.946863+00',	'2020-10-21 15:34:44.946863+00');


DROP TABLE IF EXISTS "refresh_token";
CREATE TABLE "public"."refresh_token" (
    "token" text NOT NULL,
    CONSTRAINT "refresh_token_token" PRIMARY KEY ("token")
) WITH (oids = false);

-- 2020-10-21 15:35:24.374802+00
