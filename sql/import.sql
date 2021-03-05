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
('040dc086-4f29-4bdb-ba47-9b4af8c32336',	'user1',	'user1@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'1',	'0',	NULL,	'2021-02-18 17:18:55.272+00',	'2021-02-18 17:18:55.272+00',	NULL),
('2758912f-fb92-4c23-8684-b1619feeefa2',	'user2',	'user2@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'1',	'0',	NULL,	'2021-02-18 17:18:55.354+00',	'2021-02-18 17:18:55.354+00',	NULL),
('73accf35-72f0-4f19-8df7-3081bb8aa245',	'user3',	'user3@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'1',	'0',	NULL,	'2021-02-18 17:18:55.381+00',	'2021-02-18 17:18:55.381+00',	NULL),
('940e9680-a5a6-482f-8c3b-fe1a620b548f',	'user4',	'user4@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'vip',	'member',	'1',	'1',	'0',	NULL,	'2021-02-18 17:18:55.411+00',	'2021-02-18 17:18:55.411+00',	NULL),
('1d658796-7f3e-4811-b6fe-6c55539736ad',	'user5',	'user5@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'premium',	'member',	'1',	'1',	'0',	NULL,	'2021-02-18 17:18:55.439+00',	'2021-02-18 17:18:55.439+00',	NULL),
('107c389d-9ae5-4ffd-a744-c5547b7e51a0',	'user6',	'user6@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'0',	'0',	NULL,	'2021-02-18 17:18:55.47+00',	'2021-02-18 17:18:55.47+00',	NULL),
('14e31b80-93de-4678-8692-883746da2ce8',	'user7',	'user7@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'0',	'0',	NULL,	'2021-02-18 17:18:55.497+00',	'2021-02-18 17:18:55.497+00',	NULL),
('3b8d6c45-63ae-4b9f-acb5-54e3e35626a8',	'user8',	'user8@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'1',	'1',	NULL,	'2021-02-18 17:18:55.527+00',	'2021-02-18 17:18:55.527+00',	NULL),
('d3c1986b-d137-4ef3-8a61-104173738013',	'user9',	'user9@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'1',	'1',	NULL,	'2021-02-18 17:18:55.555+00',	'2021-02-18 17:18:55.555+00',	NULL),
('8383d600-8673-424a-af1b-52ff83ce6cd8',	'reviewer1',	'reviewer1@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'reviewer',	'0',	'1',	'0',	NULL,	'2021-02-18 17:18:55.585+00',	'2021-02-18 17:18:55.585+00',	NULL),
('a0dbda0b-58c1-4583-9ac7-19c1e43075ff',	'reviewer2',	'reviewer2@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'vip',	'reviewer',	'0',	'1',	'0',	NULL,	'2021-02-18 17:18:55.613+00',	'2021-02-18 17:18:55.613+00',	NULL),
('7b418935-3cbe-4f53-8d1d-3814e5e90d06',	'admin1',	'admin1@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'vip',	'admin',	'0',	'1',	'0',	NULL,	'2021-02-18 17:18:55.644+00',	'2021-02-18 17:18:55.644+00',	NULL);


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
('ca199a35-6553-410c-a4f0-09f47ae5307b',	'histoire',	'Histoire',	'2021-02-18 17:18:50.347+00',	'2021-02-18 17:18:50.347+00'),
('3dd5bbc8-8a3e-4b01-ab5a-dc083619eb09',	'sport',	'Sport',	'2021-02-18 17:18:50.369+00',	'2021-02-18 17:18:50.369+00'),
('68d88207-d0a0-4a10-b37f-c62f67c0db01',	'jeu-video',	'Jeu vidéo',	'2021-02-18 17:18:50.396+00',	'2021-02-18 17:18:50.396+00'),
('0d813dc3-afc3-4d76-a2c3-7e704cb56801',	'cinema',	'Cinéma',	'2021-02-18 17:18:50.427+00',	'2021-02-18 17:18:50.427+00'),
('2243b66c-bbc1-4a03-93cc-9cda98574602',	'musique',	'Musique',	'2021-02-18 17:18:50.455+00',	'2021-02-18 17:18:50.455+00'),
('acdcfa63-7a11-4a0a-b0e9-9571dfaa577c',	'automobile',	'Automobile',	'2021-02-18 17:18:50.52+00',	'2021-02-18 17:18:50.52+00');

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
    "createdAt" timestamptz DEFAULT now() NOT NULL,
    "updatedAt" timestamptz DEFAULT now() NOT NULL,
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
('4cfb4c8f-3fc4-4067-978f-c2ea7d4f647c',	'medium',	'Combien fait 1 + 4 ?',	'{"answers": [{"content": "5", "is_good_answer": true}, {"content": "3", "is_good_answer": false}, {"content": "4", "is_good_answer": false}, {"content": "6", "is_good_answer": false}], "additional": {"responseMedia": {"url": "http://example.com/toto.png", "info": "0 + 0 égale ? ..."}}}',	'approved',	'{"url": "http://example.com/calculatrice.png", "type": "image/png"}',	NULL,	'2021-02-18 17:18:50.547+00',	'2021-02-18 17:18:50.547+00'),
('685178c9-468d-4309-96a2-70d45b69a1c2',	'medium',	'En quelle année, Mao a-t-il lancé sa révolution culturelle ?',	'{"answers": [{"content": "1814", "is_good_answer": false}, {"content": "1865", "is_good_answer": false}, {"content": "1920", "is_good_answer": false}, {"content": "1966", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:50.647+00',	'2021-02-18 17:18:50.647+00'),
('aa0efcca-542b-44e0-a2f3-f79e350b314d',	'medium',	'En quelle année les États-Unis ont-ils pris part à la Première Guerre mondiale ?',	'{"answers": [{"content": "1918", "is_good_answer": false}, {"content": "1915", "is_good_answer": false}, {"content": "1917", "is_good_answer": true}, {"content": "1916", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:50.718+00',	'2021-02-18 17:18:50.718+00'),
('b25c1ff8-cdd1-4610-899e-9a3759e4a168',	'medium',	'Quels Jeux olympiques ont été supprimés à cause de la Seconde Guerre mondiale ?',	'{"answers": [{"content": "1936 et 1940", "is_good_answer": false}, {"content": "1944 et 1948", "is_good_answer": false}, {"content": "1940 et 1944", "is_good_answer": true}, {"content": "1932 et 1936", "is_good_answer": false}], "additional": {"responseMedia": {"url": null, "info": "Les Jeux ont été rénovés par le baron Pierre de Coubertin à la fin du XIXe siècle."}}}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:50.795+00',	'2021-02-18 17:18:50.795+00'),
('fabf311e-88c6-4ef1-9299-9a6d03cda000',	'medium',	'Dans les plaines de quel champ de bataille se dresse la Butte du Lion ?',	'{"answers": [{"content": "Verdun", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": true}, {"content": "Austerlitz", "is_good_answer": false}, {"content": "Valmy", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:50.893+00',	'2021-02-18 17:18:50.893+00'),
('c358609b-3867-4118-8421-f5d7186955c6',	'medium',	'Quelle ligne de défense française fut contournée par les Allemands en 1940 ?',	'{"answers": [{"content": "La ligne Siegfried", "is_good_answer": false}, {"content": "La ligne Maginot", "is_good_answer": true}, {"content": "La ligne Verte", "is_good_answer": false}, {"content": "La ligne Daladier", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:50.999+00',	'2021-02-18 17:18:50.999+00'),
('62990505-cfed-4966-9530-666a8fc40b32',	'medium',	'Le général Cambronne, qui commandait la vieille garde, eut une conduite héroïque à...',	'{"answers": [{"content": "Wagram", "is_good_answer": false}, {"content": "Iena", "is_good_answer": false}, {"content": "Midway", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:51.108+00',	'2021-02-18 17:18:51.108+00'),
('a81603f9-ed38-40c9-a44b-65235339b1f9',	'medium',	'Où a eu lieu le grand procès des criminels de guerre nazis ?',	'{"answers": [{"content": "Berlin", "is_good_answer": false}, {"content": "Nuremberg", "is_good_answer": true}, {"content": "Hambourg", "is_good_answer": false}, {"content": "Munich", "is_good_answer": false}], "additional": {"responseMedia": {"url": null, "info": "Le procès de Nuremberg fut intenté contre 24 responsables du Troisième Reich."}}}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:51.185+00',	'2021-02-18 17:18:51.185+00'),
('01e2129e-d15b-4a8d-aa92-a6696248c63e',	'medium',	'Qui fut vainqueur de la Guerre de Troie, conflit légendaire de la mythologie grecque ?',	'{"answers": [{"content": "Sophocle", "is_good_answer": false}, {"content": "Ajax", "is_good_answer": false}, {"content": "Ulysse", "is_good_answer": true}, {"content": "Arkantos", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:51.265+00',	'2021-02-18 17:18:51.265+00'),
('e5c6d18b-49a8-4294-b5d9-e7716557d373',	'medium',	'En quelle année la bataille de Waterloo a-t-elle eu lieu, à vingt kilomètres au sud de Bruxelles ?',	'{"answers": [{"content": "1815", "is_good_answer": true}, {"content": "1831", "is_good_answer": false}, {"content": "1809", "is_good_answer": false}, {"content": "1824", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:51.35+00',	'2021-02-18 17:18:51.35+00'),
('043f77f2-0714-436d-9659-6d1ab747bdca',	'medium',	'Quel basketteur américain a été champion NBA en 1998 pour la sixième fois de sa carrière ?',	'{"answers": [{"content": "Patrick Ewing", "is_good_answer": false}, {"content": "Karl Malone", "is_good_answer": false}, {"content": "Charles Barkley", "is_good_answer": false}, {"content": "Michael Jordan", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:51.439+00',	'2021-02-18 17:18:51.439+00'),
('9e4b4708-bead-42de-a52a-b9dbfcc18b32',	'medium',	'Dans quelle pays est né le joueur de basket-ball professionnel Tony Parker ?',	'{"answers": [{"content": "Belgique", "is_good_answer": true}, {"content": "USA", "is_good_answer": false}, {"content": "France", "is_good_answer": false}, {"content": "Pologne", "is_good_answer": false}], "additional": {"responseMedia": {"url": null, "info": "Il évoluait dans l''équipe des Spurs de San Antonio depuis son arrivée dans la NBA en 2001."}}}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:51.524+00',	'2021-02-18 17:18:51.524+00'),
('4acbf143-48e7-4445-844b-a285fe0941ec',	'medium',	'Qui a été élu joueur de la décennie 2000 suite à un sondage du site officiel NBA ?',	'{"answers": [{"content": "Derek Fisher", "is_good_answer": false}, {"content": "Ron Harper", "is_good_answer": false}, {"content": "Kobe Bryant", "is_good_answer": true}, {"content": "Rick Fox", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:51.613+00',	'2021-02-18 17:18:51.613+00'),
('a49059c0-3eb7-48e1-b97d-a01a48f999fd',	'medium',	'Quel concours de dunks est organisé par la NBA durant le NBA All-Star Week-end ?',	'{"answers": [{"content": "Skills Challenge", "is_good_answer": false}, {"content": "Slam Dunk Contest", "is_good_answer": true}, {"content": "Three-point Shootout", "is_good_answer": false}, {"content": "All-Star Game", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:51.698+00',	'2021-02-18 17:18:51.698+00'),
('86bd4136-2a7a-4fce-82a4-52898993a66a',	'medium',	'Quel basketteur américain a réalisé en 2000 un 360 degrés inversé mythique ?',	'{"answers": [{"content": "Jarnell Stokes", "is_good_answer": false}, {"content": "Vince Carter", "is_good_answer": true}, {"content": "Marc Gasol", "is_good_answer": false}, {"content": "Andrew Harrison", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:51.787+00',	'2021-02-18 17:18:51.787+00'),
('f28cc813-c33d-48a2-8bc7-3571217d31e4',	'medium',	'Quel joueur de NBA se définit lui-même comme un « viking africain » ?',	'{"answers": [{"content": "Derrick Rose", "is_good_answer": false}, {"content": "Pau Gasol", "is_good_answer": false}, {"content": "Aaron Brooks", "is_good_answer": false}, {"content": "Joakim Noah", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:51.872+00',	'2021-02-18 17:18:51.872+00'),
('a2382e92-8fa1-4000-af48-05129958acdc',	'medium',	'Quel événement annuel majeur de la NBA est comparable à une bourse de joueurs ?',	'{"answers": [{"content": "La franchise", "is_good_answer": false}, {"content": "Les playoffs", "is_good_answer": false}, {"content": "Le ballotage", "is_good_answer": false}, {"content": "La draft", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:51.953+00',	'2021-02-18 17:18:51.953+00'),
('db3ea423-a11d-48d1-ad52-7b41737b47af',	'medium',	'Combien de titres de champion NBA Michael Jordan a-t-il obtenu ?',	'{"answers": [{"content": "Cinq", "is_good_answer": false}, {"content": "Sept", "is_good_answer": false}, {"content": "Six", "is_good_answer": true}, {"content": "Quatre", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:52.038+00',	'2021-02-18 17:18:52.038+00'),
('d6c31b82-0bff-4196-843f-e83226c2c8b4',	'medium',	'Qui est le premier joueur français à avoir été sacré champion NBA ?',	'{"answers": [{"content": "Joe Dumars", "is_good_answer": false}, {"content": "Paul Pierce", "is_good_answer": false}, {"content": "Tony Parker", "is_good_answer": true}, {"content": "Tim Duncan", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:52.126+00',	'2021-02-18 17:18:52.126+00'),
('cce61377-c1e6-4414-b9b5-1629ad576fd4',	'medium',	'Qui a été élu deux fois meilleur joueur de la NBA, en 2005 et 2006 ?',	'{"answers": [{"content": "Jeff Brown", "is_good_answer": false}, {"content": "Dana Jones", "is_good_answer": false}, {"content": "Marlon Garnett", "is_good_answer": false}, {"content": "Steve Nash", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:52.211+00',	'2021-02-18 17:18:52.211+00'),
('84d957a9-c730-4406-8bf3-2935b3a2de01',	'medium',	'Quel gagnant de la « Nouvelle Star », diffusée sur M6, est surnommé « La Tortue » ?',	'{"answers": [{"content": "Christophe Willem", "is_good_answer": true}, {"content": "Julien Doré", "is_good_answer": false}, {"content": "Jonatan Cerrada", "is_good_answer": false}, {"content": "Steeve Estatof", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:52.3+00',	'2021-02-18 17:18:52.3+00'),
('1a82de56-f874-4248-a17b-00215069ad43',	'medium',	'En 1991, quel tube Yannick Noah a-t-il associé à la victoire de la France en coupe Davis ?',	'{"answers": [{"content": "Vagabond", "is_good_answer": false}, {"content": "Les Lionnes", "is_good_answer": false}, {"content": "Saga Africa", "is_good_answer": true}, {"content": "Ose", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:52.388+00',	'2021-02-18 17:18:52.388+00'),
('96a8546e-b338-42a8-b1db-608a0c3fdac9',	'medium',	'Quel chanteur prénommé Mathieu a émergé du succès remporté par les Linkup ?',	'{"answers": [{"content": "Corneille", "is_good_answer": false}, {"content": "Keen''V", "is_good_answer": false}, {"content": "Raphaël", "is_good_answer": false}, {"content": "M. Pokora", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:52.491+00',	'2021-02-18 17:18:52.491+00'),
('d58d9b33-2bfd-42c9-b05f-50da4004bbad',	'medium',	'Quel est le style musical de l''album de Rohff, « La fierté des années » ?',	'{"answers": [{"content": "La Techno", "is_good_answer": false}, {"content": "Le tango", "is_good_answer": false}, {"content": "Le disco", "is_good_answer": false}, {"content": "Le rap", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:52.576+00',	'2021-02-18 17:18:52.576+00'),
('1c6436de-d432-4eff-8beb-c8d0f98a9e49',	'medium',	'Qui a chanté au pied de …onnes le 10 juin 2000 ?',	'{"answers": [{"content": "Eddy Mitchell", "is_good_answer": false}, {"content": "Patrick Bruel", "is_good_answer": false}, {"content": "Christophe Maé", "is_good_answer": false}, {"content": "Johnny Hallyday", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:52.75+00',	'2021-02-18 17:18:52.75+00'),
('f916ea5e-26ec-4cd6-ab67-963670a92f99',	'medium',	'Sous quel nom le rappeur et homme d''affaires américain Curtis Jackson fait-il carrière ?',	'{"answers": [{"content": "50 cent", "is_good_answer": true}, {"content": "Fat Joe", "is_good_answer": false}, {"content": "Big Sean", "is_good_answer": false}, {"content": "Mike D", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:52.838+00',	'2021-02-18 17:18:52.838+00'),
('9f41e25c-99a1-4ad8-9cdf-f3a6b15b414b',	'medium',	'Avec quel chanteur le top model Heidi Klum a-t-elle été mariée durant sept ans ?',	'{"answers": [{"content": "Seal", "is_good_answer": true}, {"content": "Paul McCartney", "is_good_answer": false}, {"content": "Sean Paul", "is_good_answer": false}, {"content": "Robbie Williams", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:52.915+00',	'2021-02-18 17:18:52.915+00'),
('62825dc4-1910-4d7f-bcda-ca0089ee2233',	'medium',	'Quel DJ a repris un titre des années 80 pour faire un tube avec « Living On Video » ?',	'{"answers": [{"content": "Pakito", "is_good_answer": true}, {"content": "Vitalic", "is_good_answer": false}, {"content": "Madeon", "is_good_answer": false}, {"content": "Brodinski", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:52.995+00',	'2021-02-18 17:18:52.995+00'),
('9e34fa26-2fa8-46e2-ae31-5f9e0f179ab6',	'medium',	'Quel chanteur a sorti « Musicology » puis « 3121 » deux ans plus tard ?',	'{"answers": [{"content": "Bob James", "is_good_answer": false}, {"content": "Al Jarreau", "is_good_answer": false}, {"content": "Prince", "is_good_answer": true}, {"content": "James Brown", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:53.08+00',	'2021-02-18 17:18:53.08+00'),
('09abd659-ba9f-4abe-8a9a-e03c91000cce',	'medium',	'À quel modèle de voiture ressemble le vieux tacot jaune que conduit Gaston Lagaffe ?',	'{"answers": [{"content": "Rolls-Royce", "is_good_answer": false}, {"content": "Citroën B10", "is_good_answer": false}, {"content": "Fiat 509", "is_good_answer": true}, {"content": "Jeep", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:53.245+00',	'2021-02-18 17:18:53.245+00'),
('cea8df60-5094-49ba-8e49-406ade8b1ec9',	'medium',	'Quel sport automobile consiste à accélérer le plus rapidement possible avec son véhicule ?',	'{"answers": [{"content": "Le trial", "is_good_answer": false}, {"content": "Le Drift", "is_good_answer": false}, {"content": "Le Monster truck", "is_good_answer": false}, {"content": "Le Dragster", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:53.335+00',	'2021-02-18 17:18:53.335+00'),
('b316ec62-d3fa-4683-80ba-4d62b1937c08',	'medium',	'Comment s''appelle le véhicule du personnage de bande dessinée Batman ?',	'{"answers": [{"content": "La BatDrive", "is_good_answer": false}, {"content": "La Batauto", "is_good_answer": false}, {"content": "La Batcar", "is_good_answer": false}, {"content": "La Batmobile", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:53.42+00',	'2021-02-18 17:18:53.42+00'),
('d4bd4bcd-5ee0-44fc-9010-fe8edb3045c7',	'medium',	'De quand date le Duster, véhicule utilitaire sport vendu par la marque roumaine Dacia ?',	'{"answers": [{"content": "2006", "is_good_answer": false}, {"content": "2008", "is_good_answer": false}, {"content": "2010", "is_good_answer": true}, {"content": "2012", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:53.509+00',	'2021-02-18 17:18:53.509+00'),
('3535550f-17e2-4a3f-ae10-393793546bda',	'medium',	'En France, refuser une priorité peut vous coûter combien de points sur le permis ?',	'{"answers": [{"content": "6 points", "is_good_answer": false}, {"content": "8 points", "is_good_answer": false}, {"content": "4 points", "is_good_answer": true}, {"content": "2 points", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:53.594+00',	'2021-02-18 17:18:53.594+00'),
('655eddd3-6037-450b-afb7-f9e22d805ea0',	'medium',	'Quelle principauté accueille l''un des plus prestigieux Grand Prix de Formule 1 ?',	'{"answers": [{"content": "Liechtenstein", "is_good_answer": false}, {"content": "Andorre", "is_good_answer": false}, {"content": "Mantoue", "is_good_answer": false}, {"content": "Monaco", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:53.674+00',	'2021-02-18 17:18:53.674+00'),
('288fbd3c-4578-4ae4-977e-62cba0bf5958',	'medium',	'Dans le monde automobile, quel sigle correspond au Grand Tourisme Injection ?',	'{"answers": [{"content": "sport", "is_good_answer": false}, {"content": "Gti", "is_good_answer": true}, {"content": "TT", "is_good_answer": false}, {"content": "Turbo", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:53.759+00',	'2021-02-18 17:18:53.759+00'),
('09d57b41-7e55-41d3-ada1-d9c8b9fb59cd',	'medium',	'Quel Américano-Libanais est entré dans les charts avec « Life in Cartoon Motion » ?',	'{"answers": [{"content": "Mika", "is_good_answer": true}, {"content": "Iwan", "is_good_answer": false}, {"content": "Rida", "is_good_answer": false}, {"content": "K. Maro", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:52.664+00',	'2021-02-18 17:18:52.664+00'),
('5f6446b5-185c-4bae-8e0b-6a7909c2d212',	'medium',	'Dans quel pays se situe le circuit de course automobile du Mans ?',	'{"answers": [{"content": "Pays-Bas", "is_good_answer": false}, {"content": "Suisse", "is_good_answer": false}, {"content": "Belgique", "is_good_answer": false}, {"content": "France", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:53.17+00',	'2021-02-18 17:18:53.17+00'),
('dfe76730-94d6-4dc5-bff6-631062cf8137',	'medium',	'Quelle société appartenant au groupe Belron « répare et remplace » votre pare-brise ?',	'{"answers": [{"content": "Carglass", "is_good_answer": true}, {"content": "Midas", "is_good_answer": false}, {"content": "Speedy", "is_good_answer": false}, {"content": "Norauto", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:53.848+00',	'2021-02-18 17:18:53.848+00'),
('07f2764c-58e0-41c4-8cd3-a6789cc08c21',	'medium',	'Dans quel jeu peux on voir des Chocobos ?',	'{"answers": [{"content": "Breath of fire", "is_good_answer": false}, {"content": "Final Fantasy", "is_good_answer": true}, {"content": "Secret of Mana", "is_good_answer": false}, {"content": "Golden stun", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:54.023+00',	'2021-02-18 17:18:54.023+00'),
('97432e07-08c2-47ca-a29b-34cf0fba68a6',	'medium',	'Dans quel jeu le personnage de Mario a-t-il été développé en premier ?',	'{"answers": [{"content": "Super Mario", "is_good_answer": false}, {"content": "Super Mario Bros", "is_good_answer": false}, {"content": "Donkey Kong", "is_good_answer": true}, {"content": "Mario Party", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:54.371+00',	'2021-02-18 17:18:54.371+00'),
('29b631c6-bce7-4e01-afe0-8a2edae88adb',	'medium',	'Dans Pac man qu''est ce qui hante le labyrinthe ?',	'{"answers": [{"content": "Des plantes carnivores", "is_good_answer": false}, {"content": "Des fantômes", "is_good_answer": true}, {"content": "Des squelettes", "is_good_answer": false}, {"content": "Des zombies", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:54.742+00',	'2021-02-18 17:18:54.742+00'),
('cb6ab820-b156-4d29-b609-ccee7b5b1816',	'medium',	'Qui est le compagnon de Batman ?',	'{"answers": [{"content": "Robin", "is_good_answer": true}]}',	'pending',	'{}',	NULL,	'2021-02-18 17:18:54.916+00',	'2021-02-18 17:18:54.916+00'),
('6e2407bf-2aec-4181-b9a3-d41f9ca329f4',	'medium',	'Quelle firme automobile, filiale française de FIAT, a ensuite intégré le groupe Chrysler ?',	'{"answers": [{"content": "Simca", "is_good_answer": true}, {"content": "Hommell", "is_good_answer": false}, {"content": "Packard", "is_good_answer": false}, {"content": "Triumph", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:53.933+00',	'2021-02-18 17:18:53.933+00'),
('87e82b1a-0af7-462c-ad17-c9245a27bd90',	'medium',	'Salamèche évolue en ',	'{"answers": [{"content": "Dracaufeu", "is_good_answer": false}, {"content": "Reptincel", "is_good_answer": true}, {"content": "Magna", "is_good_answer": false}, {"content": "Ptera", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:54.107+00',	'2021-02-18 17:18:54.107+00'),
('f53e47a5-47cf-4a40-bf7a-133d51b23a7e',	'medium',	'Zelda est un jeu du genre',	'{"answers": [{"content": "Aventure", "is_good_answer": true}, {"content": "RPG", "is_good_answer": false}, {"content": "Course", "is_good_answer": false}, {"content": "Simulation", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:54.197+00',	'2021-02-18 17:18:54.197+00'),
('7545f5e5-6c82-4e11-ba1d-1c69fee8c36f',	'medium',	'Sur quelle plateforme le jeu Tekken est sorti en premier ?',	'{"answers": [{"content": "La borne d''arcade", "is_good_answer": true}, {"content": "NES", "is_good_answer": false}, {"content": "Playstation", "is_good_answer": false}, {"content": "Gamecube", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:54.282+00',	'2021-02-18 17:18:54.282+00'),
('7f202c3e-456b-4e31-86d7-6428e2e02756',	'medium',	'La série Fallout est la suite « spirituelle » de quel jeu ?',	'{"answers": [{"content": "Wasteland", "is_good_answer": true}, {"content": "Homeland", "is_good_answer": false}, {"content": "Falland", "is_good_answer": false}, {"content": "Skyrim", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:54.464+00',	'2021-02-18 17:18:54.464+00'),
('a2cb11d0-b1de-48ac-9da7-ed849981f1e6',	'medium',	'Que signifie le nom de la serie GTA ?',	'{"answers": [{"content": "Burnout", "is_good_answer": false}, {"content": "Conduite dangeureuse", "is_good_answer": false}, {"content": "Vol de voiture", "is_good_answer": true}, {"content": "Voiture customisé", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:54.569+00',	'2021-02-18 17:18:54.569+00'),
('8e25cdd9-b414-4dfd-8ae9-ba2caf6bc42f',	'medium',	'Le jeu Counter Strike dérive de quel autre jeu ?',	'{"answers": [{"content": "Half Life", "is_good_answer": true}, {"content": "Splinter Cell", "is_good_answer": false}, {"content": "Doom", "is_good_answer": false}, {"content": "Call of Duty", "is_good_answer": false}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:54.655+00',	'2021-02-18 17:18:54.655+00'),
('36c8238e-69ce-4880-bef5-918f71960b2e',	'medium',	'Dans la légende de Zelda, comment s''appelle le héros ?',	'{"answers": [{"content": "Zelda", "is_good_answer": false}, {"content": "Bruno", "is_good_answer": false}, {"content": "Ganondorf", "is_good_answer": false}, {"content": "Link", "is_good_answer": true}]}',	'approved',	'{}',	NULL,	'2021-02-18 17:18:54.828+00',	'2021-02-18 17:18:54.828+00'),
('d514e062-6be4-4b6f-84fb-9de7bb2510d0',	'medium',	'Quel super héros ne se sépare jamais de son marteau forgé par les nains ',	'{"answers": [{"content": "Thor", "is_good_answer": true}]}',	'pending',	'{}',	NULL,	'2021-02-18 17:18:55.002+00',	'2021-02-18 17:18:55.002+00'),
('0a160782-9671-4b94-83ec-46a26a2d5cad',	'medium',	'Quel super-héros à la force surhumaine ressemble à un être de pierre ?',	'{"answers": [{"content": "Hawkman", "is_good_answer": false}, {"content": "Plastic Man", "is_good_answer": false}, {"content": "Superboy", "is_good_answer": false}, {"content": "La Chose", "is_good_answer": true}]}',	'disapproved',	'{}',	NULL,	'2021-02-18 17:18:55.09+00',	'2021-02-18 17:18:55.09+00'),
('05a47019-448c-4a75-a042-5b761b48c47a',	'medium',	'Quel super-héros porte un costume inspiré du drapeau américain ?',	'{"answers": [{"content": "Tigra", "is_good_answer": false}, {"content": "Iron Man", "is_good_answer": false}, {"content": "Blade", "is_good_answer": false}, {"content": "Captain America", "is_good_answer": true}]}',	'disapproved',	'{}',	NULL,	'2021-02-18 17:18:55.183+00',	'2021-02-18 17:18:55.183+00');

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
    "createdAt" timestamptz DEFAULT now() NOT NULL,
    "updatedAt" timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT "category_question_pkey" PRIMARY KEY ("categoryId", "questionId"),
    CONSTRAINT "category_question_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES category(id) ON DELETE RESTRICT NOT DEFERRABLE,
    CONSTRAINT "category_question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES question(id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

INSERT INTO "category_question" ("categoryId", "questionId", "createdAt", "updatedAt") VALUES
('ca199a35-6553-410c-a4f0-09f47ae5307b',	'4cfb4c8f-3fc4-4067-978f-c2ea7d4f647c',	'2021-02-18 17:18:50.583+00',	'2021-02-18 17:18:50.583+00'),
('ca199a35-6553-410c-a4f0-09f47ae5307b',	'685178c9-468d-4309-96a2-70d45b69a1c2',	'2021-02-18 17:18:50.667+00',	'2021-02-18 17:18:50.667+00'),
('ca199a35-6553-410c-a4f0-09f47ae5307b',	'aa0efcca-542b-44e0-a2f3-f79e350b314d',	'2021-02-18 17:18:50.745+00',	'2021-02-18 17:18:50.745+00'),
('ca199a35-6553-410c-a4f0-09f47ae5307b',	'b25c1ff8-cdd1-4610-899e-9a3759e4a168',	'2021-02-18 17:18:50.824+00',	'2021-02-18 17:18:50.824+00'),
('ca199a35-6553-410c-a4f0-09f47ae5307b',	'fabf311e-88c6-4ef1-9299-9a6d03cda000',	'2021-02-18 17:18:50.918+00',	'2021-02-18 17:18:50.918+00'),
('ca199a35-6553-410c-a4f0-09f47ae5307b',	'c358609b-3867-4118-8421-f5d7186955c6',	'2021-02-18 17:18:51.049+00',	'2021-02-18 17:18:51.049+00'),
('ca199a35-6553-410c-a4f0-09f47ae5307b',	'62990505-cfed-4966-9530-666a8fc40b32',	'2021-02-18 17:18:51.133+00',	'2021-02-18 17:18:51.133+00'),
('ca199a35-6553-410c-a4f0-09f47ae5307b',	'a81603f9-ed38-40c9-a44b-65235339b1f9',	'2021-02-18 17:18:51.214+00',	'2021-02-18 17:18:51.214+00'),
('ca199a35-6553-410c-a4f0-09f47ae5307b',	'01e2129e-d15b-4a8d-aa92-a6696248c63e',	'2021-02-18 17:18:51.291+00',	'2021-02-18 17:18:51.291+00'),
('ca199a35-6553-410c-a4f0-09f47ae5307b',	'e5c6d18b-49a8-4294-b5d9-e7716557d373',	'2021-02-18 17:18:51.38+00',	'2021-02-18 17:18:51.38+00'),
('3dd5bbc8-8a3e-4b01-ab5a-dc083619eb09',	'043f77f2-0714-436d-9659-6d1ab747bdca',	'2021-02-18 17:18:51.465+00',	'2021-02-18 17:18:51.465+00'),
('3dd5bbc8-8a3e-4b01-ab5a-dc083619eb09',	'9e4b4708-bead-42de-a52a-b9dbfcc18b32',	'2021-02-18 17:18:51.553+00',	'2021-02-18 17:18:51.553+00'),
('3dd5bbc8-8a3e-4b01-ab5a-dc083619eb09',	'4acbf143-48e7-4445-844b-a285fe0941ec',	'2021-02-18 17:18:51.648+00',	'2021-02-18 17:18:51.648+00'),
('3dd5bbc8-8a3e-4b01-ab5a-dc083619eb09',	'a49059c0-3eb7-48e1-b97d-a01a48f999fd',	'2021-02-18 17:18:51.727+00',	'2021-02-18 17:18:51.727+00'),
('3dd5bbc8-8a3e-4b01-ab5a-dc083619eb09',	'86bd4136-2a7a-4fce-82a4-52898993a66a',	'2021-02-18 17:18:51.813+00',	'2021-02-18 17:18:51.813+00'),
('3dd5bbc8-8a3e-4b01-ab5a-dc083619eb09',	'f28cc813-c33d-48a2-8bc7-3571217d31e4',	'2021-02-18 17:18:51.901+00',	'2021-02-18 17:18:51.901+00'),
('3dd5bbc8-8a3e-4b01-ab5a-dc083619eb09',	'a2382e92-8fa1-4000-af48-05129958acdc',	'2021-02-18 17:18:51.978+00',	'2021-02-18 17:18:51.978+00'),
('3dd5bbc8-8a3e-4b01-ab5a-dc083619eb09',	'db3ea423-a11d-48d1-ad52-7b41737b47af',	'2021-02-18 17:18:52.076+00',	'2021-02-18 17:18:52.076+00'),
('3dd5bbc8-8a3e-4b01-ab5a-dc083619eb09',	'd6c31b82-0bff-4196-843f-e83226c2c8b4',	'2021-02-18 17:18:52.152+00',	'2021-02-18 17:18:52.152+00'),
('3dd5bbc8-8a3e-4b01-ab5a-dc083619eb09',	'cce61377-c1e6-4414-b9b5-1629ad576fd4',	'2021-02-18 17:18:52.24+00',	'2021-02-18 17:18:52.24+00'),
('2243b66c-bbc1-4a03-93cc-9cda98574602',	'84d957a9-c730-4406-8bf3-2935b3a2de01',	'2021-02-18 17:18:52.327+00',	'2021-02-18 17:18:52.327+00'),
('2243b66c-bbc1-4a03-93cc-9cda98574602',	'1a82de56-f874-4248-a17b-00215069ad43',	'2021-02-18 17:18:52.423+00',	'2021-02-18 17:18:52.423+00'),
('2243b66c-bbc1-4a03-93cc-9cda98574602',	'96a8546e-b338-42a8-b1db-608a0c3fdac9',	'2021-02-18 17:18:52.524+00',	'2021-02-18 17:18:52.524+00'),
('2243b66c-bbc1-4a03-93cc-9cda98574602',	'd58d9b33-2bfd-42c9-b05f-50da4004bbad',	'2021-02-18 17:18:52.605+00',	'2021-02-18 17:18:52.605+00'),
('2243b66c-bbc1-4a03-93cc-9cda98574602',	'09d57b41-7e55-41d3-ada1-d9c8b9fb59cd',	'2021-02-18 17:18:52.691+00',	'2021-02-18 17:18:52.691+00'),
('2243b66c-bbc1-4a03-93cc-9cda98574602',	'1c6436de-d432-4eff-8beb-c8d0f98a9e49',	'2021-02-18 17:18:52.78+00',	'2021-02-18 17:18:52.78+00'),
('2243b66c-bbc1-4a03-93cc-9cda98574602',	'f916ea5e-26ec-4cd6-ab67-963670a92f99',	'2021-02-18 17:18:52.864+00',	'2021-02-18 17:18:52.864+00'),
('2243b66c-bbc1-4a03-93cc-9cda98574602',	'9f41e25c-99a1-4ad8-9cdf-f3a6b15b414b',	'2021-02-18 17:18:52.945+00',	'2021-02-18 17:18:52.945+00'),
('2243b66c-bbc1-4a03-93cc-9cda98574602',	'62825dc4-1910-4d7f-bcda-ca0089ee2233',	'2021-02-18 17:18:53.022+00',	'2021-02-18 17:18:53.022+00'),
('2243b66c-bbc1-4a03-93cc-9cda98574602',	'9e34fa26-2fa8-46e2-ae31-5f9e0f179ab6',	'2021-02-18 17:18:53.111+00',	'2021-02-18 17:18:53.111+00'),
('acdcfa63-7a11-4a0a-b0e9-9571dfaa577c',	'5f6446b5-185c-4bae-8e0b-6a7909c2d212',	'2021-02-18 17:18:53.195+00',	'2021-02-18 17:18:53.195+00'),
('acdcfa63-7a11-4a0a-b0e9-9571dfaa577c',	'09abd659-ba9f-4abe-8a9a-e03c91000cce',	'2021-02-18 17:18:53.275+00',	'2021-02-18 17:18:53.275+00'),
('acdcfa63-7a11-4a0a-b0e9-9571dfaa577c',	'cea8df60-5094-49ba-8e49-406ade8b1ec9',	'2021-02-18 17:18:53.361+00',	'2021-02-18 17:18:53.361+00'),
('acdcfa63-7a11-4a0a-b0e9-9571dfaa577c',	'b316ec62-d3fa-4683-80ba-4d62b1937c08',	'2021-02-18 17:18:53.45+00',	'2021-02-18 17:18:53.45+00'),
('acdcfa63-7a11-4a0a-b0e9-9571dfaa577c',	'd4bd4bcd-5ee0-44fc-9010-fe8edb3045c7',	'2021-02-18 17:18:53.534+00',	'2021-02-18 17:18:53.534+00'),
('acdcfa63-7a11-4a0a-b0e9-9571dfaa577c',	'3535550f-17e2-4a3f-ae10-393793546bda',	'2021-02-18 17:18:53.623+00',	'2021-02-18 17:18:53.623+00'),
('acdcfa63-7a11-4a0a-b0e9-9571dfaa577c',	'655eddd3-6037-450b-afb7-f9e22d805ea0',	'2021-02-18 17:18:53.701+00',	'2021-02-18 17:18:53.701+00'),
('acdcfa63-7a11-4a0a-b0e9-9571dfaa577c',	'288fbd3c-4578-4ae4-977e-62cba0bf5958',	'2021-02-18 17:18:53.789+00',	'2021-02-18 17:18:53.789+00'),
('acdcfa63-7a11-4a0a-b0e9-9571dfaa577c',	'dfe76730-94d6-4dc5-bff6-631062cf8137',	'2021-02-18 17:18:53.875+00',	'2021-02-18 17:18:53.875+00'),
('acdcfa63-7a11-4a0a-b0e9-9571dfaa577c',	'6e2407bf-2aec-4181-b9a3-d41f9ca329f4',	'2021-02-18 17:18:53.963+00',	'2021-02-18 17:18:53.963+00'),
('68d88207-d0a0-4a10-b37f-c62f67c0db01',	'07f2764c-58e0-41c4-8cd3-a6789cc08c21',	'2021-02-18 17:18:54.049+00',	'2021-02-18 17:18:54.049+00'),
('68d88207-d0a0-4a10-b37f-c62f67c0db01',	'87e82b1a-0af7-462c-ad17-c9245a27bd90',	'2021-02-18 17:18:54.137+00',	'2021-02-18 17:18:54.137+00'),
('68d88207-d0a0-4a10-b37f-c62f67c0db01',	'f53e47a5-47cf-4a40-bf7a-133d51b23a7e',	'2021-02-18 17:18:54.222+00',	'2021-02-18 17:18:54.222+00'),
('68d88207-d0a0-4a10-b37f-c62f67c0db01',	'7545f5e5-6c82-4e11-ba1d-1c69fee8c36f',	'2021-02-18 17:18:54.31+00',	'2021-02-18 17:18:54.31+00'),
('68d88207-d0a0-4a10-b37f-c62f67c0db01',	'97432e07-08c2-47ca-a29b-34cf0fba68a6',	'2021-02-18 17:18:54.405+00',	'2021-02-18 17:18:54.405+00'),
('68d88207-d0a0-4a10-b37f-c62f67c0db01',	'7f202c3e-456b-4e31-86d7-6428e2e02756',	'2021-02-18 17:18:54.509+00',	'2021-02-18 17:18:54.509+00'),
('68d88207-d0a0-4a10-b37f-c62f67c0db01',	'a2cb11d0-b1de-48ac-9da7-ed849981f1e6',	'2021-02-18 17:18:54.595+00',	'2021-02-18 17:18:54.595+00'),
('68d88207-d0a0-4a10-b37f-c62f67c0db01',	'8e25cdd9-b414-4dfd-8ae9-ba2caf6bc42f',	'2021-02-18 17:18:54.683+00',	'2021-02-18 17:18:54.683+00'),
('68d88207-d0a0-4a10-b37f-c62f67c0db01',	'29b631c6-bce7-4e01-afe0-8a2edae88adb',	'2021-02-18 17:18:54.769+00',	'2021-02-18 17:18:54.769+00'),
('68d88207-d0a0-4a10-b37f-c62f67c0db01',	'36c8238e-69ce-4880-bef5-918f71960b2e',	'2021-02-18 17:18:54.857+00',	'2021-02-18 17:18:54.857+00'),
('0d813dc3-afc3-4d76-a2c3-7e704cb56801',	'cb6ab820-b156-4d29-b609-ccee7b5b1816',	'2021-02-18 17:18:54.943+00',	'2021-02-18 17:18:54.943+00'),
('0d813dc3-afc3-4d76-a2c3-7e704cb56801',	'd514e062-6be4-4b6f-84fb-9de7bb2510d0',	'2021-02-18 17:18:55.031+00',	'2021-02-18 17:18:55.031+00'),
('0d813dc3-afc3-4d76-a2c3-7e704cb56801',	'0a160782-9671-4b94-83ec-46a26a2d5cad',	'2021-02-18 17:18:55.125+00',	'2021-02-18 17:18:55.125+00'),
('0d813dc3-afc3-4d76-a2c3-7e704cb56801',	'05a47019-448c-4a75-a042-5b761b48c47a',	'2021-02-18 17:18:55.213+00',	'2021-02-18 17:18:55.213+00');

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
('a0a68160-64d5-4913-988b-1efb68d328a4',	'qcm',	'QCM',	'0',	'2021-02-18 17:18:50.257+00',	'2021-02-18 17:18:50.257+00'),
('a11c1ab1-e437-4b4a-8c6d-7fe2dc85d927',	'input',	'Réponse libre',	'0',	'2021-02-18 17:18:50.289+00',	'2021-02-18 17:18:50.289+00'),
('ae325a3a-6975-4245-b9de-99473183aa26',	'blind-test',	'Blind Test',	'1',	'2021-02-18 17:18:50.311+00',	'2021-02-18 17:18:50.311+00');

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
    "createdAt" timestamptz DEFAULT now() NOT NULL,
    "updatedAt" timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT "question_type_question_pkey" PRIMARY KEY ("questionTypeId", "questionId"),
    CONSTRAINT "question_type_question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES question(id) ON DELETE RESTRICT NOT DEFERRABLE,
    CONSTRAINT "question_type_question_questionTypeId_fkey" FOREIGN KEY ("questionTypeId") REFERENCES question_type(id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

INSERT INTO "question_type_question" ("questionTypeId", "questionId", "createdAt", "updatedAt") VALUES
('a0a68160-64d5-4913-988b-1efb68d328a4',	'4cfb4c8f-3fc4-4067-978f-c2ea7d4f647c',	'2021-02-18 17:18:50.581+00',	'2021-02-18 17:18:50.581+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'685178c9-468d-4309-96a2-70d45b69a1c2',	'2021-02-18 17:18:50.668+00',	'2021-02-18 17:18:50.668+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'aa0efcca-542b-44e0-a2f3-f79e350b314d',	'2021-02-18 17:18:50.744+00',	'2021-02-18 17:18:50.744+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'b25c1ff8-cdd1-4610-899e-9a3759e4a168',	'2021-02-18 17:18:50.825+00',	'2021-02-18 17:18:50.825+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'fabf311e-88c6-4ef1-9299-9a6d03cda000',	'2021-02-18 17:18:50.919+00',	'2021-02-18 17:18:50.919+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'c358609b-3867-4118-8421-f5d7186955c6',	'2021-02-18 17:18:51.049+00',	'2021-02-18 17:18:51.049+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'62990505-cfed-4966-9530-666a8fc40b32',	'2021-02-18 17:18:51.134+00',	'2021-02-18 17:18:51.134+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'a81603f9-ed38-40c9-a44b-65235339b1f9',	'2021-02-18 17:18:51.215+00',	'2021-02-18 17:18:51.215+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'01e2129e-d15b-4a8d-aa92-a6696248c63e',	'2021-02-18 17:18:51.294+00',	'2021-02-18 17:18:51.294+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'e5c6d18b-49a8-4294-b5d9-e7716557d373',	'2021-02-18 17:18:51.379+00',	'2021-02-18 17:18:51.379+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'043f77f2-0714-436d-9659-6d1ab747bdca',	'2021-02-18 17:18:51.464+00',	'2021-02-18 17:18:51.464+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'9e4b4708-bead-42de-a52a-b9dbfcc18b32',	'2021-02-18 17:18:51.554+00',	'2021-02-18 17:18:51.554+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'4acbf143-48e7-4445-844b-a285fe0941ec',	'2021-02-18 17:18:51.647+00',	'2021-02-18 17:18:51.647+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'a49059c0-3eb7-48e1-b97d-a01a48f999fd',	'2021-02-18 17:18:51.728+00',	'2021-02-18 17:18:51.728+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'86bd4136-2a7a-4fce-82a4-52898993a66a',	'2021-02-18 17:18:51.812+00',	'2021-02-18 17:18:51.812+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'f28cc813-c33d-48a2-8bc7-3571217d31e4',	'2021-02-18 17:18:51.901+00',	'2021-02-18 17:18:51.901+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'a2382e92-8fa1-4000-af48-05129958acdc',	'2021-02-18 17:18:51.979+00',	'2021-02-18 17:18:51.979+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'db3ea423-a11d-48d1-ad52-7b41737b47af',	'2021-02-18 17:18:52.075+00',	'2021-02-18 17:18:52.075+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'd6c31b82-0bff-4196-843f-e83226c2c8b4',	'2021-02-18 17:18:52.152+00',	'2021-02-18 17:18:52.152+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'cce61377-c1e6-4414-b9b5-1629ad576fd4',	'2021-02-18 17:18:52.241+00',	'2021-02-18 17:18:52.241+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'84d957a9-c730-4406-8bf3-2935b3a2de01',	'2021-02-18 17:18:52.326+00',	'2021-02-18 17:18:52.326+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'1a82de56-f874-4248-a17b-00215069ad43',	'2021-02-18 17:18:52.424+00',	'2021-02-18 17:18:52.424+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'96a8546e-b338-42a8-b1db-608a0c3fdac9',	'2021-02-18 17:18:52.525+00',	'2021-02-18 17:18:52.525+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'd58d9b33-2bfd-42c9-b05f-50da4004bbad',	'2021-02-18 17:18:52.607+00',	'2021-02-18 17:18:52.607+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'09d57b41-7e55-41d3-ada1-d9c8b9fb59cd',	'2021-02-18 17:18:52.69+00',	'2021-02-18 17:18:52.69+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'1c6436de-d432-4eff-8beb-c8d0f98a9e49',	'2021-02-18 17:18:52.781+00',	'2021-02-18 17:18:52.781+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'f916ea5e-26ec-4cd6-ab67-963670a92f99',	'2021-02-18 17:18:52.864+00',	'2021-02-18 17:18:52.864+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'9f41e25c-99a1-4ad8-9cdf-f3a6b15b414b',	'2021-02-18 17:18:52.945+00',	'2021-02-18 17:18:52.945+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'62825dc4-1910-4d7f-bcda-ca0089ee2233',	'2021-02-18 17:18:53.021+00',	'2021-02-18 17:18:53.021+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'9e34fa26-2fa8-46e2-ae31-5f9e0f179ab6',	'2021-02-18 17:18:53.11+00',	'2021-02-18 17:18:53.11+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'5f6446b5-185c-4bae-8e0b-6a7909c2d212',	'2021-02-18 17:18:53.195+00',	'2021-02-18 17:18:53.195+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'09abd659-ba9f-4abe-8a9a-e03c91000cce',	'2021-02-18 17:18:53.276+00',	'2021-02-18 17:18:53.276+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'cea8df60-5094-49ba-8e49-406ade8b1ec9',	'2021-02-18 17:18:53.36+00',	'2021-02-18 17:18:53.36+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'b316ec62-d3fa-4683-80ba-4d62b1937c08',	'2021-02-18 17:18:53.45+00',	'2021-02-18 17:18:53.45+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'd4bd4bcd-5ee0-44fc-9010-fe8edb3045c7',	'2021-02-18 17:18:53.535+00',	'2021-02-18 17:18:53.535+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'3535550f-17e2-4a3f-ae10-393793546bda',	'2021-02-18 17:18:53.624+00',	'2021-02-18 17:18:53.624+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'655eddd3-6037-450b-afb7-f9e22d805ea0',	'2021-02-18 17:18:53.7+00',	'2021-02-18 17:18:53.7+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'288fbd3c-4578-4ae4-977e-62cba0bf5958',	'2021-02-18 17:18:53.789+00',	'2021-02-18 17:18:53.789+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'dfe76730-94d6-4dc5-bff6-631062cf8137',	'2021-02-18 17:18:53.874+00',	'2021-02-18 17:18:53.874+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'6e2407bf-2aec-4181-b9a3-d41f9ca329f4',	'2021-02-18 17:18:53.966+00',	'2021-02-18 17:18:53.966+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'07f2764c-58e0-41c4-8cd3-a6789cc08c21',	'2021-02-18 17:18:54.048+00',	'2021-02-18 17:18:54.048+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'87e82b1a-0af7-462c-ad17-c9245a27bd90',	'2021-02-18 17:18:54.137+00',	'2021-02-18 17:18:54.137+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'f53e47a5-47cf-4a40-bf7a-133d51b23a7e',	'2021-02-18 17:18:54.222+00',	'2021-02-18 17:18:54.222+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'7545f5e5-6c82-4e11-ba1d-1c69fee8c36f',	'2021-02-18 17:18:54.311+00',	'2021-02-18 17:18:54.311+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'97432e07-08c2-47ca-a29b-34cf0fba68a6',	'2021-02-18 17:18:54.404+00',	'2021-02-18 17:18:54.404+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'7f202c3e-456b-4e31-86d7-6428e2e02756',	'2021-02-18 17:18:54.51+00',	'2021-02-18 17:18:54.51+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'a2cb11d0-b1de-48ac-9da7-ed849981f1e6',	'2021-02-18 17:18:54.596+00',	'2021-02-18 17:18:54.596+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'8e25cdd9-b414-4dfd-8ae9-ba2caf6bc42f',	'2021-02-18 17:18:54.682+00',	'2021-02-18 17:18:54.682+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'29b631c6-bce7-4e01-afe0-8a2edae88adb',	'2021-02-18 17:18:54.768+00',	'2021-02-18 17:18:54.768+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'36c8238e-69ce-4880-bef5-918f71960b2e',	'2021-02-18 17:18:54.857+00',	'2021-02-18 17:18:54.857+00'),
('a11c1ab1-e437-4b4a-8c6d-7fe2dc85d927',	'cb6ab820-b156-4d29-b609-ccee7b5b1816',	'2021-02-18 17:18:54.942+00',	'2021-02-18 17:18:54.942+00'),
('a11c1ab1-e437-4b4a-8c6d-7fe2dc85d927',	'd514e062-6be4-4b6f-84fb-9de7bb2510d0',	'2021-02-18 17:18:55.03+00',	'2021-02-18 17:18:55.03+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'0a160782-9671-4b94-83ec-46a26a2d5cad',	'2021-02-18 17:18:55.124+00',	'2021-02-18 17:18:55.124+00'),
('a0a68160-64d5-4913-988b-1efb68d328a4',	'05a47019-448c-4a75-a042-5b761b48c47a',	'2021-02-18 17:18:55.213+00',	'2021-02-18 17:18:55.213+00');

DROP TABLE IF EXISTS "refresh_token";
CREATE TABLE "public"."refresh_token" (
    "token" text NOT NULL,
    "userId" uuid,
    "expirationDate" timestamptz NOT NULL,
    CONSTRAINT "refresh_token_token" PRIMARY KEY ("token"),
    CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

-- 2021-02-13 21:09:39.56042+00
