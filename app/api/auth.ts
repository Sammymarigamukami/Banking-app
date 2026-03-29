
import { useEffect, useState } from "react";
import { apiClient } from "./index";
import { useNavigate } from "react-router";



// Helper to decode JWT expiration
const getTokenExpiration = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000;
  } catch {
    return Date.now() + 3600000; // Fallback to 1 hour if decoding fails
  }
};
const persistSession = (user: any) => {
  localStorage.setItem("token", user.token);
  localStorage.setItem("tokenExpiration", getTokenExpiration(user.token).toString());
  localStorage.setItem("role", user.role);
  localStorage.setItem("userName", user.displayName);
};
/**
 * CUSTOMER LOGIN
 */
export async function loginCustomer(credentials: any) {
  try {
    const response = await apiClient.post("/login/customer", credentials);

    if (response.data.auth !== "success") {
      throw new Error(response.data.message || "Customer login failed");
    }

    const data = response.data;
    const user = {
      token: data.token,
      role: "customer",
      userId: data.customerId,
      displayName: data.userName, // Customer API uses userName
      email: data.email,
    };

    persistSession(user);
    return user;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message || error.message || "Server Error");
  }
}

/**
 * EMPLOYEE / ADMIN LOGIN
 */
export async function loginEmployee(credentials: any) {
  try {
    const response = await apiClient.post("/login/employee", credentials);

    if (response.data.auth !== "success") {
      throw new Error(response.data.message || "Employee login failed");
    }

    const data = response.data;
    const user = {
      token: data.token,
      // Take the first role from the roles array (e.g., "employee" or "admin")
      role: data.roles?.[0] || "employee",
      userId: data.employeeId,
      displayName: data.username, // Employee API uses username (lowercase)
      branchId: data.branchId,
    };

    persistSession(user);
    return user;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message || error.message || "Server Error");
  }
}

/**
 * 
 * @param userData 
 * @returns 
 * 
 * registerCustomer function that takes user data and sends a POST request to the 
 * customer registration endpoint. If the registration is successful, it stores the JWT token, its expiration time,
 *  and the user's role in localStorage. If the registration fails, it returns a rejected promise with the error message.
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
  const [customer, setCustomer] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkCustomer = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const expiry = localStorage.getItem("tokenExpiration");

      if (!token || role !== "customer" || Date.now() > Number(expiry)) {
        localStorage.clear();
        navigate("/CustomerLogin"); 
        return;
      }

      try {
        const response = await apiClient.get("/login/user-auth");
        const user = response.data.user;
        console.log("Authenticated user data:", user); // Log the user data for debugging

        if (!user || user.role !== "customer") {
          throw new Error("Unauthorized");
        }

        setCustomer(user);
      } catch (err) {
        localStorage.clear();
        navigate("/CustomerLogin");
      }
    };

    checkCustomer();
  }, [navigate]);

  return customer;
}


export function useEmployeeAuth() {
  const [employee, setEmployee] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkEmployee = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const expiry = localStorage.getItem("tokenExpiration");

      // 1. Initial Local Check
      // Block anyone who isn't an employee/admin or has an expired token
      const isStaff = role === "employee" || role === "admin" || role === "manager";
      
      if (!token || !isStaff || Date.now() > Number(expiry)) {
        console.warn("Unauthorized access attempt or session expired.");
        localStorage.clear();
        navigate("/EmployeeLogin"); // Direct redirect to Employee portal login
        return;
      }

      try {
        // 2. Server-Side Verification
        const response = await apiClient.get("/login/user-auth");
        const userData = response.data.user;

        // Ensure the server confirms they still have a staff role
        const serverRoles = Array.isArray(userData.role) ? userData.role : [userData.role];
        const hasStaffAccess = serverRoles.some((r: string) => 
          ["employee", "admin", "manager"].includes(r)
        );

        if (!userData || !hasStaffAccess) {
          throw new Error("Insufficient permissions");
        }

        setEmployee(userData);
      } catch (err) {
        console.error("Employee Auth Check Failed:", err);
        localStorage.clear();
        navigate("/AdminLogin");
      }
    };

    checkEmployee();
  }, [navigate]);

  return employee;
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

export async function depositViaPpesa(customerID: number, amount: number, phoneNumber: string): Promise<string> {
  try {
    const response = await apiClient.post("/user/api/deposit", { customerID, amount, phoneNumber });
    return response.data.message;
  } catch (error: any) {
    console.error("Failed to deposit via Ppesa:", error);
    return "Deposit failed";
  }
}

export async function getAdminDashboardStats() {
  try {
    const response = await apiClient.get("/admin/api/dashboard");

    console.log("Admin Dashboard Stats Response:", response.data); // Log the full response for debugging

    if (response.data && response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (error: any) {
    console.error("Failed to fetch admin dashboard stats:", error);
    return null;
  }
}

export async function getAdminAllTransactions(filters = {}) {
  try {
    const response = await apiClient.get("/transactions/admin/all", {
      params: filters // Sends type, status, fromDate, etc., as query strings
    });
    return response.data.success ? response.data.data : [];
  } catch (error) {
    console.error("Failed to fetch admin transactions:", error);
    return [];
  }
}


export const updateCustomerStatus = async (customerId: string | number, status: 'active' | 'suspended' | 'closed') => {
  try {
    // This hits the /admin/api/customers/:id/status route we'll define next
    const response = await apiClient.patch(`/admin/api/customers/${customerId}/status`, { 
      status 
    });
    
    return response.data;
  } catch (error) {
    console.error("Failed to update status:", error);
    throw error;
  }
};


export const getCustomerFullProfile = async (customerId: string | number, filters = {}) => {
  try {
    const response = await apiClient.get(`/admin/api/customers/${customerId}`, {
      params: filters // Passes type, status, fromDate etc. to the backend
    });
    return response.data.success ? response.data.data : null;
  } catch (error) {
    console.error("Profile fetch error:", error);
    return null;
  }
};

export const getAllAdminCustomers = async (filters = {}) => {
  try {
    const response = await apiClient.get('/admin/api/customers', {
      params: filters // Allows filtering by status, account_type, etc.
    });
    
    // Following your existing pattern: return data if success is true
    return response.data.success ? response.data.data : [];
  } catch (error) {
    console.error("Admin customers fetch error:", error);
    return []; // Return empty array on error to prevent mapping crashes in UI
  }
};

export interface ActiveAccountReport {
  customerId: number;
  accountNumber: string;
  holderName: string;
  type: 'savings' | 'current' | 'business';
  balance: string | number;
  status: string;
  lastActivity: string;
}

export const getActiveAccountsReport = async () => {
  try {
    const response = await apiClient.get('/admin/api/reports/active-accounts');
    
    // Returns the array from data: [...]
    return response.data.success ? response.data.data : [];
  } catch (error) {
    console.error("Active accounts report fetch error:", error);
    return [];
  }
};