export interface User {
    id: string
    name: string
    email: string
    createdAt: string
    updatedAt: string
    orders?: Order[]
}

export interface Category {
    id: string
    name: string
    description?: string | null
    status: boolean
    createdAt: string
    updatedAt: string
    products?: Product[]
}

export interface Product {
    id: string
    name: string
    description?: string | null
    price: number
    stock: number
    imageUrl?: string   
    status: boolean
    categoryId: string
    category?: Category
}

export interface Order {
    id: string
    userId: string
    total: number
    status: OrderStatus
    createdAt: string
    updatedAt: string

    user?: User
    items?: OrderItem[]
}

export interface OrderItem {
    id: string
    orderId: string
    productId: string
    quantity: number
    price: number
    order?: Order
    product?: Product
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'
