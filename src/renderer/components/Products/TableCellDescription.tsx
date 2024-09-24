import React from 'react';
import { Table, Popup } from 'semantic-ui-react';
import '../../styles/products.css'

interface ProductsTableCellDescriptionProps {
  description: string | null | undefined;
}

const TableCellDescription: React.FC<ProductsTableCellDescriptionProps> = ({ description }) => {
  /**
   * handlers
   */
  const handleDescriptionTruncate = (desc: string | null | undefined) => {
    if (!desc) return 'n/a';
    return desc.length > 500 ? `${desc.slice(0, 499)}...` : desc;
  };
  
  /**
   * tsx
   */
  return (
    <Popup
      trigger={
        <Table.Cell>
          <div className="products-table-description-cell products-ellipsis">
            {description || 'n/a'}
          </div>
        </Table.Cell>
      }
      content={handleDescriptionTruncate(description)}
    />
  )
} 

export default TableCellDescription;
