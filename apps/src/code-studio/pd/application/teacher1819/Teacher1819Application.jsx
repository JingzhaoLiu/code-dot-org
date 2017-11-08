import {PropTypes} from 'react';
import FormController from '../../form_components/FormController';
import Section1AboutYouAndYourSchool from './Section1AboutYouAndYourSchool';
import Section2ChooseYourProgram from './Section2ChooseYourProgram';
import Section3SummerWorkshop from './Section3SummerWorkshop';
import Section4Submission from './Section4Submission';

export default class Teacher1819Application extends FormController {
  static propTypes = {
    ...FormController.propTypes,
    accountEmail: PropTypes.string.isRequired
  };

  static submitButtonText = "Complete and Send";

  static sessionStorageKey = "Teacher1819Application";

  /**
   * @override
   */
  getPageComponents() {
    return [
      Section1AboutYouAndYourSchool,
      Section2ChooseYourProgram,
      Section3SummerWorkshop,
      Section4Submission
    ];
  }

  /**
   * @override
   */
  getPageProps() {
    return {
      ...super.getPageProps(),
      accountEmail: this.props.accountEmail
    };
  }

  /**
   * @override
   */
  onSuccessfulSubmit() {
    // Let the server display a confirmation page as appropriate
    window.location.reload(true);
  }
}
