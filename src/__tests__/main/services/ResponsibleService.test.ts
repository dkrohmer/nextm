import { ResponsibleService } from '../../../main/services/ResponsibleService';
import { ResponsibleRepository } from '../../../main/repositories/ResponsibleRepository';
import { ProductRepository } from '../../../main/repositories/ProductRepository';
import { buildResponsibleEntity } from '../../../main/helpers/entityBuilder';
import { Responsible } from '../../../main/models/Responsible';
import { Product } from '../../../main/models/Product';

jest.mock('../../../main/repositories/ResponsibleRepository');
jest.mock('../../../main/repositories/ProductRepository');
jest.mock('../../../main/helpers/entityBuilder');

describe('ResponsibleService', () => {
  let responsibleService: ResponsibleService;
  let responsibleRepositoryMock: jest.Mocked<ResponsibleRepository>;
  let productRepositoryMock: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    responsibleRepositoryMock =
      new ResponsibleRepository() as jest.Mocked<ResponsibleRepository>;
    productRepositoryMock =
      new ProductRepository() as jest.Mocked<ProductRepository>;
    responsibleService = new ResponsibleService();

    (responsibleService as any).responsibleRepository =
      responsibleRepositoryMock;
    (responsibleService as any).productRepository = productRepositoryMock;
  });

  describe('createResponsible', () => {
    it('should create a responsible successfully', async () => {
      const productId = 'product-id';
      const data = {
        productId,
        firstName: 'John',
        lastName: 'Doe',
        role: 'Manager',
      };
      const product = new Product();
      const responsible = new Responsible();

      productRepositoryMock.getProductById.mockResolvedValue(product);
      (buildResponsibleEntity as jest.Mock).mockReturnValue(responsible);
      responsibleRepositoryMock.createResponsible.mockResolvedValue(
        responsible,
      );

      const result = await responsibleService.createResponsible(data);

      expect(productRepositoryMock.getProductById).toHaveBeenCalledWith(
        productId,
        false,
      );
      expect(buildResponsibleEntity).toHaveBeenCalledWith(data);
      expect(responsibleRepositoryMock.createResponsible).toHaveBeenCalledWith(
        responsible,
      );
      expect(result).toBe(responsible);
    });

    it('should throw an error if the product is not found', async () => {
      const productId = 'product-id';
      const data = {
        productId,
        firstName: 'John',
        lastName: 'Doe',
        role: 'Manager',
      };

      productRepositoryMock.getProductById.mockResolvedValue(null);

      await expect(responsibleService.createResponsible(data)).rejects.toThrow(
        'Product not found',
      );

      expect(productRepositoryMock.getProductById).toHaveBeenCalledWith(
        productId,
        false,
      );
      // expect(buildResponsibleEntity).not.toHaveBeenCalled();
      expect(
        responsibleRepositoryMock.createResponsible,
      ).not.toHaveBeenCalled();
    });
  });

  describe('getAllResponsibles', () => {
    it('should return all responsibles and their count', async () => {
      const productId = 'product-id';
      const responsibles = [new Responsible()];
      const responsiblesCount = 1;

      responsibleRepositoryMock.getAllResponsibles.mockResolvedValue([
        responsibles,
        responsiblesCount,
      ]);

      const result = await responsibleService.getAllResponsibles(productId);

      expect(responsibleRepositoryMock.getAllResponsibles).toHaveBeenCalledWith(
        productId,
      );
      expect(result).toEqual({ responsibles, responsiblesCount });
    });
  });

  describe('getResponsibleById', () => {
    it('should return the responsible by id', async () => {
      const id = 'responsible-id';
      const responsible = new Responsible();

      responsibleRepositoryMock.getResponsibleById.mockResolvedValue(
        responsible,
      );

      const result = await responsibleService.getResponsibleById(id);

      expect(responsibleRepositoryMock.getResponsibleById).toHaveBeenCalledWith(
        id,
      );
      expect(result).toBe(responsible);
    });

    it('should return null if the responsible is not found', async () => {
      const id = 'responsible-id';

      responsibleRepositoryMock.getResponsibleById.mockResolvedValue(null);

      const result = await responsibleService.getResponsibleById(id);

      expect(responsibleRepositoryMock.getResponsibleById).toHaveBeenCalledWith(
        id,
      );
      expect(result).toBeNull();
    });
  });

  describe('updateResponsible', () => {
    it('should update the responsible successfully', async () => {
      const id = 'responsible-id';
      const data = { firstName: 'Jane' };
      const responsible = new Responsible();

      responsibleRepositoryMock.updateResponsible.mockResolvedValue(
        responsible,
      );

      const result = await responsibleService.updateResponsible(id, data);

      expect(responsibleRepositoryMock.updateResponsible).toHaveBeenCalledWith(
        id,
        data,
      );
      expect(result).toBe(responsible);
    });

    it('should return null if the responsible is not found', async () => {
      const id = 'responsible-id';
      const data = { firstName: 'Jane' };

      responsibleRepositoryMock.updateResponsible.mockResolvedValue(null);

      const result = await responsibleService.updateResponsible(id, data);

      expect(responsibleRepositoryMock.updateResponsible).toHaveBeenCalledWith(
        id,
        data,
      );
      expect(result).toBeNull();
    });
  });

  describe('deleteResponsible', () => {
    it('should delete the responsible successfully', async () => {
      const id = 'responsible-id';

      responsibleRepositoryMock.deleteResponsible.mockResolvedValue();

      await responsibleService.deleteResponsible(id);

      expect(responsibleRepositoryMock.deleteResponsible).toHaveBeenCalledWith(
        id,
      );
    });
  });
});
