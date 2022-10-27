const sinon = require('sinon');
const chai = require('chai');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');

const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const { productsAll, productId, newProduct, newProductCreate, validateNameProduct, productNotFound } = require('./product.controller.mock');

chai.use(sinonChai);


describe('Testa a camada controller', function () {
  it('Lista todos os produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'findAll')
      .resolves(productsAll);

    await productController.listAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsAll.message);
  });

  it('Retorna um produto pesquisado pelo id', async function () {
    const res = {}
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'findById').resolves(productId);

    await productController.listProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productId.message);
  })

  it('Retorna um erro quando o id não é encontrado', async function () {
    const res = {}
    const req = {
      params: { id: 258 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'findById').resolves(productNotFound);

    await productController.listProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: productNotFound.message });
  });

  it('Testa se um novo produto é criado', async function () {
    const res = {}
    const req = {
      body: { name: 'ProdutoNovo' },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'createProduct').resolves(newProduct);

    await productController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201)
    expect(res.json).to.have.been.calledWith(newProductCreate)

  });

  it('Testa se o nome do produto contém mais de 5 caracteres', async function () {
    const res = {}
    const req = {
      body: { name: 'Test' },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'createProduct').resolves(validateNameProduct);

    await productController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(422)
    expect(res.json).to.have.been.calledWith({ message: validateNameProduct.message })

  });

  afterEach(sinon.restore);
});
