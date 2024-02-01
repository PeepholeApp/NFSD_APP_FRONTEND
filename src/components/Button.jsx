import * as React from "react";
import MaterialButton from "@mui/material/Button";

export function ButtonDark({ children, ...rest }) {
  return (
    <MaterialButton
      variant="outlined"
      disableElevation
      sx={{
        color: "#FFFFFF",
        borderRadius: 10,
        background: "#000000",
      }}
      {...rest}
    >
      {children}
    </MaterialButton>
  );
}

export function ButtonLight({ children, ...rest }) {
  return (
    <MaterialButton
      variant="outlined"
      disableElevation
      sx={{
        borderRadius: 10,
        color: "#FFFFFF",
        background: "linear-gradient(to right bottom, #3402B4, #6A1498)",
      }}
      {...rest}
    >
      {children}
    </MaterialButton>
  );
}
