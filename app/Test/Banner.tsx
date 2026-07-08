/* eslint-disable @next/next/no-img-element */

const products = [
    {
      id: 1,
      name: 'Apple Iphone 14 Pro',
      href: '#',
      imageSrc: 'https://media.studio7thailand.com/75762/iPhone_14_Pro_Max_Gold_PDP_Image_Position-1A_Gold_1-square_medium.jpg',
      imageAlt: "Front of men's Apple Iphone 1 Pro in black.",
      price: '$1499',
      color: 'Rose Gold',
    },
    {
        id: 1,
        name: 'Apple Iphone 14 Pro Max',
        href: '#',
        imageSrc: 'https://media.studio7thailand.com/75762/iPhone_14_Pro_Max_Gold_PDP_Image_Position-1A_Gold_1-square_medium.jpg',
        imageAlt: "Front of men's Apple Iphone 1 Pro in Rose Gold.",
        price: '$1499',
        color: 'Rose Gold',
      },
      {
        id: 1,
        name: 'Apple Iphone 15 Pro',
        href: '#',
        imageSrc: 'https://media-cdn.bnn.in.th/332496/iPhone_15_Pro_Max_White_Titanium_1-square_medium.jpg',
        imageAlt: "Front of men's Apple Iphone 1 Pro in black.",
        price: '1599',
        color: 'White',
      },
      {
        id: 1,
        name: 'Apple Iphone 15 Pro Max',
        href: '#',
        imageSrc: 'https://media-cdn.bnn.in.th/332496/iPhone_15_Pro_Max_White_Titanium_1-square_medium.jpg',
        imageAlt: "Front of men's Apple Iphone 1 Pro in White.",
        price: '$1599',
        color: 'White',
      },
    // More products...
  ]
  
  export default function Banner() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  