export const openUrl = (
  url: string,
  option: {
    isBlank?: boolean;
    isDownload?: boolean;
  } = {
    isBlank: false,
    isDownload: false
  }
): void => {
  if (!url) {
    console.error("URL is required");
    return;
  }

  const a = document.createElement("a");
  a.href = url;

  if (option.isBlank) a.target = "_blank";
  if (option.isDownload) a.setAttribute("download", "LunaCV");

  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
