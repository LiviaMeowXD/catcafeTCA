drop table if exists reservas;
drop table if exists mesas;


create table mesas(
    id serial primary key,
    nome varchar(50)
);      

create table reservas(
    id serial primary key,
    cpf varchar(11) not null,
    nome varchar(100) not null,
    dia date not null default now(),
    hora time not null default now(),
    id_mesa int not null references mesas(id)
);
--                       

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

alter table public.reservas disable row level security;
alter table public.mesas disable row level security;

grant usage on schema public to anon;
grant select, insert, update, delete on public.reservas to anon;
grant select on public.mesas to anon;
grant usage, select on all sequences in schema public to anon;