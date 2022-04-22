import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit';
import { api } from '../../services';
import {
  AxiosResponse,
  PaginationRequest,
  Range,
  SearchResponse,
} from '../../types/shared';
import { User } from '../../types/user';

export interface UsersPageState {
  items: User[];
  filteredItems: User[];
  isFetching: boolean;
  currentPage: number;
  perPage: number;
  sort: {
    type: string;
    direction: 'asc' | 'desc';
  };
  filter: {
    age: Range;
    name: string;
    gender: 'male' | 'female';
  };
}

const initialState: UsersPageState = {
  items: [],
  filteredItems: [],
  isFetching: true,
  currentPage: 1,
  perPage: 10,
  sort: {
    type: '',
    direction: 'asc',
  },
  filter: {
    age: {
      min: 1,
      max: 70,
    },
    name: '',
    gender: 'male',
  },
};

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async ({
    currentPage = 1,
    perPage = 50,
    gender = 'male',
  }: PaginationRequest) => {
    const response: AxiosResponse<SearchResponse<User>> = await api.get(
      `?page=${currentPage}&results=${perPage}&gender=${gender}`,
    );

    return response.data;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearData: state => {
      return (state = initialState);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      return (state = {
        ...state,
        currentPage: action.payload,
      });
    },
    setResultsPerPage: (state, action: PayloadAction<number>) => {
      return (state = {
        ...state,
        perPage: action.payload,
      });
    },
    onChangeFilterName: (state, action: PayloadAction<string>) => {
      // ? in my opinion, filtering should occur by changing the query string in the request to the API, but the API does not provide such an opportunity

      let newItems = [...current(state.items)];

      return (state = {
        ...state,
        filteredItems: newItems.filter(user => {
          return `${user.name.first} ${user.name.last}`
            .toLocaleLowerCase()
            .includes(action.payload.toLocaleLowerCase());
        }),
        filter: {
          ...state.filter,
          name: action.payload,
        },
      });
    },
    onChangeFilterGender: (state, action: PayloadAction<'male' | 'female'>) => {
      // ? in my opinion, filtering should occur by changing the query string in the request to the API, but the API does not provide such an opportunity
      return (state = {
        ...state,
        filter: {
          ...state.filter,
          gender: action.payload,
        },
      });
    },
    onChangeFilterAge: (state, action: PayloadAction<Range>) => {
      // ? in my opinion, filtering should occur by changing the query string in the request to the API, but the API does not provide such an opportunity
      let newItems: User[] = [...current(state.filteredItems)];

      return (state = {
        ...state,
        filteredItems: newItems.filter(user => {
          return (
            user.dob.age > action.payload.min &&
            user.dob.age < action.payload.max
          );
        }),
        filter: {
          ...state.filter,
          age: action.payload,
        },
      });
    },
    onChangeSortType: (state, action: PayloadAction<string>) => {
      // ? in my opinion, sorting too should occur by changing the query string in the request to the API, but the API does not provide such an opportunity
      let sortedItems = [...current(state.filteredItems)];

      switch (action.payload) {
        case 'name':
          sortedItems.sort((a, b) => a.name.first.localeCompare(b.name.first));
          break;
        case 'date of birth':
          sortedItems.sort(
            // @ts-ignore
            (a, b) => new Date(a.dob.date) - new Date(b.dob.date),
          );
          break;
        case 'city':
          sortedItems.sort((a, b) =>
            a.location.city.localeCompare(b.location.city),
          );
          break;
        default:
          break;
      }

      return (state = {
        ...state,
        items: sortedItems,
        filteredItems: sortedItems,
        sort: {
          ...state.sort,
          type: action.payload,
        },
      });
    },
    onChangeSortDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
      // ? in my opinion, sorting too should occur by changing the query string in the request to the API, but the API does not provide such an opportunity

      return (state = {
        ...state,
        sort: {
          ...state.sort,
          direction: action.payload,
        },
      });
    },

    setNewOrderItems: (state, action: PayloadAction<User[]>) => {
      return (state = {
        ...state,
        filteredItems: action.payload,
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        return (state = {
          ...state,
          isFetching: true,
        });
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<SearchResponse<User>>) => {
          return (state = {
            ...state,
            isFetching: false,
            items: action.payload.results,
            filteredItems: action.payload.results,
          });
        },
      );
  },
});

export const {
  setCurrentPage,
  setResultsPerPage,
  onChangeFilterAge,
  onChangeFilterGender,
  onChangeFilterName,
  onChangeSortDirection,
  onChangeSortType,
  setNewOrderItems,
  clearData,
} = usersSlice.actions;

export const usersSliceReducer = usersSlice.reducer;
