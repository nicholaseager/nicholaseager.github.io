"""
Script to generate article content and titles for photo locations using Claude Vision API.

This script:
1. Loads photo location and photo data
2. For each location, finds matching photos 
3. Uses Claude Vision API to generate article content and title based on the photos
4. Updates the photo locations JSON with the new content and title
"""

import json
from pathlib import Path
from typing import Dict, List, Tuple
from utils.claude_client import ClaudeClient
from utils.image_utils import ImageUtils


class LocationContentGenerator:
    def __init__(self, photos_path: str, locations_path: str):
        self.claude_client = ClaudeClient.from_env()
        self.photos_path = Path(photos_path)
        self.locations_path = Path(locations_path)

        # Load data
        with open(self.photos_path) as f:
            self.photos = json.load(f)
        with open(self.locations_path) as f:
            self.locations = json.load(f)

    def format_photo_info(self, slug: str):
        # Remove 'photos/' prefix and split into parts
        parts = slug.replace("photos/", "").split("/")

        # Extract location parts and photo name
        location_parts = parts[
            1:-1
        ]  # Get all parts except first ('countries') and last (photo name)
        photo_name = parts[-1].replace("-", " ").title()

        # Format location as readable string
        location = ", ".join(part.title() for part in location_parts)

        return f"'{photo_name}' located in '{location}'"

    def get_location_photos(self, location_id: str) -> List[Dict]:
        """Get all photos matching a location ID."""
        photos = []
        for photo in self.photos:
            # Remove photos/ prefix and get location part
            location_part = "/".join(photo["slug"].split("/")[1:4])
            if location_part == f"countries/{location_id}":
                photos.append(photo)
        return photos

    def generate_location_content(
        self, location_id: str, photos: List[Dict]
    ) -> Tuple[str, str]:
        """
        Generate article content and title for a location using Claude Vision API.
        Returns: (title, content)
        """
        if not photos:
            return "", ""

        # Download and encode images
        image_data = []
        photo_info = []
        for photo in photos[:3]:  # Limit to 3 photos to keep context window manageable
            data = ImageUtils.download_photo_slug(photo["slug"])
            if data:
                base64_image, _, _ = ImageUtils.encode_image(data)
                image_data.append(base64_image)
                photo_info.append(photo["slug"])

        if not image_data:
            return "", ""

        # Get base location name from ID
        base_name = location_id.split("/")[-1].replace("-", " ").title()

        prompt = f"""You are a skilled travel writer crafting engaging location descriptions for a photography website.
        
        Location: {base_name}
        Photos from this location:
        {chr(10).join(f"- {self.format_photo_info(slug)}" for slug in photo_info)}
        
        Looking at the provided images, please provide:

        1. An engaging title for this location that captures its photographic appeal (format: "Title: <your title>")
        2. A 2-3 paragraph article about this location that:
           - Describes the visual character and photographic opportunities
           - Incorporates specific details from the images shown
           - Provides context about what makes this location special for photography
           - Uses vivid, descriptive language that brings the scene to life
           - Maintains a personal, authentic voice
        
        Keep the tone warm and conversational while being informative.
        Focus on the visual and photographic aspects rather than general travel tips.
        
        Start your response with the title on one line, followed by two newlines, then the article content.
        
        Please analyze the images and write an appropriate title and article."""

        response = self.claude_client.get_vision_response(prompt, image_data)

        print(f"\nProcessing: {location_id}")
        print(
            f"Tokens: {response['usage']['input_tokens']} input, {response['usage']['output_tokens']} output"
        )
        print(
            f"Cost: ${response['usage']['total_cost']:.4f} "
            f"(${response['usage']['input_cost']:.4f} input + ${response['usage']['output_cost']:.4f} output)"
        )

        # Split response into title and content
        text = response["text"].strip()
        parts = text.split("\n\n", 1)

        if len(parts) != 2:
            return base_name, text

        title = parts[0].replace("Title: ", "").strip()
        content = parts[1].strip()

        return title, content

    def update_locations(self):
        """Update all location content and titles."""
        updated = False

        for location in self.locations:
            if "/" in location["id"]:  # Only process country/region locations
                photos = self.get_location_photos(location["id"])
                if photos:
                    try:
                        title, content = self.generate_location_content(
                            location["id"], photos
                        )
                        if content:
                            location["title"] = title
                            location["content"] = content
                            updated = True
                            print(
                                f"Added title and content for location {location['id']}"
                            )

                            # Save after each successful update
                            with open(self.locations_path, "w") as f:
                                json.dump(self.locations, f, indent=2)
                    except Exception as e:
                        print(f"Error processing location {location['id']}: {str(e)}")

        return updated


def main():
    generator = LocationContentGenerator(
        photos_path="../src/data/photos.json",
        locations_path="../src/data/photo-locations.json",
    )
    generator.update_locations()


if __name__ == "__main__":
    main()