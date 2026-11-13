import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchProducts } from '../services/productService'
import type { Product } from '../models/productsModel'
import ProductItem from './ProductItem'

function Search() {

  const [products, setProducts] = useState<Product[]>([])
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')
  useEffect(() => {
    if (query) {
      setProducts([])
      const qq = query.trim()
      searchProducts(qq).then(res => {
        // ürünler bulundu
        setProducts(res.data.data)
      }).catch(() => {
        // ürün yok
        console.log('Ürün bulunamadı')
      })
    }
  }, [query])

  return (
    <>
      <h2>Search: {query}</h2>
      {products.length === 0 && query && (
        <p>Ürün bulunamadı</p>
      )}
      <div className='row'>
        {products.map(item => (
            <ProductItem key={item.id} item={item} />
        ))}
       </div>
    </>
  )
}

export default Search