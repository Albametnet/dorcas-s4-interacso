import React from "react";

class ProjectTopContributors extends React.Component {
  constructor(props) {
    super(props);
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
    // let contributorsCommits = [];
    return (
      <div className="chart__project--top-contributors">
        <div className="top-contributors__chart">
          <p className="top-contributors__title">Top contributors</p>
          <div className="top-contributors__list">
            <ul className="top-contributors__list--number">
              <li className="top-contributors__list--element">#1</li>
              <li className="top-contributors__list--element">#2</li>
              <li className="top-contributors__list--element">#3</li>
              <li className="top-contributors__list--element">#4</li>
              <li className="top-contributors__list--element">#5</li>
              <li className="top-contributors__list--element">#6</li>
            </ul>
            <ul className="top-contributors__list">
              {this.props.contributors.map(contributor => {
                <li className="top-contributors__list--name">
                  {contributor.name}
                  <p className="top-contributors__list--commits">
                    {contributor.commits}
                  </p>
                </li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectTopContributors;
