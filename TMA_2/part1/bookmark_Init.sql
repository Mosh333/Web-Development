-- run the below command to initialize the database
-- source /home/moshiurho/public_html/Comp466_Assignment2/part1/bookmark_Init.sql;
use moshiurho;

-- Bypass dependencies
DROP TABLE IF EXISTS bookmark;
DROP TABLE IF EXISTS userList;

CREATE TABLE userList(
    username varchar(255) NOT NULL,
    passwd varchar(255) NOT NULL,
    PRIMARY KEY (username)

);


CREATE TABLE bookmark(
    LinkId int NOT NULL AUTO_INCREMENT,
    urlLink varchar(255) NOT NULL,
    username varchar(255),
    PRIMARY KEY (LinkId),
    FOREIGN KEY (username) REFERENCES userList(username)
);

insert into userList( username, passwd) values('mosh333', 'mosh391');
insert into userList( username, passwd) values('poroking', 'league');
insert into userList( username, passwd) values('trollking', 'hahaha');

insert into bookmark( LinkId,urlLink,username) values('', 'https://www.youtube.com','mosh333');
insert into bookmark( LinkId,urlLink,username) values('', 'https://www.facebook.com','mosh333');
insert into bookmark( LinkId,urlLink,username) values('', 'https://www.mcmaster.ca','mosh333');
insert into bookmark( LinkId,urlLink,username) values('', 'https://www.amazon.ca','mosh333');
insert into bookmark( LinkId,urlLink,username) values('', 'https://www.reddit.com','mosh333');
insert into bookmark( LinkId,urlLink,username) values('', 'https://www.wikipedia.org','mosh333');
insert into bookmark( LinkId,urlLink,username) values('', 'https://www.twitter.com','mosh333');
insert into bookmark( LinkId,urlLink,username) values('', 'https://www.instagram.com','mosh333');
insert into bookmark( LinkId,urlLink,username) values('', 'https://www.twitch.tv','mosh333');
insert into bookmark( LinkId,urlLink,username) values('', 'https://www.mcmaster.ca','poroking');
insert into bookmark( LinkId,urlLink,username) values('', 'https://www.mcmaster.ca','trollking');
insert into bookmark( LinkId,urlLink,username) values('', 'https://www.bing.com','mosh333');
insert into bookmark( LinkId,urlLink,username) values('', 'https://www.cbc.ca','mosh333');
insert into bookmark( LinkId,urlLink,username) values('', 'https://www.google.ca','poroking');
insert into bookmark( LinkId,urlLink,username) values('', 'https://www.google.ca','trollking');
insert into bookmark( LinkId,urlLink,username) values('', 'https://facebook.com','trollking');



