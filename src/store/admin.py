from django.contrib import admin
from .models import Prenda, DetallePrenda, ResenaPrenda, Pedido, DetallePedido

# ============================================================
# EJERCICIO 6: Exponer relación 1:1 con StackedInline
# ============================================================
class DetallePrendaInline(admin.StackedInline):
    model = DetallePrenda
    can_delete = False
    verbose_name = "Ficha Complementaria (Detalle 1:1)"
    verbose_name_plural = "Ficha Complementaria (Detalle 1:1 de la Prenda)"
    extra = 0


# ============================================================
# EJERCICIO 7: Exponer relación N:M con TabularInline
# Expone el modelo intermedio (through) DetallePedido en formato de tabla
# mostrando sus atributos propios (cantidad, precio_unitario, subtotal)
# ============================================================
class DetallePedidoInline(admin.TabularInline):
    model = DetallePedido
    extra = 1
    fields = ('prenda', 'cantidad', 'precio_unitario', 'get_subtotal')
    readonly_fields = ('get_subtotal',)
    verbose_name = "Prenda del Pedido"
    verbose_name_plural = "Prendas Incluidas (Modelo Intermedio: DetallePedido)"

    @admin.display(description="Subtotal (S/)")
    def get_subtotal(self, obj):
        if obj and obj.pk:
            return f"S/ {obj.subtotal():.2f}"
        return "—"


# ============================================================
# ModelAdmin Personalizados
# ============================================================

@admin.register(Prenda)
class PrendaAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'nombre',
        'marca',
        'tipo',
        'categoria',
        'talla',
        'precio',
        'stock',
        'disponible',
        'activo',
    )
    search_fields = ('nombre', 'marca', 'descripcion')
    list_filter = (
        'tipo',
        'categoria',
        'disponible',
        'activo',
    )
    list_editable = ('precio', 'stock', 'disponible', 'activo')
    inlines = [DetallePrendaInline]

    def save_model(self, request, obj, form, change):
        # Señalamos que la prenda proviene del Django Admin para evitar duplicidad con la señal post_save
        obj._from_admin = True
        super().save_model(request, obj, form, change)

    def save_formset(self, request, form, formset, change):
        # Manejo seguro de la relación 1:1 para evitar UNIQUE constraint en DetallePrenda
        if formset.model == DetallePrenda:
            instances = formset.save(commit=False)
            for instance in instances:
                existing = DetallePrenda.objects.filter(prenda=form.instance).first()
                if existing:
                    instance.pk = existing.pk
                    instance.id = existing.id
                    instance._state.adding = False
                instance.prenda = form.instance
                instance.save()
            for obj in formset.deleted_objects:
                obj.delete()
            formset.save_m2m()
            return
        super().save_formset(request, form, formset, change)


@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'codigo',
        'cliente_nombre',
        'cliente_email',
        'estado',
        'fecha_creacion',
        'get_total',
    )
    search_fields = ('codigo', 'cliente_nombre', 'cliente_email')
    list_filter = (
        'estado',
        'fecha_creacion',
    )
    # EJERCICIO 7: Se incorpora el TabularInline para gestionar la relación N:M
    inlines = [DetallePedidoInline]

    @admin.display(description="Total (S/)")
    def get_total(self, obj):
        return f"S/ {obj.total():.2f}"


@admin.register(ResenaPrenda)
class ResenaPrendaAdmin(admin.ModelAdmin):
    list_display = ('id', 'prenda', 'cliente_nombre', 'calificacion', 'fecha')
    search_fields = ('prenda__nombre', 'cliente_nombre', 'comentario')
    list_filter = (
        'calificacion',
        'fecha',
    )
