
export const toLocalDate = (dateInput: string | Date): Date => {
  if (typeof dateInput === 'string') {
    const normalizedString = dateInput.endsWith("Z") ? dateInput : dateInput + "Z";
    return new Date(normalizedString);
  }
  return dateInput;
};
export const formatMessageTime = (dateInput: string | Date): string => {
  const date = toLocalDate(dateInput);
  
  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, 
  });
};
export const formatTimeAgo = (dateInput: string | Date): string => {
  const date = toLocalDate(dateInput); 
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 0) return "Vừa xong";
  if (diffInSeconds < 60) return "Vừa xong";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
  if (diffInSeconds < 172800) return "Hôm qua";
  
  return date.toLocaleDateString("vi-VN", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }); 
};