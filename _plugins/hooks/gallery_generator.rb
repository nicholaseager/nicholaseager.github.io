# This Jekyll plugin automatically generates gallery pages from a CSV file.
# It reads data from _data/galleries.csv and creates corresponding markdown files
# in the _galleries directory, with YAML front matter populated from the CSV data.
#
# The CSV should have columns for:
# - Gallery name (converted to filename)
# - Tags (space-separated)
# - Description
# - Featured image path
#
# The plugin runs after Jekyll initialization and will recreate all gallery pages
# each time the site is built.

require 'csv'
require 'fileutils'

Jekyll::Hooks.register :site, :after_init do |site|
  begin
    puts '📸 generating galleries ...'
    FileUtils.mkdir_p('_galleries')
    generate_galleries
    puts '✅ done.'
  rescue => e
    puts "\n🛑 Error generating galleries: #{e.message}"
  end
end

# Generates gallery pages from galleries.csv
# Each row creates a markdown file with YAML front matter
def generate_galleries
  # Loop through each row in galleries.csv, treating first row as headers
  CSV.foreach('_data/galleries.csv', headers: true) do |row|
    # Convert gallery name to lowercase and replace spaces with hyphens for filename
    name = row[0].downcase.gsub(' ', '-')
    # Construct full path for new markdown file
    filename = "_galleries/#{name}.md"
    # Create _galleries directory if it doesn't exist
    FileUtils.mkdir_p(File.dirname(filename))

    # Format tags as quoted strings separated by commas
    tags = row[1].split(' ').map { |t| %("#{t}") }.join(', ')

    # Create YAML front matter content
    content = <<~YAML
      ---
      layout: print-gallery
      jsonld: article
      header: transparent
      title: #{row[0]}
      tags: [#{tags}]
      description: #{row[2]}
      image: #{row[3]}
      ---

      <!--    This YAML front matter is auto-generated.
              Do not edit it directly, but instead edit the CSV (_data/galleries.csv)
              and regenerate the site. -->
    YAML

    # Write the content to the markdown file
    File.write(filename, content)
  end
end
