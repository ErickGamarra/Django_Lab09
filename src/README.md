# UrbanTrend — Sistema Web y Administración Django (Lab 05)

**Curso:** Desarrollo de Aplicaciones Empresariales — Tecsup  
**Integrantes:** Erick Arturo Gamarra Mundaca & Jesús Enrique Rocha Bobadilla  
**Aplicaciones:** `store` (Catálogo y Pedidos) y `logistics` (Insumos y Despacho Textil)  

Este directorio contiene el código fuente Django estructurado con persistencia SQLite y administración integral mediante **Django Admin**, con soporte de:
- Modelos relacionales: 1:1 (`OneToOneField`), 1:N (`ForeignKey`) y N:M (`ManyToManyField` con `through`).
- Clases `ModelAdmin` con `list_display`, `search_fields`, `list_filter` y `list_editable`.
- Formularios Inlines: `StackedInline` para relaciones 1:1 y `TabularInline` para relaciones intermedias N:M.

Para consultar la documentación completa, diagrama relacional y matriz de cumplimiento de evaluación, revise el archivo principal:  
👉 [`../README.md`](../README.md)