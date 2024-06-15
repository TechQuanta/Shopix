import { Box, CircularProgress, Fab } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Check, Save } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import productsAtom from '../../../../atom (global state)/productsAtom';
import SummaryApi from '../../../../utils/apiUrls';
import ProductEditPopup from './../producteditpopup/ProductEditPopup';
import { ValuesContext } from './../../../../App';

const ProductsActions = ({ params }) => {
  const [productEditShow, setProductEditShow] = useState(false);
  const id = params?.id;

  const [products, setProducts] = useRecoilState(productsAtom);
  const context = useContext(ValuesContext);

  const handleDelete = async (e) => {
    e.preventDefault();
    context.setProgress(15)

    const fetchData = await fetch(SummaryApi.deleteProduct.url, {
      method: SummaryApi.deleteProduct.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Id: id }),
    },
    );

    const dataResponse = await fetchData.json()

    if (dataResponse.error) {
      toast.error(dataResponse.message)
      context.setProgress(100)
      return;
    }

    if (dataResponse.success) {
      toast.success(`Product deleted Successfully.`)
      setProducts(products.filter((p) => p._id !== id));
      context.setProgress(100)
    }
  }

  return (
    <>
      <Box
        sx={{
          m: 1,
          position: 'relative',
        }}
      >
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            marginRight: "8px",

          }}
          onClick={(e) => {
            e.preventDefault();
            setProductEditShow(true);
          }}
        >
          <Save />
        </Fab>
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          onClick={(e) => handleDelete(e)}
        >
          <MdDelete size={20} />
        </Fab>
      </Box>
      <ProductEditPopup show={productEditShow} setShow={setProductEditShow} product={params.row} />
    </>
  );
};

export default ProductsActions;
