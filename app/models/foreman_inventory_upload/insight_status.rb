module ForemanInventoryUpload
  class InsightStatus < HostStatus::Status
    ODD = 0
    EVEN = 1

    # this method must return current status based on some data, in this case it's random
    def to_status
      result = rand(2).odd?
      if result
        ODD
      else
        EVEN
      end
    end

    # this method defines mapping to global status, see HostStatus::Global for all possible values,
    # at the moment there OK, ERROR and WARN global statuses
    # we map ODD result to ERROR while EVEN random number will be OK
    def to_global
      if to_status == ODD
        HostStatus::Global::ERROR
      else
        HostStatus::Global::OK
      end
    end

    # don't forget to give your status some name so it's nicely displayed
    def self.status_name
      N_('Insights')
    end

    # you probably want to represent numbers with some more descriptive messages
    def to_label
      case to_status
        when ODD
          N_('Hits are odd')
        when EVEN
          N_('Hits are even')
        else
          N_('The world has ended')
      end
    end
  end
end
