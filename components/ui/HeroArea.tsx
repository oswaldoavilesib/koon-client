import { Box, Typography, Button } from "@mui/material";
import React, { FC } from "react";

interface Props {
  title: string;
  subtitle: string;
  callToAction: string;
}

export const HeroArea: FC<Props> = ({ title, subtitle, callToAction }) => {
  return (
    <Box
      className="hero-container-home"
      sx={{ mb: 5 }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
    >
      <Typography variant="overline" sx={{ marginBottom: 1 }}>
        {title}
      </Typography>
      <Typography variant="h1" component="h1">
        {subtitle}{" "}
      </Typography>
      <Button
        href="#shop-container"
        className="hero-btn"
        sx={{ mt: 3, width: "200px" }}
        variant="contained"
        size="small"
        color="primary"
      >
        {callToAction}
      </Button>
    </Box>
  );
};
