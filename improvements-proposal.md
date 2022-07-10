Questions:

1. Right now the data for the posts is coming from a json file. What changes would you have to make to the application if it came from an API? In what type of hook should you use to fetch the data and why? What other considerations would you have to make?

2. Part of this application uses the package nanoid to generate keys. What issue would this cause for generating keys in React?

Answers:

1. First, instead of referring to the local "blogs.json" file, we would have to fetch the data from an API. In order to fetch the data, the "useEffect" hook would be utilized, along with the JavaScript Fetch API to fetch the data.
  
Other considerations:

  1.1. First, a state to store the data in would need to be utilized.
  1.2. An additional state to manage the loading stage would need to be added to improve the user experience.
  1.3. Finally, a state for error handling would need to be implemented for when the server is down, or to account for other unexpected conditions.
  1.4. There are different tools available for fetching data from an API. The JavaScript Fetch API is not necessarily required to complete the task.

2. The issue with nanoid is that it does not generate stable keys. New keys are generated every time elements are built. This causes issues with React, because React utilizes keys to determine which elements need to be re-rendered. Thus, every time new keys are generated via nanoid, React will re-render applicable elements. In this case, nanoid causes major performance issues, especially if this application upscales.