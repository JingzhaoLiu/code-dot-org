module Pd::Application
  class TeacherApplicationController < ApplicationController
    # GET /pd/application/teacher
    def new
      # Block on production until we're ready to release and publicize the url
      # TODO: Andrew - remove this, and the associated Gatekeeper key, after we go live
      if Rails.env.production? && !current_user.try(:workshop_admin?) && Gatekeeper.disallows('pd_teacher_application')
        return head :not_found
      end

      return render :logged_out unless current_user
      return render :not_teacher unless current_user.teacher?

      @application = Teacher1819Application.find_by(user: current_user)
      return render :submitted if @application

      @script_data = {
        props: {
          options: Teacher1819Application.options.camelize_keys,
          requiredFields: Teacher1819Application.camelize_required_fields,
          partner_workshops: get_partner_workshops,
          accountEmail: current_user.email,
          apiEndpoint: '/api/v1/pd/application/teacher'
        }.to_json
      }
    end

    # GET /pd/application/teacher/international
    def international
    end

    private

    def get_partner_workshops
      {
        csd: get_partner_workshops_for(Pd::Workshop::COURSE_CSD, Pd::Workshop::SUBJECT_CSD_SUMMER_WORKSHOP),
        csp: get_partner_workshops_for(Pd::Workshop::COURSE_CSP, Pd::Workshop::SUBJECT_CSP_SUMMER_WORKSHOP)
      }
    end

    def get_partner_workshops_for(course, subject)
      RegionalPartner.
        joins(:pd_workshops).
        includes(:pd_workshops).
        where(pd_workshops: {course: course, subject: subject}).
        map do |partner|
          {
            id: partner.id,
            name: partner.name,
            workshops: partner.pd_workshops.map do |workshop|
              {
                id: workshop.id,
                dates: workshop.friendly_date_range
              }
            end
          }
      end
    end
  end
end
