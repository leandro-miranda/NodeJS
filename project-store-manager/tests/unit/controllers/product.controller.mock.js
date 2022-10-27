const productsAll = {
  errType: null,
  message: [
    {
      "id": 1,
      "name": "Martelo de Thor"
    },
    {
      "id": 2,
      "name": "Traje de encolhimento"
    },
    {
      "id": 3,
      "name": "Escudo do Capitão América"
    }
  ]
};

const productId = {
  errType: null,
  message: [
    {
      "id": 1,
      "name": "Martelo de Thor"
    }
  ]
};

const newProduct = {
  errType: null,
  message: [
    {
      "id": 1,
      "name": "ProdutoNovo"
    }
  ]
}

const newProductCreate = [
  {
    "id": 1,
    "name": "ProdutoNovo"
  }
]

const validateNameProduct = {
  errType: 'NAME_PRODUCT_BAD_REQUEST',
  message: '"name" length must be at least 5 characters long'
}

const productNotFound = {
  errType: 'PRODUCT_NOT_FOUND',
  message: 'Product not found'
}

module.exports = {
  productsAll,
  productId,
  newProduct,
  newProductCreate,
  validateNameProduct,
  productNotFound,
};
