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
('20210213143042-create-question-type-question.js'),
('20210703195253-create-tag.js'),
('20210703195290-create-tag-question.js');

DROP TABLE IF EXISTS "category";
CREATE TABLE "public"."category" (
    "id" uuid NOT NULL,
    "name" character varying(50) NOT NULL,
    "label" character varying(50) NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "category_label_key" UNIQUE ("label"),
    CONSTRAINT "category_name_key" UNIQUE ("name"),
    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "category" ("id", "name", "label", "createdAt", "updatedAt") VALUES
('e7705bfb-b9f1-4565-aea3-fb2822f10cb3',	'histoire',	'Histoire',	'2021-07-03 21:15:12.777+00',	'2021-07-03 21:15:12.777+00'),
('046f5017-c6e2-4903-a90f-4e3c1590afd3',	'sport',	'Sport',	'2021-07-03 21:15:12.782+00',	'2021-07-03 21:15:12.782+00'),
('513186ae-fc02-496a-9aa8-a58347b7e669',	'jeu-video',	'Jeu vidéo',	'2021-07-03 21:15:12.787+00',	'2021-07-03 21:15:12.787+00'),
('b35269e1-7c78-4e9b-af1d-a237abafd4d6',	'cinema',	'Cinéma',	'2021-07-03 21:15:12.793+00',	'2021-07-03 21:15:12.793+00'),
('0b33b0cf-581e-41a0-9c2e-33945bb50c8a',	'musique',	'Musique',	'2021-07-03 21:15:12.798+00',	'2021-07-03 21:15:12.798+00'),
('69e7c22e-2c60-4ab9-99f0-9f0392de6136',	'automobile',	'Automobile',	'2021-07-03 21:15:12.803+00',	'2021-07-03 21:15:12.803+00');

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
('88ae580d-ae54-4ebd-901d-51b48ebbcf04',	'user1',	'user1@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'1',	'0',	NULL,	'2021-07-03 21:15:13.647+00',	'2021-07-03 21:15:13.647+00',	NULL),
('9ab73a6d-564e-4172-a1aa-494b0fff2e6e',	'user2',	'user2@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'1',	'0',	NULL,	'2021-07-03 21:15:13.657+00',	'2021-07-03 21:15:13.657+00',	NULL),
('30d8805e-c005-43d2-821a-c342e3067bf4',	'user3',	'user3@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'1',	'0',	NULL,	'2021-07-03 21:15:13.664+00',	'2021-07-03 21:15:13.664+00',	NULL),
('cff0a9f2-5e9a-4e9e-a21e-58912f759d51',	'user4',	'user4@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'vip',	'member',	'1',	'1',	'0',	NULL,	'2021-07-03 21:15:13.67+00',	'2021-07-03 21:15:13.67+00',	NULL),
('f118ff18-50f7-423e-89b7-1fe536affdee',	'user5',	'user5@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'premium',	'member',	'1',	'1',	'0',	NULL,	'2021-07-03 21:15:13.676+00',	'2021-07-03 21:15:13.676+00',	NULL),
('5d8de57e-eab7-4d28-9935-ca0f0f4117e3',	'user6',	'user6@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'0',	'0',	NULL,	'2021-07-03 21:15:13.681+00',	'2021-07-03 21:15:13.681+00',	NULL),
('badcc798-bc7e-4d9b-8118-75faa2a26386',	'user7',	'user7@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'0',	'0',	NULL,	'2021-07-03 21:15:13.686+00',	'2021-07-03 21:15:13.686+00',	NULL),
('90620791-87c5-4c2a-8656-799bd1ab38da',	'user8',	'user8@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'1',	'1',	NULL,	'2021-07-03 21:15:13.693+00',	'2021-07-03 21:15:13.693+00',	NULL),
('871e5770-0544-4b01-8546-27bfdc413a77',	'user9',	'user9@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'1',	'1',	NULL,	'2021-07-03 21:15:13.699+00',	'2021-07-03 21:15:13.699+00',	NULL),
('18891770-a34c-4dfd-ad6c-d63564cbaf43',	'reviewer1',	'reviewer1@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'reviewer',	'0',	'1',	'0',	NULL,	'2021-07-03 21:15:13.704+00',	'2021-07-03 21:15:13.704+00',	NULL),
('7569efa3-2b64-44bd-88a7-42cafe53f9f4',	'reviewer2',	'reviewer2@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'vip',	'reviewer',	'0',	'1',	'0',	NULL,	'2021-07-03 21:15:13.71+00',	'2021-07-03 21:15:13.71+00',	NULL),
('94a6d155-654d-4a84-bbd9-d65fabf61833',	'admin1',	'admin1@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'vip',	'admin',	'0',	'1',	'0',	NULL,	'2021-07-03 21:15:13.715+00',	'2021-07-03 21:15:13.715+00',	NULL);

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


DROP TABLE IF EXISTS "question";
CREATE TABLE "public"."question" (
    "id" uuid NOT NULL,
    "isHardcore" boolean NOT NULL,
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

CREATE INDEX "question_is_hardcore" ON "public"."question" USING btree ("isHardcore");

CREATE INDEX "question_status" ON "public"."question" USING btree ("status");

INSERT INTO "question" ("id", "isHardcore", "content", "answer", "status", "media", "customQuizId", "createdAt", "updatedAt") VALUES
('1545dbb9-935f-4288-b1ab-c4dcda07b243',	'0',	'Combien fait 1 + 4 ?',	'{"answers": [{"content": "5", "is_good_answer": true}, {"content": "3", "is_good_answer": false}, {"content": "4", "is_good_answer": false}, {"content": "6", "is_good_answer": false}], "additional": {"response_media": {"url": "http://example.com/toto.png", "info": "0 + 0 égale ? ..."}}}',	'approved',	'{"url": "http://example.com/calculatrice.png", "type": "image/png"}',	NULL,	'2021-07-03 21:15:12.814+00',	'2021-07-03 21:15:12.814+00'),
('963ec013-84b6-4457-bc9c-94ae5691433e',	'0',	'En quelle année, Mao a-t-il lancé sa révolution culturelle ?',	'{"answers": [{"content": "1814", "is_good_answer": false}, {"content": "1865", "is_good_answer": false}, {"content": "1920", "is_good_answer": false}, {"content": "1966", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:12.834+00',	'2021-07-03 21:15:12.834+00'),
('b184cbdf-a3b4-445a-ba39-aa9b4888bacc',	'0',	'En quelle année les États-Unis ont-ils pris part à la Première Guerre mondiale ?',	'{"answers": [{"content": "1918", "is_good_answer": false}, {"content": "1915", "is_good_answer": false}, {"content": "1917", "is_good_answer": true}, {"content": "1916", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:12.849+00',	'2021-07-03 21:15:12.849+00'),
('73107b1c-3c40-4347-8641-48ca2abf8d9b',	'0',	'Quels Jeux olympiques ont été supprimés à cause de la Seconde Guerre mondiale ?',	'{"answers": [{"content": "1936 et 1940", "is_good_answer": false}, {"content": "1944 et 1948", "is_good_answer": false}, {"content": "1940 et 1944", "is_good_answer": true}, {"content": "1932 et 1936", "is_good_answer": false}], "additional": {"response_media": {"url": null, "info": "Les Jeux ont été rénovés par le baron Pierre de Coubertin à la fin du XIXe siècle."}}}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:12.864+00',	'2021-07-03 21:15:12.864+00'),
('c9e6f3fd-88f2-4235-813a-45d69d5346f5',	'0',	'Dans les plaines de quel champ de bataille se dresse la Butte du Lion ?',	'{"answers": [{"content": "Verdun", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": true}, {"content": "Austerlitz", "is_good_answer": false}, {"content": "Valmy", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:12.878+00',	'2021-07-03 21:15:12.878+00'),
('fa3c19ff-198c-40a0-aef7-5502e16f504d',	'0',	'Quelle ligne de défense française fut contournée par les Allemands en 1940 ?',	'{"answers": [{"content": "La ligne Siegfried", "is_good_answer": false}, {"content": "La ligne Maginot", "is_good_answer": true}, {"content": "La ligne Verte", "is_good_answer": false}, {"content": "La ligne Daladier", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:12.901+00',	'2021-07-03 21:15:12.901+00'),
('00084ad3-f202-4cd9-bb2c-ddd494290cb1',	'0',	'Le général Cambronne, qui commandait la vieille garde, eut une conduite héroïque à...',	'{"answers": [{"content": "Wagram", "is_good_answer": false}, {"content": "Iena", "is_good_answer": false}, {"content": "Midway", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:12.915+00',	'2021-07-03 21:15:12.915+00'),
('635a6919-50f3-4de2-b782-fa91b7e5ec63',	'0',	'Où a eu lieu le grand procès des criminels de guerre nazis ?',	'{"answers": [{"content": "Berlin", "is_good_answer": false}, {"content": "Nuremberg", "is_good_answer": true}, {"content": "Hambourg", "is_good_answer": false}, {"content": "Munich", "is_good_answer": false}], "additional": {"response_media": {"url": null, "info": "Le procès de Nuremberg fut intenté contre 24 responsables du Troisième Reich."}}}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:12.929+00',	'2021-07-03 21:15:12.929+00'),
('9cbff2eb-d750-4f76-b5cf-99474ee689b6',	'0',	'Qui fut vainqueur de la Guerre de Troie, conflit légendaire de la mythologie grecque ?',	'{"answers": [{"content": "Sophocle", "is_good_answer": false}, {"content": "Ajax", "is_good_answer": false}, {"content": "Ulysse", "is_good_answer": true}, {"content": "Arkantos", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:12.948+00',	'2021-07-03 21:15:12.948+00'),
('6ab8fa46-8682-494f-9cb0-8888956cc589',	'0',	'En quelle année la bataille de Waterloo a-t-elle eu lieu, à vingt kilomètres au sud de Bruxelles ?',	'{"answers": [{"content": "1815", "is_good_answer": true}, {"content": "1831", "is_good_answer": false}, {"content": "1809", "is_good_answer": false}, {"content": "1824", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:12.966+00',	'2021-07-03 21:15:12.966+00'),
('8f8df9e0-15ad-4db3-9f2c-3295543e5b54',	'0',	'Quel basketteur américain a été champion NBA en 1998 pour la sixième fois de sa carrière ?',	'{"answers": [{"content": "Patrick Ewing", "is_good_answer": false}, {"content": "Karl Malone", "is_good_answer": false}, {"content": "Charles Barkley", "is_good_answer": false}, {"content": "Michael Jordan", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:12.981+00',	'2021-07-03 21:15:12.981+00'),
('6df78df8-45b0-4537-b098-f82b6df2b898',	'0',	'Dans quelle pays est né le joueur de basket-ball professionnel Tony Parker ?',	'{"answers": [{"content": "Belgique", "is_good_answer": true}, {"content": "USA", "is_good_answer": false}, {"content": "France", "is_good_answer": false}, {"content": "Pologne", "is_good_answer": false}], "additional": {"response_media": {"url": null, "info": "Il évoluait dans l''équipe des Spurs de San Antonio depuis son arrivée dans la NBA en 2001."}}}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:12.995+00',	'2021-07-03 21:15:12.995+00'),
('a32948ef-0b03-463c-a109-4b9a0414756c',	'0',	'Qui a été élu joueur de la décennie 2000 suite à un sondage du site officiel NBA ?',	'{"answers": [{"content": "Derek Fisher", "is_good_answer": false}, {"content": "Ron Harper", "is_good_answer": false}, {"content": "Kobe Bryant", "is_good_answer": true}, {"content": "Rick Fox", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.008+00',	'2021-07-03 21:15:13.008+00'),
('f65ab97d-112d-44b2-89ed-50805cd5b10c',	'0',	'Quel concours de dunks est organisé par la NBA durant le NBA All-Star Week-end ?',	'{"answers": [{"content": "Skills Challenge", "is_good_answer": false}, {"content": "Slam Dunk Contest", "is_good_answer": true}, {"content": "Three-point Shootout", "is_good_answer": false}, {"content": "All-Star Game", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.022+00',	'2021-07-03 21:15:13.022+00'),
('0bd4a8dd-5265-4452-ac27-933a03638d42',	'0',	'Quel basketteur américain a réalisé en 2000 un 360 degrés inversé mythique ?',	'{"answers": [{"content": "Jarnell Stokes", "is_good_answer": false}, {"content": "Vince Carter", "is_good_answer": true}, {"content": "Marc Gasol", "is_good_answer": false}, {"content": "Andrew Harrison", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.036+00',	'2021-07-03 21:15:13.036+00'),
('d62ac586-9cbf-48b2-a832-50b19e00b194',	'0',	'Quel joueur de NBA se définit lui-même comme un « viking africain » ?',	'{"answers": [{"content": "Derrick Rose", "is_good_answer": false}, {"content": "Pau Gasol", "is_good_answer": false}, {"content": "Aaron Brooks", "is_good_answer": false}, {"content": "Joakim Noah", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.051+00',	'2021-07-03 21:15:13.051+00'),
('c6346eef-5809-410e-a936-5f6c5c369623',	'0',	'Quel événement annuel majeur de la NBA est comparable à une bourse de joueurs ?',	'{"answers": [{"content": "La franchise", "is_good_answer": false}, {"content": "Les playoffs", "is_good_answer": false}, {"content": "Le ballotage", "is_good_answer": false}, {"content": "La draft", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.065+00',	'2021-07-03 21:15:13.065+00'),
('37fa350f-7769-457e-8e12-fe2c44832ccd',	'0',	'Combien de titres de champion NBA Michael Jordan a-t-il obtenu ?',	'{"answers": [{"content": "Cinq", "is_good_answer": false}, {"content": "Sept", "is_good_answer": false}, {"content": "Six", "is_good_answer": true}, {"content": "Quatre", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.079+00',	'2021-07-03 21:15:13.079+00'),
('13d3b056-10d8-472b-a04b-39627b33c1a7',	'0',	'Qui est le premier joueur français à avoir été sacré champion NBA ?',	'{"answers": [{"content": "Joe Dumars", "is_good_answer": false}, {"content": "Paul Pierce", "is_good_answer": false}, {"content": "Tony Parker", "is_good_answer": true}, {"content": "Tim Duncan", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.094+00',	'2021-07-03 21:15:13.094+00'),
('35f36295-f964-4465-906d-64dc7dd87bf4',	'0',	'Qui a été élu deux fois meilleur joueur de la NBA, en 2005 et 2006 ?',	'{"answers": [{"content": "Jeff Brown", "is_good_answer": false}, {"content": "Dana Jones", "is_good_answer": false}, {"content": "Marlon Garnett", "is_good_answer": false}, {"content": "Steve Nash", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.113+00',	'2021-07-03 21:15:13.113+00'),
('fee95ec5-3249-40c4-aab5-4400f5d4d3c4',	'0',	'Quel gagnant de la « Nouvelle Star », diffusée sur M6, est surnommé « La Tortue » ?',	'{"answers": [{"content": "Christophe Willem", "is_good_answer": true}, {"content": "Julien Doré", "is_good_answer": false}, {"content": "Jonatan Cerrada", "is_good_answer": false}, {"content": "Steeve Estatof", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.135+00',	'2021-07-03 21:15:13.135+00'),
('85a21d75-a4a3-4397-81d0-fab21e5fdd5c',	'0',	'En 1991, quel tube Yannick Noah a-t-il associé à la victoire de la France en coupe Davis ?',	'{"answers": [{"content": "Vagabond", "is_good_answer": false}, {"content": "Les Lionnes", "is_good_answer": false}, {"content": "Saga Africa", "is_good_answer": true}, {"content": "Ose", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.148+00',	'2021-07-03 21:15:13.148+00'),
('20b019cf-d66c-46a3-bf1a-8f3cc14992eb',	'0',	'Quel chanteur prénommé Mathieu a émergé du succès remporté par les Linkup ?',	'{"answers": [{"content": "Corneille", "is_good_answer": false}, {"content": "Keen''V", "is_good_answer": false}, {"content": "Raphaël", "is_good_answer": false}, {"content": "M. Pokora", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.161+00',	'2021-07-03 21:15:13.161+00'),
('1787c02a-54ad-40d8-8a23-a4c4137aaadf',	'0',	'Quel est le style musical de l''album de Rohff, « La fierté des années » ?',	'{"answers": [{"content": "La Techno", "is_good_answer": false}, {"content": "Le tango", "is_good_answer": false}, {"content": "Le disco", "is_good_answer": false}, {"content": "Le rap", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.175+00',	'2021-07-03 21:15:13.175+00'),
('7430358b-74b9-45eb-8de0-fc1f6c7a17e7',	'0',	'Quel Américano-Libanais est entré dans les charts avec « Life in Cartoon Motion » ?',	'{"answers": [{"content": "Mika", "is_good_answer": true}, {"content": "Iwan", "is_good_answer": false}, {"content": "Rida", "is_good_answer": false}, {"content": "K. Maro", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.188+00',	'2021-07-03 21:15:13.188+00'),
('c06cc86b-a7f2-43f2-b56f-600c6fe483f0',	'0',	'Avec quel chanteur le top model Heidi Klum a-t-elle été mariée durant sept ans ?',	'{"answers": [{"content": "Seal", "is_good_answer": true}, {"content": "Paul McCartney", "is_good_answer": false}, {"content": "Sean Paul", "is_good_answer": false}, {"content": "Robbie Williams", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.233+00',	'2021-07-03 21:15:13.233+00'),
('2c3740c9-de48-4342-961d-31215cff508b',	'0',	'Quel DJ a repris un titre des années 80 pour faire un tube avec « Living On Video » ?',	'{"answers": [{"content": "Pakito", "is_good_answer": true}, {"content": "Vitalic", "is_good_answer": false}, {"content": "Madeon", "is_good_answer": false}, {"content": "Brodinski", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.247+00',	'2021-07-03 21:15:13.247+00'),
('a46290d7-b4dd-47cb-88e0-cfe01b065e74',	'0',	'Quel chanteur a sorti « Musicology » puis « 3121 » deux ans plus tard ?',	'{"answers": [{"content": "Bob James", "is_good_answer": false}, {"content": "Al Jarreau", "is_good_answer": false}, {"content": "Prince", "is_good_answer": true}, {"content": "James Brown", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.261+00',	'2021-07-03 21:15:13.261+00'),
('32102391-d7b1-418e-b30f-dbcb2f664810',	'0',	'Dans quel pays se situe le circuit de course automobile du Mans ?',	'{"answers": [{"content": "Pays-Bas", "is_good_answer": false}, {"content": "Suisse", "is_good_answer": false}, {"content": "Belgique", "is_good_answer": false}, {"content": "France", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.274+00',	'2021-07-03 21:15:13.274+00'),
('d0477dca-c4c2-4624-8354-522e2e3870c7',	'0',	'Quel sport automobile consiste à accélérer le plus rapidement possible avec son véhicule ?',	'{"answers": [{"content": "Le trial", "is_good_answer": false}, {"content": "Le Drift", "is_good_answer": false}, {"content": "Le Monster truck", "is_good_answer": false}, {"content": "Le Dragster", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.306+00',	'2021-07-03 21:15:13.306+00'),
('52821397-5574-4c85-bd45-d504e9741b2b',	'0',	'Comment s''appelle le véhicule du personnage de bande dessinée Batman ?',	'{"answers": [{"content": "La BatDrive", "is_good_answer": false}, {"content": "La Batauto", "is_good_answer": false}, {"content": "La Batcar", "is_good_answer": false}, {"content": "La Batmobile", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.318+00',	'2021-07-03 21:15:13.318+00'),
('e53be295-7563-4737-b3c6-c5318acb1b7f',	'0',	'De quand date le Duster, véhicule utilitaire sport vendu par la marque roumaine Dacia ?',	'{"answers": [{"content": "2006", "is_good_answer": false}, {"content": "2008", "is_good_answer": false}, {"content": "2010", "is_good_answer": true}, {"content": "2012", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.331+00',	'2021-07-03 21:15:13.331+00'),
('3003a0bd-5b31-4d61-ba66-fed81034eae9',	'0',	'Quelle principauté accueille l''un des plus prestigieux Grand Prix de Formule 1 ?',	'{"answers": [{"content": "Liechtenstein", "is_good_answer": false}, {"content": "Andorre", "is_good_answer": false}, {"content": "Mantoue", "is_good_answer": false}, {"content": "Monaco", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.358+00',	'2021-07-03 21:15:13.358+00'),
('d90f3823-6d14-4591-aeaa-5ee42b6aeaa0',	'0',	'Quelle société appartenant au groupe Belron « répare et remplace » votre pare-brise ?',	'{"answers": [{"content": "Carglass", "is_good_answer": true}, {"content": "Midas", "is_good_answer": false}, {"content": "Speedy", "is_good_answer": false}, {"content": "Norauto", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.385+00',	'2021-07-03 21:15:13.385+00'),
('88b8ffa5-cc3b-4b2b-a33e-c117dc41255c',	'0',	'Quelle firme automobile, filiale française de FIAT, a ensuite intégré le groupe Chrysler ?',	'{"answers": [{"content": "Simca", "is_good_answer": true}, {"content": "Hommell", "is_good_answer": false}, {"content": "Packard", "is_good_answer": false}, {"content": "Triumph", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.399+00',	'2021-07-03 21:15:13.399+00'),
('19bdb6be-2d14-403a-ba55-2d32190fe92b',	'0',	'Dans quel jeu peux on voir des Chocobos ?',	'{"answers": [{"content": "Breath of fire", "is_good_answer": false}, {"content": "Final Fantasy", "is_good_answer": true}, {"content": "Secret of Mana", "is_good_answer": false}, {"content": "Golden stun", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.417+00',	'2021-07-03 21:15:13.417+00'),
('a30334d7-c5a4-4173-a09d-f22f71eb6e6e',	'0',	'Salamèche évolue en ',	'{"answers": [{"content": "Dracaufeu", "is_good_answer": false}, {"content": "Reptincel", "is_good_answer": true}, {"content": "Magna", "is_good_answer": false}, {"content": "Ptera", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.433+00',	'2021-07-03 21:15:13.433+00'),
('2ca32bac-5b6a-4311-885e-028f3ac25ddd',	'0',	'Qui a chanté au pied de …onnes le 10 juin 2000 ?',	'{"answers": [{"content": "Eddy Mitchell", "is_good_answer": false}, {"content": "Patrick Bruel", "is_good_answer": false}, {"content": "Christophe Maé", "is_good_answer": false}, {"content": "Johnny Hallyday", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.204+00',	'2021-07-03 21:15:13.204+00'),
('7d05e926-7dce-465b-aadf-1011b92c7a77',	'0',	'À quel modèle de voiture ressemble le vieux tacot jaune que conduit Gaston Lagaffe ?',	'{"answers": [{"content": "Rolls-Royce", "is_good_answer": false}, {"content": "Citroën B10", "is_good_answer": false}, {"content": "Fiat 509", "is_good_answer": true}, {"content": "Jeep", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.291+00',	'2021-07-03 21:15:13.291+00'),
('742cc10e-3589-4d6d-bf36-a2274a821f54',	'0',	'En France, refuser une priorité peut vous coûter combien de points sur le permis ?',	'{"answers": [{"content": "6 points", "is_good_answer": false}, {"content": "8 points", "is_good_answer": false}, {"content": "4 points", "is_good_answer": true}, {"content": "2 points", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.344+00',	'2021-07-03 21:15:13.344+00'),
('3f76bb59-cb65-46e9-a8f7-bbcdfde2b650',	'0',	'Dans le monde automobile, quel sigle correspond au Grand Tourisme Injection ?',	'{"answers": [{"content": "sport", "is_good_answer": false}, {"content": "Gti", "is_good_answer": true}, {"content": "TT", "is_good_answer": false}, {"content": "Turbo", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.371+00',	'2021-07-03 21:15:13.371+00'),
('38b802fb-db8c-411c-975b-1b036efb9497',	'0',	'Dans la légende de Zelda, comment s''appelle le héros ?',	'{"answers": [{"content": "Zelda", "is_good_answer": false}, {"content": "Bruno", "is_good_answer": false}, {"content": "Ganondorf", "is_good_answer": false}, {"content": "Link", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.541+00',	'2021-07-03 21:15:13.541+00'),
('32307102-63ee-4dd9-b95a-55d32ef48b6a',	'1',	'Quel seigneur Albanais est vu comme un héros national suite à sa résistance aux Ottomans ?',	'{"answers": [{"content": "Georges Castriote Skanderbeg", "is_good_answer": true}, {"content": "Georges Castriote", "is_good_answer": true}, {"content": "Castriote", "is_good_answer": true}, {"content": "Scanderbeg", "is_good_answer": true}, {"content": "Skanderberg", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.634+00',	'2021-07-03 21:15:13.634+00'),
('cec72f0c-b364-4e17-a994-45ae1567c2de',	'0',	'Sous quel nom le rappeur et homme d''affaires américain Curtis Jackson fait-il carrière ?',	'{"answers": [{"content": "50 cent", "is_good_answer": true}, {"content": "Fat Joe", "is_good_answer": false}, {"content": "Big Sean", "is_good_answer": false}, {"content": "Mike D", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.218+00',	'2021-07-03 21:15:13.218+00'),
('e072ae06-82bf-47f2-a241-2b8c329c57b7',	'0',	'Zelda est un jeu du genre',	'{"answers": [{"content": "Aventure", "is_good_answer": true}, {"content": "RPG", "is_good_answer": false}, {"content": "Course", "is_good_answer": false}, {"content": "Simulation", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.446+00',	'2021-07-03 21:15:13.446+00'),
('b956bc12-beb6-491a-bb67-33b10e32217e',	'0',	'Sur quelle plateforme le jeu Tekken est sorti en premier ?',	'{"answers": [{"content": "La borne d''arcade", "is_good_answer": true}, {"content": "NES", "is_good_answer": false}, {"content": "Playstation", "is_good_answer": false}, {"content": "Gamecube", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.461+00',	'2021-07-03 21:15:13.461+00'),
('11477303-6dd5-4de4-813a-c15cfad37163',	'0',	'Dans quel jeu le personnage de Mario a-t-il été développé en premier ?',	'{"answers": [{"content": "Super Mario", "is_good_answer": false}, {"content": "Super Mario Bros", "is_good_answer": false}, {"content": "Donkey Kong", "is_good_answer": true}, {"content": "Mario Party", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.473+00',	'2021-07-03 21:15:13.473+00'),
('2a948a21-003f-475e-87fe-b4fef1c9a60a',	'0',	'La série Fallout est la suite « spirituelle » de quel jeu ?',	'{"answers": [{"content": "Wasteland", "is_good_answer": true}, {"content": "Homeland", "is_good_answer": false}, {"content": "Falland", "is_good_answer": false}, {"content": "Skyrim", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.485+00',	'2021-07-03 21:15:13.485+00'),
('cf9733ff-5a05-4bc7-93df-ba4335d2dbd7',	'0',	'Que signifie le nom de la serie GTA ?',	'{"answers": [{"content": "Burnout", "is_good_answer": false}, {"content": "Conduite dangeureuse", "is_good_answer": false}, {"content": "Vol de voiture", "is_good_answer": true}, {"content": "Voiture customisé", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.502+00',	'2021-07-03 21:15:13.502+00'),
('b1e3fb1d-86f3-429e-806e-bcf64ea5378c',	'0',	'Le jeu Counter Strike dérive de quel autre jeu ?',	'{"answers": [{"content": "Half Life", "is_good_answer": true}, {"content": "Splinter Cell", "is_good_answer": false}, {"content": "Doom", "is_good_answer": false}, {"content": "Call of Duty", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.516+00',	'2021-07-03 21:15:13.516+00'),
('534b001b-f956-4f59-9293-fc6bde65278b',	'0',	'Dans Pac man qu''est ce qui hante le labyrinthe ?',	'{"answers": [{"content": "Des plantes carnivores", "is_good_answer": false}, {"content": "Des fantômes", "is_good_answer": true}, {"content": "Des squelettes", "is_good_answer": false}, {"content": "Des zombies", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.529+00',	'2021-07-03 21:15:13.529+00'),
('295da0e4-7b22-476d-a2d4-961531abd5f5',	'0',	'Qui est le compagnon de Batman ?',	'{"answers": [{"content": "Robin", "is_good_answer": true}]}',	'pending',	'{}',	NULL,	'2021-07-03 21:15:13.554+00',	'2021-07-03 21:15:13.554+00'),
('caf404a1-ea35-4995-972a-e84b0ae3a316',	'0',	'Quel super héros ne se sépare jamais de son marteau forgé par les nains ',	'{"answers": [{"content": "Thor", "is_good_answer": true}]}',	'pending',	'{}',	NULL,	'2021-07-03 21:15:13.569+00',	'2021-07-03 21:15:13.569+00'),
('da2a6aab-0f8a-40ec-8090-664a13981571',	'0',	'Quel super-héros à la force surhumaine ressemble à un être de pierre ?',	'{"answers": [{"content": "Hawkman", "is_good_answer": false}, {"content": "Plastic Man", "is_good_answer": false}, {"content": "Superboy", "is_good_answer": false}, {"content": "La Chose", "is_good_answer": true}]}',	'disapproved',	'{}',	NULL,	'2021-07-03 21:15:13.582+00',	'2021-07-03 21:15:13.582+00'),
('60a7b4bb-829a-427a-a53f-9cb098d16479',	'0',	'Quel super-héros porte un costume inspiré du drapeau américain ?',	'{"answers": [{"content": "Tigra", "is_good_answer": false}, {"content": "Iron Man", "is_good_answer": false}, {"content": "Blade", "is_good_answer": false}, {"content": "Captain America", "is_good_answer": true}]}',	'disapproved',	'{}',	NULL,	'2021-07-03 21:15:13.595+00',	'2021-07-03 21:15:13.595+00'),
('d38623b3-b74b-4916-9000-d235cd7b42c9',	'0',	'Quel poète français est connu pour ses fables ?',	'{"answers": [{"content": "Jean de La Fontaine", "is_good_answer": true}, {"content": "de La Fontaine", "is_good_answer": true}, {"content": "La Fontaine", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.608+00',	'2021-07-03 21:15:13.608+00'),
('dc9aaf95-c3aa-4e26-ae5e-100bd88ea065',	'1',	'Quel élément chimique porte le numéro atomique 30 ?',	'{"answers": [{"content": "le Zinc", "is_good_answer": true}, {"content": "Zinc", "is_good_answer": true}, {"content": "Zn", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-07-03 21:15:13.621+00',	'2021-07-03 21:15:13.621+00');

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
('54921666-0a7f-479d-aea0-80dd54badf25',	'qcm',	'QCM',	'0',	'2021-07-03 21:15:12.729+00',	'2021-07-03 21:15:12.729+00'),
('b22a2e7b-591b-4abd-9b27-a77cb269daa6',	'input',	'Réponse libre',	'0',	'2021-07-03 21:15:12.742+00',	'2021-07-03 21:15:12.742+00'),
('512193d7-bf36-4b14-b462-354745b94cd3',	'blind-test',	'Blind Test',	'1',	'2021-07-03 21:15:12.748+00',	'2021-07-03 21:15:12.748+00');

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


DROP TABLE IF EXISTS "tag";
CREATE TABLE "public"."tag" (
    "id" uuid NOT NULL,
    "name" character varying(50) NOT NULL,
    "label" character varying(80) NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "tag_label_key" UNIQUE ("label"),
    CONSTRAINT "tag_name_key" UNIQUE ("name"),
    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE INDEX "tag_label" ON "public"."tag" USING btree ("label");

CREATE INDEX "tag_name" ON "public"."tag" USING btree ("name");

INSERT INTO "tag" ("id", "name", "label", "createdAt", "updatedAt") VALUES
('a639a6a8-a286-4b0f-bbad-84fc655739cb',	'football',	'Football',	'2021-07-03 21:15:12.754+00',	'2021-07-03 21:15:12.754+00'),
('aa4a1ad6-e5af-4ab2-a048-b1d83ec7f33d',	'mythologie',	'Mythologie',	'2021-07-03 21:15:12.761+00',	'2021-07-03 21:15:12.761+00'),
('cc2dd0b6-893a-4bcb-8e32-c78c5f344936',	'usa',	'Etats-Unis d''Amérique',	'2021-07-03 21:15:12.766+00',	'2021-07-03 21:15:12.766+00'),
('f99b8944-94a9-4a02-bdc5-83c142bf7467',	'grece',	'Grèce',	'2021-07-03 21:15:12.771+00',	'2021-07-03 21:15:12.771+00');

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

DROP TABLE IF EXISTS "category_custom_quiz";
CREATE TABLE "public"."category_custom_quiz" (
    "categoryId" uuid NOT NULL,
    "customQuizId" uuid NOT NULL,
    "createdAt" timestamptz DEFAULT now() NOT NULL,
    "updatedAt" timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT "category_custom_quiz_pkey" PRIMARY KEY ("categoryId", "customQuizId"),
    CONSTRAINT "category_custom_quiz_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES category(id) ON DELETE RESTRICT NOT DEFERRABLE,
    CONSTRAINT "category_custom_quiz_customQuizId_fkey" FOREIGN KEY ("customQuizId") REFERENCES custom_quiz(id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);


DROP TABLE IF EXISTS "category_question";
CREATE TABLE "public"."category_question" (
    "categoryId" uuid NOT NULL,
    "questionId" uuid NOT NULL,
    "createdAt" timestamptz DEFAULT now() NOT NULL,
    "updatedAt" timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT "category_question_pkey" PRIMARY KEY ("categoryId", "questionId"),
    CONSTRAINT "category_question_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES category(id) ON DELETE RESTRICT NOT DEFERRABLE,
    CONSTRAINT "category_question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES question(id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

INSERT INTO "category_question" ("categoryId", "questionId", "createdAt", "updatedAt") VALUES
('e7705bfb-b9f1-4565-aea3-fb2822f10cb3',	'1545dbb9-935f-4288-b1ab-c4dcda07b243',	'2021-07-03 21:15:12.825+00',	'2021-07-03 21:15:12.825+00'),
('e7705bfb-b9f1-4565-aea3-fb2822f10cb3',	'963ec013-84b6-4457-bc9c-94ae5691433e',	'2021-07-03 21:15:12.841+00',	'2021-07-03 21:15:12.841+00'),
('e7705bfb-b9f1-4565-aea3-fb2822f10cb3',	'b184cbdf-a3b4-445a-ba39-aa9b4888bacc',	'2021-07-03 21:15:12.855+00',	'2021-07-03 21:15:12.855+00'),
('e7705bfb-b9f1-4565-aea3-fb2822f10cb3',	'73107b1c-3c40-4347-8641-48ca2abf8d9b',	'2021-07-03 21:15:12.87+00',	'2021-07-03 21:15:12.87+00'),
('e7705bfb-b9f1-4565-aea3-fb2822f10cb3',	'c9e6f3fd-88f2-4235-813a-45d69d5346f5',	'2021-07-03 21:15:12.883+00',	'2021-07-03 21:15:12.883+00'),
('e7705bfb-b9f1-4565-aea3-fb2822f10cb3',	'fa3c19ff-198c-40a0-aef7-5502e16f504d',	'2021-07-03 21:15:12.908+00',	'2021-07-03 21:15:12.908+00'),
('e7705bfb-b9f1-4565-aea3-fb2822f10cb3',	'00084ad3-f202-4cd9-bb2c-ddd494290cb1',	'2021-07-03 21:15:12.921+00',	'2021-07-03 21:15:12.921+00'),
('e7705bfb-b9f1-4565-aea3-fb2822f10cb3',	'635a6919-50f3-4de2-b782-fa91b7e5ec63',	'2021-07-03 21:15:12.936+00',	'2021-07-03 21:15:12.936+00'),
('e7705bfb-b9f1-4565-aea3-fb2822f10cb3',	'9cbff2eb-d750-4f76-b5cf-99474ee689b6',	'2021-07-03 21:15:12.955+00',	'2021-07-03 21:15:12.955+00'),
('e7705bfb-b9f1-4565-aea3-fb2822f10cb3',	'6ab8fa46-8682-494f-9cb0-8888956cc589',	'2021-07-03 21:15:12.973+00',	'2021-07-03 21:15:12.973+00'),
('046f5017-c6e2-4903-a90f-4e3c1590afd3',	'8f8df9e0-15ad-4db3-9f2c-3295543e5b54',	'2021-07-03 21:15:12.987+00',	'2021-07-03 21:15:12.987+00'),
('046f5017-c6e2-4903-a90f-4e3c1590afd3',	'6df78df8-45b0-4537-b098-f82b6df2b898',	'2021-07-03 21:15:13.001+00',	'2021-07-03 21:15:13.001+00'),
('046f5017-c6e2-4903-a90f-4e3c1590afd3',	'a32948ef-0b03-463c-a109-4b9a0414756c',	'2021-07-03 21:15:13.014+00',	'2021-07-03 21:15:13.014+00'),
('046f5017-c6e2-4903-a90f-4e3c1590afd3',	'f65ab97d-112d-44b2-89ed-50805cd5b10c',	'2021-07-03 21:15:13.029+00',	'2021-07-03 21:15:13.029+00'),
('046f5017-c6e2-4903-a90f-4e3c1590afd3',	'0bd4a8dd-5265-4452-ac27-933a03638d42',	'2021-07-03 21:15:13.043+00',	'2021-07-03 21:15:13.043+00'),
('046f5017-c6e2-4903-a90f-4e3c1590afd3',	'd62ac586-9cbf-48b2-a832-50b19e00b194',	'2021-07-03 21:15:13.058+00',	'2021-07-03 21:15:13.058+00'),
('046f5017-c6e2-4903-a90f-4e3c1590afd3',	'c6346eef-5809-410e-a936-5f6c5c369623',	'2021-07-03 21:15:13.071+00',	'2021-07-03 21:15:13.071+00'),
('046f5017-c6e2-4903-a90f-4e3c1590afd3',	'37fa350f-7769-457e-8e12-fe2c44832ccd',	'2021-07-03 21:15:13.085+00',	'2021-07-03 21:15:13.085+00'),
('046f5017-c6e2-4903-a90f-4e3c1590afd3',	'13d3b056-10d8-472b-a04b-39627b33c1a7',	'2021-07-03 21:15:13.101+00',	'2021-07-03 21:15:13.101+00'),
('046f5017-c6e2-4903-a90f-4e3c1590afd3',	'35f36295-f964-4465-906d-64dc7dd87bf4',	'2021-07-03 21:15:13.121+00',	'2021-07-03 21:15:13.121+00'),
('0b33b0cf-581e-41a0-9c2e-33945bb50c8a',	'fee95ec5-3249-40c4-aab5-4400f5d4d3c4',	'2021-07-03 21:15:13.14+00',	'2021-07-03 21:15:13.14+00'),
('0b33b0cf-581e-41a0-9c2e-33945bb50c8a',	'85a21d75-a4a3-4397-81d0-fab21e5fdd5c',	'2021-07-03 21:15:13.153+00',	'2021-07-03 21:15:13.153+00'),
('0b33b0cf-581e-41a0-9c2e-33945bb50c8a',	'20b019cf-d66c-46a3-bf1a-8f3cc14992eb',	'2021-07-03 21:15:13.167+00',	'2021-07-03 21:15:13.167+00'),
('0b33b0cf-581e-41a0-9c2e-33945bb50c8a',	'1787c02a-54ad-40d8-8a23-a4c4137aaadf',	'2021-07-03 21:15:13.181+00',	'2021-07-03 21:15:13.181+00'),
('0b33b0cf-581e-41a0-9c2e-33945bb50c8a',	'7430358b-74b9-45eb-8de0-fc1f6c7a17e7',	'2021-07-03 21:15:13.194+00',	'2021-07-03 21:15:13.194+00'),
('0b33b0cf-581e-41a0-9c2e-33945bb50c8a',	'2ca32bac-5b6a-4311-885e-028f3ac25ddd',	'2021-07-03 21:15:13.21+00',	'2021-07-03 21:15:13.21+00'),
('0b33b0cf-581e-41a0-9c2e-33945bb50c8a',	'cec72f0c-b364-4e17-a994-45ae1567c2de',	'2021-07-03 21:15:13.225+00',	'2021-07-03 21:15:13.225+00'),
('0b33b0cf-581e-41a0-9c2e-33945bb50c8a',	'c06cc86b-a7f2-43f2-b56f-600c6fe483f0',	'2021-07-03 21:15:13.239+00',	'2021-07-03 21:15:13.239+00'),
('0b33b0cf-581e-41a0-9c2e-33945bb50c8a',	'2c3740c9-de48-4342-961d-31215cff508b',	'2021-07-03 21:15:13.252+00',	'2021-07-03 21:15:13.252+00'),
('0b33b0cf-581e-41a0-9c2e-33945bb50c8a',	'a46290d7-b4dd-47cb-88e0-cfe01b065e74',	'2021-07-03 21:15:13.266+00',	'2021-07-03 21:15:13.266+00'),
('69e7c22e-2c60-4ab9-99f0-9f0392de6136',	'32102391-d7b1-418e-b30f-dbcb2f664810',	'2021-07-03 21:15:13.28+00',	'2021-07-03 21:15:13.28+00'),
('69e7c22e-2c60-4ab9-99f0-9f0392de6136',	'7d05e926-7dce-465b-aadf-1011b92c7a77',	'2021-07-03 21:15:13.299+00',	'2021-07-03 21:15:13.299+00'),
('69e7c22e-2c60-4ab9-99f0-9f0392de6136',	'd0477dca-c4c2-4624-8354-522e2e3870c7',	'2021-07-03 21:15:13.312+00',	'2021-07-03 21:15:13.312+00'),
('69e7c22e-2c60-4ab9-99f0-9f0392de6136',	'52821397-5574-4c85-bd45-d504e9741b2b',	'2021-07-03 21:15:13.325+00',	'2021-07-03 21:15:13.325+00'),
('69e7c22e-2c60-4ab9-99f0-9f0392de6136',	'e53be295-7563-4737-b3c6-c5318acb1b7f',	'2021-07-03 21:15:13.337+00',	'2021-07-03 21:15:13.337+00'),
('69e7c22e-2c60-4ab9-99f0-9f0392de6136',	'742cc10e-3589-4d6d-bf36-a2274a821f54',	'2021-07-03 21:15:13.351+00',	'2021-07-03 21:15:13.351+00'),
('69e7c22e-2c60-4ab9-99f0-9f0392de6136',	'3003a0bd-5b31-4d61-ba66-fed81034eae9',	'2021-07-03 21:15:13.365+00',	'2021-07-03 21:15:13.365+00'),
('69e7c22e-2c60-4ab9-99f0-9f0392de6136',	'3f76bb59-cb65-46e9-a8f7-bbcdfde2b650',	'2021-07-03 21:15:13.378+00',	'2021-07-03 21:15:13.378+00'),
('69e7c22e-2c60-4ab9-99f0-9f0392de6136',	'd90f3823-6d14-4591-aeaa-5ee42b6aeaa0',	'2021-07-03 21:15:13.391+00',	'2021-07-03 21:15:13.391+00'),
('69e7c22e-2c60-4ab9-99f0-9f0392de6136',	'88b8ffa5-cc3b-4b2b-a33e-c117dc41255c',	'2021-07-03 21:15:13.404+00',	'2021-07-03 21:15:13.404+00'),
('513186ae-fc02-496a-9aa8-a58347b7e669',	'19bdb6be-2d14-403a-ba55-2d32190fe92b',	'2021-07-03 21:15:13.426+00',	'2021-07-03 21:15:13.426+00'),
('513186ae-fc02-496a-9aa8-a58347b7e669',	'a30334d7-c5a4-4173-a09d-f22f71eb6e6e',	'2021-07-03 21:15:13.44+00',	'2021-07-03 21:15:13.44+00'),
('513186ae-fc02-496a-9aa8-a58347b7e669',	'e072ae06-82bf-47f2-a241-2b8c329c57b7',	'2021-07-03 21:15:13.452+00',	'2021-07-03 21:15:13.452+00'),
('513186ae-fc02-496a-9aa8-a58347b7e669',	'b956bc12-beb6-491a-bb67-33b10e32217e',	'2021-07-03 21:15:13.467+00',	'2021-07-03 21:15:13.467+00'),
('513186ae-fc02-496a-9aa8-a58347b7e669',	'11477303-6dd5-4de4-813a-c15cfad37163',	'2021-07-03 21:15:13.479+00',	'2021-07-03 21:15:13.479+00'),
('513186ae-fc02-496a-9aa8-a58347b7e669',	'2a948a21-003f-475e-87fe-b4fef1c9a60a',	'2021-07-03 21:15:13.491+00',	'2021-07-03 21:15:13.491+00'),
('513186ae-fc02-496a-9aa8-a58347b7e669',	'cf9733ff-5a05-4bc7-93df-ba4335d2dbd7',	'2021-07-03 21:15:13.508+00',	'2021-07-03 21:15:13.508+00'),
('513186ae-fc02-496a-9aa8-a58347b7e669',	'b1e3fb1d-86f3-429e-806e-bcf64ea5378c',	'2021-07-03 21:15:13.52+00',	'2021-07-03 21:15:13.52+00'),
('513186ae-fc02-496a-9aa8-a58347b7e669',	'534b001b-f956-4f59-9293-fc6bde65278b',	'2021-07-03 21:15:13.534+00',	'2021-07-03 21:15:13.534+00'),
('513186ae-fc02-496a-9aa8-a58347b7e669',	'38b802fb-db8c-411c-975b-1b036efb9497',	'2021-07-03 21:15:13.548+00',	'2021-07-03 21:15:13.548+00'),
('b35269e1-7c78-4e9b-af1d-a237abafd4d6',	'295da0e4-7b22-476d-a2d4-961531abd5f5',	'2021-07-03 21:15:13.559+00',	'2021-07-03 21:15:13.559+00'),
('b35269e1-7c78-4e9b-af1d-a237abafd4d6',	'caf404a1-ea35-4995-972a-e84b0ae3a316',	'2021-07-03 21:15:13.575+00',	'2021-07-03 21:15:13.575+00'),
('b35269e1-7c78-4e9b-af1d-a237abafd4d6',	'da2a6aab-0f8a-40ec-8090-664a13981571',	'2021-07-03 21:15:13.587+00',	'2021-07-03 21:15:13.587+00'),
('b35269e1-7c78-4e9b-af1d-a237abafd4d6',	'60a7b4bb-829a-427a-a53f-9cb098d16479',	'2021-07-03 21:15:13.601+00',	'2021-07-03 21:15:13.601+00'),
('b35269e1-7c78-4e9b-af1d-a237abafd4d6',	'd38623b3-b74b-4916-9000-d235cd7b42c9',	'2021-07-03 21:15:13.614+00',	'2021-07-03 21:15:13.614+00'),
('b35269e1-7c78-4e9b-af1d-a237abafd4d6',	'dc9aaf95-c3aa-4e26-ae5e-100bd88ea065',	'2021-07-03 21:15:13.626+00',	'2021-07-03 21:15:13.626+00'),
('b35269e1-7c78-4e9b-af1d-a237abafd4d6',	'32307102-63ee-4dd9-b95a-55d32ef48b6a',	'2021-07-03 21:15:13.641+00',	'2021-07-03 21:15:13.641+00');

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


DROP TABLE IF EXISTS "question_type_question";
CREATE TABLE "public"."question_type_question" (
    "questionTypeId" uuid NOT NULL,
    "questionId" uuid NOT NULL,
    "createdAt" timestamptz DEFAULT now() NOT NULL,
    "updatedAt" timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT "question_type_question_pkey" PRIMARY KEY ("questionTypeId", "questionId"),
    CONSTRAINT "question_type_question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES question(id) ON DELETE RESTRICT NOT DEFERRABLE,
    CONSTRAINT "question_type_question_questionTypeId_fkey" FOREIGN KEY ("questionTypeId") REFERENCES question_type(id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

INSERT INTO "question_type_question" ("questionTypeId", "questionId", "createdAt", "updatedAt") VALUES
('54921666-0a7f-479d-aea0-80dd54badf25',	'1545dbb9-935f-4288-b1ab-c4dcda07b243',	'2021-07-03 21:15:12.822+00',	'2021-07-03 21:15:12.822+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'963ec013-84b6-4457-bc9c-94ae5691433e',	'2021-07-03 21:15:12.84+00',	'2021-07-03 21:15:12.84+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'b184cbdf-a3b4-445a-ba39-aa9b4888bacc',	'2021-07-03 21:15:12.856+00',	'2021-07-03 21:15:12.856+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'73107b1c-3c40-4347-8641-48ca2abf8d9b',	'2021-07-03 21:15:12.869+00',	'2021-07-03 21:15:12.869+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'c9e6f3fd-88f2-4235-813a-45d69d5346f5',	'2021-07-03 21:15:12.884+00',	'2021-07-03 21:15:12.884+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'fa3c19ff-198c-40a0-aef7-5502e16f504d',	'2021-07-03 21:15:12.906+00',	'2021-07-03 21:15:12.906+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'00084ad3-f202-4cd9-bb2c-ddd494290cb1',	'2021-07-03 21:15:12.92+00',	'2021-07-03 21:15:12.92+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'635a6919-50f3-4de2-b782-fa91b7e5ec63',	'2021-07-03 21:15:12.935+00',	'2021-07-03 21:15:12.935+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'9cbff2eb-d750-4f76-b5cf-99474ee689b6',	'2021-07-03 21:15:12.956+00',	'2021-07-03 21:15:12.956+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'6ab8fa46-8682-494f-9cb0-8888956cc589',	'2021-07-03 21:15:12.972+00',	'2021-07-03 21:15:12.972+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'8f8df9e0-15ad-4db3-9f2c-3295543e5b54',	'2021-07-03 21:15:12.988+00',	'2021-07-03 21:15:12.988+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'6df78df8-45b0-4537-b098-f82b6df2b898',	'2021-07-03 21:15:13.002+00',	'2021-07-03 21:15:13.002+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'a32948ef-0b03-463c-a109-4b9a0414756c',	'2021-07-03 21:15:13.016+00',	'2021-07-03 21:15:13.016+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'f65ab97d-112d-44b2-89ed-50805cd5b10c',	'2021-07-03 21:15:13.028+00',	'2021-07-03 21:15:13.028+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'0bd4a8dd-5265-4452-ac27-933a03638d42',	'2021-07-03 21:15:13.042+00',	'2021-07-03 21:15:13.042+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'd62ac586-9cbf-48b2-a832-50b19e00b194',	'2021-07-03 21:15:13.057+00',	'2021-07-03 21:15:13.057+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'c6346eef-5809-410e-a936-5f6c5c369623',	'2021-07-03 21:15:13.072+00',	'2021-07-03 21:15:13.072+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'37fa350f-7769-457e-8e12-fe2c44832ccd',	'2021-07-03 21:15:13.086+00',	'2021-07-03 21:15:13.086+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'13d3b056-10d8-472b-a04b-39627b33c1a7',	'2021-07-03 21:15:13.102+00',	'2021-07-03 21:15:13.102+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'35f36295-f964-4465-906d-64dc7dd87bf4',	'2021-07-03 21:15:13.119+00',	'2021-07-03 21:15:13.119+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'fee95ec5-3249-40c4-aab5-4400f5d4d3c4',	'2021-07-03 21:15:13.141+00',	'2021-07-03 21:15:13.141+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'85a21d75-a4a3-4397-81d0-fab21e5fdd5c',	'2021-07-03 21:15:13.154+00',	'2021-07-03 21:15:13.154+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'20b019cf-d66c-46a3-bf1a-8f3cc14992eb',	'2021-07-03 21:15:13.168+00',	'2021-07-03 21:15:13.168+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'1787c02a-54ad-40d8-8a23-a4c4137aaadf',	'2021-07-03 21:15:13.181+00',	'2021-07-03 21:15:13.181+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'7430358b-74b9-45eb-8de0-fc1f6c7a17e7',	'2021-07-03 21:15:13.195+00',	'2021-07-03 21:15:13.195+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'2ca32bac-5b6a-4311-885e-028f3ac25ddd',	'2021-07-03 21:15:13.209+00',	'2021-07-03 21:15:13.209+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'cec72f0c-b364-4e17-a994-45ae1567c2de',	'2021-07-03 21:15:13.224+00',	'2021-07-03 21:15:13.224+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'c06cc86b-a7f2-43f2-b56f-600c6fe483f0',	'2021-07-03 21:15:13.24+00',	'2021-07-03 21:15:13.24+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'2c3740c9-de48-4342-961d-31215cff508b',	'2021-07-03 21:15:13.254+00',	'2021-07-03 21:15:13.254+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'a46290d7-b4dd-47cb-88e0-cfe01b065e74',	'2021-07-03 21:15:13.267+00',	'2021-07-03 21:15:13.267+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'32102391-d7b1-418e-b30f-dbcb2f664810',	'2021-07-03 21:15:13.281+00',	'2021-07-03 21:15:13.281+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'7d05e926-7dce-465b-aadf-1011b92c7a77',	'2021-07-03 21:15:13.298+00',	'2021-07-03 21:15:13.298+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'd0477dca-c4c2-4624-8354-522e2e3870c7',	'2021-07-03 21:15:13.311+00',	'2021-07-03 21:15:13.311+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'52821397-5574-4c85-bd45-d504e9741b2b',	'2021-07-03 21:15:13.324+00',	'2021-07-03 21:15:13.324+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'e53be295-7563-4737-b3c6-c5318acb1b7f',	'2021-07-03 21:15:13.336+00',	'2021-07-03 21:15:13.336+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'742cc10e-3589-4d6d-bf36-a2274a821f54',	'2021-07-03 21:15:13.35+00',	'2021-07-03 21:15:13.35+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'3003a0bd-5b31-4d61-ba66-fed81034eae9',	'2021-07-03 21:15:13.363+00',	'2021-07-03 21:15:13.363+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'3f76bb59-cb65-46e9-a8f7-bbcdfde2b650',	'2021-07-03 21:15:13.377+00',	'2021-07-03 21:15:13.377+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'd90f3823-6d14-4591-aeaa-5ee42b6aeaa0',	'2021-07-03 21:15:13.392+00',	'2021-07-03 21:15:13.392+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'88b8ffa5-cc3b-4b2b-a33e-c117dc41255c',	'2021-07-03 21:15:13.405+00',	'2021-07-03 21:15:13.405+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'19bdb6be-2d14-403a-ba55-2d32190fe92b',	'2021-07-03 21:15:13.425+00',	'2021-07-03 21:15:13.425+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'a30334d7-c5a4-4173-a09d-f22f71eb6e6e',	'2021-07-03 21:15:13.438+00',	'2021-07-03 21:15:13.438+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'e072ae06-82bf-47f2-a241-2b8c329c57b7',	'2021-07-03 21:15:13.451+00',	'2021-07-03 21:15:13.451+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'b956bc12-beb6-491a-bb67-33b10e32217e',	'2021-07-03 21:15:13.466+00',	'2021-07-03 21:15:13.466+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'11477303-6dd5-4de4-813a-c15cfad37163',	'2021-07-03 21:15:13.478+00',	'2021-07-03 21:15:13.478+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'2a948a21-003f-475e-87fe-b4fef1c9a60a',	'2021-07-03 21:15:13.492+00',	'2021-07-03 21:15:13.492+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'cf9733ff-5a05-4bc7-93df-ba4335d2dbd7',	'2021-07-03 21:15:13.507+00',	'2021-07-03 21:15:13.507+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'b1e3fb1d-86f3-429e-806e-bcf64ea5378c',	'2021-07-03 21:15:13.522+00',	'2021-07-03 21:15:13.522+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'534b001b-f956-4f59-9293-fc6bde65278b',	'2021-07-03 21:15:13.534+00',	'2021-07-03 21:15:13.534+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'38b802fb-db8c-411c-975b-1b036efb9497',	'2021-07-03 21:15:13.547+00',	'2021-07-03 21:15:13.547+00'),
('b22a2e7b-591b-4abd-9b27-a77cb269daa6',	'295da0e4-7b22-476d-a2d4-961531abd5f5',	'2021-07-03 21:15:13.559+00',	'2021-07-03 21:15:13.559+00'),
('b22a2e7b-591b-4abd-9b27-a77cb269daa6',	'caf404a1-ea35-4995-972a-e84b0ae3a316',	'2021-07-03 21:15:13.574+00',	'2021-07-03 21:15:13.574+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'da2a6aab-0f8a-40ec-8090-664a13981571',	'2021-07-03 21:15:13.588+00',	'2021-07-03 21:15:13.588+00'),
('54921666-0a7f-479d-aea0-80dd54badf25',	'60a7b4bb-829a-427a-a53f-9cb098d16479',	'2021-07-03 21:15:13.6+00',	'2021-07-03 21:15:13.6+00'),
('b22a2e7b-591b-4abd-9b27-a77cb269daa6',	'd38623b3-b74b-4916-9000-d235cd7b42c9',	'2021-07-03 21:15:13.613+00',	'2021-07-03 21:15:13.613+00'),
('b22a2e7b-591b-4abd-9b27-a77cb269daa6',	'dc9aaf95-c3aa-4e26-ae5e-100bd88ea065',	'2021-07-03 21:15:13.627+00',	'2021-07-03 21:15:13.627+00'),
('b22a2e7b-591b-4abd-9b27-a77cb269daa6',	'32307102-63ee-4dd9-b95a-55d32ef48b6a',	'2021-07-03 21:15:13.64+00',	'2021-07-03 21:15:13.64+00');

DROP TABLE IF EXISTS "tag_question";
CREATE TABLE "public"."tag_question" (
    "questionId" uuid NOT NULL,
    "tagId" uuid NOT NULL,
    "createdAt" timestamptz DEFAULT now() NOT NULL,
    "updatedAt" timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT "tag_question_pkey" PRIMARY KEY ("questionId", "tagId"),
    CONSTRAINT "tag_question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES question(id) ON DELETE RESTRICT NOT DEFERRABLE,
    CONSTRAINT "tag_question_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES tag(id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

INSERT INTO "tag_question" ("questionId", "tagId", "createdAt", "updatedAt") VALUES
('9cbff2eb-d750-4f76-b5cf-99474ee689b6',	'aa4a1ad6-e5af-4ab2-a048-b1d83ec7f33d',	'2021-07-03 21:15:12.954+00',	'2021-07-03 21:15:12.954+00'),
('9cbff2eb-d750-4f76-b5cf-99474ee689b6',	'f99b8944-94a9-4a02-bdc5-83c142bf7467',	'2021-07-03 21:15:12.957+00',	'2021-07-03 21:15:12.957+00'),
('cec72f0c-b364-4e17-a994-45ae1567c2de',	'cc2dd0b6-893a-4bcb-8e32-c78c5f344936',	'2021-07-03 21:15:13.226+00',	'2021-07-03 21:15:13.226+00');

-- 2021-07-03 21:18:55.77472+00
