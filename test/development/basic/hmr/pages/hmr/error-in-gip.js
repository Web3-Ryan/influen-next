import React from 'react'
export default class Page extends React.Component {
  static getInitialProps() {
    const error = new Error('an-expected-error-in-gip')
    throw error
  }

  render() {
    return <div>Hello</div>
  }
}
