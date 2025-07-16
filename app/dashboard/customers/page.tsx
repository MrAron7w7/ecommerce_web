"use client";

import { useEffect, useTransition, useState } from "react";
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
import { toast } from "sonner";
import { User, UserRole } from "@prisma/client";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateUserRole } from "@/actions/customers/get-customers";
import { useSearchParams, useRouter } from "next/navigation";

interface CustomersPageProps {
  initialUsers: User[];
}

export default function CustomersPage({
  initialUsers = [],
}: CustomersPageProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();
  const usersPerPage = 5;

  const searchParams = useSearchParams();
  const router = useRouter();

  const getPageFromUrl = () => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    return isNaN(page) || page < 1 ? 1 : page;
  };

  const [currentPage, setCurrentPage] = useState(getPageFromUrl());

  // Sync currentPage with URL
  useEffect(() => {
    const page = getPageFromUrl();
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  // Filtrar usuarios
  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Calcular páginas
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleRoleChange = (userId: string, isAdmin: boolean) => {
    const newRole: UserRole = isAdmin ? "ADMIN" : "USER";

    startTransition(() => {
      updateUserRole(userId, newRole)
        .then(() => {
          setUsers((prev) =>
            prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
          );
          toast.success("Rol actualizado correctamente");
        })
        .catch(() => toast.error("Error al actualizar el rol"));
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Administración de Usuarios</h1>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar por nombre o email..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handlePageChange(1); // Resetear a la primera página
            }}
          />
        </div>
      </div>

      <div className="rounded-md border mb-4">
        <Table>
          <TableCaption>
            {isPending
              ? "Actualizando rol..."
              : `Mostrando ${currentUsers.length} de ${filteredUsers.length} usuarios`}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Fecha de Registro</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
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
                    />
                    <Label htmlFor={`role-switch-${user.id}`}>
                      {user.role === "ADMIN" ? "Admin" : "User"}
                    </Label>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(user.email)}
                  >
                    Copiar Email
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Página {currentPage} de {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <Button
              key={number}
              variant={currentPage === number ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(number)}
            >
              {number}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
