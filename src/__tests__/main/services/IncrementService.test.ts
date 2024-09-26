import { buildIncrementEntity } from '../../../main/helpers/entityBuilder';
import { Increment } from '../../../main/models/Increment';
import { IncrementRepository } from '../../../main/repositories/IncrementRepository';
import { ProductRepository } from '../../../main/repositories/ProductRepository';
import { IncrementService } from '../../../main/services/IncrementService';
import { Product } from '../../../main/models/Product';

jest.mock('../../../main/repositories/IncrementRepository');
jest.mock('../../../main/repositories/ProductRepository');
jest.mock('../../../main/helpers/entityBuilder');

describe('IncrementService', () => {
  let incrementService: IncrementService;
  let incrementRepository: jest.Mocked<IncrementRepository>;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    incrementRepository =
      new IncrementRepository() as jest.Mocked<IncrementRepository>;
    productRepository =
      new ProductRepository() as jest.Mocked<ProductRepository>;
    incrementService = new IncrementService();

    (incrementService as any).incrementRepository = incrementRepository;
    (incrementService as any).productRepository = productRepository;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createIncrement', () => {
    it('should create an increment successfully with no existing increments', async () => {
      const productId = 'product-uuid';
      const incrementData: Partial<Increment> = {
        productId,
        name: 'Increment 1',
      };

      const product = new Product();
      product.id = productId;

      const newIncrement = new Increment();
      Object.assign(newIncrement, incrementData, {
        id: 'increment-uuid',
        toJSON: jest.fn().mockReturnValue({}),
      });

      productRepository.getProductById.mockResolvedValue(product);
      incrementRepository.getLatestIncrement.mockResolvedValue(null);
      (buildIncrementEntity as jest.Mock).mockReturnValue(newIncrement);
      incrementRepository.createIncrement.mockResolvedValue(newIncrement);

      const result = await incrementService.createIncrement(
        incrementData as Increment,
      );

      expect(productRepository.getProductById).toHaveBeenCalledWith(
        productId,
        false,
      );
      expect(buildIncrementEntity).toHaveBeenCalledWith(
        expect.objectContaining(incrementData),
        0,
      );
      expect(incrementRepository.createIncrement).toHaveBeenCalledWith(
        newIncrement,
      );
      expect(result).toEqual({});
    });

    it('should create an increment successfully with existing increments', async () => {
      const productId = 'product-uuid';
      const incrementData: Partial<Increment> = {
        productId,
        name: 'Increment 2',
      };

      const product = new Product();
      product.id = productId;

      const latestIncrement = new Increment();
      latestIncrement.incrementIndex = 1;

      const newIncrement = new Increment();
      Object.assign(newIncrement, incrementData, {
        id: 'increment-uuid',
        toJSON: jest.fn().mockReturnValue({}),
      });

      productRepository.getProductById.mockResolvedValue(product);
      incrementRepository.getLatestIncrement.mockResolvedValue(latestIncrement);
      (buildIncrementEntity as jest.Mock).mockReturnValue(newIncrement);
      incrementRepository.createIncrement.mockResolvedValue(newIncrement);

      const result = await incrementService.createIncrement(
        incrementData as Increment,
      );

      expect(productRepository.getProductById).toHaveBeenCalledWith(
        productId,
        false,
      );
      expect(buildIncrementEntity).toHaveBeenCalledWith(
        expect.objectContaining(incrementData),
        2,
      );
      expect(incrementRepository.createIncrement).toHaveBeenCalledWith(
        newIncrement,
      );
      expect(result).toEqual({});
    });

    it('should throw an error if product not found', async () => {
      const incrementData: Partial<Increment> = {
        productId: 'product-uuid',
        name: 'Increment 1',
      };

      productRepository.getProductById.mockResolvedValue(null);

      await expect(
        incrementService.createIncrement(incrementData as Increment),
      ).rejects.toThrow('Product not found');
    });
  });

  describe('getAllIncrements', () => {
    it('should return all increments with count', async () => {
      const increments = [new Increment(), new Increment()];
      increments[0].toJSON = jest.fn().mockReturnValue({});
      increments[1].toJSON = jest.fn().mockReturnValue({});
      const incrementsCount = 2;

      incrementRepository.getAllIncrements.mockResolvedValue([
        increments,
        incrementsCount,
      ]);

      const result = await incrementService.getAllIncrements(
        'name',
        'asc',
        'product-uuid',
      );

      expect(incrementRepository.getAllIncrements).toHaveBeenCalledWith(
        'name',
        'asc',
        'product-uuid',
      );
      expect(result).toEqual({ increments: [{}, {}], incrementsCount });
    });
  });

  describe('getIncrementById', () => {
    it('should return the increment by id', async () => {
      const increment = new Increment();
      increment.toJSON = jest.fn().mockReturnValue({});

      incrementRepository.getIncrementById.mockResolvedValue(increment);

      const result = await incrementService.getIncrementById(
        'increment-uuid',
        true,
      );

      expect(incrementRepository.getIncrementById).toHaveBeenCalledWith(
        'increment-uuid',
        true,
      );
      expect(result).toEqual({});
    });

    it('should throw an error if increment not found', async () => {
      incrementRepository.getIncrementById.mockResolvedValue(null);

      await expect(
        incrementService.getIncrementById('increment-uuid', true),
      ).rejects.toThrow("Cannot read properties of null (reading 'toJSON')");
    });
  });

  describe('getLatestIncrement', () => {
    it('should return the latest increment', async () => {
      const increment = new Increment();
      increment.toJSON = jest.fn().mockReturnValue({});

      incrementRepository.getLatestIncrement.mockResolvedValue(increment);

      const result = await incrementService.getLatestIncrement('product-uuid');

      expect(incrementRepository.getLatestIncrement).toHaveBeenCalledWith(
        'product-uuid',
      );
      expect(result).toEqual({});
    });
  });

  describe('updateIncrement', () => {
    it('should update an increment', async () => {
      const increment = new Increment();
      increment.toJSON = jest.fn().mockReturnValue({});
      const updateData: Partial<Increment> = { name: 'Updated Increment' };

      incrementRepository.updateIncrement.mockResolvedValue(increment);

      const result = await incrementService.updateIncrement(
        'increment-uuid',
        updateData,
      );

      expect(incrementRepository.updateIncrement).toHaveBeenCalledWith(
        'increment-uuid',
        updateData,
      );
      expect(result).toEqual({});
    });
  });

  describe('deleteIncrement', () => {
    it('should delete an increment', async () => {
      await incrementService.deleteIncrement('increment-uuid');

      expect(incrementRepository.deleteIncrement).toHaveBeenCalledWith(
        'increment-uuid',
      );
    });
  });
});
