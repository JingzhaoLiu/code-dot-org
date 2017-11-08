import React  from 'react';
import ApplicationFormComponent from "../ApplicationFormComponent";
import {PageLabels, SectionHeaders} from '@cdo/apps/generated/pd/teacher1819ApplicationConstants';
import {FormGroup} from 'react-bootstrap';

const PROGRAM_CSD = "Computer Science Discoveries (appropriate for 6th - 10th grade)";
const PROGRAM_CSP = "Computer Science Principles (appropriate for 9th - 12th grade, and can be implemented as an AP or introductory course)";

export default class Section2ChooseYourProgram extends ApplicationFormComponent {
  static labels = PageLabels.section2ChooseYourProgram;

  static associatedFields = [
    ...Object.keys(PageLabels.section2ChooseYourProgram)
  ];


  render() {
    return (
      <FormGroup>
        <h3>Section 2: {SectionHeaders.section2ChooseYourProgram}</h3>

        {this.radioButtonsFor("program")}

        {this.props.data.program === PROGRAM_CSD &&
          <div>
            {this.checkBoxesFor("csdWhichGrades")}
            {this.radioButtonsFor("csdCourseHoursPerWeek")}
            {this.radioButtonsFor("csdCourseHoursPerYear")}
            {this.radioButtonsFor("csdTermsPerYear")}
          </div>
        }

        {this.props.data.program === PROGRAM_CSP &&
          <div>
            {this.checkBoxesFor("cspWhichGrades")}
            {this.radioButtonsFor("cspCourseHoursPerWeek")}
            {this.radioButtonsFor("cspCourseHoursPerYear")}
            {this.radioButtonsFor("cspTermsPerYear")}
            {this.radioButtonsFor("cspHowOffer")}
            {this.radioButtonsFor("cspApExam")}
          </div>
        }

        {this.radioButtonsFor("planToTeach")}
      </FormGroup>
    );
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
