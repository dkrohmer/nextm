import React from 'react';
import { Header } from 'semantic-ui-react';
import '../../styles/increments.css';

const Title: React.FC = () => (
  <div className="increments-header-container">
    <div className="increments-header-title">
      <Header as="h3" className="increments-header-text">
        Product Increments
      </Header>
    </div>
  </div>
);

export default Title;
