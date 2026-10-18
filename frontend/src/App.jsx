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
    </div>
  )
}

export default App
