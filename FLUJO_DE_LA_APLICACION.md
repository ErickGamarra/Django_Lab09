# 📚 Catálogo Completo de Acciones y Flujos de la Aplicación UrbanTrend (Django Lab 04)

> **Guía Detallada Acción por Acción de Todo el Sistema**  
> Este documento detalla **cada una de las 31 acciones que un usuario puede realizar** en la aplicación web.  
> Para cada acción se describe: **punto de partida en la interfaz, petición HTTP, archivo de rutas, función de vista, formulario de validación, interacción con el modelo/ORM/señales, consulta SQL generada en SQLite y plantilla renderizada**.

---

## 📑 Índice General de Acciones

### [Módulo 1: Catálogo y Tienda Streetwear (`store`)](#módulo-1-catálogo-y-tienda-streetwear-store)
- [Acción 01: Ver el Catálogo General de Prendas](#acción-01-ver-el-catálogo-general-de-prendas)
- [Acción 02: Buscar Prendas por Texto (Nombre, Marca o Descripción)](#acción-02-buscar-prendas-por-texto-nombre-marca-o-descripción)
- [Acción 03: Filtrar Prendas por Tipo de Público](#acción-03-filtrar-prendas-por-tipo-de-público)
- [Acción 04: Filtrar Prendas por Categoría de Ropa](#acción-04-filtrar-prendas-por-categoría-de-ropa)
- [Acción 05: Registrar una Nueva Prenda (con Generación Automática de Ficha Técnica 1:1)](#acción-05-registrar-una-nueva-prenda-con-generación-automática-de-ficha-técnica-11)
- [Acción 06: Ver Ficha Detallada de una Prenda y sus Reseñas](#acción-06-ver-ficha-detallada-de-una-prenda-y-sus-reseñas)
- [Acción 07: Publicar una Reseña y Calificación de Estrellas en una Prenda](#acción-07-publicar-una-reseña-y-calificación-de-estrellas-en-una-prenda)
- [Acción 08: Ver Listado con Ficha Técnica Optimizado con `select_related`](#acción-08-ver-listado-con-ficha-técnica-optimizado-con-select_related)
- [Acción 09: Ver Listado de Pedidos Optimizado con `prefetch_related`](#acción-09-ver-listado-de-pedidos-optimizado-con-prefetch_related)

### [Módulo 2: Logística - Dashboard y Proveedores (`logistics`)](#módulo-2-logística---dashboard-y-proveedores-logistics)
- [Acción 10: Ver el Dashboard General de Logística](#acción-10-ver-el-dashboard-general-de-logística)
- [Acción 11: Listar Directorio de Proveedores](#acción-11-listar-directorio-de-proveedores)
- [Acción 12: Registrar un Nuevo Proveedor con Validación de RUC](#acción-12-registrar-un-nuevo-proveedor-con-validación-de-ruc)

### [Módulo 3: Logística - Categorías de Insumos (`logistics`)](#módulo-3-logística---categorías-de-insumos-logistics)
- [Acción 13: Listar Categorías de Insumos Textiles](#acción-13-listar-categorías-de-insumos-textiles)
- [Acción 14: Crear una Nueva Categoría de Insumos](#acción-14-crear-una-nueva-categoría-de-insumos)
- [Acción 15: Eliminar una Categoría (Protección Referencial con `models.PROTECT`)](#acción-15-eliminar-una-categoría-protección-referencial-con-modelsprotect)

### [Módulo 4: Logística - Insumos y Materiales Textiles (`logistics`)](#módulo-4-logística---insumos-y-materiales-textiles-logistics)
- [Acción 16: Listar Insumos y Materiales Textiles](#acción-16-listar-insumos-y-materiales-textiles)
- [Acción 17: Registrar un Nuevo Material (con Creación Automática de Ficha Técnica 1:1)](#acción-17-registrar-un-nuevo-material-con-creación-automática-de-ficha-técnica-11)
- [Acción 18: Ver Ficha Completa de un Material e Historial de Despachos](#acción-18-ver-ficha-completa-de-un-material-e-historial-de-despachos)
- [Acción 19: Editar un Material Textil Existente](#acción-19-editar-un-material-textil-existente)
- [Acción 20: Eliminar un Material Textil](#acción-20-eliminar-un-material-textil)
- [Acción 21: Editar la Ficha Técnica Textil 1:1 de un Material](#acción-21-editar-la-ficha-técnica-textil-11-de-un-material)

### [Módulo 5: Logística - Órdenes de Despacho (`logistics`)](#módulo-5-logística---órdenes-de-despacho-logistics)
- [Acción 22: Listar Órdenes de Despacho (Cabeceras N:M)](#acción-22-listar-órdenes-de-despacho-cabeceras-nm)
- [Acción 23: Crear una Nueva Orden de Despacho](#acción-23-crear-una-nueva-orden-de-despacho)
- [Acción 24: Ver Detalle de una Orden de Despacho y sus Materiales](#acción-24-ver-detalle-de-una-orden-de-despacho-y-sus-materiales)
- [Acción 25: Editar Cabecera de una Orden de Despacho](#acción-25-editar-cabecera-de-una-orden-de-despacho)
- [Acción 26: Eliminar una Orden de Despacho (Borrado en Cascada)](#acción-26-eliminar-una-orden-de-despacho-borrado-en-cascada)

### [Módulo 6: Logística - Modelo Intermedio: Detalles de Despacho (`logistics`)](#módulo-6-logística---modelo-intermedio-detalles-de-despacho-logistics)
- [Acción 27: Listar Transversalmente todos los Detalles de Despacho](#acción-27-listar-transversalmente-todos-los-detalles-de-despacho)
- [Acción 28: Añadir Material a una Orden desde su Vista de Detalle](#acción-28-añadir-material-a-una-orden-desde-su-vista-de-detalle)
- [Acción 29: Añadir Material a una Orden desde el Menú General de Despachos](#acción-29-añadir-material-a-una-orden-desde-el-menú-general-de-despachos)
- [Acción 30: Editar un Renglón del Modelo Intermedio](#acción-30-editar-un-renglón-del-modelo-intermedio)
- [Acción 31: Eliminar un Renglón del Modelo Intermedio](#acción-31-eliminar-un-renglón-del-modelo-intermedio)

---

# Módulo 1: Catálogo y Tienda Streetwear (`store`)

---

### Acción 01: Ver el Catálogo General de Prendas

* **Objetivo:** Mostrar todas las prendas activas en tarjetas interactivas, con indicadores de stock, precio y badges de estado.
* **Punto de partida en la UI:** Clic en el logo **"UrbanTrend"** o en el enlace **"Catálogo"** de la barra superior.
* **Petición HTTP:** `GET /ropa/`
* **Enrutamiento:**
  - `src/config/urls.py` delega el prefijo `'ropa/'` a `store.urls`.
  - `src/store/urls.py` -> `path('', views.prenda_list, name='list')`.
* **Vista ejecutada (`src/store/views.py`):**
  ```python
  def prenda_list(request):
      prendas = Prenda.objects.filter(activo=True)
      total_catalogo = Prenda.objects.filter(activo=True).count()
      total_stock_global = sum(p.stock for p in Prenda.objects.filter(activo=True))
      total_activas = Prenda.objects.filter(activo=True, disponible=True).count()
      ...
      return render(request, 'store/prenda_list.html', contexto)
  ```
* **Modelo y Base de Datos:**
  - Modelo: `Prenda` en `src/store/models.py`.
  - SQL ejecutado: `SELECT * FROM store_prenda WHERE activo = 1;`
* **Plantilla renderizada:** `src/store/templates/store/prenda_list.html` heredando de `src/core/templates/base.html`.
* **Flujo paso a paso:**
  1. El navegador solicita `GET /ropa/`.
  2. Django resuelve la URL y llama a `prenda_list(request)`.
  3. La vista consulta el ORM filtrando prendas con `activo=True`.
  4. Calcula los totales para las 4 tarjetas de métricas del encabezado.
  5. Pasa el contexto y renderiza la cuadrícula de productos.

---

### Acción 02: Buscar Prendas por Texto (Nombre, Marca o Descripción)

* **Objetivo:** Filtrar los productos del catálogo que contengan un texto ingresado por el usuario.
* **Punto de partida en la UI:** El usuario escribe en la barra de búsqueda `"polo"` y pulsa la tecla `Enter` o el botón **"Buscar"**.
* **Petición HTTP:** `GET /ropa/?q=polo`
* **Enrutamiento:** `store:list` en `src/store/urls.py`.
* **Vista ejecutada (`src/store/views.py`):**
  ```python
  query = request.GET.get('q', '').strip().lower()
  if query:
      prendas = prendas.filter(
          Q(nombre__icontains=query) |
          Q(marca__icontains=query) |
          Q(descripcion__icontains=query)
      )
  ```
* **Modelo y Base de Datos:**
  - SQL generado:
    ```sql
    SELECT * FROM store_prenda 
    WHERE activo = 1 AND (
        nombre LIKE '%polo%' ESCAPE '\' OR 
        marca LIKE '%polo%' ESCAPE '\' OR 
        descripcion LIKE '%polo%' ESCAPE '\'
    );
    ```
* **Plantilla renderizada:** `src/store/templates/store/prenda_list.html` con el campo `input` preservando el texto buscado mediante `value="{{ query }}"`.
* **Flujo paso a paso:**
  1. Se envía el formulario de búsqueda vía `GET`.
  2. La vista captura `request.GET.get('q')`.
  3. Construye una expresión de consulta disyuntiva con objetos `Q(...)`.
  4. La plantilla actualiza el contador de resultados encontrados y muestra solo los ítems coincidentes.

---

### Acción 03: Filtrar Prendas por Tipo de Público

* **Objetivo:** Acotar el catálogo según el segmento (`Hombre`, `Mujer`, `Niños`, `Unisex`).
* **Punto de partida en la UI:** El usuario selecciona una opción en el menú desplegable **"Público / Tipo"** y hace clic en **"Filtrar"**.
* **Petición HTTP:** `GET /ropa/?tipo=Hombre`
* **Vista ejecutada (`src/store/views.py`):**
  ```python
  tipo = request.GET.get('tipo', '').strip()
  if tipo:
      prendas = prendas.filter(tipo=tipo)
  ```
* **Modelo y Base de Datos:**
  - SQL generado: `SELECT * FROM store_prenda WHERE activo = 1 AND tipo = 'Hombre';`
* **Plantilla renderizada:** `src/store/templates/store/prenda_list.html` con la opción correspondiente marcada como `selected`.

---

### Acción 04: Filtrar Prendas por Categoría de Ropa

* **Objetivo:** Filtrar por familia de producto (`Polos`, `Jeans`, `Casacas y Poleras`, etc.).
* **Punto de partida en la UI:** Selección en el desplegable **"Categoría"** y clic en **"Filtrar"**.
* **Petición HTTP:** `GET /ropa/?categoria=Polos`
* **Vista ejecutada (`src/store/views.py`):**
  ```python
  categoria = request.GET.get('categoria', '').strip()
  if categoria:
      prendas = prendas.filter(categoria=categoria)
  ```
* **Modelo y Base de Datos:**
  - SQL generado: `SELECT * FROM store_prenda WHERE activo = 1 AND categoria = 'Polos';`
* **Plantilla renderizada:** `src/store/templates/store/prenda_list.html`. Admite combinación simultánea con búsqueda de texto y tipo de público.

---

### Acción 05: Registrar una Nueva Prenda (con Generación Automática de Ficha Técnica 1:1)

* **Objetivo:** Permitir al administrador registrar una nueva prenda comercial y generar de manera transparente su ficha técnica textil asociada.
* **Punto de partida en la UI:** Clic en el botón verde **"+ Nueva Prenda"** en la cabecera del catálogo.
* **Petición HTTP inicial:** `GET /ropa/nueva/` -> Carga el formulario en blanco.
* **Petición HTTP de envío:** `POST /ropa/nueva/` con el cuerpo de datos del formulario y el token CSRF.
* **Enrutamiento:** `src/store/urls.py` -> `path('nueva/', views.prenda_create, name='create')`.
* **Formulario (`src/store/forms.py`):**
  - Clase: `PrendaForm`
  - Valida campos requeridos: `nombre`, `marca`, `tipo`, `categoria`, `talla`, `precio` (mínimo 0), `stock` (mínimo 0).
* **Vista ejecutada (`src/store/views.py`):**
  ```python
  def prenda_create(request):
      if request.method == 'POST':
          form = PrendaForm(request.POST)
          if form.is_valid():
              Prenda.objects.create(...)
              return redirect('store:list')
      else:
          form = PrendaForm()
      return render(request, 'store/prenda_form.html', {'form': form, 'titulo': 'Registrar Nueva Prenda'})
  ```
* **Intervención de Señal (`src/store/models.py`):**
  Al ejecutarse `Prenda.objects.create()`, Django emite la señal `post_save`:
  ```python
  @receiver(post_save, sender=Prenda)
  def crear_o_actualizar_detalle_prenda(sender, instance, created, **kwargs):
      if created:
          # Determina composición según categoría y crea DetallePrenda (1:1)
          DetallePrenda.objects.create(
              prenda=instance,
              composicion=config['composicion'],
              cuidados=config['cuidados'],
              pais_origen='Perú',
              guia_medidas=f'Talla estándar {instance.talla}'
          )
  ```
* **Base de Datos:**
  1. `INSERT INTO store_prenda (...) VALUES (...);`
  2. `INSERT INTO store_detalleprenda (prenda_id, composicion, cuidados, ...) VALUES (...);`
* **Resultado para el usuario:** Redirección HTTP 302 hacia `/ropa/` donde la nueva prenda aparece inmediatamente listada.

---

### Acción 06: Ver Ficha Detallada de una Prenda y sus Reseñas

* **Objetivo:** Ver toda la información técnica de una prenda (especificaciones de lavado, composición, medidas) y la lista de opiniones dejadas por clientes.
* **Punto de partida en la UI:** Clic en el botón **"Ver Detalle"** en cualquier tarjeta del catálogo.
* **Petición HTTP:** `GET /ropa/<prenda_id>/` (por ejemplo `GET /ropa/2/`).
* **Enrutamiento:** `src/store/urls.py` -> `path('<int:prenda_id>/', views.prenda_detail, name='detail')`.
* **Vista ejecutada (`src/store/views.py`):**
  ```python
  def prenda_detail(request, prenda_id):
      prenda = Prenda.objects.get(id=prenda_id, activo=True)
      resenas = prenda.resenas.all()
      total_resenas = resenas.count()
      promedio = round(sum(r.calificacion for r in resenas) / total_resenas, 1) if total_resenas > 0 else None
      ...
      return render(request, 'store/prenda_detail.html', contexto)
  ```
* **Modelo y Base de Datos:**
  - `SELECT * FROM store_prenda WHERE id = 2 AND activo = 1;`
  - Acceso a 1:1: `prenda.detalle` (`SELECT * FROM store_detalleprenda WHERE prenda_id = 2;`)
  - Acceso a 1:N: `prenda.resenas.all()` (`SELECT * FROM store_resenaprenda WHERE prenda_id = 2 ORDER BY fecha DESC;`)
* **Plantilla renderizada:** `src/store/templates/store/prenda_detail.html`. Muestra las especificaciones de tela, badges de cuidado y la sección para ingresar una nueva reseña.

---

### Acción 07: Publicar una Reseña y Calificación de Estrellas en una Prenda

* **Objetivo:** Permitir a un cliente dejar su nombre, valoración de 1 a 5 estrellas y comentario sobre la prenda.
* **Punto de partida en la UI:** Formulario ubicado al pie de la página de detalle de la prenda. Clic en **"Publicar Reseña"**.
* **Petición HTTP:** `POST /ropa/<prenda_id>/` con los datos: `submit_resena=1`, `cliente_nombre="Carlos"`, `calificacion=5`, `comentario="..."`.
* **Formulario (`src/store/forms.py`):** `ResenaPrendaForm` valida nombre no vacío y calificación válida (1 al 5).
* **Vista ejecutada (`src/store/views.py`):**
  ```python
  if request.method == 'POST' and 'submit_resena' in request.POST:
      resena_form = ResenaPrendaForm(request.POST)
      if resena_form.is_valid():
          ResenaPrenda.objects.create(
              prenda=prenda,
              cliente_nombre=resena_form.cleaned_data['cliente_nombre'],
              calificacion=int(resena_form.cleaned_data['calificacion']),
              comentario=resena_form.cleaned_data['comentario'],
          )
          return redirect('store:detail', prenda_id=prenda.id)
  ```
* **Base de Datos:** `INSERT INTO store_resenaprenda (prenda_id, cliente_nombre, calificacion, comentario, fecha) VALUES (...);`
* **Resultado para el usuario:** Redirección a la misma página `/ropa/<prenda_id>/` donde se visualiza la nueva reseña y el promedio de estrellas recalculado.

---

### Acción 08: Ver Listado con Ficha Técnica Optimizado con `select_related`

* **Objetivo:** Demostración académica del rendimiento ORM trayendo prendas y su ficha técnica 1:1 en una **única consulta SQL con JOIN**.
* **Punto de partida en la UI:** Acceso mediante la URL directa o enlace de laboratorio.
* **Petición HTTP:** `GET /ropa/details/`
* **Enrutamiento:** `src/store/urls.py` -> `path('details/', views.prenda_detail_list, name='prenda_detail_list')`.
* **Vista ejecutada (`src/store/views.py`):**
  ```python
  def prenda_detail_list(request):
      reset_queries()
      prendas = Prenda.objects.filter(activo=True).select_related('detalle')
      lista_prendas = list(prendas)
      total_consultas = len(connection.queries)
      return render(request, 'store/prenda_detail_list.html', {'prendas': lista_prendas, 'total_consultas': total_consultas})
  ```
* **Consulta SQL generada:**
  ```sql
  SELECT store_prenda.id, store_prenda.nombre, ..., store_detalleprenda.composicion, ...
  FROM store_prenda
  LEFT OUTER JOIN store_detalleprenda ON (store_prenda.id = store_detalleprenda.prenda_id)
  WHERE store_prenda.activo = 1;
  ```
* **Plantilla renderizada:** `src/store/templates/store/prenda_detail_list.html` con un badge verde que confirma: **"Consultas SQL ejecutadas: 1"**.

---

### Acción 09: Ver Listado de Pedidos Optimizado con `prefetch_related`

* **Objetivo:** Demostración del rendimiento en relaciones Muchos a Muchos intermedias (`Pedido` -> `DetallePedido` -> `Prenda`), evitando el problema de $N+1$ consultas.
* **Punto de partida en la UI:** Acceso mediante la URL `GET /ropa/orders/`.
* **Vista ejecutada (`src/store/views.py`):**
  ```python
  def pedido_list(request):
      reset_queries()
      pedidos = Pedido.objects.prefetch_related('detalles__prenda')
      lista_pedidos = list(pedidos)
      total_consultas = len(connection.queries)
      return render(request, 'store/pedido_list.html', {'pedidos': lista_pedidos, 'total_consultas': total_consultas})
  ```
* **Consultas SQL ejecutadas:** Exactamente 2 consultas (la primera consulta las cabeceras de pedido y la segunda recupera por lote todos los ítems y prendas con `WHERE pedido_id IN (...)`).
* **Plantilla renderizada:** `src/store/templates/store/pedido_list.html`.

---

# Módulo 2: Logística - Dashboard y Proveedores (`logistics`)

---

### Acción 10: Ver el Dashboard General de Logística

* **Objetivo:** Panel de control con tarjetas resumen de métricas clave (proveedores, sucursales, transportistas, materiales y despachos) y tablas de actividad reciente.
* **Punto de partida en la UI:** En el menú superior **"Logística & Almacén"**, clic en **"Dashboard Logística"**.
* **Petición HTTP:** `GET /logistics/`
* **Enrutamiento:** `src/logistics/urls.py` -> `path('', views.index_logistics, name='index')`.
* **Vista ejecutada (`src/logistics/views.py`):**
  ```python
  def index_logistics(request):
      contexto = {
          'total_proveedores': Proveedor.objects.count(),
          'total_sucursales': Sucursal.objects.count(),
          'total_transportistas': Transportista.objects.filter(activo=True).count(),
          'total_categorias': CategoriaInsumo.objects.count(),
          'total_materiales': Material.objects.count(),
          'total_despachos': OrdenDespacho.objects.count(),
          'total_detalles_despacho': DetalleDespacho.objects.count(),
          'materiales_recientes': Material.objects.select_related('categoria', 'ficha_tecnica').all()[:5],
          'despachos_recientes': OrdenDespacho.objects.select_related('sucursal_destino', 'transportista').all()[:5],
      }
      return render(request, 'logistics/index.html', contexto)
  ```
* **Plantilla renderizada:** `src/logistics/templates/logistics/index.html`.

---

### Acción 11: Listar Directorio de Proveedores

* **Objetivo:** Visualizar la lista de proveedores comerciales registrados con su RUC, razón social, teléfono y correo electrónico.
* **Punto de partida en la UI:** Menú **"Logística & Almacén"** -> Clic en **"Proveedores"**.
* **Petición HTTP:** `GET /logistics/proveedores/`
* **Enrutamiento:** `src/logistics/urls.py` -> `path('proveedores/', views.proveedor_list, name='proveedor_list')`.
* **Vista (`src/logistics/views.py`):**
  ```python
  def proveedor_list(request):
      proveedores = Proveedor.objects.all()
      return render(request, 'logistics/proveedor_list.html', {'proveedores': proveedores})
  ```
* **Plantilla renderizada:** `src/logistics/templates/logistics/proveedor_list.html`.

---

### Acción 12: Registrar un Nuevo Proveedor con Validación de RUC

* **Objetivo:** Dar de alta a una empresa proveedora, garantizando que el RUC sea numérico y de exactamente 11 dígitos.
* **Punto de partida en la UI:** Clic en el botón **"+ Registrar Proveedor"** en la lista de proveedores.
* **Petición HTTP inicial:** `GET /logistics/proveedores/nuevo/`
* **Petición HTTP de envío:** `POST /logistics/proveedores/nuevo/`
* **Formulario y Validación (`src/logistics/forms.py`):**
  ```python
  class ProveedorForm(forms.ModelForm):
      def clean_ruc(self):
          ruc = self.cleaned_data.get('ruc', '').strip()
          if not ruc.isdigit():
              raise forms.ValidationError("El RUC debe contener únicamente dígitos numéricos.")
          if len(ruc) != 11:
              raise forms.ValidationError("El RUC debe contener exactamente 11 dígitos numéricos.")
          return ruc
  ```
* **Vista (`src/logistics/views.py`):**
  ```python
  def proveedor_create(request):
      if request.method == 'POST':
          form = ProveedorForm(request.POST)
          if form.is_valid():
              form.save()
              messages.success(request, "Proveedor registrado exitosamente.")
              return redirect('logistics:proveedor_list')
      else:
          form = ProveedorForm()
      return render(request, 'logistics/proveedor_form.html', {'form': form, 'titulo': 'Registrar Proveedor'})
  ```
* **Resultado para el usuario:** Si el RUC tiene menos de 11 dígitos o letras, el formulario se recarga mostrando el error en rojo. Si es correcto, redirige con mensaje flash de éxito.

---

# Módulo 3: Logística - Categorías de Insumos (`logistics`)

---

### Acción 13: Listar Categorías de Insumos Textiles

* **Objetivo:** Mostrar las familias maestras de insumos (telas, avíos, botones) y cuántos insumos contiene cada una.
* **Punto de partida en la UI:** Menú **"Logística & Almacén"** -> Clic en **"Familias / Categorías (1:N)"**.
* **Petición HTTP:** `GET /logistics/categorias/`
* **Vista (`src/logistics/views.py`):**
  ```python
  def categoria_list(request):
      categorias = CategoriaInsumo.objects.prefetch_related('materiales').all()
      return render(request, 'logistics/categoria_list.html', {'categorias': categorias})
  ```
* **Plantilla renderizada:** `src/logistics/templates/logistics/categoria_list.html`.

---

### Acción 14: Crear una Nueva Categoría de Insumos

* **Objetivo:** Registrar una nueva familia textil en el catálogo maestro.
* **Punto de partida en la UI:** Botón **"+ Nueva Categoría"** en la pantalla de categorías.
* **Petición HTTP:** `GET` para cargar el formulario y `POST /logistics/categorias/nuevo/` con `nombre` y `descripcion`.
* **Vista (`src/logistics/views.py`):**
  ```python
  def categoria_create(request):
      if request.method == 'POST':
          form = CategoriaInsumoForm(request.POST)
          if form.is_valid():
              form.save()
              messages.success(request, "Categoría creada con éxito.")
              return redirect('logistics:categoria_list')
      ...
  ```
* **Resultado para el usuario:** Redirección a `/logistics/categorias/` con alerta verde de confirmación.

---

### Acción 15: Eliminar una Categoría (Protección Referencial con `models.PROTECT`)

* **Objetivo:** Demostrar la regla de negocio de integridad: una categoría no puede ser eliminada si tiene materiales asignados.
* **Punto de partida en la UI:** Clic en el botón rojo **"Eliminar"** de una categoría.
* **Petición HTTP inicial:** `GET /logistics/categorias/eliminar/<pk>/` -> Muestra pantalla de confirmación.
* **Petición HTTP de confirmación:** `POST /logistics/categorias/eliminar/<pk>/`
* **Definición del Modelo (`src/logistics/models.py`):**
  ```python
  class Material(models.Model):
      categoria = models.ForeignKey(CategoriaInsumo, on_delete=models.PROTECT, related_name='materiales')
  ```
* **Manejo en la Vista (`src/logistics/views.py`):**
  ```python
  def categoria_delete(request, pk):
      categoria = get_object_or_404(CategoriaInsumo, pk=pk)
      if request.method == 'POST':
          try:
              categoria.delete()
              messages.warning(request, f'La categoría "{categoria.nombre}" fue eliminada.')
              return redirect('logistics:categoria_list')
          except ProtectedError:
              # Se captura la excepción generada por Django ORM
              messages.error(
                  request,
                  f'Acción bloqueada: No se puede eliminar la categoría "{categoria.nombre}" '
                  f'porque contiene insumos protegidos en inventario.'
              )
              return redirect('logistics:categoria_list')
      return render(request, 'logistics/categoria_confirm_delete.html', {'objeto': categoria})
  ```
* **Resultado para el usuario:**
  - Si la categoría tiene materiales: No se borra y redirige mostrando una alerta roja de bloqueo.
  - Si la categoría está vacía: Se borra de la BD y redirige mostrando una alerta amarilla de eliminación.

---

# Módulo 4: Logística - Insumos y Materiales Textiles (`logistics`)

---

### Acción 16: Listar Insumos y Materiales Textiles

* **Objetivo:** Mostrar la tabla de materias primas con su categoría asignada, unidad de medida, precio unitario, stock disponible y estado de su ficha técnica.
* **Punto de partida en la UI:** Menú **"Logística & Almacén"** -> Clic en **"Materiales Textiles (1:N y 1:1)"**.
* **Petición HTTP:** `GET /logistics/materiales/`
* **Optimización ORM en la Vista (`src/logistics/views.py`):**
  ```python
  def material_list(request):
      # select_related resuelve la categoría (1:N) y la ficha técnica (1:1) en un único SQL JOIN
      materiales = Material.objects.select_related('categoria', 'ficha_tecnica').all()
      return render(request, 'logistics/material_list.html', {'materiales': materiales})
  ```
* **Plantilla renderizada:** `src/logistics/templates/logistics/material_list.html`.

---

### Acción 17: Registrar un Nuevo Material (con Creación Automática de Ficha Técnica 1:1)

* **Objetivo:** Dar de alta un insumo de confección en el inventario y generar automáticamente su ficha técnica textil asociada mediante señales.
* **Punto de partida en la UI:** Clic en **"+ Registrar Insumo"** en la tabla de materiales.
* **Petición HTTP:** `GET /logistics/materiales/nuevo/` y posterior `POST /logistics/materiales/nuevo/`.
* **Formulario (`src/logistics/forms.py`):**
  `MaterialForm` valida que `precio_unitario > 0` con el método `clean_precio_unitario()`.
* **Vista (`src/logistics/views.py`):**
  ```python
  def material_create(request):
      if request.method == 'POST':
          form = MaterialForm(request.POST)
          if form.is_valid():
              material = form.save()
              messages.success(request, f'Material "{material.nombre}" registrado exitosamente con su Ficha Técnica textil.')
              return redirect('logistics:material_list')
      ...
  ```
* **Señal Automática (`src/logistics/models.py`):**
  ```python
  @receiver(post_save, sender=Material)
  def auto_crear_ficha_tecnica(sender, instance, created, **kwargs):
      if created:
          FichaTecnicaMaterial.objects.create(material=instance)
  ```
* **Resultado para el usuario:** El material se registra en `logistics_material` y simultáneamente se crea su registro 1:1 en `logistics_fichatecnicamaterial`. Redirige con mensaje flash de éxito.

---

### Acción 18: Ver Ficha Completa de un Material e Historial de Despachos

* **Objetivo:** Consultar la ficha técnica textil (gramaje, encogimiento, lavado) y el historial de todas las órdenes de despacho en las que se ha enviado este material.
* **Punto de partida en la UI:** Clic en el botón **"Ficha"** en la lista de materiales.
* **Petición HTTP:** `GET /logistics/materiales/<pk>/` (por ejemplo `GET /logistics/materiales/1/`).
* **Vista (`src/logistics/views.py`):**
  ```python
  def material_detail(request, pk):
      material = get_object_or_404(
          Material.objects.select_related('categoria', 'ficha_tecnica'),
          pk=pk
      )
      # Recorrido inverso del modelo intermedio DetalleDespacho:
      despachos_asociados = material.detalles_despacho.select_related('despacho', 'despacho__sucursal_destino').all()
      return render(request, 'logistics/material_detail.html', {
          'material': material,
          'despachos_asociados': despachos_asociados
      })
  ```
* **Plantilla renderizada:** `src/logistics/templates/logistics/material_detail.html`.

---

### Acción 19: Editar un Material Textil Existente

* **Objetivo:** Actualizar el precio unitario, stock en almacén, categoría o nombre de un insumo.
* **Punto de partida en la UI:** Clic en el botón de edición (ícono de lápiz) en la lista de materiales o en su detalle.
* **Petición HTTP:** `GET /logistics/materiales/editar/<pk>/` y posterior `POST /logistics/materiales/editar/<pk>/`.
* **Vista (`src/logistics/views.py`):**
  ```python
  def material_update(request, pk):
      material = get_object_or_404(Material, pk=pk)
      if request.method == 'POST':
          form = MaterialForm(request.POST, instance=material)
          if form.is_valid():
              form.save()
              messages.success(request, f'Material "{material.nombre}" actualizado correctamente.')
              return redirect('logistics:material_list')
      else:
          form = MaterialForm(instance=material)
      return render(request, 'logistics/material_form.html', {'form': form, 'titulo': 'Editar Insumo / Material'})
  ```
* **Resultado para el usuario:** El registro se actualiza y redirige al listado general.

---

### Acción 20: Eliminar un Material Textil

* **Objetivo:** Dar de baja un material del inventario, con confirmación previa.
* **Punto de partida en la UI:** Clic en el botón rojo de papelera en la fila del material.
* **Petición HTTP:** `GET /logistics/materiales/eliminar/<pk>/` y posterior confirmación `POST`.
* **Vista (`src/logistics/views.py`):**
  ```python
  def material_delete(request, pk):
      material = get_object_or_404(Material, pk=pk)
      if request.method == 'POST':
          try:
              material.delete()
              messages.warning(request, f'El material "{material.nombre}" fue eliminado del catálogo.')
              return redirect('logistics:material_list')
          except ProtectedError:
              messages.error(request, f'No se puede eliminar "{material.nombre}" porque está asignado a órdenes activas.')
              return redirect('logistics:material_list')
      return render(request, 'logistics/material_confirm_delete.html', {'objeto': material})
  ```
* **Resultado para el usuario:** Si no tiene despachos asociados, se elimina y también se elimina su ficha técnica en cascada (`on_delete=models.CASCADE`).

---

### Acción 21: Editar la Ficha Técnica Textil 1:1 de un Material

* **Objetivo:** Modificar las especificaciones de calidad del material (densidad en $gr/m^2$, porcentaje de encogimiento, temperatura de lavado y recomendaciones).
* **Punto de partida en la UI:** Clic en **"Editar Ficha Técnica"** en la página de detalle del material.
* **Petición HTTP:** `GET /logistics/fichas-tecnicas/editar/<pk>/` y posterior `POST`.
* **Formulario (`src/logistics/forms.py`):** `FichaTecnicaMaterialForm`.
* **Vista (`src/logistics/views.py`):**
  ```python
  def ficha_tecnica_update(request, pk):
      ficha = get_object_or_404(FichaTecnicaMaterial.objects.select_related('material'), pk=pk)
      if request.method == 'POST':
          form = FichaTecnicaMaterialForm(request.POST, instance=ficha)
          if form.is_valid():
              form.save()
              messages.success(request, f'Ficha Técnica de "{ficha.material.nombre}" actualizada correctamente.')
              return redirect('logistics:material_detail', pk=ficha.material.pk)
      ...
  ```
* **Resultado para el usuario:** Los cambios quedan guardados en `logistics_fichatecnicamaterial` y el usuario es redirigido al detalle del material con los datos actualizados.

---

# Módulo 5: Logística - Órdenes de Despacho (`logistics`)

---

### Acción 22: Listar Órdenes de Despacho (Cabeceras N:M)

* **Objetivo:** Mostrar todas las guías de traslado de materiales emitidas hacia las sucursales, transportistas asignados y estado actual.
* **Punto de partida en la UI:** Menú **"Logística & Almacén"** -> Clic en **"Órdenes de Despacho (N:M)"**.
* **Petición HTTP:** `GET /logistics/despachos/`
* **Vista Optimizada (`src/logistics/views.py`):**
  ```python
  def orden_despacho_list(request):
      despachos = OrdenDespacho.objects.select_related(
          'sucursal_destino', 'transportista'
      ).prefetch_related(
          'detalles__material'
      ).all()
      return render(request, 'logistics/orden_despacho_list.html', {'despachos': despachos})
  ```
* **Plantilla renderizada:** `src/logistics/templates/logistics/orden_despacho_list.html`.

---

### Acción 23: Crear una Nueva Orden de Despacho

* **Objetivo:** Registrar una nueva guía de remisión indicando código de guía, sucursal receptora, empresa de transporte y notas.
* **Punto de partida en la UI:** Clic en el botón azul superior **"+ Nuevo Despacho"** de la barra de navegación o en el botón de la página de despachos.
* **Petición HTTP:** `GET /logistics/despachos/nuevo/` y posterior `POST /logistics/despachos/nuevo/`.
* **Formulario y Limpieza (`src/logistics/forms.py`):**
  ```python
  class OrdenDespachoForm(forms.ModelForm):
      def clean_codigo(self):
          codigo = self.cleaned_data.get('codigo', '').strip().upper()
          return codigo
  ```
* **Vista (`src/logistics/views.py`):**
  ```python
  def orden_despacho_create(request):
      if request.method == 'POST':
          form = OrdenDespachoForm(request.POST)
          if form.is_valid():
              despacho = form.save()
              messages.success(request, f'Orden de despacho {despacho.codigo} creada. Ahora puede agregar materiales.')
              return redirect('logistics:orden_despacho_detail', pk=despacho.pk)
      ...
  ```
* **Resultado para el usuario:** La cabecera se crea en estado `Borrador` y el sistema redirige automáticamente al detalle de la orden para comenzar a asociarle materiales.

---

### Acción 24: Ver Detalle de una Orden de Despacho y sus Materiales

* **Objetivo:** Ver la guía de despacho completa: datos de destino, transportista, listado de materiales incluidos (renglones del modelo intermedio), lotes, subtotales y el costo total acumulado.
* **Punto de partida en la UI:** Clic en el código de la orden (por ejemplo `DSP-2026-001`) o en el botón **"Ver Detalle"**.
* **Petición HTTP:** `GET /logistics/despachos/<pk>/`
* **Vista (`src/logistics/views.py`):**
  ```python
  def orden_despacho_detail(request, pk):
      despacho = get_object_or_404(
          OrdenDespacho.objects.select_related('sucursal_destino', 'transportista').prefetch_related('detalles__material'),
          pk=pk
      )
      return render(request, 'logistics/orden_despacho_detail.html', {'despacho': despacho})
  ```
* **Cálculos en el Modelo (`src/logistics/models.py`):**
  ```python
  @property
  def total_unidades(self):
      return sum(d.cantidad_despachada for d in self.detalles.all())

  @property
  def costo_total(self):
      return sum(d.subtotal for d in self.detalles.all())
  ```
* **Plantilla renderizada:** `src/logistics/templates/logistics/orden_despacho_detail.html`. Incluye la tabla de materiales despachados con botones directos para editar o retirar cada ítem.

---

### Acción 25: Editar Cabecera de una Orden de Despacho

* **Objetivo:** Modificar el estado del despacho (`Borrador`, `En Tránsito`, `Entregado`), cambiar transportista o actualizar observaciones.
* **Punto de partida en la UI:** Clic en el botón **"Editar Orden"** dentro del detalle de la orden.
* **Petición HTTP:** `GET /logistics/despachos/editar/<pk>/` y posterior `POST`.
* **Vista (`src/logistics/views.py`):**
  ```python
  def orden_despacho_update(request, pk):
      despacho = get_object_or_404(OrdenDespacho, pk=pk)
      if request.method == 'POST':
          form = OrdenDespachoForm(request.POST, instance=despacho)
          if form.is_valid():
              form.save()
              messages.success(request, f'Orden de despacho {despacho.codigo} actualizada.')
              return redirect('logistics:orden_despacho_detail', pk=despacho.pk)
      ...
  ```
* **Resultado para el usuario:** Actualiza la orden en BD y redirige a la vista de detalle con los nuevos datos.

---

### Acción 26: Eliminar una Orden de Despacho (Borrado en Cascada)

* **Objetivo:** Cancelar y eliminar una orden de traslado completa, eliminando también sus renglones asociados.
* **Punto de partida en la UI:** Clic en **"Eliminar Orden"** en la vista de detalle de la orden.
* **Petición HTTP:** `GET /logistics/despachos/eliminar/<pk>/` y posterior `POST` de confirmación.
* **Efecto en Base de Datos:**
  Por regla `on_delete=models.CASCADE` en `DetalleDespacho.despacho`, SQLite elimina primero los registros hijos en `logistics_detalledespacho` y luego la fila en `logistics_ordendespacho`. Los materiales del catálogo no se alteran.
* **Resultado para el usuario:** Redirección a `/logistics/despachos/` con alerta informativa de eliminación.

---

# Módulo 6: Logística - Modelo Intermedio: Detalles de Despacho (`logistics`)

---

### Acción 27: Listar Transversalmente todos los Detalles de Despacho

* **Objetivo:** Consultar la tabla global de todos los renglones transaccionales de envío registrados en la empresa (auditoría del modelo intermedio).
* **Punto de partida en la UI:** Menú **"Logística & Almacén"** -> Clic en **"Detalle Despachos (CRUD Intermedio)"**.
* **Petición HTTP:** `GET /logistics/detalles-despacho/`
* **Vista (`src/logistics/views.py`):**
  ```python
  def detalle_despacho_list(request):
      detalles = DetalleDespacho.objects.select_related(
          'despacho', 'despacho__sucursal_destino', 'material'
      ).all()
      return render(request, 'logistics/detalle_despacho_list.html', {'detalles': detalles})
  ```
* **Plantilla renderizada:** `src/logistics/templates/logistics/detalle_despacho_list.html`. Muestra despacho, sucursal de destino, material, cantidad despachada, costo histórico congelado, lote y subtotal calculado.

---

### Acción 28: Añadir Material a una Orden desde su Vista de Detalle

* **Objetivo:** Agregar un nuevo material textil a una orden de despacho específica, teniendo la orden ya preseleccionada en el formulario.
* **Punto de partida en la UI:** Clic en el botón verde **"+ Añadir Material a la Orden"** dentro de `logistics/despachos/<id>/`.
* **Petición HTTP inicial:** `GET /logistics/detalles-despacho/nuevo/<despacho_id>/`
* **Petición HTTP de envío:** `POST /logistics/detalles-despacho/nuevo/<despacho_id>/`
* **Formulario y Validaciones (`src/logistics/forms.py`):**
  - Valida que `cantidad_despachada > 0`.
  - Valida que `costo_unitario_historico > 0`.
  - Convierte el `lote_produccion` a mayúsculas (ej. `LOTE-2026-TX01`).
* **Vista (`src/logistics/views.py`):**
  ```python
  def detalle_despacho_create(request, despacho_id=None):
      initial_data = {}
      despacho_obj = None
      if despacho_id:
          despacho_obj = get_object_or_404(OrdenDespacho, pk=despacho_id)
          initial_data['despacho'] = despacho_obj

      if request.method == 'POST':
          form = DetalleDespachoForm(request.POST)
          if form.is_valid():
              detalle = form.save()
              messages.success(request, f'Material "{detalle.material.nombre}" añadido al despacho {detalle.despacho.codigo}.')
              return redirect('logistics:orden_despacho_detail', pk=detalle.despacho.pk)
      else:
          form = DetalleDespachoForm(initial=initial_data)
      ...
  ```
* **Base de Datos:**
  `INSERT INTO logistics_detalledespacho (despacho_id, material_id, cantidad_despachada, costo_unitario_historico, lote_produccion, observaciones) VALUES (...);`
* **Resultado para el usuario:** Redirección inmediata a la orden donde el nuevo material aparece en la lista y los totales se recalculan automáticamente.

---

### Acción 29: Añadir Material a una Orden desde el Menú General de Despachos

* **Objetivo:** Registrar un renglón de despacho seleccionando manualmente tanto la orden receptora como el insumo a despachar.
* **Punto de partida en la UI:** Clic en **"+ Añadir Material a Despacho"** en la página global de detalles de despacho (`/logistics/detalles-despacho/`).
* **Petición HTTP:** `GET /logistics/detalles-despacho/nuevo/` y posterior `POST`.
* **Flujo:** Es idéntico a la [Acción 28](#acción-28-añadir-material-a-una-orden-desde-su-vista-de-detalle), con la diferencia de que el campo `despacho` se presenta como un menú desplegable abierto para que el operador elija cualquier orden activa.

---

### Acción 30: Editar un Renglón del Modelo Intermedio

* **Objetivo:** Modificar los atributos propios de un envío ya registrado (corregir la cantidad despachada, el costo unitario congelado, el número de lote o las notas de entrega).
* **Punto de partida en la UI:** Clic en el botón azul de edición (ícono de lápiz) en la fila del material dentro del detalle de la orden.
* **Petición HTTP:** `GET /logistics/detalles-despacho/editar/<pk>/` y posterior `POST`.
* **Vista (`src/logistics/views.py`):**
  ```python
  def detalle_despacho_update(request, pk):
      detalle = get_object_or_404(DetalleDespacho.objects.select_related('despacho', 'material'), pk=pk)
      if request.method == 'POST':
          form = DetalleDespachoForm(request.POST, instance=detalle)
          if form.is_valid():
              form.save()
              messages.success(request, f'Detalle de despacho ({detalle.material.nombre}) actualizado correctamente.')
              return redirect('logistics:orden_despacho_detail', pk=detalle.despacho.pk)
      else:
          form = DetalleDespachoForm(instance=detalle)
      return render(request, 'logistics/detalle_despacho_form.html', {'form': form, 'detalle': detalle})
  ```
* **Resultado para el usuario:** Se actualiza el renglón en la base de datos y se redirige a la orden de despacho, reflejando el nuevo subtotal del ítem y el nuevo costo total de la orden.

---

### Acción 31: Eliminar / Desvincular un Material de una Orden de Despacho

* **Objetivo:** Retirar un material de una orden de traslado sin eliminar el material del catálogo ni borrar la orden de despacho.
* **Punto de partida en la UI:** Clic en el botón rojo de papelera en la fila del ítem dentro del detalle de la orden.
* **Petición HTTP inicial:** `GET /logistics/detalles-despacho/eliminar/<pk>/` -> Muestra pantalla de confirmación.
* **Petición HTTP de confirmación:** `POST /logistics/detalles-despacho/eliminar/<pk>/`
* **Vista (`src/logistics/views.py`):**
  ```python
  def detalle_despacho_delete(request, pk):
      detalle = get_object_or_404(DetalleDespacho.objects.select_related('despacho', 'material'), pk=pk)
      despacho_pk = detalle.despacho.pk
      if request.method == 'POST':
          material_nombre = detalle.material.nombre
          detalle.delete()  # Elimina ÚNICAMENTE la fila intermedia en logistics_detalledespacho
          messages.warning(request, f'Se retiró el material "{material_nombre}" de la orden de despacho.')
          return redirect('logistics:orden_despacho_detail', pk=despacho_pk)
      return render(request, 'logistics/detalle_despacho_confirm_delete.html', {'objeto': detalle, 'despacho_pk': despacho_pk})
  ```
* **Efecto en la Base de Datos:**
  `DELETE FROM logistics_detalledespacho WHERE id = <pk>;`
* **Resultado para el usuario:** El material se desvincula de la guía, la orden de despacho descuenta las unidades y el monto del material retirado, y el usuario ve un mensaje flash amarillo de confirmación.

---

## 📊 Matriz Resumen de Rutas, Vistas y Operaciones CRUD

| # | Acción de Usuario | Método | Ruta URL | Vista Ejecutada | Modelo Principal | Plantilla Renderizada |
|---|-------------------|--------|----------|-----------------|------------------|-----------------------|
| 1 | Ver Catálogo | `GET` | `/ropa/` | `prenda_list` | `Prenda` | `store/prenda_list.html` |
| 2 | Buscar Prendas | `GET` | `/ropa/?q=...` | `prenda_list` | `Prenda` (Filtro Q) | `store/prenda_list.html` |
| 3 | Filtrar por Público | `GET` | `/ropa/?tipo=...` | `prenda_list` | `Prenda` | `store/prenda_list.html` |
| 4 | Filtrar por Categoría | `GET` | `/ropa/?categoria=...`| `prenda_list` | `Prenda` | `store/prenda_list.html` |
| 5 | Crear Prenda | `POST` | `/ropa/nueva/` | `prenda_create` | `Prenda` + `DetallePrenda` (1:1 Signal) | `store/prenda_form.html` |
| 6 | Ver Detalle Prenda | `GET` | `/ropa/<id>/` | `prenda_detail` | `Prenda`, `DetallePrenda`, `Resena` | `store/prenda_detail.html` |
| 7 | Calificar / Reseñar | `POST` | `/ropa/<id>/` | `prenda_detail` | `ResenaPrenda` (1:N) | `store/prenda_detail.html` |
| 8 | Test `select_related` | `GET` | `/ropa/details/` | `prenda_detail_list` | `Prenda` (1:1 JOIN) | `store/prenda_detail_list.html` |
| 9 | Test `prefetch_related`| `GET`| `/ropa/orders/` | `pedido_list` | `Pedido` (N:M In-memory) | `store/pedido_list.html` |
| 10| Dashboard Logística | `GET` | `/logistics/` | `index_logistics` | Multi-modelo (Conteos) | `logistics/index.html` |
| 11| Listar Proveedores | `GET` | `/logistics/proveedores/` | `proveedor_list` | `Proveedor` | `logistics/proveedor_list.html` |
| 12| Crear Proveedor | `POST` | `/logistics/proveedores/nuevo/`| `proveedor_create` | `Proveedor` (RUC 11 dig) | `logistics/proveedor_form.html` |
| 13| Listar Categorías | `GET` | `/logistics/categorias/` | `categoria_list` | `CategoriaInsumo` | `logistics/categoria_list.html` |
| 14| Crear Categoría | `POST` | `/logistics/categorias/nuevo/` | `categoria_create` | `CategoriaInsumo` | `logistics/categoria_form.html` |
| 15| Eliminar Categoría | `POST` | `/logistics/categorias/eliminar/<id>/` | `categoria_delete` | `CategoriaInsumo` (`PROTECT`) | `categoria_confirm_delete.html` |
| 16| Listar Materiales | `GET` | `/logistics/materiales/` | `material_list` | `Material` (JOIN 1:N y 1:1) | `logistics/material_list.html` |
| 17| Crear Material | `POST` | `/logistics/materiales/nuevo/` | `material_create` | `Material` + `FichaTecnica` (1:1 Signal)| `logistics/material_form.html` |
| 18| Detalle de Material | `GET` | `/logistics/materiales/<id>/` | `material_detail` | `Material`, `Ficha`, `Detalles` | `logistics/material_detail.html` |
| 19| Editar Material | `POST` | `/logistics/materiales/editar/<id>/` | `material_update` | `Material` | `logistics/material_form.html` |
| 20| Eliminar Material | `POST` | `/logistics/materiales/eliminar/<id>/` | `material_delete` | `Material` (CASCADE Ficha) | `material_confirm_delete.html` |
| 21| Editar Ficha Técnica | `POST` | `/logistics/fichas-tecnicas/editar/<id>/` | `ficha_tecnica_update`| `FichaTecnicaMaterial` (1:1) | `ficha_tecnica_form.html` |
| 22| Listar Despachos | `GET` | `/logistics/despachos/` | `orden_despacho_list`| `OrdenDespacho` | `orden_despacho_list.html` |
| 23| Crear Despacho | `POST` | `/logistics/despachos/nuevo/` | `orden_despacho_create`| `OrdenDespacho` | `orden_despacho_form.html` |
| 24| Detalle de Despacho | `GET` | `/logistics/despachos/<id>/` | `orden_despacho_detail`| `OrdenDespacho` (Subtotales) | `orden_despacho_detail.html` |
| 25| Editar Despacho | `POST` | `/logistics/despachos/editar/<id>/` | `orden_despacho_update`| `OrdenDespacho` | `orden_despacho_form.html` |
| 26| Eliminar Despacho | `POST` | `/logistics/despachos/eliminar/<id>/` | `orden_despacho_delete`| `OrdenDespacho` (CASCADE) | `orden_despacho_confirm_delete.html`|
| 27| Listar Detalles N:M | `GET` | `/logistics/detalles-despacho/` | `detalle_despacho_list`| `DetalleDespacho` (Intermedio) | `detalle_despacho_list.html` |
| 28| Añadir Ítem a Orden | `POST` | `/logistics/detalles-despacho/nuevo/<desp_id>/` | `detalle_despacho_create`| `DetalleDespacho` (Preseleccionado) | `detalle_despacho_form.html` |
| 29| Añadir Ítem General | `POST` | `/logistics/detalles-despacho/nuevo/` | `detalle_despacho_create`| `DetalleDespacho` | `detalle_despacho_form.html` |
| 30| Editar Ítem Despacho| `POST` | `/logistics/detalles-despacho/editar/<id>/` | `detalle_despacho_update`| `DetalleDespacho` (4 atributos) | `detalle_despacho_form.html` |
| 31| Retirar Ítem Despacho| `POST` | `/logistics/detalles-despacho/eliminar/<id>/`| `detalle_despacho_delete`| `DetalleDespacho` (Desvinculación) | `detalle_despacho_confirm_delete.html`|
