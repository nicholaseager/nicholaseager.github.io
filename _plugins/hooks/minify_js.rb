# TODO: Replace this UglifyJS minification with a modern bundler like esbuild or webpack

Jekyll::Hooks.register :site, :after_init do |site|
  begin
    puts '📸 minifying js ...'
    File.delete('js/board-min.js') if File.exist?('js/board-min.js')
    system("uglifyjs js/board.js >>js/board-min.js")

    File.delete('js/plugins-min.js') if File.exist?('js/plugins-min.js')
    system("uglifyjs js/plugins/*.js >>js/plugins-min.js")
    puts '✅ done.'
  rescue => e
    puts "\n🛑 Error minifying js: #{e.message}"
  end
end
