import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';

interface BreadcrumbsProps {
  product: any;
  increment: any;
  model: any;
  handleNavigate: (path: string) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ product, increment, model, handleNavigate }) => {
  return (
    <Breadcrumb style={{ position: 'absolute', left: 200, top: 130, zIndex: 2 }}>
      <Breadcrumb.Section link onClick={() => handleNavigate(`/products`)}>
        Products
      </Breadcrumb.Section>
      <Breadcrumb.Divider icon="right chevron" />
      <Breadcrumb.Section link onClick={() => handleNavigate(`/products/${product!.id}`)}>
        {product?.name}
      </Breadcrumb.Section>
      <Breadcrumb.Divider icon="right chevron" />
      <Breadcrumb.Section link onClick={() => handleNavigate(`/products/${product!.id}/increments/${increment!.id}`)}>
        {increment?.name}
      </Breadcrumb.Section>
      <Breadcrumb.Divider icon="right chevron" />
      <Breadcrumb.Section active>{model?.name}</Breadcrumb.Section>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
