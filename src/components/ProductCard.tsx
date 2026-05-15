import { Product } from "../data/productDatabase"

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-xl transition">

      <img
        src={product.image}
        className="h-40 object-cover rounded-lg"
      />

      <h3 className="mt-3 font-semibold">{product.name}</h3>

      <p className="text-green-600 font-bold">${product.price}</p>

      <button className="mt-auto bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
        Add to Cart
      </button>

    </div>
  )
}

export default ProductCard