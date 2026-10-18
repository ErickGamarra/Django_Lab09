import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from store.models import Prenda, Pedido, DetallePedido


def seed():
    prendas = list(Prenda.objects.all()[:4])
    if len(prendas) < 4:
        print("Ejecute primero seed_prendas.py")
        return

    datos = [
        ("PED-001", "Lucía Ramos", "lucia@example.com", "Pagado", [(0, 2), (1, 1)]),
        ("PED-002", "Marco Díaz", "marco@example.com", "Pendiente", [(2, 1)]),
        ("PED-003", "Ana Torres", "ana@example.com", "Entregado", [(1, 1), (3, 2)]),
    ]
    for codigo, nombre, email, estado, items in datos:
        pedido, creado = Pedido.objects.get_or_create(
            codigo=codigo,
            defaults={'cliente_nombre': nombre, 'cliente_email': email, 'estado': estado},
        )
        if creado:
            for idx, cantidad in items:
                DetallePedido.objects.create(
                    pedido=pedido, prenda=prendas[idx],
                    cantidad=cantidad, precio_unitario=prendas[idx].precio,
                )
    print(f"Pedidos registrados: {Pedido.objects.count()}")


if __name__ == '__main__':
    seed()
