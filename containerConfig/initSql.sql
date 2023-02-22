DROP TABLE IF EXISTS public.products;

CREATE TABLE public.StoreData(
  uniqueStoreId SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

ALTER TABLE public.StoreData OWNER to postgres;

CREATE TABLE public.UserData(
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(200) NOT NULL,
  role VARCHAR(11) NOT NULL,
  storeId INT,
  CONSTRAINT fk_store
    FOREIGN KEY(storeId) 
	    REFERENCES StoreData(uniqueStoreId),
  CONSTRAINT constraint_email UNIQUE (email)
);

ALTER TABLE public.UserData OWNER to postgres;

CREATE TABLE public.ProductData(
  id SERIAL PRIMARY KEY, 
  title VARCHAR(100) NOT NULL, 
  description TEXT, 
  imageUrl VARCHAR(100),
  storeId INT NOT NULL, 
  price VARCHAR(50) NOT NULL, 
  quantity INT NOT NULL, 
  category VARCHAR(50) NOT NULL,
  CONSTRAINT fk_store
    FOREIGN KEY(storeId) 
	    REFERENCES StoreData(uniqueStoreId)
);

ALTER TABLE public.ProductData OWNER to postgres;

-- declare @json_data varchar(max) 

-- select @json_data = BulkColumn 
-- from openrowset 
-- (
--  BULK './containerConfig/initSql.sql mockData/Store_Mock_data.json', SINGLE_CLOB
-- ) as datasource

-- insert into StoreData (uniqueStoreId, name) 
-- select uniqueStoreId, name from openjson (@json_data)
-- WITH
-- {
--   uniqueStoreId: INT,
--   name: VARCHAR(50)
-- } 





-- DO $$
-- DECLARE
--   json_data text;
-- BEGIN
--   json_data := pg_read_file('/Users/andrea/salt/PGP/saltazonDatabase/containerConfig/Store_Mock_data.json');
--   RAISE NOTICE 'JSON Data: %', json_data;
--   INSERT INTO StoreData (uniqueStoreId, name) 
--   SELECT (json_data->> 'uniqueStoreId')::int, json_data->>'name'
--   FROM json_array_elements(json_data::json);
-- END $$;

