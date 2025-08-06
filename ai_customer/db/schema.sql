-- Basic schema for AI Customer data storage.

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    source VARCHAR,
    source_id VARCHAR,
    author VARCHAR,
    text TEXT,
    rating INT,
    created_at TIMESTAMP,
    raw_json JSONB
);

CREATE TABLE IF NOT EXISTS social_posts (
    id SERIAL PRIMARY KEY,
    platform VARCHAR,
    post_id VARCHAR,
    author VARCHAR,
    text TEXT,
    created_at TIMESTAMP,
    raw_json JSONB
);

CREATE TABLE IF NOT EXISTS processed_entries (
    id SERIAL PRIMARY KEY,
    source_table VARCHAR,
    source_row_id INT,
    sentiment NUMERIC,
    aspects JSONB,
    embedding VECTOR(1536),
    processed_at TIMESTAMP DEFAULT NOW()
);
