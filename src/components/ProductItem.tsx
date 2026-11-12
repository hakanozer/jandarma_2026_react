import React from 'react'
import type { Product } from '../models/productsModel'
import { Link } from 'react-router-dom'

function ProductItem(props: { item: Product }) {
  return (
    <section key={props.item.id} className="xsm:col-12 sm:col-12 md:col-6 lg:col-4 card">
        <img src={props.item.images[0]} className="card-img-top" alt="..." />
        <div className="card-body">
        <h4 className="card-title">{props.item.title}</h4>
        <p className="card-text">{props.item.price}₺</p>
        <Link to={`/productDetail/${props.item.id}`} className="btn-solid theme-primary">Detay</Link>
        </div>
    </section>
  )
}

export default ProductItem