require 'json'
require 'fileutils'

Jekyll::Hooks.register :site, :after_init do |site|
  FileUtils.mkdir_p('_guides')
  generate_guides
end

# Generates guide pages from JSON files in _data/guides/
# Each JSON file creates a markdown file with YAML front matter
def generate_guides
  # Iterate through all JSON files in _data/guides directory
  Dir.glob('_data/guides/*.json').each do |file|
    # Skip template file if it exists
    next if File.basename(file) == 'template.json'

    # Parse JSON data from file
    data = JSON.parse(File.read(file))
    # Get guide name by removing .json extension
    guidename = File.basename(file, '.json')
    # Construct output markdown filename with date prefix
    filename = "_guides/#{data['date']}-#{guidename}.md"
    # Create directories in path if they don't exist
    FileUtils.mkdir_p(File.dirname(filename))

    # Generate markdown content with YAML front matter
    content = <<~YAML
      ---
      layout: guide
      jsonld: article
      header: transparent
      title: #{data['title']}
      date: #{data['date']}
      modified_date: #{data['modified_date']}
      description: #{data['description']}
      image: #{data['image']}
      tags: #{data['tags'].to_json}
      guide: #{guidename}
      redirect_from: /g/#{data['short_name']}
      ---

      <!--    This YAML front matter is auto-generated.
              Do not edit it directly, but instead edit the json (_data/guides/#{guidename}.json)
              and regenerate the site. -->
    YAML

    # Write generated content to markdown file
    File.write(filename, content)
  end
end
