# Laboratorio 09 — Interfaz React con Vite para UrbanTrend

**Curso:** Desarrollo de Aplicaciones Empresariales
**Institución:** Tecsup — Sección 4 - C24 - Sección CD
**Docente:** Yunior Bestard Aroche
**Estudiante:** Erick Arturo Gamarra Mundaca
**Repositorio:** https://github.com/ErickGamarra/Django_Lab09

---

## 🎯 1. Objetivo

Comenzar el bloque de front-end creando una interfaz con **React** y **Vite** para **UrbanTrend**, la plataforma de ropa streetwear y logística textil construida en Django durante las semanas anteriores.

React no reemplaza a Django: lo complementa. Lo que en un Template de Django se escribe con `{{ }}`, `{% for %}` y `{% if %}`, en React se escribe con llaves, `map()` y condicionales de JavaScript.

En este laboratorio la interfaz **todavía no consume la API**: los datos están escritos a mano en `frontend/src/App.jsx`, con la misma forma que las respuestas de la API REST del Laboratorio 08. La conexión real se hace en la Semana 12.

---

## 🖥️ 2. Qué muestra la interfaz

La página tiene dos partes:

### Parte 1 — Tienda de ropa
| Sección | Qué muestra |
| :--- | :--- |
| **Prendas** (5 registros) | Precio con dos decimales, `Agotado` o `Stock: n` según el stock, y el aviso `¡Últimas unidades!` cuando quedan 5 o menos. |
| **Pedidos** (3 registros) | Cada pedido con la lista de prendas que compró (relación 1:N) y su total calculado. |

### Parte 2 — Logística e insumos textiles (investigación propia)
| Sección | Qué muestra |
| :--- | :--- |
| **Materiales** (5 registros) | Categoría, precio por unidad, `Sin stock` o `Stock: n`, y el aviso `Stock bajo` si hay menos de 200. |
| **Proveedores** (3 registros) | Razón social, RUC y datos de contacto. |
| **Órdenes de despacho** (2 registros) | Cada orden con los materiales que lleva (relación N:M mediante `DetalleDespacho`), cuántos son y el costo total del envío. |

Todas las listas muestran `No hay registros` cuando están vacías. Los estilos se aplican con `className` (reglas en `App.css`) y con `style={{ }}`.

---

## 🧩 3. Qué se trabajó en cada ejercicio

| Ejercicio | Qué se hizo |
| :--- | :--- |
| 1–3 | Verificación de Node.js y npm, creación del proyecto con Vite y reconocimiento de su estructura. |
| 4 | Primer componente con el nombre de la tienda y expresiones entre llaves (variable, cálculo y función). |
| 5 | Lista de prendas recorrida con `map()` y `key` basada en el `id`. |
| 6 | Renderizado condicional: ternario, `&&` y mensaje de lista vacía. |
| 7 | Pedidos con sus detalles mediante listas anidadas y total por pedido. |
| 8 | Estilos con `className`, `App.css` y `style={{ }}`; `lint` y `build`. |
| 9–12 | La misma interfaz aplicada a la investigación propia: materiales, proveedores y despachos con sus detalles. |
| 13 | Verificación de la consola, `lint`, `build` y que `node_modules` y `dist` no estén en el repositorio. |
| 14 | Publicación en GitHub y documentación (este README). |

Cada ejercicio quedó registrado en su propio commit del historial.

---

## 📁 4. Estructura del repositorio

```text
Django_Lab09/
├── README.md             # este archivo
├── requirements.txt      # dependencias del backend (Django y DRF)
├── docs/
│   └── LABORATORIO08.md  # documentación de la API REST del laboratorio anterior
├── src/                  # backend Django del Laboratorio 08
└── frontend/             # interfaz React + Vite (Laboratorio 09)
    ├── index.html        # única página HTML; contiene el div donde React dibuja
    ├── package.json      # dependencias y scripts (dev, build, lint)
    ├── vite.config.js
    └── src/
        ├── main.jsx      # monta el componente App en la página
        ├── App.jsx       # datos de ejemplo y toda la interfaz (JSX)
        ├── App.css       # estilos de la página
        └── index.css     # vacío
```

---

## 💻 5. Instalar y ejecutar el frontend

Requiere Node.js (versión LTS) y npm.

```bash
git clone https://github.com/ErickGamarra/Django_Lab09.git
cd Django_Lab09/frontend
npm install      # instala las dependencias (crea node_modules/)
npm run dev      # servidor de desarrollo en http://localhost:5173/
```

Otros comandos:

```bash
npm run lint     # revisa el código
npm run build    # genera la versión para producción en dist/
```

`node_modules/` y `dist/` no se suben al repositorio (están en `frontend/.gitignore`). El backend de Django **no es necesario** para ver la interfaz.

---

## 🔧 6. Backend de Django (opcional)

El backend es el del Laboratorio 08, con algunas correcciones. Solo hace falta si se quiere comparar los datos de ejemplo con las respuestas reales de la API.

```bash
pip install -r requirements.txt
python src/manage.py migrate
python src/seed_prendas.py
python src/seed_logistics.py
python src/seed_pedidos.py
python src/manage.py runserver     # API en http://127.0.0.1:8000/api/
```

Cambios hechos sobre el Laboratorio 08:

* `MaterialViewSet` usa `select_related('categoria')` (de 9 consultas a 1 en `/api/materiales/`).
* Se eliminó el `requirements.txt` de `src/` (era un `pip freeze` del sistema); se usa el de la raíz.
* Nuevo `src/seed_pedidos.py` para tener pedidos de ejemplo en `/api/pedidos/`.
* Se eliminó `store/api_urls.py` (sin uso) y el `validate_stock` redundante de `MaterialSerializer`.

La documentación completa de la API está en [`docs/LABORATORIO08.md`](docs/LABORATORIO08.md).
