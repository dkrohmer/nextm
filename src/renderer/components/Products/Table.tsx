import React from 'react';
import { useSelector } from 'react-redux';
import { Segment, Table as SemanticTable} from 'semantic-ui-react';
import TableHeaders from './TableHeaders';
import TableBody from './TableBody';
import { RootState } from '../../store';

interface TableProps {
  setProductToDelete: React.Dispatch<React.SetStateAction<string | null>>;
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Table: React.FC<TableProps> = ({
  setProductToDelete,
  setOpenConfirm,
}) => {
  const { products } = useSelector((state: RootState) => state.products);

  return (
    <Segment basic>
      <SemanticTable size="small">
        <TableHeaders />
        <TableBody
          products={products}
          setProductToDelete={setProductToDelete}
          setOpenConfirm={setOpenConfirm}
        />
      </SemanticTable>
    </Segment>
  );
};

export default Table;
