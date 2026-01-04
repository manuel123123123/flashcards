# Actualización de Base de Datos - Badges HSK3 y HSK4

## Problema Identificado
Los campos `cruzarHSK3Completed` y `cruzarHSK4Completed` no existían en el schema de la base de datos, por lo tanto los badges no se guardaban ni mostraban en la colección.

## Cambios Realizados

### 1. Backend (server.js)
✅ Agregados campos al schema:
```javascript
cruzarHSK3Completed: { type: Boolean, default: false },
cruzarHSK3CompletedAt: { type: Date, default: null },
cruzarHSK4Completed: { type: Boolean, default: false },
cruzarHSK4CompletedAt: { type: Date, default: null },
```

✅ Agregado manejo en endpoint `/api/progress`
✅ Agregado en respuesta del endpoint `/api/user`

### 2. Frontend (index.html)
✅ Agregados campos en `saveUserState()` para enviar al backend
✅ Ya existía la carga en `loadUserState()` (líneas 6827-6836)

## Comando para Actualizar Base de Datos Existente

**IMPORTANTE**: Este comando agrega los campos a TODOS los usuarios existentes en MongoDB.

### Comando curl para Railway/Producción:

```bash
curl -X POST https://macaflashgame-production.up.railway.app/api/admin/add-hsk-badges-fields \
  -H "Content-Type: application/json" \
  -d '{"adminToken": "add-hsk-badges-2024"}'
```

**Comando listo para copiar y pegar ↑**

### Alternativa: Actualización directa en MongoDB Atlas

Si tienes acceso al panel de MongoDB Atlas:

1. Ve a tu cluster → Collections
2. Selecciona la base de datos `flashcards`
3. Selecciona la colección `users`
4. Haz clic en el botón "+" para agregar campos
5. Agrega los siguientes campos a cada documento de usuario:

```json
{
  "cruzarHSK3Completed": false,
  "cruzarHSK3CompletedAt": null,
  "cruzarHSK4Completed": false,
  "cruzarHSK4CompletedAt": null
}
```

### Script de actualización masiva (MongoDB Shell):

Si prefieres usar MongoDB Shell:

```javascript
db.users.updateMany(
  {},
  {
    $set: {
      cruzarHSK3Completed: false,
      cruzarHSK3CompletedAt: null,
      cruzarHSK4Completed: false,
      cruzarHSK4CompletedAt: null
    }
  }
)
```

## Verificación

Después de ejecutar el comando:

1. Recarga la aplicación y completa un desafío HSK3 o HSK4
2. El badge debería guardarse correctamente
3. Verifica en "Mi Colección" → "Mis Badges" que aparezcan los badges HSK3/HSK4

## Resumen de Archivos Modificados

- ✅ `/backend/server.js` - Schema + endpoints
- ✅ `/index.html` - saveUserState() 
- 📝 Este archivo con instrucciones de migración

## Estado del HP para Testing

**Recordar**: Los desafíos HSK3 y HSK4 actualmente tienen HP=30 para testing. 

Para restaurar valores de producción, cambiar en `index.html` (líneas ~14770-14801):
```javascript
cruzarHSK3: { hp: 7000 },  // Cambiar de 30 a 7000
cruzarHSK4: { hp: 9000 }   // Cambiar de 30 a 9000
```
