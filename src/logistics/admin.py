from django.contrib import admin
from .models import (
    Proveedor,
    Sucursal,
    Transportista,
    CategoriaInsumo,
    Material,
    FichaTecnicaMaterial,
    OrdenDespacho,
    DetalleDespacho,
)

# ==============================================================================
# PARTE 2: ADMINISTRACIÓN DEL MÓDULO LOGÍSTICO (INVESTIGACIÓN PROPIA)
# Cumplimiento riguroso de los 9 criterios de evaluación
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. ENTIDADES INDEPENDIENTES
# ------------------------------------------------------------------------------

@admin.register(Proveedor)
class ProveedorAdmin(admin.ModelAdmin):
    list_display = ('razon_social', 'ruc', 'telefono', 'correo')
    search_fields = ('razon_social', 'ruc')


@admin.register(Sucursal)
class SucursalAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'ciudad', 'direccion', 'capacidad_almacen')
    list_filter = ('ciudad',)
    search_fields = ('nombre', 'ciudad')


@admin.register(Transportista)
class TransportistaAdmin(admin.ModelAdmin):
    list_display = ('empresa', 'placa', 'tipo_vehiculo', 'activo')
    list_filter = ('activo', 'tipo_vehiculo')
    search_fields = ('empresa', 'placa')


# ------------------------------------------------------------------------------
# 2. ENTIDADES RELACIONADAS (1:N) Y EXTENSIÓN 1:1 CON STACKEDINLINE
# ------------------------------------------------------------------------------

@admin.register(CategoriaInsumo)
class CategoriaInsumoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')
    search_fields = ('nombre',)


class FichaTecnicaInline(admin.StackedInline):
    model = FichaTecnicaMaterial
    can_delete = False
    verbose_name = "Ficha Técnica Textil (Relación 1:1)"
    verbose_name_plural = "Ficha Técnica Textil (Relación 1:1)"
    extra = 0


@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria', 'unidad_medida', 'precio_unitario', 'stock')
    list_filter = ('categoria',)
    search_fields = ('nombre',)
    inlines = [FichaTecnicaInline]

    def save_model(self, request, obj, form, change):
        obj._from_admin = True
        super().save_model(request, obj, form, change)

    def save_formset(self, request, form, formset, change):
        if formset.model == FichaTecnicaMaterial:
            instances = formset.save(commit=False)
            for instance in instances:
                existing = FichaTecnicaMaterial.objects.filter(material=form.instance).first()
                if existing:
                    instance.pk = existing.pk
                    instance.id = existing.id
                    instance._state.adding = False
                instance.material = form.instance
                instance.save()
            for obj in formset.deleted_objects:
                obj.delete()
            formset.save_m2m()
            return
        super().save_formset(request, form, formset, change)


@admin.register(FichaTecnicaMaterial)
class FichaTecnicaMaterialAdmin(admin.ModelAdmin):
    list_display = ('material', 'composicion', 'densidad_gramaje', 'temperatura_lavado', 'fecha_emision_certificado')
    search_fields = ('material__nombre', 'composicion')


# ------------------------------------------------------------------------------
# 3. RELACIÓN N:M Y MODELO INTERMEDIO (THROUGH) CON TABULARINLINE
# ------------------------------------------------------------------------------

class DetalleDespachoInline(admin.TabularInline):
    model = DetalleDespacho
    extra = 1
    fields = (
        'material',
        'cantidad_despachada',
        'costo_unitario_historico',
        'lote_produccion',
        'observaciones',
        'get_subtotal',
    )
    readonly_fields = ('get_subtotal',)
    verbose_name = "Material Despachado"
    verbose_name_plural = "Detalle de Materiales Despachados (Modelo Intermedio: DetalleDespacho)"

    @admin.display(description="Subtotal (S/)")
    def get_subtotal(self, obj):
        if obj and obj.pk:
            return f"S/ {obj.subtotal:.2f}"
        return "—"


@admin.register(OrdenDespacho)
class OrdenDespachoAdmin(admin.ModelAdmin):
    list_display = (
        'codigo',
        'sucursal_destino',
        'transportista',
        'estado',
        'fecha_emision',
        'get_total_unidades',
        'get_costo_total',
    )
    list_filter = ('estado', 'sucursal_destino')
    search_fields = ('codigo', 'sucursal_destino__nombre')
    inlines = [DetalleDespachoInline]

    @admin.display(description="Total Unidades")
    def get_total_unidades(self, obj):
        return obj.total_unidades

    @admin.display(description="Costo Total (S/)")
    def get_costo_total(self, obj):
        return f"S/ {obj.costo_total:.2f}"


@admin.register(DetalleDespacho)
class DetalleDespachoAdmin(admin.ModelAdmin):
    list_display = (
        'despacho',
        'material',
        'cantidad_despachada',
        'costo_unitario_historico',
        'lote_produccion',
        'get_subtotal',
    )
    list_filter = ('despacho__estado',)
    search_fields = ('despacho__codigo', 'material__nombre', 'lote_produccion')

    @admin.display(description="Subtotal (S/)")
    def get_subtotal(self, obj):
        return f"S/ {obj.subtotal:.2f}"
