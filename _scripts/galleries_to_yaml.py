import csv
import os
import string

# Open our data file in read-mode.
csvfile = open("_data/galleries.csv", "r")

# Save a CSV Reader object.
datareader = csv.reader(csvfile, delimiter=",", quotechar='"')

# Empty array for data headings, which we will fill with the first row from our CSV.
data_headings = []

# Loop through each row...
for row_index, row in enumerate(datareader):

    # If this is the first row, populate our data_headings variable.
    if row_index == 0:
        data_headings = row

    # Othrwise, create a YAML file from the data in this row...
    else:
        # Open a new file with filename based on the first column
        name = row[0].replace(" ", "-").lower()
        filename = "_galleries/" + name + ".md"
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        new_yaml = open(filename, "w")

        # Empty string that we will fill with YAML formatted text based on data extracted from our CSV.
        yaml_text = ""
        yaml_text += "---\n"
        yaml_text += "layout: print-gallery\n"
        yaml_text += "jsonld: article\n"
        yaml_text += "header: transparent\n"

        # Name
        yaml_text += "title: " + row[0] + "\n"

        # Tags
        tags = '["' + '", "'.join(row[1].split(" ")) + '"]'
        yaml_text += "tags: " + tags + "\n"

        # Description
        yaml_text += "description: " + row[2] + "\n"

        # Image
        path = row[3]
        yaml_text += "image: " + path + "\n"

        # Finish front matter
        yaml_text += "---\n"

        # Add comment for clarity
        yaml_text += f"""
<!--    This YAML front matter is auto-generated.
        Do not edit it directly, but instead edit the CSV (_data/galleries.csv)
        and regenerate the site (see `_scripts/photos_to_yaml.py`). -->
        """

        # Write our YAML string to the new text file and close it.
        new_yaml.write(yaml_text)
        new_yaml.close()

# We're done! Close the CSV file.
csvfile.close()
