import anthropic
import os
from typing import Dict, Any, List


class ClaudeClient:
    """
    A client for interacting with Anthropic's Claude AI model.
    Provides methods for making API calls to Claude, particularly for vision/image analysis tasks.

    Attributes:
        api_key (str): The Anthropic API key used for authentication
        client (anthropic.Anthropic): The underlying Anthropic client instance
    """

    def __init__(self, api_key: str = None):
        """
        Initialize Claude client with optional API key.
        If no key provided, looks for ANTHROPIC_API_KEY environment variable.
        """
        self.api_key = api_key or os.getenv("ANTHROPIC_API_KEY")
        if not self.api_key:
            raise ValueError(
                "No API key provided and ANTHROPIC_API_KEY environment variable not set"
            )

        self.client = anthropic.Anthropic(api_key=self.api_key)

    @classmethod
    def from_env(cls):
        """
        Alternative constructor that only uses environment variable.
        """
        return cls()

    def get_vision_response(
        self, prompt: str, base64_images: List[str]
    ) -> Dict[str, Any]:
        """
        Get a response from Claude for multiple image-based prompts.
        Args:
            prompt: Text prompt to send to Claude
            base64_images: List of base64 encoded image strings
        Returns: Dictionary containing response text and usage statistics
        """
        content = []
        for base64_image in base64_images:
            content.append(
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": "image/jpeg",
                        "data": base64_image,
                    },
                }
            )

        content.append(
            {
                "type": "text",
                "text": prompt,
            }
        )

        message = self.client.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=1000,
            messages=[{"role": "user", "content": content}],
        )

        # Calculate costs
        input_cost = (message.usage.input_tokens / 1_000_000) * 15
        output_cost = (message.usage.output_tokens / 1_000_000) * 75

        return {
            "text": message.content[0].text,
            "usage": {
                "input_tokens": message.usage.input_tokens,
                "output_tokens": message.usage.output_tokens,
                "input_cost": input_cost,
                "output_cost": output_cost,
                "total_cost": input_cost + output_cost,
            },
        }
