import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    items: [],
    loading: false,
    error: null,
    message: null,
    messageType: null
  };

  
// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3005/api/cart', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw await response.json();
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3005/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ productId, quantity })
      });
      if (!response.ok) throw await response.json();
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3005/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ productId, quantity })
      });
      if (!response.ok) throw await response.json();
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeItem',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3005/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw await response.json();
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clear',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3005/api/cart/clear', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw await response.json();
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      clearMessage: (state) => {
        state.message = null;
        state.messageType = null;
      }
    },
    extraReducers: (builder) => {
      builder
        // Fetch cart
        .addCase(fetchCart.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCart.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(fetchCart.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.message = 'Failed to load cart items';
          state.messageType = 'error';
        })
        // Add to cart
        .addCase(addToCart.fulfilled, (state, action) => {
          state.items = action.payload;
          state.message = 'Item added to cart successfully';
          state.messageType = 'success';
        })
        .addCase(addToCart.rejected, (state, action) => {
          state.message = action.payload || 'Failed to add item to cart';
          state.messageType = 'error';
        })
        // Update cart item
        .addCase(updateCartItem.fulfilled, (state, action) => {
          state.items = action.payload;
          state.message = 'Cart updated successfully';
          state.messageType = 'success';
        })
        .addCase(updateCartItem.rejected, (state, action) => {
          state.message = action.payload || 'Failed to update cart';
          state.messageType = 'error';
        })
        // Remove from cart
        .addCase(removeFromCart.fulfilled, (state, action) => {
          state.items = action.payload;
          state.message = 'Item removed from cart';
          state.messageType = 'success';
        })
        .addCase(removeFromCart.rejected, (state, action) => {
          state.message = action.payload || 'Failed to remove item';
          state.messageType = 'error';
        })
        // Clear cart
        .addCase(clearCart.fulfilled, (state) => {
          state.items = [];
          state.message = 'Cart cleared successfully';
          state.messageType = 'success';
        })
        .addCase(clearCart.rejected, (state, action) => {
          state.message = action.payload || 'Failed to clear cart';
          state.messageType = 'error';
        });
    }
  });
  
  export const { clearMessage } = cartSlice.actions;
  export default cartSlice.reducer;