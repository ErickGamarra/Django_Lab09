from django.test import TestCase
from django.urls import reverse
from .models import item


class ItemModelTests(TestCase):
    """Tests para el modelo item"""

    def test_crear_item_con_nombre_y_descripcion(self):
        obj = item.objects.create(
            name="Laptop",
            description="Laptop para desarrollo"
        )
        self.assertEqual(obj.name, "Laptop")
        self.assertEqual(obj.description, "Laptop para desarrollo")

    def test_crear_item_sin_descripcion(self):
        # description tiene blank=True, así que debe permitirse vacío
        obj = item.objects.create(name="Mouse")
        self.assertEqual(obj.description, "")

    def test_created_at_se_asigna_automaticamente(self):
        obj = item.objects.create(name="Teclado")
        self.assertIsNotNone(obj.created_at)

    def test_str_devuelve_el_nombre(self):
        obj = item.objects.create(name="Monitor")
        self.assertEqual(str(obj), "Monitor")


class ItemsListViewTests(TestCase):
    """Tests para la vista items_list"""

    def setUp(self):
        # Se ejecuta antes de cada test: creamos datos de prueba
        item.objects.create(name="Item 1", description="Primer item")
        item.objects.create(name="Item 2", description="Segundo item")

    def test_vista_responde_200(self):
        response = self.client.get(reverse('item_list'))
        self.assertEqual(response.status_code, 200)

    def test_vista_usa_template_correcto(self):
        response = self.client.get(reverse('item_list'))
        self.assertTemplateUsed(response, "core/item_list.html")

    def test_vista_muestra_todos_los_items(self):
        response = self.client.get(reverse('item_list'))
        self.assertEqual(len(response.context['items']), 2)

    def test_vista_incluye_nombres_en_el_contenido(self):
        response = self.client.get(reverse('item_list'))
        self.assertContains(response, "Item 1")
        self.assertContains(response, "Item 2")

    def test_vista_sin_items_no_falla(self):
        item.objects.all().delete()
        response = self.client.get(reverse('item_list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.context['items']), 0)