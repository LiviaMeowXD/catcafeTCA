drop table if exists usuario_reserva;
drop table if exists mesa_reserva;
drop table if exists reservas;
drop table if exists mesas;
drop table if exists usuarios;

create table usuarios(
    cpf varchar(11) not null primary key,
    nome varchar(500) not null,
    senha varchar(8) not null
);

--                           
create table mesas(
    id serial primary key,
    nome varchar(50)
);                                                                                                                                                      
--
create table reservas(
    id serial primary key,
    nome varchar(100) not null,
    dia date not null default now(),
    hora timestamptz null default now()
);

create table mesa_reserva(
    id_mesa int not null references mesas(id),
    id_reserva int not null references reservas(id),
    primary key (id_mesa, id_reserva)
);

create table usuario_reserva(
    id_usuario varchar(11) not null references usuarios(cpf),
    id_reserva int not null references reservas(id),
    primary key (id_usuario, id_reserva)
);

insert into mesas(nome)
values

    ('Mesa 1'),
    ('Mesa 2'),
    ('Mesa 3'),
    ('Mesa 4'),
    ('Mesa 5'),
    ('Mesa 6'),
    ('Mesa 7'),
    ('Mesa 8'),
    ('Mesa 9'),
    ('Mesa 10'),
    ('Mesa 11'),
    ('Mesa 12'),
    ('Mesa 13'),
    ('Mesa 14'),
    ('Mesa 15');