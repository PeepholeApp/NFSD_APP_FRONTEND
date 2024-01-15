import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

const Profile = () => {
  const [firstName, setFirstName] = useState("");

  return (
    <Stack
      component="form"
      noValidate
      autoComplete="off"
      sx={{ width: 200 }}
      spacing={2}
    >
      <TextField
        id="filled-basic"
        label="First Name"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <TextField id="filled-basic" label="Last name" />
      <Stack direction="horizontal">
        <Typography variant="body1">Fecha de Nacimiento</Typography>
        <DatePicker />
      </Stack>
    </Stack>
  );
};
export default Profile;
