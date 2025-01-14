import argparse
import json
from pathlib import Path
from typing import Optional
from utils.image_utils import ImageUtils
from utils.claude_client import ClaudeClient


class PhotoDescriptionGenerator:
    def __init__(self, photos_dir: str, json_path: str):
        self.claude_client = ClaudeClient.from_env()
        self.photos_dir = Path(photos_dir)
        self.json_path = Path(json_path)

    def find_photo_path(self, photo_slug: str) -> Optional[Path]:
        """Search for a photo with the given slug in the photos directory structure."""
        relative_path = photo_slug + ".jpg"
        photo_path = self.photos_dir / relative_path
        return photo_path if photo_path.exists() else None

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

    def get_image_description(self, image_path: Path, photo_info: str) -> str:
        """Get image description from Anthropic API."""
        base64_image, original_size, compressed_size = ImageUtils.encode_image(
            image_path
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

        response = self.claude_client.get_vision_response(prompt, base64_image)

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
                photo_path = self.find_photo_path(photo["slug"])
                if photo_path:
                    try:
                        info = self.format_photo_info(photo["slug"])
                        description = self.get_image_description(photo_path, info)
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
    import argparse

    # Set up argument parser
    parser = argparse.ArgumentParser(description="Generate descriptions for images")
    parser.add_argument(
        "--photos-dir", required=True, help="Directory containing photos"
    )
    parser.add_argument("--json-path", required=True, help="Path to output JSON file")

    # Parse arguments
    args = parser.parse_args()

    # Initialize the generator with command line args
    generator = PhotoDescriptionGenerator(
        photos_dir=args.photos_dir,
        json_path=args.json_path,
    )

    # Process all photos
    generator.update_photos_data()


if __name__ == "__main__":
    main()
