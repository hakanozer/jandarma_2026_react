
import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NotFount() {

  const navigate = useNavigate()
  useEffect(() => {
    
  }, [])

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center text-center">
        <div className="col-12 col-md-10 col-lg-7">

          {/* 404 Icon */}
          <div className="mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light text-primary"
              style={{ width: '120px', height: '120px' }}
            >
              <i className="bi bi-exclamation-triangle fg-danger fs-6xl"></i>
            </div>
          </div>

          {/* Error Code */}
          <h1 className="display-1 fw-bold text-primary mb-2">
            404
          </h1>

          {/* Title */}
          <h2 className="fw-bold mb-3">
            Sayfa Bulunamadı!
          </h2>

          {/* Description */}
          <p className="text-secondary fs-5 mb-4">
            Aradığınız sayfa mevcut değil, taşınmış veya kaldırılmış olabilir.
            Lütfen URL adresini kontrol edin ya da geri dönerek
            başka bir sayfayı ziyaret edin.
          </p>

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-primary btn-lg px-4 rounded-pill"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Geri Dön
          </button>

        </div>
      </div>
    </div>
  )
}

export default NotFount
