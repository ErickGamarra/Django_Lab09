function App() {
  const nombreApp = 'UrbanTrend'
  const precio = 89.9
  const IGV = 0.18

  const precioConIgv = (valor) => (valor * (1 + IGV)).toFixed(2)

  return (
    <div>
      <h1>{nombreApp} — Catálogo Streetwear</h1>
      <p>Polo Oversize Rebel Classic: S/ {precio.toFixed(2)}</p>
      <p>Precio con IGV (18%): S/ {precioConIgv(precio)}</p>
    </div>
  )
}

export default App
