// 3. Create a terminal clock (HH:MM:SS)
function terminalClock() {
    function updateClock() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const timeString = `${hours}:${minutes}:${seconds}`;
      console.clear(); // Clear the console in most terminals. Might need adjustments.
      console.log(timeString);
    }
  
    // Update the clock every second
    setInterval(updateClock, 1000);
  
    // Initial call to display the clock immediately
    updateClock();
  }
  
  // Example usage:
  terminalClock();