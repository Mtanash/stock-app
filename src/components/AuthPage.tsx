import LockIcon from "@mui/icons-material/Lock";
import { Box, Button, TextField, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  useCreateNewUserMutation,
  useLoginUserMutation,
} from "../features/api/userApiSlice";
import { login } from "../features/user/userSlice";
import { errorHandler } from "../helpers/errorHandler";
import { RTKQError, User } from "../interfaces";

type FormData = {
  name: string | undefined;
  password: string | undefined;
};

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.userData);

  const [signUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: undefined,
    password: undefined,
  });

  const [loginUser, { isLoading: loginUserLoading }] = useLoginUserMutation();
  const [createUser, { isLoading: createUserLoading }] =
    useCreateNewUserMutation();

  const toggleSignUp = () => setSignUp(!signUp);

  const handleFormDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, [user, navigate]);

  const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.password) return;

    try {
      if (signUp) {
        // create new user
        await createUser({
          name: formData.name,
          password: formData.password,
        })
          .unwrap()
          .then((res) => {
            const user: { userData: User; accessToken: string } = {
              userData: res.user,
              accessToken: res.accessToken,
            };
            dispatch(login(user));
            navigate(-1);
          });
      } else {
        // login user
        await loginUser({
          name: formData.name,
          password: formData.password,
        })
          .unwrap()
          .then((res) => {
            const user: { userData: User; accessToken: string } = {
              userData: res.user,
              accessToken: res.accessToken,
            };
            dispatch(login(user));
            navigate(-1);
          });
      }
    } catch (error) {
      errorHandler(error as RTKQError);
    }
  };

  return (
    <Container sx={{ paddingTop: ".75rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "4rem auto 0 auto",
          maxWidth: "600px",
          width: "85%",
        }}
      >
        <Typography variant="h4">{signUp ? "Sign up" : "Sign in"}</Typography>
        <LockIcon
          fontSize="large"
          color="secondary"
          sx={{ margin: "1rem 0" }}
        />

        <form
          onSubmit={handleFormSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            width: "100%",
          }}
        >
          <TextField
            type="text"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormDataChange}
            required
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleFormDataChange}
            required
          />

          <Button
            sx={{ alignSelf: "flex-end" }}
            variant="text"
            onClick={toggleSignUp}
          >
            {signUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </Button>

          <Button variant="contained" type="submit">
            {!loginUserLoading || !createUserLoading ? (
              signUp ? (
                "Sign up"
              ) : (
                "Sign in"
              )
            ) : (
              <CircularProgress />
            )}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AuthPage;
