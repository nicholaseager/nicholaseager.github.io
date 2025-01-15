"""
Script to update themes.json with new themes found in photos.json.

This script extracts unique theme slugs from the tags in photos.json and adds any new
themes to themes.json. Each theme entry contains metadata like slug, title, and description.

Usage:
    python add_themes.py

The script assumes it is run from the root project directory and looks for:
- src/data/photos.json file to read tags from
- src/data/themes.json file to update
"""

import os
from utils.json import load_json, save_json


def get_theme_slugs(photos):
    """
    Extract unique theme slugs from photos' tags.

    Args:
        photos (list): List of photo entries containing tags

    Returns:
        set: Set of unique theme slugs found in photo tags

    Example:
        If photos contains:
            [{"tags": ["nature", "mountains"]}, {"tags": ["nature", "wildlife"]}]
        Returns:
            {"nature", "mountains", "wildlife"}
    """

    theme_slugs = set()
    for photo in photos:
        if "tags" in photo:
            theme_slugs.update(photo["tags"])
    return theme_slugs


def update_themes_json(themes_file, theme_slugs):
    """
    Update themes.json with new themes found in theme_slugs.

    Args:
        themes_file (str): Path to themes.json file to update
        theme_slugs (set): Set of theme slugs to check and potentially add

    The function:
    1. Reads existing themes.json
    2. Gets set of existing theme slugs
    3. Adds entries for any new themes not already in themes.json
    4. Writes updated data back to themes.json
    """

    # Read existing themes.json
    themes = load_json(themes_file)

    # Get existing slugs
    existing_slugs = {t["slug"] for t in themes}

    # Add new themes
    for slug in theme_slugs:
        if slug not in existing_slugs:
            themes.append({"slug": slug, "title": "", "description": ""})

    # Write updated themes.json
    save_json(themes_file, themes)


def main(directory):
    """
    Main entry point for updating themes.json.

    Args:
        directory (str): Root directory containing src/data/photos.json and src/data/themes.json
    """

    photos_file = os.path.join(directory, "src/data/photos.json")
    themes_file = os.path.join(directory, "src/data/themes.json")

    photos = load_json(photos_file)
    theme_slugs = get_theme_slugs(photos)
    update_themes_json(themes_file, theme_slugs)


if __name__ == "__main__":
    directory = "."  # Current directory
    main(directory)
