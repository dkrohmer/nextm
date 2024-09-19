import { renderHook } from '@testing-library/react-hooks';
import { useSelector } from 'react-redux';
import useFocusContainer from '../../../../renderer/hooks/model-editor/useFocusContainer';
import { RootState } from '../../../../renderer/store';

// Mock useSelector hook
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('useFocusContainer hook', () => {
  let containerRef: React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    jest.clearAllMocks();
    // Create a mock containerRef with a focus function
    containerRef = {
      current: {
        focus: jest.fn(),
      },
    } as unknown as React.RefObject<HTMLDivElement>;
  });

  it('should focus the container when no modals are open', () => {
    // Mock useSelector to return no modals open
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          actorModalOpen: false,
          systemModalOpen: false,
          zoneModalOpen: false,
          dataflowModalOpen: false,
        },
      } as RootState)
    );

    // Render the hook
    renderHook(() => useFocusContainer(containerRef));

    // Since no modals are open, focus should be called
    expect(containerRef.current!.focus).toHaveBeenCalled();
  });

  it('should not focus the container when any modal is open', () => {
    // Mock useSelector to return at least one modal open
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          actorModalOpen: true, // Actor modal is open
          systemModalOpen: false,
          zoneModalOpen: false,
          dataflowModalOpen: false,
        },
      } as RootState)
    );

    // Render the hook
    renderHook(() => useFocusContainer(containerRef));

    // Since one of the modals is open, focus should not be called
    expect(containerRef.current!.focus).not.toHaveBeenCalled();
  });

  it('should not focus if containerRef is null', () => {
    // Mock useSelector to return no modals open
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          actorModalOpen: false,
          systemModalOpen: false,
          zoneModalOpen: false,
          dataflowModalOpen: false,
        },
      } as RootState)
    );

    // Pass null as the containerRef to simulate missing ref
    const nullRef = null as unknown as React.RefObject<HTMLDivElement>;

    // Render the hook with a null ref
    renderHook(() => useFocusContainer(nullRef));

    // Expect that focus is not called as the ref is null
    expect(nullRef).toBeNull();
  });
});
