import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, {FC} from 'react'

interface Props {
  currentQuantity: number;
  handleQuantity: (quantity:number) => void;
  maxValue: number;
}

export const ItemCounter:FC<Props> = ({currentQuantity,handleQuantity,maxValue}) => {

  const addOrRemove = (value:number) => {
    if(value === -1){
      if(currentQuantity === 1) return
      return handleQuantity(currentQuantity -1)
    }

    if(currentQuantity >= maxValue) return;

    handleQuantity(currentQuantity + 1)
  }


  return (
    <Box display='flex' alignItems='center'>
        <IconButton onClick={() => addOrRemove(-1)}>
            <RemoveCircleOutline  />
        </IconButton>
        <Typography sx={{widht:40, textAlign:'center'}}>{currentQuantity}</Typography>
        <IconButton onClick={() => addOrRemove(1)}>
            <AddCircleOutline />
        </IconButton>
    </Box>
  )
}

