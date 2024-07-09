import { DataSource } from 'typeorm';
import { Responsible } from '../../../main/models/Responsible';
import { Product } from '../../../main/models/Product';
import { initializeDataSource, getDataSource } from '../../../main/database';
import { ResponsibleRepository } from '../../../main/repositories/ResponsibleRepository';

let dataSource: DataSource;
let responsibleRepository: ResponsibleRepository;
let productId: string;

beforeAll(async () => {
  await initializeDataSource(':memory:');
  dataSource = getDataSource();
  responsibleRepository = new ResponsibleRepository();

  // Create a product to be used for the responsible entries
  const product = new Product();
  product.name = 'Test Product';
  const savedProduct = await dataSource.getRepository(Product).save(product);
  productId = savedProduct.id;
});

afterAll(async () => {
  await dataSource.destroy();
});

describe('ResponsibleRepository', () => {
  it('should create a new responsible', async () => {
    const responsible = new Responsible();
    responsible.firstName = 'John';
    responsible.lastName = 'Doe';
    responsible.role = 'Manager';
    responsible.productId = productId;

    const savedResponsible = await responsibleRepository.createResponsible(responsible);

    expect(savedResponsible).toHaveProperty('id');
    expect(savedResponsible.firstName).toBe('John');
    expect(savedResponsible.lastName).toBe('Doe');
    expect(savedResponsible.role).toBe('Manager');
    expect(savedResponsible.productId).toBe(productId);
  });

  it('should get all responsibles', async () => {
    const [responsibles, count] = await responsibleRepository.getAllResponsibles();

    expect(Array.isArray(responsibles)).toBe(true);
    expect(typeof count).toBe('number');
  });

  it('should get all responsibles by productId', async () => {
    const [responsibles, count] = await responsibleRepository.getAllResponsibles(productId);

    expect(Array.isArray(responsibles)).toBe(true);
    expect(count).toBeGreaterThan(0);
    responsibles.forEach((r) => expect(r.productId).toBe(productId));
  });

  it('should get a responsible by id', async () => {
    const responsible = new Responsible();
    responsible.firstName = 'Jane';
    responsible.lastName = 'Doe';
    responsible.role = 'Assistant';
    responsible.productId = productId;
    const savedResponsible = await responsibleRepository.createResponsible(responsible);

    const foundResponsible = await responsibleRepository.getResponsibleById(savedResponsible.id);
    expect(foundResponsible).toBeDefined();
    expect(foundResponsible!.id).toBe(savedResponsible.id);
  });

  it('should return null when getting a non-existent responsible by id', async () => {
    const foundResponsible = await responsibleRepository.getResponsibleById('non-existent-id');
    expect(foundResponsible).toBeNull();
  });

  it('should update a responsible', async () => {
    const responsible = new Responsible();
    responsible.firstName = 'Update';
    responsible.lastName = 'Test';
    responsible.role = 'Coordinator';
    responsible.productId = productId;
    const savedResponsible = await responsibleRepository.createResponsible(responsible);

    savedResponsible.role = 'Senior Coordinator';
    const updatedResponsible = await responsibleRepository.updateResponsible(savedResponsible.id, savedResponsible);

    expect(updatedResponsible).toBeDefined();
    expect(updatedResponsible!.role).toBe('Senior Coordinator');
  });

  it('should return null when updating a non-existent responsible', async () => {
    const updatedResponsible = await responsibleRepository.updateResponsible('non-existent-id', { role: 'Updated Role' });
    expect(updatedResponsible).toBeNull();
  });

  it('should delete a responsible', async () => {
    const responsible = new Responsible();
    responsible.firstName = 'Delete';
    responsible.lastName = 'Test';
    responsible.role = 'Intern';
    responsible.productId = productId;
    const savedResponsible = await responsibleRepository.createResponsible(responsible);

    await responsibleRepository.deleteResponsible(savedResponsible.id);
    const deletedResponsible = await responsibleRepository.getResponsibleById(savedResponsible.id);

    expect(deletedResponsible).toBeNull();
  });

  it('should not throw an error when deleting a non-existent responsible', async () => {
    await expect(responsibleRepository.deleteResponsible('non-existent-id')).resolves.not.toThrow();
  });
});