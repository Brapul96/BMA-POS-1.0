# BMA MINIMARKET — v33 CLOUD VERIFIED

App local-first con sincronización automática a Supabase. La app arranca y funciona sin internet; cuando hay conexión, intenta recuperar o subir los datos.

## Supabase
Ejecuta en SQL Editor:

```sql
create table if not exists public.bma_store (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.bma_store enable row level security;

create policy "bma public read" on public.bma_store
for select to anon using (true);

create policy "bma public insert" on public.bma_store
for insert to anon with check (true);

create policy "bma public update" on public.bma_store
for update to anon using (true) with check (true);
```

Abre la app con internet después de crear la tabla.

> Nota: estas políticas son adecuadas solo para una prueba privada. Para producción se recomienda Supabase Auth y políticas RLS por usuario/tienda.
