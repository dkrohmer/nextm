import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb } from 'semantic-ui-react';
import { AppDispatch, RootState } from '../../store';
import { saveModel } from '../../utils/saveModel';
import { useNavigate } from 'react-router-dom';
import { Graph } from '@antv/x6';

interface BreadcrumbsProps {
  graph: Graph | null
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ graph }) => {
  /**
   * global states
   */
  const { product } = useSelector((state: RootState) => state.products);
  const { increment } = useSelector((state: RootState) => state.increments);
  const { model } = useSelector((state: RootState) => state.models);
  const { latestVersion } = useSelector((state: RootState) => state.versions)

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();

  /**
   * handlers
   */
  const handleNavigate = async (path: string) => {
    if (!graph) {
      console.error("Graph is not initialized");
      return;
    }
    if (latestVersion) {
      await saveModel(model?.id, graph, latestVersion, dispatch);
      navigate(path);
    }
  }

  /**
   * tsx
   */
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
