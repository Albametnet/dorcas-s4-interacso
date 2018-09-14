import React from 'react';

class ProjectTopContributors extends React.Component {
  constructor(props){
    super(props);
  }
  
  componentDidMount() {
    this.props.retrieveFromApi("projects/650687808730806").then(apiResponse => {
      this.props.updateState({topContributors: apiResponse.contributors[0]})
    });
  }

  render(){
    let contributors= this.props.topContributors;
    let contributorsName = [];
    let contributorsCommits = [];
    return (
            <div className= "chart__project--top-contributors">
              <div className= "top-contributors__chart">
                <p className= "top-contributors__title">Top contributors</p>
                <ul className= "top-contributors__list">
                  <li className= "top-contributors__list--element">
                    <p className= "top-contributors__list--number">#1</p>
                    <p className= "top-contributors__list--name">{contributors.name}</p>
                    <p className= "top-contributors__list--commits">250</p>
                    </li>
                  <li className= "top-contributors__list--element">#2</li>
                  <li className= "top-contributors__list--element">#3</li>
                  <li className= "top-contributors__list--element">#4</li>
                  <li className= "top-contributors__list--element">#5</li>
                  <li className= "top-contributors__list--element">#6</li>
                </ul>
              </div>
            </div>
    )
  }
}

export default ProjectTopContributors;