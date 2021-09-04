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
('1ea8d566-fc22-4bb8-8fba-f0b350e51088',	'histoire',	'Histoire',	'2021-09-04 10:04:59.777+00',	'2021-09-04 10:04:59.777+00'),
('9abaf669-6852-4310-99fe-a77822ad5429',	'sport',	'Sport',	'2021-09-04 10:04:59.783+00',	'2021-09-04 10:04:59.783+00'),
('07578a1e-7dec-4a8b-a0d7-419d9c972fbf',	'jeu-video',	'Jeu vidéo',	'2021-09-04 10:04:59.787+00',	'2021-09-04 10:04:59.787+00'),
('6bcc9131-a300-448a-a413-ccf7831803ba',	'cinema',	'Cinéma',	'2021-09-04 10:04:59.792+00',	'2021-09-04 10:04:59.792+00'),
('f2154375-1207-4e14-9fe0-b95380a8a35f',	'musique',	'Musique',	'2021-09-04 10:04:59.797+00',	'2021-09-04 10:04:59.797+00'),
('8aadbdfc-ea0c-41ab-a1d4-4ca438394346',	'automobile',	'Automobile',	'2021-09-04 10:04:59.801+00',	'2021-09-04 10:04:59.801+00');

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
('701460a2-6308-4a67-890f-4fe80310c75a',	'user1',	'user1@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'1',	'0',	NULL,	'2021-09-04 10:05:00.577+00',	'2021-09-04 10:05:00.577+00',	NULL),
('4e894c4d-13fd-4361-827e-2084163e91c4',	'user2',	'user2@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'1',	'0',	NULL,	'2021-09-04 10:05:00.587+00',	'2021-09-04 10:05:00.587+00',	NULL),
('60064924-9220-4bc1-a558-9c3edc3726c1',	'user3',	'user3@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'1',	'0',	NULL,	'2021-09-04 10:05:00.596+00',	'2021-09-04 10:05:00.596+00',	NULL),
('13bb8588-90a8-4e59-ac87-268c5082a985',	'user4',	'user4@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'vip',	'member',	'1',	'1',	'0',	NULL,	'2021-09-04 10:05:00.601+00',	'2021-09-04 10:05:00.601+00',	NULL),
('60d627c7-28bf-4cc7-83d7-9f3af07ff86c',	'user5',	'user5@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'premium',	'member',	'1',	'1',	'0',	NULL,	'2021-09-04 10:05:00.607+00',	'2021-09-04 10:05:00.607+00',	NULL),
('02c4dd09-52b5-485f-a78a-bfacf371411f',	'user6',	'user6@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'0',	'0',	NULL,	'2021-09-04 10:05:00.614+00',	'2021-09-04 10:05:00.614+00',	NULL),
('f30acb3d-e843-47f2-8c69-6a3816b7c235',	'user7',	'user7@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'0',	'0',	NULL,	'2021-09-04 10:05:00.62+00',	'2021-09-04 10:05:00.62+00',	NULL),
('6bd9ee75-51d4-4200-bea9-75d9eb04b577',	'user8',	'user8@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'1',	'1',	NULL,	'2021-09-04 10:05:00.626+00',	'2021-09-04 10:05:00.626+00',	NULL),
('5c570146-c0a3-4e54-91e2-4d12256cd9ec',	'user9',	'user9@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'member',	'0',	'1',	'1',	NULL,	'2021-09-04 10:05:00.632+00',	'2021-09-04 10:05:00.632+00',	NULL),
('549bab4b-b9e1-4878-b89b-6e97bb36f0fe',	'reviewer1',	'reviewer1@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'free',	'reviewer',	'0',	'1',	'0',	NULL,	'2021-09-04 10:05:00.636+00',	'2021-09-04 10:05:00.636+00',	NULL),
('fff73dfa-4808-47ab-bb25-db0491bcbbd0',	'reviewer2',	'reviewer2@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'vip',	'reviewer',	'0',	'1',	'0',	NULL,	'2021-09-04 10:05:00.642+00',	'2021-09-04 10:05:00.642+00',	NULL),
('b44c5321-4b54-4a5e-8628-45280525fea4',	'admin1',	'admin1@lequiz.com',	'$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI',	NULL,	NULL,	'vip',	'admin',	'0',	'1',	'0',	NULL,	'2021-09-04 10:05:00.647+00',	'2021-09-04 10:05:00.647+00',	NULL);

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
('a3c38480-0e4c-4195-b3c5-f5de8cb90557',	'0',	'Combien fait 1 + 4 ?',	'{"answers": {"qcm": [{"content": "5", "is_good_answer": true}, {"content": "3", "is_good_answer": false}, {"content": "4", "is_good_answer": false}, {"content": "6", "is_good_answer": false}], "input": [{"content": "5"}, {"content": "Cinq"}]}, "additional": {"response_media": {"url": "http://example.com/toto.png", "info": "0 + 0 égale ? ..."}}}',	'approved',	'{"url": "http://example.com/calculatrice.png", "type": "image/png"}',	NULL,	'2021-09-04 10:04:59.812+00',	'2021-09-04 10:04:59.812+00'),
('28385f36-134a-4c88-93fa-9925ecd8d7ce',	'0',	'En quelle année, Mao a-t-il lancé sa révolution culturelle ?',	'{"answers": {"qcm": [{"content": "1814", "is_good_answer": false}, {"content": "1865", "is_good_answer": false}, {"content": "1920", "is_good_answer": false}, {"content": "1966", "is_good_answer": true}], "input": [{"content": "1966"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:04:59.832+00',	'2021-09-04 10:04:59.832+00'),
('631d05fd-c496-4d31-95da-a5a8eae80e61',	'0',	'En quelle année les États-Unis ont-ils pris part à la Première Guerre mondiale ?',	'{"answers": {"qcm": [{"content": "1918", "is_good_answer": false}, {"content": "1915", "is_good_answer": false}, {"content": "1917", "is_good_answer": true}, {"content": "1916", "is_good_answer": false}], "input": [{"content": "1916"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:04:59.847+00',	'2021-09-04 10:04:59.847+00'),
('57471d3c-142f-479e-b46f-bd12adff4131',	'0',	'Quels Jeux olympiques ont été supprimés à cause de la Seconde Guerre mondiale ?',	'{"answers": {"qcm": [{"content": "1936 et 1940", "is_good_answer": false}, {"content": "1944 et 1948", "is_good_answer": false}, {"content": "1940 et 1944", "is_good_answer": true}, {"content": "1932 et 1936", "is_good_answer": false}], "input": [{"content": "1940 et 1944"}, {"content": "1940 1944"}, {"content": "1940, 1944"}, {"content": "1944 et 1940"}, {"content": "1944 1940"}, {"content": "1944, 1940"}]}, "additional": {"response_media": {"url": null, "info": "Les Jeux ont été rénovés par le baron Pierre de Coubertin à la fin du XIXe siècle."}}}',	'approved',	'{}',	NULL,	'2021-09-04 10:04:59.859+00',	'2021-09-04 10:04:59.859+00'),
('319a96e5-b918-4b73-bb82-59db7ed5cfe3',	'0',	'Dans les plaines de quel champ de bataille se dresse la Butte du Lion ?',	'{"answers": {"qcm": [{"content": "Verdun", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": true}, {"content": "Austerlitz", "is_good_answer": false}, {"content": "Valmy", "is_good_answer": false}], "input": [{"content": "Waterloo"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:04:59.872+00',	'2021-09-04 10:04:59.872+00'),
('8f947d84-1e5a-4c3a-8708-c2036148461d',	'0',	'Quelle ligne de défense française fut contournée par les Allemands en 1940 ?',	'{"answers": {"qcm": [{"content": "La ligne Siegfried", "is_good_answer": false}, {"content": "La ligne Maginot", "is_good_answer": true}, {"content": "La ligne verte", "is_good_answer": false}, {"content": "La ligne Daladier", "is_good_answer": false}], "input": [{"content": "La ligne Maginot"}, {"content": "Ligne Maginot"}, {"content": "Maginot"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:04:59.886+00',	'2021-09-04 10:04:59.886+00'),
('dbe2145c-ca81-427e-a3c2-5b41391d7be6',	'0',	'Le général Cambronne, qui commandait la vieille garde, eut une conduite héroïque à...',	'{"answers": {"qcm": [{"content": "Wagram", "is_good_answer": false}, {"content": "Iena", "is_good_answer": true}, {"content": "Midway", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": false}], "input": [{"content": "Waterloo"}, {"content": "La bataille de Waterloo"}, {"content": "Bataille de Waterloo"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:04:59.903+00',	'2021-09-04 10:04:59.903+00'),
('2ae81ce7-dc0b-4818-8085-3b4e1c2e164d',	'0',	'Où a eu lieu le grand procès des criminels de guerre nazis ?',	'{"answers": {"qcm": [{"content": "Berlin", "is_good_answer": false}, {"content": "Nuremberg", "is_good_answer": true}, {"content": "Hambourg", "is_good_answer": false}, {"content": "Munich", "is_good_answer": false}], "input": [{"content": "Nuremberg"}, {"content": "à Nuremberg"}]}, "additional": {"response_media": {"url": null, "info": "Le procès de Nuremberg fut intenté contre 24 responsables du Troisième Reich."}}}',	'approved',	'{}',	NULL,	'2021-09-04 10:04:59.916+00',	'2021-09-04 10:04:59.916+00'),
('f10b3bc8-9803-4003-89b4-315f8a432a94',	'0',	'Qui est le personnage princiapl de l''Odysée d''Homère ?',	'{"answers": {"qcm": [{"content": "Sophocle", "is_good_answer": false}, {"content": "Ajax", "is_good_answer": false}, {"content": "Ulysse", "is_good_answer": true}, {"content": "Arkantos", "is_good_answer": false}], "input": [{"content": "Ulysse"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:04:59.936+00',	'2021-09-04 10:04:59.936+00'),
('cfa08f66-4c3a-4dc9-b4aa-5255020d9446',	'0',	'En quelle année la bataille de Waterloo a-t-elle eu lieu, à vingt kilomètres au sud de Bruxelles ?',	'{"answers": {"qcm": [{"content": "1815", "is_good_answer": true}, {"content": "1831", "is_good_answer": false}, {"content": "1809", "is_good_answer": false}, {"content": "1824", "is_good_answer": false}], "input": [{"content": "1815"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:04:59.958+00',	'2021-09-04 10:04:59.958+00'),
('62c4c358-0e48-4052-83ce-b2d83d08ece9',	'0',	'Quel basketteur américain a été champion NBA en 1998 pour la sixième fois de sa carrière ?',	'{"answers": {"qcm": [{"content": "Patrick Ewing", "is_good_answer": false}, {"content": "Karl Malone", "is_good_answer": false}, {"content": "Charles Barkley", "is_good_answer": false}, {"content": "Michael Jordan", "is_good_answer": true}], "input": [{"content": "Michael Jordan"}, {"content": "Jordan"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:04:59.973+00',	'2021-09-04 10:04:59.973+00'),
('448c41ce-d10e-4224-8d2b-d776b244f417',	'0',	'Dans quelle pays est né le joueur de basket-ball professionnel Tony Parker ?',	'{"answers": {"qcm": [{"content": "Belgique", "is_good_answer": true}, {"content": "USA", "is_good_answer": false}, {"content": "France", "is_good_answer": false}, {"content": "Pologne", "is_good_answer": false}], "input": [{"content": "en Belgique"}, {"content": "Belgique"}]}, "additional": {"response_media": {"url": null, "info": "Il évoluait dans l''équipe des Spurs de San Antonio depuis son arrivée dans la NBA en 2001."}}}',	'approved',	'{}',	NULL,	'2021-09-04 10:04:59.988+00',	'2021-09-04 10:04:59.988+00'),
('d3731db6-4a3f-4e9f-a384-54677378f9c5',	'0',	'Qui a été élu joueur de la décennie 2000 suite à un sondage du site officiel NBA ?',	'{"answers": {"qcm": [{"content": "Derek Fisher", "is_good_answer": false}, {"content": "Ron Harper", "is_good_answer": false}, {"content": "Kobe Bryant", "is_good_answer": true}, {"content": "Rick Fox", "is_good_answer": false}], "input": [{"content": "Kobe Bryant"}, {"content": "Bryant"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.001+00',	'2021-09-04 10:05:00.001+00'),
('a30e162c-7578-4cc4-b2e9-89001ac0fda0',	'0',	'Quel concours de dunks est organisé par la NBA durant le NBA All-Star Week-end ?',	'{"answers": {"qcm": [{"content": "Skills Challenge", "is_good_answer": false}, {"content": "Slam Dunk Contest", "is_good_answer": true}, {"content": "Three-point Shootout", "is_good_answer": false}, {"content": "All-Star Game", "is_good_answer": false}], "input": [{"content": "Slam Dunk Contest"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.015+00',	'2021-09-04 10:05:00.015+00'),
('c3684be4-7200-4fa1-ae2d-1d3b2e66594c',	'0',	'Quel basketteur américain a réalisé en 2000 un 360 degrés inversé mythique ?',	'{"answers": {"qcm": [{"content": "Jarnell Stokes", "is_good_answer": false}, {"content": "Vince Carter", "is_good_answer": true}, {"content": "Marc Gasol", "is_good_answer": false}, {"content": "Andrew Harrison", "is_good_answer": false}], "input": [{"content": "Vince Carter"}, {"content": "Carter"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.029+00',	'2021-09-04 10:05:00.029+00'),
('7ade4930-d332-447f-a7e2-6ac75d6eaeff',	'0',	'Qui est le premier joueur français à avoir été sacré champion NBA ?',	'{"answers": {"qcm": [{"content": "Joe Dumars", "is_good_answer": false}, {"content": "Paul Pierce", "is_good_answer": false}, {"content": "Tony Parker", "is_good_answer": true}, {"content": "Tim Duncan", "is_good_answer": false}], "input": [{"content": "Tony Parker"}, {"content": "Parker"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.085+00',	'2021-09-04 10:05:00.085+00'),
('0e3cd95a-0b08-4c29-a4fb-744d97d7e657',	'0',	'Quel sport automobile consiste à accélérer le plus rapidement possible avec son véhicule ?',	'{"answers": {"qcm": [{"content": "Le trial", "is_good_answer": false}, {"content": "Le Drift", "is_good_answer": false}, {"content": "Le Monster truck", "is_good_answer": false}, {"content": "Le Dragster", "is_good_answer": true}], "input": [{"content": "Le Dragster"}, {"content": "Dragster"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.263+00',	'2021-09-04 10:05:00.263+00'),
('690e044b-ace3-4336-8a6d-41c23560d5bd',	'0',	'Quel super-héros porte un costume inspiré du drapeau américain ?',	'{"answers": {"qcm": [{"content": "Tigra", "is_good_answer": false}, {"content": "Iron Man", "is_good_answer": false}, {"content": "Blade", "is_good_answer": false}, {"content": "Captain America", "is_good_answer": true}], "input": [{"content": "Captain America"}]}}',	'disapproved',	'{}',	NULL,	'2021-09-04 10:05:00.527+00',	'2021-09-04 10:05:00.527+00'),
('b7e6906f-02de-4d00-a7e4-88c887df9a70',	'0',	'Quel poète français est connu pour ses fables ?',	'{"answers": {"qcm": [{"content": "Pierre Corneille", "is_good_answer": false}, {"content": "Esope", "is_good_answer": false}, {"content": "Jean Racine", "is_good_answer": false}, {"content": "Jean de La Fontaine", "is_good_answer": true}], "input": [{"content": "Jean de La Fontaine"}, {"content": "de La Fontaine"}, {"content": "La Fontaine"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.54+00',	'2021-09-04 10:05:00.54+00'),
('dae77a4c-3cc8-4518-8ebe-5d5bf4b9fab6',	'0',	'Quel joueur de NBA se définit lui-même comme un « viking africain » ?',	'{"answers": {"qcm": [{"content": "Derrick Rose", "is_good_answer": false}, {"content": "Pau Gasol", "is_good_answer": false}, {"content": "Aaron Brooks", "is_good_answer": false}, {"content": "Joakim Noah", "is_good_answer": true}], "input": [{"content": "Joakim Noah"}, {"content": "Noah"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.042+00',	'2021-09-04 10:05:00.042+00'),
('fce884b4-28ea-4369-925f-6c9fe407d53f',	'0',	'Quel événement annuel majeur de la NBA est comparable à une bourse de joueurs ?',	'{"answers": {"qcm": [{"content": "La franchise", "is_good_answer": false}, {"content": "Les playoffs", "is_good_answer": false}, {"content": "Le ballotage", "is_good_answer": false}, {"content": "La draft", "is_good_answer": true}], "input": [{"content": "La Draft"}, {"content": "Draft"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.057+00',	'2021-09-04 10:05:00.057+00'),
('463bd146-8cb5-4398-b58f-f607a4fd1681',	'0',	'Combien de titres de champion NBA Michael Jordan a-t-il obtenu ?',	'{"answers": {"qcm": [{"content": "Cinq", "is_good_answer": false}, {"content": "Sept", "is_good_answer": false}, {"content": "Six", "is_good_answer": true}, {"content": "Quatre", "is_good_answer": false}], "input": [{"content": "Six"}, {"content": "6"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.071+00',	'2021-09-04 10:05:00.071+00'),
('304cd167-331f-4a8a-a856-d23b29d0fe06',	'0',	'Qui a été élu deux fois meilleur joueur de la NBA, en 2005 et 2006 ?',	'{"answers": {"qcm": [{"content": "Jeff Brown", "is_good_answer": false}, {"content": "Dana Jones", "is_good_answer": false}, {"content": "Marlon Garnett", "is_good_answer": false}, {"content": "Steve Nash", "is_good_answer": true}], "input": [{"content": "Steve Nash"}, {"content": "Nash"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.098+00',	'2021-09-04 10:05:00.098+00'),
('f893f557-d330-495a-a0c1-64dadfd5ce5c',	'0',	'Quel gagnant de la « Nouvelle Star », diffusée sur M6, est surnommé « La Tortue » ?',	'{"answers": {"qcm": [{"content": "Christophe Willem", "is_good_answer": true}, {"content": "Julien Doré", "is_good_answer": false}, {"content": "Jonatan Cerrada", "is_good_answer": false}, {"content": "Steeve Estatof", "is_good_answer": false}], "input": [{"content": "Christophe Willem"}, {"content": "Willem"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.113+00',	'2021-09-04 10:05:00.113+00'),
('f035762c-4a24-4793-a6c6-a1c4dabe4491',	'0',	'En 1991, quel tube Yannick Noah a-t-il associé à la victoire de la France en coupe Davis ?',	'{"answers": {"qcm": [{"content": "Vagabond", "is_good_answer": false}, {"content": "Les Lionnes", "is_good_answer": false}, {"content": "Saga Africa", "is_good_answer": true}, {"content": "Ose", "is_good_answer": false}], "input": [{"content": "Saga Africa"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.127+00',	'2021-09-04 10:05:00.127+00'),
('b1ef55ee-ae2b-45cf-9dcc-db01d1aeab78',	'0',	'Quel chanteur prénommé Mathieu a émergé du succès remporté par les Linkup ?',	'{"answers": {"qcm": [{"content": "Corneille", "is_good_answer": false}, {"content": "Keen''V", "is_good_answer": false}, {"content": "Raphaël", "is_good_answer": false}, {"content": "M. Pokora", "is_good_answer": true}], "input": [{"content": "M. Pokora"}, {"content": "Matt Pokora"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.14+00',	'2021-09-04 10:05:00.14+00'),
('43ca798f-ce25-4bb2-b58e-6b7f24fef207',	'0',	'Quel est le style musical de l''album de Rohff, « La fierté des années » ?',	'{"answers": {"qcm": [{"content": "La Techno", "is_good_answer": false}, {"content": "Le tango", "is_good_answer": false}, {"content": "Le disco", "is_good_answer": false}, {"content": "Le rap", "is_good_answer": true}], "input": [{"content": "Le rap"}, {"content": "Rap"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.151+00',	'2021-09-04 10:05:00.151+00'),
('e90db212-2561-4c4f-8bce-03412661e510',	'0',	'Quel Américano-Libanais est entré dans les charts avec « Life in Cartoon Motion » ?',	'{"answers": {"qcm": [{"content": "Mika", "is_good_answer": true}, {"content": "Iwan", "is_good_answer": false}, {"content": "Rida", "is_good_answer": false}, {"content": "K. Maro", "is_good_answer": false}], "input": [{"content": "Mika"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.162+00',	'2021-09-04 10:05:00.162+00'),
('d9e00da7-b061-44fb-a460-ba9e86ff738c',	'0',	'Qui a chanté au pied de …onnes le 10 juin 2000 ?',	'{"answers": {"qcm": [{"content": "Eddy Mitchell", "is_good_answer": false}, {"content": "Patrick Bruel", "is_good_answer": false}, {"content": "Christophe Maé", "is_good_answer": false}, {"content": "Johnny Hallyday", "is_good_answer": true}], "input": [{"content": "Johnny Hallyday"}, {"content": "Johnny"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.175+00',	'2021-09-04 10:05:00.175+00'),
('3ca374d3-ea57-40ce-bfeb-204d43b4c52f',	'0',	'Avec quel chanteur le top model Heidi Klum a-t-elle été mariée durant sept ans ?',	'{"answers": {"qcm": [{"content": "Seal", "is_good_answer": true}, {"content": "Paul McCartney", "is_good_answer": false}, {"content": "Sean Paul", "is_good_answer": false}, {"content": "Robbie Williams", "is_good_answer": false}], "input": [{"content": "Seal"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.204+00',	'2021-09-04 10:05:00.204+00'),
('e04c00e4-0a19-42fd-a627-aa2a461f4e57',	'0',	'Quel DJ a repris un titre des années 80 pour faire un tube avec « Living On Video » ?',	'{"answers": {"qcm": [{"content": "Pakito", "is_good_answer": true}, {"content": "Vitalic", "is_good_answer": false}, {"content": "Madeon", "is_good_answer": false}, {"content": "Brodinski", "is_good_answer": false}], "input": [{"content": "Pakito"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.217+00',	'2021-09-04 10:05:00.217+00'),
('a7e7dab2-0fef-4d55-a43b-4d9e1e338a0d',	'0',	'Quel chanteur a sorti « Musicology » puis « 3121 » deux ans plus tard ?',	'{"answers": {"qcm": [{"content": "Bob James", "is_good_answer": false}, {"content": "Al Jarreau", "is_good_answer": false}, {"content": "Prince", "is_good_answer": true}, {"content": "James Brown", "is_good_answer": false}], "input": [{"content": "Prince"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.229+00',	'2021-09-04 10:05:00.229+00'),
('fe012a19-a2b6-421d-b67f-4ca19f38b4d9',	'0',	'Dans quel pays se situe le circuit de course automobile du Mans ?',	'{"answers": {"qcm": [{"content": "Pays-Bas", "is_good_answer": false}, {"content": "Suisse", "is_good_answer": false}, {"content": "Belgique", "is_good_answer": false}, {"content": "France", "is_good_answer": true}], "input": [{"content": "France"}, {"content": "La France"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.241+00',	'2021-09-04 10:05:00.241+00'),
('b58f7190-6598-456e-8543-a01a40c51b48',	'0',	'À quel modèle de voiture ressemble le vieux tacot jaune que conduit Gaston Lagaffe ?',	'{"answers": {"qcm": [{"content": "Rolls-Royce", "is_good_answer": false}, {"content": "Citroën B10", "is_good_answer": false}, {"content": "Fiat 509", "is_good_answer": true}, {"content": "Jeep", "is_good_answer": false}], "input": [{"content": "Fiat 509"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.252+00',	'2021-09-04 10:05:00.252+00'),
('2fa0d93d-0bf7-473e-8921-a672f1aefb7b',	'0',	'Comment s''appelle le véhicule du personnage de bande dessinée Batman ?',	'{"answers": {"qcm": [{"content": "La BatDrive", "is_good_answer": false}, {"content": "La Batauto", "is_good_answer": false}, {"content": "La Batcar", "is_good_answer": false}, {"content": "La Batmobile", "is_good_answer": true}], "input": [{"content": "La Batmobile"}, {"content": "Batmobile"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.274+00',	'2021-09-04 10:05:00.274+00'),
('c6fad389-bee0-4a2c-b7ab-beb2fd0fa0f2',	'0',	'Sous quel nom le rappeur et homme d''affaires américain Curtis Jackson fait-il carrière ?',	'{"answers": {"qcm": [{"content": "50 cent", "is_good_answer": true}, {"content": "Fat Joe", "is_good_answer": false}, {"content": "Big Sean", "is_good_answer": false}, {"content": "Mike D", "is_good_answer": false}], "input": [{"content": "50 cent"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.188+00',	'2021-09-04 10:05:00.188+00'),
('32d55a17-5268-4ad0-83d5-cdd711316feb',	'0',	'De quand date le Duster, véhicule utilitaire sport vendu par la marque roumaine Dacia ?',	'{"answers": {"qcm": [{"content": "2006", "is_good_answer": false}, {"content": "2008", "is_good_answer": false}, {"content": "2010", "is_good_answer": true}, {"content": "2012", "is_good_answer": false}], "input": [{"content": "2010"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.285+00',	'2021-09-04 10:05:00.285+00'),
('a6b0ea5d-ccad-49ac-ae45-5301df7cf7e4',	'0',	'En France, refuser une priorité peut vous coûter combien de points sur le permis ?',	'{"answers": {"qcm": [{"content": "6 points", "is_good_answer": false}, {"content": "8 points", "is_good_answer": false}, {"content": "4 points", "is_good_answer": true}, {"content": "2 points", "is_good_answer": false}], "input": [{"content": "4 points"}, {"content": "4"}, {"content": "quatre"}, {"content": "quatre points"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.296+00',	'2021-09-04 10:05:00.296+00'),
('d5365df1-1798-440b-b041-3ac7c0f4a71e',	'0',	'Quelle principauté accueille l''un des plus prestigieux Grand Prix de Formule 1 ?',	'{"answers": {"qcm": [{"content": "Liechtenstein", "is_good_answer": false}, {"content": "Andorre", "is_good_answer": false}, {"content": "Mantoue", "is_good_answer": false}, {"content": "Monaco", "is_good_answer": true}], "input": [{"content": "Monaco"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.306+00',	'2021-09-04 10:05:00.306+00'),
('384bce21-1904-4e51-9dab-54674529e74a',	'0',	'Dans le monde automobile, quel sigle correspond au Grand Tourisme Injection ?',	'{"answers": {"qcm": [{"content": "sport", "is_good_answer": false}, {"content": "Gti", "is_good_answer": true}, {"content": "TT", "is_good_answer": false}, {"content": "Turbo", "is_good_answer": false}], "input": [{"content": "GTI"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.318+00',	'2021-09-04 10:05:00.318+00'),
('ec2b41e8-7edc-4749-ad96-0433bbbfb9e2',	'0',	'Quelle société appartenant au groupe Belron « répare et remplace » votre pare-brise ?',	'{"answers": {"qcm": [{"content": "Carglass", "is_good_answer": true}, {"content": "Midas", "is_good_answer": false}, {"content": "Speedy", "is_good_answer": false}, {"content": "Norauto", "is_good_answer": false}], "input": [{"content": "Carglass"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.33+00',	'2021-09-04 10:05:00.33+00'),
('3f700573-fcea-4ec0-933f-ac7a70e73322',	'0',	'Quelle firme automobile, filiale française de FIAT, a ensuite intégré le groupe Chrysler ?',	'{"answers": {"qcm": [{"content": "Simca", "is_good_answer": true}, {"content": "Hommell", "is_good_answer": false}, {"content": "Packard", "is_good_answer": false}, {"content": "Triumph", "is_good_answer": false}], "input": [{"content": "Simca"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.341+00',	'2021-09-04 10:05:00.341+00'),
('8094b4db-b4cc-4fee-b99b-7d126783ee06',	'0',	'Dans quel jeu peux on voir des Chocobos ?',	'{"answers": {"qcm": [{"content": "Breath of fire", "is_good_answer": false}, {"content": "Final Fantasy", "is_good_answer": true}, {"content": "Secret of Mana", "is_good_answer": false}, {"content": "Golden stun", "is_good_answer": false}], "input": [{"content": "Final Fantasy"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.351+00',	'2021-09-04 10:05:00.351+00'),
('3125d17f-f62c-45f4-a8f5-d8697894926d',	'0',	'Salamèche évolue en ',	'{"answers": {"qcm": [{"content": "Dracaufeu", "is_good_answer": false}, {"content": "Reptincel", "is_good_answer": true}, {"content": "Magna", "is_good_answer": false}, {"content": "Ptera", "is_good_answer": false}], "input": [{"content": "Reptincel"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.365+00',	'2021-09-04 10:05:00.365+00'),
('4ae2375d-fc71-42eb-a3c3-6c2ec0291015',	'0',	'Zelda est un jeu du genre',	'{"answers": {"qcm": [{"content": "Aventure", "is_good_answer": true}, {"content": "RPG", "is_good_answer": false}, {"content": "Course", "is_good_answer": false}, {"content": "Simulation", "is_good_answer": false}], "input": [{"content": "Aventure"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.38+00',	'2021-09-04 10:05:00.38+00'),
('b1e3c33a-9904-4820-b532-2e0625205a16',	'0',	'Sur quelle plateforme le jeu Tekken est sorti en premier ?',	'{"answers": {"qcm": [{"content": "La borne d''arcade", "is_good_answer": true}, {"content": "NES", "is_good_answer": false}, {"content": "Playstation", "is_good_answer": false}, {"content": "Gamecube", "is_good_answer": false}], "input": [{"content": "La borne d''arcade"}, {"content": "Borne d''arcade"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.393+00',	'2021-09-04 10:05:00.393+00'),
('ae7b931f-4748-48f0-95bf-4c77689c0f4f',	'0',	'Dans quel jeu le personnage de Mario a-t-il été développé en premier ?',	'{"answers": {"qcm": [{"content": "Super Mario", "is_good_answer": false}, {"content": "Super Mario Bros", "is_good_answer": false}, {"content": "Donkey Kong", "is_good_answer": true}, {"content": "Mario Party", "is_good_answer": false}], "input": [{"content": "Donkey Kong"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.406+00',	'2021-09-04 10:05:00.406+00'),
('32e6fb50-17b8-4421-9880-bb6186221d20',	'0',	'La série Fallout est la suite « spirituelle » de quel jeu ?',	'{"answers": {"qcm": [{"content": "Wasteland", "is_good_answer": true}, {"content": "Homeland", "is_good_answer": false}, {"content": "Falland", "is_good_answer": false}, {"content": "Skyrim", "is_good_answer": false}], "input": [{"content": "Wasteland"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.419+00',	'2021-09-04 10:05:00.419+00'),
('36da552d-f49f-4ea4-86c1-94ea9a620619',	'0',	'Que signifie le nom de la serie GTA ?',	'{"answers": {"qcm": [{"content": "Burnout", "is_good_answer": false}, {"content": "Conduite dangeureuse", "is_good_answer": false}, {"content": "Vol de voiture", "is_good_answer": true}, {"content": "Voiture customisé", "is_good_answer": false}], "input": [{"content": "Vol de voiture"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.432+00',	'2021-09-04 10:05:00.432+00'),
('a0785f10-ef1c-4953-a66b-2230ad15723a',	'0',	'Le jeu Counter Strike dérive de quel autre jeu ?',	'{"answers": {"qcm": [{"content": "Half Life", "is_good_answer": true}, {"content": "Splinter Cell", "is_good_answer": false}, {"content": "Doom", "is_good_answer": false}, {"content": "Call of Duty", "is_good_answer": false}], "input": [{"content": "Half Life"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.446+00',	'2021-09-04 10:05:00.446+00'),
('87494768-e96a-4d2c-b8b2-66daec1daf75',	'0',	'Dans Pac man qu''est ce qui hante le labyrinthe ?',	'{"answers": {"qcm": [{"content": "Des plantes carnivores", "is_good_answer": false}, {"content": "Des fantômes", "is_good_answer": true}, {"content": "Des squelettes", "is_good_answer": false}, {"content": "Des zombies", "is_good_answer": false}], "input": [{"content": "Des fantômes"}, {"content": "Fantômes"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.461+00',	'2021-09-04 10:05:00.461+00'),
('00bc1964-812c-46e8-bbae-b81bc6672c33',	'0',	'Dans la légende de Zelda, comment s''appelle le héros ?',	'{"answers": {"qcm": [{"content": "Zelda", "is_good_answer": false}, {"content": "Bruno", "is_good_answer": false}, {"content": "Ganondorf", "is_good_answer": false}, {"content": "Link", "is_good_answer": true}], "input": [{"content": "Link"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.474+00',	'2021-09-04 10:05:00.474+00'),
('8ea11e9a-1cf5-4edc-b545-2e09fe955747',	'0',	'Qui est le compagnon de Batman ?',	'{"answers": {"qcm": [{"content": "Robin", "is_good_answer": true}, {"content": "Le Joker", "is_good_answer": false}, {"content": "Leroy", "is_good_answer": false}, {"content": "Clark Kent", "is_good_answer": false}], "input": [{"content": "Robin"}]}}',	'pending',	'{}',	NULL,	'2021-09-04 10:05:00.487+00',	'2021-09-04 10:05:00.487+00'),
('7ecb61fe-8ff0-4a42-bd67-d53c8837c3a0',	'0',	'Quel super héros ne se sépare jamais de son marteau forgé par les nains ',	'{"answers": {"qcm": [{"content": "Hulk", "is_good_answer": false}, {"content": "Aquaman", "is_good_answer": false}, {"content": "Rhino", "is_good_answer": false}, {"content": "Thor", "is_good_answer": true}], "input": [{"content": "Thor"}]}}',	'pending',	'{}',	NULL,	'2021-09-04 10:05:00.499+00',	'2021-09-04 10:05:00.499+00'),
('b7cb770a-0146-4776-945e-f5ffe656f8c5',	'0',	'Quel super-héros à la force surhumaine ressemble à un être de pierre ?',	'{"answers": {"qcm": [{"content": "Hawkman", "is_good_answer": false}, {"content": "Plastic Man", "is_good_answer": false}, {"content": "Superboy", "is_good_answer": false}, {"content": "La Chose", "is_good_answer": true}], "input": [{"content": "La Chose"}]}}',	'disapproved',	'{}',	NULL,	'2021-09-04 10:05:00.511+00',	'2021-09-04 10:05:00.511+00'),
('f8e97bec-0ce5-4807-ba34-ee60848cd702',	'1',	'Quel élément chimique porte le numéro atomique 30 ?',	'{"answers": {"qcm": [{"content": "L''argent", "is_good_answer": false}, {"content": "Le zinc", "is_good_answer": true}, {"content": "le carbone", "is_good_answer": false}, {"content": "le soufre", "is_good_answer": true}], "input": [{"content": "Le zinc"}, {"content": "Zinc"}, {"content": "Zn"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.552+00',	'2021-09-04 10:05:00.552+00'),
('f53cb5d1-415d-46e4-89e6-fa5159269bb8',	'1',	'Quel seigneur Albanais est vu comme un héros national suite à sa résistance aux Ottomans ?',	'{"answers": {"qcm": [{"content": "Vlad Tepes", "is_good_answer": false}, {"content": "Ivan Sirkhov", "is_good_answer": false}, {"content": "Skanderbeg", "is_good_answer": true}, {"content": "Baybars", "is_good_answer": true}], "input": [{"content": "Georges Castriote Skanderbeg"}, {"content": "Georges Castriote"}, {"content": "Castriote"}, {"content": "Scanderbeg"}, {"content": "Skanderbeg"}]}}',	'approved',	'{}',	NULL,	'2021-09-04 10:05:00.565+00',	'2021-09-04 10:05:00.565+00');

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
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'classic',	'Classique',	'2021-09-04 10:04:59.736+00',	'2021-09-04 10:04:59.736+00'),
('b3aded5a-5b44-46e1-8eca-2e97d341517e',	'blind-test',	'Blind Test',	'2021-09-04 10:04:59.749+00',	'2021-09-04 10:04:59.749+00');

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
('44122b0e-3acd-44d0-bdac-1e24a2b3d669',	'football',	'Football',	'2021-09-04 10:04:59.755+00',	'2021-09-04 10:04:59.755+00'),
('778f453e-08eb-47d3-a694-7ff58a524208',	'mythologie',	'Mythologie',	'2021-09-04 10:04:59.76+00',	'2021-09-04 10:04:59.76+00'),
('b26707db-518c-4f87-8c9f-5656bd85971a',	'usa',	'Etats-Unis d''Amérique',	'2021-09-04 10:04:59.766+00',	'2021-09-04 10:04:59.766+00'),
('068f87c3-241c-461e-bf24-e7371fdf5bb2',	'grece',	'Grèce',	'2021-09-04 10:04:59.771+00',	'2021-09-04 10:04:59.771+00');

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
('1ea8d566-fc22-4bb8-8fba-f0b350e51088',	'a3c38480-0e4c-4195-b3c5-f5de8cb90557',	'2021-09-04 10:04:59.824+00',	'2021-09-04 10:04:59.824+00'),
('1ea8d566-fc22-4bb8-8fba-f0b350e51088',	'28385f36-134a-4c88-93fa-9925ecd8d7ce',	'2021-09-04 10:04:59.839+00',	'2021-09-04 10:04:59.839+00'),
('1ea8d566-fc22-4bb8-8fba-f0b350e51088',	'631d05fd-c496-4d31-95da-a5a8eae80e61',	'2021-09-04 10:04:59.852+00',	'2021-09-04 10:04:59.852+00'),
('1ea8d566-fc22-4bb8-8fba-f0b350e51088',	'57471d3c-142f-479e-b46f-bd12adff4131',	'2021-09-04 10:04:59.865+00',	'2021-09-04 10:04:59.865+00'),
('1ea8d566-fc22-4bb8-8fba-f0b350e51088',	'319a96e5-b918-4b73-bb82-59db7ed5cfe3',	'2021-09-04 10:04:59.878+00',	'2021-09-04 10:04:59.878+00'),
('1ea8d566-fc22-4bb8-8fba-f0b350e51088',	'8f947d84-1e5a-4c3a-8708-c2036148461d',	'2021-09-04 10:04:59.893+00',	'2021-09-04 10:04:59.893+00'),
('1ea8d566-fc22-4bb8-8fba-f0b350e51088',	'dbe2145c-ca81-427e-a3c2-5b41391d7be6',	'2021-09-04 10:04:59.908+00',	'2021-09-04 10:04:59.908+00'),
('1ea8d566-fc22-4bb8-8fba-f0b350e51088',	'2ae81ce7-dc0b-4818-8085-3b4e1c2e164d',	'2021-09-04 10:04:59.922+00',	'2021-09-04 10:04:59.922+00'),
('1ea8d566-fc22-4bb8-8fba-f0b350e51088',	'f10b3bc8-9803-4003-89b4-315f8a432a94',	'2021-09-04 10:04:59.945+00',	'2021-09-04 10:04:59.945+00'),
('1ea8d566-fc22-4bb8-8fba-f0b350e51088',	'cfa08f66-4c3a-4dc9-b4aa-5255020d9446',	'2021-09-04 10:04:59.964+00',	'2021-09-04 10:04:59.964+00'),
('9abaf669-6852-4310-99fe-a77822ad5429',	'62c4c358-0e48-4052-83ce-b2d83d08ece9',	'2021-09-04 10:04:59.98+00',	'2021-09-04 10:04:59.98+00'),
('9abaf669-6852-4310-99fe-a77822ad5429',	'448c41ce-d10e-4224-8d2b-d776b244f417',	'2021-09-04 10:04:59.994+00',	'2021-09-04 10:04:59.994+00'),
('9abaf669-6852-4310-99fe-a77822ad5429',	'd3731db6-4a3f-4e9f-a384-54677378f9c5',	'2021-09-04 10:05:00.007+00',	'2021-09-04 10:05:00.007+00'),
('9abaf669-6852-4310-99fe-a77822ad5429',	'a30e162c-7578-4cc4-b2e9-89001ac0fda0',	'2021-09-04 10:05:00.022+00',	'2021-09-04 10:05:00.022+00'),
('9abaf669-6852-4310-99fe-a77822ad5429',	'c3684be4-7200-4fa1-ae2d-1d3b2e66594c',	'2021-09-04 10:05:00.034+00',	'2021-09-04 10:05:00.034+00'),
('9abaf669-6852-4310-99fe-a77822ad5429',	'dae77a4c-3cc8-4518-8ebe-5d5bf4b9fab6',	'2021-09-04 10:05:00.049+00',	'2021-09-04 10:05:00.049+00'),
('9abaf669-6852-4310-99fe-a77822ad5429',	'fce884b4-28ea-4369-925f-6c9fe407d53f',	'2021-09-04 10:05:00.062+00',	'2021-09-04 10:05:00.062+00'),
('9abaf669-6852-4310-99fe-a77822ad5429',	'463bd146-8cb5-4398-b58f-f607a4fd1681',	'2021-09-04 10:05:00.076+00',	'2021-09-04 10:05:00.076+00'),
('9abaf669-6852-4310-99fe-a77822ad5429',	'7ade4930-d332-447f-a7e2-6ac75d6eaeff',	'2021-09-04 10:05:00.091+00',	'2021-09-04 10:05:00.091+00'),
('9abaf669-6852-4310-99fe-a77822ad5429',	'304cd167-331f-4a8a-a856-d23b29d0fe06',	'2021-09-04 10:05:00.107+00',	'2021-09-04 10:05:00.107+00'),
('f2154375-1207-4e14-9fe0-b95380a8a35f',	'f893f557-d330-495a-a0c1-64dadfd5ce5c',	'2021-09-04 10:05:00.121+00',	'2021-09-04 10:05:00.121+00'),
('f2154375-1207-4e14-9fe0-b95380a8a35f',	'f035762c-4a24-4793-a6c6-a1c4dabe4491',	'2021-09-04 10:05:00.133+00',	'2021-09-04 10:05:00.133+00'),
('f2154375-1207-4e14-9fe0-b95380a8a35f',	'b1ef55ee-ae2b-45cf-9dcc-db01d1aeab78',	'2021-09-04 10:05:00.146+00',	'2021-09-04 10:05:00.146+00'),
('f2154375-1207-4e14-9fe0-b95380a8a35f',	'43ca798f-ce25-4bb2-b58e-6b7f24fef207',	'2021-09-04 10:05:00.156+00',	'2021-09-04 10:05:00.156+00'),
('f2154375-1207-4e14-9fe0-b95380a8a35f',	'e90db212-2561-4c4f-8bce-03412661e510',	'2021-09-04 10:05:00.167+00',	'2021-09-04 10:05:00.167+00'),
('f2154375-1207-4e14-9fe0-b95380a8a35f',	'd9e00da7-b061-44fb-a460-ba9e86ff738c',	'2021-09-04 10:05:00.182+00',	'2021-09-04 10:05:00.182+00'),
('f2154375-1207-4e14-9fe0-b95380a8a35f',	'c6fad389-bee0-4a2c-b7ab-beb2fd0fa0f2',	'2021-09-04 10:05:00.195+00',	'2021-09-04 10:05:00.195+00'),
('f2154375-1207-4e14-9fe0-b95380a8a35f',	'3ca374d3-ea57-40ce-bfeb-204d43b4c52f',	'2021-09-04 10:05:00.21+00',	'2021-09-04 10:05:00.21+00'),
('f2154375-1207-4e14-9fe0-b95380a8a35f',	'e04c00e4-0a19-42fd-a627-aa2a461f4e57',	'2021-09-04 10:05:00.223+00',	'2021-09-04 10:05:00.223+00'),
('f2154375-1207-4e14-9fe0-b95380a8a35f',	'a7e7dab2-0fef-4d55-a43b-4d9e1e338a0d',	'2021-09-04 10:05:00.234+00',	'2021-09-04 10:05:00.234+00'),
('8aadbdfc-ea0c-41ab-a1d4-4ca438394346',	'fe012a19-a2b6-421d-b67f-4ca19f38b4d9',	'2021-09-04 10:05:00.247+00',	'2021-09-04 10:05:00.247+00'),
('8aadbdfc-ea0c-41ab-a1d4-4ca438394346',	'b58f7190-6598-456e-8543-a01a40c51b48',	'2021-09-04 10:05:00.256+00',	'2021-09-04 10:05:00.256+00'),
('8aadbdfc-ea0c-41ab-a1d4-4ca438394346',	'0e3cd95a-0b08-4c29-a4fb-744d97d7e657',	'2021-09-04 10:05:00.268+00',	'2021-09-04 10:05:00.268+00'),
('8aadbdfc-ea0c-41ab-a1d4-4ca438394346',	'2fa0d93d-0bf7-473e-8921-a672f1aefb7b',	'2021-09-04 10:05:00.279+00',	'2021-09-04 10:05:00.279+00'),
('8aadbdfc-ea0c-41ab-a1d4-4ca438394346',	'32d55a17-5268-4ad0-83d5-cdd711316feb',	'2021-09-04 10:05:00.29+00',	'2021-09-04 10:05:00.29+00'),
('8aadbdfc-ea0c-41ab-a1d4-4ca438394346',	'a6b0ea5d-ccad-49ac-ae45-5301df7cf7e4',	'2021-09-04 10:05:00.3+00',	'2021-09-04 10:05:00.3+00'),
('8aadbdfc-ea0c-41ab-a1d4-4ca438394346',	'd5365df1-1798-440b-b041-3ac7c0f4a71e',	'2021-09-04 10:05:00.311+00',	'2021-09-04 10:05:00.311+00'),
('8aadbdfc-ea0c-41ab-a1d4-4ca438394346',	'384bce21-1904-4e51-9dab-54674529e74a',	'2021-09-04 10:05:00.323+00',	'2021-09-04 10:05:00.323+00'),
('8aadbdfc-ea0c-41ab-a1d4-4ca438394346',	'ec2b41e8-7edc-4749-ad96-0433bbbfb9e2',	'2021-09-04 10:05:00.334+00',	'2021-09-04 10:05:00.334+00'),
('8aadbdfc-ea0c-41ab-a1d4-4ca438394346',	'3f700573-fcea-4ec0-933f-ac7a70e73322',	'2021-09-04 10:05:00.345+00',	'2021-09-04 10:05:00.345+00'),
('07578a1e-7dec-4a8b-a0d7-419d9c972fbf',	'8094b4db-b4cc-4fee-b99b-7d126783ee06',	'2021-09-04 10:05:00.356+00',	'2021-09-04 10:05:00.356+00'),
('07578a1e-7dec-4a8b-a0d7-419d9c972fbf',	'3125d17f-f62c-45f4-a8f5-d8697894926d',	'2021-09-04 10:05:00.37+00',	'2021-09-04 10:05:00.37+00'),
('07578a1e-7dec-4a8b-a0d7-419d9c972fbf',	'4ae2375d-fc71-42eb-a3c3-6c2ec0291015',	'2021-09-04 10:05:00.386+00',	'2021-09-04 10:05:00.386+00'),
('07578a1e-7dec-4a8b-a0d7-419d9c972fbf',	'b1e3c33a-9904-4820-b532-2e0625205a16',	'2021-09-04 10:05:00.398+00',	'2021-09-04 10:05:00.398+00'),
('07578a1e-7dec-4a8b-a0d7-419d9c972fbf',	'ae7b931f-4748-48f0-95bf-4c77689c0f4f',	'2021-09-04 10:05:00.412+00',	'2021-09-04 10:05:00.412+00'),
('07578a1e-7dec-4a8b-a0d7-419d9c972fbf',	'32e6fb50-17b8-4421-9880-bb6186221d20',	'2021-09-04 10:05:00.426+00',	'2021-09-04 10:05:00.426+00'),
('07578a1e-7dec-4a8b-a0d7-419d9c972fbf',	'36da552d-f49f-4ea4-86c1-94ea9a620619',	'2021-09-04 10:05:00.438+00',	'2021-09-04 10:05:00.438+00'),
('07578a1e-7dec-4a8b-a0d7-419d9c972fbf',	'a0785f10-ef1c-4953-a66b-2230ad15723a',	'2021-09-04 10:05:00.454+00',	'2021-09-04 10:05:00.454+00'),
('07578a1e-7dec-4a8b-a0d7-419d9c972fbf',	'87494768-e96a-4d2c-b8b2-66daec1daf75',	'2021-09-04 10:05:00.466+00',	'2021-09-04 10:05:00.466+00'),
('07578a1e-7dec-4a8b-a0d7-419d9c972fbf',	'00bc1964-812c-46e8-bbae-b81bc6672c33',	'2021-09-04 10:05:00.479+00',	'2021-09-04 10:05:00.479+00'),
('6bcc9131-a300-448a-a413-ccf7831803ba',	'8ea11e9a-1cf5-4edc-b545-2e09fe955747',	'2021-09-04 10:05:00.492+00',	'2021-09-04 10:05:00.492+00'),
('6bcc9131-a300-448a-a413-ccf7831803ba',	'7ecb61fe-8ff0-4a42-bd67-d53c8837c3a0',	'2021-09-04 10:05:00.504+00',	'2021-09-04 10:05:00.504+00'),
('6bcc9131-a300-448a-a413-ccf7831803ba',	'b7cb770a-0146-4776-945e-f5ffe656f8c5',	'2021-09-04 10:05:00.518+00',	'2021-09-04 10:05:00.518+00'),
('6bcc9131-a300-448a-a413-ccf7831803ba',	'690e044b-ace3-4336-8a6d-41c23560d5bd',	'2021-09-04 10:05:00.533+00',	'2021-09-04 10:05:00.533+00'),
('6bcc9131-a300-448a-a413-ccf7831803ba',	'b7e6906f-02de-4d00-a7e4-88c887df9a70',	'2021-09-04 10:05:00.545+00',	'2021-09-04 10:05:00.545+00'),
('6bcc9131-a300-448a-a413-ccf7831803ba',	'f8e97bec-0ce5-4807-ba34-ee60848cd702',	'2021-09-04 10:05:00.557+00',	'2021-09-04 10:05:00.557+00'),
('6bcc9131-a300-448a-a413-ccf7831803ba',	'f53cb5d1-415d-46e4-89e6-fa5159269bb8',	'2021-09-04 10:05:00.57+00',	'2021-09-04 10:05:00.57+00');

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
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'a3c38480-0e4c-4195-b3c5-f5de8cb90557',	'2021-09-04 10:04:59.821+00',	'2021-09-04 10:04:59.821+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'28385f36-134a-4c88-93fa-9925ecd8d7ce',	'2021-09-04 10:04:59.838+00',	'2021-09-04 10:04:59.838+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'631d05fd-c496-4d31-95da-a5a8eae80e61',	'2021-09-04 10:04:59.853+00',	'2021-09-04 10:04:59.853+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'57471d3c-142f-479e-b46f-bd12adff4131',	'2021-09-04 10:04:59.864+00',	'2021-09-04 10:04:59.864+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'319a96e5-b918-4b73-bb82-59db7ed5cfe3',	'2021-09-04 10:04:59.877+00',	'2021-09-04 10:04:59.877+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'8f947d84-1e5a-4c3a-8708-c2036148461d',	'2021-09-04 10:04:59.892+00',	'2021-09-04 10:04:59.892+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'dbe2145c-ca81-427e-a3c2-5b41391d7be6',	'2021-09-04 10:04:59.909+00',	'2021-09-04 10:04:59.909+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'2ae81ce7-dc0b-4818-8085-3b4e1c2e164d',	'2021-09-04 10:04:59.923+00',	'2021-09-04 10:04:59.923+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'f10b3bc8-9803-4003-89b4-315f8a432a94',	'2021-09-04 10:04:59.942+00',	'2021-09-04 10:04:59.942+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'cfa08f66-4c3a-4dc9-b4aa-5255020d9446',	'2021-09-04 10:04:59.965+00',	'2021-09-04 10:04:59.965+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'62c4c358-0e48-4052-83ce-b2d83d08ece9',	'2021-09-04 10:04:59.979+00',	'2021-09-04 10:04:59.979+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'448c41ce-d10e-4224-8d2b-d776b244f417',	'2021-09-04 10:04:59.993+00',	'2021-09-04 10:04:59.993+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'd3731db6-4a3f-4e9f-a384-54677378f9c5',	'2021-09-04 10:05:00.008+00',	'2021-09-04 10:05:00.008+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'a30e162c-7578-4cc4-b2e9-89001ac0fda0',	'2021-09-04 10:05:00.021+00',	'2021-09-04 10:05:00.021+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'c3684be4-7200-4fa1-ae2d-1d3b2e66594c',	'2021-09-04 10:05:00.035+00',	'2021-09-04 10:05:00.035+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'dae77a4c-3cc8-4518-8ebe-5d5bf4b9fab6',	'2021-09-04 10:05:00.048+00',	'2021-09-04 10:05:00.048+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'fce884b4-28ea-4369-925f-6c9fe407d53f',	'2021-09-04 10:05:00.063+00',	'2021-09-04 10:05:00.063+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'463bd146-8cb5-4398-b58f-f607a4fd1681',	'2021-09-04 10:05:00.077+00',	'2021-09-04 10:05:00.077+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'7ade4930-d332-447f-a7e2-6ac75d6eaeff',	'2021-09-04 10:05:00.09+00',	'2021-09-04 10:05:00.09+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'304cd167-331f-4a8a-a856-d23b29d0fe06',	'2021-09-04 10:05:00.106+00',	'2021-09-04 10:05:00.106+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'f893f557-d330-495a-a0c1-64dadfd5ce5c',	'2021-09-04 10:05:00.12+00',	'2021-09-04 10:05:00.12+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'f035762c-4a24-4793-a6c6-a1c4dabe4491',	'2021-09-04 10:05:00.132+00',	'2021-09-04 10:05:00.132+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'b1ef55ee-ae2b-45cf-9dcc-db01d1aeab78',	'2021-09-04 10:05:00.145+00',	'2021-09-04 10:05:00.145+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'43ca798f-ce25-4bb2-b58e-6b7f24fef207',	'2021-09-04 10:05:00.155+00',	'2021-09-04 10:05:00.155+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'e90db212-2561-4c4f-8bce-03412661e510',	'2021-09-04 10:05:00.168+00',	'2021-09-04 10:05:00.168+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'd9e00da7-b061-44fb-a460-ba9e86ff738c',	'2021-09-04 10:05:00.181+00',	'2021-09-04 10:05:00.181+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'c6fad389-bee0-4a2c-b7ab-beb2fd0fa0f2',	'2021-09-04 10:05:00.194+00',	'2021-09-04 10:05:00.194+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'3ca374d3-ea57-40ce-bfeb-204d43b4c52f',	'2021-09-04 10:05:00.209+00',	'2021-09-04 10:05:00.209+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'e04c00e4-0a19-42fd-a627-aa2a461f4e57',	'2021-09-04 10:05:00.222+00',	'2021-09-04 10:05:00.222+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'a7e7dab2-0fef-4d55-a43b-4d9e1e338a0d',	'2021-09-04 10:05:00.235+00',	'2021-09-04 10:05:00.235+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'fe012a19-a2b6-421d-b67f-4ca19f38b4d9',	'2021-09-04 10:05:00.246+00',	'2021-09-04 10:05:00.246+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'b58f7190-6598-456e-8543-a01a40c51b48',	'2021-09-04 10:05:00.257+00',	'2021-09-04 10:05:00.257+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'0e3cd95a-0b08-4c29-a4fb-744d97d7e657',	'2021-09-04 10:05:00.267+00',	'2021-09-04 10:05:00.267+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'2fa0d93d-0bf7-473e-8921-a672f1aefb7b',	'2021-09-04 10:05:00.279+00',	'2021-09-04 10:05:00.279+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'32d55a17-5268-4ad0-83d5-cdd711316feb',	'2021-09-04 10:05:00.291+00',	'2021-09-04 10:05:00.291+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'a6b0ea5d-ccad-49ac-ae45-5301df7cf7e4',	'2021-09-04 10:05:00.301+00',	'2021-09-04 10:05:00.301+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'd5365df1-1798-440b-b041-3ac7c0f4a71e',	'2021-09-04 10:05:00.312+00',	'2021-09-04 10:05:00.312+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'384bce21-1904-4e51-9dab-54674529e74a',	'2021-09-04 10:05:00.324+00',	'2021-09-04 10:05:00.324+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'ec2b41e8-7edc-4749-ad96-0433bbbfb9e2',	'2021-09-04 10:05:00.335+00',	'2021-09-04 10:05:00.335+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'3f700573-fcea-4ec0-933f-ac7a70e73322',	'2021-09-04 10:05:00.346+00',	'2021-09-04 10:05:00.346+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'8094b4db-b4cc-4fee-b99b-7d126783ee06',	'2021-09-04 10:05:00.357+00',	'2021-09-04 10:05:00.357+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'3125d17f-f62c-45f4-a8f5-d8697894926d',	'2021-09-04 10:05:00.371+00',	'2021-09-04 10:05:00.371+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'4ae2375d-fc71-42eb-a3c3-6c2ec0291015',	'2021-09-04 10:05:00.385+00',	'2021-09-04 10:05:00.385+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'b1e3c33a-9904-4820-b532-2e0625205a16',	'2021-09-04 10:05:00.399+00',	'2021-09-04 10:05:00.399+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'ae7b931f-4748-48f0-95bf-4c77689c0f4f',	'2021-09-04 10:05:00.411+00',	'2021-09-04 10:05:00.411+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'32e6fb50-17b8-4421-9880-bb6186221d20',	'2021-09-04 10:05:00.425+00',	'2021-09-04 10:05:00.425+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'36da552d-f49f-4ea4-86c1-94ea9a620619',	'2021-09-04 10:05:00.439+00',	'2021-09-04 10:05:00.439+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'a0785f10-ef1c-4953-a66b-2230ad15723a',	'2021-09-04 10:05:00.453+00',	'2021-09-04 10:05:00.453+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'87494768-e96a-4d2c-b8b2-66daec1daf75',	'2021-09-04 10:05:00.467+00',	'2021-09-04 10:05:00.467+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'00bc1964-812c-46e8-bbae-b81bc6672c33',	'2021-09-04 10:05:00.48+00',	'2021-09-04 10:05:00.48+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'8ea11e9a-1cf5-4edc-b545-2e09fe955747',	'2021-09-04 10:05:00.493+00',	'2021-09-04 10:05:00.493+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'7ecb61fe-8ff0-4a42-bd67-d53c8837c3a0',	'2021-09-04 10:05:00.505+00',	'2021-09-04 10:05:00.505+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'b7cb770a-0146-4776-945e-f5ffe656f8c5',	'2021-09-04 10:05:00.519+00',	'2021-09-04 10:05:00.519+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'690e044b-ace3-4336-8a6d-41c23560d5bd',	'2021-09-04 10:05:00.532+00',	'2021-09-04 10:05:00.532+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'b7e6906f-02de-4d00-a7e4-88c887df9a70',	'2021-09-04 10:05:00.544+00',	'2021-09-04 10:05:00.544+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'f8e97bec-0ce5-4807-ba34-ee60848cd702',	'2021-09-04 10:05:00.556+00',	'2021-09-04 10:05:00.556+00'),
('d7d6ba8b-d38a-44aa-9aed-b2534263bb9c',	'f53cb5d1-415d-46e4-89e6-fa5159269bb8',	'2021-09-04 10:05:00.571+00',	'2021-09-04 10:05:00.571+00');

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
('f10b3bc8-9803-4003-89b4-315f8a432a94',	'068f87c3-241c-461e-bf24-e7371fdf5bb2',	'2021-09-04 10:04:59.944+00',	'2021-09-04 10:04:59.944+00'),
('f10b3bc8-9803-4003-89b4-315f8a432a94',	'778f453e-08eb-47d3-a694-7ff58a524208',	'2021-09-04 10:04:59.946+00',	'2021-09-04 10:04:59.946+00'),
('c6fad389-bee0-4a2c-b7ab-beb2fd0fa0f2',	'b26707db-518c-4f87-8c9f-5656bd85971a',	'2021-09-04 10:05:00.196+00',	'2021-09-04 10:05:00.196+00');

DROP TABLE IF EXISTS "refresh_token";
CREATE TABLE "public"."refresh_token" (
    "token" text NOT NULL,
    "userId" uuid,
    "expirationDate" timestamptz NOT NULL,
    CONSTRAINT "refresh_token_token" PRIMARY KEY ("token"),
    CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

-- 2021-09-04 10:19:05.013484+00
