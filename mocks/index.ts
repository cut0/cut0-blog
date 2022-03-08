import { setupWorker } from "msw";
import { setupServer } from "msw/node";
import { userHandlers, blogContentHandlers, tagHandlers } from "./models";

export const initializeMock = () => {
  if (typeof window === "undefined") {
    const server = setupServer(
      ...userHandlers,
      ...blogContentHandlers,
      ...tagHandlers,
    );
    server.listen();
  } else {
    const worker = setupWorker(
      ...userHandlers,
      ...blogContentHandlers,
      ...tagHandlers,
    );
    worker.start();
  }
};
