import React from "react";
import axios from "axios";

import { get as getSession } from "../session";
import PaperText from "../components/PaperText";
import Button from "../components/Button";
import CloseIcon from "../icons/Close";
import IconOnHover from "../components/IconOnHover";
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

const PENDING = "PENDING";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";

const set = (o, k, v) => {
  if (Array.isArray(o)) {
    const i = parseInt(k, 10);
    return [...o.slice(0, i), v, ...o.slice(i + 1)];
  }

  return {
    ...o,
    [k]: v
  };
};

const setIn = (o, p, v) => {
  if (p.length === 0) {
    console.error("Set in must be passed an array as a second paramiter");
    return o;
  }

  if (p.length === 1) {
    return set(o, p[0], v);
  }
  return set(o, p[0], setIn(o[p[0]], p.slice(1), v));
};

const updateIn = (o, p, f) => {
  if (p.length === 0) {
    console.error("Set in must be passed an array as a second paramiter");
    return o;
  }

  if (p.length === 1) {
    return set(o, p[0], f(o[p[0]]));
  }

  return set(o, p[0], updateIn(o[p[0]], p.slice(1), f));
};

export default class DeveloperDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {
        ...props.savedProfile
      },
      pristine: true
    };

    this.onChange = this.onChange.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
    this.updateFreelancer = this.updateFreelancer.bind(this);
  }

  updateFreelancer() {
    this.setState({
      updateFreelancerRequestStatus: PENDING
    });
    axios
      .put("/api/profile", this.state.profile, {
        headers: {
          Authorization: `Bearer ${getSession()}`
        },
        json: true
      })
      .then(() => {
        this.setState({
          updateFreelancerRequestStatus: SUCCESS,
          pristine: true
        });
      })
      .catch(e => {
        this.setState({
          updateFreelancerRequestStatus: ERROR,
          updateFreelancerRequestError: e
        });
      });
  }

  onChange(e) {
    const path = e.target.name.split(".");
    this.setState({
      profile: setIn(this.state.profile, path, e.target.value),
      pristine: false
    });
  }

  deleteElement(e) {
    const path = e.currentTarget.dataset.path.split(".");
    const k = path[path.length - 1];
    const newProfile = updateIn(
      this.state.profile,
      path.slice(0, path.length - 1),
      deleteFrom => {
        if (Array.isArray(deleteFrom)) {
          const i = parseInt(k, 10);
          const result = [
            ...deleteFrom.slice(0, i),
            ...deleteFrom.slice(i + 1)
          ];
          return result;
        }

        const { [k]: _, ...rem } = deleteFrom;

        return rem;
      }
    );

    this.setState({
      profile: newProfile,
      pristine: false
    });
  }

  render() {
    const {
      state: {
        profile: { name, jobTitle, employmentHistory }
      },
      onChange
    } = this;

    return (
      <ProfileWrapper>
        <div>
          <PaperText
            enabled
            name="name"
            value={name}
            onChange={onChange}
            className={CLASS_NAME_H1}
          />
        </div>
        <div>
          <PaperText
            enabled
            name="jobTitle"
            className={CLASS_NAME_H1_SUB}
            value={jobTitle}
            onChange={onChange}
          />
        </div>
        <H2EmploymentHistory />
        {employmentHistory.map((employmentItem, i) => (
          <IconOnHover
            onClick={this.deleteElement}
            name={`employmentHistory.${i}`}
            Icon={
              <CloseIcon className="fr w08 h08 pa1 ml1 hover-bg-light-gray pointer" />
            }
          >
            <EmploymentHistoryWrapper>
              <PaperText
                enabled
                name={`employmentHistory.${i}.title`}
                className={CLASS_NAME_H3}
                value={employmentItem.title}
                onChange={onChange}
              />
              {"-"}
              <PaperText
                enabled
                name={`employmentHistory.${i}.company`}
                className={CLASS_NAME_H3}
                value={employmentItem.company}
                onChange={onChange}
              />
              <br />
              <PaperText
                enabled
                name={`employmentHistory.${i}.dates`}
                className="f6 mid-gray"
                value={employmentItem.dates}
                onChange={onChange}
              />
              <ResponsibilitiesList>
                {employmentItem.responsibilities.map((r, j) => {
                  const name = `employmentHistory.${i}.responsibilities.${j}`;
                  return (
                    <IconOnHover
                      onClick={this.deleteElement}
                      name={name}
                      Icon={
                        <CloseIcon className="fr w08 h08 pa1 ml1 hover-bg-light-gray pointer" />
                      }
                    >
                      <ResponsibilitiesListItem
                        key={`responsibility.${i}.${j}`}
                      >
                        <PaperText
                          enabled
                          name={name}
                          value={r}
                          onChange={onChange}
                        />
                      </ResponsibilitiesListItem>
                    </IconOnHover>
                  );
                })}
                <Button
                  className="f7 gold ma1 pa2 w-100"
                  onClick={() => {
                    onChange({
                      target: {
                        value: "responsibility description",
                        name: `employmentHistory.${i}.responsibilities.${
                          employmentItem.responsibilities.length
                        }`
                      }
                    });
                  }}
                >
                  Add responsibility
                </Button>
              </ResponsibilitiesList>
            </EmploymentHistoryWrapper>
          </IconOnHover>
        ))}
        <Button
          className="f7 gold ma1 pa2 w-100"
          onClick={() => {
            onChange({
              target: {
                value: {
                  title: "Job Title",
                  company: "Company Name",
                  dates: "[month] [year] - [month] [year] || Current",
                  responsibilities: []
                },
                name: `employmentHistory.${employmentHistory.length}`
              }
            });
          }}
        >
          Add Employment Item
        </Button>
        <div>
          <Button
            className="f7 ma1 pa2 fr"
            disabled={
              this.state.updateFreelancerRequestStatus === PENDING ||
              this.state.pristine
            }
            onClick={this.updateFreelancer}
            primary
          >
            Save
          </Button>
          <Button className="f7 ma1 pa2 fr" onClick={() => {}}>
            Preview
          </Button>
          <Button className="f7 ma1 pa2 fr" onClick={() => {}}>
            Cancel
          </Button>
        </div>
      </ProfileWrapper>
    );
  }
}
