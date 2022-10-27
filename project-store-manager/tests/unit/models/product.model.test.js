const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

const productsAll = [
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
];

const productId = [{
  "id": 1,
  "name": "Martelo de Thor"
}];

const newProduct = {
  "id": 4,
  "name": "Produto1"
};

describe('', () => {
  afterEach(sinon.restore)

  describe('Testa a camada model', () => {
    it('testa se retorna todos os produtos', async function () {
      const products = [
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
      ];

      sinon.stub(connection, 'execute').resolves([productsAll]);

      const result = await productModel.findAll();

      expect(result).to.deep.equal(products);

    });

    it('testa se retorna um produto pelo id', async () => {
      sinon.stub(connection, "execute").resolves([[productId[0]]]);
      const result = await productModel.findById(1);

      expect(result).to.deep.equal(productId[0]);
    });

    it('testa se retorna o novo produto cadastrdado', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall()
        .resolves([{ insertId: 4 }])
        .onSecondCall()
        .resolves(newProduct)
      sinon.stub(productModel, 'createProduct').resolves(newProduct);

      const result = await productModel.createProduct('Produto1');
      expect(result).to.deep.equal(newProduct);
    });

    it('testa se um produto é atualizado', async function () {
      sinon.stub(connection, 'execute').resolves(1);

      const result = await productModel.updateProduct({ id: 1, name: 'Martelo do Batman' });

      expect(result).to.be.equal(1);
    });

    it('testa se um produto é deletado corretamente', async function () {
      sinon.stub(connection, 'execute').resolves(1);
      const result = await productModel.deleteProduct(1);
      expect(result).to.be.equal(1);
    });

    afterEach(sinon.restore);
  });
});
