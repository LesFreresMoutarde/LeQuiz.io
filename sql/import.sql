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
('070f34f3-6f6d-4bf8-95f1-f136d4819856',	'histoire',	'Histoire',	'2021-09-22 19:49:05.553+00',	'2021-09-22 19:49:05.553+00'),
('70bc8592-4a14-4a2e-a2ac-8a60c68d24a4',	'sport',	'Sport',	'2021-09-22 19:49:05.558+00',	'2021-09-22 19:49:05.558+00'),
('2b5b9eef-ceb8-429a-b308-ce07b94307c7',	'jeu-video',	'Jeu vidéo',	'2021-09-22 19:49:05.562+00',	'2021-09-22 19:49:05.562+00'),
('b81c724e-3beb-4d2b-b71a-baffce111400',	'cinema',	'Cinéma',	'2021-09-22 19:49:05.566+00',	'2021-09-22 19:49:05.566+00'),
('0f763e18-7c7f-4477-a8a5-c478b0d21f6d',	'musique',	'Musique',	'2021-09-22 19:49:05.57+00',	'2021-09-22 19:49:05.57+00'),
('c7ef3fb7-013d-4337-a1d7-7332510f722d',	'automobile',	'Automobile',	'2021-09-22 19:49:05.575+00',	'2021-09-22 19:49:05.575+00');


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
('08cb7072-7fdf-4817-8832-50b1a171bdbe',	'0',	'Combien fait 1 + 4 ?',	'{"answers": {"qcm": [{"content": "5", "is_good_answer": true}, {"content": "3", "is_good_answer": false}, {"content": "4", "is_good_answer": false}, {"content": "6", "is_good_answer": false}], "input": [{"content": "5", "errorAllowedCount": 0}, {"content": "Cinq"}]}, "additional": {"response_media": {"url": "http://example.com/toto.png", "info": "0 + 0 égale ? ..."}}}',	'approved',	'{"url": "http://example.com/calculatrice.png", "type": "image/png"}',	NULL,	'2021-09-22 19:49:05.584+00',	'2021-09-22 19:49:05.584+00'),
('393afffd-91bf-48ba-81d5-63d390b65918',	'0',	'En quelle année, Mao a-t-il lancé sa révolution culturelle ?',	'{"answers": {"qcm": [{"content": "1814", "is_good_answer": false}, {"content": "1865", "is_good_answer": false}, {"content": "1920", "is_good_answer": false}, {"content": "1966", "is_good_answer": true}], "input": [{"content": "1966", "errorAllowedCount": 0}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.602+00',	'2021-09-22 19:49:05.602+00'),
('70ab8d78-29ea-472b-bcaa-f203f6da54bc',	'0',	'En quelle année les États-Unis ont-ils pris part à la Première Guerre mondiale ?',	'{"answers": {"qcm": [{"content": "1918", "is_good_answer": false}, {"content": "1915", "is_good_answer": false}, {"content": "1917", "is_good_answer": true}, {"content": "1916", "is_good_answer": false}], "input": [{"content": "1916", "errorAllowedCount": 0}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.614+00',	'2021-09-22 19:49:05.614+00'),
('27a5ae59-f155-49c6-b518-e950e662d30d',	'0',	'Quels Jeux olympiques ont été supprimés à cause de la Seconde Guerre mondiale ?',	'{"answers": {"qcm": [{"content": "1936 et 1940", "is_good_answer": false}, {"content": "1944 et 1948", "is_good_answer": false}, {"content": "1940 et 1944", "is_good_answer": true}, {"content": "1932 et 1936", "is_good_answer": false}], "input": [{"content": "1940 et 1944", "errorAllowedCount": 0}, {"content": "1940 1944", "errorAllowedCount": 0}, {"content": "1940, 1944", "errorAllowedCount": 0}, {"content": "1940,1944", "errorAllowedCount": 0}, {"content": "1944 et 1940", "errorAllowedCount": 0}, {"content": "1944 1940", "errorAllowedCount": 0}, {"content": "1944, 1940", "errorAllowedCount": 0}, {"content": "1944,1940", "errorAllowedCount": 0}]}, "additional": {"response_media": {"url": null, "info": "Les Jeux ont été rénovés par le baron Pierre de Coubertin à la fin du XIXe siècle."}}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.627+00',	'2021-09-22 19:49:05.627+00'),
('21b9c725-c56d-4814-8f50-f17e6d7e16b4',	'0',	'Dans les plaines de quel champ de bataille se dresse la Butte du Lion ?',	'{"answers": {"qcm": [{"content": "Verdun", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": true}, {"content": "Austerlitz", "is_good_answer": false}, {"content": "Valmy", "is_good_answer": false}], "input": [{"content": "Waterloo"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.639+00',	'2021-09-22 19:49:05.639+00'),
('d1e71db9-37a0-4729-8f84-2678674ec63c',	'0',	'Quelle ligne de défense française fut contournée par les Allemands en 1940 ?',	'{"answers": {"qcm": [{"content": "La ligne Siegfried", "is_good_answer": false}, {"content": "La ligne Maginot", "is_good_answer": true}, {"content": "La ligne verte", "is_good_answer": false}, {"content": "La ligne Daladier", "is_good_answer": false}], "input": [{"content": "La ligne Maginot"}, {"content": "Ligne Maginot"}, {"content": "Maginot"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.652+00',	'2021-09-22 19:49:05.652+00'),
('5db5b14d-38fb-42f0-a8b3-aea71116a138',	'0',	'Le général Cambronne, qui commandait la vieille garde, eut une conduite héroïque à...',	'{"answers": {"qcm": [{"content": "Wagram", "is_good_answer": false}, {"content": "Iena", "is_good_answer": false}, {"content": "Midway", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": true}], "input": [{"content": "Waterloo"}, {"content": "La bataille de Waterloo"}, {"content": "Bataille de Waterloo"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.666+00',	'2021-09-22 19:49:05.666+00'),
('52b2afa2-a9c3-4ab4-ad66-f7f2488b2e70',	'0',	'Où a eu lieu le grand procès des criminels de guerre nazis ?',	'{"answers": {"qcm": [{"content": "Berlin", "is_good_answer": false}, {"content": "Nuremberg", "is_good_answer": true}, {"content": "Hambourg", "is_good_answer": false}, {"content": "Munich", "is_good_answer": false}], "input": [{"content": "Nuremberg"}, {"content": "à Nuremberg"}]}, "additional": {"response_media": {"url": null, "info": "Le procès de Nuremberg fut intenté contre 24 responsables du Troisième Reich."}}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.679+00',	'2021-09-22 19:49:05.679+00'),
('419aa95c-d2ad-4355-b4e0-319614779eba',	'0',	'Qui est le personnage princiapl de l''Odysée d''Homère ?',	'{"answers": {"qcm": [{"content": "Sophocle", "is_good_answer": false}, {"content": "Ajax", "is_good_answer": false}, {"content": "Ulysse", "is_good_answer": true}, {"content": "Arkantos", "is_good_answer": false}], "input": [{"content": "Ulysse"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.696+00',	'2021-09-22 19:49:05.696+00'),
('14ff4673-588e-44ef-a640-26b41ec2bcff',	'0',	'En quelle année la bataille de Waterloo a-t-elle eu lieu, à vingt kilomètres au sud de Bruxelles ?',	'{"answers": {"qcm": [{"content": "1815", "is_good_answer": true}, {"content": "1831", "is_good_answer": false}, {"content": "1809", "is_good_answer": false}, {"content": "1824", "is_good_answer": false}], "input": [{"content": "1815", "errorAllowedCount": 0}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.719+00',	'2021-09-22 19:49:05.719+00'),
('b991b20c-3359-4f01-9f2e-802ffaf1cb1a',	'0',	'Quel basketteur américain a été champion NBA en 1998 pour la sixième fois de sa carrière ?',	'{"answers": {"qcm": [{"content": "Patrick Ewing", "is_good_answer": false}, {"content": "Karl Malone", "is_good_answer": false}, {"content": "Charles Barkley", "is_good_answer": false}, {"content": "Michael Jordan", "is_good_answer": true}], "input": [{"content": "Michael Jordan"}, {"content": "Jordan"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.732+00',	'2021-09-22 19:49:05.732+00'),
('c8d4204e-9724-4c38-9ad5-6fbaaa0c4e5e',	'0',	'Dans quelle pays est né le joueur de basket-ball professionnel Tony Parker ?',	'{"answers": {"qcm": [{"content": "Belgique", "is_good_answer": true}, {"content": "USA", "is_good_answer": false}, {"content": "France", "is_good_answer": false}, {"content": "Pologne", "is_good_answer": false}], "input": [{"content": "en Belgique"}, {"content": "Belgique"}]}, "additional": {"response_media": {"url": null, "info": "Il évoluait dans l''équipe des Spurs de San Antonio depuis son arrivée dans la NBA en 2001."}}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.744+00',	'2021-09-22 19:49:05.744+00'),
('1a0357ce-978b-4fd6-ab67-57089cf2212d',	'0',	'Qui a été élu joueur de la décennie 2000 suite à un sondage du site officiel NBA ?',	'{"answers": {"qcm": [{"content": "Derek Fisher", "is_good_answer": false}, {"content": "Ron Harper", "is_good_answer": false}, {"content": "Kobe Bryant", "is_good_answer": true}, {"content": "Rick Fox", "is_good_answer": false}], "input": [{"content": "Kobe Bryant"}, {"content": "Bryant"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.757+00',	'2021-09-22 19:49:05.757+00'),
('97105599-1c16-4a55-850d-0aac85e48ddd',	'0',	'Quel concours de dunks est organisé par la NBA durant le NBA All-Star Week-end ?',	'{"answers": {"qcm": [{"content": "Skills Challenge", "is_good_answer": false}, {"content": "Slam Dunk Contest", "is_good_answer": true}, {"content": "Three-point Shootout", "is_good_answer": false}, {"content": "All-Star Game", "is_good_answer": false}], "input": [{"content": "Slam Dunk Contest"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.77+00',	'2021-09-22 19:49:05.77+00'),
('82fd1a16-dfd9-47f4-947e-9b05c0e84ac6',	'0',	'Quel basketteur américain a réalisé en 2000 un 360 degrés inversé mythique ?',	'{"answers": {"qcm": [{"content": "Jarnell Stokes", "is_good_answer": false}, {"content": "Vince Carter", "is_good_answer": true}, {"content": "Marc Gasol", "is_good_answer": false}, {"content": "Andrew Harrison", "is_good_answer": false}], "input": [{"content": "Vince Carter"}, {"content": "Carter"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.784+00',	'2021-09-22 19:49:05.784+00'),
('f34b54fe-83c7-4ec6-9373-0157f9d62e1c',	'0',	'Quel joueur de NBA se définit lui-même comme un « viking africain » ?',	'{"answers": {"qcm": [{"content": "Derrick Rose", "is_good_answer": false}, {"content": "Pau Gasol", "is_good_answer": false}, {"content": "Aaron Brooks", "is_good_answer": false}, {"content": "Joakim Noah", "is_good_answer": true}], "input": [{"content": "Joakim Noah"}, {"content": "Noah"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.797+00',	'2021-09-22 19:49:05.797+00'),
('460bb90b-9be2-435f-a6ce-85198678308c',	'0',	'Quel événement annuel majeur de la NBA est comparable à une bourse de joueurs ?',	'{"answers": {"qcm": [{"content": "La franchise", "is_good_answer": false}, {"content": "Les playoffs", "is_good_answer": false}, {"content": "Le ballotage", "is_good_answer": false}, {"content": "La draft", "is_good_answer": true}], "input": [{"content": "La Draft"}, {"content": "Draft"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.811+00',	'2021-09-22 19:49:05.811+00'),
('3322710d-0585-4c13-a3f9-794a7dec8989',	'0',	'Qui a été élu deux fois meilleur joueur de la NBA, en 2005 et 2006 ?',	'{"answers": {"qcm": [{"content": "Jeff Brown", "is_good_answer": false}, {"content": "Dana Jones", "is_good_answer": false}, {"content": "Marlon Garnett", "is_good_answer": false}, {"content": "Steve Nash", "is_good_answer": true}], "input": [{"content": "Steve Nash"}, {"content": "Nash"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.852+00',	'2021-09-22 19:49:05.852+00'),
('c8b01a38-ca23-41b5-adb6-c4f0a1d3e073',	'0',	'Quel sport automobile consiste à accélérer le plus rapidement possible avec son véhicule ?',	'{"answers": {"qcm": [{"content": "Le trial", "is_good_answer": false}, {"content": "Le Drift", "is_good_answer": false}, {"content": "Le Monster truck", "is_good_answer": false}, {"content": "Le Dragster", "is_good_answer": true}], "input": [{"content": "Le Dragster"}, {"content": "Dragster"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.024+00',	'2021-09-22 19:49:06.024+00'),
('d204fe65-bfba-4852-b4ae-db2b1bb4f47d',	'0',	'Salamèche évolue en ',	'{"answers": {"qcm": [{"content": "Dracaufeu", "is_good_answer": false}, {"content": "Reptincel", "is_good_answer": true}, {"content": "Magna", "is_good_answer": false}, {"content": "Ptera", "is_good_answer": false}], "input": [{"content": "Reptincel"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.133+00',	'2021-09-22 19:49:06.133+00'),
('a333ea5a-6f8a-424a-a3bd-3eefa8bba414',	'0',	'La série Fallout est la suite « spirituelle » de quel jeu ?',	'{"answers": {"qcm": [{"content": "Wasteland", "is_good_answer": true}, {"content": "Homeland", "is_good_answer": false}, {"content": "Falland", "is_good_answer": false}, {"content": "Skyrim", "is_good_answer": false}], "input": [{"content": "Wasteland"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.184+00',	'2021-09-22 19:49:06.184+00'),
('24e2ad89-e71e-4bed-99b4-b8a7ba1f46b2',	'0',	'Que signifie le nom de la serie GTA ?',	'{"answers": {"qcm": [{"content": "Burnout", "is_good_answer": false}, {"content": "Conduite dangeureuse", "is_good_answer": false}, {"content": "Vol de voiture", "is_good_answer": true}, {"content": "Voiture customisé", "is_good_answer": false}], "input": [{"content": "Vol de voiture"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.196+00',	'2021-09-22 19:49:06.196+00'),
('2bd457d7-2abc-413a-a343-be691306b06b',	'0',	'Le jeu Counter Strike dérive de quel autre jeu ?',	'{"answers": {"qcm": [{"content": "Half Life", "is_good_answer": true}, {"content": "Splinter Cell", "is_good_answer": false}, {"content": "Doom", "is_good_answer": false}, {"content": "Call of Duty", "is_good_answer": false}], "input": [{"content": "Half Life"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.209+00',	'2021-09-22 19:49:06.209+00'),
('4dfda24a-c8ad-4be3-b17e-644afbfbc467',	'0',	'Combien de titres de champion NBA Michael Jordan a-t-il obtenu ?',	'{"answers": {"qcm": [{"content": "Cinq", "is_good_answer": false}, {"content": "Sept", "is_good_answer": false}, {"content": "Six", "is_good_answer": true}, {"content": "Quatre", "is_good_answer": false}], "input": [{"content": "Six"}, {"content": "6", "errorAllowedCount": 0}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.824+00',	'2021-09-22 19:49:05.824+00'),
('664bfb9c-4eea-4ed5-92f9-e88b856bebc1',	'0',	'Qui est le premier joueur français à avoir été sacré champion NBA ?',	'{"answers": {"qcm": [{"content": "Joe Dumars", "is_good_answer": false}, {"content": "Paul Pierce", "is_good_answer": false}, {"content": "Tony Parker", "is_good_answer": true}, {"content": "Tim Duncan", "is_good_answer": false}], "input": [{"content": "Tony Parker"}, {"content": "Parker"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.839+00',	'2021-09-22 19:49:05.839+00'),
('531912d2-bd71-4f7a-b05e-3a4bee9eb4d2',	'0',	'Quel gagnant de la « Nouvelle Star », diffusée sur M6, est surnommé « La Tortue » ?',	'{"answers": {"qcm": [{"content": "Christophe Willem", "is_good_answer": true}, {"content": "Julien Doré", "is_good_answer": false}, {"content": "Jonatan Cerrada", "is_good_answer": false}, {"content": "Steeve Estatof", "is_good_answer": false}], "input": [{"content": "Christophe Willem"}, {"content": "Willem"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.869+00',	'2021-09-22 19:49:05.869+00'),
('36b1bc0e-d0a4-443b-b7cf-77ab64da5a31',	'0',	'En 1991, quel tube Yannick Noah a-t-il associé à la victoire de la France en coupe Davis ?',	'{"answers": {"qcm": [{"content": "Vagabond", "is_good_answer": false}, {"content": "Les Lionnes", "is_good_answer": false}, {"content": "Saga Africa", "is_good_answer": true}, {"content": "Ose", "is_good_answer": false}], "input": [{"content": "Saga Africa"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.886+00',	'2021-09-22 19:49:05.886+00'),
('7d5efe08-4b58-40a7-a0d4-1915853bbb4b',	'0',	'Quel chanteur prénommé Mathieu a émergé du succès remporté par les Linkup ?',	'{"answers": {"qcm": [{"content": "Corneille", "is_good_answer": false}, {"content": "Keen''V", "is_good_answer": false}, {"content": "Raphaël", "is_good_answer": false}, {"content": "M. Pokora", "is_good_answer": true}], "input": [{"content": "M. Pokora"}, {"content": "Matt Pokora"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.898+00',	'2021-09-22 19:49:05.898+00'),
('3232f615-afef-45d5-9dba-5b02300fdab3',	'0',	'Quel est le style musical de l''album de Rohff, « La fierté des années » ?',	'{"answers": {"qcm": [{"content": "La Techno", "is_good_answer": false}, {"content": "Le tango", "is_good_answer": false}, {"content": "Le disco", "is_good_answer": false}, {"content": "Le rap", "is_good_answer": true}], "input": [{"content": "Le rap"}, {"content": "Rap"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.909+00',	'2021-09-22 19:49:05.909+00'),
('ec6707ab-23ab-4b2f-acce-09fc818345e5',	'0',	'Quel Américano-Libanais est entré dans les charts avec « Life in Cartoon Motion » ?',	'{"answers": {"qcm": [{"content": "Mika", "is_good_answer": true}, {"content": "Iwan", "is_good_answer": false}, {"content": "Rida", "is_good_answer": false}, {"content": "K. Maro", "is_good_answer": false}], "input": [{"content": "Mika"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.921+00',	'2021-09-22 19:49:05.921+00'),
('69016d92-2d09-4016-bff3-ed43afd355b1',	'0',	'Qui a chanté au pied de …onnes le 10 juin 2000 ?',	'{"answers": {"qcm": [{"content": "Eddy Mitchell", "is_good_answer": false}, {"content": "Patrick Bruel", "is_good_answer": false}, {"content": "Christophe Maé", "is_good_answer": false}, {"content": "Johnny Hallyday", "is_good_answer": true}], "input": [{"content": "Johnny Hallyday"}, {"content": "Johnny"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.936+00',	'2021-09-22 19:49:05.936+00'),
('d2271d2e-51f4-4ec9-af0f-090df374cfe8',	'0',	'Sous quel nom le rappeur et homme d''affaires américain Curtis Jackson fait-il carrière ?',	'{"answers": {"qcm": [{"content": "50 cent", "is_good_answer": true}, {"content": "Fat Joe", "is_good_answer": false}, {"content": "Big Sean", "is_good_answer": false}, {"content": "Mike D", "is_good_answer": false}], "input": [{"content": "50 cent"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.951+00',	'2021-09-22 19:49:05.951+00'),
('69f1b812-88ab-4d77-a930-1c90b9f1daff',	'0',	'Avec quel chanteur le top model Heidi Klum a-t-elle été mariée durant sept ans ?',	'{"answers": {"qcm": [{"content": "Seal", "is_good_answer": true}, {"content": "Paul McCartney", "is_good_answer": false}, {"content": "Sean Paul", "is_good_answer": false}, {"content": "Robbie Williams", "is_good_answer": false}], "input": [{"content": "Seal"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.966+00',	'2021-09-22 19:49:05.966+00'),
('04886c2b-6bf6-42bf-aba9-c1286d3cdc20',	'0',	'Quel DJ a repris un titre des années 80 pour faire un tube avec « Living On Video » ?',	'{"answers": {"qcm": [{"content": "Pakito", "is_good_answer": true}, {"content": "Vitalic", "is_good_answer": false}, {"content": "Madeon", "is_good_answer": false}, {"content": "Brodinski", "is_good_answer": false}], "input": [{"content": "Pakito"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.978+00',	'2021-09-22 19:49:05.978+00'),
('d7ed2c42-6f1c-46ea-a1a6-fca9fab835af',	'0',	'Quel chanteur a sorti « Musicology » puis « 3121 » deux ans plus tard ?',	'{"answers": {"qcm": [{"content": "Bob James", "is_good_answer": false}, {"content": "Al Jarreau", "is_good_answer": false}, {"content": "Prince", "is_good_answer": true}, {"content": "James Brown", "is_good_answer": false}], "input": [{"content": "Prince"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:05.99+00',	'2021-09-22 19:49:05.99+00'),
('e362f215-38c9-403f-837c-39701ca029cb',	'0',	'Dans quel pays se situe le circuit de course automobile du Mans ?',	'{"answers": {"qcm": [{"content": "Pays-Bas", "is_good_answer": false}, {"content": "Suisse", "is_good_answer": false}, {"content": "Belgique", "is_good_answer": false}, {"content": "France", "is_good_answer": true}], "input": [{"content": "France"}, {"content": "La France"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.002+00',	'2021-09-22 19:49:06.002+00'),
('d83c78c3-37e9-45fc-a858-e1b1b10bf5c4',	'0',	'À quel modèle de voiture ressemble le vieux tacot jaune que conduit Gaston Lagaffe ?',	'{"answers": {"qcm": [{"content": "Rolls-Royce", "is_good_answer": false}, {"content": "Citroën B10", "is_good_answer": false}, {"content": "Fiat 509", "is_good_answer": true}, {"content": "Jeep", "is_good_answer": false}], "input": [{"content": "Fiat 509"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.013+00',	'2021-09-22 19:49:06.013+00'),
('0ab93bde-7900-4886-9ade-1cafe231e34a',	'0',	'Comment s''appelle le véhicule du personnage de bande dessinée Batman ?',	'{"answers": {"qcm": [{"content": "La BatDrive", "is_good_answer": false}, {"content": "La Batauto", "is_good_answer": false}, {"content": "La Batcar", "is_good_answer": false}, {"content": "La Batmobile", "is_good_answer": true}], "input": [{"content": "La Batmobile"}, {"content": "Batmobile"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.036+00',	'2021-09-22 19:49:06.036+00'),
('181018f9-0d0e-4a7d-b65a-90b55f39cd54',	'0',	'De quand date le Duster, véhicule utilitaire sport vendu par la marque roumaine Dacia ?',	'{"answers": {"qcm": [{"content": "2006", "is_good_answer": false}, {"content": "2008", "is_good_answer": false}, {"content": "2010", "is_good_answer": true}, {"content": "2012", "is_good_answer": false}], "input": [{"content": "2010", "errorAllowedCount": 0}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.049+00',	'2021-09-22 19:49:06.049+00'),
('9baa2769-e874-4ec5-8bd7-339d56b2e0c5',	'0',	'En France, refuser une priorité peut vous coûter combien de points sur le permis ?',	'{"answers": {"qcm": [{"content": "6 points", "is_good_answer": false}, {"content": "8 points", "is_good_answer": false}, {"content": "4 points", "is_good_answer": true}, {"content": "2 points", "is_good_answer": false}], "input": [{"content": "4 points", "errorAllowedCount": 0}, {"content": "4", "errorAllowedCount": 0}, {"content": "quatre"}, {"content": "quatre points"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.062+00',	'2021-09-22 19:49:06.062+00'),
('520a6346-7a23-4c0e-88b4-1fd2013e2dbf',	'0',	'Quelle principauté accueille l''un des plus prestigieux Grand Prix de Formule 1 ?',	'{"answers": {"qcm": [{"content": "Liechtenstein", "is_good_answer": false}, {"content": "Andorre", "is_good_answer": false}, {"content": "Mantoue", "is_good_answer": false}, {"content": "Monaco", "is_good_answer": true}], "input": [{"content": "Monaco"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.074+00',	'2021-09-22 19:49:06.074+00'),
('dfc2d201-a106-4a6b-bdbc-994b7711a73e',	'0',	'Dans le monde automobile, quel sigle correspond au Grand Tourisme Injection ?',	'{"answers": {"qcm": [{"content": "sport", "is_good_answer": false}, {"content": "Gti", "is_good_answer": true}, {"content": "TT", "is_good_answer": false}, {"content": "Turbo", "is_good_answer": false}], "input": [{"content": "GTI", "errorAllowedCount": 0}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.085+00',	'2021-09-22 19:49:06.085+00'),
('78b73d77-a462-4eed-8d72-05878c1b3092',	'0',	'Quelle société appartenant au groupe Belron « répare et remplace » votre pare-brise ?',	'{"answers": {"qcm": [{"content": "Carglass", "is_good_answer": true}, {"content": "Midas", "is_good_answer": false}, {"content": "Speedy", "is_good_answer": false}, {"content": "Norauto", "is_good_answer": false}], "input": [{"content": "Carglass"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.097+00',	'2021-09-22 19:49:06.097+00'),
('1ae5f8c9-b6b6-4e18-8503-c17e5248ca78',	'0',	'Quelle firme automobile, filiale française de FIAT, a ensuite intégré le groupe Chrysler ?',	'{"answers": {"qcm": [{"content": "Simca", "is_good_answer": true}, {"content": "Hommell", "is_good_answer": false}, {"content": "Packard", "is_good_answer": false}, {"content": "Triumph", "is_good_answer": false}], "input": [{"content": "Simca"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.109+00',	'2021-09-22 19:49:06.109+00'),
('556fbcde-cfd7-4993-9bec-89dd493226f1',	'0',	'Dans quel jeu peux on voir des Chocobos ?',	'{"answers": {"qcm": [{"content": "Breath of fire", "is_good_answer": false}, {"content": "Final Fantasy", "is_good_answer": true}, {"content": "Secret of Mana", "is_good_answer": false}, {"content": "Golden stun", "is_good_answer": false}], "input": [{"content": "Final Fantasy"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.12+00',	'2021-09-22 19:49:06.12+00'),
('f40031d8-bd4b-46a8-a2c2-11650930cd23',	'0',	'Zelda est un jeu du genre',	'{"answers": {"qcm": [{"content": "Aventure", "is_good_answer": true}, {"content": "RPG", "is_good_answer": false}, {"content": "Course", "is_good_answer": false}, {"content": "Simulation", "is_good_answer": false}], "input": [{"content": "Aventure"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.147+00',	'2021-09-22 19:49:06.147+00'),
('7306ac1f-996b-48aa-a7e0-fff74c189b93',	'0',	'Sur quelle plateforme le jeu Tekken est sorti en premier ?',	'{"answers": {"qcm": [{"content": "La borne d''arcade", "is_good_answer": true}, {"content": "NES", "is_good_answer": false}, {"content": "Playstation", "is_good_answer": false}, {"content": "Gamecube", "is_good_answer": false}], "input": [{"content": "La borne d''arcade"}, {"content": "Borne d''arcade"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.161+00',	'2021-09-22 19:49:06.161+00'),
('6ab26d20-3576-4256-b4b9-26d391f29b93',	'0',	'Dans quel jeu le personnage de Mario a-t-il été développé en premier ?',	'{"answers": {"qcm": [{"content": "Super Mario", "is_good_answer": false}, {"content": "Super Mario Bros", "is_good_answer": false}, {"content": "Donkey Kong", "is_good_answer": true}, {"content": "Mario Party", "is_good_answer": false}], "input": [{"content": "Donkey Kong"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.172+00',	'2021-09-22 19:49:06.172+00'),
('d41d2122-2957-4058-bfcb-68484ff4a54a',	'0',	'Dans Pac man qu''est ce qui hante le labyrinthe ?',	'{"answers": {"qcm": [{"content": "Des plantes carnivores", "is_good_answer": false}, {"content": "Des fantômes", "is_good_answer": true}, {"content": "Des squelettes", "is_good_answer": false}, {"content": "Des zombies", "is_good_answer": false}], "input": [{"content": "Des fantômes"}, {"content": "Fantômes"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.221+00',	'2021-09-22 19:49:06.221+00'),
('1d4ab5c4-3109-4741-a7d9-d935cb244405',	'0',	'Dans la légende de Zelda, comment s''appelle le héros ?',	'{"answers": {"qcm": [{"content": "Zelda", "is_good_answer": false}, {"content": "Bruno", "is_good_answer": false}, {"content": "Ganondorf", "is_good_answer": false}, {"content": "Link", "is_good_answer": true}], "input": [{"content": "Link"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.232+00',	'2021-09-22 19:49:06.232+00'),
('bbc9772e-ade3-4093-9b30-e3af41fa018a',	'0',	'Qui est le compagnon de Batman ?',	'{"answers": {"qcm": [{"content": "Robin", "is_good_answer": true}, {"content": "Le Joker", "is_good_answer": false}, {"content": "Leroy", "is_good_answer": false}, {"content": "Clark Kent", "is_good_answer": false}], "input": [{"content": "Robin"}]}}',	'pending',	'{}',	NULL,	'2021-09-22 19:49:06.244+00',	'2021-09-22 19:49:06.244+00'),
('340bd9f9-b4bf-43d0-9395-a4cb48f68764',	'0',	'Quel super héros ne se sépare jamais de son marteau forgé par les nains ',	'{"answers": {"qcm": [{"content": "Hulk", "is_good_answer": false}, {"content": "Aquaman", "is_good_answer": false}, {"content": "Rhino", "is_good_answer": false}, {"content": "Thor", "is_good_answer": true}], "input": [{"content": "Thor"}]}}',	'pending',	'{}',	NULL,	'2021-09-22 19:49:06.258+00',	'2021-09-22 19:49:06.258+00'),
('92161d85-ed0a-417d-b982-926d86949336',	'0',	'Quel super-héros à la force surhumaine ressemble à un être de pierre ?',	'{"answers": {"qcm": [{"content": "Hawkman", "is_good_answer": false}, {"content": "Plastic Man", "is_good_answer": false}, {"content": "Superboy", "is_good_answer": false}, {"content": "La Chose", "is_good_answer": true}], "input": [{"content": "La Chose"}]}}',	'disapproved',	'{}',	NULL,	'2021-09-22 19:49:06.274+00',	'2021-09-22 19:49:06.274+00'),
('fd06a152-6b4e-4144-b73d-79ce67903e4c',	'0',	'Quel super-héros porte un costume inspiré du drapeau américain ?',	'{"answers": {"qcm": [{"content": "Tigra", "is_good_answer": false}, {"content": "Iron Man", "is_good_answer": false}, {"content": "Blade", "is_good_answer": false}, {"content": "Captain America", "is_good_answer": true}], "input": [{"content": "Captain America"}]}}',	'disapproved',	'{}',	NULL,	'2021-09-22 19:49:06.292+00',	'2021-09-22 19:49:06.292+00'),
('fdbe2ef6-77c0-4277-ba4b-11feea469506',	'0',	'Quel poète français est connu pour ses fables ?',	'{"answers": {"qcm": [{"content": "Pierre Corneille", "is_good_answer": false}, {"content": "Esope", "is_good_answer": false}, {"content": "Jean Racine", "is_good_answer": false}, {"content": "Jean de La Fontaine", "is_good_answer": true}], "input": [{"content": "Jean de La Fontaine"}, {"content": "de La Fontaine"}, {"content": "La Fontaine"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.305+00',	'2021-09-22 19:49:06.305+00'),
('a78def5a-f7cb-461b-9d4b-e858ad9bc072',	'1',	'Quel élément chimique porte le numéro atomique 30 ?',	'{"answers": {"qcm": [{"content": "L''argent", "is_good_answer": false}, {"content": "Le zinc", "is_good_answer": true}, {"content": "le carbone", "is_good_answer": false}, {"content": "le soufre", "is_good_answer": false}], "input": [{"content": "Le zinc"}, {"content": "Zinc"}, {"content": "Zn", "errorAllowedCount": 0}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.318+00',	'2021-09-22 19:49:06.318+00'),
('f09d5930-a34f-4c08-ae3e-bedce87db1ea',	'1',	'Quel seigneur Albanais est vu comme un héros national suite à sa résistance aux Ottomans ?',	'{"answers": {"qcm": [{"content": "Vlad Tepes", "is_good_answer": false}, {"content": "Ivan Sirkhov", "is_good_answer": false}, {"content": "Skanderbeg", "is_good_answer": true}, {"content": "Baybars", "is_good_answer": false}], "input": [{"content": "Georges Castriote Skanderbeg"}, {"content": "Georges Castriote"}, {"content": "Castriote"}, {"content": "Scanderbeg"}, {"content": "Skanderbeg"}]}}',	'approved',	'{}',	NULL,	'2021-09-22 19:49:06.332+00',	'2021-09-22 19:49:06.332+00');

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
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'classic',	'Classique',	'2021-09-22 19:49:05.512+00',	'2021-09-22 19:49:05.512+00'),
('11ce0979-d674-4778-91b1-fef70505df21',	'blind-test',	'Blind Test',	'2021-09-22 19:49:05.528+00',	'2021-09-22 19:49:05.528+00');

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
('0ceaf375-55ff-43a4-9312-763fedde2906',	'football',	'Football',	'2021-09-22 19:49:05.533+00',	'2021-09-22 19:49:05.533+00'),
('d1252567-a545-460a-891b-7cb531f77a5b',	'mythologie',	'Mythologie',	'2021-09-22 19:49:05.538+00',	'2021-09-22 19:49:05.538+00'),
('815f99fa-e5a3-46d5-9c14-d2c08746104c',	'usa',	'Etats-Unis d''Amérique',	'2021-09-22 19:49:05.543+00',	'2021-09-22 19:49:05.543+00'),
('40ef037d-d995-4d8e-b0c1-72bac9a7b391',	'grece',	'Grèce',	'2021-09-22 19:49:05.547+00',	'2021-09-22 19:49:05.547+00');

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
('070f34f3-6f6d-4bf8-95f1-f136d4819856',	'08cb7072-7fdf-4817-8832-50b1a171bdbe',	'2021-09-22 19:49:05.594+00',	'2021-09-22 19:49:05.594+00'),
('070f34f3-6f6d-4bf8-95f1-f136d4819856',	'393afffd-91bf-48ba-81d5-63d390b65918',	'2021-09-22 19:49:05.607+00',	'2021-09-22 19:49:05.607+00'),
('070f34f3-6f6d-4bf8-95f1-f136d4819856',	'70ab8d78-29ea-472b-bcaa-f203f6da54bc',	'2021-09-22 19:49:05.619+00',	'2021-09-22 19:49:05.619+00'),
('070f34f3-6f6d-4bf8-95f1-f136d4819856',	'27a5ae59-f155-49c6-b518-e950e662d30d',	'2021-09-22 19:49:05.632+00',	'2021-09-22 19:49:05.632+00'),
('070f34f3-6f6d-4bf8-95f1-f136d4819856',	'21b9c725-c56d-4814-8f50-f17e6d7e16b4',	'2021-09-22 19:49:05.644+00',	'2021-09-22 19:49:05.644+00'),
('070f34f3-6f6d-4bf8-95f1-f136d4819856',	'd1e71db9-37a0-4729-8f84-2678674ec63c',	'2021-09-22 19:49:05.658+00',	'2021-09-22 19:49:05.658+00'),
('070f34f3-6f6d-4bf8-95f1-f136d4819856',	'5db5b14d-38fb-42f0-a8b3-aea71116a138',	'2021-09-22 19:49:05.672+00',	'2021-09-22 19:49:05.672+00'),
('070f34f3-6f6d-4bf8-95f1-f136d4819856',	'52b2afa2-a9c3-4ab4-ad66-f7f2488b2e70',	'2021-09-22 19:49:05.684+00',	'2021-09-22 19:49:05.684+00'),
('070f34f3-6f6d-4bf8-95f1-f136d4819856',	'419aa95c-d2ad-4355-b4e0-319614779eba',	'2021-09-22 19:49:05.708+00',	'2021-09-22 19:49:05.708+00'),
('070f34f3-6f6d-4bf8-95f1-f136d4819856',	'14ff4673-588e-44ef-a640-26b41ec2bcff',	'2021-09-22 19:49:05.724+00',	'2021-09-22 19:49:05.724+00'),
('70bc8592-4a14-4a2e-a2ac-8a60c68d24a4',	'b991b20c-3359-4f01-9f2e-802ffaf1cb1a',	'2021-09-22 19:49:05.737+00',	'2021-09-22 19:49:05.737+00'),
('70bc8592-4a14-4a2e-a2ac-8a60c68d24a4',	'c8d4204e-9724-4c38-9ad5-6fbaaa0c4e5e',	'2021-09-22 19:49:05.75+00',	'2021-09-22 19:49:05.75+00'),
('70bc8592-4a14-4a2e-a2ac-8a60c68d24a4',	'1a0357ce-978b-4fd6-ab67-57089cf2212d',	'2021-09-22 19:49:05.762+00',	'2021-09-22 19:49:05.762+00'),
('70bc8592-4a14-4a2e-a2ac-8a60c68d24a4',	'97105599-1c16-4a55-850d-0aac85e48ddd',	'2021-09-22 19:49:05.775+00',	'2021-09-22 19:49:05.775+00'),
('70bc8592-4a14-4a2e-a2ac-8a60c68d24a4',	'82fd1a16-dfd9-47f4-947e-9b05c0e84ac6',	'2021-09-22 19:49:05.79+00',	'2021-09-22 19:49:05.79+00'),
('70bc8592-4a14-4a2e-a2ac-8a60c68d24a4',	'f34b54fe-83c7-4ec6-9373-0157f9d62e1c',	'2021-09-22 19:49:05.802+00',	'2021-09-22 19:49:05.802+00'),
('70bc8592-4a14-4a2e-a2ac-8a60c68d24a4',	'460bb90b-9be2-435f-a6ce-85198678308c',	'2021-09-22 19:49:05.816+00',	'2021-09-22 19:49:05.816+00'),
('70bc8592-4a14-4a2e-a2ac-8a60c68d24a4',	'4dfda24a-c8ad-4be3-b17e-644afbfbc467',	'2021-09-22 19:49:05.832+00',	'2021-09-22 19:49:05.832+00'),
('70bc8592-4a14-4a2e-a2ac-8a60c68d24a4',	'664bfb9c-4eea-4ed5-92f9-e88b856bebc1',	'2021-09-22 19:49:05.845+00',	'2021-09-22 19:49:05.845+00'),
('70bc8592-4a14-4a2e-a2ac-8a60c68d24a4',	'3322710d-0585-4c13-a3f9-794a7dec8989',	'2021-09-22 19:49:05.86+00',	'2021-09-22 19:49:05.86+00'),
('0f763e18-7c7f-4477-a8a5-c478b0d21f6d',	'531912d2-bd71-4f7a-b05e-3a4bee9eb4d2',	'2021-09-22 19:49:05.878+00',	'2021-09-22 19:49:05.878+00'),
('0f763e18-7c7f-4477-a8a5-c478b0d21f6d',	'36b1bc0e-d0a4-443b-b7cf-77ab64da5a31',	'2021-09-22 19:49:05.892+00',	'2021-09-22 19:49:05.892+00'),
('0f763e18-7c7f-4477-a8a5-c478b0d21f6d',	'7d5efe08-4b58-40a7-a0d4-1915853bbb4b',	'2021-09-22 19:49:05.903+00',	'2021-09-22 19:49:05.903+00'),
('0f763e18-7c7f-4477-a8a5-c478b0d21f6d',	'3232f615-afef-45d5-9dba-5b02300fdab3',	'2021-09-22 19:49:05.915+00',	'2021-09-22 19:49:05.915+00'),
('0f763e18-7c7f-4477-a8a5-c478b0d21f6d',	'ec6707ab-23ab-4b2f-acce-09fc818345e5',	'2021-09-22 19:49:05.927+00',	'2021-09-22 19:49:05.927+00'),
('0f763e18-7c7f-4477-a8a5-c478b0d21f6d',	'69016d92-2d09-4016-bff3-ed43afd355b1',	'2021-09-22 19:49:05.942+00',	'2021-09-22 19:49:05.942+00'),
('0f763e18-7c7f-4477-a8a5-c478b0d21f6d',	'd2271d2e-51f4-4ec9-af0f-090df374cfe8',	'2021-09-22 19:49:05.958+00',	'2021-09-22 19:49:05.958+00'),
('0f763e18-7c7f-4477-a8a5-c478b0d21f6d',	'69f1b812-88ab-4d77-a930-1c90b9f1daff',	'2021-09-22 19:49:05.972+00',	'2021-09-22 19:49:05.972+00'),
('0f763e18-7c7f-4477-a8a5-c478b0d21f6d',	'04886c2b-6bf6-42bf-aba9-c1286d3cdc20',	'2021-09-22 19:49:05.983+00',	'2021-09-22 19:49:05.983+00'),
('0f763e18-7c7f-4477-a8a5-c478b0d21f6d',	'd7ed2c42-6f1c-46ea-a1a6-fca9fab835af',	'2021-09-22 19:49:05.996+00',	'2021-09-22 19:49:05.996+00'),
('c7ef3fb7-013d-4337-a1d7-7332510f722d',	'e362f215-38c9-403f-837c-39701ca029cb',	'2021-09-22 19:49:06.007+00',	'2021-09-22 19:49:06.007+00'),
('c7ef3fb7-013d-4337-a1d7-7332510f722d',	'd83c78c3-37e9-45fc-a858-e1b1b10bf5c4',	'2021-09-22 19:49:06.018+00',	'2021-09-22 19:49:06.018+00'),
('c7ef3fb7-013d-4337-a1d7-7332510f722d',	'c8b01a38-ca23-41b5-adb6-c4f0a1d3e073',	'2021-09-22 19:49:06.03+00',	'2021-09-22 19:49:06.03+00'),
('c7ef3fb7-013d-4337-a1d7-7332510f722d',	'0ab93bde-7900-4886-9ade-1cafe231e34a',	'2021-09-22 19:49:06.043+00',	'2021-09-22 19:49:06.043+00'),
('c7ef3fb7-013d-4337-a1d7-7332510f722d',	'181018f9-0d0e-4a7d-b65a-90b55f39cd54',	'2021-09-22 19:49:06.054+00',	'2021-09-22 19:49:06.054+00'),
('c7ef3fb7-013d-4337-a1d7-7332510f722d',	'9baa2769-e874-4ec5-8bd7-339d56b2e0c5',	'2021-09-22 19:49:06.066+00',	'2021-09-22 19:49:06.066+00'),
('c7ef3fb7-013d-4337-a1d7-7332510f722d',	'520a6346-7a23-4c0e-88b4-1fd2013e2dbf',	'2021-09-22 19:49:06.079+00',	'2021-09-22 19:49:06.079+00'),
('c7ef3fb7-013d-4337-a1d7-7332510f722d',	'dfc2d201-a106-4a6b-bdbc-994b7711a73e',	'2021-09-22 19:49:06.091+00',	'2021-09-22 19:49:06.091+00'),
('c7ef3fb7-013d-4337-a1d7-7332510f722d',	'78b73d77-a462-4eed-8d72-05878c1b3092',	'2021-09-22 19:49:06.102+00',	'2021-09-22 19:49:06.102+00'),
('c7ef3fb7-013d-4337-a1d7-7332510f722d',	'1ae5f8c9-b6b6-4e18-8503-c17e5248ca78',	'2021-09-22 19:49:06.115+00',	'2021-09-22 19:49:06.115+00'),
('2b5b9eef-ceb8-429a-b308-ce07b94307c7',	'556fbcde-cfd7-4993-9bec-89dd493226f1',	'2021-09-22 19:49:06.125+00',	'2021-09-22 19:49:06.125+00'),
('2b5b9eef-ceb8-429a-b308-ce07b94307c7',	'd204fe65-bfba-4852-b4ae-db2b1bb4f47d',	'2021-09-22 19:49:06.138+00',	'2021-09-22 19:49:06.138+00'),
('2b5b9eef-ceb8-429a-b308-ce07b94307c7',	'f40031d8-bd4b-46a8-a2c2-11650930cd23',	'2021-09-22 19:49:06.155+00',	'2021-09-22 19:49:06.155+00'),
('2b5b9eef-ceb8-429a-b308-ce07b94307c7',	'7306ac1f-996b-48aa-a7e0-fff74c189b93',	'2021-09-22 19:49:06.166+00',	'2021-09-22 19:49:06.166+00'),
('2b5b9eef-ceb8-429a-b308-ce07b94307c7',	'6ab26d20-3576-4256-b4b9-26d391f29b93',	'2021-09-22 19:49:06.176+00',	'2021-09-22 19:49:06.176+00'),
('2b5b9eef-ceb8-429a-b308-ce07b94307c7',	'a333ea5a-6f8a-424a-a3bd-3eefa8bba414',	'2021-09-22 19:49:06.19+00',	'2021-09-22 19:49:06.19+00'),
('2b5b9eef-ceb8-429a-b308-ce07b94307c7',	'24e2ad89-e71e-4bed-99b4-b8a7ba1f46b2',	'2021-09-22 19:49:06.201+00',	'2021-09-22 19:49:06.201+00'),
('2b5b9eef-ceb8-429a-b308-ce07b94307c7',	'2bd457d7-2abc-413a-a343-be691306b06b',	'2021-09-22 19:49:06.215+00',	'2021-09-22 19:49:06.215+00'),
('2b5b9eef-ceb8-429a-b308-ce07b94307c7',	'd41d2122-2957-4058-bfcb-68484ff4a54a',	'2021-09-22 19:49:06.226+00',	'2021-09-22 19:49:06.226+00'),
('2b5b9eef-ceb8-429a-b308-ce07b94307c7',	'1d4ab5c4-3109-4741-a7d9-d935cb244405',	'2021-09-22 19:49:06.237+00',	'2021-09-22 19:49:06.237+00'),
('b81c724e-3beb-4d2b-b71a-baffce111400',	'bbc9772e-ade3-4093-9b30-e3af41fa018a',	'2021-09-22 19:49:06.249+00',	'2021-09-22 19:49:06.249+00'),
('2b5b9eef-ceb8-429a-b308-ce07b94307c7',	'bbc9772e-ade3-4093-9b30-e3af41fa018a',	'2021-09-22 19:49:06.25+00',	'2021-09-22 19:49:06.25+00'),
('c7ef3fb7-013d-4337-a1d7-7332510f722d',	'340bd9f9-b4bf-43d0-9395-a4cb48f68764',	'2021-09-22 19:49:06.264+00',	'2021-09-22 19:49:06.264+00'),
('b81c724e-3beb-4d2b-b71a-baffce111400',	'340bd9f9-b4bf-43d0-9395-a4cb48f68764',	'2021-09-22 19:49:06.265+00',	'2021-09-22 19:49:06.265+00'),
('0f763e18-7c7f-4477-a8a5-c478b0d21f6d',	'92161d85-ed0a-417d-b982-926d86949336',	'2021-09-22 19:49:06.283+00',	'2021-09-22 19:49:06.283+00'),
('b81c724e-3beb-4d2b-b71a-baffce111400',	'92161d85-ed0a-417d-b982-926d86949336',	'2021-09-22 19:49:06.284+00',	'2021-09-22 19:49:06.284+00'),
('b81c724e-3beb-4d2b-b71a-baffce111400',	'fd06a152-6b4e-4144-b73d-79ce67903e4c',	'2021-09-22 19:49:06.297+00',	'2021-09-22 19:49:06.297+00'),
('2b5b9eef-ceb8-429a-b308-ce07b94307c7',	'fd06a152-6b4e-4144-b73d-79ce67903e4c',	'2021-09-22 19:49:06.299+00',	'2021-09-22 19:49:06.299+00'),
('b81c724e-3beb-4d2b-b71a-baffce111400',	'fdbe2ef6-77c0-4277-ba4b-11feea469506',	'2021-09-22 19:49:06.31+00',	'2021-09-22 19:49:06.31+00'),
('70bc8592-4a14-4a2e-a2ac-8a60c68d24a4',	'fdbe2ef6-77c0-4277-ba4b-11feea469506',	'2021-09-22 19:49:06.311+00',	'2021-09-22 19:49:06.311+00'),
('070f34f3-6f6d-4bf8-95f1-f136d4819856',	'a78def5a-f7cb-461b-9d4b-e858ad9bc072',	'2021-09-22 19:49:06.325+00',	'2021-09-22 19:49:06.325+00'),
('b81c724e-3beb-4d2b-b71a-baffce111400',	'a78def5a-f7cb-461b-9d4b-e858ad9bc072',	'2021-09-22 19:49:06.325+00',	'2021-09-22 19:49:06.325+00'),
('c7ef3fb7-013d-4337-a1d7-7332510f722d',	'f09d5930-a34f-4c08-ae3e-bedce87db1ea',	'2021-09-22 19:49:06.336+00',	'2021-09-22 19:49:06.336+00'),
('b81c724e-3beb-4d2b-b71a-baffce111400',	'f09d5930-a34f-4c08-ae3e-bedce87db1ea',	'2021-09-22 19:49:06.337+00',	'2021-09-22 19:49:06.337+00');

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
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'08cb7072-7fdf-4817-8832-50b1a171bdbe',	'2021-09-22 19:49:05.592+00',	'2021-09-22 19:49:05.592+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'393afffd-91bf-48ba-81d5-63d390b65918',	'2021-09-22 19:49:05.608+00',	'2021-09-22 19:49:05.608+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'70ab8d78-29ea-472b-bcaa-f203f6da54bc',	'2021-09-22 19:49:05.619+00',	'2021-09-22 19:49:05.619+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'27a5ae59-f155-49c6-b518-e950e662d30d',	'2021-09-22 19:49:05.631+00',	'2021-09-22 19:49:05.631+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'21b9c725-c56d-4814-8f50-f17e6d7e16b4',	'2021-09-22 19:49:05.645+00',	'2021-09-22 19:49:05.645+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'd1e71db9-37a0-4729-8f84-2678674ec63c',	'2021-09-22 19:49:05.659+00',	'2021-09-22 19:49:05.659+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'5db5b14d-38fb-42f0-a8b3-aea71116a138',	'2021-09-22 19:49:05.671+00',	'2021-09-22 19:49:05.671+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'52b2afa2-a9c3-4ab4-ad66-f7f2488b2e70',	'2021-09-22 19:49:05.683+00',	'2021-09-22 19:49:05.683+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'419aa95c-d2ad-4355-b4e0-319614779eba',	'2021-09-22 19:49:05.704+00',	'2021-09-22 19:49:05.704+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'14ff4673-588e-44ef-a640-26b41ec2bcff',	'2021-09-22 19:49:05.725+00',	'2021-09-22 19:49:05.725+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'b991b20c-3359-4f01-9f2e-802ffaf1cb1a',	'2021-09-22 19:49:05.736+00',	'2021-09-22 19:49:05.736+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'c8d4204e-9724-4c38-9ad5-6fbaaa0c4e5e',	'2021-09-22 19:49:05.749+00',	'2021-09-22 19:49:05.749+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'1a0357ce-978b-4fd6-ab67-57089cf2212d',	'2021-09-22 19:49:05.763+00',	'2021-09-22 19:49:05.763+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'97105599-1c16-4a55-850d-0aac85e48ddd',	'2021-09-22 19:49:05.776+00',	'2021-09-22 19:49:05.776+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'82fd1a16-dfd9-47f4-947e-9b05c0e84ac6',	'2021-09-22 19:49:05.789+00',	'2021-09-22 19:49:05.789+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'f34b54fe-83c7-4ec6-9373-0157f9d62e1c',	'2021-09-22 19:49:05.801+00',	'2021-09-22 19:49:05.801+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'460bb90b-9be2-435f-a6ce-85198678308c',	'2021-09-22 19:49:05.817+00',	'2021-09-22 19:49:05.817+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'4dfda24a-c8ad-4be3-b17e-644afbfbc467',	'2021-09-22 19:49:05.831+00',	'2021-09-22 19:49:05.831+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'664bfb9c-4eea-4ed5-92f9-e88b856bebc1',	'2021-09-22 19:49:05.843+00',	'2021-09-22 19:49:05.843+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'3322710d-0585-4c13-a3f9-794a7dec8989',	'2021-09-22 19:49:05.861+00',	'2021-09-22 19:49:05.861+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'531912d2-bd71-4f7a-b05e-3a4bee9eb4d2',	'2021-09-22 19:49:05.876+00',	'2021-09-22 19:49:05.876+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'36b1bc0e-d0a4-443b-b7cf-77ab64da5a31',	'2021-09-22 19:49:05.891+00',	'2021-09-22 19:49:05.891+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'7d5efe08-4b58-40a7-a0d4-1915853bbb4b',	'2021-09-22 19:49:05.902+00',	'2021-09-22 19:49:05.902+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'3232f615-afef-45d5-9dba-5b02300fdab3',	'2021-09-22 19:49:05.913+00',	'2021-09-22 19:49:05.913+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'ec6707ab-23ab-4b2f-acce-09fc818345e5',	'2021-09-22 19:49:05.928+00',	'2021-09-22 19:49:05.928+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'69016d92-2d09-4016-bff3-ed43afd355b1',	'2021-09-22 19:49:05.943+00',	'2021-09-22 19:49:05.943+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'd2271d2e-51f4-4ec9-af0f-090df374cfe8',	'2021-09-22 19:49:05.957+00',	'2021-09-22 19:49:05.957+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'69f1b812-88ab-4d77-a930-1c90b9f1daff',	'2021-09-22 19:49:05.971+00',	'2021-09-22 19:49:05.971+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'04886c2b-6bf6-42bf-aba9-c1286d3cdc20',	'2021-09-22 19:49:05.984+00',	'2021-09-22 19:49:05.984+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'd7ed2c42-6f1c-46ea-a1a6-fca9fab835af',	'2021-09-22 19:49:05.994+00',	'2021-09-22 19:49:05.994+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'e362f215-38c9-403f-837c-39701ca029cb',	'2021-09-22 19:49:06.006+00',	'2021-09-22 19:49:06.006+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'd83c78c3-37e9-45fc-a858-e1b1b10bf5c4',	'2021-09-22 19:49:06.017+00',	'2021-09-22 19:49:06.017+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'c8b01a38-ca23-41b5-adb6-c4f0a1d3e073',	'2021-09-22 19:49:06.029+00',	'2021-09-22 19:49:06.029+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'0ab93bde-7900-4886-9ade-1cafe231e34a',	'2021-09-22 19:49:06.041+00',	'2021-09-22 19:49:06.041+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'181018f9-0d0e-4a7d-b65a-90b55f39cd54',	'2021-09-22 19:49:06.055+00',	'2021-09-22 19:49:06.055+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'9baa2769-e874-4ec5-8bd7-339d56b2e0c5',	'2021-09-22 19:49:06.067+00',	'2021-09-22 19:49:06.067+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'520a6346-7a23-4c0e-88b4-1fd2013e2dbf',	'2021-09-22 19:49:06.078+00',	'2021-09-22 19:49:06.078+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'dfc2d201-a106-4a6b-bdbc-994b7711a73e',	'2021-09-22 19:49:06.09+00',	'2021-09-22 19:49:06.09+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'78b73d77-a462-4eed-8d72-05878c1b3092',	'2021-09-22 19:49:06.101+00',	'2021-09-22 19:49:06.101+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'1ae5f8c9-b6b6-4e18-8503-c17e5248ca78',	'2021-09-22 19:49:06.114+00',	'2021-09-22 19:49:06.114+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'556fbcde-cfd7-4993-9bec-89dd493226f1',	'2021-09-22 19:49:06.126+00',	'2021-09-22 19:49:06.126+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'd204fe65-bfba-4852-b4ae-db2b1bb4f47d',	'2021-09-22 19:49:06.137+00',	'2021-09-22 19:49:06.137+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'f40031d8-bd4b-46a8-a2c2-11650930cd23',	'2021-09-22 19:49:06.153+00',	'2021-09-22 19:49:06.153+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'7306ac1f-996b-48aa-a7e0-fff74c189b93',	'2021-09-22 19:49:06.165+00',	'2021-09-22 19:49:06.165+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'6ab26d20-3576-4256-b4b9-26d391f29b93',	'2021-09-22 19:49:06.177+00',	'2021-09-22 19:49:06.177+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'a333ea5a-6f8a-424a-a3bd-3eefa8bba414',	'2021-09-22 19:49:06.188+00',	'2021-09-22 19:49:06.188+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'24e2ad89-e71e-4bed-99b4-b8a7ba1f46b2',	'2021-09-22 19:49:06.2+00',	'2021-09-22 19:49:06.2+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'2bd457d7-2abc-413a-a343-be691306b06b',	'2021-09-22 19:49:06.215+00',	'2021-09-22 19:49:06.215+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'd41d2122-2957-4058-bfcb-68484ff4a54a',	'2021-09-22 19:49:06.226+00',	'2021-09-22 19:49:06.226+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'1d4ab5c4-3109-4741-a7d9-d935cb244405',	'2021-09-22 19:49:06.237+00',	'2021-09-22 19:49:06.237+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'bbc9772e-ade3-4093-9b30-e3af41fa018a',	'2021-09-22 19:49:06.248+00',	'2021-09-22 19:49:06.248+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'340bd9f9-b4bf-43d0-9395-a4cb48f68764',	'2021-09-22 19:49:06.263+00',	'2021-09-22 19:49:06.263+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'92161d85-ed0a-417d-b982-926d86949336',	'2021-09-22 19:49:06.282+00',	'2021-09-22 19:49:06.282+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'fd06a152-6b4e-4144-b73d-79ce67903e4c',	'2021-09-22 19:49:06.296+00',	'2021-09-22 19:49:06.296+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'fdbe2ef6-77c0-4277-ba4b-11feea469506',	'2021-09-22 19:49:06.309+00',	'2021-09-22 19:49:06.309+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'a78def5a-f7cb-461b-9d4b-e858ad9bc072',	'2021-09-22 19:49:06.324+00',	'2021-09-22 19:49:06.324+00'),
('58881c44-8531-42e9-bf47-aa7cdf71e21a',	'f09d5930-a34f-4c08-ae3e-bedce87db1ea',	'2021-09-22 19:49:06.338+00',	'2021-09-22 19:49:06.338+00');

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
('419aa95c-d2ad-4355-b4e0-319614779eba',	'40ef037d-d995-4d8e-b0c1-72bac9a7b391',	'2021-09-22 19:49:05.709+00',	'2021-09-22 19:49:05.709+00'),
('419aa95c-d2ad-4355-b4e0-319614779eba',	'd1252567-a545-460a-891b-7cb531f77a5b',	'2021-09-22 19:49:05.711+00',	'2021-09-22 19:49:05.711+00'),
('d2271d2e-51f4-4ec9-af0f-090df374cfe8',	'815f99fa-e5a3-46d5-9c14-d2c08746104c',	'2021-09-22 19:49:05.959+00',	'2021-09-22 19:49:05.959+00');

DROP TABLE IF EXISTS "refresh_token";
CREATE TABLE "public"."refresh_token" (
    "token" text NOT NULL,
    "userId" uuid,
    "expirationDate" timestamptz NOT NULL,
    CONSTRAINT "refresh_token_token" PRIMARY KEY ("token"),
    CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

-- 2021-09-04 10:19:05.013484+00
