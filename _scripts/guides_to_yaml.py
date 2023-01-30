import json
import os

directory = "_data/guides"

for filename in os.listdir(directory):
    if filename.endswith(".json"):
        file_path = os.path.join(directory, filename)
        with open(file_path) as json_file:
            parsed_data = json.load(json_file)
            
            guidename = filename.replace('.json', '')
            guidefilename = '_guides/' + guidename + '.md'
            os.makedirs(os.path.dirname(guidefilename), exist_ok=True)
            new_yaml = open(guidefilename, 'w')

            # Empty string that we will fill with YAML formatted text based on data extracted from our CSV.
            yaml_text = ""
            yaml_text += "---\n"
            yaml_text += "layout: guide\n"
            yaml_text += "jsonld: article\n"
            yaml_text += "header: transparent\n"

            # Metadata
            yaml_text += 'title: ' + parsed_data['title'] + '\n'
            yaml_text += 'date: ' + parsed_data['date'] + '\n'
            yaml_text += 'modified_date: ' + parsed_data['modified_date'] + '\n'
            yaml_text += 'description: ' + parsed_data['description'] + '\n'
            yaml_text += 'image: ' + parsed_data['image'] + '\n'
            yaml_text += 'tags: ' + json.dumps(parsed_data['tags']) + '\n'
            yaml_text += 'guide: ' + guidename + '\n'
            yaml_text += 'redirect_from: /g/' + parsed_data['short_name'] + '\n'

            # Finish
            yaml_text += "---\n"

            # Write our YAML string to the new text file and close it.
            new_yaml.write(yaml_text)
            new_yaml.close()
