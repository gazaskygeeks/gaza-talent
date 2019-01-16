import React from "react";

import EditableInput from "../components/EditableInput";

const Button = ({ children, onClick, className }) => {
  return (
    <button
      className={`bw0 b--black bg-white bw0 hover-bg-light-gray tc ttu moon-gray ${className}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

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

export default class DeveloperDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {
        ...props.savedProfile
      },
      focusedProperty: undefined
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const path = e.target.name.split(".");
    this.setState({
      profile: setIn(this.state.profile, path, e.target.value)
    });
  }

  render() {
    const {
      state: {
        profile: { name, jobTitle, employmentHistory, bio }
      },
      onChange
    } = this;

    return (
      <div className="tc">
        <div className="bl bw05 min-vh-100 b--light-gray w-50 dib pa3">
          <div>
            <EditableInput
              name="name"
              value={name}
              onChange={onChange}
              className="f3 black"
            />
          </div>
          <div>
            <EditableInput
              name="jobTitle"
              className="f6 mid-gray"
              value={jobTitle}
              onChange={onChange}
            />
          </div>
          <h3 className="tl ma0 pa2 ba bw1 b--white f5 bold black">
            Employment History
          </h3>
          {employmentHistory.map((employmentItem, i) => (
            <div className="tl">
              <div className="db">
                <EditableInput
                  name={`employmentHistory.${i}.title`}
                  className="dib f5 black"
                  value={employmentItem.title}
                  onChange={onChange}
                />
                {"-"}
                <EditableInput
                  name={`employmentHistory.${i}.company`}
                  className="dib f5 black"
                  value={employmentItem.company}
                  onChange={onChange}
                />
              </div>
              <EditableInput
                name={`employmentHistory.${i}.dates`}
                className="f6 mid-gray"
                value={employmentItem.dates}
                onChange={onChange}
              />
              <ul className="mh0 mv2 pv0">
                {employmentItem.responsibilities.map((r, j) => (
                  <li className="mv0 pv0">
                    <EditableInput
                      name={`employmentHistory.${i}.responsibilities.${j}`}
                      className="dib f6 black"
                      value={r}
                      onChange={onChange}
                      placeholder=""
                    />
                  </li>
                ))}
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
              </ul>
            </div>
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
            <Button className="f7 dark-blue b ma1 pa2 fr" onClick={() => {}}>
              Save
            </Button>
            <Button className="f7 gold ma1 pa2 fr" onClick={() => {}}>
              Preview
            </Button>
            <Button className="f7 gold ma1 pa2 fr" onClick={() => {}}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
