# vp-api-task

## Getting started

### Prerequisites

- Node.js (Built on Node 24+)

### Installation

1. Run `npm install` to get all the dependencies
2. Populate the .env file with the API_URL
3. Start the server with `npm run dev`

## Features

- Product Grid
- Facets Filtering
  - With logic to keep the original facets showing even when they are not in the response from the API
- Sorting of the products
- Pagination
- Skeleton Loading for when the data is being fetched

## Tech Stack

- Framework: [React](https://reactjs.org) + TypeScript
- Data fetching: [TanStack Query](https://tanstack.com/query/latest)
- Styling: [Tailwind CSS](https://tailwindcss.com)
- UI Components: [Headless UI](https://headlessui.com)
- Icons: [Heroicons](https://heroicons.com)

## Potential improvements if there was more time

- Persist the state in the URL using URLSearchParams for a better user experience
- Virtualised lists to make the loading of the data more seamless to the user
