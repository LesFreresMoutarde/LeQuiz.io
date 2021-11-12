-- Adminer 4.7.7 PostgreSQL dump

\connect "lequiz-io";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "SequelizeMeta";
CREATE TABLE "public"."SequelizeMeta"
(
    "name" character varying(255) NOT NULL,
    CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY ("name")
) WITH (oids = false);

DROP TABLE IF EXISTS "category";
CREATE TABLE "public"."category"
(
    "id"        uuid                  NOT NULL,
    "name"      character varying(50) NOT NULL,
    "label"     character varying(50) NOT NULL,
    "createdAt" timestamptz           NOT NULL,
    "updatedAt" timestamptz           NOT NULL,
    CONSTRAINT "category_label_key" UNIQUE ("label"),
    CONSTRAINT "category_name_key" UNIQUE ("name"),
    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

DROP TABLE IF EXISTS "user";
CREATE TABLE "public"."user"
(
    "id"                             uuid                   NOT NULL,
    "username"                       character varying(30)  NOT NULL,
    "email"                          character varying(191) NOT NULL,
    "password"                       character varying(255) NOT NULL,
    "passwordResetToken"             character varying(255),
    "lastResetPasswordEmailSendDate" timestamptz,
    "plan"                           character varying(30)  NOT NULL,
    "role"                           character varying(30)  NOT NULL,
    "isTrustyWriter"                 boolean                NOT NULL,
    "isActive"                       boolean                NOT NULL,
    "isBanned"                       boolean                NOT NULL,
    "unbanDate"                      timestamptz,
    "createdAt"                      timestamptz            NOT NULL,
    "updatedAt"                      timestamptz            NOT NULL,
    "deletedAt"                      timestamptz,
    CONSTRAINT "user_email_key" UNIQUE ("email"),
    CONSTRAINT "user_passwordResetToken_key" UNIQUE ("passwordResetToken"),
    CONSTRAINT "user_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "user_username_key" UNIQUE ("username")
) WITH (oids = false);

CREATE INDEX "user_email" ON "public"."user" USING btree ("email");

CREATE INDEX "user_plan" ON "public"."user" USING btree ("plan");

CREATE INDEX "user_username" ON "public"."user" USING btree ("username");

INSERT INTO "user" ("id", "username", "email", "password", "passwordResetToken", "lastResetPasswordEmailSendDate",
                    "plan", "role", "isTrustyWriter", "isActive", "isBanned", "unbanDate", "createdAt", "updatedAt",
                    "deletedAt")
VALUES ('701460a2-6308-4a67-890f-4fe80310c75a', 'user1', 'user1@lequiz.com',
        '$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI', NULL, NULL,
        'free', 'member', '0', '1', '0', NULL, '2021-09-04 10:05:00.577+00', '2021-09-04 10:05:00.577+00', NULL),
       ('4e894c4d-13fd-4361-827e-2084163e91c4', 'user2', 'user2@lequiz.com',
        '$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI', NULL, NULL,
        'free', 'member', '0', '1', '0', NULL, '2021-09-04 10:05:00.587+00', '2021-09-04 10:05:00.587+00', NULL),
       ('60064924-9220-4bc1-a558-9c3edc3726c1', 'user3', 'user3@lequiz.com',
        '$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI', NULL, NULL,
        'free', 'member', '0', '1', '0', NULL, '2021-09-04 10:05:00.596+00', '2021-09-04 10:05:00.596+00', NULL),
       ('13bb8588-90a8-4e59-ac87-268c5082a985', 'user4', 'user4@lequiz.com',
        '$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI', NULL, NULL,
        'vip', 'member', '1', '1', '0', NULL, '2021-09-04 10:05:00.601+00', '2021-09-04 10:05:00.601+00', NULL),
       ('60d627c7-28bf-4cc7-83d7-9f3af07ff86c', 'user5', 'user5@lequiz.com',
        '$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI', NULL, NULL,
        'premium', 'member', '1', '1', '0', NULL, '2021-09-04 10:05:00.607+00', '2021-09-04 10:05:00.607+00', NULL),
       ('02c4dd09-52b5-485f-a78a-bfacf371411f', 'user6', 'user6@lequiz.com',
        '$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI', NULL, NULL,
        'free', 'member', '0', '0', '0', NULL, '2021-09-04 10:05:00.614+00', '2021-09-04 10:05:00.614+00', NULL),
       ('f30acb3d-e843-47f2-8c69-6a3816b7c235', 'user7', 'user7@lequiz.com',
        '$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI', NULL, NULL,
        'free', 'member', '0', '0', '0', NULL, '2021-09-04 10:05:00.62+00', '2021-09-04 10:05:00.62+00', NULL),
       ('6bd9ee75-51d4-4200-bea9-75d9eb04b577', 'user8', 'user8@lequiz.com',
        '$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI', NULL, NULL,
        'free', 'member', '0', '1', '1', NULL, '2021-09-04 10:05:00.626+00', '2021-09-04 10:05:00.626+00', NULL),
       ('5c570146-c0a3-4e54-91e2-4d12256cd9ec', 'user9', 'user9@lequiz.com',
        '$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI', NULL, NULL,
        'free', 'member', '0', '1', '1', NULL, '2021-09-04 10:05:00.632+00', '2021-09-04 10:05:00.632+00', NULL),
       ('549bab4b-b9e1-4878-b89b-6e97bb36f0fe', 'reviewer1', 'reviewer1@lequiz.com',
        '$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI', NULL, NULL,
        'free', 'reviewer', '0', '1', '0', NULL, '2021-09-04 10:05:00.636+00', '2021-09-04 10:05:00.636+00', NULL),
       ('fff73dfa-4808-47ab-bb25-db0491bcbbd0', 'reviewer2', 'reviewer2@lequiz.com',
        '$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI', NULL, NULL,
        'vip', 'reviewer', '0', '1', '0', NULL, '2021-09-04 10:05:00.642+00', '2021-09-04 10:05:00.642+00', NULL),
       ('b44c5321-4b54-4a5e-8628-45280525fea4', 'admin1', 'admin1@lequiz.com',
        '$argon2id$v=19$m=16,t=3,p=1$ECnM7r6o/rwpgQovC4IPKw$4/XKDPL7Tq/1GlS6hTVkwin0Vxz4iA9zB9JhWvs50BI', NULL, NULL,
        'vip', 'admin', '0', '1', '0', NULL, '2021-09-04 10:05:00.647+00', '2021-09-04 10:05:00.647+00', NULL);

DROP TABLE IF EXISTS "custom_quiz";
CREATE TABLE "public"."custom_quiz"
(
    "id"               uuid                   NOT NULL,
    "title"            character varying(255) NOT NULL,
    "authorId"         uuid,
    "reviewsRequested" boolean                NOT NULL,
    "status"           character varying(30)  NOT NULL,
    "createdAt"        timestamptz            NOT NULL,
    "updatedAt"        timestamptz            NOT NULL,
    CONSTRAINT "custom_quiz_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "custom_quiz_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user" (id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

CREATE INDEX "custom_quiz_author_id" ON "public"."custom_quiz" USING btree ("authorId");

CREATE INDEX "custom_quiz_reviews_requested" ON "public"."custom_quiz" USING btree ("reviewsRequested");

CREATE INDEX "custom_quiz_status" ON "public"."custom_quiz" USING btree ("status");

CREATE INDEX "custom_quiz_title" ON "public"."custom_quiz" USING btree ("title");

DROP TABLE IF EXISTS "question";
CREATE TABLE "public"."question"
(
    "id"           uuid                  NOT NULL,
    "isHardcore"   boolean               NOT NULL,
    "content"      text                  NOT NULL,
    "answer"       jsonb                 NOT NULL,
    "status"       character varying(30) NOT NULL,
    "media"        jsonb,
    "customQuizId" uuid,
    "createdAt"    timestamptz           NOT NULL,
    "updatedAt"    timestamptz           NOT NULL,
    CONSTRAINT "question_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "question_customQuizId_fkey" FOREIGN KEY ("customQuizId") REFERENCES custom_quiz (id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

CREATE INDEX "question_custom_quiz_id" ON "public"."question" USING btree ("customQuizId");

CREATE INDEX "question_is_hardcore" ON "public"."question" USING btree ("isHardcore");

CREATE INDEX "question_status" ON "public"."question" USING btree ("status");

DROP TABLE IF EXISTS "category_custom_quiz";
CREATE TABLE "public"."category_custom_quiz"
(
    "categoryId"   uuid                      NOT NULL,
    "customQuizId" uuid                      NOT NULL,
    "createdAt"    timestamptz DEFAULT now() NOT NULL,
    "updatedAt"    timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT "category_custom_quiz_pkey" PRIMARY KEY ("categoryId", "customQuizId"),
    CONSTRAINT "category_custom_quiz_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES category (id) ON DELETE RESTRICT NOT DEFERRABLE,
    CONSTRAINT "category_custom_quiz_customQuizId_fkey" FOREIGN KEY ("customQuizId") REFERENCES custom_quiz (id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

DROP TABLE IF EXISTS "category_question";
CREATE TABLE "public"."category_question"
(
    "categoryId" uuid                      NOT NULL,
    "questionId" uuid                      NOT NULL,
    "createdAt"  timestamptz DEFAULT now() NOT NULL,
    "updatedAt"  timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT "category_question_pkey" PRIMARY KEY ("categoryId", "questionId"),
    CONSTRAINT "category_question_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES category (id) ON DELETE RESTRICT NOT DEFERRABLE,
    CONSTRAINT "category_question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES question (id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

DROP TABLE IF EXISTS "question_position";
CREATE TABLE "public"."question_position"
(
    "questionId" uuid        NOT NULL,
    "position"   integer     NOT NULL,
    "createdAt"  timestamptz NOT NULL,
    "updatedAt"  timestamptz NOT NULL,
    CONSTRAINT "question_position_pkey" PRIMARY KEY ("questionId"),
    CONSTRAINT "question_position_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES question (id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

CREATE INDEX "question_position_position" ON "public"."question_position" USING btree ("position");

DROP TABLE IF EXISTS "question_type";
CREATE TABLE "public"."question_type"
(
    "id"        uuid                  NOT NULL,
    "name"      character varying(50) NOT NULL,
    "label"     character varying(80) NOT NULL,
    "createdAt" timestamptz           NOT NULL,
    "updatedAt" timestamptz           NOT NULL,
    CONSTRAINT "question_type_label_key" UNIQUE ("label"),
    CONSTRAINT "question_type_name_key" UNIQUE ("name"),
    CONSTRAINT "question_type_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "question_type_question";
CREATE TABLE "public"."question_type_question"
(
    "questionTypeId" uuid                      NOT NULL,
    "questionId"     uuid                      NOT NULL,
    "createdAt"      timestamptz DEFAULT now() NOT NULL,
    "updatedAt"      timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT "question_type_question_pkey" PRIMARY KEY ("questionTypeId", "questionId"),
    CONSTRAINT "question_type_question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES question (id) ON DELETE RESTRICT NOT DEFERRABLE,
    CONSTRAINT "question_type_question_questionTypeId_fkey" FOREIGN KEY ("questionTypeId") REFERENCES question_type (id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);


DROP TABLE IF EXISTS "refresh_token";
CREATE TABLE "public"."refresh_token"
(
    "token"          text        NOT NULL,
    "userId"         uuid,
    "expirationDate" timestamptz NOT NULL,
    CONSTRAINT "refresh_token_token" PRIMARY KEY ("token"),
    CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" (id) ON UPDATE RESTRICT ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);


DROP TABLE IF EXISTS "subscription";
CREATE TABLE "public"."subscription"
(
    "id"             uuid                   NOT NULL,
    "reference"      character varying(255) NOT NULL,
    "userId"         uuid                   NOT NULL,
    "startDate"      date                   NOT NULL,
    "expirationDate" date                   NOT NULL,
    "createdAt"      timestamptz            NOT NULL,
    "updatedAt"      timestamptz            NOT NULL,
    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "subscription_reference_key" UNIQUE ("reference"),
    CONSTRAINT "subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" (id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

CREATE INDEX "subscription_expiration_date" ON "public"."subscription" USING btree ("expirationDate");

CREATE INDEX "subscription_user_id" ON "public"."subscription" USING btree ("userId");


DROP TABLE IF EXISTS "tag";
CREATE TABLE "public"."tag"
(
    "id"        uuid                  NOT NULL,
    "name"      character varying(50) NOT NULL,
    "label"     character varying(80) NOT NULL,
    "createdAt" timestamptz           NOT NULL,
    "updatedAt" timestamptz           NOT NULL,
    CONSTRAINT "tag_label_key" UNIQUE ("label"),
    CONSTRAINT "tag_name_key" UNIQUE ("name"),
    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE INDEX "tag_label" ON "public"."tag" USING btree ("label");

CREATE INDEX "tag_name" ON "public"."tag" USING btree ("name");

DROP TABLE IF EXISTS "tag_question";
CREATE TABLE "public"."tag_question"
(
    "questionId" uuid                      NOT NULL,
    "tagId"      uuid                      NOT NULL,
    "createdAt"  timestamptz DEFAULT now() NOT NULL,
    "updatedAt"  timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT "tag_question_pkey" PRIMARY KEY ("questionId", "tagId"),
    CONSTRAINT "tag_question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES question (id) ON DELETE RESTRICT NOT DEFERRABLE,
    CONSTRAINT "tag_question_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES tag (id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

DROP TABLE IF EXISTS "user_review";
CREATE TABLE "public"."user_review"
(
    "id"           uuid                  NOT NULL,
    "reviewerId"   uuid,
    "customQuizId" uuid                  NOT NULL,
    "status"       character varying(50) NOT NULL,
    "comment"      text,
    "createdAt"    timestamptz           NOT NULL,
    "updatedAt"    timestamptz           NOT NULL,
    CONSTRAINT "user_review_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "user_review_customQuizId_fkey" FOREIGN KEY ("customQuizId") REFERENCES custom_quiz (id) ON DELETE RESTRICT NOT DEFERRABLE,
    CONSTRAINT "user_review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "user" (id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

CREATE INDEX "user_review_custom_quiz_id" ON "public"."user_review" USING btree ("customQuizId");

CREATE INDEX "user_review_reviewer_id" ON "public"."user_review" USING btree ("reviewerId");

CREATE INDEX "user_review_status" ON "public"."user_review" USING btree ("status");
