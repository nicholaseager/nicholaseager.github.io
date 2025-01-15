"""
Script to update locations.json with new location entries based on photo slugs.

This script:
1. Extracts unique location slugs from photo paths in photos.json
2. Adds any new locations not already present in locations.json
3. Creates stub entries for new locations with empty content fields

Usage:
    python add_locations.py
    
The script expects to find:
- src/data/photos.json: Source of photo data with slugs
- src/data/locations.json: Destination file for location data
"""

import os
from utils.json import load_json, save_json


def get_location_slugs(photos):
    """
    Extract unique location slugs from photo slugs.

    Parses the path components from photo slugs to generate location slugs.
    For each photo path like 'photos/countries/europe/france/paris/photo.jpg',
    generates location slugs: ['europe', 'europe/france', 'europe/france/paris']

    Args:
        photos (list): List of photo dictionaries containing slug keys

    Returns:
        set: Set of unique location slug strings
    """

    location_slugs = set()
    for photo in photos:
        if "slug" in photo:
            # Split path and remove 'photos', 'countries' and filename parts
            parts = photo["slug"].split("/")[2:-1]  # Skip photos/countries and filename

            # Add each nested location path
            for i in range(len(parts)):
                location_slugs.add("/".join(parts[: i + 1]))

    return location_slugs


def update_locations_json(locations_file, location_slugs):
    """
    Update locations.json with new location entries.

    Adds new location entries for any slugs not already present in the locations file.
    New entries are created with empty content fields and placeholder dates.

    Args:
        locations_file (str): Path to locations.json file
        location_slugs (set): Set of location slugs to check/add
    """

    # Read existing locations.json
    locations = load_json(locations_file)

    # Get existing slugs
    existing_slugs = {l["slug"] for l in locations}

    # Add new locations
    for slug in location_slugs:
        if slug not in existing_slugs:
            locations.append(
                {
                    "slug": slug,
                    "title": "",
                    "description": "",
                    "content": "",
                    "date": "2025-01-14",
                    "modified_date": "2025-01-14",
                }
            )

    # Write updated locations.json
    save_json(locations_file, locations)


def main(directory):
    """
    Main entry point for locations update script.

    Coordinates reading photos.json, extracting locations, and updating locations.json.

    Args:
        directory (str): Base directory containing src/data files
    """

    photos_file = os.path.join(directory, "src/data/photos.json")
    locations_file = os.path.join(directory, "src/data/locations.json")

    photos = load_json(photos_file)
    location_slugs = get_location_slugs(photos)
    update_locations_json(locations_file, location_slugs)


if __name__ == "__main__":
    directory = "."  # Current directory
    main(directory)
