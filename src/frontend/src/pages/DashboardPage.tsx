import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useBlobStorage } from "@/hooks/useBlobStorage";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useAddFileMetadata,
  useDeleteFile,
  useMyFiles,
  useSearchFiles,
} from "@/hooks/useQueries";
import { useIsAdmin } from "@/hooks/useQueries";
import {
  decryptBytes,
  encryptBytes,
  getEncryptionPassword,
} from "@/utils/encryption";
import {
  formatFileSize,
  formatTimestamp,
  getFileIcon,
} from "@/utils/formatters";
import { Link, useRouter } from "@tanstack/react-router";
import {
  AlertCircle,
  Archive,
  Clock,
  Download,
  File as FileIcon,
  FileText,
  Film,
  FolderOpen,
  Image,
  Loader2,
  Lock,
  Music,
  Plus,
  Search,
  Settings,
  Shield,
  Star,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import type { FileMetadata } from "../backend.d";

function fileTypeIcon(fileName: string) {
  const t = getFileIcon(fileName);
  const cls = "h-4 w-4";
  if (t === "image") return <Image className={cls} />;
  if (t === "video") return <Film className={cls} />;
  if (t === "audio") return <Music className={cls} />;
  if (t === "document") return <FileText className={cls} />;
  if (t === "archive") return <Archive className={cls} />;
  return <FileIcon className={cls} />;
}

type FilterTab = "all" | "recent" | "starred";

export default function DashboardPage() {
  const { identity } = useInternetIdentity();
  const router = useRouter();
  const { data: files = [], isLoading, isError } = useMyFiles();
  const { data: isAdmin } = useIsAdmin();
  const { mutateAsync: addMetadata } = useAddFileMetadata();
  const { mutateAsync: deleteFile } = useDeleteFile();
  const { uploadBytes, downloadBytes } = useBlobStorage();

  const [filter, setFilter] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [starredIds, setStarredIds] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: searchResults } = useSearchFiles(search);

  useEffect(() => {
    if (!identity) {
      router.navigate({ to: "/login" });
    }
  }, [identity, router]);

  const principal = identity?.getPrincipal().toString() ?? "";
  const encPassword = getEncryptionPassword(principal);

  const displayedFiles: FileMetadata[] = search.trim()
    ? (searchResults ?? [])
    : filter === "starred"
      ? files.filter((f) => starredIds.has(f.fileId))
      : filter === "recent"
        ? [...files]
            .sort((a, b) => Number(b.uploadTimestamp - a.uploadTimestamp))
            .slice(0, 10)
        : files;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !identity) return;
    try {
      setUploadProgress(0);
      const bytes = new Uint8Array(await file.arrayBuffer());
      const encrypted = await encryptBytes(bytes, encPassword);
      const hash = await uploadBytes(encrypted, (pct) =>
        setUploadProgress(pct),
      );
      const metadata: FileMetadata = {
        owner: identity.getPrincipal(),
        isEncrypted: true,
        size: BigInt(file.size),
        fileName: file.name,
        uploadTimestamp: BigInt(Date.now()) * BigInt(1_000_000),
        fileId: hash,
      };
      await addMetadata(metadata);
      toast.success(`"${file.name}" encrypted and uploaded successfully.`);
    } catch (err) {
      toast.error(`Upload failed: ${(err as Error).message}`);
    } finally {
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDownload = async (file: FileMetadata) => {
    setDownloadingId(file.fileId);
    try {
      const encBytes = await downloadBytes(file.fileId);
      const decBytes = file.isEncrypted
        ? await decryptBytes(encBytes, encPassword)
        : encBytes;
      const blob = new Blob([decBytes.buffer as ArrayBuffer]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.fileName;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`"${file.fileName}" downloaded and decrypted.`);
    } catch (err) {
      toast.error(`Download failed: ${(err as Error).message}`);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = async (fileId: string, fileName: string) => {
    setDeletingId(fileId);
    try {
      await deleteFile(fileId);
      toast.success(`"${fileName}" deleted.`);
    } catch (err) {
      toast.error(`Delete failed: ${(err as Error).message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const toggleStar = (fileId: string) => {
    setStarredIds((prev) => {
      const next = new Set(prev);
      if (next.has(fileId)) next.delete(fileId);
      else next.add(fileId);
      return next;
    });
  };

  if (!identity) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex flex-1">
        <div className="mx-auto flex w-full max-w-7xl flex-1 gap-0 px-0">
          {/* Sidebar */}
          <aside className="hidden w-56 shrink-0 flex-col border-r border-border/50 bg-sidebar px-3 py-6 sm:flex">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              My Files
            </p>
            <nav className="space-y-0.5">
              {(["all", "recent", "starred"] as FilterTab[]).map((tab) => {
                const icons = { all: FolderOpen, recent: Clock, starred: Star };
                const labels = {
                  all: "All Files",
                  recent: "Recent",
                  starred: "Starred",
                };
                const Icon = icons[tab];
                return (
                  <button
                    type="button"
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                      filter === tab
                        ? "bg-primary/15 text-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                    data-ocid={"dashboard.tab"}
                  >
                    <Icon className="h-4 w-4" />
                    {labels[tab]}
                    {tab === "all" && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {files.length}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </nav>

            {isAdmin && (
              <>
                <Separator className="my-4 border-border/50" />
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Admin Panel
                </p>
                <nav className="space-y-0.5">
                  <Link
                    to="/admin"
                    className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
                    data-ocid="dashboard.link"
                  >
                    <Users className="h-4 w-4" />
                    Users
                  </Link>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
                    data-ocid="dashboard.button"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                </nav>
              </>
            )}
          </aside>

          {/* Main content */}
          <div className="flex flex-1 flex-col p-6">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  My Encrypted Files
                </h1>
                <p className="text-sm text-muted-foreground">
                  {files.length} file{files.length !== 1 ? "s" : ""} stored
                  securely
                </p>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search files..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                    data-ocid="dashboard.search_input"
                  />
                </div>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadProgress !== null}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                  data-ocid="dashboard.upload_button"
                >
                  {uploadProgress !== null ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {uploadProgress}%
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Upload
                    </>
                  )}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleUpload}
                  data-ocid="dashboard.upload_button"
                />
              </div>
            </div>

            {/* Upload progress */}
            {uploadProgress !== null && (
              <div
                className="mb-4 rounded-lg border border-primary/30 bg-primary/5 p-4"
                data-ocid="dashboard.loading_state"
              >
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-foreground">
                    Encrypting &amp; uploading...
                  </span>
                  <span className="text-primary">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {/* Error state */}
            {isError && (
              <div
                className="mb-4 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                data-ocid="dashboard.error_state"
              >
                <AlertCircle className="h-4 w-4" />
                Failed to load files. Please refresh.
              </div>
            )}

            {/* Loading state */}
            {isLoading && (
              <div
                className="flex items-center justify-center py-16"
                data-ocid="dashboard.loading_state"
              >
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {/* Empty state */}
            {!isLoading && displayedFiles.length === 0 && (
              <div
                className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 py-16 text-center"
                data-ocid="dashboard.empty_state"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {search ? "No files found" : "No files yet"}
                </h3>
                <p className="mb-6 max-w-xs text-sm text-muted-foreground">
                  {search
                    ? "Try a different search term"
                    : "Upload your first file to start your encrypted vault."}
                </p>
                {!search && (
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    data-ocid="dashboard.upload_button"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload First File
                  </Button>
                )}
              </div>
            )}

            {/* File list */}
            {!isLoading && displayedFiles.length > 0 && (
              <div className="space-y-2">
                {displayedFiles.map((file, i) => (
                  <Card
                    key={file.fileId}
                    className="border-border/50 bg-card/60 transition-all hover:border-primary/30 hover:shadow-glow"
                    data-ocid={`dashboard.item.${i + 1}`}
                  >
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        {fileTypeIcon(file.fileName)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-medium text-foreground">
                            {file.fileName}
                          </p>
                          {file.isEncrypted && (
                            <Badge
                              variant="outline"
                              className="shrink-0 border-primary/30 text-xs text-primary"
                            >
                              <Lock className="mr-1 h-2.5 w-2.5" />
                              AES-256
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)} ·{" "}
                          {formatTimestamp(file.uploadTimestamp)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleStar(file.fileId)}
                          className={`h-8 w-8 p-0 ${
                            starredIds.has(file.fileId)
                              ? "text-secondary"
                              : "text-muted-foreground hover:text-secondary"
                          }`}
                          data-ocid={`dashboard.toggle.${i + 1}`}
                        >
                          <Star
                            className={`h-4 w-4 ${starredIds.has(file.fileId) ? "fill-secondary" : ""}`}
                          />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDownload(file)}
                          disabled={downloadingId === file.fileId}
                          className="h-8 gap-1 px-2 text-xs text-primary hover:bg-primary/10"
                          data-ocid={`dashboard.secondary_button.${i + 1}`}
                        >
                          {downloadingId === file.fileId ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Download className="h-3.5 w-3.5" />
                          )}
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            handleDelete(file.fileId, file.fileName)
                          }
                          disabled={deletingId === file.fileId}
                          className="h-8 gap-1 px-2 text-xs text-destructive hover:bg-destructive/10"
                          data-ocid={`dashboard.delete_button.${i + 1}`}
                        >
                          {deletingId === file.fileId ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
