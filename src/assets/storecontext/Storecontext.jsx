
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [wishlist,setWishlist] =useState([])
  const [userLoaded, setUserLoaded] = useState(false);


  const [orders, setOrders] = useState([]);

  const API = "http://localhost:3002";


const [cartItems, setCartItems] = useState(() => {
  if (user?.id) {
    const savedCart = localStorage.getItem(`cart_${user.id}`);
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch {
        return [];
      }
    }
  }
  return [];
});


  
  useEffect(() => {
    
    if (user?.id) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
     
    }
  }, [cartItems, user?.id]);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API}/orders`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((x) => x.id === item.id);
      if (existing) {
        return prev.map((x) =>
          x.id === item.id && x.quantity<5 ?  { ...x, quantity: x.quantity + 1 } : x
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

 
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };


  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };


 const clearCart = () => {
    setCartItems([]);
    if (user?.id) {
      localStorage.removeItem(`cart_${user.id}`);
    }
  };

 
 const registerUser = async (newUser) => {
    try {
      const { data } = await axios.get(
        `${API}/userDetails?email=${newUser.email}`
      );
      if (data.length) return false;      
      await axios.post(`${API}/userDetails`, newUser);
      return true;
    } catch (err) {
      console.error("Register error:", err);
      return false;
    }
  };


  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.get(
        `${API}/userDetails?email=${email}&password=${password}`
      );
      if (data.length === 1) {
        const { password: _, ...userWithoutPassword } = data[0];
        setUser(userWithoutPassword);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        return true;
      }else{
        return false;
      }
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };
   const logout = () => {
    setUser(null);
    setCartItems([]);
    setOrders([]);
    localStorage.removeItem("user");
  };

  const placeOrder = async (order) => {
    try {
      await axios.post(`${API}/orders`, order);
      setOrders((prev) => [...prev, order]);
    } catch (err) {
      console.error("Failed to place order:", err);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setUserLoaded(true);
  }, []);

  useEffect(() => {
    if (user && userLoaded) {
      const storedWishlist = localStorage.getItem(`wishlist_${user.email}`);
      setWishlist(storedWishlist ? JSON.parse(storedWishlist) : []);
    } else if (userLoaded) {
      setWishlist([]);
    }
  }, [user, userLoaded]);

  useEffect(() => {
    if (user && userLoaded) {
      localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(wishlist));
    }
  }, [wishlist, user, userLoaded]);

 const addToWishlist = (item) => {
  setWishlist((prevwishist)=>{
   
    if(!prevwishist.some((i)=>i.id===item.id)) {
return [...prevwishist, item]
    }
    return prevwishist
  })
  }

 const removeFromWishlist = (id) => {
  setWishlist((prev) => prev.filter((item) => item.id !== id));
};

  return (
    <StoreContext.Provider
      value={{
        user,
        setUser,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orders,
        placeOrder,
        logout,
        loginUser,
        registerUser,
        setCartItems,
        addToWishlist,
        removeFromWishlist,
        wishlist,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
