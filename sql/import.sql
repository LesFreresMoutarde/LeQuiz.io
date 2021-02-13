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
('4a778da0-85af-44b0-a7d2-c154ee9ed0e1',	'user1',	'user1@lequiz.com',	'password',	NULL,	NULL,	'free',	'member',	'0',	'1',	'0',	NULL,	'2021-02-13 17:28:07.768+00',	'2021-02-13 17:28:07.768+00',	NULL),
('f51d5586-0bc6-4c94-8e42-c91fdbadf5ad',	'user2',	'user2@lequiz.com',	'password',	NULL,	NULL,	'free',	'member',	'0',	'1',	'0',	NULL,	'2021-02-13 17:28:07.804+00',	'2021-02-13 17:28:07.804+00',	NULL),
('5fc3c9ac-d9f5-479a-9a4e-300e8969501c',	'user3',	'user3@lequiz.com',	'password',	NULL,	NULL,	'free',	'member',	'0',	'1',	'0',	NULL,	'2021-02-13 17:28:07.84+00',	'2021-02-13 17:28:07.84+00',	NULL),
('19ca8b69-be42-4a54-8c5d-442900fc8d4f',	'user4',	'user4@lequiz.com',	'password',	NULL,	NULL,	'vip',	'member',	'1',	'1',	'0',	NULL,	'2021-02-13 17:28:07.87+00',	'2021-02-13 17:28:07.87+00',	NULL),
('3eee07eb-62eb-4333-b408-6da537d8a5a6',	'user5',	'user5@lequiz.com',	'password',	NULL,	NULL,	'premium',	'member',	'1',	'1',	'0',	NULL,	'2021-02-13 17:28:07.898+00',	'2021-02-13 17:28:07.898+00',	NULL),
('92f31d89-4c2a-4885-b1fe-2cb564f98091',	'user6',	'user6@lequiz.com',	'password',	NULL,	NULL,	'free',	'member',	'0',	'0',	'0',	NULL,	'2021-02-13 17:28:07.929+00',	'2021-02-13 17:28:07.929+00',	NULL),
('9f81b522-c0da-43c1-9627-9e8feae708e5',	'user7',	'user7@lequiz.com',	'password',	NULL,	NULL,	'free',	'member',	'0',	'0',	'0',	NULL,	'2021-02-13 17:28:07.994+00',	'2021-02-13 17:28:07.994+00',	NULL),
('efb35e57-58f3-4dbb-820c-8d0683d0d9c3',	'user8',	'user8@lequiz.com',	'password',	NULL,	NULL,	'free',	'member',	'0',	'1',	'1',	NULL,	'2021-02-13 17:28:08.022+00',	'2021-02-13 17:28:08.022+00',	NULL),
('eec93110-2fee-4131-b5db-ff6d1827f62a',	'user9',	'user9@lequiz.com',	'password',	NULL,	NULL,	'free',	'member',	'0',	'1',	'1',	NULL,	'2021-02-13 17:28:08.052+00',	'2021-02-13 17:28:08.052+00',	NULL),
('2b2b7d31-bac0-4077-ad03-b37a3f782b81',	'reviewer1',	'reviewer1@lequiz.com',	'password',	NULL,	NULL,	'free',	'reviewer',	'0',	'1',	'0',	NULL,	'2021-02-13 17:28:08.081+00',	'2021-02-13 17:28:08.081+00',	NULL),
('24703556-827d-48d5-be63-30ca061caf35',	'reviewer2',	'reviewer2@lequiz.com',	'password',	NULL,	NULL,	'vip',	'reviewer',	'0',	'1',	'0',	NULL,	'2021-02-13 17:28:08.126+00',	'2021-02-13 17:28:08.126+00',	NULL),
('2c316a89-d47b-45eb-bb12-00dedfe57114',	'admin1',	'admin1@lequiz.com',	'password',	NULL,	NULL,	'vip',	'admin',	'0',	'1',	'0',	NULL,	'2021-02-13 17:28:08.155+00',	'2021-02-13 17:28:08.155+00',	NULL);

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
('8021ef0e-8397-4048-8dce-8d6463445380',	'Histoire',	'2021-02-13 17:27:13.438+00',	'2021-02-13 17:27:13.438+00'),
('8e2aa24d-60b7-4610-ad6a-55a42fa982e4',	'Sport',	'2021-02-13 17:27:13.484+00',	'2021-02-13 17:27:13.484+00'),
('bd6353f5-c1f1-4137-a142-afbf9e7ba316',	'Jeu-Vidéo',	'2021-02-13 17:27:13.512+00',	'2021-02-13 17:27:13.512+00'),
('f0748a06-6db5-42a1-9e50-2c0e960c8f26',	'Cinéma',	'2021-02-13 17:27:13.542+00',	'2021-02-13 17:27:13.542+00'),
('65bed173-550d-4255-a2a8-7706a61796e9',	'Musique',	'2021-02-13 17:27:13.599+00',	'2021-02-13 17:27:13.599+00'),
('d20cbef7-090b-4244-b2b3-f52c1857681f',	'Automobile',	'2021-02-13 17:27:13.628+00',	'2021-02-13 17:27:13.628+00');

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
('4d53ab16-66c7-4ecb-8dc2-e06d43f64222',	NULL,	'Combien fait 1 + 4 ?',	'{"answers": [{"content": "5", "is_good_answer": true}, {"content": "3", "is_good_answer": false}, {"content": "4", "is_good_answer": false}, {"content": "6", "is_good_answer": false}], "additional": {"responseMedia": {"url": "http://example.com/toto.png", "info": "0 + 0 égale ? ..."}}}',	'approved',	'{"url": "http://example.com/calculatrice.png", "type": "image/png"}',	NULL,	'2021-02-13 17:30:26.707+00',	'2021-02-13 17:30:26.707+00'),
('0e0250af-c89c-4980-aadb-2615591062cb',	NULL,	'En quelle année, Mao a-t-il lancé sa révolution culturelle ?',	'{"answers": [{"content": "1814", "is_good_answer": false}, {"content": "1865", "is_good_answer": false}, {"content": "1920", "is_good_answer": false}, {"content": "1966", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:26.832+00',	'2021-02-13 17:30:26.832+00'),
('3f31e40b-9740-44ac-b400-8c0609d1f5c1',	NULL,	'En quelle année les États-Unis ont-ils pris part à la Première Guerre mondiale ?',	'{"answers": [{"content": "1918", "is_good_answer": false}, {"content": "1915", "is_good_answer": false}, {"content": "1917", "is_good_answer": true}, {"content": "1916", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:26.948+00',	'2021-02-13 17:30:26.948+00'),
('6d271058-86e3-4a67-9c27-49a561ec4bba',	NULL,	'Quels Jeux olympiques ont été supprimés à cause de la Seconde Guerre mondiale ?',	'{"answers": [{"content": "1936 et 1940", "is_good_answer": false}, {"content": "1944 et 1948", "is_good_answer": false}, {"content": "1940 et 1944", "is_good_answer": true}, {"content": "1932 et 1936", "is_good_answer": false}], "additional": {"responseMedia": {"url": null, "info": "Les Jeux ont été rénovés par le baron Pierre de Coubertin à la fin du XIXe siècle."}}}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:27.146+00',	'2021-02-13 17:30:27.146+00'),
('c6a4aeb8-634d-4359-928f-02c080098a3e',	NULL,	'Dans les plaines de quel champ de bataille se dresse la Butte du Lion ?',	'{"answers": [{"content": "Verdun", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": true}, {"content": "Austerlitz", "is_good_answer": false}, {"content": "Valmy", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:27.241+00',	'2021-02-13 17:30:27.241+00'),
('bb47bc65-e894-47eb-a247-8c94880ad70f',	NULL,	'Quelle ligne de défense française fut contournée par les Allemands en 1940 ?',	'{"answers": [{"content": "La ligne Siegfried", "is_good_answer": false}, {"content": "La ligne Maginot", "is_good_answer": true}, {"content": "La ligne Verte", "is_good_answer": false}, {"content": "La ligne Daladier", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:27.328+00',	'2021-02-13 17:30:27.328+00'),
('0e348a4e-4549-4de8-a715-6478ce4e5b32',	NULL,	'Le général Cambronne, qui commandait la vieille garde, eut une conduite héroïque à...',	'{"answers": [{"content": "Wagram", "is_good_answer": false}, {"content": "Iena", "is_good_answer": false}, {"content": "Midway", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:27.439+00',	'2021-02-13 17:30:27.439+00'),
('1ab282cc-30a0-496b-aa89-e4072debf50c',	NULL,	'Où a eu lieu le grand procès des criminels de guerre nazis ?',	'{"answers": [{"content": "Berlin", "is_good_answer": false}, {"content": "Nuremberg", "is_good_answer": true}, {"content": "Hambourg", "is_good_answer": false}, {"content": "Munich", "is_good_answer": false}], "additional": {"responseMedia": {"url": null, "info": "Le procès de Nuremberg fut intenté contre 24 responsables du Troisième Reich."}}}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:27.543+00',	'2021-02-13 17:30:27.543+00'),
('24b42473-8367-48f0-a5f3-5c9c216f7d3f',	NULL,	'Qui fut vainqueur de la Guerre de Troie, conflit légendaire de la mythologie grecque ?',	'{"answers": [{"content": "Sophocle", "is_good_answer": false}, {"content": "Ajax", "is_good_answer": false}, {"content": "Ulysse", "is_good_answer": true}, {"content": "Arkantos", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:27.629+00',	'2021-02-13 17:30:27.629+00'),
('45f63867-95f4-45ef-babe-9c9b7c606bb2',	NULL,	'En quelle année la bataille de Waterloo a-t-elle eu lieu, à vingt kilomètres au sud de Bruxelles ?',	'{"answers": [{"content": "1815", "is_good_answer": true}, {"content": "1831", "is_good_answer": false}, {"content": "1809", "is_good_answer": false}, {"content": "1824", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:27.704+00',	'2021-02-13 17:30:27.704+00'),
('de63747a-af73-4820-a620-00d69a34bd45',	NULL,	'Quel basketteur américain a été champion NBA en 1998 pour la sixième fois de sa carrière ?',	'{"answers": [{"content": "Patrick Ewing", "is_good_answer": false}, {"content": "Karl Malone", "is_good_answer": false}, {"content": "Charles Barkley", "is_good_answer": false}, {"content": "Michael Jordan", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:27.808+00',	'2021-02-13 17:30:27.808+00'),
('a97e0795-c843-4bda-8520-23bb2a35cbd3',	NULL,	'Dans quelle pays est né le joueur de basket-ball professionnel Tony Parker ?',	'{"answers": [{"content": "Belgique", "is_good_answer": true}, {"content": "USA", "is_good_answer": false}, {"content": "France", "is_good_answer": false}, {"content": "Pologne", "is_good_answer": false}], "additional": {"responseMedia": {"url": null, "info": "Il évoluait dans l''équipe des Spurs de San Antonio depuis son arrivée dans la NBA en 2001."}}}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:27.894+00',	'2021-02-13 17:30:27.894+00'),
('e5ade7ff-e4b1-475e-8e21-e2f6932a69fc',	NULL,	'Qui a été élu joueur de la décennie 2000 suite à un sondage du site officiel NBA ?',	'{"answers": [{"content": "Derek Fisher", "is_good_answer": false}, {"content": "Ron Harper", "is_good_answer": false}, {"content": "Kobe Bryant", "is_good_answer": true}, {"content": "Rick Fox", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:27.99+00',	'2021-02-13 17:30:27.99+00'),
('e3e6d76d-9338-4abf-9b83-c6ac20e0862d',	NULL,	'Quel concours de dunks est organisé par la NBA durant le NBA All-Star Week-end ?',	'{"answers": [{"content": "Skills Challenge", "is_good_answer": false}, {"content": "Slam Dunk Contest", "is_good_answer": true}, {"content": "Three-point Shootout", "is_good_answer": false}, {"content": "All-Star Game", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:28.092+00',	'2021-02-13 17:30:28.092+00'),
('b286033e-5d08-4a60-91c2-481abae8b9b0',	NULL,	'Quel basketteur américain a réalisé en 2000 un 360 degrés inversé mythique ?',	'{"answers": [{"content": "Jarnell Stokes", "is_good_answer": false}, {"content": "Vince Carter", "is_good_answer": true}, {"content": "Marc Gasol", "is_good_answer": false}, {"content": "Andrew Harrison", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:28.189+00',	'2021-02-13 17:30:28.189+00'),
('8c7bd3cd-4050-48d2-9b47-6c93774e0a8a',	NULL,	'Quel joueur de NBA se définit lui-même comme un « viking africain » ?',	'{"answers": [{"content": "Derrick Rose", "is_good_answer": false}, {"content": "Pau Gasol", "is_good_answer": false}, {"content": "Aaron Brooks", "is_good_answer": false}, {"content": "Joakim Noah", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:28.268+00',	'2021-02-13 17:30:28.268+00'),
('8500265a-a692-4bf8-85c2-567d8deca8e1',	NULL,	'Quel événement annuel majeur de la NBA est comparable à une bourse de joueurs ?',	'{"answers": [{"content": "La franchise", "is_good_answer": false}, {"content": "Les playoffs", "is_good_answer": false}, {"content": "Le ballotage", "is_good_answer": false}, {"content": "La draft", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:28.363+00',	'2021-02-13 17:30:28.363+00'),
('07662139-cb4f-41c8-98d8-1fde4dd3671d',	NULL,	'Combien de titres de champion NBA Michael Jordan a-t-il obtenu ?',	'{"answers": [{"content": "Cinq", "is_good_answer": false}, {"content": "Sept", "is_good_answer": false}, {"content": "Six", "is_good_answer": true}, {"content": "Quatre", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:28.457+00',	'2021-02-13 17:30:28.457+00'),
('e1c3d9b5-c2cd-450b-9faa-3b1a7247e723',	NULL,	'Qui est le premier joueur français à avoir été sacré champion NBA ?',	'{"answers": [{"content": "Joe Dumars", "is_good_answer": false}, {"content": "Paul Pierce", "is_good_answer": false}, {"content": "Tony Parker", "is_good_answer": true}, {"content": "Tim Duncan", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:28.553+00',	'2021-02-13 17:30:28.553+00'),
('531b72cb-f20f-4d9f-81a2-efed9ff30756',	NULL,	'Qui a été élu deux fois meilleur joueur de la NBA, en 2005 et 2006 ?',	'{"answers": [{"content": "Jeff Brown", "is_good_answer": false}, {"content": "Dana Jones", "is_good_answer": false}, {"content": "Marlon Garnett", "is_good_answer": false}, {"content": "Steve Nash", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:28.632+00',	'2021-02-13 17:30:28.632+00'),
('890fb99f-30c7-4a32-9bba-be9735c83e3c',	NULL,	'Quel gagnant de la « Nouvelle Star », diffusée sur M6, est surnommé « La Tortue » ?',	'{"answers": [{"content": "Christophe Willem", "is_good_answer": true}, {"content": "Julien Doré", "is_good_answer": false}, {"content": "Jonatan Cerrada", "is_good_answer": false}, {"content": "Steeve Estatof", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:28.719+00',	'2021-02-13 17:30:28.719+00'),
('c2784ef8-5e86-4ce4-897f-705baff0c42b',	NULL,	'En 1991, quel tube Yannick Noah a-t-il associé à la victoire de la France en coupe Davis ?',	'{"answers": [{"content": "Vagabond", "is_good_answer": false}, {"content": "Les Lionnes", "is_good_answer": false}, {"content": "Saga Africa", "is_good_answer": true}, {"content": "Ose", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:28.821+00',	'2021-02-13 17:30:28.821+00'),
('387bcd29-80fb-47f0-9d81-d4c930e43fcd',	NULL,	'Quel chanteur prénommé Mathieu a émergé du succès remporté par les Linkup ?',	'{"answers": [{"content": "Corneille", "is_good_answer": false}, {"content": "Keen''V", "is_good_answer": false}, {"content": "Raphaël", "is_good_answer": false}, {"content": "M. Pokora", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:28.918+00',	'2021-02-13 17:30:28.918+00'),
('a72e7782-5fa8-4da9-8b67-ccafa39034e8',	NULL,	'Quel Américano-Libanais est entré dans les charts avec « Life in Cartoon Motion » ?',	'{"answers": [{"content": "Mika", "is_good_answer": true}, {"content": "Iwan", "is_good_answer": false}, {"content": "Rida", "is_good_answer": false}, {"content": "K. Maro", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:29.175+00',	'2021-02-13 17:30:29.175+00'),
('b714b019-7fcb-4123-ab13-c502abe10340',	NULL,	'Sous quel nom le rappeur et homme d''affaires américain Curtis Jackson fait-il carrière ?',	'{"answers": [{"content": "50 cent", "is_good_answer": true}, {"content": "Fat Joe", "is_good_answer": false}, {"content": "Big Sean", "is_good_answer": false}, {"content": "Mike D", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:29.34+00',	'2021-02-13 17:30:29.34+00'),
('670ede57-4bad-42e9-bbc6-0147b2181688',	NULL,	'Avec quel chanteur le top model Heidi Klum a-t-elle été mariée durant sept ans ?',	'{"answers": [{"content": "Seal", "is_good_answer": true}, {"content": "Paul McCartney", "is_good_answer": false}, {"content": "Sean Paul", "is_good_answer": false}, {"content": "Robbie Williams", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:29.45+00',	'2021-02-13 17:30:29.45+00'),
('86cdecfa-4c37-4f18-a3c6-c929f3216d70',	NULL,	'Quel DJ a repris un titre des années 80 pour faire un tube avec « Living On Video » ?',	'{"answers": [{"content": "Pakito", "is_good_answer": true}, {"content": "Vitalic", "is_good_answer": false}, {"content": "Madeon", "is_good_answer": false}, {"content": "Brodinski", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:29.547+00',	'2021-02-13 17:30:29.547+00'),
('9cfd5ab7-a08d-4c6e-9f70-89930a9bc2d3',	NULL,	'Quel chanteur a sorti « Musicology » puis « 3121 » deux ans plus tard ?',	'{"answers": [{"content": "Bob James", "is_good_answer": false}, {"content": "Al Jarreau", "is_good_answer": false}, {"content": "Prince", "is_good_answer": true}, {"content": "James Brown", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:29.634+00',	'2021-02-13 17:30:29.634+00'),
('c2a2ff44-ff03-4bf0-9d6e-c1ec4acd0812',	NULL,	'Dans quel pays se situe le circuit de course automobile du Mans ?',	'{"answers": [{"content": "Pays-Bas", "is_good_answer": false}, {"content": "Suisse", "is_good_answer": false}, {"content": "Belgique", "is_good_answer": false}, {"content": "France", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:29.721+00',	'2021-02-13 17:30:29.721+00'),
('85da1d6d-6c68-4f13-8405-566ba3481704',	NULL,	'À quel modèle de voiture ressemble le vieux tacot jaune que conduit Gaston Lagaffe ?',	'{"answers": [{"content": "Rolls-Royce", "is_good_answer": false}, {"content": "Citroën B10", "is_good_answer": false}, {"content": "Fiat 509", "is_good_answer": true}, {"content": "Jeep", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:29.823+00',	'2021-02-13 17:30:29.823+00'),
('1e81d112-7a6a-4a73-9e85-9e339dea45c2',	NULL,	'Quel sport automobile consiste à accélérer le plus rapidement possible avec son véhicule ?',	'{"answers": [{"content": "Le trial", "is_good_answer": false}, {"content": "Le Drift", "is_good_answer": false}, {"content": "Le Monster truck", "is_good_answer": false}, {"content": "Le Dragster", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:29.911+00',	'2021-02-13 17:30:29.911+00'),
('0eb42a50-e803-426c-bc09-cc3da6ea9368',	NULL,	'Comment s''appelle le véhicule du personnage de bande dessinée Batman ?',	'{"answers": [{"content": "La BatDrive", "is_good_answer": false}, {"content": "La Batauto", "is_good_answer": false}, {"content": "La Batcar", "is_good_answer": false}, {"content": "La Batmobile", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:29.99+00',	'2021-02-13 17:30:29.99+00'),
('558a1c75-0462-4627-968f-b0c114f85907',	NULL,	'De quand date le Duster, véhicule utilitaire sport vendu par la marque roumaine Dacia ?',	'{"answers": [{"content": "2006", "is_good_answer": false}, {"content": "2008", "is_good_answer": false}, {"content": "2010", "is_good_answer": true}, {"content": "2012", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:30.085+00',	'2021-02-13 17:30:30.085+00'),
('41ebb14c-e60e-4f11-963b-dc7c4d461626',	NULL,	'En France, refuser une priorité peut vous coûter combien de points sur le permis ?',	'{"answers": [{"content": "6 points", "is_good_answer": false}, {"content": "8 points", "is_good_answer": false}, {"content": "4 points", "is_good_answer": true}, {"content": "2 points", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:30.187+00',	'2021-02-13 17:30:30.187+00'),
('bbbc0fbb-e47a-4411-a9b0-1d2aca80a7b6',	NULL,	'Quelle principauté accueille l''un des plus prestigieux Grand Prix de Formule 1 ?',	'{"answers": [{"content": "Liechtenstein", "is_good_answer": false}, {"content": "Andorre", "is_good_answer": false}, {"content": "Mantoue", "is_good_answer": false}, {"content": "Monaco", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:30.276+00',	'2021-02-13 17:30:30.276+00'),
('9b8ad0db-4d34-40c4-9cff-dd28c1107bc2',	NULL,	'Dans le monde automobile, quel sigle correspond au Grand Tourisme Injection ?',	'{"answers": [{"content": "Sport", "is_good_answer": false}, {"content": "Gti", "is_good_answer": true}, {"content": "TT", "is_good_answer": false}, {"content": "Turbo", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:30.363+00',	'2021-02-13 17:30:30.363+00'),
('0bac79c6-00c4-488b-bc85-cbd2905d2a61',	NULL,	'Quelle société appartenant au groupe Belron « répare et remplace » votre pare-brise ?',	'{"answers": [{"content": "Carglass", "is_good_answer": true}, {"content": "Midas", "is_good_answer": false}, {"content": "Speedy", "is_good_answer": false}, {"content": "Norauto", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:30.46+00',	'2021-02-13 17:30:30.46+00'),
('a9a66984-49ef-4ff2-bb5a-c8fe1b7819a2',	NULL,	'Quel est le style musical de l''album de Rohff, « La fierté des années » ?',	'{"answers": [{"content": "La Techno", "is_good_answer": false}, {"content": "Le tango", "is_good_answer": false}, {"content": "Le disco", "is_good_answer": false}, {"content": "Le rap", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:29.006+00',	'2021-02-13 17:30:29.006+00'),
('006c0305-0c1b-4664-93a7-614168093bc5',	NULL,	'Qui a chanté au pied de …onnes le 10 juin 2000 ?',	'{"answers": [{"content": "Eddy Mitchell", "is_good_answer": false}, {"content": "Patrick Bruel", "is_good_answer": false}, {"content": "Christophe Maé", "is_good_answer": false}, {"content": "Johnny Hallyday", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:29.253+00',	'2021-02-13 17:30:29.253+00'),
('79fe7350-1918-4649-a15b-96623ff63181',	NULL,	'Sur quelle plateforme le jeu Tekken est sorti en premier ?',	'{"answers": [{"content": "La borne d''arcade", "is_good_answer": true}, {"content": "NES", "is_good_answer": false}, {"content": "Playstation", "is_good_answer": false}, {"content": "Gamecube", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:30.941+00',	'2021-02-13 17:30:30.941+00'),
('d27e5327-b66e-41d2-ae31-efe8ab12d4ee',	NULL,	'Quelle firme automobile, filiale française de FIAT, a ensuite intégré le groupe Chrysler ?',	'{"answers": [{"content": "Simca", "is_good_answer": true}, {"content": "Hommell", "is_good_answer": false}, {"content": "Packard", "is_good_answer": false}, {"content": "Triumph", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:30.568+00',	'2021-02-13 17:30:30.568+00'),
('c091fee6-4fdc-4358-94e6-ce9e83439a32',	NULL,	'Dans quel jeu peux on voir des Chocobos ?',	'{"answers": [{"content": "Breath of fire", "is_good_answer": false}, {"content": "Final Fantasy", "is_good_answer": true}, {"content": "Secret of Mana", "is_good_answer": false}, {"content": "Golden stun", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:30.665+00',	'2021-02-13 17:30:30.665+00'),
('f5fc4cc9-4cce-4aab-95fd-66865d3ada7c',	NULL,	'Salamèche évolue en ',	'{"answers": [{"content": "Dracaufeu", "is_good_answer": false}, {"content": "Reptincel", "is_good_answer": true}, {"content": "Magna", "is_good_answer": false}, {"content": "Ptera", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:30.751+00',	'2021-02-13 17:30:30.751+00'),
('7b98b4a7-ec71-48c3-8d72-ea5ba97172d4',	NULL,	'Zelda est un jeu du genre',	'{"answers": [{"content": "Aventure", "is_good_answer": true}, {"content": "RPG", "is_good_answer": false}, {"content": "Course", "is_good_answer": false}, {"content": "Simulation", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:30.847+00',	'2021-02-13 17:30:30.847+00'),
('ac4cd85e-ae51-41d6-8c2a-27b007294821',	NULL,	'Dans quel jeu le personnage de Mario a-t-il été développé en premier ?',	'{"answers": [{"content": "Super Mario", "is_good_answer": false}, {"content": "Super Mario Bros", "is_good_answer": false}, {"content": "Donkey Kong", "is_good_answer": true}, {"content": "Mario Party", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:31.037+00',	'2021-02-13 17:30:31.037+00'),
('24a1eadf-baeb-413d-856c-aaeca00cc7bd',	NULL,	'La série Fallout est la suite « spirituelle » de quel jeu ?',	'{"answers": [{"content": "Wasteland", "is_good_answer": true}, {"content": "Homeland", "is_good_answer": false}, {"content": "Falland", "is_good_answer": false}, {"content": "Skyrim", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:31.116+00',	'2021-02-13 17:30:31.116+00'),
('225d94d9-8066-408d-90b0-954a9709075e',	NULL,	'Que signifie le nom de la serie GTA ?',	'{"answers": [{"content": "Burnout", "is_good_answer": false}, {"content": "Conduite dangeureuse", "is_good_answer": false}, {"content": "Vol de voiture", "is_good_answer": true}, {"content": "Voiture customisé", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:31.211+00',	'2021-02-13 17:30:31.211+00'),
('5e1836f0-28c9-474e-ab89-4fd5990f55ec',	NULL,	'Le jeu Counter Strike dérive de quel autre jeu ?',	'{"answers": [{"content": "Half Life", "is_good_answer": true}, {"content": "Splinter Cell", "is_good_answer": false}, {"content": "Doom", "is_good_answer": false}, {"content": "Call of Duty", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:31.306+00',	'2021-02-13 17:30:31.306+00'),
('e6615297-21b5-43df-a87c-39f67923bea5',	NULL,	'Dans Pac man qu''est ce qui hante le labyrinthe ?',	'{"answers": [{"content": "Des plantes carnivores", "is_good_answer": false}, {"content": "Des fantômes", "is_good_answer": true}, {"content": "Des squelettes", "is_good_answer": false}, {"content": "Des zombies", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:31.377+00',	'2021-02-13 17:30:31.377+00'),
('7763994c-a722-4baf-b8a0-dccdaa02490d',	NULL,	'Dans la légende de Zelda, comment s''appelle le héros ?',	'{"answers": [{"content": "Zelda", "is_good_answer": false}, {"content": "Bruno", "is_good_answer": false}, {"content": "Ganondorf", "is_good_answer": false}, {"content": "Link", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-13 17:30:31.484+00',	'2021-02-13 17:30:31.484+00'),
('b083349e-2182-4656-9b04-f63714f16550',	NULL,	'Qui est le compagnon de Batman ?',	'{"answers": [{"content": "Robin", "is_good_answer": true}]}',	'pending',	'{}',	NULL,	'2021-02-13 17:30:31.587+00',	'2021-02-13 17:30:31.587+00'),
('8ff79bdf-08c6-428a-adbe-324baccf7dbe',	NULL,	'Quel super héros ne se sépare jamais de son marteau forgé par les nains ',	'{"answers": [{"content": "Thor", "is_good_answer": true}]}',	'pending',	'{}',	NULL,	'2021-02-13 17:30:31.683+00',	'2021-02-13 17:30:31.683+00'),
('deb03835-4c7a-44cc-9870-b313336d2ab0',	NULL,	'Quel super-héros à la force surhumaine ressemble à un être de pierre ?',	'{"answers": [{"content": "Hawkman", "is_good_answer": false}, {"content": "Plastic Man", "is_good_answer": false}, {"content": "Superboy", "is_good_answer": false}, {"content": "La Chose", "is_good_answer": true}]}',	'disapproved',	'{}',	NULL,	'2021-02-13 17:30:31.777+00',	'2021-02-13 17:30:31.777+00'),
('04e4389d-22f1-4792-9f2f-5547a8c1175c',	NULL,	'Quel super-héros porte un costume inspiré du drapeau américain ?',	'{"answers": [{"content": "Tigra", "is_good_answer": false}, {"content": "Iron Man", "is_good_answer": false}, {"content": "Blade", "is_good_answer": false}, {"content": "Captain America", "is_good_answer": true}]}',	'disapproved',	'{}',	NULL,	'2021-02-13 17:30:31.865+00',	'2021-02-13 17:30:31.865+00');

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
('8021ef0e-8397-4048-8dce-8d6463445380',	'4d53ab16-66c7-4ecb-8dc2-e06d43f64222',	'2021-02-13 17:30:26.752+00',	'2021-02-13 17:30:26.752+00'),
('8021ef0e-8397-4048-8dce-8d6463445380',	'0e0250af-c89c-4980-aadb-2615591062cb',	'2021-02-13 17:30:26.866+00',	'2021-02-13 17:30:26.866+00'),
('8021ef0e-8397-4048-8dce-8d6463445380',	'3f31e40b-9740-44ac-b400-8c0609d1f5c1',	'2021-02-13 17:30:27.086+00',	'2021-02-13 17:30:27.086+00'),
('8021ef0e-8397-4048-8dce-8d6463445380',	'6d271058-86e3-4a67-9c27-49a561ec4bba',	'2021-02-13 17:30:27.182+00',	'2021-02-13 17:30:27.182+00'),
('8021ef0e-8397-4048-8dce-8d6463445380',	'c6a4aeb8-634d-4359-928f-02c080098a3e',	'2021-02-13 17:30:27.269+00',	'2021-02-13 17:30:27.269+00'),
('8021ef0e-8397-4048-8dce-8d6463445380',	'bb47bc65-e894-47eb-a247-8c94880ad70f',	'2021-02-13 17:30:27.364+00',	'2021-02-13 17:30:27.364+00'),
('8021ef0e-8397-4048-8dce-8d6463445380',	'0e348a4e-4549-4de8-a715-6478ce4e5b32',	'2021-02-13 17:30:27.468+00',	'2021-02-13 17:30:27.468+00'),
('8021ef0e-8397-4048-8dce-8d6463445380',	'1ab282cc-30a0-496b-aa89-e4072debf50c',	'2021-02-13 17:30:27.571+00',	'2021-02-13 17:30:27.571+00'),
('8021ef0e-8397-4048-8dce-8d6463445380',	'45f63867-95f4-45ef-babe-9c9b7c606bb2',	'2021-02-13 17:30:27.733+00',	'2021-02-13 17:30:27.733+00'),
('8e2aa24d-60b7-4610-ad6a-55a42fa982e4',	'de63747a-af73-4820-a620-00d69a34bd45',	'2021-02-13 17:30:27.835+00',	'2021-02-13 17:30:27.835+00'),
('8e2aa24d-60b7-4610-ad6a-55a42fa982e4',	'a97e0795-c843-4bda-8520-23bb2a35cbd3',	'2021-02-13 17:30:27.94+00',	'2021-02-13 17:30:27.94+00'),
('8e2aa24d-60b7-4610-ad6a-55a42fa982e4',	'e5ade7ff-e4b1-475e-8e21-e2f6932a69fc',	'2021-02-13 17:30:28.018+00',	'2021-02-13 17:30:28.018+00'),
('8e2aa24d-60b7-4610-ad6a-55a42fa982e4',	'e3e6d76d-9338-4abf-9b83-c6ac20e0862d',	'2021-02-13 17:30:28.113+00',	'2021-02-13 17:30:28.113+00'),
('8e2aa24d-60b7-4610-ad6a-55a42fa982e4',	'b286033e-5d08-4a60-91c2-481abae8b9b0',	'2021-02-13 17:30:28.216+00',	'2021-02-13 17:30:28.216+00'),
('8e2aa24d-60b7-4610-ad6a-55a42fa982e4',	'8c7bd3cd-4050-48d2-9b47-6c93774e0a8a',	'2021-02-13 17:30:28.312+00',	'2021-02-13 17:30:28.312+00'),
('8e2aa24d-60b7-4610-ad6a-55a42fa982e4',	'8500265a-a692-4bf8-85c2-567d8deca8e1',	'2021-02-13 17:30:28.39+00',	'2021-02-13 17:30:28.39+00'),
('8e2aa24d-60b7-4610-ad6a-55a42fa982e4',	'07662139-cb4f-41c8-98d8-1fde4dd3671d',	'2021-02-13 17:30:28.478+00',	'2021-02-13 17:30:28.478+00'),
('8e2aa24d-60b7-4610-ad6a-55a42fa982e4',	'e1c3d9b5-c2cd-450b-9faa-3b1a7247e723',	'2021-02-13 17:30:28.58+00',	'2021-02-13 17:30:28.58+00'),
('8e2aa24d-60b7-4610-ad6a-55a42fa982e4',	'531b72cb-f20f-4d9f-81a2-efed9ff30756',	'2021-02-13 17:30:28.668+00',	'2021-02-13 17:30:28.668+00'),
('65bed173-550d-4255-a2a8-7706a61796e9',	'890fb99f-30c7-4a32-9bba-be9735c83e3c',	'2021-02-13 17:30:28.755+00',	'2021-02-13 17:30:28.755+00'),
('65bed173-550d-4255-a2a8-7706a61796e9',	'c2784ef8-5e86-4ce4-897f-705baff0c42b',	'2021-02-13 17:30:28.841+00',	'2021-02-13 17:30:28.841+00'),
('65bed173-550d-4255-a2a8-7706a61796e9',	'387bcd29-80fb-47f0-9d81-d4c930e43fcd',	'2021-02-13 17:30:28.944+00',	'2021-02-13 17:30:28.944+00'),
('65bed173-550d-4255-a2a8-7706a61796e9',	'a9a66984-49ef-4ff2-bb5a-c8fe1b7819a2',	'2021-02-13 17:30:29.082+00',	'2021-02-13 17:30:29.082+00'),
('65bed173-550d-4255-a2a8-7706a61796e9',	'a72e7782-5fa8-4da9-8b67-ccafa39034e8',	'2021-02-13 17:30:29.201+00',	'2021-02-13 17:30:29.201+00'),
('65bed173-550d-4255-a2a8-7706a61796e9',	'006c0305-0c1b-4664-93a7-614168093bc5',	'2021-02-13 17:30:29.292+00',	'2021-02-13 17:30:29.292+00'),
('65bed173-550d-4255-a2a8-7706a61796e9',	'b714b019-7fcb-4123-ab13-c502abe10340',	'2021-02-13 17:30:29.376+00',	'2021-02-13 17:30:29.376+00'),
('65bed173-550d-4255-a2a8-7706a61796e9',	'670ede57-4bad-42e9-bbc6-0147b2181688',	'2021-02-13 17:30:29.471+00',	'2021-02-13 17:30:29.471+00'),
('65bed173-550d-4255-a2a8-7706a61796e9',	'86cdecfa-4c37-4f18-a3c6-c929f3216d70',	'2021-02-13 17:30:29.573+00',	'2021-02-13 17:30:29.573+00'),
('65bed173-550d-4255-a2a8-7706a61796e9',	'9cfd5ab7-a08d-4c6e-9f70-89930a9bc2d3',	'2021-02-13 17:30:29.672+00',	'2021-02-13 17:30:29.672+00'),
('d20cbef7-090b-4244-b2b3-f52c1857681f',	'c2a2ff44-ff03-4bf0-9d6e-c1ec4acd0812',	'2021-02-13 17:30:29.748+00',	'2021-02-13 17:30:29.748+00'),
('d20cbef7-090b-4244-b2b3-f52c1857681f',	'85da1d6d-6c68-4f13-8405-566ba3481704',	'2021-02-13 17:30:29.844+00',	'2021-02-13 17:30:29.844+00'),
('d20cbef7-090b-4244-b2b3-f52c1857681f',	'1e81d112-7a6a-4a73-9e85-9e339dea45c2',	'2021-02-13 17:30:29.938+00',	'2021-02-13 17:30:29.938+00'),
('d20cbef7-090b-4244-b2b3-f52c1857681f',	'0eb42a50-e803-426c-bc09-cc3da6ea9368',	'2021-02-13 17:30:30.026+00',	'2021-02-13 17:30:30.026+00'),
('d20cbef7-090b-4244-b2b3-f52c1857681f',	'558a1c75-0462-4627-968f-b0c114f85907',	'2021-02-13 17:30:30.113+00',	'2021-02-13 17:30:30.113+00'),
('d20cbef7-090b-4244-b2b3-f52c1857681f',	'41ebb14c-e60e-4f11-963b-dc7c4d461626',	'2021-02-13 17:30:30.207+00',	'2021-02-13 17:30:30.207+00'),
('d20cbef7-090b-4244-b2b3-f52c1857681f',	'bbbc0fbb-e47a-4411-a9b0-1d2aca80a7b6',	'2021-02-13 17:30:30.302+00',	'2021-02-13 17:30:30.302+00'),
('d20cbef7-090b-4244-b2b3-f52c1857681f',	'9b8ad0db-4d34-40c4-9cff-dd28c1107bc2',	'2021-02-13 17:30:30.407+00',	'2021-02-13 17:30:30.407+00'),
('d20cbef7-090b-4244-b2b3-f52c1857681f',	'0bac79c6-00c4-488b-bc85-cbd2905d2a61',	'2021-02-13 17:30:30.494+00',	'2021-02-13 17:30:30.494+00'),
('d20cbef7-090b-4244-b2b3-f52c1857681f',	'd27e5327-b66e-41d2-ae31-efe8ab12d4ee',	'2021-02-13 17:30:30.588+00',	'2021-02-13 17:30:30.588+00'),
('bd6353f5-c1f1-4137-a142-afbf9e7ba316',	'c091fee6-4fdc-4358-94e6-ce9e83439a32',	'2021-02-13 17:30:30.692+00',	'2021-02-13 17:30:30.692+00'),
('bd6353f5-c1f1-4137-a142-afbf9e7ba316',	'f5fc4cc9-4cce-4aab-95fd-66865d3ada7c',	'2021-02-13 17:30:30.789+00',	'2021-02-13 17:30:30.789+00'),
('bd6353f5-c1f1-4137-a142-afbf9e7ba316',	'7b98b4a7-ec71-48c3-8d72-ea5ba97172d4',	'2021-02-13 17:30:30.874+00',	'2021-02-13 17:30:30.874+00'),
('bd6353f5-c1f1-4137-a142-afbf9e7ba316',	'79fe7350-1918-4649-a15b-96623ff63181',	'2021-02-13 17:30:30.962+00',	'2021-02-13 17:30:30.962+00'),
('bd6353f5-c1f1-4137-a142-afbf9e7ba316',	'ac4cd85e-ae51-41d6-8c2a-27b007294821',	'2021-02-13 17:30:31.064+00',	'2021-02-13 17:30:31.064+00'),
('bd6353f5-c1f1-4137-a142-afbf9e7ba316',	'24a1eadf-baeb-413d-856c-aaeca00cc7bd',	'2021-02-13 17:30:31.154+00',	'2021-02-13 17:30:31.154+00'),
('bd6353f5-c1f1-4137-a142-afbf9e7ba316',	'225d94d9-8066-408d-90b0-954a9709075e',	'2021-02-13 17:30:31.239+00',	'2021-02-13 17:30:31.239+00'),
('bd6353f5-c1f1-4137-a142-afbf9e7ba316',	'5e1836f0-28c9-474e-ab89-4fd5990f55ec',	'2021-02-13 17:30:31.325+00',	'2021-02-13 17:30:31.325+00'),
('bd6353f5-c1f1-4137-a142-afbf9e7ba316',	'e6615297-21b5-43df-a87c-39f67923bea5',	'2021-02-13 17:30:31.433+00',	'2021-02-13 17:30:31.433+00'),
('bd6353f5-c1f1-4137-a142-afbf9e7ba316',	'7763994c-a722-4baf-b8a0-dccdaa02490d',	'2021-02-13 17:30:31.519+00',	'2021-02-13 17:30:31.519+00'),
('f0748a06-6db5-42a1-9e50-2c0e960c8f26',	'b083349e-2182-4656-9b04-f63714f16550',	'2021-02-13 17:30:31.607+00',	'2021-02-13 17:30:31.607+00'),
('f0748a06-6db5-42a1-9e50-2c0e960c8f26',	'8ff79bdf-08c6-428a-adbe-324baccf7dbe',	'2021-02-13 17:30:31.717+00',	'2021-02-13 17:30:31.717+00'),
('f0748a06-6db5-42a1-9e50-2c0e960c8f26',	'deb03835-4c7a-44cc-9870-b313336d2ab0',	'2021-02-13 17:30:31.814+00',	'2021-02-13 17:30:31.814+00'),
('f0748a06-6db5-42a1-9e50-2c0e960c8f26',	'04e4389d-22f1-4792-9f2f-5547a8c1175c',	'2021-02-13 17:30:31.899+00',	'2021-02-13 17:30:31.899+00');

DROP TABLE IF EXISTS "question_type";
CREATE TABLE "public"."question_type" (
    "id" uuid NOT NULL,
    "name" character varying(50) NOT NULL,
    "label" character varying(80) NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "question_type_label_key" UNIQUE ("label"),
    CONSTRAINT "question_type_name_key" UNIQUE ("name"),
    CONSTRAINT "question_type_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "question_type" ("id", "name", "label", "createdAt", "updatedAt") VALUES
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'qcm',	'QCM',	'2021-02-13 17:28:07.669+00',	'2021-02-13 17:28:07.669+00'),
('c722bad1-554b-4534-a8fe-c48893116e97',	'input',	'Réponse libre',	'2021-02-13 17:28:07.738+00',	'2021-02-13 17:28:07.738+00');

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
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'4d53ab16-66c7-4ecb-8dc2-e06d43f64222',	'2021-02-13 17:30:26.749+00',	'2021-02-13 17:30:26.749+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'0e0250af-c89c-4980-aadb-2615591062cb',	'2021-02-13 17:30:26.867+00',	'2021-02-13 17:30:26.867+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'3f31e40b-9740-44ac-b400-8c0609d1f5c1',	'2021-02-13 17:30:27.085+00',	'2021-02-13 17:30:27.085+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'6d271058-86e3-4a67-9c27-49a561ec4bba',	'2021-02-13 17:30:27.18+00',	'2021-02-13 17:30:27.18+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'c6a4aeb8-634d-4359-928f-02c080098a3e',	'2021-02-13 17:30:27.268+00',	'2021-02-13 17:30:27.268+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'bb47bc65-e894-47eb-a247-8c94880ad70f',	'2021-02-13 17:30:27.363+00',	'2021-02-13 17:30:27.363+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'0e348a4e-4549-4de8-a715-6478ce4e5b32',	'2021-02-13 17:30:27.467+00',	'2021-02-13 17:30:27.467+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'1ab282cc-30a0-496b-aa89-e4072debf50c',	'2021-02-13 17:30:27.57+00',	'2021-02-13 17:30:27.57+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'24b42473-8367-48f0-a5f3-5c9c216f7d3f',	'2021-02-13 17:30:27.673+00',	'2021-02-13 17:30:27.673+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'45f63867-95f4-45ef-babe-9c9b7c606bb2',	'2021-02-13 17:30:27.732+00',	'2021-02-13 17:30:27.732+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'de63747a-af73-4820-a620-00d69a34bd45',	'2021-02-13 17:30:27.834+00',	'2021-02-13 17:30:27.834+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'a97e0795-c843-4bda-8520-23bb2a35cbd3',	'2021-02-13 17:30:27.939+00',	'2021-02-13 17:30:27.939+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'e5ade7ff-e4b1-475e-8e21-e2f6932a69fc',	'2021-02-13 17:30:28.017+00',	'2021-02-13 17:30:28.017+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'e3e6d76d-9338-4abf-9b83-c6ac20e0862d',	'2021-02-13 17:30:28.114+00',	'2021-02-13 17:30:28.114+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'b286033e-5d08-4a60-91c2-481abae8b9b0',	'2021-02-13 17:30:28.217+00',	'2021-02-13 17:30:28.217+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'8c7bd3cd-4050-48d2-9b47-6c93774e0a8a',	'2021-02-13 17:30:28.311+00',	'2021-02-13 17:30:28.311+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'8500265a-a692-4bf8-85c2-567d8deca8e1',	'2021-02-13 17:30:28.391+00',	'2021-02-13 17:30:28.391+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'07662139-cb4f-41c8-98d8-1fde4dd3671d',	'2021-02-13 17:30:28.477+00',	'2021-02-13 17:30:28.477+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'e1c3d9b5-c2cd-450b-9faa-3b1a7247e723',	'2021-02-13 17:30:28.579+00',	'2021-02-13 17:30:28.579+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'531b72cb-f20f-4d9f-81a2-efed9ff30756',	'2021-02-13 17:30:28.667+00',	'2021-02-13 17:30:28.667+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'890fb99f-30c7-4a32-9bba-be9735c83e3c',	'2021-02-13 17:30:28.754+00',	'2021-02-13 17:30:28.754+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'c2784ef8-5e86-4ce4-897f-705baff0c42b',	'2021-02-13 17:30:28.842+00',	'2021-02-13 17:30:28.842+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'387bcd29-80fb-47f0-9d81-d4c930e43fcd',	'2021-02-13 17:30:28.945+00',	'2021-02-13 17:30:28.945+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'a9a66984-49ef-4ff2-bb5a-c8fe1b7819a2',	'2021-02-13 17:30:29.083+00',	'2021-02-13 17:30:29.083+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'a72e7782-5fa8-4da9-8b67-ccafa39034e8',	'2021-02-13 17:30:29.201+00',	'2021-02-13 17:30:29.201+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'006c0305-0c1b-4664-93a7-614168093bc5',	'2021-02-13 17:30:29.289+00',	'2021-02-13 17:30:29.289+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'b714b019-7fcb-4123-ab13-c502abe10340',	'2021-02-13 17:30:29.375+00',	'2021-02-13 17:30:29.375+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'670ede57-4bad-42e9-bbc6-0147b2181688',	'2021-02-13 17:30:29.472+00',	'2021-02-13 17:30:29.472+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'86cdecfa-4c37-4f18-a3c6-c929f3216d70',	'2021-02-13 17:30:29.574+00',	'2021-02-13 17:30:29.574+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'9cfd5ab7-a08d-4c6e-9f70-89930a9bc2d3',	'2021-02-13 17:30:29.67+00',	'2021-02-13 17:30:29.67+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'c2a2ff44-ff03-4bf0-9d6e-c1ec4acd0812',	'2021-02-13 17:30:29.749+00',	'2021-02-13 17:30:29.749+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'85da1d6d-6c68-4f13-8405-566ba3481704',	'2021-02-13 17:30:29.843+00',	'2021-02-13 17:30:29.843+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'1e81d112-7a6a-4a73-9e85-9e339dea45c2',	'2021-02-13 17:30:29.937+00',	'2021-02-13 17:30:29.937+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'0eb42a50-e803-426c-bc09-cc3da6ea9368',	'2021-02-13 17:30:30.025+00',	'2021-02-13 17:30:30.025+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'558a1c75-0462-4627-968f-b0c114f85907',	'2021-02-13 17:30:30.112+00',	'2021-02-13 17:30:30.112+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'41ebb14c-e60e-4f11-963b-dc7c4d461626',	'2021-02-13 17:30:30.208+00',	'2021-02-13 17:30:30.208+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'bbbc0fbb-e47a-4411-a9b0-1d2aca80a7b6',	'2021-02-13 17:30:30.303+00',	'2021-02-13 17:30:30.303+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'9b8ad0db-4d34-40c4-9cff-dd28c1107bc2',	'2021-02-13 17:30:30.409+00',	'2021-02-13 17:30:30.409+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'0bac79c6-00c4-488b-bc85-cbd2905d2a61',	'2021-02-13 17:30:30.493+00',	'2021-02-13 17:30:30.493+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'd27e5327-b66e-41d2-ae31-efe8ab12d4ee',	'2021-02-13 17:30:30.589+00',	'2021-02-13 17:30:30.589+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'c091fee6-4fdc-4358-94e6-ce9e83439a32',	'2021-02-13 17:30:30.691+00',	'2021-02-13 17:30:30.691+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'f5fc4cc9-4cce-4aab-95fd-66865d3ada7c',	'2021-02-13 17:30:30.787+00',	'2021-02-13 17:30:30.787+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'7b98b4a7-ec71-48c3-8d72-ea5ba97172d4',	'2021-02-13 17:30:30.875+00',	'2021-02-13 17:30:30.875+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'79fe7350-1918-4649-a15b-96623ff63181',	'2021-02-13 17:30:30.961+00',	'2021-02-13 17:30:30.961+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'ac4cd85e-ae51-41d6-8c2a-27b007294821',	'2021-02-13 17:30:31.064+00',	'2021-02-13 17:30:31.064+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'24a1eadf-baeb-413d-856c-aaeca00cc7bd',	'2021-02-13 17:30:31.152+00',	'2021-02-13 17:30:31.152+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'225d94d9-8066-408d-90b0-954a9709075e',	'2021-02-13 17:30:31.238+00',	'2021-02-13 17:30:31.238+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'5e1836f0-28c9-474e-ab89-4fd5990f55ec',	'2021-02-13 17:30:31.326+00',	'2021-02-13 17:30:31.326+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'e6615297-21b5-43df-a87c-39f67923bea5',	'2021-02-13 17:30:31.434+00',	'2021-02-13 17:30:31.434+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'7763994c-a722-4baf-b8a0-dccdaa02490d',	'2021-02-13 17:30:31.52+00',	'2021-02-13 17:30:31.52+00'),
('c722bad1-554b-4534-a8fe-c48893116e97',	'b083349e-2182-4656-9b04-f63714f16550',	'2021-02-13 17:30:31.607+00',	'2021-02-13 17:30:31.607+00'),
('c722bad1-554b-4534-a8fe-c48893116e97',	'8ff79bdf-08c6-428a-adbe-324baccf7dbe',	'2021-02-13 17:30:31.718+00',	'2021-02-13 17:30:31.718+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'deb03835-4c7a-44cc-9870-b313336d2ab0',	'2021-02-13 17:30:31.814+00',	'2021-02-13 17:30:31.814+00'),
('fca4e96c-050b-40d6-8b03-7776e01ad3cd',	'04e4389d-22f1-4792-9f2f-5547a8c1175c',	'2021-02-13 17:30:31.898+00',	'2021-02-13 17:30:31.898+00');

DROP TABLE IF EXISTS "refresh_token";
CREATE TABLE "public"."refresh_token" (
    "token" text NOT NULL,
    "userId" uuid,
    "expirationDate" timestamptz NOT NULL,
    CONSTRAINT "refresh_token_token" PRIMARY KEY ("token"),
    CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

-- 2021-02-13 17:34:13.138414+00
