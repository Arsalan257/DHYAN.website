export interface Product {
    id: number
    name: string
    price: number
    image: string
  }
  
  export const products: Product[] = [
    {
      id: 1,
      name: "Whey Protein",
      price: 49,
      image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1337&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      name: "Yoga Mat",
      price: 25,
      image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      name: "Dumbbells",
      price: 60,
      image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e"
    },
    {
      id: 4,
      name: "Fitness Bottle",
      price: 15,
      image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde"
    }
  ]