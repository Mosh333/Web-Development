

--Drops tables sql syntax
IF OBJECT_ID('dbo.comware_orders', 'U') IS NOT NULL 
  DROP TABLE dbo.comware_orders; 
IF OBJECT_ID('dbo.comware_customers', 'U') IS NOT NULL 
  DROP TABLE dbo.comware_customers; 


CREATE TABLE comware_customers
(
	Id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	username varchar(255) NOT NULL UNIQUE,
	password varchar(255) NOT NULL,
	emailAddr varchar(255) NOT NULL UNIQUE
);

CREATE TABLE comware_orders
(
	username varchar(255) NOT NULL,
	item text NOT NULL,
	price decimal NOT NULL, 	
	qty int NOT NULL,
	computerType text,
	computerBrand text,
	computerOS text,
	computerMonitor text,
	computerCPU text,
	computerGPU text,
	computerHDD text,
	computerRAM text,
	computerSoundcard text,
	ImageUrl text
);

INSERT INTO comware_customers(username, password, emailAddr) VALUES('Moshiur', 'Howlader', 'howladermoshiur1@gmail.com');
INSERT INTO comware_customers(username, password, emailAddr) VALUES('Moshiur2', 'Howlader', 'howladermoshiur2@gmail.com');