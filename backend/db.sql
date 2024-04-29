CREATE DATABASE url;

CREATE TABLE urltable(
    url_id SERIAL PRIMARY KEY,
    org_url VARCHAR(255),
    short_url VARCHAR(255)
);