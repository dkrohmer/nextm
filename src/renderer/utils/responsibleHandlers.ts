import { AppDispatch } from '../store';
import { IProduct } from '../interfaces/IProduct';
import { IResponsible } from '../interfaces/IResponsible';
import { setProductsCurrentProduct } from '../store/products';

export const addResponsible = (
  productsCurrentProduct: IProduct | null,
  dispatch: AppDispatch
) => {
  if (productsCurrentProduct) {
    const updatedResponsibles = [
      ...(productsCurrentProduct.responsibles || []),
      { id: '', firstName: '', lastName: '', role: '' },
    ];
    dispatch(
      setProductsCurrentProduct({
        ...productsCurrentProduct,
        responsibles: updatedResponsibles,
      })
    );
  }
};


export const removeResponsible = (
  index: number,
  productsCurrentProduct: IProduct | null,
  dispatch: AppDispatch
) => {
  if (productsCurrentProduct) {
    const updatedResponsibles = productsCurrentProduct.responsibles?.filter((_, i) => i !== index) || [];
    
    dispatch(
      setProductsCurrentProduct({
        ...productsCurrentProduct,
        responsibles: updatedResponsibles.length ? updatedResponsibles : [],
      })
    );
  }
};


export const handleResponsibleChange = (
  index: number,
  field: keyof IResponsible,
  value: string,
  productsCurrentProduct: IProduct | null,
  dispatch: AppDispatch
) => {
  if (productsCurrentProduct) {
    const updatedResponsibles =
      productsCurrentProduct.responsibles?.map((resp, i) =>
        i === index ? { ...resp, [field]: value } : resp
      ) || [];
    dispatch(
      setProductsCurrentProduct({
        ...productsCurrentProduct,
        responsibles: updatedResponsibles,
      })
    );
  }
};
