import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import ExternalLoading from './ExternalLoading';
import isInternalLoading from './InternalLoading'
import 'focus-visible';
import './App.css';
import AppLayout from './AppLayout.js';
import NotFound from './NotFound';
import About from './About';
import Collection from './Collection'
import Document from './Document'

class App extends Component {
  state = {
    isExternalLoading: true,
    isInternalLoading: false
  }

  /* set external loading, loading a whole page */
  setIsExternalLoading = isExternalLoading => {
    this.setState({isExternalLoading})
  }

  /* set internal loading, loading a part or an element of a page */
  setIsInternalLoading = isInternalLoading => {
    this.setState({isInternalLoading})
  }

  render() {
    const collections = ['projects', 'snippets', 'skills',
      'courses', 'certificates', 'readings'];    
    const {isExternalLoading} = this.state;

    console.log('rendering app ------')
    
    return (
      <section>
      {isExternalLoading && <ExternalLoading/>}
      <AppLayout>
        <Switch>
          <Route exact path="/" render={_ => <About setIsExternalLoading={this.setIsExternalLoading}/>}/>
          {
            collections.map(col => (
              <Route key={col} exact path={'/' + col}
                render={props => <Collection
                                    setIsExternalLoading={this.setIsExternalLoading}
                                    setIsInternalLoading={this.setIsInternalLoading}
                                    isInternalLoading={this.state.isInternalLoading}
                                    colType={col}
                                    {...props}/>}/>
            ))
          }
          {
            collections.map(col => (
              <Route key={col} exact path={'/' + col + '/:doc'}
                render={props => <Document
                                    setIsExternalLoading={this.setIsExternalLoading}
                                    setIsInternalLoading={this.setIsInternalLoading}
                                    isInternalLoading={this.state.isInternalLoading}
                                    parentCollection={col}
                                    documentId={props.match.params.doc}/>}
              />
            ))
          }
          <Route component={NotFound}/>
        </Switch>
      </AppLayout>
      </section>
    );
  }
}

export default App;
