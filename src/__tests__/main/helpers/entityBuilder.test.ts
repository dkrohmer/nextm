// __tests__/entityBuilder.test.ts
import { buildProductEntity } from '../../../main/helpers/entityBuilder';
import { Product } from '../../../main/models/Product';
import { Responsible } from '../../../main/models/Responsible';
import { Increment } from '../../../main/models/Increment';
import { Model } from '../../../main/models/Model';
import { Version } from '../../../main/models/Version';

// Mock the model classes to avoid importing TypeORM and database dependencies
jest.mock('../../../main/models/Product');
jest.mock('../../../main/models/Responsible');
jest.mock('../../../main/models/Increment');
jest.mock('../../../main/models/Model');
jest.mock('../../../main/models/Version');

describe('buildProductEntity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should build a product entity correctly with all fields', () => {
    const productData = new Product();
    productData.name = 'Test Product';
    productData.description = 'This is a test product';
    productData.startsAt = new Date('2024-01-01T00:00:00.000Z');
    productData.endsAt = new Date('2024-12-31T23:59:59.999Z');
    productData.increments = [
      {
        name: 'Increment 1',
        incrementIndex: 0,
        models: [
          {
            name: 'Model 1',
            versions: [
              { payload: '{}', thumbnail: '', versionIndex: 0 },
            ],
          },
        ],
      } as Increment,
    ];
    productData.responsibles = [
      { firstName: 'John', lastName: 'Doe', role: 'Manager' } as Responsible,
    ];

    const product = buildProductEntity(productData);

    expect(product.name).toBe('Test Product');
    expect(product.description).toBe('This is a test product');
    expect(product.startsAt).toEqual(new Date('2024-01-01T00:00:00.000Z'));
    expect(product.endsAt).toEqual(new Date('2024-12-31T23:59:59.999Z'));
    expect(product.increments).toHaveLength(1);
    expect(product.responsibles).toHaveLength(1);
  });

  it('should throw an error if the end date is earlier than the start date', () => {
    const productData = new Product();
    productData.name = 'Test Product';
    productData.startsAt = new Date('2024-01-01T00:00:00.000Z');
    productData.endsAt = new Date('2023-12-31T23:59:59.999Z');

    expect(() => buildProductEntity(productData)).toThrow(
      'The end date cannot be earlier than the start date.'
    );
  });

  it('should handle missing optional fields correctly', () => {
    const productData = new Product();
    productData.name = 'Test Product';
    productData.startsAt = new Date('2024-01-01T00:00:00.000Z');

    const product = buildProductEntity(productData);

    expect(product.name).toBe('Test Product');
    expect(product.description).toBeNull();
    expect(product.startsAt).toEqual(new Date('2024-01-01T00:00:00.000Z'));
    expect(product.endsAt).toBeNull();
    expect(product.increments).toHaveLength(1);
    expect(product.increments[0].name).toBe('Test Product - Baseline');
    expect(product.responsibles).toBeUndefined();
  });

  it('should handle startsAt as null correctly', () => {
    const productData = new Product();
    productData.name = 'Test Product';
    productData.startsAt = null;

    const product = buildProductEntity(productData);

    expect(product.startsAt).toBeNull();
  });

  it('should create a default increment if no increments are provided', () => {
    const productData = new Product();
    productData.name = 'Test Product';
    productData.startsAt = new Date('2024-01-01T00:00:00.000Z');
    productData.responsibles = [
      { firstName: 'John', lastName: 'Doe', role: 'Manager' } as Responsible,
    ];

    const product = buildProductEntity(productData);

    expect(product.increments).toHaveLength(1);
    expect(product.increments[0].name).toBe('Test Product - Baseline');
  });

  it('should handle multiple increments and responsibles correctly', () => {
    const productData = new Product();
    productData.name = 'Test Product';
    productData.startsAt = new Date('2024-01-01T00:00:00.000Z');
    productData.increments = [
      { name: 'Increment 1', incrementIndex: 0 } as Increment,
      { name: 'Increment 2', incrementIndex: 1 } as Increment,
    ];
    productData.responsibles = [
      { firstName: 'John', lastName: 'Doe', role: 'Manager' } as Responsible,
      { firstName: 'Jane', lastName: 'Smith', role: 'Engineer' } as Responsible,
    ];

    const product = buildProductEntity(productData);

    expect(product.increments).toHaveLength(2);
    expect(product.responsibles).toHaveLength(2);
  });

  it('should create a default version if no versions are provided in the model', () => {
    const productData = new Product();
    productData.name = 'Test Product';
    productData.startsAt = new Date('2024-01-01T00:00:00.000Z');
    productData.increments = [
      {
        name: 'Increment 1',
        incrementIndex: 0,
        models: [
          {
            name: 'Model 1',
          } as Model,
        ],
      } as Increment,
    ];

    const product = buildProductEntity(productData);

    expect(product.increments[0].models[0].versions).toHaveLength(1);
    expect(product.increments[0].models[0].versions[0].payload).toBe('{}');
    expect(product.increments[0].models[0].versions[0].thumbnail).toBe('');
  });

  it('should set the versionIndex correctly if no versionIndex is provided', () => {
    const productData = new Product();
    productData.name = 'Test Product';
    productData.startsAt = new Date('2024-01-01T00:00:00.000Z');
    productData.increments = [
      {
        name: 'Increment 1',
        incrementIndex: 0,
        models: [
          {
            name: 'Model 1',
            versions: [
              { payload: '{}', thumbnail: '' },
            ] as Version[],
          } as Model,
        ],
      } as Increment,
    ];

    const product = buildProductEntity(productData);

    expect(product.increments[0].models[0].versions[0].versionIndex).toBe(0);
  });

  it('should handle responsible role as null correctly', () => {
    const productData = new Product();
    productData.name = 'Test Product';
    productData.startsAt = new Date('2024-01-01T00:00:00.000Z');
    productData.responsibles = [
      { firstName: 'John', lastName: 'Doe' } as Responsible,
    ];

    const product = buildProductEntity(productData);

    expect(product.responsibles[0].role).toBeNull();
  });
});