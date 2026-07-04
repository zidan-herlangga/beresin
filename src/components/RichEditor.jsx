import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function RichEditor({ value, onChange, label, placeholder }) {
  const editorRef = useRef(null);

  return (
    <div className="mb-4">
      {label && <label className="block text-[11px] text-gray-500 mb-1.5 font-semibold uppercase tracking-wider">{label}</label>}
      <Editor
        tinymceScriptSrc="https://cdn.jsdelivr.net/npm/tinymce@7.6.1/tinymce.min.js"
        onInit={(evt, editor) => { editorRef.current = editor; }}
        value={value || ""}
        onEditorChange={(content) => onChange(content)}
        init={{
          height: 400,
          menubar: false,
          placeholder: placeholder || "Tulis konten di sini...",
          skin: "oxide-dark",
          content_css: "dark",
          promotion: false,
          branding: false,
          statusbar: false,
          plugins: [
            "advlist", "autolink", "lists", "link", "image", "charmap",
            "preview", "anchor", "searchreplace", "visualblocks", "code",
            "fullscreen", "insertdatetime", "media", "table", "help", "wordcount",
          ],
          toolbar:
            "undo redo | blocks | bold italic underline strikethrough | forecolor backcolor | " +
            "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
            "link image media | code fullscreen | removeformat help",
          content_style:
            "body { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; line-height: 1.7; color: #e2e8f0; background: #0f172a; }",
        }}
      />
    </div>
  );
}
