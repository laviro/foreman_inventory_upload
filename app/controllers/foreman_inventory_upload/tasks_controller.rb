module ForemanInventoryUpload
  class TasksController < ::ApplicationController
    def create
      selected_org = Organization.current
      subscribed_hosts_ids = Set.new(
        ForemanInventoryUpload::Generators::Queries.for_slice(
          Host.unscoped.where(organization: selected_org)
        ).pluck(:id)
      )

      if subscribed_hosts_ids.empty?
        return render json: {
          message: N_('Nothing to sync, there are no hosts with subscription for this organization.'),
        }, status: :method_not_allowed
      else
        task = ForemanTasks.sync_task(InventorySync::Async::InventoryFullSync, selected_org)
        host_statuses = task.output[:host_statuses]
      end

      render json: {
        syncHosts: host_statuses[:sync],
        disconnectHosts: host_statuses[:disconnect],
      }, status: :ok
    end
  end
end
