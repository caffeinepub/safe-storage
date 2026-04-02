import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useAssignRole, useIsAdmin } from "@/hooks/useQueries";
import { Principal } from "@icp-sdk/core/principal";
import { useRouter } from "@tanstack/react-router";
import {
  AlertCircle,
  Loader2,
  Shield,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import type { UserRole } from "../backend.d";

const SAMPLE_USERS = [
  {
    principal: "aaaaa-aa",
    displayName: "Mr. Adhikari Chandra Kiran",
    email: "chandra@safestorage.app",
    role: "admin",
  },
  {
    principal: "bbbbb-bb",
    displayName: "Mr. Adhikari Poorna Sai Srinivas",
    email: "poorna@safestorage.app",
    role: "admin",
  },
  {
    principal: "ccccc-cc",
    displayName: "Alice Johnson",
    email: "alice@example.com",
    role: "user",
  },
  {
    principal: "ddddd-dd",
    displayName: "Bob Smith",
    email: "bob@example.com",
    role: "user",
  },
  {
    principal: "eeeee-ee",
    displayName: "Carol White",
    email: "carol@example.com",
    role: "guest",
  },
];

export default function AdminPage() {
  const { identity } = useInternetIdentity();
  const router = useRouter();
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsAdmin();
  const { mutateAsync: assignRole, isPending } = useAssignRole();
  const [assigningPrincipal, setAssigningPrincipal] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!identity) {
      router.navigate({ to: "/login" });
    }
  }, [identity, router]);

  useEffect(() => {
    if (!isCheckingAdmin && isAdmin === false) {
      router.navigate({ to: "/dashboard" });
    }
  }, [isAdmin, isCheckingAdmin, router]);

  const handleRoleChange = async (principalStr: string, newRole: string) => {
    setAssigningPrincipal(principalStr);
    try {
      const principal = Principal.fromText(principalStr);
      await assignRole({ user: principal, role: newRole as UserRole });
      toast.success("Role updated successfully.");
    } catch (err) {
      toast.error(`Failed to update role: ${(err as Error).message}`);
    } finally {
      setAssigningPrincipal(null);
    }
  };

  const roleColors: Record<string, string> = {
    admin: "border-secondary/40 bg-secondary/10 text-secondary",
    user: "border-primary/40 bg-primary/10 text-primary",
    guest: "border-border bg-muted/50 text-muted-foreground",
  };

  if (!identity || isCheckingAdmin) {
    return (
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <main className="flex flex-1 items-center justify-center">
          <Loader2
            className="h-8 w-8 animate-spin text-primary"
            data-ocid="admin.loading_state"
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
              <Shield className="h-5 w-5" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Admin Panel
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage users and role assignments for Safe Storage.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Total Users",
              value: SAMPLE_USERS.length,
              icon: Users,
              color: "text-primary",
            },
            {
              label: "Admins",
              value: SAMPLE_USERS.filter((u) => u.role === "admin").length,
              icon: UserCheck,
              color: "text-secondary",
            },
            {
              label: "Guests",
              value: SAMPLE_USERS.filter((u) => u.role === "guest").length,
              icon: UserX,
              color: "text-muted-foreground",
            },
          ].map((stat) => (
            <Card
              key={stat.label}
              className="border-border/50 bg-card/60"
              data-ocid="admin.card"
            >
              <CardContent className="flex items-center gap-4 p-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User table */}
        <Card className="border-border/50 bg-card/60" data-ocid="admin.table">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5 text-primary" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {SAMPLE_USERS.map((user, i) => (
                <div
                  key={user.principal}
                  className="flex flex-col gap-3 rounded-lg border border-border/50 bg-accent/20 p-4 sm:flex-row sm:items-center"
                  data-ocid={`admin.row.${i + 1}`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary font-bold text-sm">
                    {user.displayName.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">
                      {user.displayName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={roleColors[user.role] ?? ""}
                    >
                      {user.role}
                    </Badge>
                    <Select
                      defaultValue={user.role}
                      onValueChange={(val) =>
                        handleRoleChange(user.principal, val)
                      }
                      disabled={
                        isPending && assigningPrincipal === user.principal
                      }
                    >
                      <SelectTrigger
                        className="w-32"
                        data-ocid={`admin.select.${i + 1}`}
                      >
                        {isPending && assigningPrincipal === user.principal ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <SelectValue />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="guest">Guest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {isPending && assigningPrincipal === user.principal && (
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
