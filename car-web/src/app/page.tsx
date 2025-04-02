'use client'
import { AuthProvider } from "@/application/context/AuthContext";
import { NavBarComponent } from "@/ui/components/NavBarComponent";
import { ProtectedRoute } from "@/ui/components/ProtectedRoute";
import { CarCreatePage } from "@/ui/pages/CarCreatePage";
import { CarEditPage } from "@/ui/pages/CarEditPage";
import { CarList } from "@/ui/pages/CarList.Page";
import { DashboardPage } from "@/ui/pages/DashboardPage";
import { LoginPage } from "@/ui/pages/LoginPage";
import { RegisterPage } from "@/ui/pages/RegisterPage";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";


export default function Home() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
          <NavBarComponent />
          <main className="flex-grow mx-auto max-w-7xl p-4">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cars"
                element={
                  <ProtectedRoute>
                    <CarList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cars/create"
                element={
                  <ProtectedRoute>
                    <CarCreatePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cars/edit/:id"
                element={
                  <ProtectedRoute>
                    <CarEditPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </AuthProvider>
  );
}
