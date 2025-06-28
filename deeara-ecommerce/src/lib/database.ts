import { supabase, Product, CartItem, WishlistItem, Order, Feedback } from './supabase'
import toast from 'react-hot-toast'

// Product operations
export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching products:', error)
    toast.error('Failed to load products')
    return []
  }
}

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching featured products:', error)
    toast.error('Failed to load featured products')
    return []
  }
}

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching product:', error)
    toast.error('Failed to load product')
    return null
  }
}

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('name', `%${query}%`)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error searching products:', error)
    toast.error('Failed to search products')
    return []
  }
}

// Cart operations
export const getCartItems = async (userId: string): Promise<CartItem[]> => {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching cart items:', error)
    toast.error('Failed to load cart items')
    return []
  }
}

export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number,
  size: string,
  color: string
): Promise<CartItem | null> => {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .insert({
        user_id: userId,
        product_id: productId,
        quantity,
        size,
        color,
      })
      .select(`
        *,
        product:products(*)
      `)
      .single()

    if (error) throw error
    toast.success('Added to cart successfully')
    return data
  } catch (error) {
    console.error('Error adding to cart:', error)
    toast.error('Failed to add item to cart')
    return null
  }
}

export const updateCartItemQuantity = async (
  itemId: string,
  quantity: number
): Promise<CartItem | null> => {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
      .select(`
        *,
        product:products(*)
      `)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating cart item:', error)
    toast.error('Failed to update cart item')
    return null
  }
}

export const removeFromCart = async (itemId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)

    if (error) throw error
    toast.success('Item removed from cart')
    return true
  } catch (error) {
    console.error('Error removing from cart:', error)
    toast.error('Failed to remove item from cart')
    return false
  }
}

export const clearCart = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)

    if (error) throw error
    toast.success('Cart cleared successfully')
    return true
  } catch (error) {
    console.error('Error clearing cart:', error)
    toast.error('Failed to clear cart')
    return false
  }
}

// Wishlist operations
export const getWishlistItems = async (userId: string): Promise<WishlistItem[]> => {
  try {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select(`
        *,
        product:products(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching wishlist items:', error)
    toast.error('Failed to load wishlist items')
    return []
  }
}

export const addToWishlist = async (
  userId: string,
  productId: string
): Promise<WishlistItem | null> => {
  try {
    const { data, error } = await supabase
      .from('wishlist_items')
      .insert({
        user_id: userId,
        product_id: productId,
      })
      .select(`
        *,
        product:products(*)
      `)
      .single()

    if (error) throw error
    toast.success('Added to wishlist successfully')
    return data
  } catch (error) {
    console.error('Error adding to wishlist:', error)
    toast.error('Failed to add item to wishlist')
    return null
  }
}

export const removeFromWishlist = async (itemId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('id', itemId)

    if (error) throw error
    toast.success('Item removed from wishlist')
    return true
  } catch (error) {
    console.error('Error removing from wishlist:', error)
    toast.error('Failed to remove item from wishlist')
    return false
  }
}

// Order operations
export const createOrder = async (
  userId: string,
  totalAmount: number,
  items: any[],
  shippingAddress: any,
  billingAddress: any
): Promise<Order | null> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: totalAmount,
        items,
        shipping_address: shippingAddress,
        billing_address: billingAddress,
      })
      .select()
      .single()

    if (error) throw error
    toast.success('Order created successfully')
    return data
  } catch (error) {
    console.error('Error creating order:', error)
    toast.error('Failed to create order')
    return null
  }
}

export const getOrders = async (userId: string): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching orders:', error)
    toast.error('Failed to load orders')
    return []
  }
}

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching order:', error)
    toast.error('Failed to load order')
    return null
  }
}

// Feedback operations
export const submitFeedback = async (
  name: string,
  email: string,
  message: string,
  rating: number
): Promise<Feedback | null> => {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .insert({
        name,
        email,
        message,
        rating,
      })
      .select()
      .single()

    if (error) throw error
    toast.success('Feedback submitted successfully')
    return data
  } catch (error) {
    console.error('Error submitting feedback:', error)
    toast.error('Failed to submit feedback')
    return null
  }
} 