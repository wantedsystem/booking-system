import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { formatError } from "helpers/general";
import { mapUser, removeToken, setToken } from "helpers/session";
import { axiosInstance as axios } from "services/axiosInstance";
import { User } from "types/User";

const PREFIX = "user";

export enum LoginStatus {
    LOGGED_IN = "LOGGED_IN",
    PENDING = "PENDING",
    LOGGED_OUT = "LOGGED_OUT"
}

interface initialStateProps {
    authStatus: LoginStatus;
    error: string;
    user: User | null;
}

const initialState: initialStateProps = {
    authStatus: LoginStatus.PENDING,
    error: "",
    user: null
};

export const userLogin = createAsyncThunk<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    { username: string; password: string },
    { rejectValue: { error: string } }
>(`${PREFIX}/login`, async (credentials, thunkAPI) => {
    try {
        const { data } = await axios.post("/login", credentials);
        return data;
    } catch (err) {
        const error = formatError(err);
        return thunkAPI.rejectWithValue({ error });
    }
});

export const getUser = createAsyncThunk<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    void,
    { rejectValue: { error: string } }
>(`${PREFIX}/profile`, async (_, thunkAPI) => {
    try {
        const { data } = await axios.get("/profile");
        return data;
    } catch (err) {
        const error = formatError(err);
        return thunkAPI.rejectWithValue({ error });
    }
});

interface RegisterBody {
    username: string;
    email: string;
    password: string;
}
export const registerUser = createAsyncThunk<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    RegisterBody,
    {
        rejectValue: { error: string };
    }
>(`${PREFIX}/register`, async (body, thunkAPI) => {
    try {
        const { data } = await axios.post("/register", body);
        return data;
    } catch (err) {
        const error = formatError(err);
        return thunkAPI.rejectWithValue({ error });
    }
});

const userSlice = createSlice({
    name: PREFIX,
    initialState,
    reducers: {
        logout: state => {
            state.authStatus = LoginStatus.LOGGED_OUT;
            state.user = null;
            removeToken();
        },
        clearAuthError: state => {
            state.error = "";
        }
    },
    extraReducers: builder => {
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.authStatus = LoginStatus.LOGGED_IN;
            state.error = "";
            setToken(payload.token);
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            state.authStatus = LoginStatus.LOGGED_OUT;
            state.error = action.payload?.error ?? "";
        });

        // Get User via token
        builder.addCase(getUser.pending, state => {
            state.authStatus = LoginStatus.PENDING;
        });
        builder.addCase(getUser.fulfilled, (state, { payload }) => {
            state.authStatus = LoginStatus.LOGGED_IN;
            state.error = "";
            state.user = mapUser(payload);
        });
        builder.addCase(getUser.rejected, state => {
            state.authStatus = LoginStatus.LOGGED_OUT;
            state.error = "";
            state.user = null;
        });

        // Register User
        builder.addCase(registerUser.fulfilled, (state, { payload }) => {
            state.authStatus = LoginStatus.LOGGED_IN;
            setToken(payload.token);
        });
        builder.addCase(registerUser.rejected, (state, { payload }) => {
            state.authStatus = LoginStatus.LOGGED_OUT;
            state.error = payload?.error ?? "";
        });
    }
});

export const { clearAuthError, logout } = userSlice.actions;

export default userSlice.reducer;
