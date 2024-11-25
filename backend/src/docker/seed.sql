CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS app_user (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid (),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customer (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid (),
    fullname VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS driver (
    id serial primary key,
    fullname VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    minkm INT NOT NULL DEFAULT 1,
    tax FLOAT NOT NULL DEFAULT 0.0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vehicle (
    id serial primary key,
    alias VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    driver_id INT NOT NULL,
    FOREIGN KEY (driver_id) REFERENCES driver (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ride (
    id serial primary key,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    travel_status VARCHAR(100) NOT NULL DEFAULT 'PENDING',
    customer_id UUID NOT NULL,
    driver_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer (id) ON DELETE CASCADE,
    FOREIGN KEY (driver_id) REFERENCES driver (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS review (
    id serial primary key,
    comment VARCHAR(255) DEFAULT NULL,
    rating SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    customer_id UUID NOT NULL,
    driver_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer (id) ON DELETE CASCADE,
    FOREIGN KEY (driver_id) REFERENCES driver (id) ON DELETE CASCADE
);

insert into
    app_user (id, email, password)
values
    (
        'a8f9c995-ce19-4667-bf46-0024b7ea840e',
        'simpsonhomer@google.com',
        '12345678'
    ),
    (
        '51f25671-cccf-4eae-8bca-cfabb3a9714c',
        'certainlyanormalperson@google.com',
        '12345678'
    ),
    (
        '6e74b608-c00f-4413-aee8-06f2c6399b96',
        'toretodom@google.com',
        '12345678'
    ),
    (
        '2be17af3-d65e-4cdb-893f-6b320b7d0b7d',
        'johndoe@gmail.com',
        '12345678'
    );

insert into
    customer (id, fullname, user_id)
values
    (
        '2be17af3-d65e-4cdb-893f-6b320b7d0b7d',
        'John Doe',
        '2be17af3-d65e-4cdb-893f-6b320b7d0b7d'
    );

insert into
    driver (id, fullname, user_id, bio, minkm, tax)
values
    (
        1,
        'Homer Simpson',
        'a8f9c995-ce19-4667-bf46-0024b7ea840e',
        'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
        1,
        2.5
    ),
    (
        2,
        'James Bond',
        '51f25671-cccf-4eae-8bca-cfabb3a9714c',
        'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
        10,
        10
    ),
    (
        3,
        'Dominique Toretto',
        '6e74b608-c00f-4413-aee8-06f2c6399b96',
        'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
        5,
        5
    );

insert into
    vehicle (driver_id, alias)
values
    (1, 'Plymouth Valiant 1973 rosa e enferrujado'),
    (2, 'Aston Martin DB5 clássico'),
    (3, 'Dodge Charger R/T 1970 modificado');

insert into
    review (customer_id, driver_id, comment, rating)
values
    (
        '2be17af3-d65e-4cdb-893f-6b320b7d0b7d',
        1,
        'Carro enferrujado, mas o motorista era engraçado.',
        3
    ),
    (
        '2be17af3-d65e-4cdb-893f-6b320b7d0b7d',
        1,
        'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
        2
    ),
    (
        '2be17af3-d65e-4cdb-893f-6b320b7d0b7d',
        3,
        'Pegou um caminho muito rapido, mas envolvia uma rota exótica. Quando menos esperava o carro estava em planando em cima de um lago.',
        4
    ),
    (
        '2be17af3-d65e-4cdb-893f-6b320b7d0b7d',
        3,
        'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
        5
    ),
    (
        '2be17af3-d65e-4cdb-893f-6b320b7d0b7d',
        2,
        'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
        5
    );