import { HttpAgent } from "@icp-sdk/core/agent";
import { loadConfig } from "../config";
import { StorageClient } from "../utils/StorageClient";
import { useInternetIdentity } from "./useInternetIdentity";

export function useBlobStorage() {
  const { identity } = useInternetIdentity();

  const getStorageClient = async (): Promise<StorageClient> => {
    const config = await loadConfig();
    const agent = new HttpAgent({
      identity: identity ?? undefined,
      host: config.backend_host,
    });
    if (config.backend_host?.includes("localhost")) {
      await agent.fetchRootKey().catch(console.warn);
    }
    return new StorageClient(
      config.bucket_name,
      config.storage_gateway_url,
      config.backend_canister_id,
      config.project_id,
      agent,
    );
  };

  const uploadBytes = async (
    bytes: Uint8Array,
    onProgress?: (pct: number) => void,
  ): Promise<string> => {
    const client = await getStorageClient();
    const { hash } = await client.putFile(bytes, onProgress);
    return hash;
  };

  const getDirectURL = async (hash: string): Promise<string> => {
    const client = await getStorageClient();
    return client.getDirectURL(hash);
  };

  const downloadBytes = async (hash: string): Promise<Uint8Array> => {
    const url = await getDirectURL(hash);
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Download failed: ${response.statusText}`);
    const buffer = await response.arrayBuffer();
    return new Uint8Array(buffer);
  };

  return { uploadBytes, getDirectURL, downloadBytes };
}
