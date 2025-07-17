"use client";

import { useState, useEffect, useTransition } from "react";
import { User, UserRole } from "@prisma/client";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { usePagination } from "@/hooks/usePagination";
import {
  updateUserRole,
  getCustomers,
} from "@/actions/customers/get-customers";

// UI Components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function CustomersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const usersPerPage = 5;
  const { currentPage, handlePageChange, calculatePagination } =
    usePagination(usersPerPage);

  // Load users on mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getCustomers();
        setUsers(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load users:", err);
        setError("No se pudieron cargar los usuarios");
        toast.error("Error al cargar los usuarios");
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Filter and paginate users
  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const { totalPages, indexOfFirst, indexOfLast } = calculatePagination(
    filteredUsers.length
  );
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  // Handle role change
  const handleRoleChange = (userId: string, isAdmin: boolean) => {
    const newRole: UserRole = isAdmin ? "ADMIN" : "USER";

    startTransition(async () => {
      try {
        await updateUserRole(userId, newRole);
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
        toast.success("Rol actualizado correctamente");
      } catch (err) {
        console.error("Failed to update role:", err);
        toast.error("Error al actualizar el rol");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <p>Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">{error}</div>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Administración de Usuarios</h1>
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar por nombre o email..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handlePageChange(1);
            }}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-md border mb-4 overflow-hidden">
        <Table>
          <TableCaption className="py-4">
            {isPending
              ? "Actualizando rol..."
              : `Mostrando ${currentUsers.length} de ${filteredUsers.length} usuarios`}
          </TableCaption>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Fecha de Registro</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={user.role === "ADMIN"}
                        onCheckedChange={(checked) =>
                          handleRoleChange(user.id, checked)
                        }
                        id={`role-switch-${user.id}`}
                        disabled={isPending}
                      />
                      <Label htmlFor={`role-switch-${user.id}`}>
                        {user.role === "ADMIN" ? "Admin" : "User"}
                      </Label>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(user.email);
                        toast.success("Email copiado al portapapeles");
                      }}
                    >
                      Copiar Email
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  {searchTerm
                    ? "No hay resultados para la búsqueda"
                    : "No hay usuarios registrados"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isPending}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <Button
                  key={number}
                  variant={currentPage === number ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(number)}
                  disabled={isPending}
                >
                  {number}
                </Button>
              )
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isPending}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
