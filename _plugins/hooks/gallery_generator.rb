require 'csv'
require 'fileutils'

Jekyll::Hooks.register :site, :after_init do |site|
  FileUtils.mkdir_p('_galleries')
  generate_galleries
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
