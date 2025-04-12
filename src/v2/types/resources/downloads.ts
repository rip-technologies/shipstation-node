export interface DownloadFileOptions {
  dir: string;
  subdir: string;
  filename: string;
  download?: string;
  /** integer (int32) */
  rotation?: number;
}

export type DownloadFileResponse = string;
