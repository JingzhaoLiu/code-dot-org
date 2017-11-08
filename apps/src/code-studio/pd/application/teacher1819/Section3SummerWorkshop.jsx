import React from 'react';
import ApplicationFormComponent from "../ApplicationFormComponent";
import {PageLabels, SectionHeaders} from '@cdo/apps/generated/pd/teacher1819ApplicationConstants';
import {FormGroup} from 'react-bootstrap';

export default class Section3SummerWorkshop extends ApplicationFormComponent {
  static labels = PageLabels.section3SummerWorkshop;

  static associatedFields = [
    ...Object.keys(PageLabels.section3SummerWorkshop)
  ];


  render() {
    return (
      <FormGroup>
        <h3>Section 3: {SectionHeaders.section3SummerWorkshop}</h3>

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
