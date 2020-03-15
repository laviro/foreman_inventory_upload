class Setting::RhCloud < ::Setting
  def self.load_defaults
    return unless ActiveRecord::Base.connection.table_exists?('settings')
    return unless super

    Setting.transaction do
      [
        self.set('example_int', N_('Answer to the life, universe, and everything'), 42),
      ].compact.each { |s| self.create s.update(:category => "Setting::RhCloud") }
    end

    true
  end

  def self.humanized_category
    N_('My RhCloud')
  end
end