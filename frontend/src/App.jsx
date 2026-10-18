import './App.css'

// Datos escritos a mano con la forma de GET /api/prendas/ (Semana 8):
// los decimales llegan como texto.
const prendas = [
  { id: 1, nombre: 'Polo Oversize Rebel Classic', marca: 'Rebel', talla: 'L', precio: '89.90', stock: 20 },
  { id: 2, nombre: 'Hoodie Doggis Street Corp', marca: 'Doggis Clothing', talla: 'M', precio: '159.90', stock: 8 },
  { id: 3, nombre: 'Jean Baggy Rasec Wide Leg', marca: 'Rasec', talla: '32', precio: '179.00', stock: 0 },
  { id: 4, nombre: 'Casaca Selva Alegre Windbreaker', marca: 'Selva Alegre', talla: 'XL', precio: '219.90', stock: 5 },
  { id: 5, nombre: 'Polera Cosa Nostra Crewneck', marca: 'Cosa Nostra', talla: 'M', precio: '139.90', stock: 12 },
]

// Datos escritos a mano con la forma de GET /api/pedidos/ (Semana 8):
// cada pedido trae su propio arreglo de detalles (relación 1:N).
const pedidos = [
  {
    id: 1,
    codigo: 'PED-001',
    cliente_nombre: 'Lucía Ramos',
    estado: 'Pagado',
    detalles: [
      { id: 1, prenda_nombre: 'Polo Oversize Rebel Classic', cantidad: 2, precio_unitario: '89.90' },
      { id: 2, prenda_nombre: 'Hoodie Doggis Street Corp', cantidad: 1, precio_unitario: '159.90' },
    ],
  },
  {
    id: 2,
    codigo: 'PED-002',
    cliente_nombre: 'Marco Díaz',
    estado: 'Pendiente',
    detalles: [
      { id: 3, prenda_nombre: 'Jean Baggy Rasec Wide Leg', cantidad: 1, precio_unitario: '179.00' },
    ],
  },
  {
    id: 3,
    codigo: 'PED-003',
    cliente_nombre: 'Ana Torres',
    estado: 'Entregado',
    detalles: [
      { id: 4, prenda_nombre: 'Hoodie Doggis Street Corp', cantidad: 1, precio_unitario: '159.90' },
      { id: 5, prenda_nombre: 'Casaca Selva Alegre Windbreaker', cantidad: 2, precio_unitario: '219.90' },
    ],
  },
]

// Parte 2 — investigación propia (logistics).
// Datos escritos a mano con la forma de GET /api/materiales/ (Semana 8).
const materiales = [
  { id: 1, categoria_nombre: 'Telas y Tejidos', nombre: 'Tela Algodón Pima 50/1 Negro', unidad_medida: 'Metros', precio_unitario: '34.50', stock: 450 },
  { id: 2, categoria_nombre: 'Telas y Tejidos', nombre: 'Tela Franela Reactiva Oversize Crema', unidad_medida: 'Metros', precio_unitario: '28.00', stock: 320 },
  { id: 3, categoria_nombre: 'Telas y Tejidos', nombre: 'Tela Rib 2x1 Spandex Negro', unidad_medida: 'Metros', precio_unitario: '22.50', stock: 180 },
  { id: 4, categoria_nombre: 'Avíos y Fornituras', nombre: 'Cierre Metálico N° 5 Niquelado 60cm', unidad_medida: 'Piezas', precio_unitario: '3.80', stock: 1200 },
  { id: 6, categoria_nombre: 'Hilados y Conos', nombre: 'Cono Hilo Poliéster 40/2 Negro', unidad_medida: 'Conos', precio_unitario: '8.50', stock: 0 },
]

// Datos escritos a mano con la forma de GET /api/proveedores/ (Semana 8).
const proveedores = [
  { id: 1, ruc: '20601234567', razon_social: 'Textiles del Sur S.A.C.', telefono: '987654321', correo: 'contacto@textilesdelsur.com' },
  { id: 2, ruc: '20512345678', razon_social: 'Hilanderías Peruanas E.I.R.L.', telefono: '976543210', correo: 'ventas@hilanderiasperu.com' },
  { id: 3, ruc: '20498765432', razon_social: 'Avíos & Cierres Industriales S.A.', telefono: '954321098', correo: 'operaciones@aviosindustriales.pe' },
]

// Datos escritos a mano con la forma de GET /api/despachos/ (Semana 8):
// cada orden trae su arreglo de detalles (modelo intermedio DetalleDespacho
// de la relación N:M entre OrdenDespacho y Material).
const despachos = [
  {
    id: 1,
    codigo: 'DSP-2026-001',
    sucursal_nombre: 'Tienda Flagship Miraflores',
    transportista_empresa: 'Logística Express SAC',
    estado: 'En Tránsito',
    detalles: [
      { id: 1, material_nombre: 'Tela Algodón Pima 50/1 Negro', cantidad_despachada: 120, costo_unitario_historico: '34.50', lote_produccion: 'LOTE-2026-TX01' },
      { id: 2, material_nombre: 'Tela Rib 2x1 Spandex Negro', cantidad_despachada: 60, costo_unitario_historico: '22.50', lote_produccion: 'LOTE-2026-TX02' },
    ],
  },
  {
    id: 2,
    codigo: 'DSP-2026-002',
    sucursal_nombre: 'Almacén Central Ate',
    transportista_empresa: 'Transportes Andinos SRL',
    estado: 'Borrador',
    detalles: [
      { id: 3, material_nombre: 'Cierre Metálico N° 5 Niquelado 60cm', cantidad_despachada: 300, costo_unitario_historico: '3.80', lote_produccion: 'LOTE-2026-AV01' },
    ],
  },
]

const costoDespacho = (orden) =>
  orden.detalles.reduce((acum, d) => acum + d.cantidad_despachada * Number(d.costo_unitario_historico), 0)

const totalPedido = (pedido) =>
  pedido.detalles.reduce((acum, d) => acum + d.cantidad * Number(d.precio_unitario), 0)

function App() {
  const nombreApp = 'UrbanTrend'

  return (
    <div className="contenedor">
      <h1 className="titulo">{nombreApp} — Catálogo Streetwear</h1>

      {prendas.length === 0 ? (
        <p>No hay registros</p>
      ) : (
        <ul className="lista">
          {prendas.map((p) => (
            <li key={p.id} className="tarjeta">
              {p.nombre} ({p.marca}, talla {p.talla}) — S/ {Number(p.precio).toFixed(2)} —{' '}
              {p.stock === 0 ? (
                <span className="etiqueta agotado">Agotado</span>
              ) : (
                <span className="etiqueta">Stock: {p.stock}</span>
              )}
              {p.stock > 0 && p.stock <= 5 && (
                <span className="etiqueta alerta">¡Últimas unidades!</span>
              )}
            </li>
          ))}
        </ul>
      )}

      <h2>Pedidos y sus detalles</h2>
      {pedidos.length === 0 ? (
        <p>No hay registros</p>
      ) : (
        <ul className="lista">
          {pedidos.map((pedido) => (
            <li key={pedido.id} className="tarjeta">
              <strong>{pedido.codigo}</strong> — {pedido.cliente_nombre} ({pedido.estado})
              <ul>
                {pedido.detalles.map((d) => (
                  <li key={d.id}>
                    {d.cantidad} × {d.prenda_nombre} — S/ {(d.cantidad * Number(d.precio_unitario)).toFixed(2)}
                  </li>
                ))}
              </ul>
              <strong style={{ color: '#0f766e' }}>Total: S/ {totalPedido(pedido).toFixed(2)}</strong>
            </li>
          ))}
        </ul>
      )}

      <h2>Parte 2 — Logística e insumos textiles</h2>

      <h3>Materiales</h3>
      {materiales.length === 0 ? (
        <p className="vacio">No hay registros</p>
      ) : (
        <ul className="lista">
          {materiales.map((m) => (
            <li key={m.id} className="tarjeta">
              <strong>{m.nombre}</strong> · {m.categoria_nombre} — S/ {Number(m.precio_unitario).toFixed(2)} por{' '}
              {m.unidad_medida.toLowerCase()}
              {m.stock === 0 ? (
                <span className="etiqueta agotado">Sin stock</span>
              ) : (
                <span className="etiqueta">Stock: {m.stock}</span>
              )}
              {m.stock > 0 && m.stock < 200 && (
                <span className="etiqueta alerta" style={{ fontWeight: 700 }}>Stock bajo</span>
              )}
            </li>
          ))}
        </ul>
      )}

      <h3>Proveedores</h3>
      {proveedores.length === 0 ? (
        <p className="vacio">No hay registros</p>
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

      <h3>Órdenes de despacho y sus materiales</h3>
      {despachos.length === 0 ? (
        <p className="vacio">No hay registros</p>
      ) : (
        <ul className="lista">
          {despachos.map((orden) => (
            <li key={orden.id} className="tarjeta">
              <strong>{orden.codigo}</strong> → {orden.sucursal_nombre} · {orden.transportista_empresa} ({orden.estado})
              <ul>
                {orden.detalles.map((d) => (
                  <li key={d.id}>
                    {d.cantidad_despachada} × {d.material_nombre} ({d.lote_produccion}) — S/{' '}
                    {(d.cantidad_despachada * Number(d.costo_unitario_historico)).toFixed(2)}
                  </li>
                ))}
              </ul>
              <strong style={{ color: '#0f766e' }}>
                {orden.detalles.length} {orden.detalles.length === 1 ? 'material' : 'materiales'} · Costo total: S/{' '}
                {costoDespacho(orden).toFixed(2)}
              </strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
