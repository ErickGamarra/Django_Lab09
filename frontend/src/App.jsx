import './App.css'

// Datos escritos a mano con la misma forma que las respuestas de la API REST
// de la Semana 8 (los decimales llegan como texto).

// GET /api/prendas/
const prendas = [
  { id: 1, nombre: 'Polo Oversize Rebel Classic', marca: 'Rebel', tipo: 'Unisex', categoria: 'Polos', talla: 'L', precio: '89.90', stock: 20, disponible: true, activo: true },
  { id: 2, nombre: 'Hoodie Doggis Street Corp', marca: 'Doggis Clothing', tipo: 'Hombre', categoria: 'Casacas y Poleras', talla: 'M', precio: '159.90', stock: 8, disponible: true, activo: true },
  { id: 3, nombre: 'Jean Baggy Rasec Wide Leg', marca: 'Rasec', tipo: 'Unisex', categoria: 'Jeans', talla: '32', precio: '179.00', stock: 0, disponible: true, activo: true },
  { id: 4, nombre: 'Casaca Selva Alegre Windbreaker', marca: 'Selva Alegre', tipo: 'Unisex', categoria: 'Casacas y Poleras', talla: 'XL', precio: '219.90', stock: 5, disponible: true, activo: true },
  { id: 5, nombre: 'Polera Cosa Nostra Crewneck', marca: 'Cosa Nostra', tipo: 'Hombre', categoria: 'Casacas y Poleras', talla: 'M', precio: '139.90', stock: 12, disponible: true, activo: true },
]

// GET /api/pedidos/ (cada pedido trae su arreglo de detalles)
const pedidos = [
  {
    id: 1, codigo: 'PED-001', cliente_nombre: 'Lucía Ramos', estado: 'Pagado',
    detalles: [
      { id: 1, prenda: 1, prenda_nombre: 'Polo Oversize Rebel Classic', cantidad: 2, precio_unitario: '89.90' },
      { id: 2, prenda: 2, prenda_nombre: 'Hoodie Doggis Street Corp', cantidad: 1, precio_unitario: '159.90' },
    ],
  },
  {
    id: 2, codigo: 'PED-002', cliente_nombre: 'Marco Díaz', estado: 'Pendiente',
    detalles: [
      { id: 3, prenda: 3, prenda_nombre: 'Jean Baggy Rasec Wide Leg', cantidad: 1, precio_unitario: '179.00' },
    ],
  },
  {
    id: 3, codigo: 'PED-003', cliente_nombre: 'Ana Torres', estado: 'Entregado',
    detalles: [
      { id: 4, prenda: 2, prenda_nombre: 'Hoodie Doggis Street Corp', cantidad: 1, precio_unitario: '159.90' },
      { id: 5, prenda: 4, prenda_nombre: 'Casaca Selva Alegre Windbreaker', cantidad: 2, precio_unitario: '219.90' },
    ],
  },
]

// GET /api/materiales/
const materiales = [
  { id: 1, categoria: 1, categoria_nombre: 'Telas y Tejidos', nombre: 'Tela Algodón Pima 50/1 Negro', unidad_medida: 'Metros', precio_unitario: '34.50', stock: 450 },
  { id: 2, categoria: 1, categoria_nombre: 'Telas y Tejidos', nombre: 'Tela Franela Reactiva Oversize Crema', unidad_medida: 'Metros', precio_unitario: '28.00', stock: 320 },
  { id: 3, categoria: 1, categoria_nombre: 'Telas y Tejidos', nombre: 'Tela Rib 2x1 Spandex Negro', unidad_medida: 'Metros', precio_unitario: '22.50', stock: 180 },
  { id: 4, categoria: 2, categoria_nombre: 'Avíos y Fornituras', nombre: 'Cierre Metálico N° 5 Niquelado 60cm', unidad_medida: 'Piezas', precio_unitario: '3.80', stock: 1200 },
  { id: 6, categoria: 3, categoria_nombre: 'Hilados y Conos', nombre: 'Cono Hilo Poliéster 40/2 Negro', unidad_medida: 'Conos', precio_unitario: '8.50', stock: 0 },
]

// GET /api/proveedores/
const proveedores = [
  { id: 1, ruc: '20601234567', razon_social: 'Textiles del Sur S.A.C.', telefono: '987654321', correo: 'contacto@textilesdelsur.com' },
  { id: 2, ruc: '20512345678', razon_social: 'Hilanderías Peruanas E.I.R.L.', telefono: '976543210', correo: 'ventas@hilanderiasperu.com' },
  { id: 3, ruc: '20498765432', razon_social: 'Avíos & Cierres Industriales S.A.', telefono: '954321098', correo: 'operaciones@aviosindustriales.pe' },
]

// GET /api/despachos/ (relación N:M a través de DetalleDespacho)
const despachos = [
  {
    id: 1, codigo: 'DSP-2026-001', sucursal_nombre: 'Tienda Flagship Miraflores',
    transportista_empresa: 'Logística Express SAC', estado: 'En Tránsito',
    detalles: [
      { id: 1, material: 1, material_nombre: 'Tela Algodón Pima 50/1 Negro', cantidad_despachada: 120, costo_unitario_historico: '34.50', lote_produccion: 'LOTE-2026-TX01' },
      { id: 2, material: 3, material_nombre: 'Tela Rib 2x1 Spandex Negro', cantidad_despachada: 60, costo_unitario_historico: '22.50', lote_produccion: 'LOTE-2026-TX02' },
    ],
  },
  {
    id: 2, codigo: 'DSP-2026-002', sucursal_nombre: 'Almacén Central Ate',
    transportista_empresa: 'Transportes Andinos SRL', estado: 'Borrador',
    detalles: [
      { id: 3, material: 4, material_nombre: 'Cierre Metálico N° 5 Niquelado 60cm', cantidad_despachada: 300, costo_unitario_historico: '3.80', lote_produccion: 'LOTE-2026-AV01' },
    ],
  },
]

const IGV = 0.18

const soles = (valor) => `S/ ${Number(valor).toFixed(2)}`

const totalDetalles = (detalles, campoCantidad, campoPrecio) =>
  detalles.reduce((acum, d) => acum + d[campoCantidad] * Number(d[campoPrecio]), 0)

function ListaVacia() {
  return <p className="vacio">No hay registros</p>
}

function App() {
  const nombreApp = 'UrbanTrend'
  const valorInventario = prendas.reduce((acum, p) => acum + Number(p.precio) * p.stock, 0)

  return (
    <div className="contenedor">
      <header className="cabecera">
        <h1>{nombreApp} — Interfaz React</h1>
        <p>
          Valor del inventario de prendas: {soles(valorInventario)} (con IGV:{' '}
          {soles(valorInventario * (1 + IGV))})
        </p>
      </header>

      {/* ===================== PARTE 1: tienda (store) ===================== */}
      <section>
        <h2>Parte 1 — Tienda de ropa</h2>

        <h3>Prendas</h3>
        {prendas.length === 0 ? (
          <ListaVacia />
        ) : (
          <ul className="lista">
            {prendas.map((p) => (
              <li key={p.id} className="tarjeta">
                <strong>{p.nombre}</strong> · {p.marca} · talla {p.talla}
                <div>
                  {soles(p.precio)}{' '}
                  {p.stock === 0 ? (
                    <span className="etiqueta agotado">Agotado</span>
                  ) : (
                    <span className="etiqueta">Stock: {p.stock}</span>
                  )}
                  {p.stock > 0 && p.stock <= 5 && (
                    <span className="etiqueta alerta">¡Últimas unidades!</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        <h3>Pedidos y sus detalles (1:N)</h3>
        {pedidos.length === 0 ? (
          <ListaVacia />
        ) : (
          <ul className="lista">
            {pedidos.map((pedido) => (
              <li key={pedido.id} className="tarjeta">
                <strong>{pedido.codigo}</strong> · {pedido.cliente_nombre} · {pedido.estado}
                <ul>
                  {pedido.detalles.map((d) => (
                    <li key={d.id}>
                      {d.cantidad} × {d.prenda_nombre} — {soles(d.cantidad * Number(d.precio_unitario))}
                    </li>
                  ))}
                </ul>
                <p className="total" style={{ color: '#0f766e' }}>
                  Total: {soles(totalDetalles(pedido.detalles, 'cantidad', 'precio_unitario'))}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ============== PARTE 2: investigación propia (logistics) ============== */}
      <section>
        <h2>Parte 2 — Logística e insumos textiles</h2>

        <h3>Materiales</h3>
        {materiales.length === 0 ? (
          <ListaVacia />
        ) : (
          <ul className="lista">
            {materiales.map((m) => (
              <li key={m.id} className="tarjeta">
                <strong>{m.nombre}</strong> · {m.categoria_nombre}
                <div>
                  {soles(m.precio_unitario)} por {m.unidad_medida.toLowerCase()}{' '}
                  {m.stock === 0 ? (
                    <span className="etiqueta agotado">Sin stock</span>
                  ) : (
                    <span className="etiqueta">Stock: {m.stock}</span>
                  )}
                  {m.stock > 0 && m.stock < 200 && (
                    <span className="etiqueta alerta">Stock bajo</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        <h3>Proveedores</h3>
        {proveedores.length === 0 ? (
          <ListaVacia />
        ) : (
          <ul className="lista">
            {proveedores.map((pr) => (
              <li key={pr.id} className="tarjeta">
                <strong>{pr.razon_social}</strong> · RUC {pr.ruc}
                <div>{pr.correo} · {pr.telefono}</div>
              </li>
            ))}
          </ul>
        )}

        <h3>Órdenes de despacho y sus detalles (N:M)</h3>
        {despachos.length === 0 ? (
          <ListaVacia />
        ) : (
          <ul className="lista">
            {despachos.map((o) => (
              <li key={o.id} className="tarjeta">
                <strong>{o.codigo}</strong> → {o.sucursal_nombre} · {o.transportista_empresa} · {o.estado}
                <ul>
                  {o.detalles.map((d) => (
                    <li key={d.id}>
                      {d.cantidad_despachada} × {d.material_nombre} ({d.lote_produccion}) —{' '}
                      {soles(d.cantidad_despachada * Number(d.costo_unitario_historico))}
                    </li>
                  ))}
                </ul>
                <p className="total" style={{ color: '#0f766e' }}>
                  {o.detalles.length} {o.detalles.length === 1 ? 'material' : 'materiales'} · Costo total:{' '}
                  {soles(totalDetalles(o.detalles, 'cantidad_despachada', 'costo_unitario_historico'))}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default App
