import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setModelsCurrentModel } from '../../../../renderer/store/models';
import ModalName from '../../../../renderer/components/Models/ModalName';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ModalName Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the current model name', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          modelsCurrentModel: {
            id: '1',
            name: 'Old Model Name',
            createdAt: '1',
            incrementId: '123',
          },
        },
      }),
    );

    render(<ModalName />);

    const inputElement = screen.getByPlaceholderText('Threat Model Name');
    expect(inputElement).toHaveValue('Old Model Name');
  });

  it('renders the input with an empty value when modelsCurrentModel is null', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          modelsCurrentModel: null,
        },
      }),
    );

    render(<ModalName />);

    const inputElement = screen.getByPlaceholderText('Threat Model Name');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setModelsCurrentModel action on input change', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          modelsCurrentModel: {
            id: '1',
            name: 'Old Model Name',
            createdAt: '1',
            incrementId: '123',
          },
        },
      }),
    );

    render(<ModalName />);

    fireEvent.change(screen.getByPlaceholderText('Threat Model Name'), {
      target: { value: 'New Model Name' },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setModelsCurrentModel({
        id: '1',
        name: 'New Model Name',
        createdAt: '1',
        incrementId: '123',
      }),
    );
  });

  it('should truncate the input value to 249 characters if it exceeds 250 characters', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          modelsCurrentModel: {
            id: '1',
            name: 'Old Model Name',
            createdAt: '1',
            incrementId: '123',
          },
        },
      }),
    );

    render(<ModalName />);

    const longName = 'A'.repeat(260);
    fireEvent.change(screen.getByPlaceholderText('Threat Model Name'), {
      target: { value: longName },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setModelsCurrentModel({
        id: '1',
        name: 'A'.repeat(249),
        createdAt: '1',
        incrementId: '123',
      }),
    );
  });
});
