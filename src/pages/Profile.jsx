import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useAuth } from "../context/Login";
import { useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Interests from "../data/interests.json";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ButtonDark } from "../components/Button";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import UploadPhotos from "../components/UploadPhotos";
import languages from "../data/languages.json";
import { useMediaQuery } from "@mui/material";
import json2mq from "json2mq";
import countriesData from "../data/countries.json";

const languagesOptions = languages.languages.map((lang) => ({
  label: lang.name,
  value: lang.shorName,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  textAlign: "center",
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Profile = ({}) => {
  const mobile = useMediaQuery(json2mq({ maxWidth: 600 }));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [brithday, setBrithday] = useState(new Date());
  const [nationality, setNationality] = useState("");
  const [genero, setGenero] = useState("");
  const [languages, setLanguages] = useState([]);
  const [bio, setBio] = useState("");
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState(new Set());
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.token && !loading) {
      navigate("/login");
    }
  }, [user, loading]);

  useEffect(() => {
    if (user?.profileId && !loading) {
      navigate("/home");
    }
  }, [user, loading]);

  const onNext = async () => {
    if (
      ((firstName === "" ||
        lastName === "" ||
        brithday === "" ||
        nationality === "" ||
        genero === "" ||
        languages === "") &&
        step === 0) ||
      (bio === "" && step === 1)
    ) {
      setError("All fields are required");
      return;
    }

    if (selectedInterests.size < 5 && step === 2) {
      setError("Requires at least 5 selected fields");
      return;
    }

    setError("");
    setStep((prevStep) => prevStep + 1);
  };

  const onBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onSelectInterest = (interest) => {
    setSelectedInterests((selectedInterests) => {
      const selected = new Set(selectedInterests);
      if (selected.has(interest)) {
        selected.delete(interest);
        return selected;
      } else {
        selected.add(interest);
        return selected;
      }
    });
  };

  const handleClose = () => setOpen(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const files = e.target.files;
    console.log(e.target.files);

    for (let file of files) {
      formData.append("file", file);
    }

    setUploading(true);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/image`,
      formData
    );
    console.log(response.data);
    setImage(response.data);
    setUploading(false);
  };

  const hadleImageSelected = (e) => {
    const image = e.target.files[0];
    setFile(image);
    console.log(image);
  };
  const onImageDelete = (index) => () => {
    setImage((images) =>
      images.filter((_image, imageIndex) => imageIndex != index)
    );
  };

  const onSave = async () => {
    const interests = Array.from(selectedInterests);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/profiles`,
      {
        name: firstName,
        last_name: lastName,
        dob: brithday.toISOString(),
        gender: genero,
        nationality,
        languages: languages.map((language) => language.value),
        bio,
        photo: images,
        user: user.userId,
        interest: interests,
      }
    );

    if (images.length < 1 && step === 3) {
      setError("Requires uploading at least one photo");
      return;
    }
    setError("");
    setOpen(true);
    setTimeout(() => navigate("/home"), 2000);
  };

  return (
    <Stack sx={{ m: 4 }} alignItems="center">
      <Stack sx={{ p: mobile ? 4 : 6, backgroundColor: "#262938" }} spacing={2}>
        <Box pb={3}>
          <Stepper activeStep={step}>
            <Step>
              <StepLabel>Datos</StepLabel>
            </Step>
            <Step>
              <StepLabel>Bio</StepLabel>
            </Step>
            <Step>
              <StepLabel>Intereses</StepLabel>
            </Step>
            <Step>
              <StepLabel>Fotos</StepLabel>
            </Step>
          </Stepper>
        </Box>

        {error ? <Alert severity="error">{error}</Alert> : null}

        {step === 0 ? (
          <>
            <FormControl>
              <TextField
                label="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </FormControl>

            <FormControl>
              <TextField
                label="Last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </FormControl>

            <Stack direction="row">
              <FormLabel sx={{ paddingRight: 2 }}>
                Fecha de Nacimiento
              </FormLabel>
              <DatePicker
                value={brithday}
                onChange={(date) => {
                  setBrithday(date);
                }}
              />
            </Stack>

            <FormControl>
              <FormLabel>Genero</FormLabel>
              <RadioGroup
                row
                value={genero}
                onChange={(e) => {
                  setGenero(e.target.value);
                }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Femenino"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Masculino"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Otro"
                />
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel>Nacionalidad</InputLabel>
              <Select
                value={nationality}
                label="nationality"
                onChange={(e) => {
                  setNationality(e.target.value);
                }}
              >
                {countriesData.countries.map((option) => (
                  <MenuItem key={option.acronym} value={option.acronym}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Autocomplete
                value={languages}
                onChange={(e, value) => {
                  setLanguages(value);
                }}
                multiple
                options={languagesOptions}
                // filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Idioma" />
                )}
              />
            </FormControl>

            <Stack direction="row" justifyContent="space-between">
              <ButtonDark disabled={step === 0} onClick={onBack}>
                Back
              </ButtonDark>
              <ButtonDark onClick={onNext}>
                Avanzar a intereses personales
              </ButtonDark>
            </Stack>
          </>
        ) : step === 1 ? (
          <>
            <FormControl
              sx={{
                width: mobile ? undefined : 500,
                maxWidth: "100%",
              }}
            >
              <TextField
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                fullWidth
                label="Añade una Biografía sobre ti"
              />
            </FormControl>
            <Stack direction="row" justifyContent="space-between">
              <ButtonDark onClick={onBack}>Back</ButtonDark>
              <ButtonDark onClick={onNext}>Cuales son tus interese</ButtonDark>
            </Stack>
          </>
        ) : step === 2 ? (
          <>
            <FormControl>
              <Stack>
                <Typography variant="h5">Intereses</Typography>
                {Object.entries(Interests).map(([category, options]) => (
                  <Box key={category}>
                    <Typography variant="h6">{category}</Typography>
                    <Box direction="row" spacing={1} flexWrap="wrap">
                      {options.map((option) => (
                        <Chip
                          key={option.name}
                          variant="outlined"
                          avatar={
                            <Avatar sx={{ bgcolor: "white" }}>
                              {option.icon}
                            </Avatar>
                          }
                          label={option.name}
                          sx={{ mr: 1, mb: 1 }}
                          onClick={() => onSelectInterest(option.name)}
                          color={
                            selectedInterests.has(option.name)
                              ? "primary"
                              : "default"
                          }
                        />
                      ))}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </FormControl>
            <Stack direction="row" justifyContent="space-between">
              <ButtonDark onClick={onBack}>Back</ButtonDark>
              <ButtonDark onClick={onNext}>Ahora sube tus fotos</ButtonDark>
            </Stack>
          </>
        ) : step === 3 ? (
          <>
            <CardContent>
              <Div display="flex" justifyContent="center">
                {" "}
                {"Upload Photos"}{" "}
              </Div>
            </CardContent>
            <Box
              sx={{
                backgroundColor: "#333",
                minWidth: mobile ? undefined : 500,
                maxWidth: 500,
                minHeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UploadPhotos
                images={images}
                onChange={(images) => setImages(images)}
              />
            </Box>

            <ButtonDark onClick={onSave}>Guardar</ButtonDark>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  🎉🎉🎉Completed profile congratulations!!! 🥳
                </Typography>
              </Box>
            </Modal>
          </>
        ) : null}
      </Stack>
    </Stack>
  );
};
export default Profile;
