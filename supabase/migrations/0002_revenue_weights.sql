create table if not exists revenue_weights (
  id serial primary key,
  model text,
  weights numeric[],
  r2 numeric
);

