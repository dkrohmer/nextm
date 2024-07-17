import React, { useEffect, useRef } from 'react';
import { Sidebar as SemanticSidebar, Segment } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setSidebarVisible } from '../store/SettingsStore';
import Settings from './settings/Settings';

const Sidebar: React.FC = () => {
  const { sidebarVisible } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch<AppDispatch>();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      dispatch(setSidebarVisible(false));
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SemanticSidebar
      as={Segment}
      animation="push"
      icon="labeled"
      inverted
      vertical
      visible={sidebarVisible}
      width="wide"
      direction="right"
      style={{ padding: '15px' }}
      ref={sidebarRef}
    >
      <Settings />
    </SemanticSidebar>
  );
};

export default Sidebar;
