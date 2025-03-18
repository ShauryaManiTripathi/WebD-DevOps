function measureSetTimeoutDelay(delay) {
    const startTime = Date.now();
  
    setTimeout(() => {
      const endTime = Date.now();
      const actualDelay = endTime - startTime;
      console.log(`Expected delay: ${delay}ms`);
      console.log(`Actual delay: ${actualDelay}ms`);
    }, delay);
  }
  
  // Example usage:
  measureSetTimeoutDelay(2000); // Set a delay of 2 seconds