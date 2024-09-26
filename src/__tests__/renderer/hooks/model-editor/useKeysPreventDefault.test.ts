import { renderHook } from '@testing-library/react-hooks';
import useKeysPreventDefault from '../../../../renderer/hooks/model-editor/useKeysPreventDefault';

// Mock useSelector hook
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('useKeysPreventDefault hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Set the default Redux state
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          actorModalOpen: false,
          systemModalOpen: false,
          zoneModalOpen: false,
          dataflowModalOpen: false,
        },
      }),
    );
  });

  it('should prevent default for meta key combinations (+, -, s, a)', () => {
    renderHook(() => useKeysPreventDefault());

    const keydownEvent = new KeyboardEvent('keydown', {
      key: 's',
      metaKey: true,
    });

    // Spy on preventDefault
    const preventDefaultSpy = jest.spyOn(keydownEvent, 'preventDefault');

    // Dispatch the event
    document.dispatchEvent(keydownEvent);

    // Assert preventDefault was called
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should prevent default for meta + space if no modals are open', () => {
    renderHook(() => useKeysPreventDefault());

    const keydownEvent = new KeyboardEvent('keydown', {
      key: ' ',
      metaKey: true,
    });

    const preventDefaultSpy = jest.spyOn(keydownEvent, 'preventDefault');

    document.dispatchEvent(keydownEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should not prevent default for meta + space if any modal is open', () => {
    // Simulate a modal being open
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          actorModalOpen: true,
          systemModalOpen: false,
          zoneModalOpen: false,
          dataflowModalOpen: false,
        },
      }),
    );

    renderHook(() => useKeysPreventDefault());

    const keydownEvent = new KeyboardEvent('keydown', {
      key: ' ',
      metaKey: true,
    });

    const preventDefaultSpy = jest.spyOn(keydownEvent, 'preventDefault');

    document.dispatchEvent(keydownEvent);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should clean up the event listener on unmount', () => {
    const { unmount } = renderHook(() => useKeysPreventDefault());

    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function),
    );
  });
});
