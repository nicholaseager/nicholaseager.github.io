import json


def load_json(file_path):
    """Load and return JSON data from file"""
    with open(file_path) as f:
        return json.load(f)


def save_json(file_path, data):
    """Save data to JSON file"""
    with open(file_path, "w") as f:
        json.dump(data, f, indent=2)
