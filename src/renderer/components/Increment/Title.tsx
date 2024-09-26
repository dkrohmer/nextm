import React from 'react';
import { Icon } from 'semantic-ui-react';

interface TitleProps {
  number: number;
  name: string;
}

const Title: React.FC<TitleProps> = ({ number, name }) => (
  /**
   * tsx
   */
  <div className="increment-title">
    <Icon name="dropdown" />
    Increment #{number}: {name}
  </div>
);

export default Title;
