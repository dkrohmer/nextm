import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Sidebar as SemanticSidebar, Segment } from 'semantic-ui-react';
import { RootState } from '../../store';
import useHandleClickOutside from '../../hooks/useHandleClickOutside';
import Settings from "../Settings"

const SideBar: React.FC = () => {
  const { sidebarVisible } = useSelector((state: RootState) => state.settings);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useHandleClickOutside(sidebarRef);

  return (
    <SemanticSidebar
      as={Segment}
      className='sidebar'
      animation="push"
      icon="labeled"
      inverted
      vertical
      visible={sidebarVisible}
      width="wide"
      direction="right"
      ref={sidebarRef}
    >
      <Settings />
    </SemanticSidebar>
  );
};

export default SideBar;
