// Determines whether the image should occupy half width based on its index and layout.
function isHalfImage(index, layout) {
    switch (layout) {
        case "full":
            return false;
        case "all-half":
            return true;
        case "reverse":
            return (index % 3 !== 0);
        default:
            return (index % 3 !== 2);
    }
}

// Determines whether the tile should occupy half width based on its index and layout.
function isHalfTile(index, layout) {
    switch (layout) {
        case "full":
            return true;
        case "all-half":
            return false;
        case "reverse":
            return (index % 3 === 0);
        default:
            return (index % 3 === 2);
    }
}

// Returns the appropriate image size set name ('img-half' or 'img-full') based on whether the tile image occupies half or full width.
function getTileImageSizeSetName(index, layout) {
    return isHalfImage(index, layout) ? 'img-half' : 'img-full';
}

// Export all helpers in one module.
module.exports = {
    isHalfImage,
    isHalfTile,
    getTileImageSizeSetName
};
