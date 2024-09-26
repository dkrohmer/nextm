import { renderHook } from '@testing-library/react-hooks';
import { RootState } from '../../../../renderer/store';
import useFocusContainer from '../../../../renderer/hooks/model-editor/useFocusContainer';

const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('useFocusContainer hook', () => {
  let containerRef: React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    jest.clearAllMocks();
    containerRef = {
      current: {
        focus: jest.fn(),
      },
    } as unknown as React.RefObject<HTMLDivElement>;
  });

  it('should focus the container when no modals are open', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          actorModalOpen: false,
          systemModalOpen: false,
          zoneModalOpen: false,
          dataflowModalOpen: false,
        },
      } as RootState),
    );

    renderHook(() => useFocusContainer(containerRef));

    expect(containerRef.current!.focus).toHaveBeenCalled();
  });

  it('should not focus the container when any modal is open', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          actorModalOpen: true,
          systemModalOpen: false,
          zoneModalOpen: false,
          dataflowModalOpen: false,
        },
      } as RootState),
    );

    renderHook(() => useFocusContainer(containerRef));

    expect(containerRef.current!.focus).not.toHaveBeenCalled();
  });

  it('should not focus if containerRef is null', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          actorModalOpen: false,
          systemModalOpen: false,
          zoneModalOpen: false,
          dataflowModalOpen: false,
        },
      } as RootState),
    );

    const nullRef = null as unknown as React.RefObject<HTMLDivElement>;

    renderHook(() => useFocusContainer(nullRef));

    expect(nullRef).toBeNull();
  });
});
