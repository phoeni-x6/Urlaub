"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

type RichTextEditorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "blockquote"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "align",
  "link",
  "blockquote",
];

export default function RichTextEditor({
  label,
  value,
  onChange,
  placeholder = "Write blog content...",
}: RichTextEditorProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>

      <div className="overflow-hidden rounded-2xl border border-[#d7e5df] bg-[#f8fbfa]">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="admin-quill-editor"
        />
      </div>

      <style jsx global>{`
        .admin-quill-editor .ql-toolbar {
          border: none;
          border-bottom: 1px solid #d7e5df;
          background: #f8fbfa;
        }

        .admin-quill-editor .ql-container {
          border: none;
          min-height: 220px;
          font-size: 14px;
          color: #123128;
          background: #f8fbfa;
        }

        .admin-quill-editor .ql-editor {
          min-height: 220px;
          line-height: 1.7;
        }

        .admin-quill-editor .ql-editor.ql-blank::before {
          color: #7a948b;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}