export type PhotoBase64 = string;
export type MimeType = string; // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers

const FilePicker = (
  mimeType: MimeType
): Promise<{ base64String: PhotoBase64; mime: string; name: string }> =>
  new Promise((resolve) => {
    let input = document.getElementById(
      "_file-picker-input"
    ) as HTMLInputElement;

    const cleanup = () => {
      input.parentNode?.removeChild(input);
    };

    if (!input) {
      input = document.createElement("input") as HTMLInputElement;
      input.id = "_file-picker-input";
      input.type = "file";
      input.accept = mimeType;
      input.style.position = "fixed";
      input.style.top = "-1000%";

      document.body.appendChild(input);

      input.addEventListener("change", (_e: any) => {
        const file = input.files![0];

        const reader = new FileReader();

        reader.addEventListener("load", () => {
          const b64 = (reader.result as string).split(",")[1];

          resolve({
            base64String: b64,
            mime: file.type,
            name: file.name,
          });

          cleanup();
        });

        reader.readAsDataURL(file);
      });
    }

    input.click();
  });

export default FilePicker;
