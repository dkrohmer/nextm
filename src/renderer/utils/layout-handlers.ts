import { AppDispatch } from '../store';
import { setSidebarVisible } from '../store/settings';

export const toggleSidebar = (dispatch: AppDispatch, sidebarVisible: boolean) => {
  dispatch(setSidebarVisible(!sidebarVisible));
};
