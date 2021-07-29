drop table if exists manga CASCADE;

create table manga
(
	id integer PRIMARY KEY AUTO_INCREMENT, 
	manga_name varchar(255), 
	read_status varchar(255), 
	rating integer not null, 
	opt integer not null
);
