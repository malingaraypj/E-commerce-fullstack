type ConfigType = {
  positionX: "left" | "center" | "right";
  positionY: "top" | "bottom";
  duration?: number;
  type: "info" | "error" | "success";
};

export const newToaster = (config: ConfigType) => {
  return (msg: string) => {
    // Create a toast element
    const toast = document.createElement("div");
    toast.textContent = msg;

    // Apply classes for positioning & styling
    toast.className = `absolute z-50 ${config.positionY}-4 ${
      config.positionX === "center"
        ? "left-1/2 transform -translate-x-1/2"
        : config.positionX === "left"
        ? "left-4"
        : "right-4"
    } ${config.positionY === "top" ? "top-5" : "bottom-5"} ${
      config.type === "info"
        ? "bg-amber-400"
        : config.type === "success"
        ? "bg-green-500"
        : "bg-red-500"
    } text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500`;

    // Append to the document body
    document.body.appendChild(toast);

    // Remove after duration
    const duration = (config.duration ?? 3) * 1000;
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, duration);
  };
};
