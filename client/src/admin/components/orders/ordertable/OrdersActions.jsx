import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Save } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import productsAtom from './../../../../atom (global state)/productsAtom';
import SummaryApi from './../../../../utils/apiUrls';

const OrdersActions = ({ params }) => {
  const [productEditShow, setProductEditShow] = useState(false);

  const [products, setProducts] = useRecoilState(productsAtom);

  const handleDelete = async (e) => {
    e.preventDefault();


  }

  return (
    <>
      <Box
        sx={{
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
    </>
  );
};

export default OrdersActions;
