# Wanderer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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
    PARCEL_KEY=your_parcel_api_key
    GOOGLE_SEARCH_KEY=your_google_custom_search_api_key
    API_URL_PLACES=https://api.geoapify.com/v2/places
    API_URL_PLACES_DETAILS=https://api.geoapify.com/v2/place-details
    GOOGLE_CUSTOM_SEARCH_URL=https://www.googleapis.com/customsearch/v1/siterestrict
    ...
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
│   ├── img/
│   ├── js/
│   |   ├── views/
│   │   │   ├── landmarkView.js
│   │   │   ├── mapView.js
│   │   │   ├── searchView.js
│   │   │   ├── resultsView.js
│   │   │   ├── paginationView.js
│   │   │   └── bookmarkView.js
│   │   │
│   │   ├── helpers.js
│   │   ├── config.js
│   │   ├── model.js
│   │   └── controller.js
│   │
│   └── sass/
│       ├── _base.scss
│       ├── _components.scss
│       ├── _delete.scss
│       ├── _header.scss
│       ├── _preview.scss
│       ├── _landmark.scss
│       ├── _searchResults.scss
│       ├── _upload.scss
│       └── main.scss
├── .env
├── package.json
├── README.md
└── .gitignore
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.
