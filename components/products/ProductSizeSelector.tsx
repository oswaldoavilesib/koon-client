import { Box, Button } from '@mui/material';
import React, {FC} from 'react'
import {ISize} from '../../interfaces'

interface Props {
    selectedSize?:ISize;
    sizes: ISize[];
    handleSizeSelector: (size:ISize) => void;
}
export const ProductSizeSelector:FC<Props> = ({selectedSize, sizes,handleSizeSelector}) => {
  return (
    <Box>
        {
            sizes.map(size => (
                <Button key={size} size='small' color={selectedSize === size ? 'primary' : 'info'} onClick={() => handleSizeSelector(size)}>
                {size}
                </Button>
            ))
        }
    </Box>

  )
}

