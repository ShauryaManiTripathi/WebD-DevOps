async function fetchData(url) {
    try {
      // The `await` keyword pauses execution until the Promise returned by
      // the asynchronous operation (e.g., fetch) is resolved or rejected.
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      //const data = await response.json(); // Assuming the response is JSON
      //return data;
      return response.text();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error to be caught by a higher-level handler, if any.
    }
  }
  
  // Using the async function:
  async function processData() {
    try {
      const data = await fetchData("https://ifconfig.me");
      console.log("Data:", data);
    } catch (error) {
      // Handle errors here (e.g., display an error message to the user)
    }
  }
  
  //processData();

  const obj = {
    x: 42,
    getX: function() {
      return this.x;
    }
  };

  const unboundGetX = obj.getX;
  console.log(unboundGetX()); // The function gets invoked at the global scope // Output: undefined

  const boundGetX = unboundGetX.bind(obj); // create new function with `this` bound to obj
  console.log(boundGetX()); // Output: 42