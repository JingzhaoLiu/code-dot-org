class Api::V1::Pd::RegionalPartnerWorkshopsController < ::ApplicationController
  authorize_resource class: 'Pd::Workshop'

  def find_by_region
    zip_code = params[:zip_code]
    state = params[:state]

    @partner = RegionalPartner.find_by_region zip_code, state
  end

  def index
    course = params[:course]
    subject = params[:subject]


    @partners = RegionalPartner.joins(:pd_workshops).includes(:pd_workshops)

    @partners = @partners.where(pd_workshops: {course: course}) if course.present?
    @partners = @partners.where(pd_workshops: {subject: subject}) if subject.present?
  end
end
