// Datos escritos a mano con la forma de GET /api/prendas/ (Semana 8):
// los decimales llegan como texto.
const prendas = [
  { id: 1, nombre: 'Polo Oversize Rebel Classic', marca: 'Rebel', talla: 'L', precio: '89.90', stock: 20 },
  { id: 2, nombre: 'Hoodie Doggis Street Corp', marca: 'Doggis Clothing', talla: 'M', precio: '159.90', stock: 8 },
  { id: 3, nombre: 'Jean Baggy Rasec Wide Leg', marca: 'Rasec', talla: '32', precio: '179.00', stock: 0 },
  { id: 4, nombre: 'Casaca Selva Alegre Windbreaker', marca: 'Selva Alegre', talla: 'XL', precio: '219.90', stock: 5 },
  { id: 5, nombre: 'Polera Cosa Nostra Crewneck', marca: 'Cosa Nostra', talla: 'M', precio: '139.90', stock: 12 },
]

function App() {
  const nombreApp = 'UrbanTrend'

  return (
    <div>
      <h1>{nombreApp} — Catálogo Streetwear</h1>
      <ul>
        {prendas.map((p) => (
          <li key={p.id}>
            {p.nombre} ({p.marca}, talla {p.talla}) — S/ {Number(p.precio).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
