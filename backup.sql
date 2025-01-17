--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: main_activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.main_activities (
    activity_id integer NOT NULL,
    main_activity character varying(100),
    mi_1 integer,
    mi_2 integer,
    mi_3 integer,
    mi_percentage1 numeric(5,2),
    mi_percentage2 numeric(5,2),
    mi_percentage3 numeric(5,2)
);


ALTER TABLE public.main_activities OWNER TO postgres;

--
-- Name: activities_activity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activities_activity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.activities_activity_id_seq OWNER TO postgres;

--
-- Name: activities_activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activities_activity_id_seq OWNED BY public.main_activities.activity_id;


--
-- Name: alevel_local_subjects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alevel_local_subjects (
    subject_id integer NOT NULL,
    subject character varying(100) NOT NULL,
    mi_1 integer NOT NULL,
    mi_2 integer NOT NULL,
    mi_3 integer NOT NULL,
    stream character varying(50),
    mi_percentage1 numeric(5,2),
    mi_percentage2 numeric(5,2),
    mi_percentage3 numeric(5,2)
);


ALTER TABLE public.alevel_local_subjects OWNER TO postgres;

--
-- Name: alevel_local_subjects_subject_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alevel_local_subjects_subject_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.alevel_local_subjects_subject_id_seq OWNER TO postgres;

--
-- Name: alevel_local_subjects_subject_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alevel_local_subjects_subject_id_seq OWNED BY public.alevel_local_subjects.subject_id;


--
-- Name: career_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.career_table (
    career_id integer NOT NULL,
    career character varying(100),
    field character varying(100),
    s1 character varying(100),
    s2 character varying(100),
    s3 character varying(100),
    s4 character varying(100),
    mi_1 integer,
    mi_2 integer,
    mi_3 integer,
    mi_percentage1 numeric(5,2),
    mi_percentage2 numeric(5,2),
    mi_percentage3 numeric(5,2)
);


ALTER TABLE public.career_table OWNER TO postgres;

--
-- Name: career_table_career_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.career_table_career_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.career_table_career_id_seq OWNER TO postgres;

--
-- Name: career_table_career_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.career_table_career_id_seq OWNED BY public.career_table.career_id;


--
-- Name: mi_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mi_table (
    intelligence_id integer NOT NULL,
    intelligence_type character varying(100) NOT NULL
);


ALTER TABLE public.mi_table OWNER TO postgres;

--
-- Name: mi_table_intelligence_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mi_table_intelligence_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mi_table_intelligence_id_seq OWNER TO postgres;

--
-- Name: mi_table_intelligence_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mi_table_intelligence_id_seq OWNED BY public.mi_table.intelligence_id;


--
-- Name: olevel_local_subjects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.olevel_local_subjects (
    subject_id integer NOT NULL,
    subjects character varying(100) NOT NULL,
    mi_1 integer NOT NULL,
    mi_2 integer NOT NULL,
    mi_3 integer NOT NULL,
    category character varying(50),
    pathline character varying(20),
    mi_percentage1 numeric(5,2),
    mi_percentage2 numeric(5,2),
    mi_percentage3 numeric(5,2)
);


ALTER TABLE public.olevel_local_subjects OWNER TO postgres;

--
-- Name: ordinary_level_subjects_subject_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ordinary_level_subjects_subject_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ordinary_level_subjects_subject_id_seq OWNER TO postgres;

--
-- Name: ordinary_level_subjects_subject_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ordinary_level_subjects_subject_id_seq OWNED BY public.olevel_local_subjects.subject_id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    question_id integer NOT NULL,
    question text,
    intelligence_id integer
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: questions_question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_question_id_seq OWNER TO postgres;

--
-- Name: questions_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_question_id_seq OWNED BY public.questions.question_id;


--
-- Name: sub_activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sub_activities (
    sub_activity_id integer NOT NULL,
    sub_activity character varying(100),
    mi_1 integer,
    mi_2 integer,
    mi_3 integer,
    mi_percentage1 numeric(5,2),
    mi_percentage2 numeric(5,2),
    mi_percentage3 numeric(5,2),
    main_activity character varying(100)
);


ALTER TABLE public.sub_activities OWNER TO postgres;

--
-- Name: sub_activities_sub_activity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sub_activities_sub_activity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sub_activities_sub_activity_id_seq OWNER TO postgres;

--
-- Name: sub_activities_sub_activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sub_activities_sub_activity_id_seq OWNED BY public.sub_activities.sub_activity_id;


--
-- Name: alevel_local_subjects subject_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alevel_local_subjects ALTER COLUMN subject_id SET DEFAULT nextval('public.alevel_local_subjects_subject_id_seq'::regclass);


--
-- Name: career_table career_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.career_table ALTER COLUMN career_id SET DEFAULT nextval('public.career_table_career_id_seq'::regclass);


--
-- Name: main_activities activity_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.main_activities ALTER COLUMN activity_id SET DEFAULT nextval('public.activities_activity_id_seq'::regclass);


--
-- Name: mi_table intelligence_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mi_table ALTER COLUMN intelligence_id SET DEFAULT nextval('public.mi_table_intelligence_id_seq'::regclass);


--
-- Name: olevel_local_subjects subject_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.olevel_local_subjects ALTER COLUMN subject_id SET DEFAULT nextval('public.ordinary_level_subjects_subject_id_seq'::regclass);


--
-- Name: questions question_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN question_id SET DEFAULT nextval('public.questions_question_id_seq'::regclass);


--
-- Name: sub_activities sub_activity_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_activities ALTER COLUMN sub_activity_id SET DEFAULT nextval('public.sub_activities_sub_activity_id_seq'::regclass);


--
-- Data for Name: alevel_local_subjects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alevel_local_subjects (subject_id, subject, mi_1, mi_2, mi_3, stream, mi_percentage1, mi_percentage2, mi_percentage3) FROM stdin;
1	Arabic	2	1	7	Arts	80.00	75.00	65.00
2	Art	3	5	7	Arts	88.00	80.00	75.00
4	Buddhism	2	1	9	Arts	80.00	75.00	70.00
3	Bharatha Natayam	7	2	3	Arts	80.00	75.00	70.00
5	Buddhist Civilization	2	1	9	Arts	80.00	75.00	70.00
6	Chinese	2	1	7	Arts	80.00	75.00	65.00
7	Christian Civilization	2	1	9	Arts	80.00	75.00	70.00
44	Agro Technology	1	2	3	Technology	85.00	80.00	75.00
9	Christianity	2	1	9	Arts	80.00	75.00	70.00
10	Communication and Media Studies	6	2	1	Arts	80.00	75.00	70.00
11	Dance	5	3	2	Arts	85.00	80.00	65.00
45	Engineering Technology	1	2	3	Technology	85.00	80.00	75.00
46	General Information Technology	1	2	3	Technology	85.00	80.00	75.00
47	Combine Mathematics	1	2	3	Physical Science	85.00	80.00	75.00
48	Higher Mathematics	1	2	3	Physical Science	85.00	80.00	75.00
8	Information & Communication Technology	1	2	3	Arts	80.00	75.00	70.00
12	English	2	1	7	Arts	80.00	75.00	65.00
13	French	2	1	7	Arts	80.00	75.00	65.00
14	Geography	2	1	8	Arts	70.00	68.00	65.00
15	German	2	1	7	Arts	80.00	75.00	65.00
16	Greek and Roman Civilization	2	1	8	Arts	75.00	68.00	65.00
17	Hindi Language	2	1	7	Arts	80.00	75.00	65.00
18	Hindu Civilization	2	1	9	Arts	80.00	75.00	70.00
19	Hinduism	2	1	9	Arts	80.00	75.00	70.00
20	History	2	1	8	Arts	75.00	68.00	65.00
21	Home Economics	3	2	6	Arts	75.00	70.00	68.00
22	Islam	2	1	9	Arts	80.00	75.00	70.00
23	Islamic Civilization	2	1	9	Arts	80.00	75.00	70.00
24	Japan Language	2	1	7	Arts	80.00	75.00	65.00
25	Logic and Scientific Method	1	2	3	Arts	85.00	80.00	75.00
26	Oriental Music	4	2	1	Arts	85.00	75.00	74.00
27	Pali Language	2	1	7	Arts	80.00	75.00	65.00
28	Political Science	2	1	6	Arts	85.00	80.00	75.00
29	Russian	2	1	7	Arts	80.00	75.00	65.00
30	Sanskrit	2	1	7	Arts	80.00	75.00	65.00
31	Sinhala	2	1	7	Arts	80.00	75.00	65.00
32	Tamil	2	1	7	Arts	80.00	75.00	65.00
33	Western Music	4	2	1	Arts	85.00	75.00	74.00
34	Accounting	1	2	3	Commerce	85.00	80.00	75.00
35	Business Studies	2	1	3	Commerce	80.00	75.00	70.00
36	Statistics	1	2	3	Commerce	85.00	80.00	75.00
37	Economics	1	2	7	Commerce	85.00	80.00	75.00
38	Agriculture	1	2	3	BIO Science	85.00	80.00	75.00
39	Bio System Technology	1	2	3	BIO Science	85.00	80.00	75.00
40	Biology	1	2	3	BIO Science	85.00	80.00	75.00
41	Chemistry	1	2	3	BIO Science	85.00	80.00	75.00
42	Physics	1	2	3	BIO Science	85.00	80.00	75.00
43	Science for Technology	1	2	3	BIO Science	85.00	80.00	75.00
\.


--
-- Data for Name: career_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.career_table (career_id, career, field, s1, s2, s3, s4, mi_1, mi_2, mi_3, mi_percentage1, mi_percentage2, mi_percentage3) FROM stdin;
28	Physicists and Astronomers	Science	Physics	Astronomy	Science	3D	1	8	2	80.00	75.00	70.00
7	Policy and Planning Managers	Business and Management	Management	Engineering	Project	Business	1	2	6	70.00	60.00	55.00
17	Information and Communications Technology Services Managers	IT/Computing	Computer Science	Telecommunications	Software	\N	2	1	6	70.00	65.00	55.00
30	Chemists	Science	Science	Chemistry	\N	\N	1	2	8	75.00	65.00	55.00
48	Town and Traffic Planners	Social science	Sociology	Town Planning	Geopgraphy	\N	3	1	2	75.00	65.00	60.00
9	Advertising and Public Relations Managers	Business and Management	Marketing	Psychology	Management	Advertising	6	3	2	70.00	70.00	60.00
10	Research and Development Managers	Mathematics and Analytics	Statistics	Science	Social	Data Science	1	2	6	85.00	80.00	75.00
11	Agricultural and Forestry Production Managers	Agriculture	Agriculture	Science	\N	\N	8	1	2	68.00	65.00	55.00
21	Social Welfare Managers	Social science	Sociology	Psychology	Social	3D	6	1	2	65.00	60.00	50.00
27	Sports, Recreation and Culture Center Managers	Business and Management	Management	Business	Sports science	\N	1	5	2	65.00	65.00	50.00
52	Specialist Medical Practitioners	Medical	Medicine	\N	\N	\N	6	1	2	85.00	80.00	75.00
36	Industrial and Production Engineers	Engineering	Production Engineering	Mechanical Engineering	Engineering	\N	1	3	2	80.00	75.00	65.00
65	University and Higher Education Teachers	Education	Science	Social	\N	\N	2	1	6	80.00	80.00	80.00
40	Chemical Engineers	Engineering	Chemistry	Chemical Engineering	\N	\N	1	2	3	80.00	75.00	60.00
14	Mining Managers	Engineering	Production Engineering	Science	Geology	\N	1	2	6	80.00	75.00	65.00
4	Managing Directors and Chief Executives	Business and Management	Engineering	Management	Technology	Process	1	6	2	85.00	80.00	70.00
16	Supply, Distribution and Related Managers	Engineering	Supply Chain	Production Engineering	Process	Management	2	1	6	80.00	65.00	60.00
3	Senior Officials of Special-interest Organizations	Administration	International Relations	Political	Economics	Law	6	1	2	80.00	75.00	70.00
35	Environmental Protection Professionals	Science	Science	Environmental Engineering	\N	\N	8	1	2	80.00	75.00	65.00
37	Civil Engineers	Engineering	Civil Engineering	\N	\N	\N	1	3	2	80.00	75.00	65.00
66	Vocational Education Teachers	Education	Science	Social	\N	\N	2	1	6	70.00	70.00	70.00
32	Mathematicians, Actuaries and Statisticians	Science	Mathematics	Statistics	Engineering	Data Science	1	2	7	85.00	75.00	60.00
53	Nursing Professionals	Allied Science	Nursing	\N	\N	\N	6	1	2	75.00	65.00	60.00
29	Meteorologists	Science	Physics	Mathematics	Science	\N	1	2	8	75.00	65.00	60.00
5	Finance Managers	Finance	Finance	Management	Accounting	Banking	1	2	6	80.00	65.00	60.00
12	Aquaculture and Fisheries Production Managers	Agriculture	Agriculture	Science	\N	\N	1	8	2	65.00	60.00	55.00
18	Child Care Services Managers	Social science	Psychology	Management	Education	\N	6	1	2	65.00	60.00	55.00
33	Biologists, Botanists, Zoologists and Related Professionals	Science	Science	Biology	Zoology	\N	1	2	8	75.00	70.00	70.00
38	Environmental Engineers	Engineering	Environmental Engineering	\N	\N	\N	8	1	2	80.00	80.00	65.00
45	Building Architects	Construction	Architecture	Civil Engineering	\N	\N	3	2	1	80.00	70.00	60.00
47	Product and Garment Designers	Creative Design	Arts	Design	3D	Fashion	3	2	1	75.00	55.00	50.00
57	Veterinarians	Medical	Veterinary medicine	\N	\N	\N	1	2	8	75.00	70.00	60.00
54	Midwifery Professionals	Allied Science	Nursing	\N	\N	\N	6	1	2	75.00	60.00	55.00
49	Cartographers and Surveyors	Construction	Civil Engineering	Quantity-Surveying	Surveying	\N	1	3	2	75.00	70.00	60.00
20	Aged Care Services Managers	Social science	Psychology	Sociology	Science	\N	6	1	2	65.00	60.00	55.00
34	Farming, Forestry and Fisheries Advisers	Agriculture	Agriculture	Science	Biology	\N	1	2	8	65.00	60.00	55.00
63	Audiologists and Speech Therapists	Science	Science	Medicine	\N	\N	2	6	1	75.00	70.00	65.00
55	Traditional and Complementary Medicine Professionals	Indigenous Medicine	Indigenous Medicine	\N	\N	\N	6	1	2	75.00	70.00	65.00
41	Mining Engineers, Metallurgists and Related Professionals	Engineering	Geology	Mining Engineering	\N	\N	1	2	3	80.00	75.00	65.00
64	Optometrists and Ophthalmic Opticians	Science	Medicine	Science	\N	\N	1	2	3	75.00	70.00	65.00
61	Physiotherapists	Para Medicine	Physiotherapy	Medicine	\N	\N	1	5	2	75.00	65.00	60.00
31	Geologists and Geophysicists	Science	Science	Geology	Physics	\N	1	2	8	75.00	65.00	60.00
46	Landscape Architects	Construction	Architecture	Civil Engineering	\N	\N	3	8	2	75.00	65.00	60.00
2	Senior Government Officials	Business and Management	Administration	Political	Management	Economics	1	2	6	80.00	75.00	75.00
51	Generalist Medical Practitioners	Medical	Medicine	\N	\N	\N	6	1	2	80.00	75.00	75.00
58	Dentists	Medical	Dental Science	\N	\N	\N	6	1	2	80.00	75.00	70.00
50	Graphic and Multimedia Designers	Creative Design	Multimedia	3D	Design	Arts	3	2	1	80.00	65.00	60.00
59	Pharmacists	Para Medicine	Pharmacy	Medicine	\N	\N	1	2	6	65.00	65.00	60.00
76	Accountants	Finance	Finance	Accounting	Administration	\N	1	2	6	70.00	60.00	55.00
81	Personnel and Careers Professionals	Business and Management	HR	Psychology	Management	\N	6	2	1	\N	\N	\N
98	Librarians and Related Information Professionals	Social science	Library Science	Linguistic	Social	\N	2	1	3	70.00	60.00	55.00
111	Film, Stage and Related Directors and Producers	Visual and Performing Arts	Film and Television	Film	Drama	\N	3	5	2	75.00	75.00	70.00
96	Judges	Law	Law	\N	\N	\N	1	7	2	80.00	80.00	75.00
67	Secondary Education Teachers	Education	Science	Social	\N	\N	6	2	1	70.00	70.00	65.00
85	Technical and Medical Sales Professionals (excluding ICT)	Business and Management	Marketing	Management	\N	\N	6	2	1	75.00	65.00	60.00
23	Financial and Insurance Services Branch Managers	Finance	Finance	Management	Accounting	\N	1	2	6	60.00	55.00	55.00
24	Hotel Managers	Hospitality	Hospitality	Travel & Tourism	Management	\N	6	1	2	70.00	65.00	65.00
107	Translators, Interpreters and Other Linguists	Social science	Language	Linguistic	\N	\N	2	6	1	70.00	65.00	65.00
100	Sociologists, Anthropologists and Related Professionals	Social science	Sociology	Anthropology	Psychology	\N	6	2	1	75.00	65.00	60.00
15	Construction Managers	Construction	Civil	Production Engineering	Supply Chain	\N	1	2	6	80.00	70.00	65.00
73	Other Music Teachers	Education	Music	Education	\N	\N	4	6	2	80.00	70.00	65.00
105	Authors and Related Writers	Social science	Linguistic	Language	Drama	\N	2	7	6	80.00	70.00	65.00
108	Visual Artists	Visual and Performing Arts	Arts	Design	Sculpture	\N	3	7	6	75.00	65.00	60.00
110	Dancers and Choreographers	Visual and Performing Arts	Dancing	Drama	\N	\N	5	2	4	75.00	65.00	60.00
106	Journalists	Social science	Media	Language	Linguistic	\N	2	6	7	70.00	65.00	65.00
19	Health Services Managers	Science	Medicine	Science	Biomedical Engineering	Biomedical	1	2	6	65.00	60.00	55.00
72	Other Language Teachers	Education	Education	Linguistic	Language	\N	2	6	1	80.00	70.00	60.00
113	Announcers on Radio, Television and Other Media	Visual and Performing Arts	Media	Film and Television	\N	\N	2	6	7	75.00	65.00	60.00
112	Actors	Visual and Performing Arts	Drama	Film	Dancing	\N	5	2	6	75.00	65.00	60.00
99	Economists	Social science	Economics	\N	\N	\N	1	2	6	70.00	65.00	55.00
68	Primary School Teachers	Education	Social	Education	Psychology	\N	6	2	1	75.00	70.00	65.00
74	Other Arts Teachers	Education	Dancing	Drama	Arts	\N	3	5	6	75.00	75.00	75.00
120	Mining and Metallurgical Technicians	Science	Mining Engineering	Geology	\N	\N	1	2	8	65.00	60.00	55.00
75	Information Technology Trainers	Education	IT	Computer Science	\N	\N	1	6	2	75.00	75.00	65.00
25	Restaurant Managers	Hospitality	Hospitality	Travel & Tourism	Management	\N	6	2	1	65.00	60.00	50.00
22	Education Managers	Education	Education	Psychology	Science	Social	6	1	2	60.00	60.00	55.00
97	Archivists and Curators	Social science	Linguistic	Library Science	Data Science	\N	2	1	3	65.00	60.00	55.00
101	Philosophers, Historians and Political Scientists	Social science	Philosophy	Political Science	History	\N	7	6	2	80.00	70.00	70.00
1	Legislators	Political	Law	Management	Political	International Relations	6	2	1	80.00	75.00	75.00
102	Psychologists	Social science	Psychology	\N	\N	\N	6	7	2	80.00	70.00	70.00
71	Special Needs Teachers	Education	Social	Education	Psychology	\N	6	2	1	80.00	75.00	70.00
13	Manufacturing Managers	Engineering	Production Engineering	Engineering	Process	Management	1	2	6	80.00	75.00	70.00
95	Lawyers	Law	Law	\N	\N	\N	1	6	2	80.00	75.00	70.00
6	Human Resource Managers	Business and Management	Human Resource	Business	Management	Psychology	6	2	1	70.00	65.00	60.00
8	Sales and Marketing Managers	Business and Management	Marketing	Management	Business	Psychology	6	2	1	70.00	65.00	60.00
82	Training and Staff Development Professionals	Business and Management	HR	Psychology	Management	\N	6	2	1	70.00	65.00	60.00
89	Web and Multimedia Developers	IT / Computing	Software	Multimedia	Web	\N	1	3	2	70.00	65.00	60.00
79	Management and Organization Analysts	Business and Management	Business Information Systems	Business Data Analytics	Data Science	\N	1	2	3	70.00	65.00	60.00
69	Early Childhood Educators	Education	Social	Education	Psychology	\N	6	2	1	75.00	70.00	65.00
70	Education Methods Specialists	Education	Social	Education	Psychology	\N	1	2	6	75.00	70.00	65.00
83	Advertising and Marketing Professionals	Business and Management	Marketing	Advertising	Management	\N	6	2	3	75.00	70.00	65.00
84	Public Relations Professionals	Business and Management	Events	Marketing	Media	\N	6	2	3	75.00	70.00	65.00
109	Musicians, Singers, and Composers	Visual and Performing Arts	Music	Composing	Digital Composing	\N	4	2	6	75.00	70.00	65.00
119	Chemical Engineering Technicians	Science	Chemistry	\N	\N	\N	1	2	3	65.00	65.00	55.00
80	Policy Administration Professionals	Administration	Economics	Political Science	Process	\N	1	2	3	70.00	65.00	60.00
103	Social Work and Counselling Professionals	Social science	Psychology	Sociology	Social Work	\N	6	1	7	70.00	65.00	60.00
60	Environmental and Occupational Health and Hygiene Professionals	Allied Science	Nursing	Biomedical	\N	\N	6	1	2	70.00	65.00	60.00
77	Financial and Investment Advisers	Finance	Fashion	Accounting	Administration	\N	1	6	2	70.00	65.00	60.00
90	Applications Programmers	IT / Computing	Software	Artificial Intelligence	Computer Science	\N	1	2	3	70.00	65.00	65.00
26	Retail and Wholesale Trade Managers	Business and Management	Management	Marketing	Finance	Business	6	1	2	60.00	55.00	50.00
42	Electrical Engineers	Engineering	Electronic and Electrical Engineering	\N	\N	\N	1	2	3	80.00	75.00	65.00
43	Electronics Engineers	Engineering	Electronic and Electrical Engineering	Electronics and Communication Engineering	\N	\N	1	2	3	80.00	75.00	65.00
44	Telecommunications Engineers	Engineering	Electronics and Communication Engineering	Telecommunication Engineering	Computer Engineering	\N	1	2	3	80.00	75.00	65.00
39	Mechanical Engineers	Engineering	Mechanical Engineering	Mechatronics	\N	\N	1	3	2	80.00	75.00	65.00
56	Paramedical Practitioners	Medical	Indigenous Medicine	Medicine	Biomedical	\N	6	1	2	75.00	70.00	65.00
92	Database Designers and Administrators	IT / Computing	Computer Science	Networking	\N	\N	1	2	3	75.00	65.00	60.00
93	Systems Administrators	IT / Computing	Computer Science	Networking	\N	\N	1	2	3	75.00	65.00	60.00
94	Computer Network Professionals	IT / Computing	Computer Science	Networking	\N	\N	1	2	3	75.00	65.00	60.00
62	Dieticians and Nutritionists	Medical	Medicine	\N	\N	\N	6	1	2	75.00	75.00	70.00
86	Information and Communications Technology Sales Professionals	Business and Management	Marketing	IT	Management	\N	6	1	2	75.00	65.00	65.00
87	Systems Analysts	IT / Computing	IT	Business Information Systems	Software	\N	1	2	3	75.00	65.00	50.00
88	Software Developers	IT / Computing	Software	Computer Science	Artificial Intelligence	\N	1	2	3	80.00	70.00	55.00
114	Chemical and Physical Science Technicians	Science	Chemistry	Physics	\N	\N	1	2	3	65.00	60.00	55.00
115	Civil Engineering Technicians	Construction	Construction	Quantity-Surveying	\N	\N	1	2	3	65.00	60.00	55.00
116	Electrical Engineering Technicians	Science	Electrical	\N	\N	\N	1	2	3	65.00	60.00	55.00
117	Electronics Engineering Technicians	Science	Electronics	Mechatronics	\N	\N	1	2	3	65.00	60.00	55.00
118	Mechanical Engineering Technicians	Science	Mechanical	Mechatronics	\N	\N	1	2	3	65.00	60.00	55.00
121	Draughtspersons	Science	Civil Engineering	Quantity-Surveying	\N	\N	1	2	3	65.00	60.00	55.00
\.


--
-- Data for Name: main_activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.main_activities (activity_id, main_activity, mi_1, mi_2, mi_3, mi_percentage1, mi_percentage2, mi_percentage3) FROM stdin;
1	Sports	\N	\N	\N	\N	\N	\N
5	Drama	\N	\N	\N	\N	\N	\N
7	Arts	\N	\N	\N	\N	\N	\N
2	Cadetting	5	6	3	95.00	90.00	80.00
3	Music	4	1	2	95.00	90.00	80.00
6	Debating	2	1	7	95.00	90.00	80.00
8	Scouting	6	2	7	95.00	90.00	80.00
4	Dancing	5	3	1	95.00	90.00	80.00
\.


--
-- Data for Name: mi_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mi_table (intelligence_id, intelligence_type) FROM stdin;
1	Logical-Mathematical Intelligence
2	Linguistic Intelligence
4	Musical Intelligence
5	Bodily-Kinesthetic Intelligence
6	Interpersonal Intelligence
7	Intrapersonal Intelligence
8	Naturalistic Intelligence
3	Spatial Intelligence
9	Existential Intelligence
\.


--
-- Data for Name: olevel_local_subjects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.olevel_local_subjects (subject_id, subjects, mi_1, mi_2, mi_3, category, pathline, mi_percentage1, mi_percentage2, mi_percentage3) FROM stdin;
31	Arts	3	5	8	\N	Basket	88.00	80.00	75.00
33	Dancing(Bharata)	5	3	2	\N	Basket	85.00	80.00	65.00
32	Dancing(Oriental)	5	3	2	\N	Basket	85.00	80.00	65.00
34	Appreciation of English Literary Texts	2	1	7	\N	Basket	80.00	70.00	68.00
35	Appreciation of Sinhala Literary Texts	2	1	7	\N	Basket	80.00	70.00	68.00
36	Appreciation of Tamil Literary Texts	2	1	7	\N	Basket	80.00	70.00	68.00
37	Appreciation of Arabic Literary Texts	2	1	7	\N	Basket	80.00	70.00	68.00
38	Drama and Theatre(Sinhala)	7	2	3	\N	Basket	80.00	75.00	70.00
39	Drama and Theatre(Tamil)	7	2	3	\N	Basket	80.00	75.00	70.00
40	Drama and Theatre(English)	7	2	3	\N	Basket	80.00	75.00	70.00
41	Information & Communication Technology	1	2	3	\N	Basket	80.00	75.00	70.00
42	Agriculture & Food Technology	1	2	3	\N	Basket	75.00	70.00	68.00
43	Aquatic Bioresources Technology	1	2	3	\N	Basket	75.00	70.00	68.00
44	Art & Crafts	3	5	8	\N	Basket	80.00	75.00	70.00
47	Communication & Media Studies	6	2	1	\N	Basket	80.00	75.00	70.00
1	Buddhism	2	1	9	Religion	Core	80.00	75.00	70.00
45	Home Economics	3	2	6	\N	Basket	75.00	70.00	68.00
46	Health & Physical Education	2	1	3	\N	Basket	75.00	75.00	68.00
48	Design & Construction Technology	1	2	3	\N	Basket	85.00	80.00	75.00
2	Saivanery	2	1	9	Religion	Core	80.00	75.00	70.00
3	Catholicism	2	1	9	Religion	Core	80.00	75.00	70.00
4	Christianity	2	1	9	Religion	Core	80.00	75.00	70.00
5	Islam	2	1	9	Religion	Core	80.00	75.00	70.00
6	Sinhala	2	1	3	Language	Core	80.00	70.00	65.00
7	Tamil	2	1	3	Language	Core	80.00	70.00	65.00
8	English	2	1	3	Language	Core	75.00	68.00	65.00
10	History	2	1	8	Academic	Core	75.00	68.00	65.00
12	Business & Accounting	1	2	3	\N	Basket	75.00	68.00	65.00
16	Second Language(Sinhala)	2	1	7	\N	Basket	75.00	68.00	65.00
17	Second Language(Tamil)	2	1	8	\N	Basket	75.00	68.00	65.00
9	Mathematics	1	3	2	Academic	Core	85.00	75.00	70.00
11	Science	1	2	3	Academic	Core	85.00	80.00	70.00
13	Geography	2	1	8	\N	Basket	70.00	68.00	65.00
14	Civic Education	2	6	1	\N	Basket	70.00	68.00	65.00
15	Entrepreneurship Studies	7	2	3	\N	Basket	85.00	75.00	68.00
18	Sanskrit	2	1	7	\N	Basket	85.00	70.00	68.00
19	French	2	1	7	\N	Basket	85.00	70.00	68.00
20	German	2	1	7	\N	Basket	85.00	70.00	68.00
21	Hindi	2	1	7	\N	Basket	85.00	70.00	68.00
22	Japanese	2	1	7	\N	Basket	85.00	70.00	68.00
23	Arabic	2	1	7	\N	Basket	85.00	70.00	68.00
24	Korean	2	1	7	\N	Basket	85.00	70.00	68.00
25	Chinese	2	1	7	\N	Basket	85.00	70.00	68.00
26	Russian	2	1	7	\N	Basket	85.00	70.00	68.00
27	Pali	2	1	7	\N	Basket	85.00	70.00	68.00
28	Music(Oriental)	4	2	1	\N	Basket	85.00	75.00	74.00
29	Music(Western)	4	2	1	\N	Basket	85.00	75.00	74.00
30	Music(Carnatic)	4	2	1	\N	Basket	85.00	75.00	74.00
51	Electronic Writing & Shorthand(Sinhala)	2	3	5	\N	Basket	80.00	75.00	70.00
52	Electronic Writing & Shorthand (Tamil)	2	3	5	\N	Basket	80.00	75.00	70.00
53	Electronic Writing & Shorthand (English)	2	3	5	\N	Basket	80.00	75.00	70.00
49	Design & Mechanical Technology	1	2	3	\N	Basket	85.00	80.00	75.00
50	Design, Electrical & Electronic Technology	1	2	3	\N	Basket	85.00	80.00	75.00
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (question_id, question, intelligence_id) FROM stdin;
1	Writing is a natural way for me to express myself	2
2	At school studies in native language or social studies were easier for me than mathematics, physics and chemistry	2
3	I have recently written something that I am especially proud of, or for which I have received recognition	2
4	Metaphors and vivid verbal expressions help me learn efficiently	2
5	At school I was good at mathematics, physics or chemistry.	1
6	I can work with and solve complex problems.	1
7	Mental arithmetic is easy for me.	1
8	I am good at games and problem solving, which require logical thinking.	1
9	At school, geometry and various kinds of assignments involving spatial perception were easier for me than solving equations.	3
10	It is easy for me to conceptualize complex and multidimensional patterns.	3
11	I can easily imagine how a landscape looks from a bird’s-eye view.	3
12	When I read, I form illustrative pictures or designs in my mind.	3
17	When listening to music, I am able to discern instruments or recognize melodies.	4
18	I can easily keep the rhythm when drumming a melody.	4
19	I notice immediately if a melody is out of tune.	4
20	After hearing a tune once or twice I am able to sing or whistle it quite accurately.	4
21	Even in strange company, I easily find someone to talk to.	6
22	I get along easily with different types of people.	6
23	I make contact easily with other people.	6
24	In negotiations and group work, I am able to support the group to find a consensus.	6
25	I am able to analyze my own motives and ways of action.	7
26	I often think about my own feelings and sentiments and seek reasons for them.	7
27	I spend time regularly reflecting on the important issues in life.	7
28	I like to read psychological or philosophical literature to increase my self-knowledge.	7
13	I am handy.	5
14	I can easily do something concrete with my hands (e.g. knitting and woodwork).	5
15	I am good at showing how to do something in practice.	5
16	I was good at handicrafts at school.	5
29	In midst of busy everyday life I find it important to contemplate.	9
30	Even ordinary every-day life is full of miraculous things.	9
31	I often reflect on the meaning of life.	9
32	It is important to me to share a quiet moment with others.	9
33	I enjoy the beauty and experiences related to nature.	8
34	Protecting nature is important to me.	8
35	I pay attention to my consumption habits in order to protect the environment.	8
\.


--
-- Data for Name: sub_activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sub_activities (sub_activity_id, sub_activity, mi_1, mi_2, mi_3, mi_percentage1, mi_percentage2, mi_percentage3, main_activity) FROM stdin;
1	Cricket	5	3	1	95.00	90.00	80.00	Sports
2	Football	5	3	1	95.00	90.00	80.00	Sports
3	Rugby	5	3	1	95.00	90.00	80.00	Sports
4	Hockey	5	3	1	95.00	90.00	80.00	Sports
5	Volleyball	5	3	1	95.00	90.00	80.00	Sports
6	Table Tennis	5	3	1	95.00	90.00	80.00	Sports
7	Tennis	5	3	1	95.00	90.00	80.00	Sports
8	Chess	1	3	7	95.00	90.00	80.00	Sports
9	Carrom	1	3	5	95.00	90.00	80.00	Sports
10	Riffel Shooting	3	5	1	95.00	90.00	80.00	Sports
11	Archery	3	5	1	95.00	90.00	80.00	Sports
12	Script Writing	2	7	3	95.00	90.00	80.00	Drama
13	Acting	5	2	3	95.00	90.00	80.00	Drama
14	Directing	6	2	5	95.00	90.00	80.00	Drama
15	Drawing	3	5	7	95.00	90.00	80.00	Arts
16	Sculpture	3	5	1	95.00	90.00	80.00	Arts
\.


--
-- Name: activities_activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activities_activity_id_seq', 8, true);


--
-- Name: alevel_local_subjects_subject_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alevel_local_subjects_subject_id_seq', 58, true);


--
-- Name: career_table_career_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.career_table_career_id_seq', 121, true);


--
-- Name: mi_table_intelligence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mi_table_intelligence_id_seq', 9, true);


--
-- Name: ordinary_level_subjects_subject_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ordinary_level_subjects_subject_id_seq', 53, true);


--
-- Name: questions_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_question_id_seq', 35, true);


--
-- Name: sub_activities_sub_activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sub_activities_sub_activity_id_seq', 16, true);


--
-- Name: main_activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.main_activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (activity_id);


--
-- Name: alevel_local_subjects alevel_local_subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alevel_local_subjects
    ADD CONSTRAINT alevel_local_subjects_pkey PRIMARY KEY (subject_id);


--
-- Name: career_table career_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.career_table
    ADD CONSTRAINT career_table_pkey PRIMARY KEY (career_id);


--
-- Name: mi_table mi_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mi_table
    ADD CONSTRAINT mi_table_pkey PRIMARY KEY (intelligence_id);


--
-- Name: olevel_local_subjects ordinary_level_subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.olevel_local_subjects
    ADD CONSTRAINT ordinary_level_subjects_pkey PRIMARY KEY (subject_id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);


--
-- Name: sub_activities sub_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_activities
    ADD CONSTRAINT sub_activities_pkey PRIMARY KEY (sub_activity_id);


--
-- Name: main_activities activities_mi_1_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.main_activities
    ADD CONSTRAINT activities_mi_1_fkey FOREIGN KEY (mi_1) REFERENCES public.mi_table(intelligence_id);


--
-- Name: main_activities activities_mi_2_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.main_activities
    ADD CONSTRAINT activities_mi_2_fkey FOREIGN KEY (mi_2) REFERENCES public.mi_table(intelligence_id);


--
-- Name: main_activities activities_mi_3_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.main_activities
    ADD CONSTRAINT activities_mi_3_fkey FOREIGN KEY (mi_3) REFERENCES public.mi_table(intelligence_id);


--
-- Name: alevel_local_subjects alevel_local_subjects_mi_1_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alevel_local_subjects
    ADD CONSTRAINT alevel_local_subjects_mi_1_fkey FOREIGN KEY (mi_1) REFERENCES public.mi_table(intelligence_id);


--
-- Name: alevel_local_subjects alevel_local_subjects_mi_2_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alevel_local_subjects
    ADD CONSTRAINT alevel_local_subjects_mi_2_fkey FOREIGN KEY (mi_2) REFERENCES public.mi_table(intelligence_id);


--
-- Name: alevel_local_subjects alevel_local_subjects_mi_3_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alevel_local_subjects
    ADD CONSTRAINT alevel_local_subjects_mi_3_fkey FOREIGN KEY (mi_3) REFERENCES public.mi_table(intelligence_id);


--
-- Name: career_table career_table_mi_1_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.career_table
    ADD CONSTRAINT career_table_mi_1_fkey FOREIGN KEY (mi_1) REFERENCES public.mi_table(intelligence_id);


--
-- Name: career_table career_table_mi_2_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.career_table
    ADD CONSTRAINT career_table_mi_2_fkey FOREIGN KEY (mi_2) REFERENCES public.mi_table(intelligence_id);


--
-- Name: career_table career_table_mi_3_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.career_table
    ADD CONSTRAINT career_table_mi_3_fkey FOREIGN KEY (mi_3) REFERENCES public.mi_table(intelligence_id);


--
-- Name: questions fk_intelligence_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT fk_intelligence_id FOREIGN KEY (intelligence_id) REFERENCES public.mi_table(intelligence_id);


--
-- Name: olevel_local_subjects fk_mi_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.olevel_local_subjects
    ADD CONSTRAINT fk_mi_1 FOREIGN KEY (mi_1) REFERENCES public.mi_table(intelligence_id);


--
-- Name: olevel_local_subjects fk_mi_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.olevel_local_subjects
    ADD CONSTRAINT fk_mi_2 FOREIGN KEY (mi_2) REFERENCES public.mi_table(intelligence_id);


--
-- Name: olevel_local_subjects fk_mi_3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.olevel_local_subjects
    ADD CONSTRAINT fk_mi_3 FOREIGN KEY (mi_3) REFERENCES public.mi_table(intelligence_id);


--
-- Name: sub_activities sub_activities_mi_1_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_activities
    ADD CONSTRAINT sub_activities_mi_1_fkey FOREIGN KEY (mi_1) REFERENCES public.mi_table(intelligence_id);


--
-- Name: sub_activities sub_activities_mi_2_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_activities
    ADD CONSTRAINT sub_activities_mi_2_fkey FOREIGN KEY (mi_2) REFERENCES public.mi_table(intelligence_id);


--
-- Name: sub_activities sub_activities_mi_3_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_activities
    ADD CONSTRAINT sub_activities_mi_3_fkey FOREIGN KEY (mi_3) REFERENCES public.mi_table(intelligence_id);


--
-- PostgreSQL database dump complete
--

