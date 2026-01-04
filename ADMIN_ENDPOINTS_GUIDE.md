# 📚 Guía de Endpoints Administrativos - Flashcards Backend

## ⚠️ IMPORTANTE: Cuándo usar estos endpoints

Estos endpoints son **OPCIONALES** y solo necesarios cuando:
- Tienes usuarios existentes en producción
- Agregaste nuevos campos al schema
- Quieres que TODOS los usuarios tengan los campos inmediatamente (en lugar de esperar a su próximo login)

**MongoDB es schemaless:** Los nuevos campos se crean automáticamente cuando el usuario guarda. Estos endpoints solo **aceleran** el proceso.

---

## 🔐 Seguridad

Cada endpoint requiere un **token de administrador** único. Nunca compartas estos tokens públicamente.

---

## 📋 ENDPOINTS DISPONIBLES

### **1️⃣ Agregar Campos de Progresión (NUEVO)**

**Endpoint:** `/api/admin/add-progression-fields`  
**Token:** `add-progression-2024`  
**Método:** POST

#### ¿Qué hace?
Agrega los campos del nuevo sistema de progresión a TODOS los usuarios existentes:
- ✅ `cruzarMarCompleted` (Boolean, default: false)
- ✅ `cruzarMarCompletedAt` (Date, default: null)
- ✅ `desafioN1Completed` (Boolean, default: false)
- ✅ `desafioN1CompletedAt` (Date, default: null)

#### ¿Cuándo usarlo?
- **Primera vez** que despliegas el sistema de progresión N1 → Cruzar el Mar → Nivel 2
- Tienes usuarios existentes que necesitan estos campos

#### ⚠️ Campos que NO modifica:
- Progreso de caracteres (known, revise1, revise2, etc.)
- XP, niveles, rachas
- Otros badges (Emperatriz, Bestias)

#### 🔧 Cómo usarlo:

**Con curl:**
```bash
curl -X POST https://tu-backend.railway.app/api/admin/add-progression-fields \
  -H "Content-Type: application/json" \
  -d '{"adminToken": "add-progression-2024"}'
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "matchedUsers": 50,
  "modifiedUsers": 50,
  "message": "Se agregaron los campos de progresión (cruzarMarCompleted, cruzarMarCompletedAt, desafioN1Completed, desafioN1CompletedAt) a 50 usuarios"
}
```

---

### **2️⃣ Actualizar Vocabulario (Pinyin, Meanings, Categories)**

**Endpoint:** `/api/admin/update-database-categories`  
**Token:** `update-db-categories-2024`  
**Método:** POST

#### ¿Qué hace?
Compara cada carácter de cada usuario con la definición en `initializeAllCharacters()` y actualiza:
- ✅ `unit` (ej: cambiar de unit2 a unit3)
- ✅ `cat` (ej: cambiar de 'S' a 'V')
- ✅ `level` (1, 2, 3, o 4 para horóscopo)
- ✅ `pinyin` (corregir typos)
- ✅ `meaning` (corregir traducciones)

#### ⚠️ Campos que **MANTIENE** (no modifica):
- `known` (si el usuario ya sabe el carácter)
- `revise1`, `revise2`
- `challengeStreak`, `challengeBest`
- `lastChallengeAt`
- `dkAddedAt`
- `id` del carácter

#### ¿Cuándo usarlo?
- Corregiste un typo en pinyin (ej: "xīe xie" → "xiè xie")
- Cambiaste el meaning de un carácter
- Reasignaste caracteres entre units
- Corregiste categorías (S/V/A/E/P)

#### 🔧 Cómo usarlo:

**Con curl:**
```bash
curl -X POST https://tu-backend.railway.app/api/admin/update-database-categories \
  -H "Content-Type: application/json" \
  -d '{"adminToken": "update-db-categories-2024"}'
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "totalUsers": 50,
  "usersUpdated": 12,
  "charactersUpdated": 34,
  "updateLog": [
    "manuel123: 谢谢 - pinyin: xīe xie → xiè xie",
    "usuario2: 电影 - meaning: pelicula → película"
  ],
  "message": "Actualización exitosa: 12 usuarios y 34 caracteres actualizados"
}
```

**Preview sin aplicar cambios:**
```bash
curl "https://tu-backend.railway.app/api/admin/preview-database-updates?adminToken=update-db-categories-2024"
```

---

### **3️⃣ Agregar Campos de Badges**

**Endpoint:** `/api/admin/add-badges-fields`  
**Token:** `add-badges-2024`  
**Método:** POST

#### ¿Qué hace?
Agrega campos para badges de desafíos boss:
- ✅ `emperatrizCompleted` (Boolean, default: false)
- ✅ `emperatrizCompletedAt` (Date, default: null)
- ✅ `bestias12Completed` (Boolean, default: false)
- ✅ `bestias12CompletedAt` (Date, default: null)

#### ¿Cuándo usarlo?
- Primera vez que agregaste los badges de La Emperatriz y 12 Bestias
- **YA NO NECESITAS USARLO** (estos campos ya están en producción)

#### 🔧 Cómo usarlo:
```bash
curl -X POST https://tu-backend.railway.app/api/admin/add-badges-fields \
  -H "Content-Type: application/json" \
  -d '{"adminToken": "add-badges-2024"}'
```

---

### **4️⃣ Agregar Campos de Maestro del Horóscopo**

**Endpoint:** `/api/admin/add-horoscope-master-fields`  
**Token:** `add-horoscope-master-2024`  
**Método:** POST

#### ¿Qué hace?
Agrega campos del sistema Ultimate Challenge:
- ✅ `horoscopeMaster` (Boolean, default: false)
- ✅ `horoscopeMasterAt` (Date, default: null)
- ✅ `ultimateChallengeCompleted` (Number, default: 0)

#### ¿Cuándo usarlo?
- **YA NO NECESITAS USARLO** (estos campos ya están en producción)

---

### **5️⃣ Agregar Campos de Desafío N3**

**Endpoint:** `/api/admin/add-desafio-n3-fields`  
**Token:** `add-desafio-n3-2024`  
**Método:** POST

#### ¿Qué hace?
Agrega campos del Desafío N3:
- ✅ `desafioN3Completed` (Boolean, default: false)
- ✅ `desafioN3CompletedAt` (Date, default: null)

#### ¿Cuándo usarlo?
- **YA NO NECESITAS USARLO** (estos campos ya están en producción)

---

### **6️⃣ Sincronizar Caracteres Faltantes**

**Endpoint:** `/api/admin/sync-all-users`  
**Token:** `sync-users-2024`  
**Método:** POST

#### ¿Qué hace?
Si agregaste NUEVOS caracteres a `initializeAllCharacters()`, este endpoint:
- ✅ Detecta caracteres que no tiene el usuario
- ✅ Los agrega con valores default (known: false, level: 0, etc.)
- ⚠️ **NO modifica** caracteres existentes

#### Diferencia con `update-database-categories`:
- `sync-all-users`: **AGREGA** caracteres nuevos
- `update-database-categories`: **ACTUALIZA** caracteres existentes

#### ¿Cuándo usarlo?
- Agregaste nuevos caracteres a la librería (ej: unit10N2)
- Agregaste nueva categoría del horóscopo

#### 🔧 Cómo usarlo:
```bash
curl -X POST https://tu-backend.railway.app/api/admin/sync-all-users \
  -H "Content-Type: application/json" \
  -d '{"adminToken": "sync-users-2024"}'
```

---

## 🎯 RESUMEN RÁPIDO

| Endpoint | ¿Cuándo usar? | ¿Qué actualiza? |
|----------|---------------|-----------------|
| `add-progression-fields` | **USA ESTE AHORA** para Cruzar el Mar | Campos: cruzarMarCompleted, desafioN1Completed |
| `update-database-categories` | Corregiste pinyin/meanings | Actualiza vocabulario sin perder progreso |
| `sync-all-users` | Agregaste nuevos caracteres | Agrega caracteres faltantes |
| `add-badges-fields` | Ya usado (no necesario) | Campos de badges boss |
| `add-horoscope-master-fields` | Ya usado (no necesario) | Campos Ultimate Challenge |
| `add-desafio-n3-fields` | Ya usado (no necesario) | Campos Desafío N3 |

---

## 🚀 PRÓXIMOS PASOS RECOMENDADOS

### Para tu sistema de progresión actual:

**Paso 1:** Ejecuta el nuevo endpoint para agregar campos de progresión
```bash
curl -X POST https://tu-backend-railway-url/api/admin/add-progression-fields \
  -H "Content-Type: application/json" \
  -d '{"adminToken": "add-progression-2024"}'
```

**Paso 2:** Verifica que funcionó
- Debería responder con cantidad de usuarios modificados
- Los campos se crearán como `false` y `null`

**Paso 3:** Haz push del backend actualizado
```bash
cd backend
git add .
git commit -m "Add endpoint for progression fields (cruzarMar + desafioN1)"
git push
```

---

## ❓ PREGUNTAS FRECUENTES

### ¿Necesito ejecutar estos endpoints cada vez que despliego?
**NO.** Solo una vez cuando agregas nuevos campos al schema.

### ¿Qué pasa si NO ejecuto estos endpoints?
Nada malo. Los campos se crearán automáticamente cuando cada usuario:
1. Haga login
2. Guarde su progreso

Estos endpoints solo **aceleran** el proceso para todos los usuarios.

### ¿Puedo ejecutar el mismo endpoint dos veces?
**SÍ.** Los endpoints usan `$set` que es **idempotente** (ejecutarlo múltiples veces da el mismo resultado).

### ¿Estos endpoints pueden romper el progreso de los usuarios?
**NO.** Están diseñados para:
- Solo agregar campos que no existen
- Solo actualizar vocabulario (no progreso)
- Nunca eliminar datos

---

## 📞 SOPORTE

Si algo sale mal:
1. Revisa los logs de Railway
2. Los endpoints devuelven JSON con detalles del error
3. Puedes usar `/api/admin/preview-database-updates` para ver qué cambiará SIN aplicar cambios

---

**Última actualización:** 17 de octubre de 2025
