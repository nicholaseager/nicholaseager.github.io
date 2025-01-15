"""
Script to update photos.json with new photos found in the photos directory.

This script scans a photos directory for .jpg files and adds entries for any new photos
to a photos.json data file. Each photo entry contains metadata like slug, description,
tags, etc.

Usage:
    python add_photos.py

The script assumes it is run from the root project directory and looks for:
- photos/ directory containing .jpg files
- src/data/photos.json file to update
"""

import os
from utils.json import load_json, save_json


def get_photo_slugs(photos_dir):
    """
    Get all photo slugs from the photos directory.

    Args:
        photos_dir (str): Path to the photos directory to scan

    Returns:
        list: List of photo slugs (relative paths without extension)

    Example:
        If photos_dir contains:
            /photos/nepal/everest/photo1.jpg
            /photos/nepal/dolpo/photo2.jpg
        Returns:
            ['nepal/everest/photo1', 'nepal/dolpo/photo2']
    """

    photo_slugs = []
    for root, dirs, files in os.walk(photos_dir):
        for file in files:
            if file.lower().endswith((".jpg")):
                # Get relative path and remove extension
                rel_path = os.path.relpath(os.path.join(root, file), photos_dir)
                slug = os.path.splitext(rel_path)[0]
                photo_slugs.append(slug)
    return photo_slugs


def update_photos_json(photos_dir, photos_file):
    """
    Update photos.json with new photos found in photos directory.

    Args:
        photos_dir (str): Root directory containing photos folder
        photos_file (str): Path to photos.json file to update

    Returns:
        list: Updated list of photo entries

    The function:
    1. Reads existing photos.json
    2. Scans photos directory for .jpg files
    3. Adds entries for any new photos not already in photos.json
    4. Writes updated data back to photos.json
    """

    # Read existing photos.json
    photos = load_json(photos_file)

    # Get existing slugs
    existing_slugs = {p["slug"] for p in photos}

    # Get all photo slugs from directory
    photo_slugs = get_photo_slugs(os.path.join(photos_dir, "photos"))

    # Add new photos
    for slug in photo_slugs:
        if f"photos/{slug}" not in existing_slugs:
            photos.append(
                {
                    "slug": f"photos/{slug}",
                    "description": "",
                    "tags": [],
                    "darkroom-id": "",
                    "youtube-id": "",
                }
            )

    # Write updated photos.json
    save_json(photos_file, photos)
    return photos


def main(directory):
    """
    Main entry point for updating photos.json.

    Args:
        directory (str): Root directory containing photos/ and src/data/photos.json
    """

    photos_file = os.path.join(directory, "src/data/photos.json")
    update_photos_json(directory, photos_file)


if __name__ == "__main__":
    directory = "."  # Current directory
    main(directory)
