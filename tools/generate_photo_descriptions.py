"""
A tool for automatically generating photo descriptions using Claude Vision API.

This module processes the photos.json file used by the Astro website to populate
photo gallery pages. It uses Claude Vision API to analyze photos and generate
natural language descriptions that are then saved back to photos.json.

Example photos.json structure:
{
  "slug": "photos/countries/spain/barcelona/sagrada-familia",
  "description": "The towering spires of the Sagrada Familia pierce the blue Barcelona sky...",
  ...
}

The tool will:
1. Load the existing photos.json
2. Find entries without descriptions
3. Download and analyze the corresponding images
4. Generate natural descriptions using Claude Vision
5. Update photos.json with the new descriptions
"""

import json
from pathlib import Path
from typing import Optional
from io import BytesIO
from utils.image_utils import ImageUtils
from utils.claude_client import ClaudeClient


class PhotoDescriptionGenerator:
    def __init__(self, json_path: str):
        self.claude_client = ClaudeClient.from_env()
        self.json_path = Path(json_path)

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

        return f"Photo: {photo_name}\nLocation: {location}"

    def get_image_description(self, image_data: BytesIO, photo_info: str) -> str:
        """Get image description from Anthropic API."""
        base64_image, original_size, compressed_size = ImageUtils.encode_image(
            image_data
        )

        prompt = f"""You are a creative caption writer for a personal website. I'll provide you with an image and context about it. 
        Please write a engaging, personal caption that captures both the visual elements and the story behind the image.
        
        The caption should:
        - Be 1-2 sentences long
        - Include relevant details from the image
        - Incorporate personal context when provided
        - Have a natural, conversational tone
        - Be suitable for a website/blog format
        
        Context about the image: {photo_info}
        
        Please analyze the image and write an appropriate caption."""

        response = self.claude_client.get_vision_response(prompt, [base64_image])

        print(f"\nProcessing: {photo_info}")
        print(
            f"Image size: {original_size:.2f}MB → {compressed_size:.2f}MB (compressed)"
        )
        print(
            f"Tokens: {response['usage']['input_tokens']} input, {response['usage']['output_tokens']} output"
        )
        print(
            f"Cost: ${response['usage']['total_cost']:.4f} "
            f"(${response['usage']['input_cost']:.4f} input + ${response['usage']['output_cost']:.4f} output)"
        )

        return response["text"]

    def update_photos_data(self):
        """Update the JSON file with image descriptions."""
        # Load existing JSON data
        with open(self.json_path, "r") as f:
            data = json.load(f)

        # Process each photo
        for photo in data:
            if not photo["description"]:
                image_data = ImageUtils.download_photo_slug(photo["slug"])
                if image_data:
                    try:
                        info = self.format_photo_info(photo["slug"])
                        description = self.get_image_description(image_data, info)
                        photo["description"] = description
                        print(f"Added description for photo {photo['slug']}")

                        # Save after each successful update
                        with open(self.json_path, "w") as f:
                            json.dump(data, f, indent=2)
                    except Exception as e:
                        print(f"Error processing photo {photo['slug']}: {str(e)}")
                else:
                    print(f"Could not find photo file for slug: {photo['slug']}")


def main():
    # Initialize the generator
    generator = PhotoDescriptionGenerator(
        json_path="./src/data/photos.json",
    )

    # Process all photos
    generator.update_photos_data()


if __name__ == "__main__":
    main()
