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
('7896f59e-c34e-4d4a-a1f3-758a2e473c16',	'histoire',	'Histoire',	'2021-09-23 11:41:36.599+00',	'2021-09-23 11:41:36.599+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'sport',	'Sport',	'2021-09-23 11:41:36.602+00',	'2021-09-23 11:41:36.602+00'),
('4afef61e-75d9-4a9c-865a-c2d25cc56e1d',	'jeu-video',	'Jeu vidéo',	'2021-09-23 11:41:36.605+00',	'2021-09-23 11:41:36.605+00'),
('ad79c1c6-0ca6-4d99-a119-98359cfbbf77',	'cinema',	'Cinéma',	'2021-09-23 11:41:36.608+00',	'2021-09-23 11:41:36.608+00'),
('ea54a811-85e3-48fb-9004-c1620e6040a5',	'musique',	'Musique',	'2021-09-23 11:41:36.611+00',	'2021-09-23 11:41:36.611+00'),
('5342434d-55b9-483e-b5e2-affe7fdf6034',	'automobile',	'Automobile',	'2021-09-23 11:41:36.613+00',	'2021-09-23 11:41:36.613+00');

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
('2cac2fb3-1450-4341-a7a7-2ba68ed61fe9',	'football',	'Football',	'2021-09-23 11:41:36.582+00',	'2021-09-23 11:41:36.582+00'),
('dfa479c7-0cbe-49dc-bc0e-2383bd3ec272',	'mythologie',	'Mythologie',	'2021-09-23 11:41:36.586+00',	'2021-09-23 11:41:36.586+00'),
('ed53d27c-2df5-4ff2-985b-fc0f98fcf69e',	'usa',	'Etats-Unis d''Amérique',	'2021-09-23 11:41:36.589+00',	'2021-09-23 11:41:36.589+00'),
('e92edcd0-61bb-4381-bc70-323326b6e790',	'grece',	'Grèce',	'2021-09-23 11:41:36.595+00',	'2021-09-23 11:41:36.595+00');

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
('9cd53485-3bf6-410b-9f8d-4ea487a193a6',	'0',	'Combien fait 1 + 4 ?',	'{"answers": {"qcm": [{"content": "5", "is_good_answer": true}, {"content": "3", "is_good_answer": false}, {"content": "4", "is_good_answer": false}, {"content": "6", "is_good_answer": false}], "input": [{"content": "5", "errorAllowedCount": 0}, {"content": "Cinq"}]}, "additional": {"response_media": {"url": "http://example.com/toto.png", "info": "0 + 0 égale ? ..."}}}',	'approved',	'{"url": "http://example.com/calculatrice.png", "type": "image/png"}',	NULL,	'2021-09-23 11:41:36.621+00',	'2021-09-23 11:41:36.621+00'),
('0c6caa22-4329-46fb-a334-33ff82ab2d9b',	'0',	'En quelle année, Mao a-t-il lancé sa révolution culturelle ?',	'{"answers": {"qcm": [{"content": "1814", "is_good_answer": false}, {"content": "1865", "is_good_answer": false}, {"content": "1920", "is_good_answer": false}, {"content": "1966", "is_good_answer": true}], "input": [{"content": "1966", "errorAllowedCount": 0}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.633+00',	'2021-09-23 11:41:36.633+00'),
('b73ceaa4-de2a-41cd-bc85-1cfdd695e568',	'0',	'En quelle année les États-Unis ont-ils pris part à la Première Guerre mondiale ?',	'{"answers": {"qcm": [{"content": "1918", "is_good_answer": false}, {"content": "1915", "is_good_answer": false}, {"content": "1917", "is_good_answer": true}, {"content": "1916", "is_good_answer": false}], "input": [{"content": "1916", "errorAllowedCount": 0}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.642+00',	'2021-09-23 11:41:36.642+00'),
('3f102f16-90ed-4e6c-9500-f3f61fc0521a',	'0',	'Quels Jeux olympiques ont été supprimés à cause de la Seconde Guerre mondiale ?',	'{"answers": {"qcm": [{"content": "1936 et 1940", "is_good_answer": false}, {"content": "1944 et 1948", "is_good_answer": false}, {"content": "1940 et 1944", "is_good_answer": true}, {"content": "1932 et 1936", "is_good_answer": false}], "input": [{"content": "1940 et 1944", "errorAllowedCount": 0}, {"content": "1940 1944", "errorAllowedCount": 0}, {"content": "1940, 1944", "errorAllowedCount": 0}, {"content": "1940,1944", "errorAllowedCount": 0}, {"content": "1944 et 1940", "errorAllowedCount": 0}, {"content": "1944 1940", "errorAllowedCount": 0}, {"content": "1944, 1940", "errorAllowedCount": 0}, {"content": "1944,1940", "errorAllowedCount": 0}]}, "additional": {"response_media": {"url": null, "info": "Les Jeux ont été rénovés par le baron Pierre de Coubertin à la fin du XIXe siècle."}}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.65+00',	'2021-09-23 11:41:36.65+00'),
('650c9c5e-ed02-457f-aae0-e1d5395360a9',	'0',	'Dans les plaines de quel champ de bataille se dresse la Butte du Lion ?',	'{"answers": {"qcm": [{"content": "Verdun", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": true}, {"content": "Austerlitz", "is_good_answer": false}, {"content": "Valmy", "is_good_answer": false}], "input": [{"content": "Waterloo"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.658+00',	'2021-09-23 11:41:36.658+00'),
('f63f96d2-361f-4d23-bec0-74879ce8e0ff',	'0',	'Quelle ligne de défense française fut contournée par les Allemands en 1940 ?',	'{"answers": {"qcm": [{"content": "La ligne Siegfried", "is_good_answer": false}, {"content": "La ligne Maginot", "is_good_answer": true}, {"content": "La ligne verte", "is_good_answer": false}, {"content": "La ligne Daladier", "is_good_answer": false}], "input": [{"content": "La ligne Maginot"}, {"content": "Ligne Maginot"}, {"content": "Maginot"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.666+00',	'2021-09-23 11:41:36.666+00'),
('2029b127-c141-4770-9f69-243117ef6471',	'0',	'Le général Cambronne, qui commandait la vieille garde, eut une conduite héroïque à...',	'{"answers": {"qcm": [{"content": "Wagram", "is_good_answer": false}, {"content": "Iena", "is_good_answer": false}, {"content": "Midway", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": true}], "input": [{"content": "Waterloo"}, {"content": "La bataille de Waterloo"}, {"content": "Bataille de Waterloo"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.675+00',	'2021-09-23 11:41:36.675+00'),
('849fe0a4-4c33-46fd-b4ba-1c85cc1b872a',	'0',	'Où a eu lieu le grand procès des criminels de guerre nazis ?',	'{"answers": {"qcm": [{"content": "Berlin", "is_good_answer": false}, {"content": "Nuremberg", "is_good_answer": true}, {"content": "Hambourg", "is_good_answer": false}, {"content": "Munich", "is_good_answer": false}], "input": [{"content": "Nuremberg"}, {"content": "à Nuremberg"}]}, "additional": {"response_media": {"url": null, "info": "Le procès de Nuremberg fut intenté contre 24 responsables du Troisième Reich."}}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.683+00',	'2021-09-23 11:41:36.683+00'),
('4cfbf0ec-4ad4-426c-954d-3e920ac068f4',	'0',	'Qui est le personnage princiapl de l''Odysée d''Homère ?',	'{"answers": {"qcm": [{"content": "Sophocle", "is_good_answer": false}, {"content": "Ajax", "is_good_answer": false}, {"content": "Ulysse", "is_good_answer": true}, {"content": "Arkantos", "is_good_answer": false}], "input": [{"content": "Ulysse"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.696+00',	'2021-09-23 11:41:36.696+00'),
('34b61312-b2d9-4754-a9a6-bd3159dcd230',	'0',	'En quelle année la bataille de Waterloo a-t-elle eu lieu, à vingt kilomètres au sud de Bruxelles ?',	'{"answers": {"qcm": [{"content": "1815", "is_good_answer": true}, {"content": "1831", "is_good_answer": false}, {"content": "1809", "is_good_answer": false}, {"content": "1824", "is_good_answer": false}], "input": [{"content": "1815", "errorAllowedCount": 0}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.708+00',	'2021-09-23 11:41:36.708+00'),
('5421f5ab-386c-4a1b-aa6c-f23ffda4e127',	'0',	'Quel basketteur américain a été champion NBA en 1998 pour la sixième fois de sa carrière ?',	'{"answers": {"qcm": [{"content": "Patrick Ewing", "is_good_answer": false}, {"content": "Karl Malone", "is_good_answer": false}, {"content": "Charles Barkley", "is_good_answer": false}, {"content": "Michael Jordan", "is_good_answer": true}], "input": [{"content": "Michael Jordan"}, {"content": "Jordan"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.716+00',	'2021-09-23 11:41:36.716+00'),
('7bf2994d-03f9-4af8-ace6-3f718e300f5a',	'0',	'Dans quelle pays est né le joueur de basket-ball professionnel Tony Parker ?',	'{"answers": {"qcm": [{"content": "Belgique", "is_good_answer": true}, {"content": "USA", "is_good_answer": false}, {"content": "France", "is_good_answer": false}, {"content": "Pologne", "is_good_answer": false}], "input": [{"content": "en Belgique"}, {"content": "Belgique"}]}, "additional": {"response_media": {"url": null, "info": "Il évoluait dans l''équipe des Spurs de San Antonio depuis son arrivée dans la NBA en 2001."}}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.725+00',	'2021-09-23 11:41:36.725+00'),
('56d0f980-257f-467b-8830-d5995951e470',	'0',	'Qui a été élu joueur de la décennie 2000 suite à un sondage du site officiel NBA ?',	'{"answers": {"qcm": [{"content": "Derek Fisher", "is_good_answer": false}, {"content": "Ron Harper", "is_good_answer": false}, {"content": "Kobe Bryant", "is_good_answer": true}, {"content": "Rick Fox", "is_good_answer": false}], "input": [{"content": "Kobe Bryant"}, {"content": "Bryant"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.733+00',	'2021-09-23 11:41:36.733+00'),
('50486d63-cf21-42f8-9559-eae409ee8d02',	'0',	'Quel concours de dunks est organisé par la NBA durant le NBA All-Star Week-end ?',	'{"answers": {"qcm": [{"content": "Skills Challenge", "is_good_answer": false}, {"content": "Slam Dunk Contest", "is_good_answer": true}, {"content": "Three-point Shootout", "is_good_answer": false}, {"content": "All-Star Game", "is_good_answer": false}], "input": [{"content": "Slam Dunk Contest"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.741+00',	'2021-09-23 11:41:36.741+00'),
('2145b957-2134-4fe0-9098-7fdf5797f511',	'0',	'Quel basketteur américain a réalisé en 2000 un 360 degrés inversé mythique ?',	'{"answers": {"qcm": [{"content": "Jarnell Stokes", "is_good_answer": false}, {"content": "Vince Carter", "is_good_answer": true}, {"content": "Marc Gasol", "is_good_answer": false}, {"content": "Andrew Harrison", "is_good_answer": false}], "input": [{"content": "Vince Carter"}, {"content": "Carter"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.749+00',	'2021-09-23 11:41:36.749+00'),
('12f5b502-3382-4395-84a3-a9b3715078d5',	'0',	'Quel joueur de NBA se définit lui-même comme un « viking africain » ?',	'{"answers": {"qcm": [{"content": "Derrick Rose", "is_good_answer": false}, {"content": "Pau Gasol", "is_good_answer": false}, {"content": "Aaron Brooks", "is_good_answer": false}, {"content": "Joakim Noah", "is_good_answer": true}], "input": [{"content": "Joakim Noah"}, {"content": "Noah"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.758+00',	'2021-09-23 11:41:36.758+00'),
('72f0a609-6bda-4552-bb65-58aa5e171da9',	'0',	'Quel événement annuel majeur de la NBA est comparable à une bourse de joueurs ?',	'{"answers": {"qcm": [{"content": "La franchise", "is_good_answer": false}, {"content": "Les playoffs", "is_good_answer": false}, {"content": "Le ballotage", "is_good_answer": false}, {"content": "La draft", "is_good_answer": true}], "input": [{"content": "La Draft"}, {"content": "Draft"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.766+00',	'2021-09-23 11:41:36.766+00'),
('e96b11ab-8429-447b-a78f-c6b1798fdab6',	'0',	'Combien de titres de champion NBA Michael Jordan a-t-il obtenu ?',	'{"answers": {"qcm": [{"content": "Cinq", "is_good_answer": false}, {"content": "Sept", "is_good_answer": false}, {"content": "Six", "is_good_answer": true}, {"content": "Quatre", "is_good_answer": false}], "input": [{"content": "Six"}, {"content": "6", "errorAllowedCount": 0}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.775+00',	'2021-09-23 11:41:36.775+00'),
('7c30c182-458c-422a-aa38-84984f6624ff',	'0',	'Qui est le premier joueur français à avoir été sacré champion NBA ?',	'{"answers": {"qcm": [{"content": "Joe Dumars", "is_good_answer": false}, {"content": "Paul Pierce", "is_good_answer": false}, {"content": "Tony Parker", "is_good_answer": true}, {"content": "Tim Duncan", "is_good_answer": false}], "input": [{"content": "Tony Parker"}, {"content": "Parker"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.783+00',	'2021-09-23 11:41:36.783+00'),
('5c750fbc-c23c-47e9-8a21-85be4750f355',	'0',	'Qui a été élu deux fois meilleur joueur de la NBA, en 2005 et 2006 ?',	'{"answers": {"qcm": [{"content": "Jeff Brown", "is_good_answer": false}, {"content": "Dana Jones", "is_good_answer": false}, {"content": "Marlon Garnett", "is_good_answer": false}, {"content": "Steve Nash", "is_good_answer": true}], "input": [{"content": "Steve Nash"}, {"content": "Nash"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.792+00',	'2021-09-23 11:41:36.792+00'),
('4744d1a5-ff6b-477a-ba95-c2ab2960f084',	'0',	'Quel gagnant de la « Nouvelle Star », diffusée sur M6, est surnommé « La Tortue » ?',	'{"answers": {"qcm": [{"content": "Christophe Willem", "is_good_answer": true}, {"content": "Julien Doré", "is_good_answer": false}, {"content": "Jonatan Cerrada", "is_good_answer": false}, {"content": "Steeve Estatof", "is_good_answer": false}], "input": [{"content": "Christophe Willem"}, {"content": "Willem"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.802+00',	'2021-09-23 11:41:36.802+00'),
('bf43aad4-dfe2-4713-95cc-b29e28e91110',	'0',	'En 1991, quel tube Yannick Noah a-t-il associé à la victoire de la France en coupe Davis ?',	'{"answers": {"qcm": [{"content": "Vagabond", "is_good_answer": false}, {"content": "Les Lionnes", "is_good_answer": false}, {"content": "Saga Africa", "is_good_answer": true}, {"content": "Ose", "is_good_answer": false}], "input": [{"content": "Saga Africa"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.814+00',	'2021-09-23 11:41:36.814+00'),
('8a327212-65a7-4873-9942-cfe9d071e10b',	'0',	'Quel chanteur prénommé Mathieu a émergé du succès remporté par les Linkup ?',	'{"answers": {"qcm": [{"content": "Corneille", "is_good_answer": false}, {"content": "Keen''V", "is_good_answer": false}, {"content": "Raphaël", "is_good_answer": false}, {"content": "M. Pokora", "is_good_answer": true}], "input": [{"content": "M. Pokora"}, {"content": "Matt Pokora"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.822+00',	'2021-09-23 11:41:36.822+00'),
('d6bdacd1-7f50-4249-96c4-9086776867bb',	'0',	'Quel est le style musical de l''album de Rohff, « La fierté des années » ?',	'{"answers": {"qcm": [{"content": "La Techno", "is_good_answer": false}, {"content": "Le tango", "is_good_answer": false}, {"content": "Le disco", "is_good_answer": false}, {"content": "Le rap", "is_good_answer": true}], "input": [{"content": "Le rap"}, {"content": "Rap"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.829+00',	'2021-09-23 11:41:36.829+00'),
('bdec609f-e513-42f3-946f-511dabc38388',	'0',	'Quel Américano-Libanais est entré dans les charts avec « Life in Cartoon Motion » ?',	'{"answers": {"qcm": [{"content": "Mika", "is_good_answer": true}, {"content": "Iwan", "is_good_answer": false}, {"content": "Rida", "is_good_answer": false}, {"content": "K. Maro", "is_good_answer": false}], "input": [{"content": "Mika"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.838+00',	'2021-09-23 11:41:36.838+00'),
('7b5af269-6315-4a13-8ad1-0a8d452166af',	'0',	'Qui a chanté au pied de …onnes le 10 juin 2000 ?',	'{"answers": {"qcm": [{"content": "Eddy Mitchell", "is_good_answer": false}, {"content": "Patrick Bruel", "is_good_answer": false}, {"content": "Christophe Maé", "is_good_answer": false}, {"content": "Johnny Hallyday", "is_good_answer": true}], "input": [{"content": "Johnny Hallyday"}, {"content": "Johnny"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.846+00',	'2021-09-23 11:41:36.846+00'),
('4f70c8b0-bf77-4aad-9b4a-8a15b71f01f6',	'0',	'Avec quel chanteur le top model Heidi Klum a-t-elle été mariée durant sept ans ?',	'{"answers": {"qcm": [{"content": "Seal", "is_good_answer": true}, {"content": "Paul McCartney", "is_good_answer": false}, {"content": "Sean Paul", "is_good_answer": false}, {"content": "Robbie Williams", "is_good_answer": false}], "input": [{"content": "Seal"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.863+00',	'2021-09-23 11:41:36.863+00'),
('f320af49-dc05-46f9-bbe0-d1d52009bb3e',	'0',	'Quel DJ a repris un titre des années 80 pour faire un tube avec « Living On Video » ?',	'{"answers": {"qcm": [{"content": "Pakito", "is_good_answer": true}, {"content": "Vitalic", "is_good_answer": false}, {"content": "Madeon", "is_good_answer": false}, {"content": "Brodinski", "is_good_answer": false}], "input": [{"content": "Pakito"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.871+00',	'2021-09-23 11:41:36.871+00'),
('3dc72aac-83ed-40c6-a7f9-4d1827b636cf',	'0',	'Quel chanteur a sorti « Musicology » puis « 3121 » deux ans plus tard ?',	'{"answers": {"qcm": [{"content": "Bob James", "is_good_answer": false}, {"content": "Al Jarreau", "is_good_answer": false}, {"content": "Prince", "is_good_answer": true}, {"content": "James Brown", "is_good_answer": false}], "input": [{"content": "Prince"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.878+00',	'2021-09-23 11:41:36.878+00'),
('71100ed8-8e01-4a52-9d5b-8fe3b16456a6',	'0',	'Sous quel nom le rappeur et homme d''affaires américain Curtis Jackson fait-il carrière ?',	'{"answers": {"qcm": [{"content": "50 cent", "is_good_answer": true}, {"content": "Fat Joe", "is_good_answer": false}, {"content": "Big Sean", "is_good_answer": false}, {"content": "Mike D", "is_good_answer": false}], "input": [{"content": "50 cent"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.855+00',	'2021-09-23 11:41:36.855+00'),
('d556bde6-ff7c-4f35-9f1f-f84548b3d6d2',	'0',	'Dans quel pays se situe le circuit de course automobile du Mans ?',	'{"answers": {"qcm": [{"content": "Pays-Bas", "is_good_answer": false}, {"content": "Suisse", "is_good_answer": false}, {"content": "Belgique", "is_good_answer": false}, {"content": "France", "is_good_answer": true}], "input": [{"content": "France"}, {"content": "La France"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.886+00',	'2021-09-23 11:41:36.886+00'),
('f3c86ce5-ca6e-4ec3-9bce-e64031afda7b',	'0',	'À quel modèle de voiture ressemble le vieux tacot jaune que conduit Gaston Lagaffe ?',	'{"answers": {"qcm": [{"content": "Rolls-Royce", "is_good_answer": false}, {"content": "Citroën B10", "is_good_answer": false}, {"content": "Fiat 509", "is_good_answer": true}, {"content": "Jeep", "is_good_answer": false}], "input": [{"content": "Fiat 509"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.895+00',	'2021-09-23 11:41:36.895+00'),
('f871953e-7f8c-4f5a-a2d7-af36aed80b1e',	'0',	'Quel sport automobile consiste à accélérer le plus rapidement possible avec son véhicule ?',	'{"answers": {"qcm": [{"content": "Le trial", "is_good_answer": false}, {"content": "Le Drift", "is_good_answer": false}, {"content": "Le Monster truck", "is_good_answer": false}, {"content": "Le Dragster", "is_good_answer": true}], "input": [{"content": "Le Dragster"}, {"content": "Dragster"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.904+00',	'2021-09-23 11:41:36.904+00'),
('33350d30-ea45-453d-b260-7df07c4d4161',	'0',	'Comment s''appelle le véhicule du personnage de bande dessinée Batman ?',	'{"answers": {"qcm": [{"content": "La BatDrive", "is_good_answer": false}, {"content": "La Batauto", "is_good_answer": false}, {"content": "La Batcar", "is_good_answer": false}, {"content": "La Batmobile", "is_good_answer": true}], "input": [{"content": "La Batmobile"}, {"content": "Batmobile"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.914+00',	'2021-09-23 11:41:36.914+00'),
('1754d6df-952a-4cc7-b3ae-8de0648a6a6e',	'0',	'De quand date le Duster, véhicule utilitaire sport vendu par la marque roumaine Dacia ?',	'{"answers": {"qcm": [{"content": "2006", "is_good_answer": false}, {"content": "2008", "is_good_answer": false}, {"content": "2010", "is_good_answer": true}, {"content": "2012", "is_good_answer": false}], "input": [{"content": "2010", "errorAllowedCount": 0}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.923+00',	'2021-09-23 11:41:36.923+00'),
('002db3b3-8c9c-48d0-a34a-1413c18d4a87',	'0',	'En France, refuser une priorité peut vous coûter combien de points sur le permis ?',	'{"answers": {"qcm": [{"content": "6 points", "is_good_answer": false}, {"content": "8 points", "is_good_answer": false}, {"content": "4 points", "is_good_answer": true}, {"content": "2 points", "is_good_answer": false}], "input": [{"content": "4 points", "errorAllowedCount": 0}, {"content": "4", "errorAllowedCount": 0}, {"content": "quatre"}, {"content": "quatre points"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.932+00',	'2021-09-23 11:41:36.932+00'),
('3411c3d7-b556-422d-8a58-3c5db0f57985',	'0',	'Quelle principauté accueille l''un des plus prestigieux Grand Prix de Formule 1 ?',	'{"answers": {"qcm": [{"content": "Liechtenstein", "is_good_answer": false}, {"content": "Andorre", "is_good_answer": false}, {"content": "Mantoue", "is_good_answer": false}, {"content": "Monaco", "is_good_answer": true}], "input": [{"content": "Monaco"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.941+00',	'2021-09-23 11:41:36.941+00'),
('50fa5488-46a5-4574-afd1-39cba435572a',	'0',	'Dans le monde automobile, quel sigle correspond au Grand Tourisme Injection ?',	'{"answers": {"qcm": [{"content": "sport", "is_good_answer": false}, {"content": "Gti", "is_good_answer": true}, {"content": "TT", "is_good_answer": false}, {"content": "Turbo", "is_good_answer": false}], "input": [{"content": "GTI", "errorAllowedCount": 0}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.95+00',	'2021-09-23 11:41:36.95+00'),
('d9e89fca-c32c-49f4-bfc3-60f7928fb9d4',	'0',	'Quelle société appartenant au groupe Belron « répare et remplace » votre pare-brise ?',	'{"answers": {"qcm": [{"content": "Carglass", "is_good_answer": true}, {"content": "Midas", "is_good_answer": false}, {"content": "Speedy", "is_good_answer": false}, {"content": "Norauto", "is_good_answer": false}], "input": [{"content": "Carglass"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.96+00',	'2021-09-23 11:41:36.96+00'),
('7e046ac3-2b56-4df7-a18a-2588129b4be9',	'0',	'Quelle firme automobile, filiale française de FIAT, a ensuite intégré le groupe Chrysler ?',	'{"answers": {"qcm": [{"content": "Simca", "is_good_answer": true}, {"content": "Hommell", "is_good_answer": false}, {"content": "Packard", "is_good_answer": false}, {"content": "Triumph", "is_good_answer": false}], "input": [{"content": "Simca"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.97+00',	'2021-09-23 11:41:36.97+00'),
('6e435aa5-1b72-49a7-ab28-5236dce6bd92',	'0',	'Dans quel jeu peux on voir des Chocobos ?',	'{"answers": {"qcm": [{"content": "Breath of fire", "is_good_answer": false}, {"content": "Final Fantasy", "is_good_answer": true}, {"content": "Secret of Mana", "is_good_answer": false}, {"content": "Golden stun", "is_good_answer": false}], "input": [{"content": "Final Fantasy"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.979+00',	'2021-09-23 11:41:36.979+00'),
('e0ecce7f-9317-442c-8c07-51c57c4489e3',	'0',	'Salamèche évolue en ',	'{"answers": {"qcm": [{"content": "Dracaufeu", "is_good_answer": false}, {"content": "Reptincel", "is_good_answer": true}, {"content": "Magna", "is_good_answer": false}, {"content": "Ptera", "is_good_answer": false}], "input": [{"content": "Reptincel"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.987+00',	'2021-09-23 11:41:36.987+00'),
('752f0657-9202-47f0-8509-4cb2738a1fd6',	'0',	'Zelda est un jeu du genre',	'{"answers": {"qcm": [{"content": "Aventure", "is_good_answer": true}, {"content": "RPG", "is_good_answer": false}, {"content": "Course", "is_good_answer": false}, {"content": "Simulation", "is_good_answer": false}], "input": [{"content": "Aventure"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:36.995+00',	'2021-09-23 11:41:36.995+00'),
('e83e024a-d326-4e00-a1e7-04a7bb287f16',	'0',	'Sur quelle plateforme le jeu Tekken est sorti en premier ?',	'{"answers": {"qcm": [{"content": "La borne d''arcade", "is_good_answer": true}, {"content": "NES", "is_good_answer": false}, {"content": "Playstation", "is_good_answer": false}, {"content": "Gamecube", "is_good_answer": false}], "input": [{"content": "La borne d''arcade"}, {"content": "Borne d''arcade"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:37.003+00',	'2021-09-23 11:41:37.003+00'),
('7291d4e7-9d0b-45fc-b1f9-aef46166386b',	'0',	'Dans quel jeu le personnage de Mario a-t-il été développé en premier ?',	'{"answers": {"qcm": [{"content": "Super Mario", "is_good_answer": false}, {"content": "Super Mario Bros", "is_good_answer": false}, {"content": "Donkey Kong", "is_good_answer": true}, {"content": "Mario Party", "is_good_answer": false}], "input": [{"content": "Donkey Kong"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:37.013+00',	'2021-09-23 11:41:37.013+00'),
('871b5a02-e55c-469d-af1a-29a78b6527a8',	'0',	'La série Fallout est la suite « spirituelle » de quel jeu ?',	'{"answers": {"qcm": [{"content": "Wasteland", "is_good_answer": true}, {"content": "Homeland", "is_good_answer": false}, {"content": "Falland", "is_good_answer": false}, {"content": "Skyrim", "is_good_answer": false}], "input": [{"content": "Wasteland"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:37.021+00',	'2021-09-23 11:41:37.021+00'),
('ca1de0ef-0d87-4b7b-83f3-ba5e7ccf700b',	'0',	'Que signifie le nom de la serie GTA ?',	'{"answers": {"qcm": [{"content": "Burnout", "is_good_answer": false}, {"content": "Conduite dangeureuse", "is_good_answer": false}, {"content": "Vol de voiture", "is_good_answer": true}, {"content": "Voiture customisé", "is_good_answer": false}], "input": [{"content": "Vol de voiture"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:37.029+00',	'2021-09-23 11:41:37.029+00'),
('9852dcf8-c05a-46ab-8c0b-b92f9cb205f9',	'0',	'Le jeu Counter Strike dérive de quel autre jeu ?',	'{"answers": {"qcm": [{"content": "Half Life", "is_good_answer": true}, {"content": "Splinter Cell", "is_good_answer": false}, {"content": "Doom", "is_good_answer": false}, {"content": "Call of Duty", "is_good_answer": false}], "input": [{"content": "Half Life"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:37.037+00',	'2021-09-23 11:41:37.037+00'),
('fccf3a1a-5489-48d6-9a2f-1df2510bbe9e',	'0',	'Dans Pac man qu''est ce qui hante le labyrinthe ?',	'{"answers": {"qcm": [{"content": "Des plantes carnivores", "is_good_answer": false}, {"content": "Des fantômes", "is_good_answer": true}, {"content": "Des squelettes", "is_good_answer": false}, {"content": "Des zombies", "is_good_answer": false}], "input": [{"content": "Des fantômes"}, {"content": "Fantômes"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:37.045+00',	'2021-09-23 11:41:37.045+00'),
('91e4b63e-8828-4428-876f-b12c7eabbee3',	'0',	'Dans la légende de Zelda, comment s''appelle le héros ?',	'{"answers": {"qcm": [{"content": "Zelda", "is_good_answer": false}, {"content": "Bruno", "is_good_answer": false}, {"content": "Ganondorf", "is_good_answer": false}, {"content": "Link", "is_good_answer": true}], "input": [{"content": "Link"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:37.053+00',	'2021-09-23 11:41:37.053+00'),
('cf58fda0-0f85-4550-b2bd-9fbe0cdaa131',	'0',	'Qui est le compagnon de Batman ?',	'{"answers": {"qcm": [{"content": "Robin", "is_good_answer": true}, {"content": "Le Joker", "is_good_answer": false}, {"content": "Leroy", "is_good_answer": false}, {"content": "Clark Kent", "is_good_answer": false}], "input": [{"content": "Robin"}]}}',	'pending',	'{}',	NULL,	'2021-09-23 11:41:37.062+00',	'2021-09-23 11:41:37.062+00'),
('f5d1ed6c-0a96-4209-a71f-42d2cef3c86a',	'0',	'Quel super héros ne se sépare jamais de son marteau forgé par les nains ',	'{"answers": {"qcm": [{"content": "Hulk", "is_good_answer": false}, {"content": "Aquaman", "is_good_answer": false}, {"content": "Rhino", "is_good_answer": false}, {"content": "Thor", "is_good_answer": true}], "input": [{"content": "Thor"}]}}',	'pending',	'{}',	NULL,	'2021-09-23 11:41:37.07+00',	'2021-09-23 11:41:37.07+00'),
('b8d4067e-d2cc-4168-be4f-62337bf6fb09',	'0',	'Quel super-héros à la force surhumaine ressemble à un être de pierre ?',	'{"answers": {"qcm": [{"content": "Hawkman", "is_good_answer": false}, {"content": "Plastic Man", "is_good_answer": false}, {"content": "Superboy", "is_good_answer": false}, {"content": "La Chose", "is_good_answer": true}], "input": [{"content": "La Chose"}]}}',	'disapproved',	'{}',	NULL,	'2021-09-23 11:41:37.078+00',	'2021-09-23 11:41:37.078+00'),
('f9c19b5b-78d9-47e3-bb6c-116a2d5d6ce0',	'0',	'Quel super-héros porte un costume inspiré du drapeau américain ?',	'{"answers": {"qcm": [{"content": "Tigra", "is_good_answer": false}, {"content": "Iron Man", "is_good_answer": false}, {"content": "Blade", "is_good_answer": false}, {"content": "Captain America", "is_good_answer": true}], "input": [{"content": "Captain America"}]}}',	'disapproved',	'{}',	NULL,	'2021-09-23 11:41:37.086+00',	'2021-09-23 11:41:37.086+00'),
('fc7d98a3-f180-409b-b1ab-0370ba2a5f6c',	'0',	'Quel poète français est connu pour ses fables ?',	'{"answers": {"qcm": [{"content": "Pierre Corneille", "is_good_answer": false}, {"content": "Esope", "is_good_answer": false}, {"content": "Jean Racine", "is_good_answer": false}, {"content": "Jean de La Fontaine", "is_good_answer": true}], "input": [{"content": "Jean de La Fontaine"}, {"content": "de La Fontaine"}, {"content": "La Fontaine"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:37.094+00',	'2021-09-23 11:41:37.094+00'),
('c35ec22c-fff5-45f8-8620-88add8d9f481',	'1',	'Quel élément chimique porte le numéro atomique 30 ?',	'{"answers": {"qcm": [{"content": "L''argent", "is_good_answer": false}, {"content": "Le zinc", "is_good_answer": true}, {"content": "le carbone", "is_good_answer": false}, {"content": "le soufre", "is_good_answer": false}], "input": [{"content": "Le zinc"}, {"content": "Zinc"}, {"content": "Zn", "errorAllowedCount": 0}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:37.102+00',	'2021-09-23 11:41:37.102+00'),
('7dcae2d4-77fb-4592-868c-92d28a5b79f7',	'1',	'Quel seigneur Albanais est vu comme un héros national suite à sa résistance aux Ottomans ?',	'{"answers": {"qcm": [{"content": "Vlad Tepes", "is_good_answer": false}, {"content": "Ivan Sirkhov", "is_good_answer": false}, {"content": "Skanderbeg", "is_good_answer": true}, {"content": "Baybars", "is_good_answer": false}], "input": [{"content": "Georges Castriote Skanderbeg"}, {"content": "Georges Castriote"}, {"content": "Castriote"}, {"content": "Scanderbeg"}, {"content": "Skanderbeg"}]}}',	'approved',	'{}',	NULL,	'2021-09-23 11:41:37.11+00',	'2021-09-23 11:41:37.11+00');

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
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'classic',	'Classique',	'2021-09-23 11:41:36.566+00',	'2021-09-23 11:41:36.566+00'),
('a8839246-3110-4376-b154-199232a860d4',	'blind-test',	'Blind Test',	'2021-09-23 11:41:36.578+00',	'2021-09-23 11:41:36.578+00');

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
('7896f59e-c34e-4d4a-a1f3-758a2e473c16',	'9cd53485-3bf6-410b-9f8d-4ea487a193a6',	'2021-09-23 11:41:36.628+00',	'2021-09-23 11:41:36.628+00'),
('7896f59e-c34e-4d4a-a1f3-758a2e473c16',	'0c6caa22-4329-46fb-a334-33ff82ab2d9b',	'2021-09-23 11:41:36.637+00',	'2021-09-23 11:41:36.637+00'),
('7896f59e-c34e-4d4a-a1f3-758a2e473c16',	'b73ceaa4-de2a-41cd-bc85-1cfdd695e568',	'2021-09-23 11:41:36.646+00',	'2021-09-23 11:41:36.646+00'),
('7896f59e-c34e-4d4a-a1f3-758a2e473c16',	'3f102f16-90ed-4e6c-9500-f3f61fc0521a',	'2021-09-23 11:41:36.654+00',	'2021-09-23 11:41:36.654+00'),
('7896f59e-c34e-4d4a-a1f3-758a2e473c16',	'650c9c5e-ed02-457f-aae0-e1d5395360a9',	'2021-09-23 11:41:36.662+00',	'2021-09-23 11:41:36.662+00'),
('7896f59e-c34e-4d4a-a1f3-758a2e473c16',	'f63f96d2-361f-4d23-bec0-74879ce8e0ff',	'2021-09-23 11:41:36.671+00',	'2021-09-23 11:41:36.671+00'),
('7896f59e-c34e-4d4a-a1f3-758a2e473c16',	'2029b127-c141-4770-9f69-243117ef6471',	'2021-09-23 11:41:36.679+00',	'2021-09-23 11:41:36.679+00'),
('7896f59e-c34e-4d4a-a1f3-758a2e473c16',	'849fe0a4-4c33-46fd-b4ba-1c85cc1b872a',	'2021-09-23 11:41:36.688+00',	'2021-09-23 11:41:36.688+00'),
('7896f59e-c34e-4d4a-a1f3-758a2e473c16',	'4cfbf0ec-4ad4-426c-954d-3e920ac068f4',	'2021-09-23 11:41:36.702+00',	'2021-09-23 11:41:36.702+00'),
('7896f59e-c34e-4d4a-a1f3-758a2e473c16',	'34b61312-b2d9-4754-a9a6-bd3159dcd230',	'2021-09-23 11:41:36.712+00',	'2021-09-23 11:41:36.712+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'5421f5ab-386c-4a1b-aa6c-f23ffda4e127',	'2021-09-23 11:41:36.72+00',	'2021-09-23 11:41:36.72+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'7bf2994d-03f9-4af8-ace6-3f718e300f5a',	'2021-09-23 11:41:36.729+00',	'2021-09-23 11:41:36.729+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'56d0f980-257f-467b-8830-d5995951e470',	'2021-09-23 11:41:36.737+00',	'2021-09-23 11:41:36.737+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'50486d63-cf21-42f8-9559-eae409ee8d02',	'2021-09-23 11:41:36.745+00',	'2021-09-23 11:41:36.745+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'2145b957-2134-4fe0-9098-7fdf5797f511',	'2021-09-23 11:41:36.753+00',	'2021-09-23 11:41:36.753+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'12f5b502-3382-4395-84a3-a9b3715078d5',	'2021-09-23 11:41:36.761+00',	'2021-09-23 11:41:36.761+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'72f0a609-6bda-4552-bb65-58aa5e171da9',	'2021-09-23 11:41:36.77+00',	'2021-09-23 11:41:36.77+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'e96b11ab-8429-447b-a78f-c6b1798fdab6',	'2021-09-23 11:41:36.779+00',	'2021-09-23 11:41:36.779+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'7c30c182-458c-422a-aa38-84984f6624ff',	'2021-09-23 11:41:36.787+00',	'2021-09-23 11:41:36.787+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'5c750fbc-c23c-47e9-8a21-85be4750f355',	'2021-09-23 11:41:36.797+00',	'2021-09-23 11:41:36.797+00'),
('ea54a811-85e3-48fb-9004-c1620e6040a5',	'4744d1a5-ff6b-477a-ba95-c2ab2960f084',	'2021-09-23 11:41:36.809+00',	'2021-09-23 11:41:36.809+00'),
('ea54a811-85e3-48fb-9004-c1620e6040a5',	'bf43aad4-dfe2-4713-95cc-b29e28e91110',	'2021-09-23 11:41:36.818+00',	'2021-09-23 11:41:36.818+00'),
('ea54a811-85e3-48fb-9004-c1620e6040a5',	'8a327212-65a7-4873-9942-cfe9d071e10b',	'2021-09-23 11:41:36.825+00',	'2021-09-23 11:41:36.825+00'),
('ea54a811-85e3-48fb-9004-c1620e6040a5',	'd6bdacd1-7f50-4249-96c4-9086776867bb',	'2021-09-23 11:41:36.834+00',	'2021-09-23 11:41:36.834+00'),
('ea54a811-85e3-48fb-9004-c1620e6040a5',	'bdec609f-e513-42f3-946f-511dabc38388',	'2021-09-23 11:41:36.841+00',	'2021-09-23 11:41:36.841+00'),
('ea54a811-85e3-48fb-9004-c1620e6040a5',	'7b5af269-6315-4a13-8ad1-0a8d452166af',	'2021-09-23 11:41:36.85+00',	'2021-09-23 11:41:36.85+00'),
('ea54a811-85e3-48fb-9004-c1620e6040a5',	'71100ed8-8e01-4a52-9d5b-8fe3b16456a6',	'2021-09-23 11:41:36.858+00',	'2021-09-23 11:41:36.858+00'),
('ea54a811-85e3-48fb-9004-c1620e6040a5',	'4f70c8b0-bf77-4aad-9b4a-8a15b71f01f6',	'2021-09-23 11:41:36.867+00',	'2021-09-23 11:41:36.867+00'),
('ea54a811-85e3-48fb-9004-c1620e6040a5',	'f320af49-dc05-46f9-bbe0-d1d52009bb3e',	'2021-09-23 11:41:36.874+00',	'2021-09-23 11:41:36.874+00'),
('ea54a811-85e3-48fb-9004-c1620e6040a5',	'3dc72aac-83ed-40c6-a7f9-4d1827b636cf',	'2021-09-23 11:41:36.882+00',	'2021-09-23 11:41:36.882+00'),
('5342434d-55b9-483e-b5e2-affe7fdf6034',	'd556bde6-ff7c-4f35-9f1f-f84548b3d6d2',	'2021-09-23 11:41:36.89+00',	'2021-09-23 11:41:36.89+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'd556bde6-ff7c-4f35-9f1f-f84548b3d6d2',	'2021-09-23 11:41:36.891+00',	'2021-09-23 11:41:36.891+00'),
('5342434d-55b9-483e-b5e2-affe7fdf6034',	'f3c86ce5-ca6e-4ec3-9bce-e64031afda7b',	'2021-09-23 11:41:36.899+00',	'2021-09-23 11:41:36.899+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'f3c86ce5-ca6e-4ec3-9bce-e64031afda7b',	'2021-09-23 11:41:36.899+00',	'2021-09-23 11:41:36.899+00'),
('5342434d-55b9-483e-b5e2-affe7fdf6034',	'f871953e-7f8c-4f5a-a2d7-af36aed80b1e',	'2021-09-23 11:41:36.909+00',	'2021-09-23 11:41:36.909+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'f871953e-7f8c-4f5a-a2d7-af36aed80b1e',	'2021-09-23 11:41:36.91+00',	'2021-09-23 11:41:36.91+00'),
('5342434d-55b9-483e-b5e2-affe7fdf6034',	'33350d30-ea45-453d-b260-7df07c4d4161',	'2021-09-23 11:41:36.918+00',	'2021-09-23 11:41:36.918+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'33350d30-ea45-453d-b260-7df07c4d4161',	'2021-09-23 11:41:36.919+00',	'2021-09-23 11:41:36.919+00'),
('5342434d-55b9-483e-b5e2-affe7fdf6034',	'1754d6df-952a-4cc7-b3ae-8de0648a6a6e',	'2021-09-23 11:41:36.927+00',	'2021-09-23 11:41:36.927+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'1754d6df-952a-4cc7-b3ae-8de0648a6a6e',	'2021-09-23 11:41:36.928+00',	'2021-09-23 11:41:36.928+00'),
('5342434d-55b9-483e-b5e2-affe7fdf6034',	'002db3b3-8c9c-48d0-a34a-1413c18d4a87',	'2021-09-23 11:41:36.936+00',	'2021-09-23 11:41:36.936+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'002db3b3-8c9c-48d0-a34a-1413c18d4a87',	'2021-09-23 11:41:36.937+00',	'2021-09-23 11:41:36.937+00'),
('5342434d-55b9-483e-b5e2-affe7fdf6034',	'3411c3d7-b556-422d-8a58-3c5db0f57985',	'2021-09-23 11:41:36.945+00',	'2021-09-23 11:41:36.945+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'3411c3d7-b556-422d-8a58-3c5db0f57985',	'2021-09-23 11:41:36.946+00',	'2021-09-23 11:41:36.946+00'),
('5342434d-55b9-483e-b5e2-affe7fdf6034',	'50fa5488-46a5-4574-afd1-39cba435572a',	'2021-09-23 11:41:36.954+00',	'2021-09-23 11:41:36.954+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'50fa5488-46a5-4574-afd1-39cba435572a',	'2021-09-23 11:41:36.955+00',	'2021-09-23 11:41:36.955+00'),
('5342434d-55b9-483e-b5e2-affe7fdf6034',	'd9e89fca-c32c-49f4-bfc3-60f7928fb9d4',	'2021-09-23 11:41:36.964+00',	'2021-09-23 11:41:36.964+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'd9e89fca-c32c-49f4-bfc3-60f7928fb9d4',	'2021-09-23 11:41:36.964+00',	'2021-09-23 11:41:36.964+00'),
('5342434d-55b9-483e-b5e2-affe7fdf6034',	'7e046ac3-2b56-4df7-a18a-2588129b4be9',	'2021-09-23 11:41:36.974+00',	'2021-09-23 11:41:36.974+00'),
('d26b1e2b-d973-4ed7-a9d6-b65ef48a5a88',	'7e046ac3-2b56-4df7-a18a-2588129b4be9',	'2021-09-23 11:41:36.975+00',	'2021-09-23 11:41:36.975+00'),
('4afef61e-75d9-4a9c-865a-c2d25cc56e1d',	'6e435aa5-1b72-49a7-ab28-5236dce6bd92',	'2021-09-23 11:41:36.983+00',	'2021-09-23 11:41:36.983+00'),
('4afef61e-75d9-4a9c-865a-c2d25cc56e1d',	'e0ecce7f-9317-442c-8c07-51c57c4489e3',	'2021-09-23 11:41:36.991+00',	'2021-09-23 11:41:36.991+00'),
('4afef61e-75d9-4a9c-865a-c2d25cc56e1d',	'752f0657-9202-47f0-8509-4cb2738a1fd6',	'2021-09-23 11:41:36.999+00',	'2021-09-23 11:41:36.999+00'),
('4afef61e-75d9-4a9c-865a-c2d25cc56e1d',	'e83e024a-d326-4e00-a1e7-04a7bb287f16',	'2021-09-23 11:41:37.008+00',	'2021-09-23 11:41:37.008+00'),
('4afef61e-75d9-4a9c-865a-c2d25cc56e1d',	'7291d4e7-9d0b-45fc-b1f9-aef46166386b',	'2021-09-23 11:41:37.017+00',	'2021-09-23 11:41:37.017+00'),
('4afef61e-75d9-4a9c-865a-c2d25cc56e1d',	'871b5a02-e55c-469d-af1a-29a78b6527a8',	'2021-09-23 11:41:37.025+00',	'2021-09-23 11:41:37.025+00'),
('4afef61e-75d9-4a9c-865a-c2d25cc56e1d',	'ca1de0ef-0d87-4b7b-83f3-ba5e7ccf700b',	'2021-09-23 11:41:37.033+00',	'2021-09-23 11:41:37.033+00'),
('4afef61e-75d9-4a9c-865a-c2d25cc56e1d',	'9852dcf8-c05a-46ab-8c0b-b92f9cb205f9',	'2021-09-23 11:41:37.041+00',	'2021-09-23 11:41:37.041+00'),
('4afef61e-75d9-4a9c-865a-c2d25cc56e1d',	'fccf3a1a-5489-48d6-9a2f-1df2510bbe9e',	'2021-09-23 11:41:37.049+00',	'2021-09-23 11:41:37.049+00'),
('4afef61e-75d9-4a9c-865a-c2d25cc56e1d',	'91e4b63e-8828-4428-876f-b12c7eabbee3',	'2021-09-23 11:41:37.058+00',	'2021-09-23 11:41:37.058+00'),
('ad79c1c6-0ca6-4d99-a119-98359cfbbf77',	'cf58fda0-0f85-4550-b2bd-9fbe0cdaa131',	'2021-09-23 11:41:37.066+00',	'2021-09-23 11:41:37.066+00'),
('ad79c1c6-0ca6-4d99-a119-98359cfbbf77',	'f5d1ed6c-0a96-4209-a71f-42d2cef3c86a',	'2021-09-23 11:41:37.074+00',	'2021-09-23 11:41:37.074+00'),
('ad79c1c6-0ca6-4d99-a119-98359cfbbf77',	'b8d4067e-d2cc-4168-be4f-62337bf6fb09',	'2021-09-23 11:41:37.082+00',	'2021-09-23 11:41:37.082+00'),
('ad79c1c6-0ca6-4d99-a119-98359cfbbf77',	'f9c19b5b-78d9-47e3-bb6c-116a2d5d6ce0',	'2021-09-23 11:41:37.09+00',	'2021-09-23 11:41:37.09+00'),
('ad79c1c6-0ca6-4d99-a119-98359cfbbf77',	'fc7d98a3-f180-409b-b1ab-0370ba2a5f6c',	'2021-09-23 11:41:37.098+00',	'2021-09-23 11:41:37.098+00'),
('ad79c1c6-0ca6-4d99-a119-98359cfbbf77',	'c35ec22c-fff5-45f8-8620-88add8d9f481',	'2021-09-23 11:41:37.106+00',	'2021-09-23 11:41:37.106+00'),
('ad79c1c6-0ca6-4d99-a119-98359cfbbf77',	'7dcae2d4-77fb-4592-868c-92d28a5b79f7',	'2021-09-23 11:41:37.113+00',	'2021-09-23 11:41:37.113+00');

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
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'9cd53485-3bf6-410b-9f8d-4ea487a193a6',	'2021-09-23 11:41:36.626+00',	'2021-09-23 11:41:36.626+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'0c6caa22-4329-46fb-a334-33ff82ab2d9b',	'2021-09-23 11:41:36.637+00',	'2021-09-23 11:41:36.637+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'b73ceaa4-de2a-41cd-bc85-1cfdd695e568',	'2021-09-23 11:41:36.645+00',	'2021-09-23 11:41:36.645+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'3f102f16-90ed-4e6c-9500-f3f61fc0521a',	'2021-09-23 11:41:36.654+00',	'2021-09-23 11:41:36.654+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'650c9c5e-ed02-457f-aae0-e1d5395360a9',	'2021-09-23 11:41:36.661+00',	'2021-09-23 11:41:36.661+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'f63f96d2-361f-4d23-bec0-74879ce8e0ff',	'2021-09-23 11:41:36.67+00',	'2021-09-23 11:41:36.67+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'2029b127-c141-4770-9f69-243117ef6471',	'2021-09-23 11:41:36.678+00',	'2021-09-23 11:41:36.678+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'849fe0a4-4c33-46fd-b4ba-1c85cc1b872a',	'2021-09-23 11:41:36.687+00',	'2021-09-23 11:41:36.687+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'4cfbf0ec-4ad4-426c-954d-3e920ac068f4',	'2021-09-23 11:41:36.7+00',	'2021-09-23 11:41:36.7+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'34b61312-b2d9-4754-a9a6-bd3159dcd230',	'2021-09-23 11:41:36.711+00',	'2021-09-23 11:41:36.711+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'5421f5ab-386c-4a1b-aa6c-f23ffda4e127',	'2021-09-23 11:41:36.719+00',	'2021-09-23 11:41:36.719+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'7bf2994d-03f9-4af8-ace6-3f718e300f5a',	'2021-09-23 11:41:36.728+00',	'2021-09-23 11:41:36.728+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'56d0f980-257f-467b-8830-d5995951e470',	'2021-09-23 11:41:36.736+00',	'2021-09-23 11:41:36.736+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'50486d63-cf21-42f8-9559-eae409ee8d02',	'2021-09-23 11:41:36.744+00',	'2021-09-23 11:41:36.744+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'2145b957-2134-4fe0-9098-7fdf5797f511',	'2021-09-23 11:41:36.752+00',	'2021-09-23 11:41:36.752+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'12f5b502-3382-4395-84a3-a9b3715078d5',	'2021-09-23 11:41:36.761+00',	'2021-09-23 11:41:36.761+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'72f0a609-6bda-4552-bb65-58aa5e171da9',	'2021-09-23 11:41:36.77+00',	'2021-09-23 11:41:36.77+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'e96b11ab-8429-447b-a78f-c6b1798fdab6',	'2021-09-23 11:41:36.778+00',	'2021-09-23 11:41:36.778+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'7c30c182-458c-422a-aa38-84984f6624ff',	'2021-09-23 11:41:36.787+00',	'2021-09-23 11:41:36.787+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'5c750fbc-c23c-47e9-8a21-85be4750f355',	'2021-09-23 11:41:36.797+00',	'2021-09-23 11:41:36.797+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'4744d1a5-ff6b-477a-ba95-c2ab2960f084',	'2021-09-23 11:41:36.807+00',	'2021-09-23 11:41:36.807+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'bf43aad4-dfe2-4713-95cc-b29e28e91110',	'2021-09-23 11:41:36.817+00',	'2021-09-23 11:41:36.817+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'8a327212-65a7-4873-9942-cfe9d071e10b',	'2021-09-23 11:41:36.825+00',	'2021-09-23 11:41:36.825+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'd6bdacd1-7f50-4249-96c4-9086776867bb',	'2021-09-23 11:41:36.833+00',	'2021-09-23 11:41:36.833+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'bdec609f-e513-42f3-946f-511dabc38388',	'2021-09-23 11:41:36.841+00',	'2021-09-23 11:41:36.841+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'7b5af269-6315-4a13-8ad1-0a8d452166af',	'2021-09-23 11:41:36.849+00',	'2021-09-23 11:41:36.849+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'71100ed8-8e01-4a52-9d5b-8fe3b16456a6',	'2021-09-23 11:41:36.858+00',	'2021-09-23 11:41:36.858+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'4f70c8b0-bf77-4aad-9b4a-8a15b71f01f6',	'2021-09-23 11:41:36.866+00',	'2021-09-23 11:41:36.866+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'f320af49-dc05-46f9-bbe0-d1d52009bb3e',	'2021-09-23 11:41:36.874+00',	'2021-09-23 11:41:36.874+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'3dc72aac-83ed-40c6-a7f9-4d1827b636cf',	'2021-09-23 11:41:36.881+00',	'2021-09-23 11:41:36.881+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'd556bde6-ff7c-4f35-9f1f-f84548b3d6d2',	'2021-09-23 11:41:36.89+00',	'2021-09-23 11:41:36.89+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'f3c86ce5-ca6e-4ec3-9bce-e64031afda7b',	'2021-09-23 11:41:36.898+00',	'2021-09-23 11:41:36.898+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'f871953e-7f8c-4f5a-a2d7-af36aed80b1e',	'2021-09-23 11:41:36.907+00',	'2021-09-23 11:41:36.907+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'33350d30-ea45-453d-b260-7df07c4d4161',	'2021-09-23 11:41:36.917+00',	'2021-09-23 11:41:36.917+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'1754d6df-952a-4cc7-b3ae-8de0648a6a6e',	'2021-09-23 11:41:36.926+00',	'2021-09-23 11:41:36.926+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'002db3b3-8c9c-48d0-a34a-1413c18d4a87',	'2021-09-23 11:41:36.936+00',	'2021-09-23 11:41:36.936+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'3411c3d7-b556-422d-8a58-3c5db0f57985',	'2021-09-23 11:41:36.944+00',	'2021-09-23 11:41:36.944+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'50fa5488-46a5-4574-afd1-39cba435572a',	'2021-09-23 11:41:36.954+00',	'2021-09-23 11:41:36.954+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'd9e89fca-c32c-49f4-bfc3-60f7928fb9d4',	'2021-09-23 11:41:36.963+00',	'2021-09-23 11:41:36.963+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'7e046ac3-2b56-4df7-a18a-2588129b4be9',	'2021-09-23 11:41:36.974+00',	'2021-09-23 11:41:36.974+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'6e435aa5-1b72-49a7-ab28-5236dce6bd92',	'2021-09-23 11:41:36.982+00',	'2021-09-23 11:41:36.982+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'e0ecce7f-9317-442c-8c07-51c57c4489e3',	'2021-09-23 11:41:36.99+00',	'2021-09-23 11:41:36.99+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'752f0657-9202-47f0-8509-4cb2738a1fd6',	'2021-09-23 11:41:36.999+00',	'2021-09-23 11:41:36.999+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'e83e024a-d326-4e00-a1e7-04a7bb287f16',	'2021-09-23 11:41:37.006+00',	'2021-09-23 11:41:37.006+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'7291d4e7-9d0b-45fc-b1f9-aef46166386b',	'2021-09-23 11:41:37.016+00',	'2021-09-23 11:41:37.016+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'871b5a02-e55c-469d-af1a-29a78b6527a8',	'2021-09-23 11:41:37.024+00',	'2021-09-23 11:41:37.024+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'ca1de0ef-0d87-4b7b-83f3-ba5e7ccf700b',	'2021-09-23 11:41:37.032+00',	'2021-09-23 11:41:37.032+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'9852dcf8-c05a-46ab-8c0b-b92f9cb205f9',	'2021-09-23 11:41:37.04+00',	'2021-09-23 11:41:37.04+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'fccf3a1a-5489-48d6-9a2f-1df2510bbe9e',	'2021-09-23 11:41:37.048+00',	'2021-09-23 11:41:37.048+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'91e4b63e-8828-4428-876f-b12c7eabbee3',	'2021-09-23 11:41:37.057+00',	'2021-09-23 11:41:37.057+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'cf58fda0-0f85-4550-b2bd-9fbe0cdaa131',	'2021-09-23 11:41:37.065+00',	'2021-09-23 11:41:37.065+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'f5d1ed6c-0a96-4209-a71f-42d2cef3c86a',	'2021-09-23 11:41:37.073+00',	'2021-09-23 11:41:37.073+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'b8d4067e-d2cc-4168-be4f-62337bf6fb09',	'2021-09-23 11:41:37.081+00',	'2021-09-23 11:41:37.081+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'f9c19b5b-78d9-47e3-bb6c-116a2d5d6ce0',	'2021-09-23 11:41:37.089+00',	'2021-09-23 11:41:37.089+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'fc7d98a3-f180-409b-b1ab-0370ba2a5f6c',	'2021-09-23 11:41:37.097+00',	'2021-09-23 11:41:37.097+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'c35ec22c-fff5-45f8-8620-88add8d9f481',	'2021-09-23 11:41:37.105+00',	'2021-09-23 11:41:37.105+00'),
('d2c376ce-43cb-4a0f-9fd6-8fb1448c6060',	'7dcae2d4-77fb-4592-868c-92d28a5b79f7',	'2021-09-23 11:41:37.113+00',	'2021-09-23 11:41:37.113+00');

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
('4cfbf0ec-4ad4-426c-954d-3e920ac068f4',	'e92edcd0-61bb-4381-bc70-323326b6e790',	'2021-09-23 11:41:36.701+00',	'2021-09-23 11:41:36.701+00'),
('4cfbf0ec-4ad4-426c-954d-3e920ac068f4',	'dfa479c7-0cbe-49dc-bc0e-2383bd3ec272',	'2021-09-23 11:41:36.702+00',	'2021-09-23 11:41:36.702+00'),
('71100ed8-8e01-4a52-9d5b-8fe3b16456a6',	'ed53d27c-2df5-4ff2-985b-fc0f98fcf69e',	'2021-09-23 11:41:36.859+00',	'2021-09-23 11:41:36.859+00');

DROP TABLE IF EXISTS "refresh_token";
CREATE TABLE "public"."refresh_token" (
    "token" text NOT NULL,
    "userId" uuid,
    "expirationDate" timestamptz NOT NULL,
    CONSTRAINT "refresh_token_token" PRIMARY KEY ("token"),
    CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

-- 2021-09-04 10:19:05.013484+00
