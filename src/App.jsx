import { useEffect, useState } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)
        setLoading(false)
      })
  }, [])

  const filtered = products.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ fontFamily: 'Segoe UI, Arial', background: '#f0f4ff', minHeight: '100vh', padding: '0', margin: '0' }}>
      <div style={{ background: 'linear-gradient(90deg, #4f46e5, #06b6d4)', padding: '30px 20px', color: 'white', textAlign: 'center' }}>
        <h1 style={{ margin: '0', fontSize: '32px' }}>AUREX WEEK 2</h1>
        <p style={{ margin: '10px 0 0', fontSize: '18px', opacity: '0.9' }}>API Dashboard - Products Explorer</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px 0', flexWrap: 'wrap' }}>
          <div style={{ background: 'white', padding: '15px 25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h3 style={{ margin: '0', color: '#4f46e5' }}>{products.length}</h3>
            <p style={{ margin: '5px 0 0', fontSize: '14px' }}>Total Products</p>
          </div>
          <div style={{ background: 'white', padding: '15px 25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h3 style={{ margin: '0', color: '#06b6d4' }}>{filtered.length}</h3>
            <p style={{ margin: '5px 0 0', fontSize: '14px' }}>Filtered Results</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search products by name..."
            style={{ padding: '14px 20px', width: '90%', maxWidth: '400px', borderRadius: '30px', border: '2px solid #e0e7ff', outline: 'none', fontSize: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
          />
        </div>

        {loading ? <h2 style={{ textAlign: 'center' }}>Loading API data...</h2> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {filtered.map(p => (
              <div key={p.id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', transition: '0.3s' }}>
                <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '15px' }}>
                  <h3 style={{ margin: '0 0 8px', fontSize: '16px', height: '40px', overflow: 'hidden' }}>{p.title}</h3>
                  <p style={{ margin: '0', color: '#6b7280', fontSize: '13px' }}>{p.category} • ⭐ {p.rating}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#4f46e5' }}>${p.price}</span>
                    <span style={{ background: p.stock < 10 ? '#fee2e2' : '#dcfce7', color: p.stock < 10 ? '#dc2626' : '#16a34a', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>
                      {p.stock} left
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <p style={{ textAlign: 'center', marginTop: '40px', color: '#9ca3af', fontSize: '14px' }}>Built by Mehak • Powered by DummyJSON API</p>
      </div>
    </div>
  )
}

export default App