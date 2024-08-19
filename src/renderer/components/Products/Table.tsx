import React from 'react';
import { Segment, Table as SemanticTable} from 'semantic-ui-react';
import TableHeaders from './TableHeaders';
import TableBody from './TableBody';

const Table: React.FC = () => {
  /**
   * tsx
   */
  return (
    <Segment basic>
      <SemanticTable size="small">
        <TableHeaders />
        <TableBody />
      </SemanticTable>
    </Segment>
  );
};

export default Table;
