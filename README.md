# BMA MINIMARKET — v28 CLOUD BACKUP

La app mantiene los datos localmente y sincroniza automáticamente con Supabase cuando hay internet.

## Configuración Supabase

En SQL Editor ejecuta:

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

Después de ejecutar el SQL, abre la app con internet una vez. Los datos locales se copiarán a la nube. En otro dispositivo, abre la app con internet y recuperará los datos.
