import React from "react";

class ProjectTopContributors extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.projectData);
  }

  // getContributors() {
  //   const orderContributors = apiResponse.contributors.sort(function(c1, c2) {
  //     if (c1.name > c2.name) {
  //       return 1;
  //     } else if (c1.name < c2.name) {
  //       return -1;
  //     } else {
  //       return 0;
  //     }
  //   });
  //   console.log(contributors);
  // }

  render() {
    // let contributors = this.props.topContributors;

    // console.log("contributors="+contributors[0]);
    // let json = JSON.stringify(contributors[0]);
    // console.log("render="+json);
    // let ojbJson = JSON.parse(contributors);
    // console.log("render="+ojbJson);
    // let contributorsName = [];
    console.log(this.props.contributors);
    // let contributorsCommits = [];
    return (
      <div className="chart__project--top-contributors">
        <div className="top-contributors__chart">
          <p className="top-contributors__title">Top contributors</p>
          <div className="top-contributors__list">
            <ul className="top-contributors__list">
              {this.props.contributors.map((contributor, index) =>
                <li className="top-contributors__list--element">
                  <span className="top-contributors__list--commits">
                    `#${index+1}`
                  </span>
                  <span className="top-contributors__list--commits">
                    {contributor.name}
                  </span>
                  <span className="top-contributors__list--commits">
                    {contributor.commits}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectTopContributors;
