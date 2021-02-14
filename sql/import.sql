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
('2ff90480-2bc4-40b9-a5da-8a60b81a3c17',    'user1',    'user1@lequiz.com', 'password', NULL,   NULL,   'free', 'member',   '0',    '1',    '0',    NULL,   '2021-02-13 21:07:36.473+00',   '2021-02-13 21:07:36.473+00',   NULL),
('3498e7c4-c8c3-4212-ae85-477aa556816a',    'user2',    'user2@lequiz.com', 'password', NULL,   NULL,   'free', 'member',   '0',    '1',    '0',    NULL,   '2021-02-13 21:07:36.512+00',   '2021-02-13 21:07:36.512+00',   NULL),
('308b0690-4d49-4eb8-8a10-f27b405c5216',    'user3',    'user3@lequiz.com', 'password', NULL,   NULL,   'free', 'member',   '0',    '1',    '0',    NULL,   '2021-02-13 21:07:36.548+00',   '2021-02-13 21:07:36.548+00',   NULL),
('c4341935-4949-45fd-b386-7fafb1b82696',    'user4',    'user4@lequiz.com', 'password', NULL,   NULL,   'vip',  'member',   '1',    '1',    '0',    NULL,   '2021-02-13 21:07:36.578+00',   '2021-02-13 21:07:36.578+00',   NULL),
('f560917b-ada0-4fd1-8745-c3e2ce565927',    'user5',    'user5@lequiz.com', 'password', NULL,   NULL,   'premium',  'member',   '1',    '1',    '0',    NULL,   '2021-02-13 21:07:36.612+00',   '2021-02-13 21:07:36.612+00',   NULL),
('562685fb-4ea2-4122-ab1e-6564635d839d',    'user6',    'user6@lequiz.com', 'password', NULL,   NULL,   'free', 'member',   '0',    '0',    '0',    NULL,   '2021-02-13 21:07:36.636+00',   '2021-02-13 21:07:36.636+00',   NULL),
('527fd09a-e7fd-4763-b1d3-ccc628e8e4a3',    'user7',    'user7@lequiz.com', 'password', NULL,   NULL,   'free', 'member',   '0',    '0',    '0',    NULL,   '2021-02-13 21:07:36.671+00',   '2021-02-13 21:07:36.671+00',   NULL),
('efb28e43-8afe-43c8-b6d3-a8889b344a87',    'user8',    'user8@lequiz.com', 'password', NULL,   NULL,   'free', 'member',   '0',    '1',    '1',    NULL,   '2021-02-13 21:07:36.703+00',   '2021-02-13 21:07:36.703+00',   NULL),
('592f0723-2ac9-4d85-a0dc-54743602e1e7',    'user9',    'user9@lequiz.com', 'password', NULL,   NULL,   'free', 'member',   '0',    '1',    '1',    NULL,   '2021-02-13 21:07:36.736+00',   '2021-02-13 21:07:36.736+00',   NULL),
('64c47594-7555-48b7-8b88-a8787078e5db',    'reviewer1',    'reviewer1@lequiz.com', 'password', NULL,   NULL,   'free', 'reviewer', '0',    '1',    '0',    NULL,   '2021-02-13 21:07:36.769+00',   '2021-02-13 21:07:36.769+00',   NULL),
('71d8830c-a1ec-476e-9819-d600889f97a0',    'reviewer2',    'reviewer2@lequiz.com', 'password', NULL,   NULL,   'vip',  'reviewer', '0',    '1',    '0',    NULL,   '2021-02-13 21:07:36.802+00',   '2021-02-13 21:07:36.802+00',   NULL),
('ad7fc050-9a21-401f-ae6a-ad639b8e047a',    'admin1',   'admin1@lequiz.com',    'password', NULL,   NULL,   'vip',  'admin',    '0',    '1',    '0',    NULL,   '2021-02-13 21:07:36.835+00',   '2021-02-13 21:07:36.835+00',   NULL);


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
('6653b9a9-bb3a-4fe0-ad68-37ae9deb22de',	'Histoire',	'2021-02-13 21:07:31.297+00',	'2021-02-13 21:07:31.297+00'),
('168f295b-cbb0-449c-ba62-50ddf015cb0a',	'Sport',	'2021-02-13 21:07:31.321+00',	'2021-02-13 21:07:31.321+00'),
('a6d0b110-b398-4860-b7e8-16be49da4f0f',	'Jeu-Vidéo',	'2021-02-13 21:07:31.346+00',	'2021-02-13 21:07:31.346+00'),
('908bc49b-7a6e-49e1-847a-b05ea2ed69b2',	'Cinéma',	'2021-02-13 21:07:31.371+00',	'2021-02-13 21:07:31.371+00'),
('c445680c-6004-4213-b631-71cc506cd910',	'Musique',	'2021-02-13 21:07:31.396+00',	'2021-02-13 21:07:31.396+00'),
('44db5bbb-bcc3-486e-9228-c241d5a93f2b',	'Automobile',	'2021-02-13 21:07:31.42+00',	'2021-02-13 21:07:31.42+00');

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
('0733aba8-02e9-494a-919c-85b137fa5619',    'medium',   'Combien fait 1 + 4 ?', '{"answers": [{"content": "5", "is_good_answer": true}, {"content": "3", "is_good_answer": false}, {"content": "4", "is_good_answer": false}, {"content": "6", "is_good_answer": false}], "additional": {"responseMedia": {"url": "http://example.com/toto.png", "info": "0 + 0 égale ? ..."}}}',   'approved', '{"url": "http://example.com/calculatrice.png", "type": "image/png"}',  NULL,   '2021-02-13 21:07:31.46+00',    '2021-02-13 21:07:31.46+00'),
('7ece6e14-6bb7-4de2-8138-e0a3eef111ef',    'medium',   'En quelle année, Mao a-t-il lancé sa révolution culturelle ?', '{"answers": [{"content": "1814", "is_good_answer": false}, {"content": "1865", "is_good_answer": false}, {"content": "1920", "is_good_answer": false}, {"content": "1966", "is_good_answer": true}]}', 'approved', '{}',   NULL,   '2021-02-13 21:07:31.547+00',   '2021-02-13 21:07:31.547+00'),
('8ec4ab2e-47fb-4f4b-88dd-fa812204df2b',    'medium',   'En quelle année les États-Unis ont-ils pris part à la Première Guerre mondiale ?', '{"answers": [{"content": "1918", "is_good_answer": false}, {"content": "1915", "is_good_answer": false}, {"content": "1917", "is_good_answer": true}, {"content": "1916", "is_good_answer": false}]}', 'approved', '{}',   NULL,   '2021-02-13 21:07:31.629+00',   '2021-02-13 21:07:31.629+00'),
('72995ad4-f278-45f7-9306-f369cacf7505',    'medium',   'Quels Jeux olympiques ont été supprimés à cause de la Seconde Guerre mondiale ?',  '{"answers": [{"content": "1936 et 1940", "is_good_answer": false}, {"content": "1944 et 1948", "is_good_answer": false}, {"content": "1940 et 1944", "is_good_answer": true}, {"content": "1932 et 1936", "is_good_answer": false}], "additional": {"responseMedia": {"url": null, "info": "Les Jeux ont été rénovés par le baron Pierre de Coubertin à la fin du XIXe siècle."}}}',   'approved', '{}',   NULL,   '2021-02-13 21:07:31.712+00',   '2021-02-13 21:07:31.712+00'),
('df29a88a-268a-44fb-b246-a9ce1a68d231',    'medium',   'Dans les plaines de quel champ de bataille se dresse la Butte du Lion ?',  '{"answers": [{"content": "Verdun", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": true}, {"content": "Austerlitz", "is_good_answer": false}, {"content": "Valmy", "is_good_answer": false}]}',    'approved', '{}',   NULL,   '2021-02-13 21:07:31.796+00',   '2021-02-13 21:07:31.796+00'),
('94c7c18b-e40f-41e2-bfa4-6362b4dcb6d7',    'medium',   'Quelle ligne de défense française fut contournée par les Allemands en 1940 ?', '{"answers": [{"content": "La ligne Siegfried", "is_good_answer": false}, {"content": "La ligne Maginot", "is_good_answer": true}, {"content": "La ligne Verte", "is_good_answer": false}, {"content": "La ligne Daladier", "is_good_answer": false}]}',    'approved', '{}',   NULL,   '2021-02-13 21:07:31.87+00',    '2021-02-13 21:07:31.87+00'),
('160d1f4f-49f1-49f3-ac60-60d06b66d46e',    'medium',   'Le général Cambronne, qui commandait la vieille garde, eut une conduite héroïque à...',    '{"answers": [{"content": "Wagram", "is_good_answer": false}, {"content": "Iena", "is_good_answer": false}, {"content": "Midway", "is_good_answer": false}, {"content": "Waterloo", "is_good_answer": true}]}', 'approved', '{}',   NULL,   '2021-02-13 21:07:31.944+00',   '2021-02-13 21:07:31.944+00'),
('a13dcec1-b446-412b-821d-ebb04b1bfb80',    'medium',   'Où a eu lieu le grand procès des criminels de guerre nazis ?', '{"answers": [{"content": "Berlin", "is_good_answer": false}, {"content": "Nuremberg", "is_good_answer": true}, {"content": "Hambourg", "is_good_answer": false}, {"content": "Munich", "is_good_answer": false}], "additional": {"responseMedia": {"url": null, "info": "Le procès de Nuremberg fut intenté contre 24 responsables du Troisième Reich."}}}',   'approved', '{}',   NULL,   '2021-02-13 21:07:32.019+00',   '2021-02-13 21:07:32.019+00'),
('bc831feb-225a-4419-9b18-3891d3720787',    'medium',   'Qui fut vainqueur de la Guerre de Troie, conflit légendaire de la mythologie grecque ?',   '{"answers": [{"content": "Sophocle", "is_good_answer": false}, {"content": "Ajax", "is_good_answer": false}, {"content": "Ulysse", "is_good_answer": true}, {"content": "Arkantos", "is_good_answer": false}]}',   'approved', '{}',   NULL,   '2021-02-13 21:07:32.101+00',   '2021-02-13 21:07:32.101+00'),
('8819df48-0fe9-45cb-a05f-c8375d3612a9',    'medium',   'En quelle année la bataille de Waterloo a-t-elle eu lieu, à vingt kilomètres au sud de Bruxelles ?',   '{"answers": [{"content": "1815", "is_good_answer": true}, {"content": "1831", "is_good_answer": false}, {"content": "1809", "is_good_answer": false}, {"content": "1824", "is_good_answer": false}]}', 'approved', '{}',   NULL,   '2021-02-13 21:07:32.177+00',   '2021-02-13 21:07:32.177+00'),
('86ff6b03-f30d-41e3-b226-703daf3342f3',    'medium',   'Quel basketteur américain a été champion NBA en 1998 pour la sixième fois de sa carrière ?',   '{"answers": [{"content": "Patrick Ewing", "is_good_answer": false}, {"content": "Karl Malone", "is_good_answer": false}, {"content": "Charles Barkley", "is_good_answer": false}, {"content": "Michael Jordan", "is_good_answer": true}]}',    'approved', '{}',   NULL,   '2021-02-13 21:07:32.267+00',   '2021-02-13 21:07:32.267+00'),
('dbea8ad1-b8f0-441e-81f2-25cc9ea32ea4',    'medium',   'Dans quelle pays est né le joueur de basket-ball professionnel Tony Parker ?', '{"answers": [{"content": "Belgique", "is_good_answer": true}, {"content": "USA", "is_good_answer": false}, {"content": "France", "is_good_answer": false}, {"content": "Pologne", "is_good_answer": false}], "additional": {"responseMedia": {"url": null, "info": "Il évoluait dans l''équipe des Spurs de San Antonio depuis son arrivée dans la NBA en 2001."}}}',  'approved', '{}',   NULL,   '2021-02-13 21:07:32.357+00',   '2021-02-13 21:07:32.357+00'),
('6f5e1b16-35bc-45e4-a463-f152aafa26ef',    'medium',   'Qui a été élu joueur de la décennie 2000 suite à un sondage du site officiel NBA ?',   '{"answers": [{"content": "Derek Fisher", "is_good_answer": false}, {"content": "Ron Harper", "is_good_answer": false}, {"content": "Kobe Bryant", "is_good_answer": true}, {"content": "Rick Fox", "is_good_answer": false}]}',    'approved', '{}',   NULL,   '2021-02-13 21:07:32.449+00',   '2021-02-13 21:07:32.449+00'),
('da38a54c-e3bd-461d-bb83-c4cdbda7612a',    'medium',   'Quel concours de dunks est organisé par la NBA durant le NBA All-Star Week-end ?', '{"answers": [{"content": "Skills Challenge", "is_good_answer": false}, {"content": "Slam Dunk Contest", "is_good_answer": true}, {"content": "Three-point Shootout", "is_good_answer": false}, {"content": "All-Star Game", "is_good_answer": false}]}',   'approved', '{}',   NULL,   '2021-02-13 21:07:32.548+00',   '2021-02-13 21:07:32.548+00'),
('649f8fce-0102-4108-b247-d5f6e7429dd8',    'medium',   'Quel basketteur américain a réalisé en 2000 un 360 degrés inversé mythique ?', '{"answers": [{"content": "Jarnell Stokes", "is_good_answer": false}, {"content": "Vince Carter", "is_good_answer": true}, {"content": "Marc Gasol", "is_good_answer": false}, {"content": "Andrew Harrison", "is_good_answer": false}]}',  'approved', '{}',   NULL,   '2021-02-13 21:07:32.631+00',   '2021-02-13 21:07:32.631+00'),
('4a2837df-b678-4fd2-8f50-5f78f74799c4',    'medium',   'Quel joueur de NBA se définit lui-même comme un « viking africain » ?',    '{"answers": [{"content": "Derrick Rose", "is_good_answer": false}, {"content": "Pau Gasol", "is_good_answer": false}, {"content": "Aaron Brooks", "is_good_answer": false}, {"content": "Joakim Noah", "is_good_answer": true}]}', 'approved', '{}',   NULL,   '2021-02-13 21:07:32.721+00',   '2021-02-13 21:07:32.721+00'),
('49e05fc1-d364-433b-82f4-73aa88fae620',    'medium',   'Quel événement annuel majeur de la NBA est comparable à une bourse de joueurs ?',  '{"answers": [{"content": "La franchise", "is_good_answer": false}, {"content": "Les playoffs", "is_good_answer": false}, {"content": "Le ballotage", "is_good_answer": false}, {"content": "La draft", "is_good_answer": true}]}', 'approved', '{}',   NULL,   '2021-02-13 21:07:32.805+00',   '2021-02-13 21:07:32.805+00'),
('de64c3bb-6809-4f7b-a854-6d0eac3c1f5e',    'medium',   'Combien de titres de champion NBA Michael Jordan a-t-il obtenu ?', '{"answers": [{"content": "Cinq", "is_good_answer": false}, {"content": "Sept", "is_good_answer": false}, {"content": "Six", "is_good_answer": true}, {"content": "Quatre", "is_good_answer": false}]}',    'approved', '{}',   NULL,   '2021-02-13 21:07:32.896+00',   '2021-02-13 21:07:32.896+00'),
('f98ea295-e7a2-45a3-83d5-5339c0f1ab60',    'medium',   'Qui est le premier joueur français à avoir été sacré champion NBA ?',  '{"answers": [{"content": "Joe Dumars", "is_good_answer": false}, {"content": "Paul Pierce", "is_good_answer": false}, {"content": "Tony Parker", "is_good_answer": true}, {"content": "Tim Duncan", "is_good_answer": false}]}',   'approved', '{}',   NULL,   '2021-02-13 21:07:32.979+00',   '2021-02-13 21:07:32.979+00'),
('92b4f31a-8c00-4c29-b64f-b8c5cfe65874',    'medium',   'Qui a été élu deux fois meilleur joueur de la NBA, en 2005 et 2006 ?', '{"answers": [{"content": "Jeff Brown", "is_good_answer": false}, {"content": "Dana Jones", "is_good_answer": false}, {"content": "Marlon Garnett", "is_good_answer": false}, {"content": "Steve Nash", "is_good_answer": true}]}', 'approved', '{}',   NULL,   '2021-02-13 21:07:33.077+00',   '2021-02-13 21:07:33.077+00'),
('fb1a777e-55f4-4b4d-9986-456b95e99f21',    'medium',   'Quel gagnant de la « Nouvelle Star », diffusée sur M6, est surnommé « La Tortue » ?',  '{"answers": [{"content": "Christophe Willem", "is_good_answer": true}, {"content": "Julien Doré", "is_good_answer": false}, {"content": "Jonatan Cerrada", "is_good_answer": false}, {"content": "Steeve Estatof", "is_good_answer": false}]}',    'approved', '{}',   NULL,   '2021-02-13 21:07:33.161+00',   '2021-02-13 21:07:33.161+00'),
('7ba1c8bd-27f8-445c-a56d-5c8771041be4',    'medium',   'En 1991, quel tube Yannick Noah a-t-il associé à la victoire de la France en coupe Davis ?',   '{"answers": [{"content": "Vagabond", "is_good_answer": false}, {"content": "Les Lionnes", "is_good_answer": false}, {"content": "Saga Africa", "is_good_answer": true}, {"content": "Ose", "is_good_answer": false}]}',    'approved', '{}',   NULL,   '2021-02-13 21:07:33.259+00',   '2021-02-13 21:07:33.259+00'),
('5343f70e-7087-4663-8d58-5c5c6a077305',    'medium',   'Quel chanteur prénommé Mathieu a émergé du succès remporté par les Linkup ?',  '{"answers": [{"content": "Corneille", "is_good_answer": false}, {"content": "Keen''V", "is_good_answer": false}, {"content": "Raphaël", "is_good_answer": false}, {"content": "M. Pokora", "is_good_answer": true}]}', 'approved', '{}',   NULL,   '2021-02-13 21:07:33.36+00',    '2021-02-13 21:07:33.36+00'),
('d37515d1-3579-4c5e-a424-051a1e997d5c',    'medium',   'Quel est le style musical de l''album de Rohff, « La fierté des années » ?',   '{"answers": [{"content": "La Techno", "is_good_answer": false}, {"content": "Le tango", "is_good_answer": false}, {"content": "Le disco", "is_good_answer": false}, {"content": "Le rap", "is_good_answer": true}]}',  'approved', '{}',   NULL,   '2021-02-13 21:07:33.459+00',   '2021-02-13 21:07:33.459+00'),
('cc9f0ec4-2bac-477c-9eb2-5fd023609b73',    'medium',   'Qui a chanté au pied de …onnes le 10 juin 2000 ?', '{"answers": [{"content": "Eddy Mitchell", "is_good_answer": false}, {"content": "Patrick Bruel", "is_good_answer": false}, {"content": "Christophe Maé", "is_good_answer": false}, {"content": "Johnny Hallyday", "is_good_answer": true}]}',  'approved', '{}',   NULL,   '2021-02-13 21:07:33.641+00',   '2021-02-13 21:07:33.641+00'),
('f4735c41-0b39-45a5-b20e-80dd9cc5723f',    'medium',   'Sous quel nom le rappeur et homme d''affaires américain Curtis Jackson fait-il carrière ?',    '{"answers": [{"content": "50 cent", "is_good_answer": true}, {"content": "Fat Joe", "is_good_answer": false}, {"content": "Big Sean", "is_good_answer": false}, {"content": "Mike D", "is_good_answer": false}]}', 'approved', '{}',   NULL,   '2021-02-13 21:07:33.732+00',   '2021-02-13 21:07:33.732+00'),
('76b71e4b-57f6-40ca-ab3a-d50f3af05bba',    'medium',   'Quel DJ a repris un titre des années 80 pour faire un tube avec « Living On Video » ?',    '{"answers": [{"content": "Pakito", "is_good_answer": true}, {"content": "Vitalic", "is_good_answer": false}, {"content": "Madeon", "is_good_answer": false}, {"content": "Brodinski", "is_good_answer": false}]}', 'approved', '{}',   NULL,   '2021-02-13 21:07:33.915+00',   '2021-02-13 21:07:33.915+00'),
('548f1075-2390-4a1a-a1e2-51d4a9ab7ac4',    'medium',   'Quel chanteur a sorti « Musicology » puis « 3121 » deux ans plus tard ?',  '{"answers": [{"content": "Bob James", "is_good_answer": false}, {"content": "Al Jarreau", "is_good_answer": false}, {"content": "Prince", "is_good_answer": true}, {"content": "James Brown", "is_good_answer": false}]}', 'approved', '{}',   NULL,   '2021-02-13 21:07:34.013+00',   '2021-02-13 21:07:34.013+00'),
('ccaa6da6-c262-4167-9bbd-e34c6fdfdb9e',    'medium',   'Dans quel pays se situe le circuit de course automobile du Mans ?',    '{"answers": [{"content": "Pays-Bas", "is_good_answer": false}, {"content": "Suisse", "is_good_answer": false}, {"content": "Belgique", "is_good_answer": false}, {"content": "France", "is_good_answer": true}]}', 'approved', '{}',   NULL,   '2021-02-13 21:07:34.113+00',   '2021-02-13 21:07:34.113+00'),
('c5e26c21-2f23-4c28-b2c6-c7367b6eba8a',    'medium',   'À quel modèle de voiture ressemble le vieux tacot jaune que conduit Gaston Lagaffe ?', '{"answers": [{"content": "Rolls-Royce", "is_good_answer": false}, {"content": "Citroën B10", "is_good_answer": false}, {"content": "Fiat 509", "is_good_answer": true}, {"content": "Jeep", "is_good_answer": false}]}',   'approved', '{}',   NULL,   '2021-02-13 21:07:34.204+00',   '2021-02-13 21:07:34.204+00'),
('c6c7b3c2-606b-415d-bd63-c163d0389f18',    'medium'L,   'Quel sport automobile consiste à accélérer le plus rapidement possible avec son véhicule ?',   '{"answers": [{"content": "Le trial", "is_good_answer": false}, {"content": "Le Drift", "is_good_answer": false}, {"content": "Le Monster truck", "is_good_answer": false}, {"content": "Le Dragster", "is_good_answer": true}]}',  'approved', '{}',   NULL,   '2021-02-13 21:07:34.287+00',   '2021-02-13 21:07:34.287+00'),
('0593cf8a-238a-4b93-ab07-e646e5c0a898',    'medium',   'Comment s''appelle le véhicule du personnage de bande dessinée Batman ?',  '{"answers": [{"content": "La BatDrive", "is_good_answer": false}, {"content": "La Batauto", "is_good_answer": false}, {"content": "La Batcar", "is_good_answer": false}, {"content": "La Batmobile", "is_good_answer": true}]}',   'approved', '{}',   NULL,   '2021-02-13 21:07:34.385+00',   '2021-02-13 21:07:34.385+00'),
('0b27190d-22a2-483b-b9a6-48de48a54bb8',    'medium',   'De quand date le Duster, véhicule utilitaire sport vendu par la marque roumaine Dacia ?',  '{"answers": [{"content": "2006", "is_good_answer": false}, {"content": "2008", "is_good_answer": false}, {"content": "2010", "is_good_answer": true}, {"content": "2012", "is_good_answer": false}]}', 'approved', '{}',   NULL,   '2021-02-13 21:07:34.477+00',   '2021-02-13 21:07:34.477+00'),
('019f47ba-f6ce-4e67-9a42-27406df87e9c',    'medium',   'En France, refuser une priorité peut vous coûter combien de points sur le permis ?',   '{"answers": [{"content": "6 points", "is_good_answer": false}, {"content": "8 points", "is_good_answer": false}, {"content": "4 points", "is_good_answer": true}, {"content": "2 points", "is_good_answer": false}]}', 'approved', '{}',   NULL,   '2021-02-13 21:07:34.568+00',   '2021-02-13 21:07:34.568+00'),
('1fe4fb4c-437e-4785-be9e-a5cd50d0755b',    'medium',   'Quelle principauté accueille l''un des plus prestigieux Grand Prix de Formule 1 ?',    '{"answers": [{"content": "Liechtenstein", "is_good_answer": false}, {"content": "Andorre", "is_good_answer": false}, {"content": "Mantoue", "is_good_answer": false}, {"content": "Monaco", "is_good_answer": true}]}',    'approved', '{}',   NULL,   '2021-02-13 21:07:34.659+00',   '2021-02-13 21:07:34.659+00'),
('a9e216ba-09e9-423e-822e-a9ab25fa3ed2',    'medium',   'Dans le monde automobile, quel sigle correspond au Grand Tourisme Injection ?',    '{"answers": [{"content": "Sport", "is_good_answer": false}, {"content": "Gti", "is_good_answer": true}, {"content": "TT", "is_good_answer": false}, {"content": "Turbo", "is_good_answer": false}]}',  'approved', '{}',   NULL,   '2021-02-13 21:07:34.8+00', '2021-02-13 21:07:34.8+00'),
('e2167844-4616-46d1-aa9c-ea65a0cb9ea5',    'medium',   'Quelle société appartenant au groupe Belron « répare et remplace » votre pare-brise ?',    '{"answers": [{"content": "Carglass", "is_good_answer": true}, {"content": "Midas", "is_good_answer": false}, {"content": "Speedy", "is_good_answer": false}, {"content": "Norauto", "is_good_answer": false}]}',   'approved', '{}',   NULL,   '2021-02-13 21:07:34.9+00', '2021-02-13 21:07:34.9+00'),
('cdcab28c-43f0-48ee-97ee-b8c23eacc2d8',    'medium',   'Quel Américano-Libanais est entré dans les charts avec « Life in Cartoon Motion » ?',  '{"answers": [{"content": "Mika", "is_good_answer": true}, {"content": "Iwan", "is_good_answer": false}, {"content": "Rida", "is_good_answer": false}, {"content": "K. Maro", "is_good_answer": false}]}',  'approved', '{}',   NULL,   '2021-02-13 21:07:33.543+00',   '2021-02-13 21:07:33.543+00'),
('9118c075-94d1-462f-b7d0-476999163eef',    'medium',   'Avec quel chanteur le top model Heidi Klum a-t-elle été mariée durant sept ans ?', '{"answers": [{"content": "Seal", "is_good_answer": true}, {"content": "Paul McCartney", "is_good_answer": false}, {"content": "Sean Paul", "is_good_answer": false}, {"content": "Robbie Williams", "is_good_answer": false}]}',   'approved', '{}',   NULL,   '2021-02-13 21:07:33.831+00',   '2021-02-13 21:07:33.831+00'),
('24804592-1db6-4fcd-847c-5546ff6b6ee3',    'medium'L,   'Quelle firme automobile, filiale française de FIAT, a ensuite intégré le groupe Chrysler ?',   '{"answers": [{"content": "Simca", "is_good_answer": true}, {"content": "Hommell", "is_good_answer": false}, {"content": "Packard", "is_good_answer": false}, {"content": "Triumph", "is_good_answer": false}]}',   'approved', '{}',   NULL,   '2021-02-13 21:07:35.007+00',   '2021-02-13 21:07:35.007+00'),
('7e71e528-e4fb-420f-b030-1908141a6094',    'medium',   'Dans quel jeu peux on voir des Chocobos ?',    '{"answers": [{"content": "Breath of fire", "is_good_answer": false}, {"content": "Final Fantasy", "is_good_answer": true}, {"content": "Secret of Mana", "is_good_answer": false}, {"content": "Golden stun", "is_good_answer": false}]}', 'approved', '{}',   NULL,   '2021-02-13 21:07:35.191+00',   '2021-02-13 21:07:35.191+00'),
('a4e5b31b-3ca4-446a-8e00-eda5a96bd49e',    'medium',   'Salamèche évolue en ', '{"answers": [{"content": "Dracaufeu", "is_good_answer": false}, {"content": "Reptincel", "is_good_answer": true}, {"content": "Magna", "is_good_answer": false}, {"content": "Ptera", "is_good_answer": false}]}', 'approved', '{}',   NULL,   '2021-02-13 21:07:35.288+00',   '2021-02-13 21:07:35.288+00'),
('25d2baa3-333b-44af-b27e-9806a4a96eb9',    'medium',   'Zelda est un jeu du genre',    '{"answers": [{"content": "Aventure", "is_good_answer": true}, {"content": "RPG", "is_good_answer": false}, {"content": "Course", "is_good_answer": false}, {"content": "Simulation", "is_good_answer": false}]}',  'approved', '{}',   NULL,   '2021-02-13 21:07:35.38+00',    '2021-02-13 21:07:35.38+00'),
('0f97f6c9-4d4d-42ed-bea5-b93503f608cb',    'medium',   'Sur quelle plateforme le jeu Tekken est sorti en premier ?',   '{"answers": [{"content": "La borne d''arcade", "is_good_answer": true}, {"content": "NES", "is_good_answer": false}, {"content": "Playstation", "is_good_answer": false}, {"content": "Gamecube", "is_good_answer": false}]}', 'approved', '{}',   NULL,   '2021-02-13 21:07:35.478+00',   '2021-02-13 21:07:35.478+00'),
('6fac7cae-2597-4b2b-b9a1-9cf4dea3555a',    'medium',   'Dans quel jeu le personnage de Mario a-t-il été développé en premier ?',   '{"answers": [{"content": "Super Mario", "is_good_answer": false}, {"content": "Super Mario Bros", "is_good_answer": false}, {"content": "Donkey Kong", "is_good_answer": true}, {"content": "Mario Party", "is_good_answer": false}]}',    'approved', '{}',   NULL,   '2021-02-13 21:07:35.563+00',   '2021-02-13 21:07:35.563+00'),
('d7f2bc4e-f056-49b3-acf7-6029562f0e64',    'medium',   'La série Fallout est la suite « spirituelle » de quel jeu ?',  '{"answers": [{"content": "Wasteland", "is_good_answer": true}, {"content": "Homeland", "is_good_answer": false}, {"content": "Falland", "is_good_answer": false}, {"content": "Skyrim", "is_good_answer": false}]}',   'approved', '{}',   NULL,   '2021-02-13 21:07:35.661+00',   '2021-02-13 21:07:35.661+00'),
('27ed5728-9772-4d30-9754-07e9ea49c442',    'medium',   'Que signifie le nom de la serie GTA ?',    '{"answers": [{"content": "Burnout", "is_good_answer": false}, {"content": "Conduite dangeureuse", "is_good_answer": false}, {"content": "Vol de voiture", "is_good_answer": true}, {"content": "Voiture customisé", "is_good_answer": false}]}',   'approved', '{}',   NULL,   '2021-02-13 21:07:35.744+00',   '2021-02-13 21:07:35.744+00'),
('a01ebd6f-3744-427c-98a1-cd5e3bff840b',    'medium',   'Le jeu Counter Strike dérive de quel autre jeu ?', '{"answers": [{"content": "Half Life", "is_good_answer": true}, {"content": "Splinter Cell", "is_good_answer": false}, {"content": "Doom", "is_good_answer": false}, {"content": "Call of Duty", "is_good_answer": false}]}',   'approved', '{}',   NULL,   '2021-02-13 21:07:35.835+00',   '2021-02-13 21:07:35.835+00'),
('ac51cd17-889f-4612-87bd-0cde910dd6c8',    'medium',   'Dans Pac man qu''est ce qui hante le labyrinthe ?',    '{"answers": [{"content": "Des plantes carnivores", "is_good_answer": false}, {"content": "Des fantômes", "is_good_answer": true}, {"content": "Des squelettes", "is_good_answer": false}, {"content": "Des zombies", "is_good_answer": false}]}',  'approved', '{}',   NULL,   '2021-02-13 21:07:35.918+00',   '2021-02-13 21:07:35.918+00'),
('b163b1bd-a64b-4c09-b63f-82d17eeff5ad',    'medium',   'Dans la légende de Zelda, comment s''appelle le héros ?',  '{"answers": [{"content": "Zelda", "is_good_answer": false}, {"content": "Bruno", "is_good_answer": false}, {"content": "Ganondorf", "is_good_answer": false}, {"content": "Link", "is_good_answer": true}]}',  'approved', '{}',   NULL,   '2021-02-13 21:07:36.009+00',   '2021-02-13 21:07:36.009+00'),
('0568a2cf-4eb1-475c-bfc7-9a0fc4637f99',    'medium',   'Qui est le compagnon de Batman ?', '{"answers": [{"content": "Robin", "is_good_answer": true}]}',  'pending',  '{}',   NULL,   '2021-02-13 21:07:36.1+00', '2021-02-13 21:07:36.1+00'),
('2295748e-bbf5-45a6-b317-7d535fe869e3',    'medium',   'Quel super héros ne se sépare jamais de son marteau forgé par les nains ', '{"answers": [{"content": "Thor", "is_good_answer": true}]}',   'pending',  '{}',   NULL,   '2021-02-13 21:07:36.191+00',   '2021-02-13 21:07:36.191+00'),
('af36aee1-3a28-4d7f-a4f8-63f0ddf7d6c5',    'medium',   'Quel super-héros à la force surhumaine ressemble à un être de pierre ?',   '{"answers": [{"content": "Hawkman", "is_good_answer": false}, {"content": "Plastic Man", "is_good_answer": false}, {"content": "Superboy", "is_good_answer": false}, {"content": "La Chose", "is_good_answer": true}]}',   'disapproved',  '{}',   NULL,   '2021-02-13 21:07:36.291+00',   '2021-02-13 21:07:36.291+00'),
('ed519989-72cd-4ce0-b4b9-2431ecc14090',    'medium',   'Quel super-héros porte un costume inspiré du drapeau américain ?', '{"answers": [{"content": "Tigra", "is_good_answer": false}, {"content": "Iron Man", "is_good_answer": false}, {"content": "Blade", "is_good_answer": false}, {"content": "Captain America", "is_good_answer": true}]}',    'disapproved',  '{}',   NULL,   '2021-02-13 21:07:36.381+00',   '2021-02-13 21:07:36.381+00');

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
('6653b9a9-bb3a-4fe0-ad68-37ae9deb22de',	'0733aba8-02e9-494a-919c-85b137fa5619',	'2021-02-13 21:07:31.491+00',	'2021-02-13 21:07:31.491+00'),
('6653b9a9-bb3a-4fe0-ad68-37ae9deb22de',	'7ece6e14-6bb7-4de2-8138-e0a3eef111ef',	'2021-02-13 21:07:31.578+00',	'2021-02-13 21:07:31.578+00'),
('6653b9a9-bb3a-4fe0-ad68-37ae9deb22de',	'8ec4ab2e-47fb-4f4b-88dd-fa812204df2b',	'2021-02-13 21:07:31.653+00',	'2021-02-13 21:07:31.653+00'),
('6653b9a9-bb3a-4fe0-ad68-37ae9deb22de',	'72995ad4-f278-45f7-9306-f369cacf7505',	'2021-02-13 21:07:31.735+00',	'2021-02-13 21:07:31.735+00'),
('6653b9a9-bb3a-4fe0-ad68-37ae9deb22de',	'df29a88a-268a-44fb-b246-a9ce1a68d231',	'2021-02-13 21:07:31.818+00',	'2021-02-13 21:07:31.818+00'),
('6653b9a9-bb3a-4fe0-ad68-37ae9deb22de',	'94c7c18b-e40f-41e2-bfa4-6362b4dcb6d7',	'2021-02-13 21:07:31.893+00',	'2021-02-13 21:07:31.893+00'),
('6653b9a9-bb3a-4fe0-ad68-37ae9deb22de',	'160d1f4f-49f1-49f3-ac60-60d06b66d46e',	'2021-02-13 21:07:31.967+00',	'2021-02-13 21:07:31.967+00'),
('6653b9a9-bb3a-4fe0-ad68-37ae9deb22de',	'a13dcec1-b446-412b-821d-ebb04b1bfb80',	'2021-02-13 21:07:32.05+00',	'2021-02-13 21:07:32.05+00'),
('6653b9a9-bb3a-4fe0-ad68-37ae9deb22de',	'bc831feb-225a-4419-9b18-3891d3720787',	'2021-02-13 21:07:32.124+00',	'2021-02-13 21:07:32.124+00'),
('6653b9a9-bb3a-4fe0-ad68-37ae9deb22de',	'8819df48-0fe9-45cb-a05f-c8375d3612a9',	'2021-02-13 21:07:32.207+00',	'2021-02-13 21:07:32.207+00'),
('168f295b-cbb0-449c-ba62-50ddf015cb0a',	'86ff6b03-f30d-41e3-b226-703daf3342f3',	'2021-02-13 21:07:32.298+00',	'2021-02-13 21:07:32.298+00'),
('168f295b-cbb0-449c-ba62-50ddf015cb0a',	'dbea8ad1-b8f0-441e-81f2-25cc9ea32ea4',	'2021-02-13 21:07:32.389+00',	'2021-02-13 21:07:32.389+00'),
('168f295b-cbb0-449c-ba62-50ddf015cb0a',	'6f5e1b16-35bc-45e4-a463-f152aafa26ef',	'2021-02-13 21:07:32.479+00',	'2021-02-13 21:07:32.479+00'),
('168f295b-cbb0-449c-ba62-50ddf015cb0a',	'da38a54c-e3bd-461d-bb83-c4cdbda7612a',	'2021-02-13 21:07:32.572+00',	'2021-02-13 21:07:32.572+00'),
('168f295b-cbb0-449c-ba62-50ddf015cb0a',	'649f8fce-0102-4108-b247-d5f6e7429dd8',	'2021-02-13 21:07:32.663+00',	'2021-02-13 21:07:32.663+00'),
('168f295b-cbb0-449c-ba62-50ddf015cb0a',	'4a2837df-b678-4fd2-8f50-5f78f74799c4',	'2021-02-13 21:07:32.746+00',	'2021-02-13 21:07:32.746+00'),
('168f295b-cbb0-449c-ba62-50ddf015cb0a',	'49e05fc1-d364-433b-82f4-73aa88fae620',	'2021-02-13 21:07:32.836+00',	'2021-02-13 21:07:32.836+00'),
('168f295b-cbb0-449c-ba62-50ddf015cb0a',	'de64c3bb-6809-4f7b-a854-6d0eac3c1f5e',	'2021-02-13 21:07:32.92+00',	'2021-02-13 21:07:32.92+00'),
('168f295b-cbb0-449c-ba62-50ddf015cb0a',	'f98ea295-e7a2-45a3-83d5-5339c0f1ab60',	'2021-02-13 21:07:33.01+00',	'2021-02-13 21:07:33.01+00'),
('168f295b-cbb0-449c-ba62-50ddf015cb0a',	'92b4f31a-8c00-4c29-b64f-b8c5cfe65874',	'2021-02-13 21:07:33.102+00',	'2021-02-13 21:07:33.102+00'),
('c445680c-6004-4213-b631-71cc506cd910',	'fb1a777e-55f4-4b4d-9986-456b95e99f21',	'2021-02-13 21:07:33.193+00',	'2021-02-13 21:07:33.193+00'),
('c445680c-6004-4213-b631-71cc506cd910',	'7ba1c8bd-27f8-445c-a56d-5c8771041be4',	'2021-02-13 21:07:33.294+00',	'2021-02-13 21:07:33.294+00'),
('c445680c-6004-4213-b631-71cc506cd910',	'5343f70e-7087-4663-8d58-5c5c6a077305',	'2021-02-13 21:07:33.39+00',	'2021-02-13 21:07:33.39+00'),
('c445680c-6004-4213-b631-71cc506cd910',	'd37515d1-3579-4c5e-a424-051a1e997d5c',	'2021-02-13 21:07:33.483+00',	'2021-02-13 21:07:33.483+00'),
('c445680c-6004-4213-b631-71cc506cd910',	'cdcab28c-43f0-48ee-97ee-b8c23eacc2d8',	'2021-02-13 21:07:33.582+00',	'2021-02-13 21:07:33.582+00'),
('c445680c-6004-4213-b631-71cc506cd910',	'cc9f0ec4-2bac-477c-9eb2-5fd023609b73',	'2021-02-13 21:07:33.664+00',	'2021-02-13 21:07:33.664+00'),
('c445680c-6004-4213-b631-71cc506cd910',	'f4735c41-0b39-45a5-b20e-80dd9cc5723f',	'2021-02-13 21:07:33.763+00',	'2021-02-13 21:07:33.763+00'),
('c445680c-6004-4213-b631-71cc506cd910',	'9118c075-94d1-462f-b7d0-476999163eef',	'2021-02-13 21:07:33.855+00',	'2021-02-13 21:07:33.855+00'),
('c445680c-6004-4213-b631-71cc506cd910',	'76b71e4b-57f6-40ca-ab3a-d50f3af05bba',	'2021-02-13 21:07:33.946+00',	'2021-02-13 21:07:33.946+00'),
('c445680c-6004-4213-b631-71cc506cd910',	'548f1075-2390-4a1a-a1e2-51d4a9ab7ac4',	'2021-02-13 21:07:34.046+00',	'2021-02-13 21:07:34.046+00'),
('44db5bbb-bcc3-486e-9228-c241d5a93f2b',	'ccaa6da6-c262-4167-9bbd-e34c6fdfdb9e',	'2021-02-13 21:07:34.144+00',	'2021-02-13 21:07:34.144+00'),
('44db5bbb-bcc3-486e-9228-c241d5a93f2b',	'c5e26c21-2f23-4c28-b2c6-c7367b6eba8a',	'2021-02-13 21:07:34.227+00',	'2021-02-13 21:07:34.227+00'),
('44db5bbb-bcc3-486e-9228-c241d5a93f2b',	'c6c7b3c2-606b-415d-bd63-c163d0389f18',	'2021-02-13 21:07:34.318+00',	'2021-02-13 21:07:34.318+00'),
('44db5bbb-bcc3-486e-9228-c241d5a93f2b',	'0593cf8a-238a-4b93-ab07-e646e5c0a898',	'2021-02-13 21:07:34.418+00',	'2021-02-13 21:07:34.418+00'),
('44db5bbb-bcc3-486e-9228-c241d5a93f2b',	'0b27190d-22a2-483b-b9a6-48de48a54bb8',	'2021-02-13 21:07:34.508+00',	'2021-02-13 21:07:34.508+00'),
('44db5bbb-bcc3-486e-9228-c241d5a93f2b',	'019f47ba-f6ce-4e67-9a42-27406df87e9c',	'2021-02-13 21:07:34.592+00',	'2021-02-13 21:07:34.592+00'),
('44db5bbb-bcc3-486e-9228-c241d5a93f2b',	'1fe4fb4c-437e-4785-be9e-a5cd50d0755b',	'2021-02-13 21:07:34.691+00',	'2021-02-13 21:07:34.691+00'),
('44db5bbb-bcc3-486e-9228-c241d5a93f2b',	'a9e216ba-09e9-423e-822e-a9ab25fa3ed2',	'2021-02-13 21:07:34.832+00',	'2021-02-13 21:07:34.832+00'),
('44db5bbb-bcc3-486e-9228-c241d5a93f2b',	'e2167844-4616-46d1-aa9c-ea65a0cb9ea5',	'2021-02-13 21:07:34.94+00',	'2021-02-13 21:07:34.94+00'),
('44db5bbb-bcc3-486e-9228-c241d5a93f2b',	'24804592-1db6-4fcd-847c-5546ff6b6ee3',	'2021-02-13 21:07:35.123+00',	'2021-02-13 21:07:35.123+00'),
('a6d0b110-b398-4860-b7e8-16be49da4f0f',	'7e71e528-e4fb-420f-b030-1908141a6094',	'2021-02-13 21:07:35.228+00',	'2021-02-13 21:07:35.228+00'),
('a6d0b110-b398-4860-b7e8-16be49da4f0f',	'a4e5b31b-3ca4-446a-8e00-eda5a96bd49e',	'2021-02-13 21:07:35.32+00',	'2021-02-13 21:07:35.32+00'),
('a6d0b110-b398-4860-b7e8-16be49da4f0f',	'25d2baa3-333b-44af-b27e-9806a4a96eb9',	'2021-02-13 21:07:35.419+00',	'2021-02-13 21:07:35.419+00'),
('a6d0b110-b398-4860-b7e8-16be49da4f0f',	'0f97f6c9-4d4d-42ed-bea5-b93503f608cb',	'2021-02-13 21:07:35.504+00',	'2021-02-13 21:07:35.504+00'),
('a6d0b110-b398-4860-b7e8-16be49da4f0f',	'6fac7cae-2597-4b2b-b9a1-9cf4dea3555a',	'2021-02-13 21:07:35.602+00',	'2021-02-13 21:07:35.602+00'),
('a6d0b110-b398-4860-b7e8-16be49da4f0f',	'd7f2bc4e-f056-49b3-acf7-6029562f0e64',	'2021-02-13 21:07:35.685+00',	'2021-02-13 21:07:35.685+00'),
('a6d0b110-b398-4860-b7e8-16be49da4f0f',	'27ed5728-9772-4d30-9754-07e9ea49c442',	'2021-02-13 21:07:35.776+00',	'2021-02-13 21:07:35.776+00'),
('a6d0b110-b398-4860-b7e8-16be49da4f0f',	'a01ebd6f-3744-427c-98a1-cd5e3bff840b',	'2021-02-13 21:07:35.867+00',	'2021-02-13 21:07:35.867+00'),
('a6d0b110-b398-4860-b7e8-16be49da4f0f',	'ac51cd17-889f-4612-87bd-0cde910dd6c8',	'2021-02-13 21:07:35.949+00',	'2021-02-13 21:07:35.949+00'),
('a6d0b110-b398-4860-b7e8-16be49da4f0f',	'b163b1bd-a64b-4c09-b63f-82d17eeff5ad',	'2021-02-13 21:07:36.041+00',	'2021-02-13 21:07:36.041+00'),
('908bc49b-7a6e-49e1-847a-b05ea2ed69b2',	'0568a2cf-4eb1-475c-bfc7-9a0fc4637f99',	'2021-02-13 21:07:36.132+00',	'2021-02-13 21:07:36.132+00'),
('908bc49b-7a6e-49e1-847a-b05ea2ed69b2',	'2295748e-bbf5-45a6-b317-7d535fe869e3',	'2021-02-13 21:07:36.223+00',	'2021-02-13 21:07:36.223+00'),
('908bc49b-7a6e-49e1-847a-b05ea2ed69b2',	'af36aee1-3a28-4d7f-a4f8-63f0ddf7d6c5',	'2021-02-13 21:07:36.322+00',	'2021-02-13 21:07:36.322+00'),
('908bc49b-7a6e-49e1-847a-b05ea2ed69b2',	'ed519989-72cd-4ce0-b4b9-2431ecc14090',	'2021-02-13 21:07:36.405+00',	'2021-02-13 21:07:36.405+00');

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
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'qcm',	'QCM',	'2021-02-13 21:07:31.243+00',	'2021-02-13 21:07:31.243+00'),
('4385469a-e2c8-4b60-900a-ff7c4f9021f9',	'input',	'Réponse libre',	'2021-02-13 21:07:31.272+00',	'2021-02-13 21:07:31.272+00');

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
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'0733aba8-02e9-494a-919c-85b137fa5619',	'2021-02-13 21:07:31.488+00',	'2021-02-13 21:07:31.488+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'7ece6e14-6bb7-4de2-8138-e0a3eef111ef',	'2021-02-13 21:07:31.58+00',	'2021-02-13 21:07:31.58+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'8ec4ab2e-47fb-4f4b-88dd-fa812204df2b',	'2021-02-13 21:07:31.652+00',	'2021-02-13 21:07:31.652+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'72995ad4-f278-45f7-9306-f369cacf7505',	'2021-02-13 21:07:31.736+00',	'2021-02-13 21:07:31.736+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'df29a88a-268a-44fb-b246-a9ce1a68d231',	'2021-02-13 21:07:31.819+00',	'2021-02-13 21:07:31.819+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'94c7c18b-e40f-41e2-bfa4-6362b4dcb6d7',	'2021-02-13 21:07:31.892+00',	'2021-02-13 21:07:31.892+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'160d1f4f-49f1-49f3-ac60-60d06b66d46e',	'2021-02-13 21:07:31.966+00',	'2021-02-13 21:07:31.966+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'a13dcec1-b446-412b-821d-ebb04b1bfb80',	'2021-02-13 21:07:32.051+00',	'2021-02-13 21:07:32.051+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'bc831feb-225a-4419-9b18-3891d3720787',	'2021-02-13 21:07:32.125+00',	'2021-02-13 21:07:32.125+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'8819df48-0fe9-45cb-a05f-c8375d3612a9',	'2021-02-13 21:07:32.208+00',	'2021-02-13 21:07:32.208+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'86ff6b03-f30d-41e3-b226-703daf3342f3',	'2021-02-13 21:07:32.299+00',	'2021-02-13 21:07:32.299+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'dbea8ad1-b8f0-441e-81f2-25cc9ea32ea4',	'2021-02-13 21:07:32.39+00',	'2021-02-13 21:07:32.39+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'6f5e1b16-35bc-45e4-a463-f152aafa26ef',	'2021-02-13 21:07:32.48+00',	'2021-02-13 21:07:32.48+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'da38a54c-e3bd-461d-bb83-c4cdbda7612a',	'2021-02-13 21:07:32.571+00',	'2021-02-13 21:07:32.571+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'649f8fce-0102-4108-b247-d5f6e7429dd8',	'2021-02-13 21:07:32.662+00',	'2021-02-13 21:07:32.662+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'4a2837df-b678-4fd2-8f50-5f78f74799c4',	'2021-02-13 21:07:32.745+00',	'2021-02-13 21:07:32.745+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'49e05fc1-d364-433b-82f4-73aa88fae620',	'2021-02-13 21:07:32.836+00',	'2021-02-13 21:07:32.836+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'de64c3bb-6809-4f7b-a854-6d0eac3c1f5e',	'2021-02-13 21:07:32.919+00',	'2021-02-13 21:07:32.919+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'f98ea295-e7a2-45a3-83d5-5339c0f1ab60',	'2021-02-13 21:07:33.01+00',	'2021-02-13 21:07:33.01+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'92b4f31a-8c00-4c29-b64f-b8c5cfe65874',	'2021-02-13 21:07:33.101+00',	'2021-02-13 21:07:33.101+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'fb1a777e-55f4-4b4d-9986-456b95e99f21',	'2021-02-13 21:07:33.192+00',	'2021-02-13 21:07:33.192+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'7ba1c8bd-27f8-445c-a56d-5c8771041be4',	'2021-02-13 21:07:33.295+00',	'2021-02-13 21:07:33.295+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'5343f70e-7087-4663-8d58-5c5c6a077305',	'2021-02-13 21:07:33.391+00',	'2021-02-13 21:07:33.391+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'd37515d1-3579-4c5e-a424-051a1e997d5c',	'2021-02-13 21:07:33.482+00',	'2021-02-13 21:07:33.482+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'cdcab28c-43f0-48ee-97ee-b8c23eacc2d8',	'2021-02-13 21:07:33.581+00',	'2021-02-13 21:07:33.581+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'cc9f0ec4-2bac-477c-9eb2-5fd023609b73',	'2021-02-13 21:07:33.665+00',	'2021-02-13 21:07:33.665+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'f4735c41-0b39-45a5-b20e-80dd9cc5723f',	'2021-02-13 21:07:33.766+00',	'2021-02-13 21:07:33.766+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'9118c075-94d1-462f-b7d0-476999163eef',	'2021-02-13 21:07:33.855+00',	'2021-02-13 21:07:33.855+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'76b71e4b-57f6-40ca-ab3a-d50f3af05bba',	'2021-02-13 21:07:33.945+00',	'2021-02-13 21:07:33.945+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'548f1075-2390-4a1a-a1e2-51d4a9ab7ac4',	'2021-02-13 21:07:34.045+00',	'2021-02-13 21:07:34.045+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'ccaa6da6-c262-4167-9bbd-e34c6fdfdb9e',	'2021-02-13 21:07:34.144+00',	'2021-02-13 21:07:34.144+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'c5e26c21-2f23-4c28-b2c6-c7367b6eba8a',	'2021-02-13 21:07:34.228+00',	'2021-02-13 21:07:34.228+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'c6c7b3c2-606b-415d-bd63-c163d0389f18',	'2021-02-13 21:07:34.318+00',	'2021-02-13 21:07:34.318+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'0593cf8a-238a-4b93-ab07-e646e5c0a898',	'2021-02-13 21:07:34.419+00',	'2021-02-13 21:07:34.419+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'0b27190d-22a2-483b-b9a6-48de48a54bb8',	'2021-02-13 21:07:34.509+00',	'2021-02-13 21:07:34.509+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'019f47ba-f6ce-4e67-9a42-27406df87e9c',	'2021-02-13 21:07:34.593+00',	'2021-02-13 21:07:34.593+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'1fe4fb4c-437e-4785-be9e-a5cd50d0755b',	'2021-02-13 21:07:34.69+00',	'2021-02-13 21:07:34.69+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'a9e216ba-09e9-423e-822e-a9ab25fa3ed2',	'2021-02-13 21:07:34.831+00',	'2021-02-13 21:07:34.831+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'e2167844-4616-46d1-aa9c-ea65a0cb9ea5',	'2021-02-13 21:07:34.939+00',	'2021-02-13 21:07:34.939+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'24804592-1db6-4fcd-847c-5546ff6b6ee3',	'2021-02-13 21:07:35.122+00',	'2021-02-13 21:07:35.122+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'7e71e528-e4fb-420f-b030-1908141a6094',	'2021-02-13 21:07:35.229+00',	'2021-02-13 21:07:35.229+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'a4e5b31b-3ca4-446a-8e00-eda5a96bd49e',	'2021-02-13 21:07:35.321+00',	'2021-02-13 21:07:35.321+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'25d2baa3-333b-44af-b27e-9806a4a96eb9',	'2021-02-13 21:07:35.42+00',	'2021-02-13 21:07:35.42+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'0f97f6c9-4d4d-42ed-bea5-b93503f608cb',	'2021-02-13 21:07:35.503+00',	'2021-02-13 21:07:35.503+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'6fac7cae-2597-4b2b-b9a1-9cf4dea3555a',	'2021-02-13 21:07:35.601+00',	'2021-02-13 21:07:35.601+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'd7f2bc4e-f056-49b3-acf7-6029562f0e64',	'2021-02-13 21:07:35.684+00',	'2021-02-13 21:07:35.684+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'27ed5728-9772-4d30-9754-07e9ea49c442',	'2021-02-13 21:07:35.775+00',	'2021-02-13 21:07:35.775+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'a01ebd6f-3744-427c-98a1-cd5e3bff840b',	'2021-02-13 21:07:35.868+00',	'2021-02-13 21:07:35.868+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'ac51cd17-889f-4612-87bd-0cde910dd6c8',	'2021-02-13 21:07:35.95+00',	'2021-02-13 21:07:35.95+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'b163b1bd-a64b-4c09-b63f-82d17eeff5ad',	'2021-02-13 21:07:36.041+00',	'2021-02-13 21:07:36.041+00'),
('4385469a-e2c8-4b60-900a-ff7c4f9021f9',	'0568a2cf-4eb1-475c-bfc7-9a0fc4637f99',	'2021-02-13 21:07:36.131+00',	'2021-02-13 21:07:36.131+00'),
('4385469a-e2c8-4b60-900a-ff7c4f9021f9',	'2295748e-bbf5-45a6-b317-7d535fe869e3',	'2021-02-13 21:07:36.223+00',	'2021-02-13 21:07:36.223+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'af36aee1-3a28-4d7f-a4f8-63f0ddf7d6c5',	'2021-02-13 21:07:36.322+00',	'2021-02-13 21:07:36.322+00'),
('27567471-ea12-4709-9d3f-ed72e9ceb1ea',	'ed519989-72cd-4ce0-b4b9-2431ecc14090',	'2021-02-13 21:07:36.406+00',	'2021-02-13 21:07:36.406+00');

DROP TABLE IF EXISTS "refresh_token";
CREATE TABLE "public"."refresh_token" (
    "token" text NOT NULL,
    "userId" uuid,
    "expirationDate" timestamptz NOT NULL,
    CONSTRAINT "refresh_token_token" PRIMARY KEY ("token"),
    CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

-- 2021-02-13 21:09:39.56042+00
