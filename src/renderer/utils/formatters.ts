export const formatDate = (dateString: string) => {
  if (dateString) {
    const date = new Date(dateString);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
  }
  return new Date();
};