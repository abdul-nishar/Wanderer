export const config = {
    key: process.env.PARCEL_KEY,
    googleSearchKey: process.env.PARCEL_GOOGLE_SEARCH_KEY,
    apiUrlPlaces: process.env.PARCEL_API_URL_PLACES || "https://api.geoapify.com/v2/places",
    apiUrlPlacesDetails: process.env.PARCEL_API_URL_PLACES_DETAILS || "https://api.geoapify.com/v2/place-details",
    googleCustomSearchUrl: process.env.PARCEL_GOOGLE_CUSTOM_SEARCH_URL || "https://www.googleapis.com/customsearch/v1/siterestrict",
    timeoutSec: parseInt(process.env.PARCEL_TIMEOUT_SEC, 10) || 10,
    mapScale: parseInt(process.env.PARCEL_MAP_SCALE, 10) || 10,
    resPerPage: parseInt(process.env.PARCEL_RES_PER_PAGE, 10) || 14
};