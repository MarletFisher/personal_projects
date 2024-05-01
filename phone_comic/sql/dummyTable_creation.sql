-- CREATE DATABASE PhoneComicDatabase
-- GO
-- USE PhoneComicDatabase
-- GO
-- CREATE SCHEMA TestAppSchema
-- GO

DROP TABLE TestAppSchema.UserAccount;

CREATE TABLE TestAppSchema.UserAccount(
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    UserName NVARCHAR(18) UNIQUE,
    PasswordHash CHAR(64),
    PasswordSalt CHAR(32),
    Member BINARY,
    RegisterDate DATE,
    FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    LastChapterRead INT,
    LastPageRead INT,
    Email NVARCHAR(50) UNIQUE NULL
);

-- subscription table

-- Chapter Table - chapterId, chapterNumber, title, releaseDate, numPages, path

-- Page Table - pageId, chapterId, pageNumber, customSize, path

INSERT INTO TestAppSchema.UserAccount VALUES ('FisherM', 'password', 'aaa', 1, '2024-04-28', 'Frank', 'Cheng', 15, 2, 'franksredhot@iptsoe.com');
INSERT INTO TestAppSchema.UserAccount VALUES ('SexiMuffin', 'password2', 'bbb', 1, '2024-04-27', 'Christian', 'Rayos', 16, 4, 'monsterhunterman@capcom.com');
INSERT INTO TestAppSchema.UserAccount VALUES ('NgSerenity', 'password3', 'ccc', 1, '2024-04-26', 'Todd', 'Ogaki', 15, 6, 'hvacman@calgary.com');
INSERT INTO TestAppSchema.UserAccount VALUES ('Enjoy8', 'password4', 'ddd', 1, '2024-04-25', 'Eric', 'McLeod', 15, 4, 'hamiltonguy@chess.com');
INSERT INTO TestAppSchema.UserAccount VALUES ('HaroMaia', 'password5', 'eee', 1, '2024-04-24', 'Mylyne', 'Mapanao', 16, 12, 'annoying@gf.love');


INSERT INTO TestAppSchema.UserAccount VALUES ('DucknCover', 'password6', 'aaa', 1, '2024-04-23', 'Vince', 'Sanyoto', 16, 13, 'vincesan@hotmail.com');

DELETE FROM TestAppSchema.UserAccount WHERE UserName LIKE 'exampleman%';


SELECT * FROM TestAppSchema.UserAccount;

DELETE FROM TestAppSchema.UserAccount WHERE UserId > 20;

ALTER TABLE TestAppSchema.UserAccount
ALTER COLUMN PasswordHash CHAR(64);

ALTER TABLE TestAppSchema.UserAccount
ALTER COLUMN PasswordSalt CHAR(32);

EXEC sp_rename 'TestAppSchema.UserAccount.Password', 'PasswordHash', 'COLUMN';

ALTER TABLE TestAppSchema.UserAccount
ADD Email NVARCHAR(50);

ALTER TABLE TestAppSchema.UserAccount
ADD CONSTRAINT unique_email UNIQUE (Email);


