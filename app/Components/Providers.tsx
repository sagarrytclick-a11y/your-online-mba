"use client";

import { ModalProvider } from "../Context/ModalContext";
import { BlogProvider } from "../Context/BlogContext";
import { ExamProvider } from "../Context/ExamContext";
import Modal from "./Modal";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <BlogProvider>
        <ExamProvider>
          {children}
          <Modal />
        </ExamProvider>
      </BlogProvider>
    </ModalProvider>
  );
}
