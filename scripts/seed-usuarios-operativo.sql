-- =============================================================================
-- Seed: usuarios operativos ZAIAH / EMX
-- Correos: santospalapas@gmail.com, jessdufwa@gmail.com
-- Rol: operativo
-- Contraseña en texto: emx@2026  (almacenada como bcrypt, cost 10)
-- Hash: $2b$10$at7ndtnrgmAVi9evNINA4OuPHfoSrukRtMbi2aH995cmvcIcdNzyq
--
-- Ajusta nombres de tabla/columnas si tu esquema ya existe.
-- =============================================================================

BEGIN;

-- Tabla mínima (omitir si ya tienes `users`)
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'operativo',
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice útil para login
CREATE INDEX IF NOT EXISTS users_email_idx ON users (lower(email));

-- Insertar / actualizar usuarios
INSERT INTO users (email, password_hash, role, is_active)
VALUES
  (
    'santospalapas@gmail.com',
    '$2b$10$at7ndtnrgmAVi9evNINA4OuPHfoSrukRtMbi2aH995cmvcIcdNzyq',
    'operativo',
    TRUE
  ),
  (
    'jessdufwa@gmail.com',
    '$2b$10$at7ndtnrgmAVi9evNINA4OuPHfoSrukRtMbi2aH995cmvcIcdNzyq',
    'operativo',
    TRUE
  )
ON CONFLICT (email) DO UPDATE
SET
  password_hash = EXCLUDED.password_hash,
  role          = EXCLUDED.role,
  is_active     = TRUE,
  updated_at    = NOW();

COMMIT;

-- Verificación
-- SELECT id, email, role, is_active, created_at FROM users
-- WHERE email IN ('santospalapas@gmail.com', 'jessdufwa@gmail.com');
