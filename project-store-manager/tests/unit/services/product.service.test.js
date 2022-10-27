const sinon = require('sinon');
const { expect } = require('chai');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');

const productNotFound = {
  type: 'PRODUCT_NOT_FOUND',
  message: 'Product not found',
};

describe('Buscando todos os produtos', () => {
  beforeEach(() => {
    const products = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }
    ];
    sinon.stub(productModel, 'findAll').resolves(products);
  })
  afterEach(sinon.restore);

  it('testa o retorno dos produtos é um objeto', async () => {
    const product = await productService.findAll();
    expect(product).to.be.a('object');
  })
});

describe('Buscando produtos por ID', () => {
  beforeEach(() => {
    const products = [[
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }
    ]];
    sinon.stub(productModel, 'findById').resolves(products);
  })
  afterEach(sinon.restore);

  it('testa o retorno dos produtos não é um array', async () => {
    const product = await productService.findById(1);
    expect(product).not.to.be.a('array');
  });

  it('testa o retorno dos produtos é um objeto', async () => {
    const product = await productService.findById(1);
    expect(product).to.be.a('object');
  });

  it('testa o retorno não é vazio', async () => {
    const product = await productService.findById(1);
    expect(product).not.to.be.empty;
    productModel.findById.restore();
  });

  it('testa se um produto é deletado', async function () {
    sinon.stub(productModel, 'deleteProduct').resolves(1);

    const result = await productService.deleteProduct(1);

    expect(result.message).to.deep.equal('');
  });
});
