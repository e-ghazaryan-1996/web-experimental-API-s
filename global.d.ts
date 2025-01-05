declare global {
  interface Window {
    documentPictureInPicture: {
      requestWindow: (options?: {
        width?: number;
        height?: number;
      }) => Promise<DocumentPictureInPictureWindow>;
    };
  }
}

export interface DocumentPictureInPictureWindow extends Window {
  document: Document;
}

export {};
