import csv
import json
import os

## Similar Guides
guides_directory = "_data/guides"
guide_names = []
for filename in os.listdir(guides_directory):
    if filename.endswith(".json") and filename != 'template.json':
        file_path = os.path.join(guides_directory, filename)
        with open(file_path) as json_file:
            guidename = filename.replace('.json', '')
            guide_names.append(guidename)

similar_guides_directory = "_data/metadata/similar_guides.json"
os.makedirs(os.path.dirname(similar_guides_directory), exist_ok=True)
dictionary = {}
for guide_name_1 in guide_names:
    similar_guides = []
    for guide_name_2 in guide_names:
        if guide_name_1 != guide_name_2:
            file_path_1 = os.path.join(guides_directory, guide_name_1 + '.json')
            file_path_2 = os.path.join(guides_directory, guide_name_2 + '.json')
            with open(file_path_1) as json_file_1:
                with open(file_path_2) as json_file_2:
                    guide_data_1 = json.load(json_file_1)
                    guide_data_2 = json.load(json_file_2)
                    tags_1 = guide_data_1["tags"]
                    tags_2 = guide_data_2["tags"]
                    number_of_similar_tags = 0
                    for tag in tags_2:
                        if tags_1.count(tag) > 0:
                            number_of_similar_tags += 1
                    if number_of_similar_tags >= 1:
                        similar_guides.append({
                            "name": guide_name_2,
                            "simularity": number_of_similar_tags
                        })
    dictionary[guide_name_1] = similar_guides

# Serializing json
json_object = json.dumps(dictionary, indent=4)
 
# Writing to sample.json
with open(similar_guides_directory, "w") as outfile:
    outfile.write(json_object)

## Similar Photos
csvfile = open('_data/photos.csv', 'r')
photos = []
datareader = csv.reader(csvfile, delimiter=',', quotechar='"')
for row_index, row in enumerate(datareader):
    if row_index == 0:
        continue
    photos.append({
        "name": row[0],
        "tags": row[2].split(' ')
    })

similar_photos_directory = "_data/metadata/similar_photos.json"
os.makedirs(os.path.dirname(similar_guides_directory), exist_ok=True)
dictionary = {}
for photo_1 in photos:
    similar_photos = []
    for photo_2 in photos:
        if photo_1["name"] != photo_2["name"]:
            number_of_similar_tags = 0
            for tag in photo_2["tags"]:
                if tag == "showcase":
                    continue
                if photo_1["tags"].count(tag) > 0:
                    number_of_similar_tags += 1
            if number_of_similar_tags >= 1:
                similar_photos.append({
                    "name": photo_2["name"],
                    "simularity": number_of_similar_tags
                })
    dictionary[photo_1["name"]] = similar_photos

# Serializing json
json_object = json.dumps(dictionary, indent=4)
 
# Writing to sample.json
with open(similar_photos_directory, "w") as outfile:
    outfile.write(json_object)