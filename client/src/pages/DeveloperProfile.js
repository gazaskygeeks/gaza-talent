import React from "react";
import axios from "axios";

import PaperText from "../components/PaperText";
import Button from "../components/Button";
import ProfileWrapper from "../components/profile/ProfileWrapper";
import H2EmploymentHistory from "../components/profile/H2EmploymentHistory";
import ResponsibilitiesList from "../components/profile/ResponsibilitiesList";
import EmploymentHistoryWrapper from "../components/profile/EmploymentHistoryWrapper";
import ResponsibilitiesListItem from "../components/profile/ResponsibilitiesListItem";

import {
  CLASS_NAME_H1,
  CLASS_NAME_H1_SUB,
  CLASS_NAME_H3,
  CLASS_NAME_H3_SUB
} from "../constants/typeographyClassNames";

export default class DeveloperDashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      props: {
        profile: { name, jobTitle, employmentHistory }
      }
    } = this;

    return (
      <ProfileWrapper>
        <div>
          <PaperText value={name} className={CLASS_NAME_H1} />
        </div>
        <div>
          <PaperText className={CLASS_NAME_H1_SUB} value={jobTitle} />
        </div>
        <H2EmploymentHistory />
        {employmentHistory.map((employmentItem, i) => (
          <EmploymentHistoryWrapper>
            <PaperText className={CLASS_NAME_H3} value={employmentItem.title} />
            {"-"}
            <PaperText
              className={CLASS_NAME_H3}
              value={employmentItem.company}
            />
            <br />
            <PaperText
              className={CLASS_NAME_H3_SUB}
              value={employmentItem.dates}
            />
            <ResponsibilitiesList>
              {employmentItem.responsibilities.map((r, j) => (
                <ResponsibilitiesListItem key={`responsibility.${i}.${j}`}>
                  <PaperText value={r} />
                </ResponsibilitiesListItem>
              ))}
            </ResponsibilitiesList>
          </EmploymentHistoryWrapper>
        ))}
      </ProfileWrapper>
    );
  }
}
