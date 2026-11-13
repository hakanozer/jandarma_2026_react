import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductDetail } from '../services/productService'
import type { Product } from '../models/productsModel'
import { likesArr, toggleLikeFnc } from '../utils/likesControl'
import useLikeStore, { type LikeStore } from '../store/useLikeStore'

function ProductDetail() {

 const changeLikes = useLikeStore((state:LikeStore) => state.changeLikes)
 const [product, setProduct] = useState<Product | null>(null)
 const [activeImage, setActiveImage] = useState<string>('')

 const params = useParams()
 useEffect(() => {
    if (params.id) {
        getProductDetail(params.id).then(res => {
            setProduct(res.data.data)
            // İlk resim varsayılan olarak büyük resimde görünür
            setActiveImage(res.data.data?.images?.[0] ?? '')
        })
    }
 }, [])

  // ---- Yardımcı hesaplamalar ----
  const discountedPrice = (p: Product) =>
    p.price - (p.price * p.discountPercentage) / 100

  const formatPrice = (value: number) =>
    value.toLocaleString('tr-TR', { style: 'currency', currency: 'USD' })

  const stockInfo = (stock: number) => {
    if (stock <= 0) return { text: 'Stokta yok', cls: 'text-bg-danger', icon: 'bi-x-circle' }
    if (stock <= 10) return { text: `Son ${stock} adet`, cls: 'text-bg-warning', icon: 'bi-exclamation-triangle' }
    return { text: `Stokta var (${stock} adet)`, cls: 'text-bg-success', icon: 'bi-check-circle' }
  }

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      let icon = 'bi-star'
      if (rating >= i) icon = 'bi-star-fill'
      else if (rating >= i - 0.5) icon = 'bi-star-half'
      stars.push(<i key={i} className={`bi ${icon} text-warning me-1`}></i>)
    }
    return stars
  }


  const [isLike, setIsLike] = useState(false)
  const toggleLike = () => {
    setIsLike(!isLike)
    const pid = product!.id
    toggleLikeFnc(pid)
    changeLikes(likesArr())
  }

  useEffect(() => {
    const arr = likesArr()
    const index = arr.findIndex(item => item === Number(params.id))
    if (index > -1) {
        setIsLike(true)
    }
  }, [])

  return (
    <>
    {product &&
        <>
            <style>{`
              .pd-price-box {
                background: linear-gradient(135deg, #0f766e 0%, #115e59 100%);
                color: #fff;
                border-radius: 1rem;
              }
              .pd-old-price { text-decoration: line-through; opacity: .75; }
              .pd-discount-badge { background: #fbbf24; color: #1f2937; font-weight: 700; }
              .pd-info-item { border: 1px solid rgba(0,0,0,.08); border-radius: .75rem; background: #fff; }
              .pd-main-image-wrap {
                background: #f8f9fa;
                border-radius: 1rem;
                aspect-ratio: 1 / 1;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                border: 1px solid rgba(0,0,0,.08);
              }
              .pd-main-image {
                width: 100%;
                height: 100%;
                object-fit: contain;
                transition: opacity .25s ease;
              }
              .pd-thumbs {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
                gap: .5rem;
              }
              .pd-thumb {
                aspect-ratio: 1 / 1;
                padding: 0;
                background: #f8f9fa;
                border: 2px solid transparent;
                border-radius: .75rem;
                overflow: hidden;
                cursor: pointer;
                opacity: .7;
                transition: opacity .15s ease, border-color .15s ease, transform .15s ease;
              }
              .pd-thumb:hover { opacity: 1; transform: translateY(-2px); }
              .pd-thumb:focus-visible { outline: 3px solid #0f766e; outline-offset: 2px; }
              .pd-thumb.active { border-color: #0f766e; opacity: 1; }
              .pd-thumb img { width: 100%; height: 100%; object-fit: cover; }
            `}</style>

            <h2 className="mb-3">{product.title}</h2>

            <div className="row g-4">

                {/* ============ SOL TARAF: ÜRÜN BİLGİLERİ ============ */}
                <div className='sm:col-6 col-12 col-md-6'>

                    {/* Marka, kategori, puan */}
                    <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                        <span className="badge text-bg-dark">
                            <i className="bi bi-patch-check me-1"></i>{product.brand}
                        </span>
                        <span className="badge text-bg-secondary">
                            <i className="bi bi-grid me-1"></i>{product.category}
                        </span>
                        <span className="ms-auto small text-body-secondary">
                            {renderStars(product.rating)}
                            <strong className="text-body">{product.rating.toFixed(1)}</strong> / 5
                        </span>
                    </div>

                    {/* Açıklama */}
                    <p className="text-body-secondary mb-4">{product.description}</p>

                    {/* Fiyat kutusu */}
                    <div className="pd-price-box p-4 mb-4 shadow-sm">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                            <span className="small opacity-75">
                                <i className="bi bi-tag me-1"></i>Size özel fiyat
                            </span>
                            {product.discountPercentage > 0 &&
                                <span className="badge pd-discount-badge fs-6">
                                    <i className="bi bi-lightning-charge-fill me-1"></i>
                                    %{product.discountPercentage.toFixed(0)} indirim
                                </span>
                            }
                        </div>
                        <div className="d-flex align-items-baseline flex-wrap gap-3">
                            <span className="display-5 fw-bold">
                                {formatPrice(discountedPrice(product))}
                            </span>
                            {product.discountPercentage > 0 &&
                                <span className="fs-5 pd-old-price">{formatPrice(product.price)}</span>
                            }
                        </div>
                        {product.discountPercentage > 0 &&
                            <div className="mt-2 small">
                                <i className="bi bi-piggy-bank me-1"></i>
                                {formatPrice(product.price - discountedPrice(product))} tasarruf ediyorsunuz
                            </div>
                        }
                        <hr className="my-3 border-light opacity-25" />
                        <div className="d-flex flex-wrap gap-3 small">
                            <span><i className="bi bi-shield-check me-1"></i>Güvenli ödeme</span>
                            <span><i className="bi bi-truck me-1"></i>Hızlı teslimat</span>
                            <span><i className="bi bi-arrow-repeat me-1"></i>Kolay iade</span>
                        </div>
                    </div>

                    {/* Stok, minimum sipariş, SKU */}
                    <div className="row g-2 mb-4">
                        <div className="col-12 col-sm-4">
                            <div className="pd-info-item p-3 h-100">
                                <div className="small text-body-secondary mb-1">
                                    <i className="bi bi-box-seam me-1"></i>Stok durumu
                                </div>
                                <span className={`badge ${stockInfo(product.stock).cls}`}>
                                    <i className={`bi ${stockInfo(product.stock).icon} me-1`}></i>
                                    {stockInfo(product.stock).text}
                                </span>
                            </div>
                        </div>
                        <div className="col-6 col-sm-4">
                            <div className="pd-info-item p-3 h-100">
                                <div className="small text-body-secondary mb-1">
                                    <i className="bi bi-cart-plus me-1"></i>Min. sipariş
                                </div>
                                <strong>{product.minimumOrderQuantity} adet</strong>
                            </div>
                        </div>
                        <div className="col-6 col-sm-4">
                            <div className="pd-info-item p-3 h-100">
                                <div className="small text-body-secondary mb-1">
                                    <i className="bi bi-upc-scan me-1"></i>Ürün kodu
                                </div>
                                <strong className="text-break">{product.sku}</strong>
                            </div>
                        </div>
                    </div>

                    {/* Etiketler */}
                    {product.tags && product.tags.length > 0 &&
                        <div className="mb-2">
                            <div className="small text-body-secondary mb-2">
                                <i className="bi bi-tags me-1"></i>Etiketler
                            </div>
                            <div className="d-flex flex-wrap gap-2">
                                {product.tags.map(tag => (
                                    <span key={tag} className="badge rounded-pill text-bg-light border">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    }
                    <i role='button' onClick={toggleLike} className={`bi ${isLike ? 'bi-suit-heart-fill fg-danger' : 'bi-suit-heart'}`} style={{fontSize: '30px'}}></i>
                </div>

                {/* ============ SAĞ TARAF: RESİM GALERİSİ ============ */}
                <div className='sm:col-6 col-12 col-md-6'>

                    {/* Büyük resim */}
                    <div className="pd-main-image-wrap mb-3">
                        {activeImage
                            ? <img className="pd-main-image" src={activeImage} alt={product.title} />
                            : <i className="bi bi-image fs-1 text-body-secondary"></i>
                        }
                    </div>

                    {/* Küçük resimler (thumbnail) */}
                    {product.images && product.images.length > 1 &&
                        <div className="pd-thumbs">
                            {product.images.map((img, index) => (
                                <button
                                    type="button"
                                    key={index}
                                    className={`pd-thumb ${img === activeImage ? 'active' : ''}`}
                                    onClick={() => setActiveImage(img)}
                                    aria-label={`${product.title} resim ${index + 1}`}
                                    aria-pressed={img === activeImage}
                                >
                                    <img src={img} alt={`${product.title} ${index + 1}`} />
                                </button>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </>
    }
    </>
  )
}

export default ProductDetail
