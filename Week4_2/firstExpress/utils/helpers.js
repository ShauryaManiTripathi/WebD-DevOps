/**
 * Format date to YYYY-MM-DD
 * @param {Date} date - Date to format
 * @returns {String} Formatted date
 */
export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Calculate days difference between two dates
 * @param {Date} start - Start date
 * @param {Date} end - End date
 * @returns {Number} Days difference
 */
export const daysDifference = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};
