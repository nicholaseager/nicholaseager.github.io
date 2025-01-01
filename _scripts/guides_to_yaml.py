import json
import os

directory = "_data/guides"

for filename in os.listdir(directory):
    if filename.endswith(".json") and filename != "template.json":
        file_path = os.path.join(directory, filename)
        with open(file_path) as json_file:
            parsed_data = json.load(json_file)

            guidename = filename.replace(".json", "")
            guidefilename = "_guides/" + parsed_data["date"] + "-" + guidename + ".md"
            os.makedirs(os.path.dirname(guidefilename), exist_ok=True)
            new_yaml = open(guidefilename, "w")

            # Empty string that we will fill with YAML formatted text based on data extracted from our CSV.
            yaml_text = ""
            yaml_text += "---\n"
            yaml_text += "layout: guide\n"
            yaml_text += "jsonld: article\n"
            yaml_text += "header: transparent\n"

            # Metadata
            yaml_text += "title: " + parsed_data["title"] + "\n"
            yaml_text += "date: " + parsed_data["date"] + "\n"
            yaml_text += "modified_date: " + parsed_data["modified_date"] + "\n"
            yaml_text += "description: " + parsed_data["description"] + "\n"
            yaml_text += "image: " + parsed_data["image"] + "\n"
            yaml_text += "tags: " + json.dumps(parsed_data["tags"]) + "\n"
            yaml_text += "guide: " + guidename + "\n"
            yaml_text += "redirect_from: /g/" + parsed_data["short_name"] + "\n"

            # Finish front matter
            yaml_text += "---\n"

            # Add comment for clarity
            yaml_text += f"""
<!--    This YAML front matter is auto-generated.
        Do not edit it directly, but instead edit the json (_data/guides/{guidename}.json)
        and regenerate the site (see `_scripts/guides_to_yaml.py`). -->
            """

            # Write our YAML string to the new text file and close it.
            new_yaml.write(yaml_text)
            new_yaml.close()
