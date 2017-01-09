-- --------- task --------- --
CREATE TABLE task
(
	id bigserial NOT NULL,
	name character varying(128),
	done boolean not null default false,

	-- Timestamp data
	"cid" bigInt,
	"ctime" timestamp with time zone,
	"mid" bigInt,
	"mtime" timestamp with time zone,

	CONSTRAINT task_pkey PRIMARY KEY (id)
);
-- --------- /task --------- --

-- --------- user --------- --
CREATE TABLE "user"
(
	id bigserial NOT NULL,
	username character varying(128),
	pwd character varying(128),

	-- Timestamp data
	"cid" bigInt,
	"ctime" timestamp with time zone,
	"mid" bigInt,
	"mtime" timestamp with time zone,

	CONSTRAINT user_pkey PRIMARY KEY (id)
);
-- --------- /task --------- --