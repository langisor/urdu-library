# Using Vocabulary Data

## Vocabulary Data Summary

Based on the TypeScript definitions and the provided JSON data, here's how you can summarize the data to make it easy and useful for your React application:

### 1\. Group by Vocabulary Category

The `Vocabulary` interface includes a `category` and `categoryID` field. The most straightforward and useful way to summarize this data is to group all `vItems` by their `Vocabulary` category. This allows you to display a list of vocabulary sets and then, when a user selects a set, show the individual words and their solutions.

**How to implement this:**

- **Create a map or object:** Use a data structure like a `Map` or a simple JavaScript object where the keys are the `vocabulary.id` or `vocabulary.name` and the values are the corresponding `VocabularyData` objects.
- **Accessing data:** You can then easily access all the `vItems` for a specific vocabulary set by using its ID as the key to look up the data.

<!-- end list -->

```typescript
// Example of a grouped data structure
const groupedData: { [key: number]: VocabularyData } = {};

// Assuming you have an array of all VocabularyData objects
allVocabularyData.forEach((data) => {
  groupedData[data.vocabulary.id] = data;
});
```

---

### 2\. Focus on Key Information

When displaying the summary, you don't need to show all the details at once. Start with the most important information and reveal more as the user interacts with the application.

**For a list of vocabulary sets (categories):**

- **Vocabulary Name:** The `name` field from the `Vocabulary` interface is a human-readable title for each set.
- **Completion Status:** Use the `done` and `stars` fields to show the user's progress. You can display this as a simple checkmark or a star rating.
- **Item Counts:** The `countItem`, `countWords`, and `countPhrases` fields are perfect for showing the size of each vocabulary set at a glance.

**For individual words within a set:**

- **Word Key:** The `key` field in the `VItem` interface is the primary word or phrase. This should be the main title.
- **Solutions:** The `sols` array contains the translations and phonetic information. You can display a primary translation from `sols[0].text` and a phonetic guide from `sols[0].phonetic` to provide a quick summary. The `sols[0].dictionary` can be used to show more detailed definitions and examples if the user clicks on the word.
