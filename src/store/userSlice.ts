import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {api} from '../utils/api';

const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await api.getUser();
  return response;
});

const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: { email: string; firstName: string; lastName: string }, {rejectWithValue}) => {
    try {
      const response = await api.updateUser(data.email, data.firstName, data.lastName);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const updateProfileImage = createAsyncThunk(
  'user/updateProfileImage',
  async (data: { formData: FormData }, {rejectWithValue}) => {
    try {
      const response = await api.uploadProfileImage(data.formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const getProfileImage = createAsyncThunk(
  'user/getProfileImage',
  async (data, {rejectWithValue}) => {
    try {
      const response = await api.getProfileImage();
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    firstName: '',
    lastName: '',
    loading: false,
    success: false,
    isLogged: false,
    isVerified: false
  },
  reducers: {
    signInMockUser(state, action) {
      state.email = action.payload;
      state.isLogged = true;
      state.loading = false;
      state.success = true;
    },

    updateStatus(state, action) {
      state.isLogged = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Получение юзера, если есть token
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.email = action.payload.email;
      state.firstName = action.payload.first_name;
      state.lastName = action.payload.last_name;
      state.isVerified = action.payload.is_verified;
      state.isLogged = true;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.email = '';
      state.isLogged = false;
    });


    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.email = action.payload.email;
      state.firstName = action.payload.first_name;
      state.lastName = action.payload.last_name;
      state.isVerified = action.payload.is_verified;
      state.isLogged = true;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    // Обновление фото профиля
    builder.addCase(updateProfileImage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfileImage.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(updateProfileImage.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    // Получение фото профиля
    builder.addCase(getProfileImage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProfileImage.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(getProfileImage.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
  },
});

const userSliceReducer = userSlice.reducer;
const {signInMockUser, updateStatus} = userSlice.actions;

export {
  userSliceReducer,
  getUser,
  updateUser,
  signInMockUser,
  updateStatus,
  updateProfileImage,
  getProfileImage
};
