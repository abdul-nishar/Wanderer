# Wanderer

Wanderer is a web application that helps users discover landmarks and places of interest. It utilizes various APIs to fetch location details, images, and related information, providing a comprehensive guide to explore new places.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API References](#api-references)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search for landmarks using Geoapify API.
- Fetch detailed information about landmarks.
- Display images of landmarks using Google Custom Search API.
- Provide Wikipedia data about landmarks.
- Pagination for search results.
- Bookmarking feature for landmarks.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/abdul-nishar/Wanderer.git
    cd Wanderer
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your API keys:

    ```plaintext
    MY_API_KEY=your_geoapify_api_key
    GOOGLE_SEARCH_KEY=your_google_custom_search_api_key
    ```

4. Start the development server:

    ```sh
    npm run start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:1234`.
2. Use the search bar to find landmarks.
3. Click on a landmark to view detailed information, images, and Wikipedia data.
4. Use the pagination controls to navigate through the search results.
5. Bookmark your favorite landmarks for easy access.

## API References

- [Geoapify Places API](https://www.geoapify.com/api/places/)
- [Geoapify Place Details API](https://www.geoapify.com/api/place-details/)
- [Google Custom Search API](https://developers.google.com/custom-search/v1/overview)

## File Structure

```plaintext
Wanderer/
├── src/
│   ├── controller.js
│   ├── model.js
│   ├── views/
│   │   ├── landmarkView.js
│   │   ├── mapView.js
│   │   ├── searchView.js
│   │   ├── resultsView.js
│   │   ├── paginationView.js
│   │   └── bookmarkView.js
│   ├── helpers.js
│   ├── config.js
│   ├── index.html
│   └── styles.css
├── .env
├── package.json
├── README.md
└── .gitignore
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.
