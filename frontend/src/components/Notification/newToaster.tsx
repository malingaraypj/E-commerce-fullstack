type ConfigType = {
  positionX: "left" | "center" | "right";
  positionY: "top" | "bottom";
  duration?: number;
  type: "info" | "error" | "success";
};

export const newToaster = (config: ConfigType) => {
  return (msg: string) => {
    // Create toast container
    const toast = document.createElement("div");
    toast.className = `fixed z-50 flex items-center justify-between gap-4 px-6 py-4 text-white rounded shadow-lg transition-opacity duration-500
      ${config.positionY === "top" ? "top-5" : "bottom-5"}
      ${
        config.positionX === "center"
          ? "left-1/2 transform -translate-x-1/2"
          : config.positionX === "left"
          ? "left-5"
          : "right-5"
      }
      ${
        config.type === "info"
          ? "bg-amber-400"
          : config.type === "success"
          ? "bg-green-500"
          : "bg-red-500"
      }`;

    // Create message span
    const text = document.createElement("span");
    text.textContent = msg;

    // Create close button
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "&#10005;"; // X symbol
    closeBtn.className =
      "ml-4 text-white font-bold text-lg leading-none hover:opacity-70 focus:outline-none";

    // Close toast when X clicked
    closeBtn.addEventListener("click", () => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 500);
      clearTimeout(autoRemove);
    });

    // Append elements
    toast.appendChild(text);
    toast.appendChild(closeBtn);
    document.body.appendChild(toast);

    // Auto-remove after duration
    const duration = (config.duration ?? 3) * 1000;
    const autoRemove = setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 500);
    }, duration);
  };
};
