import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { formatError } from "helpers/general";
import { axiosInstance } from "services/axiosInstance";
import { Room } from "types/Room";

const PREFIX = "room";

interface IInitialState {
    items: Room[];
    isLoading: boolean;
    modal: {
        isOpen: boolean;
        room?: Room;
    };
    meta: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
    };
    links: {
        next: string;
        previous: string;
    };
}

const initialState: IInitialState = {
    items: [],
    isLoading: false,
    modal: {
        isOpen: false
    },
    meta: {
        totalItems: 0,
        totalPages: 0,
        currentPage: 1
    },
    links: {
        next: "",
        previous: ""
    }
};

export const getRooms = createAsyncThunk<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    string,
    {
        rejectValue: {
            error: string;
        };
    }
>(`${PREFIX}/getRooms`, async (page = "1", thunkAPI) => {
    try {
        const link = "/room?page=" + page;
        const { data } = await axiosInstance.get(link);
        return data;
    } catch (err) {
        const error = formatError(err);
        return thunkAPI.rejectWithValue({
            error
        });
    }
});

const roomSlice = createSlice({
    name: PREFIX,
    initialState,
    reducers: {
        showCreateRoomModal: (state, action) => {
            state.modal.isOpen = true;
            if (action.payload) {
                state.modal.room = action.payload;
            }
        },
        hideCreateRoomModal: state => {
            state.modal.isOpen = false;
            state.modal.room = undefined;
        }
    },
    extraReducers: builder => {
        builder.addCase(getRooms.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(getRooms.fulfilled, (state, action) => {
            state.items = action.payload.items;
            state.meta.totalItems = action.payload.meta.totalItems;
            state.meta.totalPages = action.payload.meta.totalPages;
            state.meta.currentPage = action.payload.meta.currentPage;
            state.links.next = action.payload.links.next;
            state.links.previous = action.payload.links.previous;
            state.isLoading = false;
        });
    }
});

export const { showCreateRoomModal, hideCreateRoomModal } = roomSlice.actions;

export default roomSlice.reducer;
