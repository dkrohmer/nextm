export const formatDate = (dateString: string) => {
  if (dateString) {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      // If the date is invalid, return the current date
      return new Date().toISOString().split('T')[0];
    }

    // Return the formatted date if valid
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
  }

  // If no date string is provided, return the current date
  return new Date().toISOString().split('T')[0];
};
