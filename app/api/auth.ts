import { useEffect, useState } from "react";
import { apiClient } from "./index";
import { useNavigate } from "react-router";

/**
 * 
 * @param credentials 
 * @returns 
 * 
 * login function that takes user credentials and sends a POST request to the appropriate login endpoint based on the user's role (customer or employee). If the login is successful, it stores the JWT token, its expiration time, and the user's role in localStorage for future authenticated requests. If the login fails, it returns a rejected promise with the error message.
 */
export async function login(credentials: any) {
  try {
    const url =
      credentials.loginDetails.role === "customer"
        ? "/login/customer"
        : "/login/employee";

    const response = await apiClient.post(url, credentials);

    if (response.data.auth === "success") {
      const expiresIn =
        credentials.loginDetails.role === "customer" ? 900_000 : 7_200_000; // ms
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("tokenExpiration", (Date.now() + expiresIn).toString());
      localStorage.setItem("role", response.data.role);
      return response.data;
    } else {
      return Promise.reject(response.data.message);
    }
  } catch (error: any) {
    return Promise.reject(error.message);
  }
}

/**
 * 
 * @param userData 
 * @returns 
 * 
 * registerCustomer function that takes user data and sends a POST request to the customer registration endpoint. If the registration is successful, it stores the JWT token, its expiration time, and the user's role in localStorage. If the registration fails, it returns a rejected promise with the error message.
 */
export async function registerCustomer(userData: any) {
  try {
    const response = await apiClient.post("/login/register/onlineAccount", userData);
    if (response.data.auth === "success") {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("tokenExpiration", (Date.now() + 900_000).toString());
      localStorage.setItem("role", response.data.role);
      return response.data;
    } else {
      return Promise.reject(response.data.message);
    }
  } catch (error: any) {
    return Promise.reject(error.message);
  }
}

export interface User  {
  id: string
  username: string
  email: string
  role: string
}
export async function isAuth(): Promise<User | null> {
  try {
    const response = await apiClient.get("/login/user-auth");
    const { user } = response.data;
    return user;
  } catch (error) {
    console.error("Auth check failed:",error );
    return null;
  }
}

export async function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiration");
  localStorage.removeItem("role");
  return Promise.resolve("Logout Successful");
}

export function useAuthRedirect() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      // Token missing or expired
      if (!token || !tokenExpiration || Date.now() > +tokenExpiration) {
        localStorage.clear();
        navigate("/CustomerLogin");
        return;
      }

      try {
        const response = await apiClient.get("/login/user-auth");
        const { user } = response.data;
        console.log("Auth check response:", response.data);

        if (!user) {
          localStorage.clear();
          navigate("/CustomerLogin");
          return;
        }

        setUser(user);
      } catch (err) {
        console.error("Auth check failed:", err);
        localStorage.clear();
        navigate("/CustomerLogin");
      }
    };

    checkAuth();
  }, [navigate]);

  return user;
}

export interface Transaction {
  date: string;
  description: string | null;
  transaction_type: string;
  amount: string;
  status: string;
}

export async function getCustomerTransactions(customer_id: string): Promise<Transaction[]> {
  try {
    const response = await apiClient.get("/transactions/customer", {
      params: { customer_id } // sends as query parameter
    });
    return response.data; 
  } catch (error: any) {
    console.error("Failed to fetch transactions:", error);
    return [];
  }
}

export interface Account {
  id: number;
  number: string;
  type: string;
  currency: string;
  balance: number;
  status: string;
}

export interface UserAccounts {
  customerID: number;
  accounts: Account[];
}

export async function getCurrentAccount(customerID: number): Promise<Account | null> {
  try {
    const response = await apiClient.get("/user/api/getBalance", { params: { customerID } });
    const accounts: Account[] = response.data.accounts;
    console.log("Fetched accounts:", accounts);
    return accounts.find(acc => acc.type === "current") || null;
  } catch (error: any) {
    console.error("Failed to fetch current account:", error);
    return null;
  }
}