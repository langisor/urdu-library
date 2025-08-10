# How to Use the Server Function on the Client-Side

## `Next.js` API Routes

Now, from your client-side code, you can use a regular `fetch` call to send the updated data to this API route. This is where you would use the `updateItemsProperty` and `updateVocabularyDoneStatus` functions you requested earlier.

Here's an example of a client-side function that calls the API route:

```ts
// Assuming this is a client-side function in your app, e.g., in a component or a separate service file.
import { updateVocabularyDoneStatus, VocabularyData } from './data-service-functions';

async function resetVocabularyDoneStatus(initialData: VocabularyData[]) {
  // Use the local function to create an updated, immutable copy of the data.
  const updatedData = updateVocabularyDoneStatus(initialData, false);

  try {
    // Send the updated data to your server-side API route.
    const response = await fetch('/api/updateData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to update data on the server.');
    }

    const result = await response.json();
    console.log(result.message); // Log success message
    return updatedData; // Return the new data to update local state
  } catch (error) {
    console.error('Error sending data to server:', error);
    // Handle error, e.g., show a user-facing message.
  }
}
```

This function will send the updated data to the API route, which will then update the data on the server-side. The function will return the updated data, which you can use to update your local state.

## A Better Approach for Multi-User Apps

While updating a JSON file works for simple projects or single-user applications, it's not a scalable solution for an application with many users. Every time a user updates the data, the entire file is rewritten, which can cause issues with concurrency and performance.

A much better approach would be to use a database like Firestore,
