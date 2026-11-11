import config from "./config"
import type { ProductDetailModel, ProductsModel } from "../models/productsModel"

export const getProducts = (page: number, per_page: number) => { 
    const sendData = {
        page,
        per_page
    }
    return config.get<ProductsModel>("/products", { params: sendData })
}

export const getProductDetail = (id: string) => {
    return config.get<ProductDetailModel>(`/products/${id}`)
}