-- Adminer 4.7.7 PostgreSQL dump

\connect "lequiz-io";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
('20201010112122-create-category-question.js'),
('20210213141332-create-question-type.js'),
('20210213143042-create-question-type-question.js');

DROP TABLE IF EXISTS "user";
CREATE TABLE "public"."user" (
    "id" uuid NOT NULL,
    "username" character varying(30) NOT NULL,
    "email" character varying(191) NOT NULL,
    "password" character varying(255) NOT NULL,
    "passwordResetToken" character varying(255),
    "lastResetPasswordEmailSendDate" timestamptz,
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
    CONSTRAINT "user_passwordResetToken_key" UNIQUE ("passwordResetToken"),
    CONSTRAINT "user_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "user_username_key" UNIQUE ("username")
) WITH (oids = false);

CREATE INDEX "user_email" ON "public"."user" USING btree ("email");

CREATE INDEX "user_plan" ON "public"."user" USING btree ("plan");

CREATE INDEX "user_username" ON "public"."user" USING btree ("username");

INSERT INTO "user" ("id", "username", "email", "password", "passwordResetToken", "lastResetPasswordEmailSendDate", "plan", "role", "isTrustyWriter", "isActive", "isBanned", "unbanDate", "createdAt", "updatedAt", "deletedAt") VALUES
('46a0bf25-6313-49e5-8000-304e4fe5eddb',	'user1',	'user1@lequiz.com',	'$argon2id$v=19$m=16,t=2,p=1$UWp5MGpEb0c2VEMweU5lZg$GH9BZVXJ5clwStvOmRoKdA',	NULL,	NULL,	'free',	'member',	'0',	'1',	'0',	NULL,	'2021-02-15 20:12:15.134+00',	'2021-02-15 20:12:15.134+00',	NULL),
('b3f76f17-e2c7-42c8-aabd-b04d54b700eb',	'user2',	'user2@lequiz.com',	'$argon2id$v=19$m=16,t=2,p=1$UWp5MGpEb0c2VEMweU5lZg$GH9BZVXJ5clwStvOmRoKdA',	NULL,	NULL,	'free',	'member',	'0',	'1',	'0',	NULL,	'2021-02-15 20:12:15.164+00',	'2021-02-15 20:12:15.164+00',	NULL),
('216d36ed-792a-4225-915d-fd6b7c0d158a',	'user3',	'user3@lequiz.com',	'$argon2id$v=19$m=16,t=2,p=1$UWp5MGpEb0c2VEMweU5lZg$GH9BZVXJ5clwStvOmRoKdA',	NULL,	NULL,	'free',	'member',	'0',	'1',	'0',	NULL,	'2021-02-15 20:12:15.2+00',	'2021-02-15 20:12:15.2+00',	NULL),
('8c4a9c5b-ae14-401f-9b6f-9cac7974649d',	'user4',	'user4@lequiz.com',	'$argon2id$v=19$m=16,t=2,p=1$UWp5MGpEb0c2VEMweU5lZg$GH9BZVXJ5clwStvOmRoKdA',	NULL,	NULL,	'vip',	'member',	'1',	'1',	'0',	NULL,	'2021-02-15 20:12:15.272+00',	'2021-02-15 20:12:15.272+00',	NULL),
('493c3639-3970-48a8-ac40-5ea85833534a',	'user5',	'user5@lequiz.com',	'$argon2id$v=19$m=16,t=2,p=1$UWp5MGpEb0c2VEMweU5lZg$GH9BZVXJ5clwStvOmRoKdA',	NULL,	NULL,	'premium',	'member',	'1',	'1',	'0',	NULL,	'2021-02-15 20:12:15.298+00',	'2021-02-15 20:12:15.298+00',	NULL),
('709dccaf-99f0-440f-acbe-b823b8f79f02',	'user6',	'user6@lequiz.com',	'$argon2id$v=19$m=16,t=2,p=1$UWp5MGpEb0c2VEMweU5lZg$GH9BZVXJ5clwStvOmRoKdA',	NULL,	NULL,	'free',	'member',	'0',	'0',	'0',	NULL,	'2021-02-15 20:12:15.33+00',	'2021-02-15 20:12:15.33+00',	NULL),
('fd6e0f44-14a6-4f18-b720-8f9b634f63df',	'user7',	'user7@lequiz.com',	'$argon2id$v=19$m=16,t=2,p=1$UWp5MGpEb0c2VEMweU5lZg$GH9BZVXJ5clwStvOmRoKdA',	NULL,	NULL,	'free',	'member',	'0',	'0',	'0',	NULL,	'2021-02-15 20:12:15.355+00',	'2021-02-15 20:12:15.355+00',	NULL),
('81d43c83-d351-459d-aaa2-e4877b9c859b',	'user8',	'user8@lequiz.com',	'$argon2id$v=19$m=16,t=2,p=1$UWp5MGpEb0c2VEMweU5lZg$GH9BZVXJ5clwStvOmRoKdA',	NULL,	NULL,	'free',	'member',	'0',	'1',	'1',	NULL,	'2021-02-15 20:12:15.388+00',	'2021-02-15 20:12:15.388+00',	NULL),
('f8e9a65d-b55e-4724-b84f-825f100d5442',	'user9',	'user9@lequiz.com',	'$argon2id$v=19$m=16,t=2,p=1$UWp5MGpEb0c2VEMweU5lZg$GH9BZVXJ5clwStvOmRoKdA',	NULL,	NULL,	'free',	'member',	'0',	'1',	'1',	NULL,	'2021-02-15 20:12:15.413+00',	'2021-02-15 20:12:15.413+00',	NULL),
('dd57bd29-3812-42ed-be23-324886408086',	'reviewer1',	'reviewer1@lequiz.com',	'$argon2id$v=19$m=16,t=2,p=1$UWp5MGpEb0c2VEMweU5lZg$GH9BZVXJ5clwStvOmRoKdA',	NULL,	NULL,	'free',	'reviewer',	'0',	'1',	'0',	NULL,	'2021-02-15 20:12:15.447+00',	'2021-02-15 20:12:15.447+00',	NULL),
('fb4afa49-751c-497e-bf79-76384ce534ab',	'reviewer2',	'reviewer2@lequiz.com',	'$argon2id$v=19$m=16,t=2,p=1$UWp5MGpEb0c2VEMweU5lZg$GH9BZVXJ5clwStvOmRoKdA',	NULL,	NULL,	'vip',	'reviewer',	'0',	'1',	'0',	NULL,	'2021-02-15 20:12:15.471+00',	'2021-02-15 20:12:15.471+00',	NULL),
('c98d5be3-a4ae-45b9-856e-44d40f62eead',	'admin1',	'admin1@lequiz.com',	'$argon2id$v=19$m=16,t=2,p=1$UWp5MGpEb0c2VEMweU5lZg$GH9BZVXJ5clwStvOmRoKdA',	NULL,	NULL,	'vip',	'admin',	'0',	'1',	'0',	NULL,	'2021-02-15 20:12:15.504+00',	'2021-02-15 20:12:15.504+00',	NULL);


DROP TABLE IF EXISTS "category";
CREATE TABLE "public"."category" (
    "id" uuid NOT NULL,
    "name" character varying(50) NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "category_name_key" UNIQUE ("name"),
    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "category" ("id", "name", "createdAt", "updatedAt") VALUES
('0e209468-eb23-42cf-a78f-73a8dac93d07',	'Histoire',	'2021-02-15 20:12:10.264+00',	'2021-02-15 20:12:10.264+00'),
('4a033b89-d7db-4d12-a184-8c6c5e1a5150',	'Sport',	'2021-02-15 20:12:10.288+00',	'2021-02-15 20:12:10.288+00'),
('b432070d-4773-4820-8853-7147a38ecbd0',	'Jeu-Vidéo',	'2021-02-15 20:12:10.313+00',	'2021-02-15 20:12:10.313+00'),
('50275469-efc5-413e-9f33-cbadefc35813',	'Cinéma',	'2021-02-15 20:12:10.337+00',	'2021-02-15 20:12:10.337+00'),
('807fa2d9-5720-45cd-bf7f-05b23f42e802',	'Musique',	'2021-02-15 20:12:10.371+00',	'2021-02-15 20:12:10.371+00'),
('4223f68b-87a0-4479-8d3e-cf398bc9d2af',	'Automobile',	'2021-02-15 20:12:10.395+00',	'2021-02-15 20:12:10.395+00');

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

INSERT INTO "question" ("id", "difficulty", "content", "answer", "status", "media", "customQuizId", "createdAt", "updatedAt") VALUES
('0835c055-7428-4dfa-891d-d701a2b627c3',	'medium',	'Combien fait 1 + 4 ?',	'{"answers": [{"content": "5", "is_good_answer": true}, {"content": "3", "is_good_answer": false}, {"content": "4", "is_good_answer": false}, {"content": "6", "is_good_answer": false}], "additional": {"responseMedia": {"url": "http://example.com/toto.png", "info": "0 + 0 égale ? ..."}}}',	'approved',	'{"url": "http://example.com/calculatrice.png", "type": "image/png"}',	NULL,	'2021-02-15 20:12:10.425+00',	'2021-02-15 20:12:10.425+00'),
('2db934c5-e5ef-4adc-9492-b70235cc765e',	'medium',	'En quelle année, Mao a-t-il lancé sa révolution culturelle ?',	'{"answers": [{"content": "1814", "is_good_answer": false}, {"content": "1865", "is_good_answer": false}, {"content": "1920", "is_good_answer": false}, {"content": "1966", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:10.514+00',	'2021-02-15 20:12:10.514+00'),
('f46befcd-d384-4178-89ab-98ffee697334',	'medium',	'En quelle année les États-Unis ont-ils pris part à la Première Guerre mondiale ?',	'{"answers": [{"content": "1918", "is_good_answer": false}, {"content": "1915", "is_good_answer": false}, {"content": "1917", "is_good_answer": true}, {"content": "1916", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:10.589+00',	'2021-02-15 20:12:10.589+00'),
('38bcf098-432a-4275-8dae-83f4887cb4c8',	'medium',	'Quels Jeux olympiques ont été supprimés à cause de la Seconde Guerre mondiale ?',	'{"answers": [{"content": "1936 et 1940", "is_good_answer": false}, {"content": "1944 et 1948", "is_good_answer": false}, {"content": "1940 et 1944", "is_good_answer": true}, {"content": "1932 et 1936", "is_good_answer": false}], "additional": {"responseMedia": {"url": null, "info": "Les Jeux ont été rénovés par le baron Pierre de Coubertin à la fin du XIXe siècle."}}}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:10.662+00',	'2021-02-15 20:12:10.662+00'),
('c967c803-aec6-4c24-8c15-fd5f6a073372',	'medium',	'Dans les plaines de quel champ de bataille se dresse la Butte du Lion ?',	'{"answers": [{"content": "Verdun", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": true}, {"content": "Austerlitz", "is_good_answer": false}, {"content": "Valmy", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:10.738+00',	'2021-02-15 20:12:10.738+00'),
('c511ec33-b61f-4011-9a95-b0e791f374b8',	'medium',	'Quelle ligne de défense française fut contournée par les Allemands en 1940 ?',	'{"answers": [{"content": "La ligne Siegfried", "is_good_answer": false}, {"content": "La ligne Maginot", "is_good_answer": true}, {"content": "La ligne Verte", "is_good_answer": false}, {"content": "La ligne Daladier", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:10.819+00',	'2021-02-15 20:12:10.819+00'),
('cf21daeb-a805-4699-93e6-251600547662',	'medium',	'Le général Cambronne, qui commandait la vieille garde, eut une conduite héroïque à...',	'{"answers": [{"content": "Wagram", "is_good_answer": false}, {"content": "Iena", "is_good_answer": false}, {"content": "Midway", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:10.898+00',	'2021-02-15 20:12:10.898+00'),
('d8dc5d4a-aafb-4ae9-b042-10e91e965993',	'medium',	'Où a eu lieu le grand procès des criminels de guerre nazis ?',	'{"answers": [{"content": "Berlin", "is_good_answer": false}, {"content": "Nuremberg", "is_good_answer": true}, {"content": "Hambourg", "is_good_answer": false}, {"content": "Munich", "is_good_answer": false}], "additional": {"responseMedia": {"url": null, "info": "Le procès de Nuremberg fut intenté contre 24 responsables du Troisième Reich."}}}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:10.977+00',	'2021-02-15 20:12:10.977+00'),
('b58b624e-56fb-451d-a823-33dc51c14755',	'medium',	'Qui fut vainqueur de la Guerre de Troie, conflit légendaire de la mythologie grecque ?',	'{"answers": [{"content": "Sophocle", "is_good_answer": false}, {"content": "Ajax", "is_good_answer": false}, {"content": "Ulysse", "is_good_answer": true}, {"content": "Arkantos", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:11.059+00',	'2021-02-15 20:12:11.059+00'),
('3575ba41-6884-481d-b9e0-00d1b3acce98',	'medium',	'En quelle année la bataille de Waterloo a-t-elle eu lieu, à vingt kilomètres au sud de Bruxelles ?',	'{"answers": [{"content": "1815", "is_good_answer": true}, {"content": "1831", "is_good_answer": false}, {"content": "1809", "is_good_answer": false}, {"content": "1824", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:11.144+00',	'2021-02-15 20:12:11.144+00'),
('53f6c1bd-14d2-431b-8434-1ddaffeba798',	'medium',	'Quel basketteur américain a été champion NBA en 1998 pour la sixième fois de sa carrière ?',	'{"answers": [{"content": "Patrick Ewing", "is_good_answer": false}, {"content": "Karl Malone", "is_good_answer": false}, {"content": "Charles Barkley", "is_good_answer": false}, {"content": "Michael Jordan", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:11.225+00',	'2021-02-15 20:12:11.225+00'),
('76767cf9-7a54-4917-90d5-28c16e33aaa9',	'medium',	'Dans quelle pays est né le joueur de basket-ball professionnel Tony Parker ?',	'{"answers": [{"content": "Belgique", "is_good_answer": true}, {"content": "USA", "is_good_answer": false}, {"content": "France", "is_good_answer": false}, {"content": "Pologne", "is_good_answer": false}], "additional": {"responseMedia": {"url": null, "info": "Il évoluait dans l''équipe des Spurs de San Antonio depuis son arrivée dans la NBA en 2001."}}}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:11.3+00',	'2021-02-15 20:12:11.3+00'),
('a5f4f55b-5a80-4710-a9e5-03ac5371df65',	'medium',	'Qui a été élu joueur de la décennie 2000 suite à un sondage du site officiel NBA ?',	'{"answers": [{"content": "Derek Fisher", "is_good_answer": false}, {"content": "Ron Harper", "is_good_answer": false}, {"content": "Kobe Bryant", "is_good_answer": true}, {"content": "Rick Fox", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:11.382+00',	'2021-02-15 20:12:11.382+00'),
('21aae6d3-8a3f-4afe-a465-a324b4bb6759',	'medium',	'Quel concours de dunks est organisé par la NBA durant le NBA All-Star Week-end ?',	'{"answers": [{"content": "Skills Challenge", "is_good_answer": false}, {"content": "Slam Dunk Contest", "is_good_answer": true}, {"content": "Three-point Shootout", "is_good_answer": false}, {"content": "All-Star Game", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:11.482+00',	'2021-02-15 20:12:11.482+00'),
('dbea8187-b683-4f18-8d26-062d41336e3e',	'medium',	'Quel basketteur américain a réalisé en 2000 un 360 degrés inversé mythique ?',	'{"answers": [{"content": "Jarnell Stokes", "is_good_answer": false}, {"content": "Vince Carter", "is_good_answer": true}, {"content": "Marc Gasol", "is_good_answer": false}, {"content": "Andrew Harrison", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:11.565+00',	'2021-02-15 20:12:11.565+00'),
('3b26b8da-8535-4ae6-9129-930ac4964993',	'medium',	'Quel joueur de NBA se définit lui-même comme un « viking africain » ?',	'{"answers": [{"content": "Derrick Rose", "is_good_answer": false}, {"content": "Pau Gasol", "is_good_answer": false}, {"content": "Aaron Brooks", "is_good_answer": false}, {"content": "Joakim Noah", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:11.648+00',	'2021-02-15 20:12:11.648+00'),
('6a25ce00-4086-4c33-aaec-66a9f6b24833',	'medium',	'Quel événement annuel majeur de la NBA est comparable à une bourse de joueurs ?',	'{"answers": [{"content": "La franchise", "is_good_answer": false}, {"content": "Les playoffs", "is_good_answer": false}, {"content": "Le ballotage", "is_good_answer": false}, {"content": "La draft", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:11.73+00',	'2021-02-15 20:12:11.73+00'),
('fd1c644b-0d32-40c0-9ff6-b53ac938de09',	'medium',	'Combien de titres de champion NBA Michael Jordan a-t-il obtenu ?',	'{"answers": [{"content": "Cinq", "is_good_answer": false}, {"content": "Sept", "is_good_answer": false}, {"content": "Six", "is_good_answer": true}, {"content": "Quatre", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:11.821+00',	'2021-02-15 20:12:11.821+00'),
('a1613bed-1179-4a45-bac0-64ae342c8842',	'medium',	'Qui est le premier joueur français à avoir été sacré champion NBA ?',	'{"answers": [{"content": "Joe Dumars", "is_good_answer": false}, {"content": "Paul Pierce", "is_good_answer": false}, {"content": "Tony Parker", "is_good_answer": true}, {"content": "Tim Duncan", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:11.904+00',	'2021-02-15 20:12:11.904+00'),
('7ace3c39-afdd-424a-be7c-ef54c5854eea',	'medium',	'Qui a été élu deux fois meilleur joueur de la NBA, en 2005 et 2006 ?',	'{"answers": [{"content": "Jeff Brown", "is_good_answer": false}, {"content": "Dana Jones", "is_good_answer": false}, {"content": "Marlon Garnett", "is_good_answer": false}, {"content": "Steve Nash", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:11.995+00',	'2021-02-15 20:12:11.995+00'),
('bd52d63a-ac9b-4810-b171-fe7a858da5bd',	'medium',	'Quel gagnant de la « Nouvelle Star », diffusée sur M6, est surnommé « La Tortue » ?',	'{"answers": [{"content": "Christophe Willem", "is_good_answer": true}, {"content": "Julien Doré", "is_good_answer": false}, {"content": "Jonatan Cerrada", "is_good_answer": false}, {"content": "Steeve Estatof", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:12.07+00',	'2021-02-15 20:12:12.07+00'),
('d167cbf7-11cd-40e3-b825-1534e3efeff4',	'medium',	'En 1991, quel tube Yannick Noah a-t-il associé à la victoire de la France en coupe Davis ?',	'{"answers": [{"content": "Vagabond", "is_good_answer": false}, {"content": "Les Lionnes", "is_good_answer": false}, {"content": "Saga Africa", "is_good_answer": true}, {"content": "Ose", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:12.155+00',	'2021-02-15 20:12:12.155+00'),
('cdea8903-0504-4aff-8180-5c44dbd0d292',	'medium',	'Quel Américano-Libanais est entré dans les charts avec « Life in Cartoon Motion » ?',	'{"answers": [{"content": "Mika", "is_good_answer": true}, {"content": "Iwan", "is_good_answer": false}, {"content": "Rida", "is_good_answer": false}, {"content": "K. Maro", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:12.427+00',	'2021-02-15 20:12:12.427+00'),
('ac563f7c-8598-4922-ac81-e30adccbd927',	'medium',	'À quel modèle de voiture ressemble le vieux tacot jaune que conduit Gaston Lagaffe ?',	'{"answers": [{"content": "Rolls-Royce", "is_good_answer": false}, {"content": "Citroën B10", "is_good_answer": false}, {"content": "Fiat 509", "is_good_answer": true}, {"content": "Jeep", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:13.055+00',	'2021-02-15 20:12:13.055+00'),
('c1ee50ba-e6ea-4724-9bad-530296596663',	'medium',	'Quelle firme automobile, filiale française de FIAT, a ensuite intégré le groupe Chrysler ?',	'{"answers": [{"content": "Simca", "is_good_answer": true}, {"content": "Hommell", "is_good_answer": false}, {"content": "Packard", "is_good_answer": false}, {"content": "Triumph", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:13.743+00',	'2021-02-15 20:12:13.743+00'),
('1c1e9379-c9bc-49c0-bd37-0041f8dea190',	'medium',	'Salamèche évolue en ',	'{"answers": [{"content": "Dracaufeu", "is_good_answer": false}, {"content": "Reptincel", "is_good_answer": true}, {"content": "Magna", "is_good_answer": false}, {"content": "Ptera", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:13.916+00',	'2021-02-15 20:12:13.916+00'),
('170fa887-44fc-4fd7-ac5d-700627c45f1e',	'medium',	'Sur quelle plateforme le jeu Tekken est sorti en premier ?',	'{"answers": [{"content": "La borne d''arcade", "is_good_answer": true}, {"content": "NES", "is_good_answer": false}, {"content": "Playstation", "is_good_answer": false}, {"content": "Gamecube", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:14.173+00',	'2021-02-15 20:12:14.173+00'),
('a5638b81-d00e-4031-b686-a9af503b10c8',	'medium',	'Le jeu Counter Strike dérive de quel autre jeu ?',	'{"answers": [{"content": "Half Life", "is_good_answer": true}, {"content": "Splinter Cell", "is_good_answer": false}, {"content": "Doom", "is_good_answer": false}, {"content": "Call of Duty", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:14.529+00',	'2021-02-15 20:12:14.529+00'),
('02cde971-5521-4d2e-8faa-b9925c3b1469',	'medium',	'Dans Pac man qu''est ce qui hante le labyrinthe ?',	'{"answers": [{"content": "Des plantes carnivores", "is_good_answer": false}, {"content": "Des fantômes", "is_good_answer": true}, {"content": "Des squelettes", "is_good_answer": false}, {"content": "Des zombies", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:14.604+00',	'2021-02-15 20:12:14.604+00'),
('acee1406-8aa2-43e5-ba4b-b1db18746327',	'medium',	'Dans la légende de Zelda, comment s''appelle le héros ?',	'{"answers": [{"content": "Zelda", "is_good_answer": false}, {"content": "Bruno", "is_good_answer": false}, {"content": "Ganondorf", "is_good_answer": false}, {"content": "Link", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:14.703+00',	'2021-02-15 20:12:14.703+00'),
('7d2ab92f-4981-4e5a-8182-1b2bd6bf2315',	'medium',	'Qui est le compagnon de Batman ?',	'{"answers": [{"content": "Robin", "is_good_answer": true}]}',	'pending',	'{}',	NULL,	'2021-02-15 20:12:14.819+00',	'2021-02-15 20:12:14.819+00'),
('23c890c9-828c-4b34-8f2b-e16b7bce6a00',	'medium',	'Quel super héros ne se sépare jamais de son marteau forgé par les nains ',	'{"answers": [{"content": "Thor", "is_good_answer": true}]}',	'pending',	'{}',	NULL,	'2021-02-15 20:12:14.893+00',	'2021-02-15 20:12:14.893+00'),
('940d0462-e870-46a0-8e0c-ceceab865799',	'medium',	'Quel super-héros porte un costume inspiré du drapeau américain ?',	'{"answers": [{"content": "Tigra", "is_good_answer": false}, {"content": "Iron Man", "is_good_answer": false}, {"content": "Blade", "is_good_answer": false}, {"content": "Captain America", "is_good_answer": true}]}',	'disapproved',	'{}',	NULL,	'2021-02-15 20:12:15.058+00',	'2021-02-15 20:12:15.058+00'),
('2be9f411-fd43-41b4-bc82-da8bfd3a1b4f',	'medium',	'Quel chanteur prénommé Mathieu a émergé du succès remporté par les Linkup ?',	'{"answers": [{"content": "Corneille", "is_good_answer": false}, {"content": "Keen''V", "is_good_answer": false}, {"content": "Raphaël", "is_good_answer": false}, {"content": "M. Pokora", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:12.244+00',	'2021-02-15 20:12:12.244+00'),
('0b609210-b4a6-4cf1-9747-16af18255f46',	'medium',	'Quel est le style musical de l''album de Rohff, « La fierté des années » ?',	'{"answers": [{"content": "La Techno", "is_good_answer": false}, {"content": "Le tango", "is_good_answer": false}, {"content": "Le disco", "is_good_answer": false}, {"content": "Le rap", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:12.334+00',	'2021-02-15 20:12:12.334+00'),
('982910c5-8d11-467e-a36f-ea3c4dbb1210',	'medium',	'Qui a chanté au pied de …onnes le 10 juin 2000 ?',	'{"answers": [{"content": "Eddy Mitchell", "is_good_answer": false}, {"content": "Patrick Bruel", "is_good_answer": false}, {"content": "Christophe Maé", "is_good_answer": false}, {"content": "Johnny Hallyday", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:12.525+00',	'2021-02-15 20:12:12.525+00'),
('a7aa52d6-5970-4a4b-8569-748dd276a12c',	'medium',	'Sous quel nom le rappeur et homme d''affaires américain Curtis Jackson fait-il carrière ?',	'{"answers": [{"content": "50 cent", "is_good_answer": true}, {"content": "Fat Joe", "is_good_answer": false}, {"content": "Big Sean", "is_good_answer": false}, {"content": "Mike D", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:12.614+00',	'2021-02-15 20:12:12.614+00'),
('e8c89c21-f93c-43eb-8788-b8ca190ad506',	'medium',	'Avec quel chanteur le top model Heidi Klum a-t-elle été mariée durant sept ans ?',	'{"answers": [{"content": "Seal", "is_good_answer": true}, {"content": "Paul McCartney", "is_good_answer": false}, {"content": "Sean Paul", "is_good_answer": false}, {"content": "Robbie Williams", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:12.709+00',	'2021-02-15 20:12:12.709+00'),
('e369f25c-8dc5-4fdf-ae58-8ea051d847d5',	'medium',	'Quel DJ a repris un titre des années 80 pour faire un tube avec « Living On Video » ?',	'{"answers": [{"content": "Pakito", "is_good_answer": true}, {"content": "Vitalic", "is_good_answer": false}, {"content": "Madeon", "is_good_answer": false}, {"content": "Brodinski", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:12.798+00',	'2021-02-15 20:12:12.798+00'),
('964517ee-c37b-410a-9485-50f34e7fec85',	'medium',	'Quel chanteur a sorti « Musicology » puis « 3121 » deux ans plus tard ?',	'{"answers": [{"content": "Bob James", "is_good_answer": false}, {"content": "Al Jarreau", "is_good_answer": false}, {"content": "Prince", "is_good_answer": true}, {"content": "James Brown", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:12.881+00',	'2021-02-15 20:12:12.881+00'),
('a434e5ca-514e-471d-94d0-42c103ce29f8',	'medium',	'Dans quel pays se situe le circuit de course automobile du Mans ?',	'{"answers": [{"content": "Pays-Bas", "is_good_answer": false}, {"content": "Suisse", "is_good_answer": false}, {"content": "Belgique", "is_good_answer": false}, {"content": "France", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:12.964+00',	'2021-02-15 20:12:12.964+00'),
('08a1db29-4945-495a-a56b-50fb0c5bc448',	'medium',	'Quel sport automobile consiste à accélérer le plus rapidement possible avec son véhicule ?',	'{"answers": [{"content": "Le trial", "is_good_answer": false}, {"content": "Le Drift", "is_good_answer": false}, {"content": "Le Monster truck", "is_good_answer": false}, {"content": "Le Dragster", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:13.13+00',	'2021-02-15 20:12:13.13+00'),
('2cc61387-b75e-4e33-b36d-2d12f9df4c8b',	'medium',	'Comment s''appelle le véhicule du personnage de bande dessinée Batman ?',	'{"answers": [{"content": "La BatDrive", "is_good_answer": false}, {"content": "La Batauto", "is_good_answer": false}, {"content": "La Batcar", "is_good_answer": false}, {"content": "La Batmobile", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:13.212+00',	'2021-02-15 20:12:13.212+00'),
('3ad58a13-3eff-4ad5-a212-93d393f62cdb',	'medium',	'De quand date le Duster, véhicule utilitaire sport vendu par la marque roumaine Dacia ?',	'{"answers": [{"content": "2006", "is_good_answer": false}, {"content": "2008", "is_good_answer": false}, {"content": "2010", "is_good_answer": true}, {"content": "2012", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:13.295+00',	'2021-02-15 20:12:13.295+00'),
('61dc7868-3212-4a16-81f0-8ea01d8094d6',	'medium',	'En France, refuser une priorité peut vous coûter combien de points sur le permis ?',	'{"answers": [{"content": "6 points", "is_good_answer": false}, {"content": "8 points", "is_good_answer": false}, {"content": "4 points", "is_good_answer": true}, {"content": "2 points", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:13.386+00',	'2021-02-15 20:12:13.386+00'),
('809c604a-b0b6-4f60-99c2-a33ecaa98073',	'medium',	'Quelle principauté accueille l''un des plus prestigieux Grand Prix de Formule 1 ?',	'{"answers": [{"content": "Liechtenstein", "is_good_answer": false}, {"content": "Andorre", "is_good_answer": false}, {"content": "Mantoue", "is_good_answer": false}, {"content": "Monaco", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:13.461+00',	'2021-02-15 20:12:13.461+00'),
('7c7c6c81-08e0-4d04-9916-fa117d5cdb38',	'medium',	'Dans le monde automobile, quel sigle correspond au Grand Tourisme Injection ?',	'{"answers": [{"content": "Sport", "is_good_answer": false}, {"content": "Gti", "is_good_answer": true}, {"content": "TT", "is_good_answer": false}, {"content": "Turbo", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:13.56+00',	'2021-02-15 20:12:13.56+00'),
('aff7b2ec-aaea-4dff-a369-deb34815d517',	'medium',	'Quelle société appartenant au groupe Belron « répare et remplace » votre pare-brise ?',	'{"answers": [{"content": "Carglass", "is_good_answer": true}, {"content": "Midas", "is_good_answer": false}, {"content": "Speedy", "is_good_answer": false}, {"content": "Norauto", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:13.651+00',	'2021-02-15 20:12:13.651+00'),
('0cbb695e-dc39-4da1-83b8-14b9ce1be9cd',	'medium',	'Dans quel jeu peux on voir des Chocobos ?',	'{"answers": [{"content": "Breath of fire", "is_good_answer": false}, {"content": "Final Fantasy", "is_good_answer": true}, {"content": "Secret of Mana", "is_good_answer": false}, {"content": "Golden stun", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:13.826+00',	'2021-02-15 20:12:13.826+00'),
('de0128f7-ec67-446b-819b-11d7cd24a982',	'medium',	'Zelda est un jeu du genre',	'{"answers": [{"content": "Aventure", "is_good_answer": true}, {"content": "RPG", "is_good_answer": false}, {"content": "Course", "is_good_answer": false}, {"content": "Simulation", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:14.082+00',	'2021-02-15 20:12:14.082+00'),
('2736b908-4e5a-4052-b49f-2e6a1a77a173',	'medium',	'Dans quel jeu le personnage de Mario a-t-il été développé en premier ?',	'{"answers": [{"content": "Super Mario", "is_good_answer": false}, {"content": "Super Mario Bros", "is_good_answer": false}, {"content": "Donkey Kong", "is_good_answer": true}, {"content": "Mario Party", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:14.257+00',	'2021-02-15 20:12:14.257+00'),
('2d6f6a7a-9339-417e-8ce8-68fbec1cbf8f',	'medium',	'La série Fallout est la suite « spirituelle » de quel jeu ?',	'{"answers": [{"content": "Wasteland", "is_good_answer": true}, {"content": "Homeland", "is_good_answer": false}, {"content": "Falland", "is_good_answer": false}, {"content": "Skyrim", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:14.355+00',	'2021-02-15 20:12:14.355+00'),
('2ed0541a-16c4-4f5b-a50b-c3d870630272',	'medium',	'Que signifie le nom de la serie GTA ?',	'{"answers": [{"content": "Burnout", "is_good_answer": false}, {"content": "Conduite dangeureuse", "is_good_answer": false}, {"content": "Vol de voiture", "is_good_answer": true}, {"content": "Voiture customisé", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-15 20:12:14.438+00',	'2021-02-15 20:12:14.438+00'),
('c5c46763-7512-439d-b8b0-c43f23fe6309',	'medium',	'Quel super-héros à la force surhumaine ressemble à un être de pierre ?',	'{"answers": [{"content": "Hawkman", "is_good_answer": false}, {"content": "Plastic Man", "is_good_answer": false}, {"content": "Superboy", "is_good_answer": false}, {"content": "La Chose", "is_good_answer": true}]}',	'disapproved',	'{}',	NULL,	'2021-02-15 20:12:14.976+00',	'2021-02-15 20:12:14.976+00');

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
('0e209468-eb23-42cf-a78f-73a8dac93d07',	'0835c055-7428-4dfa-891d-d701a2b627c3',	'2021-02-15 20:12:10.457+00',	'2021-02-15 20:12:10.457+00'),
('0e209468-eb23-42cf-a78f-73a8dac93d07',	'2db934c5-e5ef-4adc-9492-b70235cc765e',	'2021-02-15 20:12:10.537+00',	'2021-02-15 20:12:10.537+00'),
('0e209468-eb23-42cf-a78f-73a8dac93d07',	'f46befcd-d384-4178-89ab-98ffee697334',	'2021-02-15 20:12:10.611+00',	'2021-02-15 20:12:10.611+00'),
('0e209468-eb23-42cf-a78f-73a8dac93d07',	'38bcf098-432a-4275-8dae-83f4887cb4c8',	'2021-02-15 20:12:10.687+00',	'2021-02-15 20:12:10.687+00'),
('0e209468-eb23-42cf-a78f-73a8dac93d07',	'c967c803-aec6-4c24-8c15-fd5f6a073372',	'2021-02-15 20:12:10.769+00',	'2021-02-15 20:12:10.769+00'),
('0e209468-eb23-42cf-a78f-73a8dac93d07',	'c511ec33-b61f-4011-9a95-b0e791f374b8',	'2021-02-15 20:12:10.845+00',	'2021-02-15 20:12:10.845+00'),
('0e209468-eb23-42cf-a78f-73a8dac93d07',	'cf21daeb-a805-4699-93e6-251600547662',	'2021-02-15 20:12:10.925+00',	'2021-02-15 20:12:10.925+00'),
('0e209468-eb23-42cf-a78f-73a8dac93d07',	'd8dc5d4a-aafb-4ae9-b042-10e91e965993',	'2021-02-15 20:12:11.008+00',	'2021-02-15 20:12:11.008+00'),
('0e209468-eb23-42cf-a78f-73a8dac93d07',	'b58b624e-56fb-451d-a823-33dc51c14755',	'2021-02-15 20:12:11.091+00',	'2021-02-15 20:12:11.091+00'),
('0e209468-eb23-42cf-a78f-73a8dac93d07',	'3575ba41-6884-481d-b9e0-00d1b3acce98',	'2021-02-15 20:12:11.174+00',	'2021-02-15 20:12:11.174+00'),
('4a033b89-d7db-4d12-a184-8c6c5e1a5150',	'53f6c1bd-14d2-431b-8434-1ddaffeba798',	'2021-02-15 20:12:11.249+00',	'2021-02-15 20:12:11.249+00'),
('4a033b89-d7db-4d12-a184-8c6c5e1a5150',	'76767cf9-7a54-4917-90d5-28c16e33aaa9',	'2021-02-15 20:12:11.331+00',	'2021-02-15 20:12:11.331+00'),
('4a033b89-d7db-4d12-a184-8c6c5e1a5150',	'a5f4f55b-5a80-4710-a9e5-03ac5371df65',	'2021-02-15 20:12:11.423+00',	'2021-02-15 20:12:11.423+00'),
('4a033b89-d7db-4d12-a184-8c6c5e1a5150',	'21aae6d3-8a3f-4afe-a465-a324b4bb6759',	'2021-02-15 20:12:11.505+00',	'2021-02-15 20:12:11.505+00'),
('4a033b89-d7db-4d12-a184-8c6c5e1a5150',	'dbea8187-b683-4f18-8d26-062d41336e3e',	'2021-02-15 20:12:11.597+00',	'2021-02-15 20:12:11.597+00'),
('4a033b89-d7db-4d12-a184-8c6c5e1a5150',	'3b26b8da-8535-4ae6-9129-930ac4964993',	'2021-02-15 20:12:11.672+00',	'2021-02-15 20:12:11.672+00'),
('4a033b89-d7db-4d12-a184-8c6c5e1a5150',	'6a25ce00-4086-4c33-aaec-66a9f6b24833',	'2021-02-15 20:12:11.762+00',	'2021-02-15 20:12:11.762+00'),
('4a033b89-d7db-4d12-a184-8c6c5e1a5150',	'fd1c644b-0d32-40c0-9ff6-b53ac938de09',	'2021-02-15 20:12:11.844+00',	'2021-02-15 20:12:11.844+00'),
('4a033b89-d7db-4d12-a184-8c6c5e1a5150',	'a1613bed-1179-4a45-bac0-64ae342c8842',	'2021-02-15 20:12:11.936+00',	'2021-02-15 20:12:11.936+00'),
('4a033b89-d7db-4d12-a184-8c6c5e1a5150',	'7ace3c39-afdd-424a-be7c-ef54c5854eea',	'2021-02-15 20:12:12.019+00',	'2021-02-15 20:12:12.019+00'),
('807fa2d9-5720-45cd-bf7f-05b23f42e802',	'bd52d63a-ac9b-4810-b171-fe7a858da5bd',	'2021-02-15 20:12:12.101+00',	'2021-02-15 20:12:12.101+00'),
('807fa2d9-5720-45cd-bf7f-05b23f42e802',	'd167cbf7-11cd-40e3-b825-1534e3efeff4',	'2021-02-15 20:12:12.186+00',	'2021-02-15 20:12:12.186+00'),
('807fa2d9-5720-45cd-bf7f-05b23f42e802',	'2be9f411-fd43-41b4-bc82-da8bfd3a1b4f',	'2021-02-15 20:12:12.267+00',	'2021-02-15 20:12:12.267+00'),
('807fa2d9-5720-45cd-bf7f-05b23f42e802',	'0b609210-b4a6-4cf1-9747-16af18255f46',	'2021-02-15 20:12:12.366+00',	'2021-02-15 20:12:12.366+00'),
('807fa2d9-5720-45cd-bf7f-05b23f42e802',	'cdea8903-0504-4aff-8180-5c44dbd0d292',	'2021-02-15 20:12:12.458+00',	'2021-02-15 20:12:12.458+00'),
('807fa2d9-5720-45cd-bf7f-05b23f42e802',	'982910c5-8d11-467e-a36f-ea3c4dbb1210',	'2021-02-15 20:12:12.548+00',	'2021-02-15 20:12:12.548+00'),
('807fa2d9-5720-45cd-bf7f-05b23f42e802',	'a7aa52d6-5970-4a4b-8569-748dd276a12c',	'2021-02-15 20:12:12.64+00',	'2021-02-15 20:12:12.64+00'),
('807fa2d9-5720-45cd-bf7f-05b23f42e802',	'e8c89c21-f93c-43eb-8788-b8ca190ad506',	'2021-02-15 20:12:12.739+00',	'2021-02-15 20:12:12.739+00'),
('807fa2d9-5720-45cd-bf7f-05b23f42e802',	'e369f25c-8dc5-4fdf-ae58-8ea051d847d5',	'2021-02-15 20:12:12.822+00',	'2021-02-15 20:12:12.822+00'),
('807fa2d9-5720-45cd-bf7f-05b23f42e802',	'964517ee-c37b-410a-9485-50f34e7fec85',	'2021-02-15 20:12:12.904+00',	'2021-02-15 20:12:12.904+00'),
('4223f68b-87a0-4479-8d3e-cf398bc9d2af',	'a434e5ca-514e-471d-94d0-42c103ce29f8',	'2021-02-15 20:12:12.988+00',	'2021-02-15 20:12:12.988+00'),
('4223f68b-87a0-4479-8d3e-cf398bc9d2af',	'ac563f7c-8598-4922-ac81-e30adccbd927',	'2021-02-15 20:12:13.079+00',	'2021-02-15 20:12:13.079+00'),
('4223f68b-87a0-4479-8d3e-cf398bc9d2af',	'08a1db29-4945-495a-a56b-50fb0c5bc448',	'2021-02-15 20:12:13.161+00',	'2021-02-15 20:12:13.161+00'),
('4223f68b-87a0-4479-8d3e-cf398bc9d2af',	'2cc61387-b75e-4e33-b36d-2d12f9df4c8b',	'2021-02-15 20:12:13.235+00',	'2021-02-15 20:12:13.235+00'),
('4223f68b-87a0-4479-8d3e-cf398bc9d2af',	'3ad58a13-3eff-4ad5-a212-93d393f62cdb',	'2021-02-15 20:12:13.327+00',	'2021-02-15 20:12:13.327+00'),
('4223f68b-87a0-4479-8d3e-cf398bc9d2af',	'61dc7868-3212-4a16-81f0-8ea01d8094d6',	'2021-02-15 20:12:13.409+00',	'2021-02-15 20:12:13.409+00'),
('4223f68b-87a0-4479-8d3e-cf398bc9d2af',	'809c604a-b0b6-4f60-99c2-a33ecaa98073',	'2021-02-15 20:12:13.492+00',	'2021-02-15 20:12:13.492+00'),
('4223f68b-87a0-4479-8d3e-cf398bc9d2af',	'7c7c6c81-08e0-4d04-9916-fa117d5cdb38',	'2021-02-15 20:12:13.592+00',	'2021-02-15 20:12:13.592+00'),
('4223f68b-87a0-4479-8d3e-cf398bc9d2af',	'aff7b2ec-aaea-4dff-a369-deb34815d517',	'2021-02-15 20:12:13.682+00',	'2021-02-15 20:12:13.682+00'),
('4223f68b-87a0-4479-8d3e-cf398bc9d2af',	'c1ee50ba-e6ea-4724-9bad-530296596663',	'2021-02-15 20:12:13.766+00',	'2021-02-15 20:12:13.766+00'),
('b432070d-4773-4820-8853-7147a38ecbd0',	'0cbb695e-dc39-4da1-83b8-14b9ce1be9cd',	'2021-02-15 20:12:13.857+00',	'2021-02-15 20:12:13.857+00'),
('b432070d-4773-4820-8853-7147a38ecbd0',	'1c1e9379-c9bc-49c0-bd37-0041f8dea190',	'2021-02-15 20:12:13.948+00',	'2021-02-15 20:12:13.948+00'),
('b432070d-4773-4820-8853-7147a38ecbd0',	'de0128f7-ec67-446b-819b-11d7cd24a982',	'2021-02-15 20:12:14.105+00',	'2021-02-15 20:12:14.105+00'),
('b432070d-4773-4820-8853-7147a38ecbd0',	'170fa887-44fc-4fd7-ac5d-700627c45f1e',	'2021-02-15 20:12:14.204+00',	'2021-02-15 20:12:14.204+00'),
('b432070d-4773-4820-8853-7147a38ecbd0',	'2736b908-4e5a-4052-b49f-2e6a1a77a173',	'2021-02-15 20:12:14.295+00',	'2021-02-15 20:12:14.295+00'),
('b432070d-4773-4820-8853-7147a38ecbd0',	'2d6f6a7a-9339-417e-8ce8-68fbec1cbf8f',	'2021-02-15 20:12:14.379+00',	'2021-02-15 20:12:14.379+00'),
('b432070d-4773-4820-8853-7147a38ecbd0',	'2ed0541a-16c4-4f5b-a50b-c3d870630272',	'2021-02-15 20:12:14.469+00',	'2021-02-15 20:12:14.469+00'),
('b432070d-4773-4820-8853-7147a38ecbd0',	'a5638b81-d00e-4031-b686-a9af503b10c8',	'2021-02-15 20:12:14.553+00',	'2021-02-15 20:12:14.553+00'),
('b432070d-4773-4820-8853-7147a38ecbd0',	'02cde971-5521-4d2e-8faa-b9925c3b1469',	'2021-02-15 20:12:14.636+00',	'2021-02-15 20:12:14.636+00'),
('b432070d-4773-4820-8853-7147a38ecbd0',	'acee1406-8aa2-43e5-ba4b-b1db18746327',	'2021-02-15 20:12:14.726+00',	'2021-02-15 20:12:14.726+00'),
('50275469-efc5-413e-9f33-cbadefc35813',	'7d2ab92f-4981-4e5a-8182-1b2bd6bf2315',	'2021-02-15 20:12:14.842+00',	'2021-02-15 20:12:14.842+00'),
('50275469-efc5-413e-9f33-cbadefc35813',	'23c890c9-828c-4b34-8f2b-e16b7bce6a00',	'2021-02-15 20:12:14.924+00',	'2021-02-15 20:12:14.924+00'),
('50275469-efc5-413e-9f33-cbadefc35813',	'c5c46763-7512-439d-b8b0-c43f23fe6309',	'2021-02-15 20:12:14.999+00',	'2021-02-15 20:12:14.999+00'),
('50275469-efc5-413e-9f33-cbadefc35813',	'940d0462-e870-46a0-8e0c-ceceab865799',	'2021-02-15 20:12:15.082+00',	'2021-02-15 20:12:15.082+00');

DROP TABLE IF EXISTS "question_type";
CREATE TABLE "public"."question_type" (
    "id" uuid NOT NULL,
    "name" character varying(50) NOT NULL,
    "label" character varying(80) NOT NULL,
    "isChild" boolean NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "question_type_label_key" UNIQUE ("label"),
    CONSTRAINT "question_type_name_key" UNIQUE ("name"),
    CONSTRAINT "question_type_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "question_type" ("id", "name", "label", "isChild", "createdAt", "updatedAt") VALUES
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'qcm',	'QCM',	'0',	'2021-02-15 20:12:10.146+00',	'2021-02-15 20:12:10.146+00'),
('d0332ce9-13de-4256-b2a6-5312064992cc',	'input',	'Réponse libre',	'0',	'2021-02-15 20:12:10.207+00',	'2021-02-15 20:12:10.207+00'),
('c5525d95-0350-4491-a024-9f43efc54e90',	'blind-test',	'Blind Test',	'1',	'2021-02-15 20:12:10.238+00',	'2021-02-15 20:12:10.238+00');

DROP TABLE IF EXISTS "question_type_question";
CREATE TABLE "public"."question_type_question" (
    "questionTypeId" uuid NOT NULL,
    "questionId" uuid NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "question_type_question_pkey" PRIMARY KEY ("questionTypeId", "questionId"),
    CONSTRAINT "question_type_question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES question(id) ON DELETE RESTRICT NOT DEFERRABLE,
    CONSTRAINT "question_type_question_questionTypeId_fkey" FOREIGN KEY ("questionTypeId") REFERENCES question_type(id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

DROP TABLE IF EXISTS "question_type_question";
CREATE TABLE "public"."question_type_question" (
    "questionTypeId" uuid NOT NULL,
    "questionId" uuid NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "question_type_question_pkey" PRIMARY KEY ("questionTypeId", "questionId"),
    CONSTRAINT "question_type_question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES question(id) ON DELETE RESTRICT NOT DEFERRABLE,
    CONSTRAINT "question_type_question_questionTypeId_fkey" FOREIGN KEY ("questionTypeId") REFERENCES question_type(id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

INSERT INTO "question_type_question" ("questionTypeId", "questionId", "createdAt", "updatedAt") VALUES
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'0835c055-7428-4dfa-891d-d701a2b627c3',	'2021-02-15 20:12:10.455+00',	'2021-02-15 20:12:10.455+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'2db934c5-e5ef-4adc-9492-b70235cc765e',	'2021-02-15 20:12:10.538+00',	'2021-02-15 20:12:10.538+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'f46befcd-d384-4178-89ab-98ffee697334',	'2021-02-15 20:12:10.61+00',	'2021-02-15 20:12:10.61+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'38bcf098-432a-4275-8dae-83f4887cb4c8',	'2021-02-15 20:12:10.686+00',	'2021-02-15 20:12:10.686+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'c967c803-aec6-4c24-8c15-fd5f6a073372',	'2021-02-15 20:12:10.768+00',	'2021-02-15 20:12:10.768+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'c511ec33-b61f-4011-9a95-b0e791f374b8',	'2021-02-15 20:12:10.844+00',	'2021-02-15 20:12:10.844+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'cf21daeb-a805-4699-93e6-251600547662',	'2021-02-15 20:12:10.926+00',	'2021-02-15 20:12:10.926+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'd8dc5d4a-aafb-4ae9-b042-10e91e965993',	'2021-02-15 20:12:11.01+00',	'2021-02-15 20:12:11.01+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'b58b624e-56fb-451d-a823-33dc51c14755',	'2021-02-15 20:12:11.092+00',	'2021-02-15 20:12:11.092+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'3575ba41-6884-481d-b9e0-00d1b3acce98',	'2021-02-15 20:12:11.173+00',	'2021-02-15 20:12:11.173+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'53f6c1bd-14d2-431b-8434-1ddaffeba798',	'2021-02-15 20:12:11.248+00',	'2021-02-15 20:12:11.248+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'76767cf9-7a54-4917-90d5-28c16e33aaa9',	'2021-02-15 20:12:11.332+00',	'2021-02-15 20:12:11.332+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'a5f4f55b-5a80-4710-a9e5-03ac5371df65',	'2021-02-15 20:12:11.422+00',	'2021-02-15 20:12:11.422+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'21aae6d3-8a3f-4afe-a465-a324b4bb6759',	'2021-02-15 20:12:11.506+00',	'2021-02-15 20:12:11.506+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'dbea8187-b683-4f18-8d26-062d41336e3e',	'2021-02-15 20:12:11.596+00',	'2021-02-15 20:12:11.596+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'3b26b8da-8535-4ae6-9129-930ac4964993',	'2021-02-15 20:12:11.671+00',	'2021-02-15 20:12:11.671+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'6a25ce00-4086-4c33-aaec-66a9f6b24833',	'2021-02-15 20:12:11.761+00',	'2021-02-15 20:12:11.761+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'fd1c644b-0d32-40c0-9ff6-b53ac938de09',	'2021-02-15 20:12:11.846+00',	'2021-02-15 20:12:11.846+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'a1613bed-1179-4a45-bac0-64ae342c8842',	'2021-02-15 20:12:11.937+00',	'2021-02-15 20:12:11.937+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'7ace3c39-afdd-424a-be7c-ef54c5854eea',	'2021-02-15 20:12:12.018+00',	'2021-02-15 20:12:12.018+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'bd52d63a-ac9b-4810-b171-fe7a858da5bd',	'2021-02-15 20:12:12.102+00',	'2021-02-15 20:12:12.102+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'd167cbf7-11cd-40e3-b825-1534e3efeff4',	'2021-02-15 20:12:12.185+00',	'2021-02-15 20:12:12.185+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'2be9f411-fd43-41b4-bc82-da8bfd3a1b4f',	'2021-02-15 20:12:12.267+00',	'2021-02-15 20:12:12.267+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'0b609210-b4a6-4cf1-9747-16af18255f46',	'2021-02-15 20:12:12.367+00',	'2021-02-15 20:12:12.367+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'cdea8903-0504-4aff-8180-5c44dbd0d292',	'2021-02-15 20:12:12.457+00',	'2021-02-15 20:12:12.457+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'982910c5-8d11-467e-a36f-ea3c4dbb1210',	'2021-02-15 20:12:12.549+00',	'2021-02-15 20:12:12.549+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'a7aa52d6-5970-4a4b-8569-748dd276a12c',	'2021-02-15 20:12:12.639+00',	'2021-02-15 20:12:12.639+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'e8c89c21-f93c-43eb-8788-b8ca190ad506',	'2021-02-15 20:12:12.741+00',	'2021-02-15 20:12:12.741+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'e369f25c-8dc5-4fdf-ae58-8ea051d847d5',	'2021-02-15 20:12:12.822+00',	'2021-02-15 20:12:12.822+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'964517ee-c37b-410a-9485-50f34e7fec85',	'2021-02-15 20:12:12.905+00',	'2021-02-15 20:12:12.905+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'a434e5ca-514e-471d-94d0-42c103ce29f8',	'2021-02-15 20:12:12.987+00',	'2021-02-15 20:12:12.987+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'ac563f7c-8598-4922-ac81-e30adccbd927',	'2021-02-15 20:12:13.078+00',	'2021-02-15 20:12:13.078+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'08a1db29-4945-495a-a56b-50fb0c5bc448',	'2021-02-15 20:12:13.162+00',	'2021-02-15 20:12:13.162+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'2cc61387-b75e-4e33-b36d-2d12f9df4c8b',	'2021-02-15 20:12:13.236+00',	'2021-02-15 20:12:13.236+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'3ad58a13-3eff-4ad5-a212-93d393f62cdb',	'2021-02-15 20:12:13.326+00',	'2021-02-15 20:12:13.326+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'61dc7868-3212-4a16-81f0-8ea01d8094d6',	'2021-02-15 20:12:13.41+00',	'2021-02-15 20:12:13.41+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'809c604a-b0b6-4f60-99c2-a33ecaa98073',	'2021-02-15 20:12:13.493+00',	'2021-02-15 20:12:13.493+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'7c7c6c81-08e0-4d04-9916-fa117d5cdb38',	'2021-02-15 20:12:13.593+00',	'2021-02-15 20:12:13.593+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'aff7b2ec-aaea-4dff-a369-deb34815d517',	'2021-02-15 20:12:13.683+00',	'2021-02-15 20:12:13.683+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'c1ee50ba-e6ea-4724-9bad-530296596663',	'2021-02-15 20:12:13.765+00',	'2021-02-15 20:12:13.765+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'0cbb695e-dc39-4da1-83b8-14b9ce1be9cd',	'2021-02-15 20:12:13.857+00',	'2021-02-15 20:12:13.857+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'1c1e9379-c9bc-49c0-bd37-0041f8dea190',	'2021-02-15 20:12:13.948+00',	'2021-02-15 20:12:13.948+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'de0128f7-ec67-446b-819b-11d7cd24a982',	'2021-02-15 20:12:14.106+00',	'2021-02-15 20:12:14.106+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'170fa887-44fc-4fd7-ac5d-700627c45f1e',	'2021-02-15 20:12:14.205+00',	'2021-02-15 20:12:14.205+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'2736b908-4e5a-4052-b49f-2e6a1a77a173',	'2021-02-15 20:12:14.296+00',	'2021-02-15 20:12:14.296+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'2d6f6a7a-9339-417e-8ce8-68fbec1cbf8f',	'2021-02-15 20:12:14.378+00',	'2021-02-15 20:12:14.378+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'2ed0541a-16c4-4f5b-a50b-c3d870630272',	'2021-02-15 20:12:14.47+00',	'2021-02-15 20:12:14.47+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'a5638b81-d00e-4031-b686-a9af503b10c8',	'2021-02-15 20:12:14.552+00',	'2021-02-15 20:12:14.552+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'02cde971-5521-4d2e-8faa-b9925c3b1469',	'2021-02-15 20:12:14.635+00',	'2021-02-15 20:12:14.635+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'acee1406-8aa2-43e5-ba4b-b1db18746327',	'2021-02-15 20:12:14.726+00',	'2021-02-15 20:12:14.726+00'),
('d0332ce9-13de-4256-b2a6-5312064992cc',	'7d2ab92f-4981-4e5a-8182-1b2bd6bf2315',	'2021-02-15 20:12:14.843+00',	'2021-02-15 20:12:14.843+00'),
('d0332ce9-13de-4256-b2a6-5312064992cc',	'23c890c9-828c-4b34-8f2b-e16b7bce6a00',	'2021-02-15 20:12:14.925+00',	'2021-02-15 20:12:14.925+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'c5c46763-7512-439d-b8b0-c43f23fe6309',	'2021-02-15 20:12:14.999+00',	'2021-02-15 20:12:14.999+00'),
('cba5bf33-eed5-4fde-a3b9-ff90199e5534',	'940d0462-e870-46a0-8e0c-ceceab865799',	'2021-02-15 20:12:15.082+00',	'2021-02-15 20:12:15.082+00');

DROP TABLE IF EXISTS "refresh_token";
CREATE TABLE "public"."refresh_token" (
    "token" text NOT NULL,
    "userId" uuid,
    "expirationDate" timestamptz NOT NULL,
    CONSTRAINT "refresh_token_token" PRIMARY KEY ("token"),
    CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

-- 2021-02-13 21:09:39.56042+00
