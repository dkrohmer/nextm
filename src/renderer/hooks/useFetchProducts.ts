import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchProducts } from '../services/api/products';

const useFetchProducts = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    productsCurrentPage,
    productsItemsPerPage,
    productsSort,
    productsSortby,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(
      fetchProducts({
        limit: productsItemsPerPage,
        offset: (productsCurrentPage - 1) * productsItemsPerPage,
        sort: productsSort,
        sortby: productsSortby,
      }),
    );
  }, [dispatch, productsItemsPerPage, productsCurrentPage, productsSort, productsSortby]);
};

export default useFetchProducts;
