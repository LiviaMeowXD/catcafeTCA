drop database if exists catcafe;

create database catcafe;

\c catcafe;


create table usuario(
    nome
    cpf
    telefone
    
);

--V
create table clientes(
    cpf int not null primary key,
    nome varchar(100) not null,
    telefone varchar(20) not null,
    entrada timestamp null default now()
);

--                           
create table mesas(
    id serial primary key,
    nome varchar(50)
);                                                                                                                                                               

--
create table reservas(
    id serial primary key,
    nome varchar(100) not null
);

create table mesa_reserva(
    id_mesa int not null references mesas(id),
    id_reserva int not null references reservas(id),
    primary key (id_mesa, id_reserva)
);

create table cliente_reserva(
    id_cliente int not null references clientes(cpf),
    id_reserva int not null references reservas(id),
    primary key (id_cliente, id_reserva)
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