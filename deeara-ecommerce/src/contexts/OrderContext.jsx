import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const OrderContext = createContext()

export const useOrder = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider')
  }
  return context
}

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  // Load user's orders when user changes
  useEffect(() => {
    if (user) {
      loadUserOrders()
    } else {
      setOrders([])
    }
  }, [user])

  const loadUserOrders = async () => {
    if (!user) return
    
    setLoading(true)
    setError(null)
    
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/orders?userId=${user.id}`)
      // const data = await response.json()
      
      // For now, use mock data
      const mockOrders = [
        {
          id: '1',
          orderNumber: 'ORD-2024-001',
          date: new Date().toISOString(),
          status: 'pending',
          total: 299.99,
          items: [
            { id: '1', name: 'Luxury Dress', price: 199.99, quantity: 1 },
            { id: '2', name: 'Designer Handbag', price: 100.00, quantity: 1 }
          ]
        },
        {
          id: '2',
          orderNumber: 'ORD-2024-002',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'delivered',
          total: 599.99,
          items: [
            { id: '3', name: 'Premium Suit', price: 599.99, quantity: 1 }
          ]
        }
      ]
      
      setOrders(mockOrders)
    } catch (err) {
      setError('Failed to load orders')
      console.error('Error loading orders:', err)
    } finally {
      setLoading(false)
    }
  }

  const createOrder = async (orderData) => {
    setLoading(true)
    setError(null)
    
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(orderData)
      // })
      // const newOrder = await response.json()
      
      // For now, create mock order
      const newOrder = {
        id: Date.now().toString(),
        orderNumber: `ORD-2024-${String(orders.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString(),
        status: 'pending',
        ...orderData
      }
      
      setOrders(prev => [newOrder, ...prev])
      return newOrder
    } catch (err) {
      setError('Failed to create order')
      console.error('Error creating order:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    setLoading(true)
    setError(null)
    
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/orders/${orderId}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status })
      // })
      
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? { ...order, status } 
            : order
        )
      )
    } catch (err) {
      setError('Failed to update order status')
      console.error('Error updating order status:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId)
  }

  const getOrderByNumber = (orderNumber) => {
    return orders.find(order => order.orderNumber === orderNumber)
  }

  const value = {
    orders,
    loading,
    error,
    createOrder,
    updateOrderStatus,
    getOrderById,
    getOrderByNumber,
    loadUserOrders
  }

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  )
} 