function countDown(startValue) {
    let counter = startValue;
  
    const intervalId = setInterval(() => {
      console.log(counter);
      counter--;
  
      if (counter < 0) {
        clearInterval(intervalId);
        console.log("Countdown finished!");
      }
    }, 1000); // Update every 1 second (1000 milliseconds)
  }
  
  // Example usage:
  countDown(30);