import json
import requests
import os
from datetime import datetime
from urllib.parse import urlparse

NETLIFY_ACCESS_TOKEN = os.environ["NETLIFY_ACCESS_TOKEN"]
NETLIFY_COMMENT_FORM_ID = os.environ["NETLIFY_COMMENT_FORM_ID"]
BASE_PATH = "src/data/comments"


def fetch_submissions():
    url = f"https://api.netlify.com/api/v1/forms/{NETLIFY_COMMENT_FORM_ID}/submissions"
    headers = {"Authorization": f"Bearer {NETLIFY_ACCESS_TOKEN}"}
    response = requests.get(url, headers=headers)
    return response.json()


def load_existing_comments(pathname):
    file_path = os.path.join(BASE_PATH, f"{pathname}.json")
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            return json.load(f)
    return []


def process_comments(submissions):
    comments_by_pathname = {}

    for submission in submissions:
        data = submission["data"]
        url = data.get("url", "")
        parsed_url = urlparse(url)
        pathname = parsed_url.path.strip("/")

        # Load existing comments for this pathname
        if pathname not in comments_by_pathname:
            comments_by_pathname[pathname] = load_existing_comments(pathname)

        # Skip if comment already exists
        submission_id = submission["id"]
        if any(
            comment["id"] == submission_id for comment in comments_by_pathname[pathname]
        ):
            continue

        comment = {
            "id": submission_id,
            "createdBy": {
                "fullName": data.get("name"),
                "email": data.get("email"),
            },
            "text": data.get("message"),
            "createdAt": datetime.now().isoformat(),
        }
        if data.get("parentId"):
            comment["parentId"] = data["parentId"]

        comments_by_pathname[pathname].append(comment)

    return comments_by_pathname


def save_comments(comments_by_pathname):
    os.makedirs(BASE_PATH, exist_ok=True)

    for pathname, comments in comments_by_pathname.items():
        file_path = os.path.join(BASE_PATH, f"{pathname}.json")
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, "w") as f:
            json.dump(comments, f, indent=2)


def main():
    submissions = fetch_submissions()
    comments_by_pathname = process_comments(submissions)
    save_comments(comments_by_pathname)


if __name__ == "__main__":
    main()
