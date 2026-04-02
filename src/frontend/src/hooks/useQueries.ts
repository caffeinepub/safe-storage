import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FileMetadata, UserProfile, UserRole } from "../backend.d";
import { useActor } from "./useActor";

export function useMyFiles() {
  const { actor, isFetching } = useActor();
  return useQuery<FileMetadata[]>({
    queryKey: ["myFiles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyFiles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCallerRole() {
  const { actor, isFetching } = useActor();
  return useQuery<string>({
    queryKey: ["callerRole"],
    queryFn: async () => {
      if (!actor) return "guest";
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCallerProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchFiles(searchTerm: string) {
  const { actor, isFetching } = useActor();
  return useQuery<FileMetadata[]>({
    queryKey: ["searchFiles", searchTerm],
    queryFn: async () => {
      if (!actor || !searchTerm.trim()) return [];
      return actor.searchFilesByCompositeIdentifier(searchTerm);
    },
    enabled: !!actor && !isFetching && searchTerm.trim().length > 0,
  });
}

export function useAddFileMetadata() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (metadata: FileMetadata) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.addFileMetadata(metadata);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myFiles"] }),
  });
}

export function useDeleteFile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (fileId: string) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.deleteFileAndMetadata(fileId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myFiles"] }),
  });
}

export function useSaveProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["callerProfile"] }),
  });
}

export function useAssignRole() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ user, role }: { user: Principal; role: UserRole }) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.assignCallerUserRole(user, role);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["isAdmin"] }),
  });
}
