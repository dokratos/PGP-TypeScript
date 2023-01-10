export interface IProduct{
    id: number
    name: string,
    description: string,
    image: string,
    price: number,
    stock: number,
    category: string
}

export interface ICartItem{
    cart_id: number,
    id: number,
    name: string,
    price: number,
    product_id: number,
    quantity:number
}