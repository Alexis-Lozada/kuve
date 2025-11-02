# Kuve 3D MVP — Next.js + React Three Fiber

Editor 3D web minimalista para **modelado hard-surface** construido con **Next.js**, **React Three Fiber** y **drei**.  
Incluye **TrackballControls** (rotación libre), **grilla infinita con fade**, **fondo claro + niebla**, y una **pieza ejemplo** en gris mate.

![screenshot](./docs/screenshot.png) <!-- Reemplaza con tu captura -->

---

## Características

- **React Three Fiber** sobre **Three.js**
- **TrackballControls** (rotación/zoom/pan fluidos)
- **Grilla infinita** con desvanecido al horizonte
- **Fondo claro + niebla** para sensación de profundidad
- **Pieza demo** (cilindros apilados) en gris mate
- Estructura base para crecer a editor (añadir primitivas, selección, transformaciones, exportación)

---

## Stack

- **Next.js** (App Router, TypeScript, Tailwind)
- **three**
- **@react-three/fiber**
- **@react-three/drei**

---

## Inicio rápido

Requisitos: **Node 18+** y **npm**

```bash
# 1) Clonar
git clone https://github.com/tu-usuario/kuve-3d-mvp.git
cd kuve-3d-mvp

# 2) Instalar dependencias
npm install
# (si partiste de create-next-app y aún no instalas 3D:)
# npm install three @react-three/fiber @react-three/drei

# 3) Levantar en desarrollo
npm run dev

# Abre http://localhost:3000
