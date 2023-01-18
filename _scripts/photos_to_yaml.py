import csv
import os
import string

# Open our data file in read-mode.
csvfile = open('_data/photos.csv', 'r')

# Save a CSV Reader object.
datareader = csv.reader(csvfile, delimiter=',', quotechar='"')

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
		filename = '_photos/' + row[0] + '.md'
		os.makedirs(os.path.dirname(filename), exist_ok=True)
		new_yaml = open(filename, 'w')

		# Empty string that we will fill with YAML formatted text based on data extracted from our CSV.
		yaml_text = ""
		yaml_text += "---\n"
		yaml_text += "layout: photo\n"

		# Path

		path = row[0];
		yaml_text += 'image: ' + path + '\n'

		parts = path.split('/')
		title = parts.pop().replace('-', ' ').title()

		parts.reverse()
		parts.remove('photos')
		parts.remove('countries')
		location = ', '.join(parts).replace('-', ' ').title()

		yaml_text += 'title: ' + title + '\n'
		yaml_text += 'location: ' + location + '\n'

		# Description

		description = row[1]
		if description != '':
			yaml_text += 'description: ' + description + '\n'
		else:
			yaml_text += 'description: ' + title + ' (' + location + ')' + '\n'

		# Tags

		tags = '["' + '", "'.join(row[2].split(' ')) + '"]'
		yaml_text += 'tags: ' + tags + '\n'

		# Store URL

		store_url = row[3]
		if store_url != '':
			yaml_text += 'storeurl: ' + store_url + '\n'

		# YouTube URL

		youtube_url = row[4]
		if youtube_url != '':
			yaml_text += 'youtubeurl: ' + youtube_url + '\n'

		# SEO

		yaml_text += 'jsonld: print\n'

		# Finish

		yaml_text += "---\n"

		# Write our YAML string to the new text file and close it.
		new_yaml.write(yaml_text)
		new_yaml.close()

# We're done! Close the CSV file.
csvfile.close()