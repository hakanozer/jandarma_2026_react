import React, { useEffect, useState } from 'react'
import { getProducts } from '../services/productService'
import type { Product } from '../models/productsModel'
import { Link } from 'react-router-dom'

function Products() {

  const [products, setProducts] = useState<Product[]>([])
  const [pages, setPages] = useState<number[]>([])
  const [activePage, setActivePage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    gelAllPro(1)
  }, [])

  const gelAllPro = (page: number) => {
    setLoading(true)
    setProducts([])
    getProducts(page,10).then(res => { 
      setProducts(res.data.data)
      generatePages(res.data.meta.pagination.total_pages)
      setActivePage(res.data.meta.pagination.page)
      setLoading(false)
    })
  }

  const generatePages = (totalPages: number) => {
    const pagesArray = []
    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i)
    }
    setPages(pagesArray)
  }


  return (
    <>
      <h2>Products</h2>



      <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-end">
        {pages.map(page => (
          <li onClick={() => gelAllPro(page)} key={page} className={`page-item ${activePage === page ? 'active' : ''}`}><a className="page-link" href="#">{page}</a></li>
        ))}
      </ul>
    </nav>

    {loading && (
      <div className='d-flex justify-content-center align-items-center'>
        <div className="spinner-border" style={{width: '3rem', height: '3rem'}}  role="status">
          <span className="visually-hidden">Loading…</span>
        </div>
      </div>
      )}

      <div className='row'>
        {products.map(item => (
            <section key={item.id} className="xsm:col-12 sm:col-12 md:col-6 lg:col-4 card">
              <img src={item.images[0]} className="card-img-top" alt="..." />
              <div className="card-body">
                <h4 className="card-title">{item.title}</h4>
                <p className="card-text">{item.price}₺</p>
                <Link to={`/productDetail/${item.id}`} className="btn-solid theme-primary">Detay</Link>
              </div>
            </section>
        ))}
       </div>
    </>
     
  )
}

export default Products