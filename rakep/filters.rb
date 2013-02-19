
module Yoin

  class LessFilter < Rake::Pipeline::Web::Filters::LessFilter

    def initialize(options={}, context = nil, &block)

      super(options, context, &block)
      @options = { :paths => ["#{Yoin.submodule_path}yoin-views-iphone/less/import", 
                              "#{Yoin.submodule_path}yoin-views/less/import", 
                              "#{Yoin.submodule_path}yoin-views/less/import2"] }
    end

  end

end
