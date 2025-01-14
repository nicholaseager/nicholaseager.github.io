"""
Utility class for image processing operations including encoding, downloading,
and optimizing images. Provides methods for converting images to base64 strings,
downloading from URLs, and handling image slugs.
"""

from pathlib import Path
from PIL import Image
import base64
import io
import requests
from typing import Tuple, Optional


class ImageUtils:
    @staticmethod
    def encode_image(
        image: Path | io.BytesIO, max_size: int = 600, quality: int = 85
    ) -> Tuple[str, float, float]:
        """
        Convert image to base64 string with optimization.
        Returns: (base64_string, original_size_mb, compressed_size_mb)
        """
        # Get original size and image object
        if isinstance(image, Path):
            original_size = image.stat().st_size / (1024 * 1024)
            img = Image.open(image)
        else:
            image.seek(0)
            original_size = len(image.getvalue()) / (1024 * 1024)
            img = Image.open(image)

        # Convert to RGB if needed (handles PNG, RGBA etc)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")

        # Resize to max dimension while maintaining aspect ratio
        ratio = min(max_size / float(img.size[0]), max_size / float(img.size[1]))
        new_size = tuple(int(dim * ratio) for dim in img.size)
        img = img.resize(new_size, Image.Resampling.LANCZOS)

        # Save with reduced quality
        buffered = io.BytesIO()
        img.save(buffered, format="JPEG", quality=quality, optimize=True)

        base64_string = base64.b64encode(buffered.getvalue()).decode("utf-8")
        compressed_size = len(base64.b64decode(base64_string)) / (1024 * 1024)

        return base64_string, original_size, compressed_size

    @staticmethod
    def download_image(url: str) -> Optional[io.BytesIO]:
        """
        Download image from URL and return as BytesIO object.
        Returns None if download fails.
        """
        try:
            response = requests.get(url)
            response.raise_for_status()
            return io.BytesIO(response.content)
        except requests.RequestException as e:
            print(f"Error downloading image from {url}: {str(e)}")
            return None

    @staticmethod
    def download_photo_slug(
        photo_slug: str, base_url: str = "https://ik.imagekit.io/qn1gkawvy/tr:w-600/"
    ) -> Optional[io.BytesIO]:
        """
        Download image using a photo slug from a configured base URL.
        """
        url = f"{base_url}{photo_slug}.jpg"
        return ImageUtils.download_image(url)
