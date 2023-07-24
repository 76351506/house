import { Component } from 'react';

class Detail extends Component<any> {
  render() {
    console.log(this.props.match.params.id);
    return <div>this is Detail page</div>;
  }
}

export default Detail;
