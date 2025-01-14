from pathlib import Path
from PIL import Image
import base64
import io
from typing import Tuple


class ImageUtils:
    @staticmethod
    def encode_image(
        image_path: Path, max_size: int = 600, quality: int = 85
    ) -> Tuple[str, float, float]:
        """
        Convert image to base64 string with optimization.
        Returns: (base64_string, original_size_mb, compressed_size_mb)
        """
        with Image.open(image_path) as img:
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
            original_size = image_path.stat().st_size / (1024 * 1024)
            compressed_size = len(base64.b64decode(base64_string)) / (1024 * 1024)

            return base64_string, original_size, compressed_size
