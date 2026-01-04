// Backend simplificado para Flashcards - Versión Documental
// SIN MongoDB, SIN Google Cloud TTS, SIN Autenticación
// Solo sirve archivos estáticos para Railway

require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

// CORS abierto para testing
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '..')));

// ========== ENDPOINTS "DUMMY" PARA COMPATIBILIDAD ==========
// Estos endpoints responden OK para que el frontend no se rompa
// pero NO hacen nada real (sin base de datos)

// Ruta raíz - servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Login (dummy - siempre responde OK)
app.post('/api/login', (req, res) => {
  console.log('📝 Login dummy recibido');
  res.json({ 
    token: 'dummy-token-documental',
    username: 'ManuShi',
    message: 'Login ficticio OK'
  });
});

// Register (dummy - siempre responde OK)
app.post('/api/register', (req, res) => {
  console.log('📝 Register dummy recibido');
  res.json({ 
    token: 'dummy-token-documental',
    username: 'ManuShi',
    message: 'Registro ficticio OK'
  });
});

// Get user data (dummy - responde datos vacíos)
app.get('/api/user', (req, res) => {
  console.log('📝 Get user dummy recibido');
  res.json({
    username: 'ManuShi',
    xp: 0,
    knownChars: [],
    unlockedUnits: [],
    nivel2Unlocked: false,
    nivel3Unlocked: false,
    hskUnlocked: false,
    streak: 0,
    horoscopeAnimals: [],
    horoscopeMaster: false,
    ultimateChallengeCompleted: 0
  });
});

// Save progress (dummy - acepta todo pero no guarda)
app.post('/api/progress', (req, res) => {
  console.log('💾 Guardado dummy recibido (no se guarda nada)');
  res.json({ 
    success: true, 
    message: 'Progreso recibido (localStorage mode)'
  });
});

// Leaderboard (dummy - retorna array vacío, se maneja en frontend)
app.get('/api/leaderboard', (req, res) => {
  console.log('🏆 Leaderboard dummy recibido');
  res.json([]);
});

// Set group (dummy)
app.post('/api/setgroup', (req, res) => {
  console.log('👥 Set group dummy recibido');
  res.json({ success: true });
});

// Initialize chars (dummy)
app.post('/api/initialize-chars', (req, res) => {
  console.log('🔤 Initialize chars dummy recibido');
  res.json({ 
    success: true,
    message: 'Caracteres inicializados (localStorage)',
    totalCharacters: 0,
    addedCharacters: 0
  });
});

// Ultimate challenge complete (dummy)
app.post('/api/ultimate-challenge-complete', (req, res) => {
  console.log('🎯 Ultimate challenge dummy recibido');
  res.json({ success: true });
});

// Desafío completions (dummy)
app.post('/api/desafio-n3-complete', (req, res) => {
  console.log('🎯 Desafío N3 dummy recibido');
  res.json({ success: true });
});

app.post('/api/challenge', (req, res) => {
  console.log('⚔️ Challenge dummy recibido');
  res.json({ success: true });
});

// TTS endpoint (dummy - ya no genera audio)
app.post('/api/tts', (req, res) => {
  console.log('🔊 TTS dummy recibido (desactivado)');
  res.status(404).json({ 
    error: 'TTS desactivado en versión documental' 
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    version: 'Documental v1.0',
    mode: 'localStorage-only',
    timestamp: new Date().toISOString()
  });
});

// Puerto
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('');
  console.log('🎬 ===============================================');
  console.log('🎬 FLASHCARDS - VERSIÓN DOCUMENTAL');
  console.log('🎬 ===============================================');
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log('💾 Modo: localStorage (SIN base de datos)');
  console.log('🔇 Google Cloud TTS: DESACTIVADO');
  console.log('👤 Usuario hardcodeado: ManuShi');
  console.log('🏆 Leaderboard: Datos ficticios');
  console.log('🎬 ===============================================');
  console.log('');
});
