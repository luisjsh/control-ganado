CREATE DATABASE takos;

CREATE TABLE IF NOT EXISTS usuarios(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    email text NOT NULL UNIQUE,
    nombre text,
    primerapregunta text,
    primerapreguntarespuesta text,
    segundapregunta text,
    segundapreguntarespuesta text,
    admin boolean,
    clave text
);  

CREATE TABLE IF NOT EXISTS usuariosimagenes(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    path text,
    usuarioid integer REFERENCES usuarios(id) 
);

CREATE TABLE IF NOT EXISTS pelajes(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre text
);

CREATE TABLE IF NOT EXISTS logros(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre text
);

CREATE TABLE IF NOT EXISTS hierros(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    path text,
    codigo text
);

CREATE TABLE IF NOT EXISTS toros(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre text,
    hierro text,
    hierrocodigo text,
    pelaje integer REFERENCES pelajes(id),
    sexo text,
    fechanac text,
    fechamuerte text,
    encaste text,
    madreid integer,
    padreid integer,
    ganaderia text,
    tientaDia text,
    tientaResultado text,
    tientaTentadoPor text,
    tientaLugar text,
    tientaCapa text,
    tientaCaballo text,
    tientaMuleta text
);

CREATE TABLE IF NOT EXISTS torosimagenes(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    path text,
    torosid integer REFERENCES toros(id) 
);

INSERT INTO pelajes ( nombre ) Values ( 'liston');
INSERT INTO pelajes ( nombre ) Values ( 'chorreado');
INSERT INTO pelajes ( nombre ) Values ( 'jiron');
INSERT INTO pelajes ( nombre ) Values ( 'salpicado');
INSERT INTO pelajes ( nombre ) Values ( 'albardado');
INSERT INTO pelajes ( nombre ) Values ( 'bragado');
INSERT INTO pelajes ( nombre ) Values ( 'lucero');
INSERT INTO pelajes ( nombre ) Values ( 'bociblanco');
INSERT INTO pelajes ( nombre ) Values ( 'ojo de perdiz');
INSERT INTO pelajes ( nombre ) Values ( 'entrepelao');
INSERT INTO pelajes ( nombre ) Values ( 'negro');
INSERT INTO pelajes ( nombre ) Values ( 'colorado');
INSERT INTO pelajes ( nombre ) Values ( 'jabonero');
INSERT INTO pelajes ( nombre ) Values ( 'ensabanao');
INSERT INTO pelajes ( nombre ) Values ( 'albahio');
INSERT INTO pelajes ( nombre ) Values ( 'burraco');
INSERT INTO pelajes ( nombre ) Values ( 'cardeno');
INSERT INTO pelajes ( nombre ) Values ( 'berrendo');
INSERT INTO pelajes ( nombre ) Values ( 'berrendo en negro');
INSERT INTO pelajes ( nombre ) Values ( 'berrendo en cardeno');
INSERT INTO pelajes ( nombre ) Values ( 'sardo');
INSERT INTO pelajes ( nombre ) Values ( 'salinero');
INSERT INTO pelajes ( nombre ) Values ( 'melocoton');
INSERT INTO pelajes ( nombre ) Values ( 'castano');
INSERT INTO pelajes ( nombre ) Values ( 'bocidorado');


INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/hierroe.svg', 'hierro e');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/hierrohv.svg', 'hierro hv');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/hierrolp.svg', 'hierro lp');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/hierrojp.svg', 'hierro jp');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/hierror6.svg', 'hierro r6');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/hierrotp.svg', 'hierro tp');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/hierro4h.svg', 'hierro 4h');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/hierrove.svg', 'hierro ve');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/hierrolampara.svg', 'hierro lampara');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/hierrocruz.svg', 'hierro cruz');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/hierrom.svg', 'hierro m');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/carlosNunez.svg', 'carlos nunez');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/condeDeLaCorte.svg', 'conde de la corte');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/domecq.svg', 'domecq');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/garciaJimenez.svg', 'garcia jimenez');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/jandilla.svg', 'jandilla');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/murube.svg', 'murube');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/torreestreñña.svg', 'torreestrella');
INSERT INTO hierros ( path, codigo ) Values ('/img/hierros/victorianoDelRio.svg', 'victoriano del rio');

INSERT INTO usuarios (email, nombre, primerapregunta, primerapreguntarespuesta, segundapregunta, segundapreguntarespuesta, admin, clave ) Values ('admin@admin.com','admin', 'admin', 'admin', 'admin', 'admin', 't', '$2a$10$TTYMKvi.cgEtTscb4Nr/gedfTY2o0YV5wD3i8rJ251yInYtJbLUXG');