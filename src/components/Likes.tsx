import React, { useEffect, useState } from 'react'
import { likesArr } from '../utils/likesControl'
import { getProductDetail } from '../services/productService';
import type { Product } from '../models/productsModel';
import axios from 'axios';
import ProductItem from './ProductItem';
import useLikeStore, { type LikeStore } from '../store/useLikeStore';

function Likes() {

  const likesArr = useLikeStore((state:LikeStore) => state.likes)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {

    setLoading(true)
    axios.all(likesArr.map(id => getProductDetail(''+id))).then(responses => {
        setProducts(responses.map(res => res.data.data))
    }).finally(() => setLoading(false))

  }, [likesArr])


  return (
    <>
      <h2>Likes</h2>

      {loading && (
      <div className='d-flex justify-content-center align-items-center'>
        <div className="spinner-border" style={{width: '3rem', height: '3rem'}}  role="status">
          <span className="visually-hidden">Loading…</span>
        </div>
      </div>
      )}

      <div className='row'>
        {products.map(item => (
            <ProductItem key={item.id} item={item} />
        ))}
      </div>
    </>
  )
}

export default Likes