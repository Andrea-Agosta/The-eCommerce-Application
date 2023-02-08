DROP TABLE IF EXISTS public.products;

CREATE TABLE public.StoreData(
  uniqueStoreId INT NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

ALTER TABLE public.StoreData OWNER to postgres;

CREATE TABLE public.UserData(
  id INT NOT NULL PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(200) NOT NULL,
  role VARCHAR(11) NOT NULL,
  storeId INT,
  CONSTRAINT fk_store
    FOREIGN KEY(storeId) 
	    REFERENCES StoreData(uniqueStoreId)
);

ALTER TABLE public.UserData OWNER to postgres;

CREATE TABLE public.ProductData(
  id INT NOT NULL PRIMARY KEY, 
  title VARCHAR(100) NOT NULL, 
  description TEXT, 
  imageUrl VARCHAR(100),
  storeId INT NOT NULL, 
  price VARCHAR(50) NOT NULL, 
  quantity INT NOT NULL, 
  category VARCHAR(50) NOT NULL
);

ALTER TABLE public.ProductData OWNER to postgres;
