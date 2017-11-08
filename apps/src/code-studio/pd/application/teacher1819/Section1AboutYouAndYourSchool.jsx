import React, {PropTypes} from 'react';
import ApplicationFormComponent from "../ApplicationFormComponent";
import UsPhoneNumberInput from "../../form_components/UsPhoneNumberInput";
import {PageLabels, SectionHeaders} from '@cdo/apps/generated/pd/teacher1819ApplicationConstants';
import {isEmail, isZipCode} from '@cdo/apps/util/formatValidation';
import SchoolAutocompleteDropdown from '@cdo/apps/templates/SchoolAutocompleteDropdown';
import {
  Row,
  Col,
  ControlLabel,
  FormGroup
} from 'react-bootstrap';

const CSD_URL = 'https://code.org/educate/professional-learning/cs-discoveries';
const CSP_URL = 'https://code.org/educate/professional-learning/cs-principles';
const WHICH_PROGRAM_URL = 'https://code.org/files/PL-Program-for-Me.pdf';
const TEACHER_EMAIL = 'teacher@code.org';

export default class Section1AboutYouAndYourSchool extends ApplicationFormComponent {
  static labels = PageLabels.section1AboutYouAndYourSchool;

  static associatedFields = [
    ...Object.keys(PageLabels.section1AboutYouAndYourSchool)
  ];

  handleSchoolChange = selectedSchool => this.handleChange({school: selectedSchool && selectedSchool.value});

  render() {
    return (
      <FormGroup>
        <p>
          Thanks for your interest in the Code.org Professional Learning Program!
        </p>
        <p>
          This application should take 10 - 15 minutes to complete,
          and will require your principal’s approval. Fields marked with a
          {' '}<span style={{color: "red"}}>*</span>{' '}
        </p>
        <p>
          <strong>
            The deadline to apply is March 30, 2018.
          </strong>
        </p>
        <p>
          If you need more information on the program before you apply,
          please visit
          {' '}<a href={CSD_URL} target="_blank">CS Discoveries</a>.{' '}
          and
          {' '}<a href={CSP_URL} target="_blank">CS Principles</a>.{' '}
          If you’re not sure which program is the right fit for your classroom,
          we encourage you to check our guidance in
          {' '}<a href={WHICH_PROGRAM_URL} target="_blank">Which Program is Right for Me?</a>.{' '}
          For additional questions regarding the program or application,
          please contact
          {' '}<a href={`mailto:${TEACHER_EMAIL}`}>{TEACHER_EMAIL}</a>.
        </p>

        <h3>Section 1: {SectionHeaders.section1AboutYouAndYourSchool}</h3>

        <p>
          If you work in a school district, please select your district and school below:
        </p>

        {this.selectFor("country")}

        <FormGroup
          id="school"
          controlId="school"
          validationState={this.getValidationState("school")}
        >
          <Row>
            <Col md={6}>
              <ControlLabel>
                School
                <span style={{color: 'red'}}> *</span>
              </ControlLabel>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <SchoolAutocompleteDropdown
                value={this.props.data.school}
                onChange={this.handleSchoolChange}
              />
            </Col>
          </Row>
        </FormGroup>

        {this.selectFor("title", {
          required: false,
          placeholder: "Select a title"
        })}

        {this.inputFor("firstName")}
        {this.inputFor("preferredFirstName", {required: false})}
        {this.inputFor("lastName")}

        {this.inputFor("accountEmail", {
          value: this.props.accountEmail,
          readOnly: true
        })}

        {this.inputFor("alternateEmail", {required: false})}

        {this.usPhoneNumberInputFor("phone")}

        {this.inputFor("address")}
        {this.inputFor("city")}
        {this.selectFor("state", {placeholder: "Select a state"})}
        {this.inputFor("zipCode")}

        {this.radioButtonsFor("genderIdentity")}
        {this.checkBoxesFor("race")}

        {this.inputFor("principalFirstName")}
        {this.inputFor("principalLastName")}
        {this.selectFor("principalTitle", {
          placeholder: "Select a title"
        })}
        {this.inputFor("principalEmail")}
        {this.inputFor("principalConfirmEmail")}
        {this.usPhoneNumberInputFor("principalPhoneNumber")}

        {this.radioButtonsFor("currentRole")}
        {this.checkBoxesFor("gradesAtSchool")}
        {this.checkBoxesFor("gradesTeaching")}
        {this.checkBoxesFor("gradesExpectToTeach")}
        {this.checkBoxesFor("subjectsTeaching")}
        {this.checkBoxesFor("subjectsExpectToTeach")}
        {this.checkBoxesFor("subjectsLicensedToTeach")}
        {this.checkBoxesFor("taughtInPast")}
        {this.checkBoxesFor("csOfferedAtSchool")}
        {this.checkBoxesFor("csOpportunitiesAtSchool")}
      </FormGroup>
    );
  }

  /**
   * @override
   */
  handleChange(newState) {
    super.handleChange(newState);
    if (newState.country === "International") {
      // Redirect to international page
      window.location = window.location + "/international";
    }
  }


  /**
   * @override
   */
  static getDynamicallyRequiredFields(data) {
    const requiredFields = [];
    return requiredFields;
  }

  /**
   * @override
   */
  static getErrorMessages(data) {
    const formatErrors = {};

    if (data.alternateEmail && !isEmail(data.alternateEmail)) {
      formatErrors.alternateEmail = "Must be a valid email address";
    }

    if (data.zipCode && !isZipCode(data.zipCode)) {
      formatErrors.zipCode = "Must be a valid zip code";
    }

    if (!UsPhoneNumberInput.isValid(data.phone)) {
      formatErrors.phone = "Must be a valid phone number including area code";
    }

    return formatErrors;
  }

  /**
   * @override
   */
  static processPageData(data) {
    const changes = {};
    return changes;
  }
}
