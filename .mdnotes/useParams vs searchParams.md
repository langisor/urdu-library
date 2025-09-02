# `useParams` vs `useSearchParams`

In Next.js, `params` and `searchParams` are distinct mechanisms for handling URL-based data within your application.

1\. `params` (Dynamic Route Parameters):

- `params` are used to capture dynamic segments of a URL path. These are defined within the file system conventions of Next.js using square brackets, e.g., `app/blog/[slug]/page.js`.
- The value of `params` is an object where keys correspond to the dynamic segment names and values are the actual data extracted from the URL path. For example, in `/blog/my-first-post`, `params` would be `{ slug: 'my-first-post' }`.
- `params` are primarily used for routing to specific resources or pages based on their unique identifiers or categories.
- In Server Components, `params` can be accessed directly as a prop in `page.js` or `layout.js`. In Client Components, `useParams` from `next/navigation` is used to access them.

2\. `searchParams` (URL Query Parameters):

- `searchParams` represent the query string parameters appended to a URL, typically after a `?`, e.g., `?category=electronics&brand=samsung`.
- The value of `searchParams` is an object where keys are the query parameter names and values are their corresponding values. For instance, in `/products?category=electronics&brand=samsung`, `searchParams` would be `{ category: 'electronics', brand: 'samsung' }`.
- `searchParams` are commonly used for filtering, sorting, pagination, or passing optional data that doesn't define a unique route.
- In Server Components, `searchParams` can be accessed directly as a prop in `page.js`. In Client Components, `useSearchParams` from `next/navigation` is used to access them.

## Key Differences

- **Location in URL:**

    `params` are part of the URL path structure, while `searchParams` are part of the URL query string.

- **Purpose:**

    `params` define dynamic routes, while `searchParams` provide additional, optional data for a given route.

- **Accessibility:**

    `params` are available in both `page.js` and `layout.js` (Server Components), while `searchParams` are only available in `page.js` (Server Components). Both can be accessed in Client Components using their respective hooks.
