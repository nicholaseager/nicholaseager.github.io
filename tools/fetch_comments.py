import json
import requests
import os
from datetime import datetime
from urllib.parse import urlparse

NETLIFY_ACCESS_TOKEN = os.environ["NETLIFY_ACCESS_TOKEN"]
NETLIFY_COMMENT_FORM_ID = os.environ["NETLIFY_COMMENT_FORM_ID"]
COMMENTS_FILE = "src/data/comments.json"


def fetch_submissions():
    url = f"https://api.netlify.com/api/v1/forms/{NETLIFY_COMMENT_FORM_ID}/submissions"
    headers = {"Authorization": f"Bearer {NETLIFY_ACCESS_TOKEN}"}
    response = requests.get(url, headers=headers)
    return response.json()


def load_existing_comments():
    if os.path.exists(COMMENTS_FILE):
        with open(COMMENTS_FILE, "r") as f:
            return json.load(f)
    return []


def process_comments(submissions):
    comments = load_existing_comments()

    for submission in submissions:
        data = submission["data"]
        url = data.get("url", "")
        parsed_url = urlparse(url)
        pathname = parsed_url.path

        # Skip if comment already exists
        submission_id = submission["id"]
        if any(comment["id"] == submission_id for comment in comments):
            continue

        comment = {
            "id": submission_id,
            "pathname": pathname,
            "createdBy": {
                "fullName": data.get("name"),
                "email": data.get("email"),
            },
            "text": data.get("message"),
            "createdAt": datetime.now().isoformat(),
        }
        if data.get("parentId"):
            comment["parentId"] = data["parentId"]

        comments.append(comment)

    return comments


def save_comments(comments):
    os.makedirs(os.path.dirname(COMMENTS_FILE), exist_ok=True)
    with open(COMMENTS_FILE, "w") as f:
        json.dump(comments, f, indent=2)


def main():
    submissions = fetch_submissions()
    comments = process_comments(submissions)
    save_comments(comments)


if __name__ == "__main__":
    main()
