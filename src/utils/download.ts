/**
 * Forces a browser to download a file from a URL instead of opening it.
 * Works for both local and external URLs.
 */
export const forceDownload = async (url: string, filename: string) => {
  try {
    // If it's a local file in the public folder, we can try the simple download attribute first
    if (url.startsWith("/") && !url.startsWith("//")) {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // For external URLs (like Supabase), fetching as a blob and creating an object URL
    // is the most reliable way to force a download.
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
    // Fallback: just open in a new tab if everything else fails
    window.open(url, "_blank");
  }
};
