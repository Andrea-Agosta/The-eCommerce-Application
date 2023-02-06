DROP TABLE IF EXISTS public.products;

CREATE TABLE public.UserData(
  id INT NOT NULL PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  role VARCHAR(11) NOT NULL,
  storeId INT NOT NULL
);

ALTER TABLE public.UserData OWNER to postgres;

CREATE TABLE public.StoreData(
  id VARCHAR(2) NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  uniqueStoreId INT NOT NULL
);

ALTER TABLE public.StoreData OWNER to postgres;

CREATE TABLE public.ProductData(
  id INT NOT NULL PRIMARY KEY, 
  title VARCHAR(50) NOT NULL, 
  description TEXT, 
  imageUrl VARCHAR(50),
  storeId INT NOT NULL, 
  price VARCHAR(50) NOT NULL, 
  quantity INT NOT NULL, 
  category VARCHAR(50) NOT NULL
);

ALTER TABLE public.ProductData OWNER to postgres;
